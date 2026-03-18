// Fate OS Site Configuration - Cosmic Intelligence Platform
export const siteConfig = {
  name: "Fate OS",
  tagline: "Cosmic Intelligence Platform",
  description: "Advanced cosmic analysis combining ancient wisdom with modern algorithms. Discover your cosmic blueprint through weton, shio, zodiac, numerology, and human design.",
  url: "https://fateos.com",
  
  // Cosmic navigation
  nav: {
    links: [
      { label: "Cosmic Analysis", href: "#analysis" },
      { label: "Systems", href: "#systems" },
      { label: "About", href: "#about" },
      { label: "Pricing", href: "#pricing" },
    ],
    cta: { label: "Enter the Cosmos", href: "#analysis" },
  },
  
  // Hero section - Cosmic entrance
  hero: {
    badge: "Cosmic Intelligence Platform",
    title: "Unlock Your Cosmic Blueprint",
    subtitle: "Advanced analysis combining weton, shio, zodiac, numerology, and human design algorithms.",
    cta: {
      primary: { label: "Begin Analysis", href: "#analysis" },
      secondary: { label: "Learn More", href: "#systems" },
    },
  },
  
  // Cosmic systems we analyze
  systems: [
    {
      name: "Weton",
      description: "Javanese calendar system for personality and destiny patterns",
      icon: "🌙",
      color: "quantum"
    },
    {
      name: "Shio",
      description: "Chinese zodiac animal signs and their cosmic influences",
      icon: "🐉",
      color: "galactic"
    },
    {
      name: "Zodiac",
      description: "Western astrological signs and planetary alignments",
      icon: "♈",
      color: "accent"
    },
    {
      name: "Numerology",
      description: "Numerical patterns revealing life path and purpose",
      icon: "🔢",
      color: "quantum"
    },
    {
      name: "Human Design",
      description: "Genetic and energetic blueprint for optimal living",
      icon: "🌀",
      color: "galactic"
    }
  ],
  
  // Analysis input fields
  analysisFields: [
    { name: "fullName", label: "Full Name", type: "text", required: true },
    { name: "birthDate", label: "Birth Date", type: "date", required: true },
    { name: "birthTime", label: "Birth Time", type: "time", required: false },
    { name: "birthPlace", label: "Birth Place", type: "text", required: false }
  ],
  
  // Pricing tiers
  pricing: [
    {
      name: "Cosmic Insight",
      price: "$49",
      description: "Basic cosmic analysis with weton, shio, and zodiac",
      features: ["Weton Analysis", "Shio Profile", "Zodiac Alignment", "Basic Numerology"]
    },
    {
      name: "Cosmic Blueprint",
      price: "$99",
      description: "Comprehensive analysis including all cosmic systems",
      features: ["All Cosmic Systems", "Advanced Algorithms", "Personalized Insights", "30-Day Support"]
    },
    {
      name: "Cosmic Master",
      price: "$199",
      description: "Premium analysis with ongoing cosmic monitoring",
      features: ["Lifetime Access", "Quarterly Updates", "Priority Support", "Advanced Visualization"]
    }
  ]
};

export type SiteConfig = typeof siteConfig;