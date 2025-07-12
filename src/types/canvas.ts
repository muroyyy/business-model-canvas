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
}

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
    };
  };
  icon: string;
}

export interface SectionGuide {
  title: string;
  description: string;
  examples: string[];
  tips: string[];
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
        revenueStreams: '#d1fae5'
      }
    }
  },
  {
    id: 'tech',
    name: 'Tech',
    description: 'Sleek and modern design for technology companies',
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
        revenueStreams: '#ecfdf5'
      }
    }
  },
  {
    id: 'sustainable',
    name: 'Sustainable',
    description: 'Earth-friendly palette for sustainable businesses',
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
        revenueStreams: '#d1fae5'
      }
    }
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Warm and approachable design for educational institutions',
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
        revenueStreams: '#fff7ed'
      }
    }
  }
];

export const sectionGuides: Record<keyof BusinessModelCanvas, SectionGuide> = {
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
    ]
  },
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
};