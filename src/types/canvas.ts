export interface BusinessModelCanvas {
  customerSegments: string;
  valueProposition: string;
  channels: string;
  customerRelationships: string;
  revenueStreams: string;
  keyResources: string;
  keyActivities: string;
  keyPartnerships: string;
  costStructure: string;
  // APU Format additional fields
  ipProtection?: string;
  technologyTransfer?: string;
  regulatoryRequirements?: string;
  leanStartup?: string;
  marketPresence?: string;
  organizationalCulture?: string;
  // Citations for APU format
  citations?: {
    customerSegments?: string;
    valueProposition?: string;
    channels?: string;
    customerRelationships?: string;
    revenueStreams?: string;
    keyResources?: string;
    keyActivities?: string;
    keyPartnerships?: string;
    costStructure?: string;
    ipProtection?: string;
    technologyTransfer?: string;
    regulatoryRequirements?: string;
    leanStartup?: string;
    marketPresence?: string;
    organizationalCulture?: string;
  };
}

export type CanvasFormat = 'general' | 'apu';

export interface Theme {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    sections: {
      keyPartnerships: string;
      keyActivities: string;
      keyResources: string;
      valueProposition: string;
      customerRelationships: string;
      channels: string;
      customerSegments: string;
      costStructure: string;
      revenueStreams: string;
      // APU additional sections
      ipProtection: string;
      technologyTransfer: string;
      regulatoryRequirements: string;
      leanStartup: string;
      marketPresence: string;
      organizationalCulture: string;
    };
  };
  icon: string;
}

export interface SectionGuide {
  title: string;
  description: string;
  examples: string[];
  tips: string[];
  apuPrompts?: string[];
  justificationAreas?: string[];
}

export const themes: Theme[] = [
  {
    id: 'startup',
    name: 'Startup',
    description: 'Bold and innovative design for emerging businesses',
    icon: '🚀',
    colors: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      accent: '#06b6d4',
      background: '#f8fafc',
      text: '#1e293b',
      sections: {
        keyPartnerships: '#ddd6fe',
        keyActivities: '#bbf7d0',
        keyResources: '#fed7d7',
        valueProposition: '#fef3c7',
        customerRelationships: '#e0e7ff',
        channels: '#fce7f3',
        customerSegments: '#fef2f2',
        costStructure: '#f3e8ff',
        revenueStreams: '#d1fae5',
        ipProtection: '#e0f2fe',
        technologyTransfer: '#f0f9ff',
        regulatoryRequirements: '#fdf4ff',
        leanStartup: '#ecfdf5',
        marketPresence: '#fffbeb',
        organizationalCulture: '#fef7cd'
      }
    }
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Academic-focused design for educational institutions',
    icon: '📚',
    colors: {
      primary: '#dc2626',
      secondary: '#ea580c',
      accent: '#f59e0b',
      background: '#fefcfb',
      text: '#7c2d12',
      sections: {
        keyPartnerships: '#fed7d7',
        keyActivities: '#fef3c7',
        keyResources: '#fde68a',
        valueProposition: '#fecaca',
        customerRelationships: '#fee2e2',
        channels: '#fef2f2',
        customerSegments: '#fef7ed',
        costStructure: '#fdf2f8',
        revenueStreams: '#fff7ed',
        ipProtection: '#fef3c7',
        technologyTransfer: '#fed7d7',
        regulatoryRequirements: '#fde68a',
        leanStartup: '#fee2e2',
        marketPresence: '#fef7ed',
        organizationalCulture: '#fff7ed'
      }
    }
  },
  {
    id: 'eco-impact',
    name: 'Eco Impact',
    description: 'Sustainable and environmentally conscious design',
    icon: '🌱',
    colors: {
      primary: '#059669',
      secondary: '#10b981',
      accent: '#84cc16',
      background: '#f0fdf4',
      text: '#064e3b',
      sections: {
        keyPartnerships: '#d1fae5',
        keyActivities: '#dcfce7',
        keyResources: '#fef3c7',
        valueProposition: '#ecfdf5',
        customerRelationships: '#f0fdf4',
        channels: '#f7fee7',
        customerSegments: '#fffbeb',
        costStructure: '#f9fafb',
        revenueStreams: '#d1fae5',
        ipProtection: '#ecfdf5',
        technologyTransfer: '#f0fdf4',
        regulatoryRequirements: '#f7fee7',
        leanStartup: '#dcfce7',
        marketPresence: '#fffbeb',
        organizationalCulture: '#f0fdf4'
      }
    }
  },
  {
    id: 'tech',
    name: 'Tech',
    description: 'Modern technology-focused design',
    icon: '💻',
    colors: {
      primary: '#0ea5e9',
      secondary: '#3b82f6',
      accent: '#06b6d4',
      background: '#f1f5f9',
      text: '#0f172a',
      sections: {
        keyPartnerships: '#dbeafe',
        keyActivities: '#dcfce7',
        keyResources: '#fef3c7',
        valueProposition: '#e0f2fe',
        customerRelationships: '#f0f9ff',
        channels: '#ede9fe',
        customerSegments: '#fdf4ff',
        costStructure: '#f8fafc',
        revenueStreams: '#ecfdf5',
        ipProtection: '#e0f2fe',
        technologyTransfer: '#dbeafe',
        regulatoryRequirements: '#f0f9ff',
        leanStartup: '#ecfdf5',
        marketPresence: '#fdf4ff',
        organizationalCulture: '#f8fafc'
      }
    }
  }
];

