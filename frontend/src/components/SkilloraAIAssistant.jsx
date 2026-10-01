import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './SkilloraAIAssistant.css';
import { serviceService } from '../services/serviceService';

// Comprehensive expert knowledge base for instant offline/online AI matching
const DEFAULT_EXPERTS = [
  {
    id: "1",
    name: "Alex Rivera",
    role: "Senior Full Stack Architect",
    profileImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    skills: ["React/Next.js", "Node.js", "PostgreSQL", "AWS"],
    rate: "$95/hr",
    category: "Web Development",
    keywords: ["react", "next", "full stack", "node", "javascript", "web", "saas", "frontend", "backend", "api"]
  },
  {
    id: "10",
    name: "Jordan Smith",
    role: "Lead Frontend Engineer",
    profileImg: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400",
    skills: ["TypeScript", "Three.js", "Tailwind", "GSAP"],
    rate: "$85/hr",
    category: "Web Development",
    keywords: ["typescript", "tailwind", "three.js", "animation", "ui", "frontend", "web", "gsap"]
  },
  {
    id: "4",
    name: "Elena Rodriguez",
    role: "Product Designer (UI/UX)",
    profileImg: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    skills: ["Figma", "UX Research", "Design Systems"],
    rate: "$65/hr",
    category: "UI / UX Design",
    keywords: ["figma", "ui", "ux", "design", "wireframe", "prototype", "user experience", "app design"]
  },
  {
    id: "2",
    name: "Sarah Chen",
    role: "Senior Brand Strategist & Designer",
    profileImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    skills: ["Brand Strategy", "Illustrator", "Layout"],
    rate: "$60/hr",
    category: "Graphic Design",
    keywords: ["logo", "branding", "graphics", "illustrator", "photoshop", "brand identity", "poster"]
  },
  {
    id: "6",
    name: "Kenji Sato",
    role: "Cross-Platform Mobile Engineer",
    profileImg: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
    skills: ["Flutter", "React Native", "Firebase"],
    rate: "$80/hr",
    category: "Mobile App Development",
    keywords: ["mobile", "flutter", "react native", "android", "ios", "firebase", "app"]
  },
  {
    id: "9",
    name: "Dr. Ethan Vance",
    role: "AI / LLM Solutions Architect",
    profileImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    skills: ["LangChain", "OpenAI", "PyTorch", "Python"],
    rate: "$120/hr",
    category: "Artificial Intelligence",
    keywords: ["ai", "machine learning", "chatgpt", "openai", "llm", "langchain", "python", "nlp", "bot"]
  },
  {
    id: "19",
    name: "Devon Reed",
    role: "Senior Cloud & DevOps Architect",
    profileImg: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    skills: ["AWS", "Kubernetes", "Docker", "Terraform"],
    rate: "$110/hr",
    category: "Cloud & DevOps",
    keywords: ["cloud", "aws", "devops", "kubernetes", "docker", "ci/cd", "server", "linux", "azure"]
  },
  {
    id: "21",
    name: "Vikram Sethi",
    role: "Web3 & Smart Contract Auditor",
    profileImg: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
    skills: ["Solidity", "Smart Contracts", "EVM", "Ethereum"],
    rate: "$130/hr",
    category: "Blockchain & Web3",
    keywords: ["blockchain", "solidity", "smart contract", "crypto", "ethereum", "web3", "nft", "audit"]
  },
  {
    id: "8",
    name: "Klaus Weber",
    role: "Cyber Security & Penetration Tester",
    profileImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    skills: ["Pen Testing", "OWASP", "Network Audits"],
    rate: "$105/hr",
    category: "Cyber Security",
    keywords: ["security", "audit", "cyber", "penetration", "vulnerability", "protection", "firewall"]
  }
];

const QUICK_PROMPTS = [
  "🚀 Build a full-stack SaaS with React & Node.js",
  "🎨 Design a Figma UI/UX system for mobile app",
  "🤖 Integrate OpenAI LLM & AI chatbot into web app",
  "🔐 Audit smart contracts and launch Web3 dApp",
  "☁️ Set up AWS Kubernetes CI/CD infrastructure"
];

