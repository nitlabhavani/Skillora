import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ServiceDetails.css'; 
import { serviceService } from '../services/serviceService';

const defaultServiceGroups = {
  "web": ["1", "10"],
  "graphic": ["2", "11"],
  "marketing": ["3", "12"],
  "uiux": ["4", "13"],
  "writing": ["5", "14"],
  "mobile": ["6", "15"],
  "data": ["7", "16"],
  "cyber": ["8", "17"],
  "ai": ["9", "18"],
  "cloud": ["19", "20"],
  "blockchain": ["21", "22"],
  "video": ["23", "24"]
};

const defaultServiceData = {
  "1": { 
    name: "Alex Rivera", role: "Senior Full Stack Architect", profileImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400", workImg: "/web.jpeg", 
    bio: "Alex is a high-performance engineer with over 8 years of experience building mission-critical web applications for Silicon Valley startups. He specializes in architecting distributed systems and robust API layers using the MERN stack. His focus is on 'Clean Architecture'—ensuring that every project is scalable, secure, and maintainable under heavy traffic.", 
    skills: ["React/Next.js", "Node.js", "PostgreSQL", "AWS"], rate: "$95/hr", group: "web" 
  },
  "10": { 
    name: "Jordan Smith", role: "Lead Frontend Engineer", profileImg: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400", workImg: "/web.jpeg", 
    bio: "Jordan bridges the gap between sophisticated design and high-end engineering. She specializes in creating immersive, pixel-perfect user interfaces using modern JavaScript frameworks. Having served as a Creative Tech Lead for international agencies, she ensures every component is optimized for maximum conversion and user delight.", 
    skills: ["TypeScript", "Three.js", "Tailwind", "GSAP"], rate: "$85/hr", group: "web" 
  },

  "2": { 
    name: "Sarah Chen", role: "Senior Brand Strategist", profileImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400", workImg: "/graphic.jpeg", 
    bio: "Sarah is an award-winning strategist who believes a brand is a story waiting to be told. She has defined the visual language for over 100 startups, taking them from simple concepts to market-dominating identities. Her process involves deep color psychology and typography audits to ensure your brand stands out.", 
    skills: ["Brand Strategy", "Illustrator", "Layout"], rate: "$60/hr", group: "graphic" 
  },
  "11": { 
    name: "Liam O'Connor", role: "Visual Identity Specialist", profileImg: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400", workImg: "/graphic.jpeg", 
    bio: "Liam brings a bold, contemporary edge to corporate identity. With a decade of experience in top-tier advertising, he understands how to create visuals that grab attention and drive consumer action. He works closely with stakeholders to ensure visual systems reflect internal culture and market goals.", 
    skills: ["Photoshop", "Vector Art", "Typography"], rate: "$90/hr", group: "graphic" 
  },

  "3": { 
    name: "Marcus Thorne", role: "Growth Marketing Lead", profileImg: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400", workImg: "/digital.jpeg", 
    bio: "Marcus views growth as a science. He specializes in data-driven SEO and SEM strategies that focus on high-intent user acquisition. By leveraging advanced analytics, he has helped companies increase organic traffic by an average of 150% within the first six months of engagement.", 
    skills: ["SEO", "Google Analytics", "PPC"], rate: "$90/hr", group: "marketing" 
  },
  "12": { 
    name: "Anita Desai", role: "Social Content Strategist", profileImg: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400", workImg: "/digital.jpeg", 
    bio: "Anita is an expert in building community loyalty through strategic social media management. She understands platform-specific algorithms and creates viral-ready content. Her background in psychology allows her to craft marketing copy that triggers high emotional engagement and conversion.", 
    skills: ["Meta Ads", "Content Strategy", "Copywriting"], rate: "$70/hr", group: "marketing" 
  },

  "4": { 
    name: "Elena Rodriguez", role: "Product Designer", profileImg: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400", workImg: "/ui.jpeg", 
    bio: "Elena specializes in the behavioral science behind UX. She transforms complex user journeys into intuitive, elegant interfaces. Her designs focus on reducing friction and cognitive load, which significantly improves user retention and task completion rates for SaaS platforms.", 
    skills: ["Figma", "UX Research", "Design Systems"], rate: "$65/hr", group: "uiux" 
  },
  "13": { 
    name: "David Vark", role: "UX Architect", profileImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400", workImg: "/ui.jpeg", 
    bio: "David is a veteran designer focused on high-conversion landing pages and mobile app flows. He uses data heatmaps and rigorous user testing to validate design decisions. His work ensures that aesthetic beauty never comes at the expense of functional performance.", 
    skills: ["Wireframing", "Adobe XD", "User Testing"], rate: "$80/hr", group: "uiux" 
  },

  "5": { 
    name: "James Wilson", role: "Technical Documentation Lead", profileImg: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400", workImg: "/content.jpeg", 
    bio: "James excels at making complex technical concepts accessible. He has written documentation for leading API providers and hardware manufacturers. His work helps bridge the gap between engineering teams and end-users, reducing support tickets through clarity.", 
    skills: ["API Docs", "Technical Writing", "SaaS Blogs"], rate: "$50/hr", group: "writing" 
  },
  "14": { 
    name: "Clara Bloom", role: "Conversion Copywriter", profileImg: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400", workImg: "/content.jpeg", 
    bio: "Clara writes words that sell. From email funnels to long-form sales pages, her copy is designed to trigger action. She combines psychological triggers with SEO best practices to ensure that your content not only ranks well but converts browsers into buyers.", 
    skills: ["Sales Copy", "SEO Writing", "Email Funnels"], rate: "$75/hr", group: "writing" 
  },

  "6": { 
    name: "Kenji Sato", role: "Cross-Platform Expert", profileImg: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400", workImg: "/mobile.jpeg", 
    bio: "Kenji builds high-performance mobile apps that feel truly native. Specializing in Flutter, he ensures seamless performance across iOS and Android. He focuses on optimized state management and efficient API integration for data-heavy applications.", 
    skills: ["Flutter", "React Native", "Firebase"], rate: "$80/hr", group: "mobile" 
  },
  "15": { 
    name: "Mia Wong", role: "Senior iOS Specialist", profileImg: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400", workImg: "/mobile.jpeg", 
    bio: "Mia is a Swift expert focused on high-end, premium iOS experiences. She leverages the latest Apple hardware capabilities to create sleek, responsive apps. Her work is characterized by smooth animations and adherence to Apple's Human Interface Guidelines.", 
    skills: ["Swift", "SwiftUI", "CoreData"], rate: "$95/hr", group: "mobile" 
  },

  "7": { 
    name: "Dr. Aris Varma", role: "Principal Data Scientist", profileImg: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400", workImg: "/data.jpeg", 
    bio: "Dr. Varma specializes in predictive modeling and big data architecture. He helps organizations turn raw data into strategic assets. His background in statistics allows him to build custom algorithms that forecast market trends and optimize supply chain logistics.", 
    skills: ["Python", "Machine Learning", "Big Data"], rate: "$120/hr", group: "data" 
  },
  "16": { 
    name: "Sanjay Gupta", role: "Business Intelligence Analyst", profileImg: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400", workImg: "/data.jpeg", 
    bio: "Sanjay focuses on the visualization of complex data. He creates intuitive dashboards that allow stakeholders to see real-time performance metrics at a glance. He specializes in cleaning messy data sets and building automated reporting pipelines.", 
    skills: ["Tableau", "PowerBI", "SQL", "ETL"], rate: "$85/hr", group: "data" 
  },

  "8": { 
    name: "Riley Steele", role: "Lead Security Auditor", profileImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400", workImg: "/cyber.jpeg", 
    bio: "Riley protects digital assets through proactive penetration testing and ethical hacking. He identifies vulnerabilities before they can be exploited, ensuring that enterprise infrastructure is hardened against modern cyber threats and ransomware attacks.", 
    skills: ["Pen-Testing", "Network Security", "Linux"], rate: "$110/hr", group: "cyber" 
  },
  "17": { 
    name: "Victor Stone", role: "Security Compliance Expert", profileImg: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400", workImg: "/cyber.jpeg", 
    bio: "Victor specializes in global security standards including GDPR, HIPAA, and SOC2. He builds the governance frameworks that keep companies legally protected and ensures that user data privacy is maintained at every level of the application stack.", 
    skills: ["Compliance", "Risk Mgmt", "ISO 27001"], rate: "$130/hr", group: "cyber" 
  },

  "9": { 
    name: "Sophia Alt", role: "AI Solutions Architect", profileImg: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400", workImg: "/ai.jpeg", 
    bio: "Sophia stands at the forefront of the AI revolution, specializing in LLM integration and RAG architectures. She helps businesses automate complex decision-making processes and unlock creative potential through custom-trained GPT solutions.", 
    skills: ["OpenAI", "NLP", "Python", "RAG"], rate: "$150/hr", group: "ai" 
  },
  "18": { 
    name: "Dr. Leo H", role: "ML Research Scientist", profileImg: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400", workImg: "/ai.jpeg", 
    bio: "Dr. Leo focuses on computer vision and custom neural network optimization. He builds proprietary AI solutions for healthcare and automated manufacturing, ensuring that models are both mathematically accurate and production-ready.", 
    skills: ["PyTorch", "TensorFlow", "Computer Vision"], rate: "$180/hr", group: "ai" 
  },
  "19": { 
    name: "Dev Patel", role: "Cloud Infrastructure Architect", profileImg: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400", workImg: "/cloud.jpeg", 
    bio: "Dev designs rock-solid AWS and GCP multi-region architectures. He specializes in serverless orchestration, zero-downtime migrations, and Kubernetes cluster optimization.", 
    skills: ["AWS", "Kubernetes", "Terraform", "Docker"], rate: "$115/hr", group: "cloud" 
  },
  "20": { 
    name: "Rachel Evans", role: "DevOps & CI/CD Automation Lead", profileImg: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400", workImg: "/cloud.jpeg", 
    bio: "Rachel streamlines engineering velocity with enterprise-grade CI/CD pipelines, automated testing gates, and Prometheus/Grafana observability suites.", 
    skills: ["GitHub Actions", "CI/CD", "Linux", "Grafana"], rate: "$95/hr", group: "cloud" 
  },
  "21": { 
    name: "Carlos Mendez", role: "Smart Contract & Web3 Engineer", profileImg: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400", workImg: "/blockchain.jpeg", 
    bio: "Carlos builds gas-optimized Solidity smart contracts, DeFi protocols, and decentralized applications with rigorous cryptographic audits.", 
    skills: ["Solidity", "Ethers.js", "Web3.js", "Hardhat"], rate: "$130/hr", group: "blockchain" 
  },
  "22": { 
    name: "Zoe Nakamura", role: "DeFi & Tokenomics Strategist", profileImg: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400", workImg: "/blockchain.jpeg", 
    bio: "Zoe crafts decentralized governance mechanisms and token models with high security and seamless wallet integration experiences.", 
    skills: ["Tokenomics", "Rust", "Solana", "DeFi"], rate: "$125/hr", group: "blockchain" 
  },
  "23": { 
    name: "Lucas Silva", role: "Lead Motion Designer & VFX Artist", profileImg: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400", workImg: "/video.jpeg", 
    bio: "Lucas creates breathtaking 3D motion graphics, commercial brand animations, and high-converting video ads using Blender and After Effects.", 
    skills: ["After Effects", "Blender", "Cinema4D", "Premiere Pro"], rate: "$75/hr", group: "video" 
  },
  "24": { 
    name: "Maya Lin", role: "Commercial Video Editor & Colorist", profileImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400", workImg: "/video.jpeg", 
    bio: "Maya specializes in dynamic, fast-paced video editing, DaVinci Resolve color grading, and high-retention social and corporate video campaigns.", 
    skills: ["DaVinci Resolve", "Color Grading", "Sound Design", "VFX"], rate: "$70/hr", group: "video" 
  }
};

const ServiceDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(defaultServiceData[id] || null);
  const [groupMembers, setGroupMembers] = useState(
    defaultServiceData[id] ? defaultServiceGroups[defaultServiceData[id].group] || [] : []
  );

  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        const data = await serviceService.getById(id);
        if (data?.service) {
          setUser(data.service);
          if (data.groupMembers && data.groupMembers.length > 0) {
            setGroupMembers(data.groupMembers);
          } else if (data.service.group && defaultServiceGroups[data.service.group]) {
            setGroupMembers(defaultServiceGroups[data.service.group]);
          }
        }
      } catch (err) {
        console.warn("Could not fetch provider detail from REST API, using fallback data:", err);
      }
    };
    fetchServiceDetail();
  }, [id]);

  if (!user) return <div className="error-msg"><h2>Expert not found!</h2><Link to="/services">Back</Link></div>;

  return (
    <div className="service-page">
      <div className="detail-container">
        <div className="expert-slider">
           <p className="slider-label">Compare Providers</p>
           <div className="slider-controls">
             {groupMembers.map((memberId) => {
               const member = defaultServiceData[memberId] || (memberId === id ? user : { name: `Expert #${memberId}` });
               return (
                 <Link 
                   key={memberId} 
                   to={`/profile/${memberId}`} 
                   className={`slider-tab ${id === memberId ? 'active' : ''}`}
                 >
                   {member?.name || `Expert #${memberId}`}
                 </Link>
               );
             })}
           </div>
        </div>

        <div className="profile-header">
          <div className="avatar-wrapper">
            <img src={user.profileImg} alt={user.name} className="profile-avatar" />
          </div>
          <div className="profile-info-main">
            <h1>{user.name}</h1>
            <p className="role-tag">{user.role}</p>
          </div>
        </div>

        <div className="profile-body">
          <div className="bio-section">
            <h3>Professional Biography</h3>
            <p className="bio-text">{user.bio}</p>
          </div>
          <div className="skills-section">
            <h3>Key Skills</h3>
            <div className="skills-list">
              {user.skills?.map(s => <span key={s} className="skill-badge">{s}</span>)}
            </div>
          </div>
        </div>

        <hr className="divider" />

        {/* Service Scope & Deliverables */}
        <div className="service-scope-section">
          <h3>What You Get With This Service</h3>
          <div className="scope-grid">
            <div className="scope-card">
              <span className="scope-icon">⏱️</span>
              <div>
                <strong>Turnaround Time</strong>
                <p>24 - 48 Hours Delivery</p>
              </div>
            </div>
            <div className="scope-card">
              <span className="scope-icon">📬</span>
              <div>
                <strong>Delivery Method</strong>
                <p>Delivered to your Email & Dashboard</p>
              </div>
            </div>
            <div className="scope-card">
              <span className="scope-icon">📦</span>
              <div>
                <strong>Deliverables Included</strong>
                <p>Full Source Files, Assets & Documentation</p>
              </div>
            </div>
            <div className="scope-card">
              <span className="scope-icon">🔄</span>
              <div>
                <strong>Revisions Policy</strong>
                <p>2 Free Rounds of Revisions</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Step Email Delivery Workflow */}
        <div className="delivery-process-section">
          <h3>How Service Delivery Works</h3>
          <div className="process-steps">
            <div className="p-step">
              <div className="step-num">1</div>
              <h4>Submit Brief</h4>
              <p>Book the service and provide project requirements with your delivery email address.</p>
            </div>
            <div className="p-step">
              <div className="step-num">2</div>
              <h4>Expert Crafts Solution</h4>
              <p>{user.name.split(' ')[0]} gets to work immediately on building and refining your request.</p>
            </div>
            <div className="p-step">
              <div className="step-num">3</div>
              <h4>Direct Email Delivery</h4>
              <p>Finished files and download links are sent directly to your email inbox & dashboard.</p>
            </div>
            <div className="p-step">
              <div className="step-num">4</div>
              <h4>Review & Approve</h4>
              <p>Check the deliverables, request edits if needed, or approve with 100% satisfaction.</p>
            </div>
          </div>
        </div>

        <hr className="divider" />

        <div className="service-preview-section">
          <h3>Expert Portfolio</h3>
          <div className="portfolio-container">
            <img src={user.workImg} alt="Work" className="portfolio-img" />
          </div>
        </div>

        <div className="final-actions-bar">
           <div className="cta-text">
             <h4>Ready to proceed?</h4>
             <p>Verified Expert Status • Direct Email Delivery Guarantee</p>
           </div>
           <div className="cta-btns">
             <Link to="/services" className="back-link">← Back</Link>
             <Link to={`/reviews/${id}`}>
              <button className="btn-reviews-green">Reviews (24)</button>
             </Link>
             <Link to={`/book/${id}`} className="btn-book">
               Book {user.name.split(' ')[0]} • {user.rate}
             </Link>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;