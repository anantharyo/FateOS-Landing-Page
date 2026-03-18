"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const AnoAI = () => {
 const containerRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
 if (!containerRef.current) return;

 const container = containerRef.current;
 const scene = new THREE.Scene();
 const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
 const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
 renderer.setSize(window.innerWidth, window.innerHeight);
 container.appendChild(renderer.domElement);

 const material = new THREE.ShaderMaterial({
 uniforms: {
 iTime: { value: 0.0 },
 iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
 },
 vertexShader: `
 void main() {
 gl_Position = vec4(position, 1.0);
 }
 `,
 fragmentShader: `
 uniform float iTime;
 uniform vec2 iResolution;

 #define NUM_OCTAVES 5

 float mod289(float x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
 vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
 vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
 vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }

 float permute(float x) { return mod289(((x*34.0)+1.0)*x); }
 vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
 vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }

 float taylorInvSqrt(float r) { return 1.79284291400159 - 0.85373472095314 * r; }
 vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

 vec4 grad4(float j, vec4 ip) {
 const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);
 vec4 p,s;

 p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
 p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
 s = vec4(lessThan(p, vec4(0.0)));
 p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;

 return p;
 }

 #define F4 0.309016994374947451

 vec4 simplexNoiseDerivatives (vec4 v) {
 const vec4 C = vec4( 0.138196601125011, 0.276393202250021, 0.414589803375032, -0.447213595499958);

 vec4 i = floor(v + dot(v, vec4(F4)) );
 vec4 x0 = v - i + dot(i, C.xxxx);

 vec4 i0;
 vec3 isX = step( x0.yzw, x0.xxx );
 vec3 isYZ = step( x0.zww, x0.yyz );

 i0.x = isX.x + isX.y + isX.z;
 i0.yzw = 1.0 - isX;

 i0.y += isYZ.x + isYZ.y;
 i0.zw += 1.0 - isYZ.xy;

 i0.z += isYZ.z;
 i0.w += 1.0 - isYZ.z;

 vec4 i3 = clamp( i0, 0.0, 1.0 );
 vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );
 vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );

 vec4 x1 = x0 - i1 + C.xxxx;
 vec4 x2 = x0 - i2 + C.yyyy;
 vec4 x3 = x0 - i3 + C.zzzz;
 vec4 x4 = x0 + C.wwww;

 i = mod289(i);
 float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);
 vec4 j1 = permute( permute( permute( permute (
 i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))
 + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))
 + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))
 + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));

 vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;

 vec4 p0 = grad4(j0, ip);
 vec4 p1 = grad4(j1.x, ip);
 vec4 p2 = grad4(j1.y, ip);
 vec4 p3 = grad4(j1.z, ip);
 vec4 p4 = grad4(j1.w, ip);

 vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
 p0 *= norm.x;
 p1 *= norm.y;
 p2 *= norm.z;
 p3 *= norm.w;

 vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);
 vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4) ), 0.0);
 m0 = m0 * m0;
 m1 = m1 * m1;

 return 49.0 * ( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))
 + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;
 }

 float noise(vec3 x) {
 return simplexNoiseDerivatives(vec4(x, 1.0)).x;
 }

 float fbm(vec3 x) {
 float v = 0.0;
 float a = 0.5;
 vec3 shift = vec3(100);
 mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
 for (int i = 0; i < NUM_OCTAVES; ++i) {
 v += a * noise(x);
 x = rot * x * 2.0 + shift;
 a *= 0.4;
 }
 return v;
 }

 void main() {
 vec2 shake = vec2(sin(iTime * 1.2) * 0.005, cos(iTime * 2.1) * 0.005);
 vec2 p = ((gl_FragCoord.xy + shake * iResolution.xy) - iResolution.xy * 0.5) / iResolution.y * mat2(6.0, -4.0, 4.0, 6.0);
 vec2 v;
 vec4 o = vec4(0.0);

 float f = 2.0 + fbm(p + vec2(iTime * 5.0, 0.0)) * 0.5;

 for (float i = 0.0; i < 35.0; i++) {
 v = p + cos(i * i + (iTime + p.x * 0.08) * 0.025 + i * vec2(13.0, 11.0)) * 3.5 + vec2(sin(iTime * 3.0 + i) * 0.003, cos(iTime * 3.5 - i) * 0.003);
 float tailNoise = fbm(v + vec2(iTime * 0.5, i)) * 0.3 * (1.0 - (i / 35.0));
 vec4 auroraColors = vec4(
 0.1 + 0.3 * sin(i * 0.2 + iTime * 0.4),
 0.3 + 0.5 * cos(i * 0.3 + iTime * 0.5),
 0.7 + 0.3 * sin(i * 0.4 + iTime * 0.3),
 1.0
 );
 vec4 currentContribution = auroraColors * exp(sin(i * i + iTime * 0.8)) / length(max(v, vec2(v.x * f * 0.015, v.y * 1.5)));
 float thinnessFactor = smoothstep(0.0, 1.0, i / 35.0) * 0.6;
 o += currentContribution * (1.0 + tailNoise * 0.8) * thinnessFactor;
 }

 o = tanh(pow(o / 100.0, vec4(1.6)));
 gl_FragColor = o * 1.5;
 }
 `
 });

 const geometry = new THREE.PlaneGeometry(2, 2);
 const mesh = new THREE.Mesh(geometry, material);
 scene.add(mesh);

 let frameId;
 const animate = () => {
 material.uniforms.iTime.value += 0.016;
 renderer.render(scene, camera);
 frameId = requestAnimationFrame(animate);
 };
 animate();

 const handleResize = () => {
 renderer.setSize(window.innerWidth, window.innerHeight);
 material.uniforms.iResolution.value.set(window.innerWidth, window.innerHeight);
 };
 window.addEventListener('resize', handleResize);

 return () => {
 cancelAnimationFrame(frameId);
 window.removeEventListener('resize', handleResize);
 container.removeChild(renderer.domElement);
 geometry.dispose();
 material.dispose();
 renderer.dispose();
 };
 }, []);

 return (
 <div ref={containerRef} className="relative overflow-x-hidden">
 <div className="relative z-10 divider" />
 </div>
 );
};

export default AnoAI;