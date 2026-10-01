export const initialCategories = [
  {
    name: "Web Development",
    slug: "web-development",
    serviceId: "1",
    desc: "Custom websites, high-performance web apps, and robust full-stack solutions.",
    image: "/web.jpeg"
  },
  {
    name: "Graphic Design",
    slug: "graphic-design",
    serviceId: "2",
    desc: "Impactful logos, cohesive branding, and creative visual designs.",
    image: "/graphic.jpeg"
  },
  {
    name: "Digital Marketing",
    slug: "digital-marketing",
    serviceId: "3",
    desc: "Data-driven SEO strategies, targeted ads, and social media growth.",
    image: "/digital.jpeg"
  },
  {
    name: "UI / UX Design",
    slug: "ui-ux-design",
    serviceId: "4",
    desc: "User-centric designs with modern, intuitive interfaces for better conversion.",
    image: "/ui.jpeg"
  },
  {
    name: "Content Writing",
    slug: "content-writing",
    serviceId: "5",
    desc: "Engaging blogs, high-converting copywriting, and technical documentation.",
    image: "/content.jpeg"
  },
  {
    name: "Mobile App Development",
    slug: "mobile-app-development",
    serviceId: "6",
    desc: "Native and cross-platform Android & iOS application development.",
    image: "/mobile.jpeg"
  },
  {
    name: "Data & Analytics",
    slug: "data-analytics",
    serviceId: "7",
    desc: "In-depth data analysis and interactive visualization to drive decisions.",
    image: "/data.jpeg"
  },
  {
    name: "Cyber Security",
    slug: "cyber-security",
    serviceId: "8",
    desc: "Proactive security audits and protection for your digital assets.",
    image: "/cyber.jpeg"
  },
  {
    name: "Artificial Intelligence",
    slug: "ai-solutions",
    serviceId: "9",
    desc: "Custom AI models, machine learning integration, and automation tools.",
    image: "/ai.jpeg" 
  },
  {
    name: "Cloud & DevOps",
    slug: "cloud-devops",
    serviceId: "19",
    desc: "Scalable AWS/Azure infrastructure, Kubernetes orchestration, and CI/CD pipelines.",
    image: "/cloud.jpeg"
  },
  {
    name: "Blockchain & Web3",
    slug: "blockchain-web3",
    serviceId: "21",
    desc: "Smart contracts, decentralized dApps, Web3 integrations, and crypto security.",
    image: "/blockchain.jpeg"
  },
  {
    name: "Video & Motion Graphics",
    slug: "video-motion",
    serviceId: "23",
    desc: "High-retention video editing, 3D motion design, YouTube production, and VFX.",
    image: "/video.jpeg"
  }
];