const SkilloraAIAssistant = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'calculator'
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [expertsList, setExpertsList] = useState(DEFAULT_EXPERTS);
  const messagesEndRef = useRef(null);

  // Scope & Budget Calculator states
  const [calcCategory, setCalcCategory] = useState('Web Development');
  const [calcScale, setCalcScale] = useState('Standard');
  const [calcUrgency, setCalcUrgency] = useState('Standard');

  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "👋 Hi! I'm **Skillora AI**, your smart project consultant. Tell me what you're building, your budget, or required skills, and I'll match you with the top verified experts with instant cost estimates!",
      quickPrompts: QUICK_PROMPTS
    }
  ]);

  // Load live expert list
  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const data = await serviceService.getAll();
        if (data?.services && data.services.length > 0) {
          const merged = data.services.map(s => ({
            id: s.id || s.serviceId || '1',
            name: s.name,
            role: s.role,
            profileImg: s.profileImg || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
            skills: s.skills || [],
            rate: s.rate || `$${s.hourlyRate || 80}/hr`,
            category: s.categoryName || 'General Service',
            keywords: [
              ...(s.skills || []),
              s.name,
              s.role,
              s.categoryName || ''
            ].join(' ').toLowerCase().split(' ')
          }));
          setExpertsList(merged);
        }
      } catch (e) {
        // Fallback to default experts
        setExpertsList(DEFAULT_EXPERTS);
      }
    };
    fetchExperts();
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  // AI Matching Engine
  const analyzeQueryAndMatch = (query) => {
    const qLower = query.toLowerCase();
    const tokens = qLower.split(/[\s,+/.]+/).filter(t => t.length > 1);

    // Score experts
    const scored = expertsList.map(exp => {
      let score = 0;
      const expText = `${exp.name} ${exp.role} ${exp.category} ${(exp.skills || []).join(' ')} ${(exp.keywords || []).join(' ')}`.toLowerCase();
      
      tokens.forEach(token => {
        if (expText.includes(token)) {
          score += 15;
        }
      });

      // Special keywords boosts
      if (qLower.includes('web') || qLower.includes('react') || qLower.includes('next') || qLower.includes('frontend')) {
        if (exp.category?.toLowerCase().includes('web') || exp.role?.toLowerCase().includes('full stack')) score += 30;
      }
      if (qLower.includes('figma') || qLower.includes('ui') || qLower.includes('ux') || qLower.includes('design')) {
        if (exp.category?.toLowerCase().includes('ui') || exp.category?.toLowerCase().includes('graphic')) score += 30;
      }
      if (qLower.includes('ai') || qLower.includes('gpt') || qLower.includes('bot') || qLower.includes('llm') || qLower.includes('machine learning')) {
        if (exp.category?.toLowerCase().includes('intelligence') || exp.role?.toLowerCase().includes('ai')) score += 35;
      }
      if (qLower.includes('crypto') || qLower.includes('blockchain') || qLower.includes('smart contract') || qLower.includes('solidity')) {
        if (exp.category?.toLowerCase().includes('blockchain')) score += 35;
      }
      if (qLower.includes('mobile') || qLower.includes('app') || qLower.includes('flutter') || qLower.includes('ios')) {
        if (exp.category?.toLowerCase().includes('mobile')) score += 30;
      }
      if (qLower.includes('cloud') || qLower.includes('aws') || qLower.includes('devops') || qLower.includes('docker')) {
        if (exp.category?.toLowerCase().includes('cloud')) score += 30;
      }

      // Base random realistic match score between 88% and 99%
      const matchPct = Math.min(99, Math.max(78, 80 + Math.min(18, score)));
      return { ...exp, score, matchPct };
    });

    scored.sort((a, b) => b.score - a.score);
    const topMatches = scored.slice(0, 2);

    // Estimate project metrics
    let estHours = '25 - 45 hours';
    let estCost = '$1,500 - $3,500';
    let estTimeline = '1 - 2 weeks';

    if (qLower.includes('mvp') || qLower.includes('small') || qLower.includes('quick')) {
      estHours = '15 - 25 hours';
      estCost = '$800 - $1,800';
      estTimeline = '3 - 6 days';
    } else if (qLower.includes('enterprise') || qLower.includes('scale') || qLower.includes('full') || qLower.includes('audit')) {
      estHours = '50 - 90 hours';
      estCost = '$4,000 - $8,500';
      estTimeline = '3 - 5 weeks';
    }

    return {
      topMatches,
      estHours,
      estCost,
      estTimeline,
      summary: `I've analyzed your project requirements. Here is a recommended technical strategy and our highest-ranked verified expert matches with instant escrow protection.`
    };
  };

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputVal;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      const matchResult = analyzeQueryAndMatch(query);
      const aiResponseMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: matchResult.summary,
        estInfo: {
          timeline: matchResult.estTimeline,
          cost: matchResult.estCost,
          hours: matchResult.estHours
        },
        matches: matchResult.topMatches
      };

      setMessages(prev => [...prev, aiResponseMsg]);
      setIsTyping(false);
    }, 850);
  };

  const handlePromptClick = (prompt) => {
    handleSendMessage(prompt);
  };

  const handleBookExpert = (expertId, expertName) => {
    setIsOpen(false);
    navigate(`/book/${expertId}`);
  };

  const handleViewProfile = (expertId) => {
    setIsOpen(false);
    navigate(`/profile/${expertId}`);
  };

  // Calculator helper
  const calculateEstimate = () => {
    let baseRate = 85;
    let hours = 35;
    let days = 10;

    if (calcCategory.includes('Web')) { baseRate = 90; hours = 40; }
    if (calcCategory.includes('AI')) { baseRate = 120; hours = 50; }
    if (calcCategory.includes('Blockchain')) { baseRate = 130; hours = 45; }
    if (calcCategory.includes('UI')) { baseRate = 70; hours = 30; }
    if (calcCategory.includes('Mobile')) { baseRate = 85; hours = 45; }
    if (calcCategory.includes('Cloud')) { baseRate = 110; hours = 35; }
    if (calcCategory.includes('Graphic')) { baseRate = 60; hours = 20; }
    if (calcCategory.includes('Security')) { baseRate = 105; hours = 30; }

    if (calcScale === 'MVP / Starter') { hours *= 0.6; days = 5; }
    if (calcScale === 'Enterprise Solution') { hours *= 2.2; days = 25; }

    if (calcUrgency === 'Rush (2x Speed)') { days = Math.max(2, Math.round(days * 0.5)); baseRate *= 1.25; }

    const totalCost = Math.round(baseRate * hours);
    return {
      hours: Math.round(hours),
      days,
      cost: totalCost,
      matchedExpert: expertsList.find(e => e.category?.toLowerCase().includes(calcCategory.toLowerCase().slice(0, 4))) || expertsList[0]
    };
  };

  const calcResult = calculateEstimate();

  return (
    <div className="skillora-ai-fab-container">
      {/* Floating Toggle Button */}
      <button 
        className="skillora-ai-fab"
        onClick={() => setIsOpen(!isOpen)}
        title="Open Skillora AI Project Matcher"
        id="skillora-ai-toggle-btn"
      >
        <span className="skillora-ai-fab-sparkle">✨</span>
        <span>Skillora AI Matcher</span>
        <span className="skillora-ai-fab-badge">PRO</span>
      </button>

      {/* Main AI Window */}
      {isOpen && (
        <div className="skillora-ai-window">
          {/* Header */}
          <div className="skillora-ai-header">
            <div className="skillora-ai-header-left">
              <div className="skillora-ai-avatar">🤖</div>
              <div className="skillora-ai-title-wrap">
                <h4>Skillora AI Consultant</h4>
                <p><span className="skillora-ai-online-dot"></span> Smart Match Engine Active</p>
              </div>
            </div>
            <div className="skillora-ai-header-actions">
              <button 
                className="skillora-ai-btn-icon" 
                onClick={() => setMessages([{
                  id: 'welcome',
                  sender: 'assistant',
                  text: "👋 Hi! I'm Skillora AI. Tell me what you're looking to build!",
                  quickPrompts: QUICK_PROMPTS
                }])}
                title="Clear Chat"
              >
                🔄
              </button>
              <button 
                className="skillora-ai-btn-icon" 
                onClick={() => setIsOpen(false)}
                title="Close Window"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Mode Tabs */}
          <div className="skillora-ai-tabs">
            <button 
              className={`skillora-ai-tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
              onClick={() => setActiveTab('chat')}
            >
              💬 AI Smart Matcher
            </button>
            <button 
              className={`skillora-ai-tab-btn ${activeTab === 'calculator' ? 'active' : ''}`}
              onClick={() => setActiveTab('calculator')}
            >
              ⚡ Scope & Cost Calculator
            </button>
          </div>

          {/* Body: Chat Mode */}
          {activeTab === 'chat' && (
            <>
              <div className="skillora-ai-body">
                {messages.map((m) => (
                  <div key={m.id} className={`skillora-ai-msg ${m.sender}`}>
                    <div className="skillora-ai-msg-bubble">
                      <p style={{ margin: 0 }}>{m.text}</p>

                      {/* Project Scope & Cost Estimate Box */}
                      {m.estInfo && (
                        <div style={{
                          marginTop: '10px',
                          padding: '10px 12px',
                          background: 'rgba(56, 189, 248, 0.08)',
                          border: '1px solid rgba(56, 189, 248, 0.25)',
                          borderRadius: '10px',
                          fontSize: '0.8rem'
                        }}>
                          <div style={{ fontWeight: '700', color: '#38bdf8', marginBottom: '6px' }}>📊 Project Scope Estimate:</div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1', marginBottom: '3px' }}>
                            <span>⏱️ Timeline:</span> <strong>{m.estInfo.timeline}</strong>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1', marginBottom: '3px' }}>
                            <span>⏳ Effort:</span> <strong>{m.estInfo.hours}</strong>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#1dbf73' }}>
                            <span>💰 Est. Escrow Budget:</span> <strong>{m.estInfo.cost}</strong>
                          </div>
                        </div>
                      )}

                      {/* Matched Expert Cards */}
                      {m.matches && m.matches.length > 0 && (
                        <div style={{ marginTop: '10px' }}>
                          <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: '600' }}>
                            ⭐ Top Verified Expert Matches:
                          </span>
                          {m.matches.map((exp) => (
                            <div key={exp.id} className="skillora-ai-match-card">
                              <div className="skillora-ai-match-top">
                                <img 
                                  src={exp.profileImg} 
                                  alt={exp.name} 
                                  className="skillora-ai-expert-img" 
                                />
                                <div className="skillora-ai-expert-info">
                                  <div className="skillora-ai-expert-name">
                                    <span>{exp.name}</span>
                                    <span className="skillora-ai-match-badge">{exp.matchPct}% Match</span>
                                  </div>
                                  <div className="skillora-ai-expert-role">{exp.role}</div>
                                  <div className="skillora-ai-expert-rate">{exp.rate}</div>
                                </div>
                              </div>

                              <div className="skillora-ai-skills-tags">
                                {(exp.skills || []).slice(0, 4).map((s, idx) => (
                                  <span key={idx} className="skillora-ai-skill-tag">{s}</span>
                                ))}
                              </div>

                              <div className="skillora-ai-match-actions">
                                <button 
                                  className="skillora-ai-btn-book"
                                  onClick={() => handleBookExpert(exp.id, exp.name)}
                                >
                                  ⚡ Book Expert
                                </button>
                                <button 
                                  className="skillora-ai-btn-view"
                                  onClick={() => handleViewProfile(exp.id)}
                                >
                                  View Profile
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Quick Prompt Chips */}
                      {m.quickPrompts && (
                        <div className="skillora-ai-quick-prompts">
                          {m.quickPrompts.map((p, idx) => (
                            <button 
                              key={idx} 
                              className="skillora-ai-chip"
                              onClick={() => handlePromptClick(p)}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="skillora-ai-msg assistant">
                    <div className="skillora-ai-typing">
                      <span className="skillora-ai-dot"></span>
                      <span className="skillora-ai-dot"></span>
                      <span className="skillora-ai-dot"></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="skillora-ai-footer">
                <form 
                  className="skillora-ai-input-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                >
                  <input 
                    type="text" 
                    placeholder="Describe your project, budget, or skills needed..." 
                    className="skillora-ai-input"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                  />
                  <button 
                    type="submit" 
                    className="skillora-ai-send-btn"
                    disabled={!inputVal.trim()}
                  >
                    ➔
                  </button>
                </form>
              </div>
            </>
          )}

          {/* Body: Calculator Mode */}
          {activeTab === 'calculator' && (
            <div className="skillora-ai-body">
              <div className="skillora-ai-calculator">
                <div className="skillora-ai-form-group">
                  <label>Domain / Category:</label>
                  <select 
                    value={calcCategory} 
                    onChange={(e) => setCalcCategory(e.target.value)}
                    className="skillora-ai-select"
                  >
                    <option value="Web Development">Web Development (Full Stack / Frontend)</option>
                    <option value="UI / UX Design">UI / UX Product Design (Figma)</option>
                    <option value="Mobile App Development">Mobile App (iOS / Android / Flutter)</option>
                    <option value="Artificial Intelligence">AI & Machine Learning (OpenAI / LLMs)</option>
                    <option value="Blockchain & Web3">Blockchain & Web3 (Smart Contracts / Solidity)</option>
                    <option value="Cloud & DevOps">Cloud & DevOps (AWS / Kubernetes)</option>
                    <option value="Graphic Design">Graphic Design & Brand Identity</option>
                    <option value="Cyber Security">Cyber Security & Audits</option>
                  </select>
                </div>

                <div className="skillora-ai-form-group">
                  <label>Project Scope & Complexity:</label>
                  <select 
                    value={calcScale} 
                    onChange={(e) => setCalcScale(e.target.value)}
                    className="skillora-ai-select"
                  >
                    <option value="MVP / Starter">MVP / Starter Project (Fast validation)</option>
                    <option value="Standard">Complete Production Application</option>
                    <option value="Enterprise Solution">Enterprise Solution (High scale & security)</option>
                  </select>
                </div>

                <div className="skillora-ai-form-group">
                  <label>Delivery Urgency:</label>
                  <select 
                    value={calcUrgency} 
                    onChange={(e) => setCalcUrgency(e.target.value)}
                    className="skillora-ai-select"
                  >
                    <option value="Standard">Standard Pace</option>
                    <option value="Rush (2x Speed)">Rush (Expedited 2x Speed)</option>
                  </select>
                </div>

                {/* Calculation Output Card */}
                <div className="skillora-ai-calc-result">
                  <div className="skillora-ai-calc-row">
                    <span className="skillora-ai-calc-label">Estimated Delivery:</span>
                    <span className="skillora-ai-calc-val">~{calcResult.days} business days</span>
                  </div>
                  <div className="skillora-ai-calc-row">
                    <span className="skillora-ai-calc-label">Total Engineering Hours:</span>
                    <span className="skillora-ai-calc-val">{calcResult.hours} hours</span>
                  </div>
                  <div className="skillora-ai-calc-row">
                    <span className="skillora-ai-calc-label">Estimated Escrow Total:</span>
                    <span className="skillora-ai-calc-highlight">${calcResult.cost.toLocaleString()} USD</span>
                  </div>

                  {calcResult.matchedExpert && (
                    <div style={{ marginTop: '8px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '10px' }}>
                      <span style={{ fontSize: '0.74rem', color: '#38bdf8', fontWeight: '700' }}>🏆 Top Recommended Provider:</span>
                      <div className="skillora-ai-match-card" style={{ marginTop: '6px' }}>
                        <div className="skillora-ai-match-top">
                          <img 
                            src={calcResult.matchedExpert.profileImg} 
                            alt={calcResult.matchedExpert.name} 
                            className="skillora-ai-expert-img" 
                          />
                          <div className="skillora-ai-expert-info">
                            <div className="skillora-ai-expert-name">
                              <span>{calcResult.matchedExpert.name}</span>
                              <span className="skillora-ai-match-badge">98% Match</span>
                            </div>
                            <div className="skillora-ai-expert-role">{calcResult.matchedExpert.role}</div>
                            <div className="skillora-ai-expert-rate">{calcResult.matchedExpert.rate}</div>
                          </div>
                        </div>

                        <div className="skillora-ai-match-actions">
                          <button 
                            className="skillora-ai-btn-book"
                            onClick={() => handleBookExpert(calcResult.matchedExpert.id, calcResult.matchedExpert.name)}
                          >
                            ⚡ Book This Scope (${calcResult.cost})
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SkilloraAIAssistant;
