"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CosmicShaderBackground() {
 const containerRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
 if (!containerRef.current) return;

 const container = containerRef.current;
 const scene = new THREE.Scene();
 const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
 const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
 renderer.setSize(window.innerWidth, window.innerHeight);
 container.appendChild(renderer.domElement);

 // Create cosmic particle system (optimized for mobile)
 const isMobile = window.innerWidth < 768;
 const particleCount = isMobile ? 50 : 100; // Reduce particles on mobile
 const particles = new THREE.BufferGeometry();
 const positions = new Float32Array(particleCount * 3);
 const colors = new Float32Array(particleCount * 3);
 
 for (let i = 0; i < particleCount; i++) {
   positions[i * 3] = (Math.random() - 0.5) * (isMobile ? 15 : 20);
   positions[i * 3 + 1] = (Math.random() - 0.5) * (isMobile ? 15 : 20);
   positions[i * 3 + 2] = (Math.random() - 0.5) * (isMobile ? 15 : 20);
   
   // Cosmic colors (orange, blue, purple)
   const colorChoice = Math.floor(Math.random() * 3);
   if (colorChoice === 0) {
     colors[i * 3] = 1.0;     // R - Orange
     colors[i * 3 + 1] = 0.42; // G
     colors[i * 3 + 2] = 0.21; // B
   } else if (colorChoice === 1) {
     colors[i * 3] = 0.0;      // R - Blue
     colors[i * 3 + 1] = 0.83; // G
     colors[i * 3 + 2] = 1.0;  // B
   } else {
     colors[i * 3] = 0.55;     // R - Purple
     colors[i * 3 + 1] = 0.36; // G
     colors[i * 3 + 2] = 0.96;  // B
   }
 }
 
 particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
 particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
 
 const particleMaterial = new THREE.PointsMaterial({
   size: isMobile ? 0.08 : 0.1, // Smaller particles on mobile
   vertexColors: true,
   transparent: true,
   opacity: isMobile ? 0.4 : 0.6, // Lower opacity on mobile
   blending: THREE.AdditiveBlending
 });
 
 const particleSystem = new THREE.Points(particles, particleMaterial);
 scene.add(particleSystem);
 
 // Animation loop
 let frameId: number;
 const animate = () => {
   frameId = requestAnimationFrame(animate);
   
   // Gentle cosmic movement
   particleSystem.rotation.x += 0.0005;
   particleSystem.rotation.y += 0.001;
   particleSystem.rotation.z += 0.0003;
   
   // Pulse effect
   const time = performance.now() * 0.001;
   particleSystem.scale.setScalar(1 + Math.sin(time) * 0.1);
   
   renderer.render(scene, camera);
 };
 
 animate();

 // Handle resize
 const handleResize = () => {
   renderer.setSize(window.innerWidth, window.innerHeight);
 };
 window.addEventListener('resize', handleResize);

 return () => {
   cancelAnimationFrame(frameId);
   window.removeEventListener('resize', handleResize);
   if (container.contains(renderer.domElement)) {
     container.removeChild(renderer.domElement);
   }
   particles.dispose();
   particleMaterial.dispose();
   renderer.dispose();
 };
 }, []);

 return (
   <div ref={containerRef} className="shader-background cosmic-reveal" />
 );
}