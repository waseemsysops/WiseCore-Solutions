import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Shield,
  BarChart3,
  Cloud,
  Code,
  Laptop,
  Users,
  Award,
  Headphones,
  Zap,
  MapPin,
  Phone,
  Mail,
  ArrowUp,
  Star,
  Check,
  Globe,
  FileCode,
  Download,
  Menu,
  X,
  Layers,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

// --- Types ---
interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatar: string;
}

interface Service {
  id: string;
  icon: any;
  title: string;
  shortDesc: string;
  longDesc: string;
  features: string[];
}

interface CounterState {
  years: number;
  projects: number;
  clients: number;
  countries: number;
}

export default function App() {
  // --- State Variables ---
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'quote' | 'export'>('quote');
  
  // --- Form States ---
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [quoteForm, setQuoteForm] = useState({ name: '', email: '', service: 'custom-software', budget: '$10k-$25k', details: '' });
  const [quoteSuccess, setQuoteSuccess] = useState(false);

  // --- Stats State for Animated Counters ---
  const [counters, setCounters] = useState<CounterState>({ years: 0, projects: 0, clients: 0, countries: 0 });
  const statsSectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // --- Static Content Data ---
  const services: Service[] = [
    {
      id: 'custom-software',
      icon: Code,
      title: 'Custom Software Development',
      shortDesc: 'Tailor-made, robust applications engineered to solve your specific business challenges and streamline operations.',
      longDesc: 'We build scalable, secure, and intuitive web and mobile applications designed exactly for your workflows. From legacy modernization to next-gen product development, our expert team ensures your platform is future-proof.',
      features: ['Enterprise Web Applications', 'Mobile App Development (iOS/Android)', 'API Design & Integrations', 'Legacy Code Modernization']
    },
    {
      id: 'cloud-solutions',
      icon: Cloud,
      title: 'Cloud Solutions & DevOps',
      shortDesc: 'Accelerate agility and reduce costs with seamless cloud migrations, optimization, and robust automation pipelines.',
      longDesc: 'Transition to the cloud with minimal disruption. We design and execute cloud strategies across AWS, Azure, and Google Cloud, establishing automated CI/CD pipelines, containerized architectures, and continuous cost-optimization.',
      features: ['Cloud Migration Strategy', 'Kubernetes & Containerization', 'Infrastructure as Code (IaC)', '24/7 Cloud Monitoring & Ops']
    },
    {
      id: 'it-consulting',
      icon: Laptop,
      title: 'Strategic IT Consulting',
      shortDesc: 'Align your technology infrastructure with long-term business objectives to drive efficiency and sustainable growth.',
      longDesc: 'Gain a dedicated technology partner. Our seasoned consultants conduct deep audits of your existing infrastructure, optimize workflows, and lay out an actionable technology road map that aligns with your bottom-line metrics.',
      features: ['Digital Transformation Roadmaps', 'Technology Audits & Assessments', 'IT Budgeting & ROI Analysis', 'vCTO / Interim Technology Leadership']
    },
    {
      id: 'cybersecurity',
      icon: Shield,
      title: 'Cybersecurity & Compliance',
      shortDesc: 'Protect your valuable digital assets, customer trust, and operational integrity with top-tier security standards.',
      longDesc: 'Secure your business against modern threat vectors. We deploy multi-layered defensive frameworks, perform penetration testing, establish vulnerability management programs, and ensure strict compliance with standards like GDPR, SOC2, and HIPAA.',
      features: ['Threat Detection & Incident Response', 'Penetration Testing & Audits', 'Compliance & Risk Management', 'Employee Security Awareness Training']
    },
    {
      id: 'data-analytics',
      icon: BarChart3,
      title: 'Data Analytics & Business Intelligence',
      shortDesc: 'Turn raw datasets into predictive insights, dynamic dashboards, and actionable business intelligence.',
      longDesc: 'Stop guessing and start deciding. We engineer secure data pipelines, centralize information in high-performance data warehouses, and build rich interactive dashboards that reveal market trends, user behaviors, and performance leaks.',
      features: ['Data Engineering & Pipelines', 'Interactive PowerBI & Tableau Dashboards', 'Predictive Analysis & ML Models', 'Customer Analytics & Retention Metrics']
    },
    {
      id: 'digital-transformation',
      icon: Globe,
      title: 'Digital Transformation',
      shortDesc: 'Modernize legacy processes, digitize customer touchpoints, and cultivate a highly resilient digital core.',
      longDesc: 'Reimagine how your organization operates. We help you replace manual bottlenecks with automated workflows, integrate disjointed systems, and implement collaboration tools that empower hybrid workforces.',
      features: ['Business Process Automation', 'Customer Experience (CX) Digitization', 'SaaS Implementation & Migration', 'Change Management Consulting']
    }
  ];

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Jenkins',
      role: 'Chief Technology Officer',
      company: 'LogiGlobal Logistics',
      quote: "DEVCOWISE TECHNOLOGIES completely transformed our legacy supply chain. Their custom cloud architecture reduced our operational downtime by 98% and improved tracking transparency ten-fold. They are a partner in the truest sense.",
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 2,
      name: 'David Chen',
      role: 'VP of Engineering',
      company: 'FinTech Flow Inc.',
      quote: "Their cybersecurity audit was the most thorough we have ever experienced. DEVCOWISE TECHNOLOGIES did not just hand us a PDF of vulnerabilities; they worked side-by-side with our developers to patch and verify every single gateway.",
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 3,
      name: 'Elena Rostova',
      role: 'Director of Digital Strategy',
      company: 'RetailSphere Global',
      quote: "We struggled for years to integrate our regional POS databases. DEVCOWISE TECHNOLOGIES built a unified data pipeline and dashboard in record time. Our executive leadership now makes real-time, data-driven inventory adjustments.",
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
    }
  ];

  // --- Effects & Event Listeners ---
  useEffect(() => {
    // Scroll listener for sticky header and Back to Top
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (window.scrollY > 350) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }

      // Check current visible section to update navbar active state
      const sections = ['home', 'about', 'services', 'whyus', 'testimonials', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for initiating animated statistics counter
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateCounters();
        }
      },
      { threshold: 0.1 }
    );

    if (statsSectionRef.current) {
      observer.observe(statsSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  // --- Logic Helpers ---
  const animateCounters = () => {
    const targets = { years: 12, projects: 350, clients: 180, countries: 15 };
    const duration = 1500; // ms
    const stepTime = 30; // ms
    const steps = duration / stepTime;

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setCounters({
        years: Math.min(targets.years, Math.round((targets.years / steps) * step)),
        projects: Math.min(targets.projects, Math.round((targets.projects / steps) * step)),
        clients: Math.min(targets.clients, Math.round((targets.clients / steps) * step)),
        countries: Math.min(targets.countries, Math.round((targets.countries / steps) * step)),
      });

      if (step >= steps) {
        clearInterval(interval);
        setCounters(targets); // Ensure exact final numbers are set
      }
    }, stepTime);
  };

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of the sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // --- Form Handlers ---
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!contactForm.name.trim()) errors.name = 'Full name is required.';
    if (!contactForm.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(contactForm.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!contactForm.subject.trim()) errors.subject = 'Subject is required.';
    if (!contactForm.message.trim()) {
      errors.message = 'Message details are required.';
    } else if (contactForm.message.length < 10) {
      errors.message = 'Message must be at least 10 characters long.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    // Simulate backend response
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setContactForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 8000);
    }, 1500);
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteForm.name || !quoteForm.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setQuoteSuccess(true);
      setTimeout(() => {
        setQuoteSuccess(false);
        setIsModalOpen(false);
        setQuoteForm({ name: '', email: '', service: 'custom-software', budget: '$10k-$25k', details: '' });
      }, 3000);
    }, 1200);
  };

  // --- Trigger Downloader for Static Version ---
  const triggerStaticDownload = () => {
    const link = document.createElement('a');
    link.href = '/devcowise-technologies-static.html';
    link.download = 'devcowise-technologies-static.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
      
      {/* --- EXPORT/STATIC COMPANION BANNER --- */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 flex flex-wrap justify-between items-center gap-2 border-b border-slate-800 z-50 sticky top-0 md:relative">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>DEVCOWISE TECHNOLOGIES Interactive Preview</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-slate-400">Need the standalone HTML?</span>
          <button
            onClick={() => {
              setModalType('export');
              setIsModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-medium px-2.5 py-1 rounded transition text-[11px] cursor-pointer"
          >
            <FileCode className="h-3 w-3" />
            <span>Export Static HTML</span>
          </button>
          <button
            onClick={triggerStaticDownload}
            className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-medium px-2.5 py-1 rounded transition text-[11px] cursor-pointer"
          >
            <Download className="h-3 w-3" />
            <span>Download Static File</span>
          </button>
        </div>
      </div>

      {/* --- STICKY NAVBAR --- */}
      <header
        className={`sticky top-0 md:top-auto z-40 transition-all duration-300 w-full ${
          isScrolled
            ? 'bg-slate-900/95 backdrop-blur-md shadow-lg py-3 border-b border-slate-800'
            : 'bg-slate-900 py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <div
            onClick={() => handleScrollTo('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="bg-gradient-to-tr from-blue-600 to-cyan-400 p-2.5 rounded-xl text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Layers className="h-5 w-5" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-lg text-white tracking-tight">
                DEVCOWISE
              </span>
              <span className="block text-[9px] text-blue-400 tracking-widest uppercase font-semibold leading-none mt-1">
                TECHNOLOGIES
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'services', label: 'Services' },
              { id: 'whyus', label: 'Why Us' },
              { id: 'testimonials', label: 'Testimonials' },
              { id: 'contact', label: 'Contact' }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => handleScrollTo(link.id)}
                className={`font-medium text-sm transition-colors cursor-pointer relative py-1 ${
                  activeSection === link.id
                    ? 'text-blue-400'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 rounded-full"></span>
                )}
              </button>
            ))}
          </nav>

          {/* CTA & Mobile Menu Trigger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setModalType('quote');
                setIsModalOpen(true);
              }}
              className="hidden sm:inline-flex items-center bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-4 py-2.5 rounded-lg shadow-md hover:shadow-blue-500/10 transition duration-200 cursor-pointer"
            >
              <span>Get a Quote</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white md:hidden hover:bg-slate-800 rounded-lg transition"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="fixed right-0 top-0 bottom-0 w-4/5 max-w-sm bg-slate-900 p-6 shadow-2xl flex flex-col justify-between border-l border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-gradient-to-tr from-blue-600 to-cyan-400 p-2 rounded-lg text-white">
                    <Layers className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col leading-none">
                    <span className="font-display font-bold text-base text-white tracking-tight">
                      DEVCOWISE
                    </span>
                    <span className="block text-[8px] text-blue-400 tracking-widest uppercase font-semibold leading-none mt-0.5">
                      TECHNOLOGIES
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {[
                  { id: 'home', label: 'Home' },
                  { id: 'about', label: 'About Us' },
                  { id: 'services', label: 'Our Services' },
                  { id: 'whyus', label: 'Why Choose Us' },
                  { id: 'testimonials', label: 'Client Reviews' },
                  { id: 'contact', label: 'Contact Us' }
                ].map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleScrollTo(link.id)}
                    className={`text-left font-medium text-base py-2.5 px-4 rounded-lg transition-colors ${
                      activeSection === link.id
                        ? 'bg-blue-600/10 text-blue-400 font-semibold'
                        : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-800 pt-6">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setModalType('quote');
                  setIsModalOpen(true);
                }}
                className="w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl shadow-lg transition"
              >
                Get a Quote
              </button>
              <p className="text-center text-xs text-slate-500 mt-4">
                © 2026 DEVCOWISE TECHNOLOGIES. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative bg-slate-900 text-white pt-16 pb-24 md:py-32 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2e86ff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
        
        {/* Soft abstract lighting background shapes */}
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -right-40 w-[450px] h-[450px] rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-full text-blue-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              <span>Innovating Digital Excellence</span>
            </div>
            
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
              Smart Solutions for a <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Smarter Business</span>
            </h1>
            
            <p className="text-slate-300 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              DEVCOWISE TECHNOLOGIES partners with forward-thinking enterprises to design, engineer, and deploy high-performance custom software, cloud strategies, and cybersecurity defenses.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 pt-4">
              <button
                onClick={() => handleScrollTo('contact')}
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleScrollTo('about')}
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 hover:border-slate-600 font-semibold px-8 py-4 rounded-xl transition duration-200 cursor-pointer"
              >
                <span>Learn More</span>
              </button>
            </div>

            {/* Trusted partner indicators */}
            <div className="pt-8 border-t border-slate-800/60 max-w-md mx-auto lg:mx-0">
              <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold text-center lg:text-left mb-3">
                Proven Capabilities In
              </p>
              <div className="flex justify-center lg:justify-start gap-4 text-xs font-medium text-slate-400">
                <span className="flex items-center gap-1">
                  <Check className="h-3.5 w-3.5 text-blue-400" /> AWS / Cloud
                </span>
                <span className="text-slate-700">|</span>
                <span className="flex items-center gap-1">
                  <Check className="h-3.5 w-3.5 text-blue-400" /> Web & Mobile
                </span>
                <span className="text-slate-700">|</span>
                <span className="flex items-center gap-1">
                  <Check className="h-3.5 w-3.5 text-blue-400" /> Security
                </span>
              </div>
            </div>
          </div>

          {/* Hero Illustration / Graphic */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-md lg:max-w-none aspect-square">
              {/* Outer decorative rings */}
              <div className="absolute inset-0 border border-blue-500/10 rounded-full animate-[spin_40s_linear_infinite]"></div>
              <div className="absolute inset-4 border border-cyan-400/5 border-dashed rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>
              
              {/* Inner ambient glow */}
              <div className="absolute top-1/4 left-1/4 right-1/4 bottom-1/4 bg-blue-600/30 rounded-full blur-3xl animate-pulse"></div>

              {/* High-fidelity responsive Vector SVG Art */}
              <svg viewBox="0 0 500 500" className="w-full h-full relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Central Core Circle */}
                <circle cx="250" cy="250" r="75" fill="url(#coreGradient)" className="filter drop-shadow-[0_10px_20px_rgba(46,134,255,0.3)]" />
                
                {/* Orbital nodes and connection pathways */}
                <path d="M 250,250 L 120,150" stroke="#2E86FF" strokeWidth="2.5" strokeDasharray="6 4" className="opacity-70" />
                <path d="M 250,250 L 380,150" stroke="#00D2FF" strokeWidth="2.5" className="opacity-70" />
                <path d="M 250,250 L 350,370" stroke="#2E86FF" strokeWidth="2.5" strokeDasharray="6 4" className="opacity-70" />
                <path d="M 250,250 L 150,370" stroke="#00D2FF" strokeWidth="2.5" className="opacity-70" />

                {/* Sub-connections */}
                <path d="M 120,150 L 380,150" stroke="#1E293B" strokeWidth="1.5" />
                <path d="M 380,150 L 350,370" stroke="#1E293B" strokeWidth="1.5" />
                <path d="M 350,370 L 150,370" stroke="#1E293B" strokeWidth="1.5" />
                <path d="M 150,370 L 120,150" stroke="#1E293B" strokeWidth="1.5" />

                {/* Node 1: Cloud Service */}
                <g transform="translate(120, 150)" className="cursor-pointer group">
                  <circle r="36" fill="#0B1F3A" stroke="#2E86FF" strokeWidth="2" />
                  <circle r="30" fill="url(#nodeBlue)" />
                  <path d="M-10 4 C-10 1, -5 -4, 0 -4 C2 -4, 4 -3, 5 -1 C6 -3, 9 -3, 10 -1 C12 -1, 13 1, 13 3 C13 6, 11 8, 8 8 L-8 8 C-10 8, -10 6, -10 4 Z" fill="white" />
                </g>

                {/* Node 2: Database / Security */}
                <g transform="translate(380, 150)">
                  <circle r="36" fill="#0B1F3A" stroke="#00D2FF" strokeWidth="2" />
                  <circle r="30" fill="url(#nodeTeal)" />
                  <path d="M-6 -10 L6 -10 L8 -2 C8 4, 3 9, 0 11 C-3 9, -8 4, -8 -2 Z" fill="white" className="scale-75" />
                </g>

                {/* Node 3: Analytics / Graphs */}
                <g transform="translate(350, 370)">
                  <circle r="36" fill="#0B1F3A" stroke="#2E86FF" strokeWidth="2" />
                  <circle r="30" fill="url(#nodeBlue)" />
                  <path d="M-10 8 L-10 -2 L-6 -2 L-6 8 Z M-2 8 L-2 -8 L2 -8 L2 8 Z M6 8 L6 2 L10 2 L10 8 Z" fill="white" className="scale-75" />
                </g>

                {/* Node 4: Custom Coding / Systems */}
                <g transform="translate(150, 370)">
                  <circle r="36" fill="#0B1F3A" stroke="#00D2FF" strokeWidth="2" />
                  <circle r="30" fill="url(#nodeTeal)" />
                  <path d="M-8 -5 L-13 0 L-8 5 M8 -5 L13 0 L8 5 M-2 8 L2 -8" stroke="white" strokeWidth="2" strokeLinecap="round" className="scale-75" />
                </g>

                {/* Floating Micro-nodes and circuits */}
                <circle cx="250" cy="90" r="6" fill="#2E86FF" className="animate-ping" />
                <circle cx="100" cy="270" r="5" fill="#00D2FF" />
                <circle cx="410" cy="280" r="7" fill="#2E86FF" />
                <circle cx="220" cy="420" r="4" fill="#00D2FF" />

                {/* Gradients */}
                <defs>
                  <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1E3A8A" />
                    <stop offset="50%" stopColor="#2E86FF" />
                    <stop offset="100%" stopColor="#00D2FF" />
                  </linearGradient>
                  <linearGradient id="nodeBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1E40AF" />
                    <stop offset="100%" stopColor="#2E86FF" />
                  </linearGradient>
                  <linearGradient id="nodeTeal" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0F766E" />
                    <stop offset="100%" stopColor="#00D2FF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* --- ABOUT US SECTION & STATS --- */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Story & Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                <span>Who We Are</span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
                Architecting Modern Enterprise Solutions Since 2014
              </h2>
              <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
                At DEVCOWISE TECHNOLOGIES, we believe that software should not just solve existing workflows; it should catalyze business innovation. We partner with companies of all sizes to architect custom environments that solve key bottleneck challenges.
              </p>
              <div className="border-l-4 border-blue-600 pl-4 py-1.5 italic text-slate-700 font-medium">
                "Our mission is to empower companies with cutting-edge digital blueprints, building secure and scalable solutions designed to dominate tomorrow."
              </div>
              <p className="text-slate-600 leading-relaxed">
                Whether migrating massive database clusters, developing specialized customer-facing web apps, or auditing defensive compliance strategies, DEVCOWISE TECHNOLOGIES stands as your dedicated consulting powerhouse.
              </p>

              <div className="pt-4">
                <button
                  onClick={() => handleScrollTo('services')}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-500 font-bold text-sm tracking-wide uppercase transition duration-200 group cursor-pointer"
                >
                  <span>Explore our capabilities</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Key Stats Block */}
            <div className="lg:col-span-5" ref={statsSectionRef}>
              <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:15px_15px] pointer-events-none"></div>
                <div className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full bg-blue-600/35 blur-3xl pointer-events-none"></div>

                <div className="relative z-10 grid grid-cols-2 gap-x-8 gap-y-10">
                  {/* Stat 1 */}
                  <div className="space-y-1.5">
                    <p className="font-display font-bold text-4xl sm:text-5xl text-blue-400">
                      {counters.years}+
                    </p>
                    <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                      Years Experience
                    </p>
                    <p className="text-slate-500 text-[11px] leading-tight">
                      In enterprise solutions
                    </p>
                  </div>

                  {/* Stat 2 */}
                  <div className="space-y-1.5">
                    <p className="font-display font-bold text-4xl sm:text-5xl text-cyan-400">
                      {counters.projects}+
                    </p>
                    <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                      Projects Built
                    </p>
                    <p className="text-slate-500 text-[11px] leading-tight">
                      Delivered successfully
                    </p>
                  </div>

                  {/* Stat 3 */}
                  <div className="space-y-1.5">
                    <p className="font-display font-bold text-4xl sm:text-5xl text-blue-400">
                      {counters.clients}+
                    </p>
                    <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                      Active Clients
                    </p>
                    <p className="text-slate-500 text-[11px] leading-tight">
                      Global trust and loyalty
                    </p>
                  </div>

                  {/* Stat 4 */}
                  <div className="space-y-1.5">
                    <p className="font-display font-bold text-4xl sm:text-5xl text-cyan-400">
                      {counters.countries}+
                    </p>
                    <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                      Countries Served
                    </p>
                    <p className="text-slate-500 text-[11px] leading-tight">
                      Providing localized service
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800 flex items-center gap-3">
                  <Award className="h-5 w-5 text-yellow-500 shrink-0" />
                  <p className="text-xs text-slate-300 font-medium">
                    Certified Partner with Google Cloud & AWS networks
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- SERVICES SECTION (6 cards) --- */}
      <section id="services" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-1 bg-blue-100/80 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              <span>What We Provide</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Comprehensive Technology Ecosystem
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Explore how DEVCOWISE TECHNOLOGIES modernizes operations, secures customer databases, and establishes flexible digital workflows built around your direct corporate goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComp = service.icon;
              return (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl p-8 border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-blue-500/20 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-5">
                    {/* Icon wrapper */}
                    <div className="inline-flex items-center justify-center p-3.5 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      <IconComp className="h-6 w-6" />
                    </div>

                    <h3 className="font-display font-bold text-lg text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {service.shortDesc}
                    </p>

                    {/* Checkmarks inside service card */}
                    <ul className="space-y-2 pt-2">
                      {service.features.slice(0, 2).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-500 font-medium">
                          <Check className="h-3.5 w-3.5 text-blue-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setQuoteForm(prev => ({ ...prev, service: service.id }));
                        setModalType('quote');
                        setIsModalOpen(true);
                      }}
                      className="text-xs text-blue-600 hover:text-blue-500 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <span>Inquire service</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest bg-slate-100 px-2.5 py-1 rounded-md">
                      Enterprise
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* --- WHY CHOOSE US SECTION (4 Feature blocks) --- */}
      <section id="whyus" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:25px_25px] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Context Header Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                <span>Our Value Advantage</span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
                Why Industry Leaders Choose DEVCOWISE TECHNOLOGIES
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                We blend technical mastery with real-world business consultation. Our team ensures that your project is not just completed, but thrives under rigorous production conditions.
              </p>
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="bg-emerald-500/10 text-emerald-400 p-1.5 rounded-md shrink-0">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-white">99.2% Client Retention Rate</h4>
                    <p className="text-xs text-slate-400">Based on multi-year contract renewals.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-emerald-500/10 text-emerald-400 p-1.5 rounded-md shrink-0">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-white">SLA-Guaranteed Delivery</h4>
                    <p className="text-xs text-slate-400">On-time delivery benchmarks backed by formal SLA.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features 2x2 Grid Column */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Feature 1 */}
              <div className="bg-slate-800/50 hover:bg-slate-800 border border-slate-800 hover:border-slate-700/60 p-6 rounded-2xl transition duration-300 space-y-4">
                <div className="inline-flex justify-center items-center p-3 rounded-xl bg-blue-500/10 text-blue-400">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="font-display font-semibold text-base sm:text-lg text-white">
                  Expert-Only Team
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  We don't assign junior developers to your account. Your project is led exclusively by senior engineers with 8+ years of field experience.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-slate-800/50 hover:bg-slate-800 border border-slate-800 hover:border-slate-700/60 p-6 rounded-2xl transition duration-300 space-y-4">
                <div className="inline-flex justify-center items-center p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="font-display font-semibold text-base sm:text-lg text-white">
                  Proven Track Record
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Over 350 enterprise integrations successfully deployed globally, spanning finance, logistics, retail, and tech-driven startups.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-slate-800/50 hover:bg-slate-800 border border-slate-800 hover:border-slate-700/60 p-6 rounded-2xl transition duration-300 space-y-4">
                <div className="inline-flex justify-center items-center p-3 rounded-xl bg-blue-500/10 text-blue-400">
                  <Headphones className="h-6 w-6" />
                </div>
                <h3 className="font-display font-semibold text-base sm:text-lg text-white">
                  24/7 Dedicated Support
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Our system operations team is on call round-the-clock, ensuring that server downtime is instantly triaged and corrected within minutes.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-slate-800/50 hover:bg-slate-800 border border-slate-800 hover:border-slate-700/60 p-6 rounded-2xl transition duration-300 space-y-4">
                <div className="inline-flex justify-center items-center p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="font-display font-semibold text-base sm:text-lg text-white">
                  Scalable Architectures
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  We write code ready for heavy usage. Every framework we construct is designed to adapt, scale up, and handle spiking query volumes.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* --- TIMELINE SECTION --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              <span>Operational Blueprint</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Our Structured Path to Success
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              We leverage an iterative, highly transparent pipeline format that keeps you informed and in full control through every delivery milestone.
            </p>
          </div>

          {/* Horizontal Timeline Container */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Background connecting line (only on desktop) */}
            <div className="hidden md:block absolute top-[44px] left-[12%] right-[12%] h-[2px] bg-slate-200 z-0"></div>

            {/* Step 1 */}
            <div className="space-y-4 text-center md:text-left relative z-10 group">
              <div className="mx-auto md:mx-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white font-bold transition duration-300 shadow-md">
                01
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                Discover
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed pr-2">
                We conduct intensive initial workshops to map out user stories, audit current technological pain points, and detail all final functional scopes.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-4 text-center md:text-left relative z-10 group">
              <div className="mx-auto md:mx-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white font-bold transition duration-300 shadow-md">
                02
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                Plan
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed pr-2">
                Our architects generate interactive wireframes, select modular dependencies, and formulate structured security pipelines and sprint budgets.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-4 text-center md:text-left relative z-10 group">
              <div className="mx-auto md:mx-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white font-bold transition duration-300 shadow-md">
                03
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                Build
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed pr-2">
                Senior developers write clean, responsive typescript code. We run continuous QA validation, code reviews, and end-to-end integration tests.
              </p>
            </div>

            {/* Step 4 */}
            <div className="space-y-4 text-center md:text-left relative z-10 group">
              <div className="mx-auto md:mx-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white font-bold transition duration-300 shadow-md">
                04
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                Deliver
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed pr-2">
                We migrate production clusters seamlessly under zero-downtime guidelines, transitioning internal workforces with hands-on technical training.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* --- TESTIMONIALS (Carousel/Slider) --- */}
      <section id="testimonials" className="py-20 bg-slate-50 border-t border-b border-slate-200/50 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              <span>Client Reviews</span>
            </div>
            <h2 className="font-display font-bold text-3xl text-slate-900 tracking-tight">
              What Our Partners Say
            </h2>
          </div>

          {/* Carousel Card */}
          <div className="relative bg-white border border-slate-200/60 rounded-3xl p-8 sm:p-12 shadow-md relative">
            
            {/* Quotes decorative mark */}
            <span className="absolute top-6 left-8 text-8xl text-slate-100 font-serif leading-none select-none pointer-events-none">
              “
            </span>

            <div className="relative z-10 space-y-6">
              {/* Star Rating */}
              <div className="flex gap-1 justify-center sm:justify-start">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote Content */}
              <blockquote className="text-slate-700 text-base sm:text-lg sm:leading-relaxed font-normal italic text-center sm:text-left">
                "{testimonials[currentTestimonial].quote}"
              </blockquote>

              {/* Author Info */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-slate-100">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                  referrerPolicy="no-referrer"
                />
                <div className="text-center sm:text-left">
                  <h4 className="font-display font-bold text-slate-900 text-sm sm:text-base">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-slate-500 text-xs font-medium">
                    {testimonials[currentTestimonial].role} — <span className="text-blue-600 font-semibold">{testimonials[currentTestimonial].company}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Manual Navigation Controls */}
            <div className="flex justify-between items-center mt-8 sm:mt-0 sm:absolute sm:bottom-12 sm:right-12 gap-3 z-20">
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                className="bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 p-2.5 rounded-full transition duration-200 cursor-pointer"
                aria-label="Previous review"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                className="bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 p-2.5 rounded-full transition duration-200 cursor-pointer"
                aria-label="Next review"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentTestimonial(idx)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  currentTestimonial === idx ? 'w-8 bg-blue-600' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              ></button>
            ))}
          </div>

        </div>
      </section>

      {/* --- CALL TO ACTION BANNER --- */}
      <section className="py-16 bg-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-900/35 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-6">
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white">
            Ready to Accelerate Your Digital Blueprints?
          </h2>
          <p className="text-blue-100 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Schedule a diagnostic workshop with our systems consultants. We'll identify architectural bottlenecks and build an actionable proof of concept.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={() => {
                setModalType('quote');
                setIsModalOpen(true);
              }}
              className="w-full sm:w-auto bg-white hover:bg-slate-100 text-blue-600 font-bold px-8 py-4 rounded-xl shadow-lg transition cursor-pointer"
            >
              Get a Free Consultation
            </button>
            <button
              onClick={() => handleScrollTo('contact')}
              className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white border border-blue-500 font-bold px-8 py-4 rounded-xl transition cursor-pointer"
            >
              Speak to an Expert
            </button>
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION & INTERACTIVE MAP MOCK --- */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              <span>Connect with us</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Start Your Digital Project Today
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Submit details about your workflow goals, or schedule an in-person meeting at our global regional office headquarters.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Info & Interactive map mock */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-6">
                <h3 className="font-display font-bold text-xl text-slate-900">
                  DEVCOWISE TECHNOLOGIES Head Office
                </h3>
                
                <div className="space-y-4">
                  {/* Item 1 */}
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-50 text-blue-600 p-2.5 rounded-lg shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Address</p>
                      <p className="text-slate-700 text-sm font-medium mt-0.5">
                        Suite 400, 100 Innovation Parkway, Silicon Valley, CA 94025
                      </p>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-50 text-blue-600 p-2.5 rounded-lg shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Call directly</p>
                      <p className="text-slate-700 text-sm font-medium mt-0.5">
                        +1 (800) 555-WISE (9473)
                      </p>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-50 text-blue-600 p-2.5 rounded-lg shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Email Inquiry</p>
                      <p className="text-slate-700 text-sm font-medium mt-0.5">
                        solutions@devcowise.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Vector Map Mock */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 overflow-hidden shadow-sm space-y-3 relative group">
                <div className="absolute inset-0 bg-blue-600/5 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center pointer-events-none">
                  <span className="bg-slate-900/90 text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-lg flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-cyan-400" /> HQ Silicon Valley location
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-600 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                    Interactive Headquarters Map
                  </span>
                  <span className="text-slate-400 font-mono text-[10px]">94025 GPS Coordinates</span>
                </div>

                {/* Styled Map Illustration */}
                <div className="bg-slate-100 h-44 rounded-xl border border-slate-200 relative overflow-hidden flex justify-center items-center">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:12px_12px]"></div>
                  
                  {/* Simulated roads */}
                  <div className="absolute top-1/2 left-0 right-0 h-[8px] bg-slate-200"></div>
                  <div className="absolute left-1/3 top-0 bottom-0 w-[8px] bg-slate-200"></div>
                  <div className="absolute left-2/3 top-0 bottom-0 w-[6px] bg-slate-200 rotate-12"></div>

                  {/* Marker */}
                  <div className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                    <div className="relative">
                      <div className="h-10 w-10 bg-blue-600/30 rounded-full animate-ping absolute -top-1 -left-1"></div>
                      <div className="h-8 w-8 bg-blue-600 text-white rounded-full flex justify-center items-center shadow-lg relative z-10">
                        <Layers className="h-4 w-4" />
                      </div>
                    </div>
                    <span className="bg-slate-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow mt-1">
                      DEVCOWISE TECHNOLOGIES
                    </span>
                  </div>

                  {/* Other minor pins */}
                  <div className="absolute left-2/3 top-1/4 h-2.5 w-2.5 rounded-full bg-slate-400 border border-white"></div>
                  <div className="absolute left-1/5 top-3/4 h-2.5 w-2.5 rounded-full bg-slate-400 border border-white"></div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact form with visual states */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-200/60 p-8 rounded-3xl shadow-sm">
              {submitSuccess ? (
                <div className="h-full min-h-[350px] flex flex-col justify-center items-center text-center space-y-4 py-8">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-50 text-emerald-500 shadow-md">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-slate-900 tracking-tight">
                    Thank you!
                  </h3>
                  <p className="text-slate-600 text-sm max-w-sm">
                    Your digital roadmap inquiry has been received. One of our Senior Technology Partners will contact you within 2 working business hours.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="text-xs text-blue-600 hover:text-blue-500 font-semibold underline cursor-pointer pt-2"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider" htmlFor="name">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className={`w-full bg-white border ${
                          formErrors.name ? 'border-red-500 ring-1 ring-red-100' : 'border-slate-200'
                        } rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition`}
                      />
                      {formErrors.name && (
                        <p className="text-red-500 text-[11px] font-medium">{formErrors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider" htmlFor="email">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className={`w-full bg-white border ${
                          formErrors.email ? 'border-red-500 ring-1 ring-red-100' : 'border-slate-200'
                        } rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition`}
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-[11px] font-medium">{formErrors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider" htmlFor="subject">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="subject"
                      type="text"
                      placeholder="e.g. Cloud Migrations and API Engineering"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className={`w-full bg-white border ${
                        formErrors.subject ? 'border-red-500 ring-1 ring-red-100' : 'border-slate-200'
                      } rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition`}
                    />
                    {formErrors.subject && (
                      <p className="text-red-500 text-[11px] font-medium">{formErrors.subject}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider" htmlFor="message">
                      Project Goals & Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Describe your workflows, goals, and legacy systems..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className={`w-full bg-white border ${
                        formErrors.message ? 'border-red-500 ring-1 ring-red-100' : 'border-slate-200'
                      } rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition`}
                    ></textarea>
                    {formErrors.message && (
                      <p className="text-red-500 text-[11px] font-medium">{formErrors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-blue-500/10 transition flex justify-center items-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                        <span>Verifying form...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Project Inquiry</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-slate-400 text-xs sm:text-sm py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-tr from-blue-600 to-cyan-400 p-2 rounded-lg text-white">
                <Layers className="h-4 w-4" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-base text-white tracking-tight">
                  DEVCOWISE
                </span>
                <span className="block text-[8px] text-blue-400 tracking-widest uppercase font-semibold leading-none mt-0.5">
                  TECHNOLOGIES
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              DEVCOWISE TECHNOLOGIES delivers elite enterprise technologies designed to securely modernise digital architectures. We help brands build the systems of tomorrow, today.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {['Twitter', 'LinkedIn', 'GitHub', 'Medium'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="h-8 w-8 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex justify-center items-center transition"
                  aria-label={`DEVCOWISE TECHNOLOGIES on ${social}`}
                >
                  <span className="text-[10px] font-bold">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'home', label: 'Home Page' },
                { id: 'about', label: 'Company Story' },
                { id: 'services', label: 'What We Provide' },
                { id: 'whyus', label: 'Why Client Choose Us' },
                { id: 'testimonials', label: 'Partner Endorsements' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleScrollTo(link.id)}
                    className="hover:text-white transition duration-150 cursor-pointer text-slate-400"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider">
              Core Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Custom Code Engineering</li>
              <li>Enterprise Cloud Migration</li>
              <li>Strategic IT Consulting</li>
              <li>SOC2 Security & Defenses</li>
              <li>Data Intelligence Pipelines</li>
              <li>Digital Process Automations</li>
            </ul>
          </div>

          {/* Column 4: Newsletter Mock */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider">
              DEVCOWISE TECHNOLOGIES Newsletter
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe to stay updated with monthly digital transformation and security briefings.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="news@company.com"
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs w-full focus:outline-none focus:border-blue-500 text-white"
              />
              <button
                onClick={() => alert('Subscription saved. Thank you!')}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-2 rounded-lg font-bold transition shrink-0 cursor-pointer"
              >
                Join
              </button>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-slate-500 text-center sm:text-left">
            © 2026 DEVCOWISE TECHNOLOGIES LLC. All rights reserved. Built to specifications in Cloud Native Workspace.
          </p>
          <div className="flex gap-4 text-slate-500">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* --- BACK TO TOP BUTTON --- */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 bg-blue-600 hover:bg-blue-500 text-white p-3.5 rounded-full shadow-xl shadow-blue-500/20 hover:scale-105 transition duration-200 cursor-pointer animate-fade-in"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5 animate-pulse" />
        </button>
      )}

      {/* --- MODAL (QUOTE REQUEST & HTML CODE VIEW) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-center items-center p-4" onClick={() => setIsModalOpen(false)}>
          <div
            className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-slate-900 p-6 text-white flex justify-between items-center border-b border-slate-800">
              <div className="flex items-center gap-2">
                {modalType === 'quote' ? (
                  <>
                    <Sparkles className="h-5 w-5 text-blue-400" />
                    <div>
                      <h3 className="font-display font-bold text-lg leading-tight">Request an Enterprise Quote</h3>
                      <p className="text-[10px] text-slate-400 leading-tight mt-0.5">Custom scoping analysis in 2 business hours</p>
                    </div>
                  </>
                ) : (
                  <>
                    <FileCode className="h-5 w-5 text-blue-400" />
                    <div>
                      <h3 className="font-display font-bold text-lg leading-tight">Export Standalone HTML Website</h3>
                      <p className="text-[10px] text-slate-400 leading-tight mt-0.5">Single file with full embedded styles and logic</p>
                    </div>
                  </>
                )}
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-850 rounded-lg transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content Scroll Area */}
            <div className="p-6 overflow-y-auto flex-1">
              
              {/* IF TYPE IS GET A QUOTE FORM */}
              {modalType === 'quote' && (
                quoteSuccess ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="inline-flex h-14 w-14 rounded-full bg-emerald-50 text-emerald-500 justify-center items-center shadow-inner">
                      <Check className="h-8 w-8 stroke-[3]" />
                    </div>
                    <h4 className="font-display font-bold text-xl text-slate-900">Quote Request Submitted</h4>
                    <p className="text-slate-600 text-sm max-w-md mx-auto">
                      Thank you for submitting your project specs! Our lead solution architect has been notified and is reviewing your budget guidelines.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleQuoteSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Full Name</label>
                        <input
                          required
                          type="text"
                          value={quoteForm.name}
                          onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-100 rounded-lg px-3.5 py-2 text-sm"
                          placeholder="Your Name"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Corporate Email</label>
                        <input
                          required
                          type="email"
                          value={quoteForm.email}
                          onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-100 rounded-lg px-3.5 py-2 text-sm"
                          placeholder="you@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Selected Technology</label>
                        <select
                          value={quoteForm.service}
                          onChange={(e) => setQuoteForm({ ...quoteForm, service: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-100 rounded-lg px-3.5 py-2 text-sm text-slate-700"
                        >
                          <option value="custom-software">Custom Software Dev</option>
                          <option value="cloud-solutions">Cloud & DevOps Solutions</option>
                          <option value="it-consulting">Strategic IT Consulting</option>
                          <option value="cybersecurity">Cybersecurity & Compliance</option>
                          <option value="data-analytics">Data Intelligence & Pipelines</option>
                          <option value="digital-transformation">Digital Transformation</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Project Budget Estimate</label>
                        <select
                          value={quoteForm.budget}
                          onChange={(e) => setQuoteForm({ ...quoteForm, budget: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-100 rounded-lg px-3.5 py-2 text-sm text-slate-700"
                        >
                          <option value="under-$10k">Under $10,000</option>
                          <option value="$10k-$25k">$10,000 - $25,000</option>
                          <option value="$25k-$50k">$25,000 - $50,000</option>
                          <option value="$50k+">$50,000 or more</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">System Bottlenecks & Specifications</label>
                      <textarea
                        rows={4}
                        value={quoteForm.details}
                        onChange={(e) => setQuoteForm({ ...quoteForm, details: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-100 rounded-lg px-3.5 py-2 text-sm"
                        placeholder="Detail any target databases, legacy endpoints, or integration requirements..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl shadow transition mt-2 cursor-pointer flex justify-center items-center gap-1.5"
                    >
                      {isSubmitting ? (
                        <span className="h-4 w-4 rounded-full border-2 border-white/35 border-t-white animate-spin"></span>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4" />
                          <span>Submit Budget Request</span>
                        </>
                      )}
                    </button>
                  </form>
                )
              )}

              {/* IF TYPE IS STATIC HTML EXPORTER CODE */}
              {modalType === 'export' && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-600 leading-normal">
                    This website is pre-bundled as a single self-contained HTML file called <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-600 font-mono text-[11px]">devcowise-technologies-static.html</code>. It embeds all Inter and Poppins font assets, Lucide icons, full custom Tailwind style sheets, interactive sliders, scroll logic, animated numbers, and form error checkers completely offline.
                  </p>

                  <div className="bg-slate-900 rounded-xl p-4 text-xs font-mono text-slate-200 overflow-x-auto max-h-56">
                    {`<!DOCTYPE html>
<html lang="en" style="scroll-behavior: smooth;">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DEVCOWISE TECHNOLOGIES | Enterprise IT Consulting & Custom Software</title>
    <!-- Google Fonts & Tailwind CDN -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Lucide Icons Library -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        body { font-family: 'Inter', sans-serif; }
        .font-display { font-family: 'Poppins', sans-serif; }
    </style>
</head>
<body class="bg-slate-50 text-slate-800 antialiased">
    <!-- Navbar -->
    <header class="sticky top-0 z-40 bg-slate-900 py-4 border-b border-slate-800">
        ...`}
                  </div>

                  <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
                    <button
                      onClick={() => {
                        triggerStaticDownload();
                        setIsModalOpen(false);
                      }}
                      className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2.5 rounded-xl shadow flex items-center gap-1.5 text-xs transition cursor-pointer"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download devcowise-technologies-static.html</span>
                    </button>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-5 py-2.5 rounded-xl text-xs transition cursor-pointer"
                    >
                      Close View
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
