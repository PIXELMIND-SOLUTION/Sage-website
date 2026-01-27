import {
    Menu, X, ChevronDown,
    Brain, Cloud, Cpu, GitMerge, Database, Shield,
    Server, Code, Globe, Lock, Terminal, MessageSquare,
    ShieldCheck, Database as DbIcon, CloudLightning, Cpu as CpuIcon,
    Phone, Mail, MapPin, Award, Users, CheckCircle, Coffee
} from "lucide-react";

const technology = [
    {
        category: "Cloud Platforms",
        items: [
            { name: "AWS", icon: <CloudLightning size={16} />, color: "text-orange-500" },
            { name: "Azure", icon: <Cloud size={16} />, color: "text-blue-500" },
            { name: "Google Cloud", icon: <Server size={16} />, color: "text-green-500" },
            { name: "Oracle Cloud", icon: <Database size={16} />, color: "text-red-500" },
            { name: "IBM Cloud", icon: <CpuIcon size={16} />, color: "text-blue-600" },
        ]
    },
    {
        category: "AI & ML",
        items: [
            { name: "TensorFlow", icon: <Brain size={16} />, color: "text-orange-600" },
            { name: "PyTorch", icon: <Terminal size={16} />, color: "text-red-500" },
            { name: "OpenAI", icon: <MessageSquare size={16} />, color: "text-green-600" },
            { name: "Azure ML", icon: <Cloud size={16} />, color: "text-blue-500" },
            { name: "SageMaker", icon: <Cpu size={16} />, color: "text-orange-500" },
        ]
    },
    {
        category: "Data & Analytics",
        items: [
            { name: "Snowflake", icon: <DbIcon size={16} />, color: "text-blue-400" },
            { name: "Databricks", icon: <Terminal size={16} />, color: "text-red-400" },
            { name: "Apache Spark", icon: <Server size={16} />, color: "text-orange-500" },
            { name: "Kafka", icon: <GitMerge size={16} />, color: "text-purple-500" },
            { name: "Tableau", icon: <Globe size={16} />, color: "text-blue-600" },
        ]
    },
    {
        category: "Security",
        items: [
            { name: "CrowdStrike", icon: <ShieldCheck size={16} />, color: "text-green-500" },
            { name: "Palo Alto", icon: <Shield size={16} />, color: "text-orange-500" },
            { name: "Fortinet", icon: <Lock size={16} />, color: "text-red-500" },
            { name: "Okta", icon: <Lock size={16} />, color: "text-blue-500" },
            { name: "Splunk", icon: <Terminal size={16} />, color: "text-purple-500" },
        ]
    },
    {
        category: "Development",
        items: [
            { name: "React", icon: <Code size={16} />, color: "text-blue-400" },
            { name: "Node.js", icon: <Terminal size={16} />, color: "text-green-600" },
            { name: "Python", icon: <Code size={16} />, color: "text-yellow-500" },
            { name: "Java", icon: <Coffee size={16} />, color: "text-red-500" },
            { name: "Kubernetes", icon: <Server size={16} />, color: "text-blue-500" },
        ]
    },
    {
        category: "DevOps",
        items: [
            { name: "Docker", icon: <Server size={16} />, color: "text-blue-500" },
            { name: "Jenkins", icon: <Terminal size={16} />, color: "text-red-500" },
            { name: "Terraform", icon: <Cloud size={16} />, color: "text-purple-500" },
            { name: "GitLab", icon: <Code size={16} />, color: "text-orange-500" },
            { name: "Ansible", icon: <Terminal size={16} />, color: "text-red-400" },
        ]
    }
];

export default technology;