export const initialServices = [
  { 
    id: "1",
    name: "Alex Rivera",
    role: "Senior Full Stack Architect",
    profileImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    workImg: "/web.jpeg", 
    bio: "Alex is a high-performance engineer with over 8 years of experience building mission-critical web applications for Silicon Valley startups. He specializes in architecting distributed systems and robust API layers using the MERN stack. His focus is on 'Clean Architecture'—ensuring that every project is scalable, secure, and maintainable under heavy traffic.", 
    skills: ["React/Next.js", "Node.js", "PostgreSQL", "AWS"],
    rate: "$95/hr",
    hourlyRate: 95,
    group: "web",
    categoryName: "Web Development"
  },
  { 
    id: "10",
    name: "Jordan Smith",
    role: "Lead Frontend Engineer",
    profileImg: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400",
    workImg: "/web.jpeg", 
    bio: "Jordan bridges the gap between sophisticated design and high-end engineering. She specializes in creating immersive, pixel-perfect user interfaces using modern JavaScript frameworks. Having served as a Creative Tech Lead for international agencies, she ensures every component is optimized for maximum conversion and user delight.", 
    skills: ["TypeScript", "Three.js", "Tailwind", "GSAP"],
    rate: "$85/hr",
    hourlyRate: 85,
    group: "web",
    categoryName: "Web Development"
  },
  { 
    id: "2",
    name: "Sarah Chen",
    role: "Senior Brand Strategist",
    profileImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    workImg: "/graphic.jpeg", 
    bio: "Sarah is an award-winning strategist who believes a brand is a story waiting to be told. She has defined the visual language for over 100 startups, taking them from simple concepts to market-dominating identities. Her process involves deep color psychology and typography audits to ensure your brand stands out.", 
    skills: ["Brand Strategy", "Illustrator", "Layout"],
    rate: "$60/hr",
    hourlyRate: 60,
    group: "graphic",
    categoryName: "Graphic Design"
  },
  { 
    id: "11",
    name: "Liam O'Connor",
    role: "Visual Identity Specialist",
    profileImg: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    workImg: "/graphic.jpeg", 
    bio: "Liam brings a bold, contemporary edge to corporate identity. With a decade of experience in top-tier advertising, he understands how to create visuals that grab attention and drive consumer action. He works closely with stakeholders to ensure visual systems reflect internal culture and market goals.", 
    skills: ["Photoshop", "Vector Art", "Typography"],
    rate: "$90/hr",
    hourlyRate: 90,
    group: "graphic",
    categoryName: "Graphic Design"
  },
  { 
    id: "3",
    name: "Marcus Thorne",
    role: "Growth Marketing Lead",
    profileImg: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    workImg: "/digital.jpeg", 
    bio: "Marcus views growth as a science. He specializes in data-driven SEO and SEM strategies that focus on high-intent user acquisition. By leveraging advanced analytics, he has helped companies increase organic traffic by an average of 150% within the first six months of engagement.", 
    skills: ["SEO", "Google Analytics", "PPC"],
    rate: "$90/hr",
    hourlyRate: 90,
    group: "marketing",
    categoryName: "Digital Marketing"
  },
  { 
    id: "12",
    name: "Anita Desai",
    role: "Social Content Strategist",
    profileImg: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400",
    workImg: "/digital.jpeg", 
    bio: "Anita is an expert in building community loyalty through strategic social media management. She understands platform-specific algorithms and creates viral-ready content. Her background in psychology allows her to craft marketing copy that triggers high emotional engagement and conversion.", 
    skills: ["Meta Ads", "Content Strategy", "Copywriting"],
    rate: "$70/hr",
    hourlyRate: 70,
    group: "marketing",
    categoryName: "Digital Marketing"
  },
  { 
    id: "4",
    name: "Elena Rodriguez",
    role: "Product Designer",
    profileImg: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    workImg: "/ui.jpeg", 
    bio: "Elena specializes in the behavioral science behind UX. She transforms complex user journeys into intuitive, elegant interfaces. Her designs focus on reducing friction and cognitive load, which significantly improves user retention and task completion rates for SaaS platforms.", 
    skills: ["Figma", "UX Research", "Design Systems"],
    rate: "$65/hr",
    hourlyRate: 65,
    group: "uiux",
    categoryName: "UI / UX Design"
  },
  { 
    id: "13",
    name: "David Vark",
    role: "UX Architect",
    profileImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    workImg: "/ui.jpeg", 
    bio: "David is a veteran designer focused on high-conversion landing pages and mobile app flows. He uses data heatmaps and rigorous user testing to validate design decisions. His work ensures that aesthetic beauty never comes at the expense of functional performance.", 
    skills: ["Wireframing", "Adobe XD", "User Testing"],
    rate: "$80/hr",
    hourlyRate: 80,
    group: "uiux",
    categoryName: "UI / UX Design"
  },
  { 
    id: "5",
    name: "James Wilson",
    role: "Technical Documentation Lead",
    profileImg: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
    workImg: "/content.jpeg", 
    bio: "James excels at making complex technical concepts accessible. He has written documentation for leading API providers and hardware manufacturers. His work helps bridge the gap between engineering teams and end-users, reducing support tickets through clarity.", 
    skills: ["API Docs", "Technical Writing", "SaaS Blogs"],
    rate: "$50/hr",
    hourlyRate: 50,
    group: "writing",
    categoryName: "Content Writing"
  },
  { 
    id: "14",
    name: "Clara Bloom",
    role: "Conversion Copywriter",
    profileImg: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400",
    workImg: "/content.jpeg", 
    bio: "Clara writes words that sell. From email funnels to long-form sales pages, her copy is designed to trigger action. She combines psychological triggers with SEO best practices to ensure that your content not only ranks well but converts browsers into buyers.", 
    skills: ["Sales Copy", "SEO Writing", "Email Funnels"],
    rate: "$75/hr",
    hourlyRate: 75,
    group: "writing",
    categoryName: "Content Writing"
  },
  { 
    id: "6",
    name: "Kenji Sato",
    role: "Cross-Platform Expert",
    profileImg: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
    workImg: "/mobile.jpeg", 
    bio: "Kenji builds high-performance mobile apps that feel truly native. Specializing in Flutter, he ensures seamless performance across iOS and Android. He focuses on optimized state management and efficient API integration for data-heavy applications.", 
    skills: ["Flutter", "React Native", "Firebase"],
    rate: "$80/hr",
    hourlyRate: 80,
    group: "mobile",
    categoryName: "Mobile App Development"
  },
  { 
    id: "15",
    name: "Mia Wong",
    role: "Senior iOS Specialist",
    profileImg: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    workImg: "/mobile.jpeg", 
    bio: "Mia is a Swift expert focused on high-end, premium iOS experiences. She leverages the latest Apple hardware capabilities to create sleek, responsive apps. Her work is characterized by smooth animations and adherence to Apple's Human Interface Guidelines.", 
    skills: ["Swift", "SwiftUI", "CoreData"],
    rate: "$95/hr",
    hourlyRate: 95,
    group: "mobile",
    categoryName: "Mobile App Development"
  },
  { 
    id: "7",
    name: "Dr. Aris Varma",
    role: "Principal Data Scientist",
    profileImg: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400",
    workImg: "/data.jpeg", 
    bio: "Dr. Varma specializes in predictive modeling and big data architecture. He helps organizations turn raw data into strategic assets. His background in statistics allows him to build custom algorithms that forecast market trends and optimize supply chain logistics.", 
    skills: ["Python", "Machine Learning", "Big Data"],
    rate: "$120/hr",
    hourlyRate: 120,
    group: "data",
    categoryName: "Data & Analytics"
  },
  { 
    id: "16",
    name: "Sanjay Gupta",
    role: "Business Intelligence Analyst",
    profileImg: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400",
    workImg: "/data.jpeg", 
    bio: "Sanjay focuses on the visualization of complex data. He creates intuitive dashboards that allow stakeholders to see real-time performance metrics at a glance. He specializes in cleaning messy data sets and building automated reporting pipelines.", 
    skills: ["Tableau", "PowerBI", "SQL", "ETL"],
    rate: "$85/hr",
    hourlyRate: 85,
    group: "data",
    categoryName: "Data & Analytics"
  },
  { 
    id: "8",
    name: "Riley Steele",
    role: "Lead Security Auditor",
    profileImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    workImg: "/cyber.jpeg", 
    bio: "Riley protects digital assets through proactive penetration testing and ethical hacking. He identifies vulnerabilities before they can be exploited, ensuring that enterprise infrastructure is hardened against modern cyber threats and ransomware attacks.", 
    skills: ["Pen-Testing", "Network Security", "Linux"],
    rate: "$110/hr",
    hourlyRate: 110,
    group: "cyber",
    categoryName: "Cyber Security"
  },
  { 
    id: "17",
    name: "Victor Stone",
    role: "Security Compliance Expert",
    profileImg: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400",
    workImg: "/cyber.jpeg", 
    bio: "Victor specializes in global security standards including GDPR, HIPAA, and SOC2. He builds the governance frameworks that keep companies legally protected and ensures that user data privacy is maintained at every level of the application stack.", 
    skills: ["Compliance", "Risk Mgmt", "ISO 27001"],
    rate: "$130/hr",
    hourlyRate: 130,
    group: "cyber",
    categoryName: "Cyber Security"
  },
  { 
    id: "9",
    name: "Sophia Alt",
    role: "AI Solutions Architect",
    profileImg: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
    workImg: "/ai.jpeg", 
    bio: "Sophia stands at the forefront of the AI revolution, specializing in LLM integration and RAG architectures. She helps businesses automate complex decision-making processes and unlock creative potential through custom-trained GPT solutions.", 
    skills: ["OpenAI", "NLP", "Python", "RAG"],
    rate: "$150/hr",
    hourlyRate: 150,
    group: "ai",
    categoryName: "Artificial Intelligence"
  },
  { 
    id: "18",
    name: "Dr. Leo H",
    role: "ML Research Scientist",
    profileImg: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400",
    workImg: "/ai.jpeg", 
    bio: "Dr. Leo focuses on computer vision and custom neural network optimization. He builds proprietary AI solutions for healthcare and automated manufacturing, ensuring that models are both mathematically accurate and production-ready.", 
    skills: ["PyTorch", "TensorFlow", "Computer Vision"],
    rate: "$180/hr",
    hourlyRate: 180,
    group: "ai",
    categoryName: "Artificial Intelligence"
  },
  { 
    id: "19",
    name: "Dev Patel",
    role: "Cloud Infrastructure Architect",
    profileImg: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400",
    workImg: "/cloud.jpeg", 
    bio: "Dev designs rock-solid AWS and GCP multi-region architectures. He specializes in serverless orchestration, zero-downtime migrations, and Kubernetes cluster optimization.", 
    skills: ["AWS", "Kubernetes", "Terraform", "Docker"],
    rate: "$115/hr",
    hourlyRate: 115,
    group: "cloud",
    categoryName: "Cloud & DevOps"
  },
  { 
    id: "20",
    name: "Rachel Evans",
    role: "DevOps & CI/CD Automation Lead",
    profileImg: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400",
    workImg: "/cloud.jpeg", 
    bio: "Rachel streamlines engineering velocity with enterprise-grade CI/CD pipelines, automated testing gates, and Prometheus/Grafana observability suites.", 
    skills: ["GitHub Actions", "CI/CD", "Linux", "Grafana"],
    rate: "$95/hr",
    hourlyRate: 95,
    group: "cloud",
    categoryName: "Cloud & DevOps"
  },
  { 
    id: "21",
    name: "Carlos Mendez",
    role: "Smart Contract & Web3 Engineer",
    profileImg: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400",
    workImg: "/blockchain.jpeg", 
    bio: "Carlos builds gas-optimized Solidity smart contracts, DeFi protocols, and decentralized applications with rigorous cryptographic audits.", 
    skills: ["Solidity", "Ethers.js", "Web3.js", "Hardhat"],
    rate: "$130/hr",
    hourlyRate: 130,
    group: "blockchain",
    categoryName: "Blockchain & Web3"
  },
  { 
    id: "22",
    name: "Zoe Nakamura",
    role: "DeFi & Tokenomics Strategist",
    profileImg: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400",
    workImg: "/blockchain.jpeg", 
    bio: "Zoe crafts decentralized governance mechanisms and token models with high security and seamless wallet integration experiences.", 
    skills: ["Tokenomics", "Rust", "Solana", "DeFi"],
    rate: "$125/hr",
    hourlyRate: 125,
    group: "blockchain",
    categoryName: "Blockchain & Web3"
  },
  { 
    id: "23",
    name: "Lucas Silva",
    role: "Lead Motion Designer & VFX Artist",
    profileImg: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400",
    workImg: "/video.jpeg", 
    bio: "Lucas creates breathtaking 3D motion graphics, commercial brand animations, and high-converting video ads using Blender and After Effects.", 
    skills: ["After Effects", "Blender", "Cinema4D", "Premiere Pro"],
    rate: "$75/hr",
    hourlyRate: 75,
    group: "video",
    categoryName: "Video & Motion Graphics"
  },
  { 
    id: "24",
    name: "Maya Lin",
    role: "Commercial Video Editor & Colorist",
    profileImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    workImg: "/video.jpeg", 
    bio: "Maya specializes in dynamic, fast-paced video editing, DaVinci Resolve color grading, and high-retention social and corporate video campaigns.", 
    skills: ["DaVinci Resolve", "Color Grading", "Sound Design", "VFX"],
    rate: "$70/hr",
    hourlyRate: 70,
    group: "video",
    categoryName: "Video & Motion Graphics"
  }
];