export const sectionGuides: Record<string, SectionGuide> = {
  customerSegments: {
    title: 'Customer Segments',
    description: 'The different groups of people or organizations an enterprise aims to reach and serve',
    examples: [
      'Mass market segments',
      'Niche market segments',
      'Segmented markets',
      'Multi-sided platforms'
    ],
    tips: [
      'Be specific about who your customers are',
      'Consider demographics, behaviors, and needs',
      'Focus on segments you can serve profitably'
    ],
    apuPrompts: [
      'Who are your primary and secondary customer segments?',
      'What are the demographic and psychographic characteristics?',
      'How do customer needs vary across segments?',
      'What is the market size and growth potential for each segment?'
    ],
    justificationAreas: [
      'Market research data supporting segment identification',
      'Customer validation interviews and surveys',
      'Competitive analysis of target segments',
      'Revenue potential and profitability analysis'
    ]
  },
  valueProposition: {
    title: 'Value Proposition',
    description: 'The bundle of products and services that create value for a specific customer segment',
    examples: [
      'Newness and innovation',
      'Performance improvements',
      'Customization and personalization',
      'Cost reduction or convenience'
    ],
    tips: [
      'Focus on the jobs customers are trying to get done',
      'Address customer pains and gains',
      'Be specific about the value you create'
    ],
    apuPrompts: [
      'What specific problems does your solution solve?',
      'How does your value proposition differ from competitors?',
      'What intellectual property protects your value proposition?',
      'How does technology transfer enhance your offering?',
      'What regulatory requirements affect your value delivery?'
    ],
    justificationAreas: [
      'IP protection strategy and patent analysis',
      'Technology transfer agreements and partnerships',
      'Regulatory compliance and approval processes',
      'Market positioning and competitive advantage',
      'Customer value quantification and ROI analysis'
    ]
  },
  channels: {
    title: 'Channels',
    description: 'How a company communicates with and reaches its customer segments to deliver value',
    examples: [
      'Direct sales force',
      'Web sales and online platforms',
      'Partner stores and distributors',
      'Social media and content marketing'
    ],
    tips: [
      'Consider both owned and partner channels',
      'Think about the entire customer journey',
      'Balance reach, efficiency, and customer experience'
    ],
    apuPrompts: [
      'What channels will you use to reach each customer segment?',
      'How will you integrate online and offline channels?',
      'What partnerships are needed for channel distribution?',
      'How will you measure channel effectiveness?'
    ],
    justificationAreas: [
      'Channel strategy and customer journey mapping',
      'Partnership agreements and distribution networks',
      'Digital marketing and e-commerce capabilities',
      'Channel performance metrics and optimization'
    ]
  },
  customerRelationships: {
    title: 'Customer Relationships',
    description: 'The types of relationships a company establishes with specific customer segments',
    examples: [
      'Personal assistance',
      'Dedicated personal assistance',
      'Self-service platforms',
      'Automated services and communities'
    ],
    tips: [
      'Consider the customer journey from acquisition to retention',
      'Think about how relationships impact customer experience',
      'Balance automation with personal touch'
    ],
    apuPrompts: [
      'How will you acquire new customers?',
      'What strategies will you use to retain customers?',
      'How will you build long-term customer loyalty?',
      'What role does community building play in your strategy?'
    ],
    justificationAreas: [
      'Customer acquisition cost and lifetime value analysis',
      'Retention strategies and loyalty programs',
      'Customer service and support systems',
      'Community engagement and brand building'
    ]
  },
  revenueStreams: {
    title: 'Revenue Streams',
    description: 'The cash a company generates from each customer segment',
    examples: [
      'Asset sale (one-time payments)',
      'Usage fees and subscriptions',
      'Licensing and advertising',
      'Brokerage and freemium models'
    ],
    tips: [
      'Consider different pricing mechanisms',
      'Think about recurring vs. one-time revenue',
      'Align revenue streams with customer value'
    ],
    apuPrompts: [
      'What are your primary revenue streams?',
      'How will you price your products/services?',
      'What is your funding strategy for growth?',
      'How will revenue streams evolve over time?'
    ],
    justificationAreas: [
      'Revenue model validation and pricing strategy',
      'Financial projections and break-even analysis',
      'Funding requirements and investment strategy',
      'Revenue diversification and risk management'
    ]
  },
  keyResources: {
    title: 'Key Resources',
    description: 'The most important assets required to make a business model work',
    examples: [
      'Physical resources (facilities, equipment)',
      'Intellectual resources (patents, copyrights)',
      'Human resources (skilled employees)',
      'Financial resources (cash, credit lines)'
    ],
    tips: [
      'Consider what resources your value proposition requires',
      'Think about resources needed for distribution channels',
      'Include both owned and leased/partnered resources'
    ],
    apuPrompts: [
      'What physical, intellectual, human, and financial resources are critical?',
      'How will you acquire and maintain these resources?',
      'What resources provide competitive advantage?',
      'How do resource requirements scale with growth?'
    ],
    justificationAreas: [
      'Resource acquisition and development strategy',
      'Intellectual property portfolio and protection',
      'Human capital requirements and talent strategy',
      'Financial resource planning and capital allocation'
    ]
  },
  keyActivities: {
    title: 'Key Activities',
    description: 'The most important things a company must do to make its business model work',
    examples: [
      'Production activities',
      'Problem-solving activities',
      'Platform/network activities',
      'Marketing and sales'
    ],
    tips: [
      'Focus on activities that create and deliver value',
      'Consider what activities are required for channels and revenue streams',
      'Think about activities needed to maintain customer relationships'
    ],
    apuPrompts: [
      'What are the core activities that create value?',
      'How will you optimize operational efficiency?',
      'What activities are critical for competitive advantage?',
      'How will key activities evolve as you scale?'
    ],
    justificationAreas: [
      'Operational strategy and process optimization',
      'Core competency development and protection',
      'Quality management and continuous improvement',
      'Scalability planning and automation strategy'
    ]
  },
  keyPartnerships: {
    title: 'Key Partnerships',
    description: 'The network of suppliers and partners that make the business model work',
    examples: [
      'Strategic alliances between non-competitors',
      'Joint ventures to develop new businesses',
      'Buyer-supplier relationships',
      'Technology partnerships'
    ],
    tips: [
      'Focus on partnerships that reduce risk or acquire resources',
      'Consider both strategic and operational partnerships',
      'Think about exclusive vs. non-exclusive relationships'
    ],
    apuPrompts: [
      'Who are your key strategic partners?',
      'What value do partnerships bring to your business model?',
      'How will you manage and maintain partnerships?',
      'What risks do partnerships introduce and how will you mitigate them?'
    ],
    justificationAreas: [
      'Partnership strategy and value creation analysis',
      'Due diligence and partner selection criteria',
      'Partnership agreements and governance structures',
      'Risk management and contingency planning'
    ]
  },
  costStructure: {
    title: 'Cost Structure',
    description: 'All costs incurred to operate a business model',
    examples: [
      'Fixed costs (salaries, rent)',
      'Variable costs (materials, commissions)',
      'Economies of scale',
      'Economies of scope'
    ],
    tips: [
      'Consider both direct and indirect costs',
      'Think about cost drivers and how to optimize them',
      'Balance cost efficiency with value creation'
    ],
    apuPrompts: [
      'What are your major cost categories?',
      'How will costs scale with business growth?',
      'What is your funding strategy to cover initial costs?',
      'How will you optimize cost structure over time?'
    ],
    justificationAreas: [
      'Cost analysis and financial modeling',
      'Funding strategy and capital requirements',
      'Cost optimization and efficiency initiatives',
      'Financial risk management and contingency planning'
    ]
  },
  // APU-specific sections
  ipProtection: {
    title: 'IP Protection',
    description: 'Intellectual property strategy and protection mechanisms',
    examples: [
      'Patents and patent applications',
      'Trademarks and brand protection',
      'Trade secrets and confidentiality',
      'Copyright and licensing agreements'
    ],
    tips: [
      'Identify all forms of intellectual property',
      'Develop comprehensive protection strategy',
      'Consider international IP protection needs'
    ],
    apuPrompts: [
      'What intellectual property does your business create or use?',
      'How will you protect your IP from competitors?',
      'What IP licensing opportunities exist?',
      'How does IP protection support your competitive advantage?'
    ],
    justificationAreas: [
      'IP audit and portfolio assessment',
      'Patent and trademark filing strategy',
      'IP licensing and monetization opportunities',
      'IP enforcement and litigation strategy'
    ]
  },
  technologyTransfer: {
    title: 'Technology Transfer',
    description: 'Process of transferring technology from research to commercial application',
    examples: [
      'University technology licensing',
      'Research collaboration agreements',
      'Technology acquisition and integration',
      'Open innovation partnerships'
    ],
    tips: [
      'Identify technology sources and opportunities',
      'Evaluate technology readiness and commercial potential',
      'Develop technology integration capabilities'
    ],
    apuPrompts: [
      'What technologies will you license or acquire?',
      'How will you integrate external technologies?',
      'What technology development partnerships will you pursue?',
      'How will technology transfer support your innovation strategy?'
    ],
    justificationAreas: [
      'Technology assessment and due diligence',
      'Technology transfer agreements and terms',
      'Integration planning and execution',
      'Technology roadmap and development strategy'
    ]
  },
  regulatoryRequirements: {
    title: 'Regulatory Requirements',
    description: 'Legal and regulatory compliance requirements affecting the business',
    examples: [
      'Industry-specific regulations',
      'Data protection and privacy laws',
      'Environmental compliance',
      'International trade regulations'
    ],
    tips: [
      'Identify all applicable regulations',
      'Develop compliance strategy and processes',
      'Monitor regulatory changes and updates'
    ],
    apuPrompts: [
      'What regulatory requirements affect your business?',
      'How will you ensure ongoing compliance?',
      'What regulatory risks need to be managed?',
      'How do regulations impact your go-to-market strategy?'
    ],
    justificationAreas: [
      'Regulatory analysis and compliance assessment',
      'Compliance strategy and implementation plan',
      'Regulatory risk management and mitigation',
      'Regulatory affairs and government relations'
    ]
  },
  leanStartup: {
    title: 'Lean Startup',
    description: 'Lean startup methodology and iterative development approach',
    examples: [
      'Build-Measure-Learn cycles',
      'Minimum viable product (MVP)',
      'Customer development and validation',
      'Pivot strategies and decision making'
    ],
    tips: [
      'Focus on validated learning',
      'Minimize waste and maximize learning',
      'Embrace experimentation and iteration'
    ],
    apuPrompts: [
      'How will you apply lean startup principles?',
      'What hypotheses will you test first?',
      'How will you measure progress and learning?',
      'What pivot strategies will you consider?'
    ],
    justificationAreas: [
      'Lean methodology implementation plan',
      'Hypothesis testing and validation framework',
      'MVP development and iteration strategy',
      'Learning metrics and decision criteria'
    ]
  },
  marketPresence: {
    title: 'Market Presence',
    description: 'Strategy for establishing and maintaining market position',
    examples: [
      'Brand building and positioning',
      'Market entry and expansion',
      'Competitive positioning',
      'Thought leadership and industry presence'
    ],
    tips: [
      'Define clear market positioning',
      'Build strong brand recognition',
      'Establish thought leadership'
    ],
    apuPrompts: [
      'How will you establish market presence?',
      'What is your brand positioning strategy?',
      'How will you differentiate from competitors?',
      'What market expansion opportunities exist?'
    ],
    justificationAreas: [
      'Market analysis and positioning strategy',
      'Brand development and marketing plan',
      'Competitive analysis and differentiation',
      'Market expansion and growth strategy'
    ]
  },
  organizationalCulture: {
    title: 'Organizational Culture',
    description: 'Company culture, values, and organizational design',
    examples: [
      'Core values and mission',
      'Organizational structure and governance',
      'Team culture and collaboration',
      'Innovation and learning culture'
    ],
    tips: [
      'Define clear values and mission',
      'Design culture to support strategy',
      'Foster innovation and learning'
    ],
    apuPrompts: [
      'What culture will support your business model?',
      'How will you attract and retain talent?',
      'What organizational structure is optimal?',
      'How will culture evolve as you scale?'
    ],
    justificationAreas: [
      'Culture definition and values framework',
      'Organizational design and structure',
      'Talent strategy and human resources',
      'Culture measurement and development'
    ]
  }
};

export const initialCanvas: BusinessModelCanvas = {
  customerSegments: '',
  valueProposition: '',
  channels: '',
  customerRelationships: '',
  revenueStreams: '',
  keyResources: '',
  keyActivities: '',
  keyPartnerships: '',
  costStructure: '',
  ipProtection: '',
  technologyTransfer: '',
  regulatoryRequirements: '',
  leanStartup: '',
  marketPresence: '',
  organizationalCulture: '',
  citations: {
    customerSegments: '',
    valueProposition: '',
    channels: '',
    customerRelationships: '',
    revenueStreams: '',
    keyResources: '',
    keyActivities: '',
    keyPartnerships: '',
    costStructure: '',
    ipProtection: '',
    technologyTransfer: '',
    regulatoryRequirements: '',
    leanStartup: '',
    marketPresence: '',
    organizationalCulture: ''
  }
};