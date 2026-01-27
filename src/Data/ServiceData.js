import { Brain, Cloud, Cpu, Database, GitMerge, Shield } from "lucide-react";

const Service = [
  {
    title: "AI & Machine Learning",
    desc: "Predictive intelligence & automation solutions",
    icon: <Brain size={20} />,
    gradient: "from-indigo-500 to-violet-500",
    features: ["Predictive Analytics", "Natural Language Processing", "Computer Vision", "MLOps"]
  },
  {
    title: "Cloud Consulting",
    desc: "Migration, scaling & optimization strategies",
    icon: <Cloud size={20} />,
    gradient: "from-blue-500 to-indigo-500",
    features: ["Cloud Migration", "Cost Optimization", "Multi-Cloud Strategy", "DevOps"]
  },
  {
    title: "Intelligent Automation",
    desc: "RPA & workflow automation systems",
    icon: <Cpu size={20} />,
    gradient: "from-green-500 to-emerald-500",
    features: ["RPA Implementation", "Process Mining", "Workflow Automation", "BPM"]
  },
  {
    title: "Integration & APIs",
    desc: "System-to-system connectivity solutions",
    icon: <GitMerge size={20} />,
    gradient: "from-amber-500 to-orange-500",
    features: ["API Management", "Microservices", "ESB", "Real-time Integration"]
  },
  {
    title: "Data Engineering",
    desc: "Pipelines, analytics & business insights",
    icon: <Database size={20} />,
    gradient: "from-violet-500 to-purple-500",
    features: ["Data Lakes", "ETL/ELT", "Real-time Analytics", "BI Dashboards"]
  },
  {
    title: "Cybersecurity",
    desc: "Enterprise-grade security & compliance",
    icon: <Shield size={20} />,
    gradient: "from-red-500 to-pink-500",
    features: ["Threat Detection", "Compliance", "Zero Trust", "Security Operations"]
  },
];

export default Service;