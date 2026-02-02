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
    logo:
      networklogo,

    image:
      network,

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
  },

  "cyber-security": {
    name: "Cyber Security Solutions",
    color: "from-red-500 to-rose-600",

    /* LOGO */
    logo:
      cyberlogo,

    image:
      cyber,

    description:
      "Protect your digital assets with enterprise-grade cybersecurity solutions and continuous monitoring.",

    longDescription:
      "Our cybersecurity solutions help organizations defend against evolving threats with proactive monitoring, threat detection, and rapid incident response.",

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
  },

  "data-engineering": {
    name: "Data Engineering Solutions",
    color: "from-emerald-500 to-teal-600",

    /* LOGO */
    logo:
      datalogo,

    image:
      data,

    description:
      "Build scalable data pipelines and platforms that turn raw data into actionable insights.",

    longDescription:
      "Our data engineering solutions help organizations collect, process, store, and analyze massive volumes of data efficiently. We design robust data architectures that power analytics, AI, and business intelligence initiatives.",

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
  },

  cloud: {
    name: "Cloud Solutions",
    color: "from-sky-500 to-blue-600",

    /* LOGO */
    logo:
      cloudlogo,

    image:
      cloud,

    description:
      "Accelerate innovation with secure, scalable, and cost-optimized cloud solutions.",

    longDescription:
      "Our cloud solutions help organizations migrate, modernize, and manage workloads across public, private, and hybrid cloud environments. We ensure security, resilience, and cost efficiency at every stage.",

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
  },
};