export const initialBookings = [
  { id: "u1", bookingId: "u1", userName: "Arjun", service: "Cloud Migration", amount: "$450.00", rawAmount: 450, date: "Feb 01, 2026", status: "Completed" },
  { id: "u2", bookingId: "u2", userName: "Ravi", service: "UI/UX Design", amount: "$1,200.00", rawAmount: 1200, date: "Feb 02, 2026", status: "Active" },
  { id: "u3", bookingId: "u3", userName: "David", service: "Web dev", amount: "$150.00", rawAmount: 150, date: "Feb 02, 2026", status: "Pending" },
  { id: "u4", bookingId: "u4", userName: "Priya Rai", service: "Content Writing", amount: "$300.00", rawAmount: 300, date: "Feb 03, 2026", status: "Active" },
  { id: "u5", bookingId: "u5", userName: "Chinni", service: "Mobile App dev", amount: "$500.00", rawAmount: 500, date: "Feb 04, 2026", status: "Completed" },
  { id: "u6", bookingId: "u6", userName: "Ramya", service: "Cyber Security", amount: "$900.00", rawAmount: 900, date: "Feb 04, 2026", status: "Active" },
  { id: "u7", bookingId: "u7", userName: "Pawan", service: "AI Consultation", amount: "$2,500.00", rawAmount: 2500, date: "Feb 05, 2026", status: "Active" },
  { id: "u8", bookingId: "u8", userName: "Bhavya", service: "Cyber Security", amount: "$1,800.00", rawAmount: 1800, date: "Feb 05, 2026", status: "Completed" },
  { id: "u9", bookingId: "u9", userName: "Varshini", service: "Frontend Dev", amount: "$750.00", rawAmount: 750, date: "Feb 06, 2026", status: "Active" }
];

