// src/data/solutionsData.js
import network from '../Assets/Images/Service/network.png';
import cloud from '../Assets/Images/Service/cloud.png';
import data from '../Assets/Images/Service/data.png';
import cyber from '../Assets/Images/Service/cyber.png';
import networklogo from '../Assets/Images/Service/networklogo.png';
import cloudlogo from '../Assets/Images/Service/cloudlogo.png';
import datalogo from '../Assets/Images/Service/datalogo.png';
import cyberlogo from '../Assets/Images/Service/cyberlogo.png';

export const solutionsData = {
  networking: {
    name: "Networking Solutions",
    color: "from-blue-500 to-indigo-500",

    /* LOGO */
    logo: networklogo,

    image: network,

    description:
      "We design, deploy, and manage scalable, secure networking solutions that power modern enterprises.",

    longDescription:
      "Our networking solutions are engineered to support high availability, low latency, and secure communication across enterprise and data center environments. From design to deployment, we ensure future-ready infrastructure that grows with your business.",

    services: [
      {
        title: "Enterprise LAN",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTFopvaaUBK_XWXnMnqnyJN3pOrU7uDOu9Aw&s",
        desc: "High-performance LAN infrastructure designed for reliability, speed, and scalability across enterprise environments.",
      },
      {
        title: "Enterprise WLAN",
        image:
          "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=1200&q=80",
        desc: "Secure and scalable wireless networking solutions delivering seamless connectivity and optimized performance.",
      },
      {
        title: "Data Center Networking",
        image:
          "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=80",
        desc: "Low-latency, high-availability networking architectures optimized for modern data centers.",
      },
      {
        title: "Optical Networking",
        image:
          "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
        desc: "High-speed optical transport solutions enabling long-distance and high-bandwidth data transmission.",
      },
      {
        title: "Structured Cabling",
        image:
          "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=1200&q=80",
        desc: "Future-ready structured cabling systems supporting enterprise and data center infrastructure.",
      },
    ],

    benefits: {
      title: "Transform Your Connectivity Infrastructure",
      description: "Our networking solutions provide comprehensive benefits that enhance performance, security, and scalability for modern enterprises.",
      keyFeatures: [
        "99.99% uptime guarantee with redundant architecture",
        "Up to 40% reduction in network latency",
        "Zero-trust security model implementation",
        "Scalable design supporting 10x growth capacity",
        "24/7 proactive monitoring and support",
        "Energy-efficient infrastructure reducing power consumption by 30%"
      ]
    },

    stepsProvided: [
      {
        step: 1,
        title: "Assessment & Planning",
        description: "Comprehensive network audit and requirements analysis"
      },
      {
        step: 2,
        title: "Architecture Design",
        description: "Custom network blueprint with security and scalability"
      },
      {
        step: 3,
        title: "Implementation",
        description: "Seamless deployment with minimal business disruption"
      },
      {
        step: 4,
        title: "Testing & Optimization",
        description: "Performance validation and fine-tuning"
      },
      {
        step: 5,
        title: "Ongoing Management",
        description: "24/7 monitoring, maintenance, and support"
      }
    ],

    testimonials: [
      {
        name: "Alex Johnson",
        position: "CTO, TechCorp Solutions",
        company: "TechCorp",
        quote: "The network infrastructure deployed by this team transformed our operations. We've experienced zero downtime in 18 months!",
        rating: 5,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
      },
      {
        name: "Sarah Miller",
        position: "Network Operations Director",
        company: "Global Finance Inc.",
        quote: "Their optical networking solution improved our data transfer speeds by 300%. Truly enterprise-grade performance.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108755-2616b786d4d3?auto=format&fit=crop&w=200&q=80"
      },
      {
        name: "Robert Chen",
        position: "Infrastructure Lead",
        company: "Healthcare Systems Ltd.",
        quote: "The structured cabling system has been flawless. It's future-proof and incredibly organized.",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
      }
    ]
  },

  "cyber-security": {
    name: "Cyber Security Solutions",
    color: "from-red-500 to-rose-600",

    /* LOGO */
    logo: cyberlogo,

    image: cyber,

    description:
      "Protect your digital assets with enterprise-grade cybersecurity solutions and continuous monitoring.",

    longDescription:
      "Our cybersecurity solutions help organizations defend against evolving threats with proactive monitoring, threat detection, and rapid incident response. We implement multi-layered security strategies tailored to your business needs.",

    services: [
      {
        title: "Network Security",
        image:
          "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
        desc: "Advanced firewall, IDS/IPS, and secure access control solutions to protect network infrastructure.",
      },
      {
        title: "SOC Services",
        image:
          "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1200&q=80",
        desc: "24/7 security operations center providing continuous monitoring and incident response.",
      },
      {
        title: "Vulnerability Assessment",
        image:
          "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=1200&q=80",
        desc: "Comprehensive assessments to identify, analyze, and mitigate security vulnerabilities.",
      },
      {
        title: "Endpoint Security",
        image:
          "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=1200&q=80",
        desc: "Advanced endpoint protection against malware, ransomware, and zero-day threats.",
      },
      {
        title: "Compliance & Audits",
        image:
          "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80",
        desc: "Security compliance assessments and audits aligned with industry and regulatory standards.",
      },
    ],

    benefits: {
      title: "Comprehensive Digital Protection",
      description: "Our cybersecurity solutions deliver measurable benefits that protect your organization from modern threats while ensuring compliance.",
      keyFeatures: [
        "Real-time threat detection with 99.9% accuracy",
        "95% faster incident response times",
        "Zero-day threat protection within 2 hours",
        "Automated compliance reporting for 50+ standards",
        "Reduction in security incidents by up to 80%",
        "24/7 threat intelligence and monitoring"
      ]
    },

    stepsProvided: [
      {
        step: 1,
        title: "Security Assessment",
        description: "Comprehensive risk analysis and vulnerability scanning"
      },
      {
        step: 2,
        title: "Strategy Development",
        description: "Custom security roadmap aligned with business objectives"
      },
      {
        step: 3,
        title: "Implementation",
        description: "Deployment of security controls and monitoring systems"
      },
      {
        step: 4,
        title: "Testing & Validation",
        description: "Penetration testing and security validation"
      },
      {
        step: 5,
        title: "Continuous Monitoring",
        description: "24/7 SOC services and threat intelligence"
      }
    ],

    testimonials: [
      {
        name: "David Wilson",
        position: "CISO",
        company: "BankSecure Financial",
        quote: "Their SOC services detected and neutralized a sophisticated attack before it could impact our operations. Priceless protection!",
        rating: 5,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
      },
      {
        name: "Maria Garcia",
        position: "Security Director",
        company: "MedTech Innovations",
        quote: "Compliance was a nightmare until we partnered with them. Now we pass audits with flying colors.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
      },
      {
        name: "James Peterson",
        position: "IT Security Manager",
        company: "RetailChain Corp",
        quote: "The endpoint security solution has reduced our malware incidents by 90%. Highly recommended!",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=200&q=80"
      }
    ]
  },

  "data-engineering": {
    name: "Data Engineering Solutions",
    color: "from-emerald-500 to-teal-600",

    /* LOGO */
    logo: datalogo,

    image: data,

    description:
      "Build scalable data pipelines and platforms that turn raw data into actionable insights.",

    longDescription:
      "Our data engineering solutions help organizations collect, process, store, and analyze massive volumes of data efficiently. We design robust data architectures that power analytics, AI, and business intelligence initiatives with enterprise-grade reliability.",

    services: [
      {
        title: "Data Pipelines",
        image:
          "https://images.unsplash.com/photo-1518186233392-c232efbf2373?auto=format&fit=crop&w=1200&q=80",
        desc: "Reliable batch and real-time data pipelines for seamless data ingestion and processing.",
      },
      {
        title: "Data Warehousing",
        image:
          "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80",
        desc: "Modern data warehouses optimized for analytics and high-performance querying.",
      },
      {
        title: "Big Data Platforms",
        image:
          "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80",
        desc: "Scalable big data platforms supporting large-scale data processing and analytics.",
      },
      {
        title: "Data Integration",
        image:
          "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=1200&q=80",
        desc: "Integrate data from multiple sources into a unified, trusted data ecosystem.",
      },
      {
        title: "Analytics Enablement",
        image:
          "https://images.unsplash.com/photo-1556155092-8707de31f9c4?auto=format&fit=crop&w=1200&q=80",
        desc: "Enable BI, reporting, and AI use cases with clean, well-modeled data.",
      },
    ],

    benefits: {
      title: "Unlock the Power of Your Data",
      description: "Our data engineering solutions transform raw data into strategic assets, driving innovation and competitive advantage.",
      keyFeatures: [
        "Process petabytes of data with 99.9% reliability",
        "Reduce data processing time by up to 70%",
        "Real-time analytics with sub-second latency",
        "Unified data platform across all sources",
        "Scalable architecture supporting 100x data growth",
        "Automated data quality and governance"
      ]
    },

    stepsProvided: [
      {
        step: 1,
        title: "Data Discovery",
        description: "Assess data sources, quality, and business requirements"
      },
      {
        step: 2,
        title: "Architecture Design",
        description: "Design scalable data pipelines and storage solutions"
      },
      {
        step: 3,
        title: "Implementation",
        description: "Build and deploy data engineering infrastructure"
      },
      {
        step: 4,
        title: "Data Integration",
        description: "Connect and transform data from all sources"
      },
      {
        step: 5,
        title: "Optimization & Maintenance",
        description: "Continuous performance tuning and monitoring"
      }
    ],

    testimonials: [
      {
        name: "Emily Thompson",
        position: "Chief Data Officer",
        company: "E-commerce Giant",
        quote: "Their data pipelines handle 10TB daily with zero failures. Our analytics team now gets real-time insights!",
        rating: 5,
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80"
      },
      {
        name: "Michael Rodriguez",
        position: "Head of Analytics",
        company: "FinTech Solutions",
        quote: "The data warehouse implementation reduced our query times from hours to seconds. Game changer!",
        rating: 5,
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
      },
      {
        name: "Lisa Wang",
        position: "BI Director",
        company: "Healthcare Analytics",
        quote: "Data integration from 15 different systems was seamless. Our reporting accuracy improved by 95%.",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80"
      }
    ]
  },

  cloud: {
    name: "Cloud Solutions",
    color: "from-sky-500 to-blue-600",

    /* LOGO */
    logo: cloudlogo,

    image: cloud,

    description:
      "Accelerate innovation with secure, scalable, and cost-optimized cloud solutions.",

    longDescription:
      "Our cloud solutions help organizations migrate, modernize, and manage workloads across public, private, and hybrid cloud environments. We ensure security, resilience, and cost efficiency at every stage of your cloud journey.",

    services: [
      {
        title: "Cloud Migration",
        image:
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
        desc: "Seamless migration of applications and infrastructure to the cloud.",
      },
      {
        title: "Cloud Architecture",
        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
        desc: "Design resilient, scalable, and secure cloud-native architectures.",
      },
      {
        title: "Hybrid & Multi-Cloud",
        image:
          "https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&w=1200&q=80",
        desc: "Flexible hybrid and multi-cloud strategies tailored to business needs.",
      },
      {
        title: "Cloud Security",
        image:
          "https://images.unsplash.com/photo-1556155092-8707de31f9c4?auto=format&fit=crop&w=1200&q=80",
        desc: "Protect cloud workloads with robust security and compliance controls.",
      },
      {
        title: "Cloud Optimization",
        image:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
        desc: "Optimize performance and cost with continuous cloud monitoring and governance.",
      },
    ],

    benefits: {
      title: "Accelerate Digital Transformation",
      description: "Our cloud solutions deliver tangible business benefits through innovation, agility, and cost optimization.",
      keyFeatures: [
        "Reduce infrastructure costs by up to 40%",
        "Achieve 99.95% cloud service availability",
        "Scale resources instantly to meet demand",
        "Enhanced security with automated compliance",
        "Global deployment across multiple regions",
        "Continuous cost optimization and monitoring"
      ]
    },

    stepsProvided: [
      {
        step: 1,
        title: "Cloud Readiness Assessment",
        description: "Evaluate applications, dependencies, and migration feasibility"
      },
      {
        step: 2,
        title: "Migration Planning",
        description: "Develop detailed migration strategy and roadmap"
      },
      {
        step: 3,
        title: "Cloud Architecture Design",
        description: "Design secure, scalable cloud-native solutions"
      },
      {
        step: 4,
        title: "Migration & Modernization",
        description: "Execute migration with minimal disruption"
      },
      {
        step: 5,
        title: "Optimization & Management",
        description: "Continuous performance and cost optimization"
      }
    ],

    testimonials: [
      {
        name: "Thomas Anderson",
        position: "VP of Technology",
        company: "Startup Ventures",
        quote: "Cloud migration was completed 3 weeks ahead of schedule. Our applications run 60% faster now!",
        rating: 5,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
      },
      {
        name: "Jennifer Lee",
        position: "Cloud Operations Manager",
        company: "Global Logistics",
        quote: "Multi-cloud strategy saved us 35% in infrastructure costs while improving resilience.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=200&q=80"
      },
      {
        name: "Richard Moore",
        position: "IT Director",
        company: "Manufacturing Group",
        quote: "The cloud optimization services reduced our monthly bill by 42% without impacting performance.",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
      }
    ]
  },
};