export const initialPayments = [
  { id: "TXN-101", user: "Arjun Mehta", service: "Cloud Migration", amount: "$450.00", date: "Feb 01, 2026", status: "Paid", method: "Visa" },
  { id: "TXN-102", user: "Emily Blunt", service: "Web Design", amount: "$1,200.00", date: "Feb 02, 2026", status: "Paid", method: "MasterCard" },
  { id: "TXN-103", user: "David Goggins", service: "Fitness Strategy", amount: "$150.00", date: "Feb 02, 2026", status: "Pending", method: "PayPal" },
  { id: "TXN-104", user: "Priya Rai", service: "Content Writing", amount: "$300.00", date: "Feb 03, 2026", status: "Paid", method: "Apple Pay" },
  { id: "TXN-105", user: "Sundar Pichai", service: "AI Strategy", amount: "$5,000.00", date: "Feb 04, 2026", status: "Paid", method: "Bank Transfer" }
];

export const initialReviews = {
  "1": [
    { id: "101", providerId: "1", user: "Sarah J.", rating: 5, comment: "Alex is a coding wizard! He refactored our entire backend architecture in record time.", date: "Oct 2025" },
    { id: "102", providerId: "1", user: "Mike T.", rating: 5, comment: "Incredible attention to detail. The API documentation was flawless.", date: "Sept 2025" },
    { id: "103", providerId: "1", user: "TechVentures", rating: 4, comment: "Solid work on our Shopify integration. Very reliable.", date: "Aug 2025" }
  ],
  "10": [
    { id: "104", providerId: "10", user: "Kevin L.", rating: 5, comment: "Jordan's frontend skills are next-level. The GSAP animations are buttery smooth!", date: "Nov 2025" },
    { id: "105", providerId: "10", user: "Elena P.", rating: 5, comment: "Pixel-perfect implementation of our Figma designs. Highly recommend.", date: "Dec 2025" },
    { id: "106", providerId: "10", user: "Marcus D.", rating: 4, comment: "Great eye for UI. Made our dashboard look 10x more professional.", date: "Jan 2026" }
  ]
};

export const providerClients = {
  1: [
    { id: "c1", name: "Arjun", email: "arjun.m@tech.com", date: "Feb 10", status: "Paid" },
    { id: "c2", name: "Bhavya", email: "bhavyab@cinema.com", date: "Feb 12", status: "Pending" },
    { id: "c3", name: "David", email: "davud@fitness.com", date: "Feb 14", status: "Paid" }
  ],
  2: [
    { id: "c4", name: "Priya", email: "priya@studio.in", date: "Feb 05", status: "Paid" },
    { id: "c5", name: "Chinni", email: "chinni@gym.com", date: "Feb 08", status: "Paid" },
    { id: "c6", name: "Ramya", email: "ramya@spy.com", date: "Feb 09", status: "Pending" }
  ]
};
