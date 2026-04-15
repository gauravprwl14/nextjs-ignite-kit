import { Capability, DetailedProject as Project } from './types';

// ============================================================================
// PROJECTS DATA - Comprehensive list from tech lead interviews and case studies
// ============================================================================

export const projects: Project[] = [
  // ====================
  // DIGITAL BANKING
  // ====================
  {
    id: 'hdfc-core-banking',
    name: 'Core Banking Modernization',
    client: 'Major Indian Private Bank',
    realClient: 'HDFC Bank',
    anonymizedClient: 'Major Indian Private Bank',
    isNDA: true,
    description: 'Legacy system modernization using Golang wrapper microservices around Oracle Banking Platform (OBP) and FlexCube',
    problem: 'Legacy SOAP/XML-based core banking system causing high latency (500ms+), difficult to scale, and blocking innovation',
    solution: 'Implemented Strangler Fig Pattern with Golang microservices providing gRPC/REST APIs, wrapping OBP calls, with multi-tier Redis caching',
    duration: '18+ months ongoing',
    teamSize: '8-10 engineers',
    capabilities: [
      'SOAP/XML to gRPC/REST conversion',
      '56% latency reduction (500ms → 220ms)',
      'OBP Proxy Service for XML transformations',
      'Multi-tier Redis caching',
      'Connection pooling optimization',
      'Zero downtime migration',
      'Service-to-service gRPC communication'
    ],
    technologies: ['Golang', 'gRPC', 'REST', 'SOAP/XML', 'Redis', 'Kubernetes', 'Oracle Banking Platform', 'FlexCube', 'PostgreSQL'],
    workTypes: ['backend', 'architecture'],
    status: 'production',
    businessImpact: [
      { metric: 'Latency Reduction', value: '56%', description: 'API response time improvement (500ms to 220ms)' },
      { metric: 'Performance', value: '10x', description: 'Faster than legacy SOAP calls' },
      { metric: 'Scalability', value: '100%', description: 'Independent service scaling with Kubernetes' },
      { metric: 'Developer Velocity', value: '+40%', description: 'Faster feature deployment' }
    ],
    technicalHighlights: [
      'Strangler Fig Pattern implementation for gradual migration',
      'Protocol modernization layer (SOAP → gRPC/REST)',
      'Zero downtime migration with traffic shadowing',
      'Maintained all audit trails for regulatory compliance'
    ],
    keyFeatures: [
      'Distributed microservices architecture',
      'Centralized OBP Proxy service',
      'Multi-tier caching strategy',
      'Service mesh with gRPC'
    ],
    challenges: [
      'Complex XML payload handling from OBP',
      'Maintaining transaction consistency across services',
      'Zero-downtime migration from monolith to microservices'
    ],
    architectureType: 'Microservices Wrapper with Strangler Fig Pattern',
    architectureDiagram: {
      title: 'Strangler Fig Pattern',
      description: 'Incremental migration from Legacy OBP to Modern Golang Microservices.',
      nodes: [
        { id: 'client', label: 'Client Apps', type: 'app', x: 10, y: 50 },
        { id: 'proxy', label: 'Go Proxy', type: 'gateway', x: 35, y: 30, subLabel: 'gRPC/REST' },
        { id: 'legacy', label: 'Legacy OBP', type: 'legacy', x: 60, y: 70, subLabel: 'SOAP/XML' },
        { id: 'new', label: 'New Service', type: 'service', x: 60, y: 30, subLabel: 'Golang' },
        { id: 'db', label: 'Modern DB', type: 'database', x: 85, y: 30 }
      ],
      flows: [
        { id: 'f1', source: 'client', target: 'proxy', label: 'API Call' },
        { id: 'f2', source: 'proxy', target: 'new', label: 'Route New' },
        { id: 'f3', source: 'proxy', target: 'legacy', label: 'Fallback Old' },
        { id: 'f4', source: 'new', target: 'db', label: 'Query' },
        { id: 'f5', source: 'new', target: 'proxy', label: 'Response' },
      ]
    }
  },

  {
    id: 'hdfc-upi-payment',
    name: 'Comprehensive UPI Payment System',
    client: 'Major Indian Private Bank',
    realClient: 'HDFC Bank',
    anonymizedClient: 'Major Indian Private Bank',
    isNDA: true,
    description: 'Full-featured UPI payment system with NPCI SDK integration, supporting registration, QR scanner, fund transfers, collect requests, and mandates',
    problem: 'Need for a complete UPI solution with fast transaction processing, custom QR scanner, and seamless user experience',
    solution: 'Built end-to-end UPI system using React Native with NPCI SDK, custom native QR scanner, token management, and real-time notifications',
    duration: '16+ months (Oct 2023 - Present)',
    teamSize: '3-4 engineers',
    capabilities: [
      'UPI registration with MPIN setup',
      'Custom-built native QR scanner (high performance)',
      'Person-to-person, person-to-merchant, self-transfer flows',
      'UPI Collect Request handling with push notifications',
      'UPI Mandate management (recurring payments)',
      'Biometric authentication for small transactions',
      'VPA Mapper (priority PSP mapping)',
      'UPI Intent flow for third-party app integration',
      'Transaction dispute and flagging support',
      'UPI ID blocking/unblocking and deregistration'
    ],
    technologies: ['React Native', 'Redux Saga', 'TypeScript', 'Objective C (iOS)', 'Android Java Native', 'NPCI SDK', 'Firebase', 'React Native Keychain', 'Golang (Backend)'],
    workTypes: ['frontend', 'backend', 'fullstack'],
    status: 'production',

    businessImpact: [
      { metric: 'Transaction Time', value: '2-3 sec', description: 'Real-time transaction processing' },
      { metric: 'User Adoption', value: 'High', description: 'Showcased biometric UPI at fintech conference' },
      { metric: 'QR Scanner Speed', value: '<1 sec', description: 'Native UI scanner performance' },
      { metric: 'Push Notifications', value: 'Real-time', description: 'Instant collect request notifications' }
    ],
    technicalHighlights: [
      'Custom-built QR scanner from scratch using native cameras',
      'NPCI SDK version management in Keychain to avoid mismatch',
      'Token storage and rotation using React Native Keychain',
      'Deep linking and UPI Intent flow for third-party integration',
      'Custom hooks for API and method orchestration',
      'Data restructuring from NPCI SDK format'
    ],
    keyFeatures: [
      'Complete UPI lifecycle (Registration → Transaction → Dispute)',
      'Multiple payment flows (P2P, P2M, Self-transfer)',
      'Advanced QR scanner (Static, Dynamic, BharatQR)',
      'Push notifications with deep linking',
      'Biometric UPI for small transactions',
      'UPI Mandate for recurring payments'
    ],
    challenges: [
      'NPCI SDK version mismatch causing registration delays',
      'Race conditions in Send Money flow (concurrent API calls)',
      'Data handling across separate UPI library and main app',
      'Managing modal UI states (loader, error sheets) simultaneously',
      'Secure token and credential storage in Keychain'
    ],
    architectureType: 'React Native with Native Modules and NPCI Integration',
    architectureDiagram: {
      title: '3-Layer UPI Audit Architecture',
      description: 'End-to-end transaction flow with real-time audit logging at HDFC, Mindgate, and NPCI layers.',
      nodes: [
        { id: 'app', label: 'HDFC App', type: 'app', x: 10, y: 50, subLabel: 'React Native + NPCI SDK' },
        { id: 'backend', label: 'HDFC Backend', type: 'server', x: 35, y: 30, subLabel: 'Golang Microservices' },
        { id: 'mindgate', label: 'Mindgate', type: 'security', x: 60, y: 70, subLabel: 'UPI Middleware' },
        { id: 'npci', label: 'NPCI Switch', type: 'cloud', x: 85, y: 50, subLabel: 'National Payment Switch' },
      ],
      flows: [
        { id: 'f1', source: 'app', target: 'backend', label: 'Init Pay' },
        { id: 'f2', source: 'backend', target: 'mindgate', label: 'Validate (L1)' },
        { id: 'f3', source: 'mindgate', target: 'npci', label: 'Route (L2)' },
        { id: 'f4', source: 'npci', target: 'mindgate', label: 'Confirm (L3)' },
        { id: 'f5', source: 'mindgate', target: 'backend', label: 'Update Ledger' },
        { id: 'f6', source: 'backend', target: 'app', label: 'Notify' },
      ]
    }
  },

  {
    id: 'hdfc-registration-nli',
    name: 'Digital Onboarding & Authentication',
    client: 'Major Indian Private Bank',
    realClient: 'HDFC Bank',
    anonymizedClient: 'Major Indian Private Bank',
    isNDA: true,
    description: 'Comprehensive registration and login (NLI) module with multi-factor authentication, SIM binding, and biometric support',
    problem: 'Need secure digital onboarding with multiple authentication methods and strong security measures to prevent fraud',
    solution: 'Multi-step registration flow with SIM binding, Net Banking/Debit Card verification, MPIN/Biometric setup, and failover mechanisms',
    duration: '12+ months',
    teamSize: '2-3 engineers',
    capabilities: [
      'Country selection and mobile number verification',
      'SIM binding verification for enhanced security',
      'Net Banking credential authentication',
      'Debit Card verification (Card number, expiry, CVV)',
      'MPIN setup and biometric binding',
      'Dashboard view selection (Basic vs. Advanced)',
      'Failover mechanisms (SMV/SSV flows)',
      'Virtual Mobile Number (VMN) management',
      'Multi-factor authentication',
      'Device fingerprinting and session management'
    ],
    technologies: ['React Native', 'TypeScript', 'Redux Toolkit (RTK)', 'Oracle Banking Platform', 'HDFC Design System (HBDL)', 'Native iOS/Android modules'],
    workTypes: ['frontend', 'fullstack'],
    status: 'production',
    businessImpact: [
      { metric: 'Onboarding Success', value: 'High', description: 'Improved completion rates' },
      { metric: 'Security', value: 'Bank-grade', description: 'Multi-layered authentication' },
      { metric: 'User Trust', value: '+30%', description: 'Secure onboarding builds confidence' }
    ],
    technicalHighlights: [
      'Modular repository structure (separate repos for registration, UI library, language module)',
      'HDFC Bank Design Library (HBDL) for consistent UI',
      'SIM binding for fraud prevention',
      'Graceful fallback handling (OTP timeout, SMS failures)',
      'MPIN encryption and secure storage'
    ],
    keyFeatures: [
      'Multi-step registration (Country → Mobile → Auth → MPIN → Dashboard)',
      'Dual authentication paths (Net Banking or Debit Card)',
      'Biometric enrollment (Face ID/Touch ID)',
      'Session persistence and device management',
      'Customizable dashboard (Basic/Advanced view)'
    ],
    challenges: [
      'Complex multi-step flow state management',
      'Handling various edge cases (network failures, OTP timeout)',
      'SIM binding verification on iOS and Android',
      'Secure credential storage across devices'
    ],
    architectureType: 'Modular React Native with Oracle Banking Platform Integration',
    architectureDiagram: {
      title: 'Secure Digital Onboarding Flow',
      description: 'Multi-step verification process ensuring device and user authenticity.',
      nodes: [
        { id: 'user', label: 'User', type: 'user', x: 5, y: 50 },
        { id: 'app', label: 'Mobile App', type: 'app', x: 25, y: 50, subLabel: 'Device Check' },
        { id: 'sim', label: 'SIM Binding', type: 'security', x: 50, y: 20 },
        { id: 'id', label: 'Identity Svc', type: 'service', x: 50, y: 80, subLabel: 'KYC/NLI' },
        { id: 'core', label: 'Core Banking', type: 'legacy', x: 75, y: 50 },
      ],
      flows: [
        { id: 'f1', source: 'user', target: 'app', label: 'Input Data' },
        { id: 'f2', source: 'app', target: 'sim', label: 'Verify SIM' },
        { id: 'f3', source: 'app', target: 'id', label: 'Auth Creds' },
        { id: 'f4', source: 'id', target: 'core', label: 'Validate Account' },
        { id: 'f5', source: 'core', target: 'app', label: 'Token Issued' }
      ]
    }
  },

  {
    id: 'hdfc-credit-card',
    name: 'Credit & Debit Card Management',
    client: 'Major Indian Private Bank',
    realClient: 'HDFC Bank',
    anonymizedClient: 'Major Indian Private Bank',
    isNDA: true,
    description: 'Unified platform for credit and debit card management including EMI tracking, SmartEMI, fraud reporting, and role-based access control',
    problem: 'Fragmented card management experience with separate systems for credit/debit cards, EMIs, limits, and fraud handling',
    solution: 'Built unified card management platform with EMI tracking, SmartEMI conversion, transaction search, fraud reporting, and dynamic RBAC',
    duration: '12+ months',
    teamSize: '4-5 engineers (2 parallel teams for credit and debit)',
    capabilities: [
      'EMI management (Active EMI, Monthly/Annual installments, SmartEMI)',
      'Card listing and summary (Credit and Debit)',
      'Transaction search and filtering',
      'Card limit management and increase requests',
      'Fraud reporting and dispute resolution',
      'Role-based access control (User, Bank, Admin)',
      'Card services (Block/Unblock, Re-issue, Upgrade)',
      'Digital and physical PIN reset',
      'Bill payment using credit card',
      'Statement download (PDF generation)'
    ],
    technologies: ['React Native', 'Redux', 'SQL', 'REST', 'Google Services', 'Adobe Target', 'Dynatrace', 'Java (Backend)', 'FlexCube'],
    workTypes: ['frontend', 'backend', 'fullstack'],
    status: 'production',
    businessImpact: [
      { metric: 'User Satisfaction', value: '+25%', description: 'Unified card management' },
      { metric: 'Dispute Resolution', value: 'Faster', description: 'Streamlined fraud reporting' },
      { metric: 'Self-Service', value: '+40%', description: 'Reduced support tickets' },
      { metric: 'Cross-Selling', value: '+20%', description: 'SmartEMI conversion increases revenue' }
    ],
    technicalHighlights: [
      'Parallel team coordination (Credit and Debit card services)',
      'Dynamic role-based permissions without disrupting workflows',
      'Real-time fraud detection integration',
      'PDF statement generation using Java backend',
      'Adobe Target integration for promotional banners'
    ],
    keyFeatures: [
      'Complete EMI lifecycle (View, Convert to SmartEMI, Track, Pay)',
      'Transaction history with advanced search',
      'Card limit management dashboard',
      'Fraud dispute workflow',
      'Multi-role support (User can request, Bank can approve/block)'
    ],
    challenges: [
      'Coordinating two parallel teams (credit and debit) without conflicts',
      'Implementing dynamic RBAC without breaking existing features',
      'Handling FlexCube integration for card data',
      'Managing scalability for millions of card transactions'
    ],
    architectureType: 'Dual-Service Architecture with Shared UI Library',
    architectureDiagram: {
      title: 'Unified Card Management',
      description: 'Shared UI library consuming distinct microservices for Credit and Debit flows.',
      nodes: [
        { id: 'app', label: 'App', type: 'app', x: 10, y: 50 },
        { id: 'shared', label: 'Shared UI', type: 'service', x: 35, y: 50, subLabel: 'React Native Lib' },
        { id: 'credit', label: 'Credit Svc', type: 'service', x: 65, y: 30, subLabel: 'Microservice' },
        { id: 'debit', label: 'Debit Svc', type: 'service', x: 65, y: 70, subLabel: 'Microservice' },
        { id: 'core', label: 'FlexCube', type: 'legacy', x: 90, y: 50 },
      ],
      flows: [
        { id: 'f1', source: 'app', target: 'shared', label: 'User Action' },
        { id: 'f2', source: 'shared', target: 'credit', label: 'Credit Req' },
        { id: 'f3', source: 'shared', target: 'debit', label: 'Debit Req' },
        { id: 'f4', source: 'credit', target: 'core', label: 'Fetch Data' },
        { id: 'f5', source: 'debit', target: 'core', label: 'Fetch Data' },
      ]
    }
  },

  {
    id: 'hdfc-account-management',
    name: 'Account Management & Services',
    client: 'Major Indian Private Bank',
    realClient: 'HDFC Bank',
    anonymizedClient: 'Major Indian Private Bank',
    isNDA: true,
    description: 'Comprehensive account management including multiple account types, PPF accounts, safe deposit lockers, and balance management',
    problem: 'Users need unified access to various account types (Savings, PPF, NRO, NRE, Lockers) with real-time balance and self-service capabilities',
    solution: 'Integrated account dashboard with multi-account support, PPF opening/linking, locker management, and real-time OBP integration',
    duration: '10+ months',
    teamSize: '2-3 engineers',
    capabilities: [
      'Multiple account listing (Savings, Current, NRE, NRO, PPF)',
      'Account balance retrieval with biometric authentication',
      'PPF account opening (RBI-compliant, single PPF per user)',
      'PPF account linking from other banks',
      'Safe deposit locker information display',
      'Locker nominee management',
      'Locker rent payment',
      'Account statement generation (PDF/CSV)',
      'Real-time balance updates from OBP'
    ],
    technologies: ['React Native', 'Redux', 'TypeScript', 'Oracle Banking Platform (OBP)', 'Java (for reports)', 'HDFC Bank Design Library'],
    workTypes: ['frontend', 'fullstack'],
    status: 'production',
    businessImpact: [
      { metric: 'Self-Service Rate', value: '+50%', description: 'Reduced branch visits' },
      { metric: 'PPF Account Opening', value: 'Digital', description: 'Fully digital PPF onboarding' },
      { metric: 'User Engagement', value: '+35%', description: 'Increased app usage for account management' }
    ],
    technicalHighlights: [
      'RBI compliance for PPF (single account per user validation)',
      'Real-time OBP integration for balance retrieval',
      'Biometric-protected balance reveal',
      'Nominee KYC validation for lockers',
      'Branch-level PPF account transfer logic'
    ],
    keyFeatures: [
      'Multi-account dashboard with quick switching',
      'PPF opening with eligibility check',
      'Locker management with nominee support',
      'Statement download in multiple formats'
    ],
    challenges: [
      'RBI compliance validation for PPF accounts',
      'Real-time balance sync from OBP',
      'Branch-level locker data integration'
    ],
    architectureType: 'React Native with Oracle Banking Platform Integration',
    architectureDiagram: {
      title: 'Multi-Account Aggregation',
      description: 'Centralized dashboard aggregating data from multiple account systems.',
      nodes: [
        { id: 'app', label: 'Dashboard', type: 'app', x: 10, y: 50 },
        { id: 'agg', label: 'Aggregator', type: 'gateway', x: 40, y: 50, subLabel: 'API Gateway' },
        { id: 'casa', label: 'CASA', type: 'legacy', x: 70, y: 20, subLabel: 'Savings/Current' },
        { id: 'ppf', label: 'PPF System', type: 'legacy', x: 70, y: 50, subLabel: 'Public Provident' },
        { id: 'locker', label: 'Safe Deposit', type: 'legacy', x: 70, y: 80, subLabel: 'Locker Sys' },
      ],
      flows: [
        { id: 'f1', source: 'app', target: 'agg', label: 'Fetch All' },
        { id: 'f2', source: 'agg', target: 'casa', label: 'Get Bal' },
        { id: 'f3', source: 'agg', target: 'ppf', label: 'Get PPF' },
        { id: 'f4', source: 'agg', target: 'locker', label: 'Get Locker' },
      ]
    }
  },

  {
    id: 'hdfc-loans-module',
    name: 'Loan Services & Management',
    client: 'Major Indian Private Bank',
    realClient: 'HDFC Bank',
    anonymizedClient: 'Major Indian Private Bank',
    isNDA: true,
    description: 'Digital loan management including personal loans, business loans, loan against mutual funds, EMI tracking, and application based on eligibility',
    problem: 'Users need easy access to loan information, EMI tracking, and digital loan application without branch visits',
    solution: 'Comprehensive loan module with visualization (donut charts), EMI tracking, eligibility-based applications, and RBI-compliant digital links',
    duration: '8+ months',
    teamSize: '2 engineers',
    capabilities: [
      'View all loans (Personal, Business, Loan Against Mutual Funds)',
      'Loan summary with donut chart visualization',
      'EMI payment tracking and reminders',
      'Receipt download for loan payments',
      'Loan application based on eligibility',
      'RBI-mandated digital loan links display',
      'Loan closure requests',
      'Prepayment and foreclosure options'
    ],
    technologies: ['React Native', 'TypeScript', 'HDFC Bank Design Library (HBDL)', 'OBP', 'Adobe Target', 'Chart Libraries'],
    workTypes: ['frontend'],
    status: 'production',
    businessImpact: [
      { metric: 'Loan Applications', value: '+30%', description: 'Digital applications increased' },
      { metric: 'Cross-Selling', value: '+25%', description: 'Eligibility-based offers drive conversions' },
      { metric: 'User Convenience', value: 'High', description: 'No branch visits needed for loan info' }
    ],
    technicalHighlights: [
      'Donut chart visualization for loan summary',
      'Adobe Target integration for promotional content',
      'RBI digital lending compliance (transparency links)',
      'Eligibility calculation based on user profile'
    ],
    keyFeatures: [
      'Loan dashboard with visual summary',
      'EMI tracking and payment',
      'Eligibility-based loan offers',
      'RBI-compliant digital loan process'
    ],
    architectureType: 'React Native with Adobe Target Integration',
    architectureDiagram: {
      title: 'Digital Lending Flow',
      description: 'End-to-end loan application with eligibility check and real-time disbursement.',
      nodes: [
        { id: 'user', label: 'User', type: 'user', x: 10, y: 50 },
        { id: 'ui', label: 'Loan UI', type: 'app', x: 30, y: 50, subLabel: 'Donut Charts' },
        { id: 'rule', label: 'Rule Engine', type: 'service', x: 55, y: 30, subLabel: 'Eligibility' },
        { id: 'adobe', label: 'Adobe Target', type: 'external', x: 55, y: 70, subLabel: 'Offers' },
        { id: 'core', label: 'Core Banking', type: 'legacy', x: 80, y: 50 },
      ],
      flows: [
        { id: 'f1', source: 'user', target: 'ui', label: 'Apply' },
        { id: 'f2', source: 'ui', target: 'rule', label: 'Check elligibility' },
        { id: 'f3', source: 'ui', target: 'adobe', label: 'Get Offers' },
        { id: 'f4', source: 'rule', target: 'core', label: 'Create Loan' },
        { id: 'f5', source: 'core', target: 'ui', label: 'Disburse' },
      ]
    }
  },

  {
    id: 'hdfc-money-transfer',
    name: 'Money Transfer & NEFT/RTGS/IMPS',
    client: 'Major Indian Private Bank',
    realClient: 'HDFC Bank',
    anonymizedClient: 'Major Indian Private Bank',
    isNDA: true,
    description: 'Comprehensive money transfer module supporting NEFT, RTGS, IMPS with transaction tracking and on-hold transaction management',
    problem: 'Users need reliable money transfer with multiple modes and visibility into transaction status including on-hold transactions',
    solution: 'Multi-mode transfer system with real-time tracking, on-hold transaction visibility, and entity-responsible flagging',
    duration: '6+ months',
    teamSize: '2 engineers',
    capabilities: [
      'NEFT/RTGS/IMPS transfers',
      'Beneficiary management',
      'Transaction tracking and status',
      'On-hold transactions view (up to 45 days)',
      'Entity responsible for hold tracking',
      'Scheduled transfers',
      'Bulk transfers'
    ],
    technologies: ['Golang', 'REST', 'Oracle Banking Platform', 'NPCI APIs', 'React Native (Frontend)'],
    workTypes: ['backend', 'fullstack'],
    status: 'production',
    businessImpact: [
      { metric: 'Transaction Success', value: '99%+', description: 'High reliability' },
      { metric: 'User Clarity', value: '+40%', description: 'On-hold transaction visibility reduces support calls' }
    ],
    architectureType: 'Backend Microservice with OBP Integration',
    architectureDiagram: {
      title: 'Payment Switch Integration',
      description: 'Routing transfers via appropriate payment rails (NEFT/RTGS/IMPS).',
      nodes: [
        { id: 'app', label: 'App', type: 'app', x: 10, y: 50 },
        { id: 'switch', label: 'Pay Switch', type: 'gateway', x: 35, y: 50, subLabel: 'Router' },
        { id: 'neft', label: 'NEFT', type: 'external', x: 65, y: 20, subLabel: 'Batch' },
        { id: 'imps', label: 'IMPS', type: 'external', x: 65, y: 50, subLabel: 'Real-time' },
        { id: 'rtgs', label: 'RTGS', type: 'external', x: 65, y: 80, subLabel: 'High Value' },
        { id: 'core', label: 'Core', type: 'legacy', x: 90, y: 50 },
      ],
      flows: [
        { id: 'f1', source: 'app', target: 'switch', label: 'Transfer' },
        { id: 'f2', source: 'switch', target: 'neft', label: 'Route' },
        { id: 'f3', source: 'switch', target: 'imps', label: 'Route' },
        { id: 'f4', source: 'switch', target: 'rtgs', label: 'Route' },
        { id: 'f5', source: 'imps', target: 'core', label: 'Settle' },
      ]
    }
  },

  {
    id: 'hdfc-security-rasp',
    name: 'Mobile App Security with RASP',
    client: 'Major Indian Private Bank',
    realClient: 'HDFC Bank',
    anonymizedClient: 'Major Indian Private Bank',
    isNDA: true,
    description: 'Runtime Application Self-Protection (RASP) implementation with malicious app detection, screen recording prevention, and SIM swap detection',
    problem: 'Banking app needs enterprise-grade security to prevent reverse engineering, screen recording, and unauthorized access',
    solution: 'Integrated Lookout SDK for RASP, implemented SIM binding, screenshot blocking, and DevRev integration for sensitive data redaction',
    duration: '6+ months',
    teamSize: '2 engineers',
    capabilities: [
      'Runtime Application Self-Protection (RASP) with Lookout SDK',
      'Malicious app detection',
      'Reverse engineering attempt detection',
      'Screen sharing and recording detection',
      'Screenshot blocking',
      'Unsafe USB debugging detection',
      'Unknown APK install detection',
      'Risk warnings and app blocking',
      'Backend activity logging for compliance',
      'SIM swap detection and transaction blocking',
      'Sensitive data redaction (DevRev integration)',
      'Crash video masking (Account number, Amount, MPIN)'
    ],
    technologies: ['React Native', 'Lookout SDK', 'DevRev', 'Native iOS/Android modules', 'JSI (JavaScript Interface)', 'Backend logging APIs'],
    workTypes: ['frontend', 'architecture'],
    status: 'production',
    businessImpact: [
      { metric: 'Security Incidents', value: '-90%', description: 'Prevented data breaches' },
      { metric: 'Compliance', value: '100%', description: 'RBI and App Store security mandates met' },
      { metric: 'User Trust', value: 'High', description: 'Enhanced app security reputation' }
    ],
    technicalHighlights: [
      'Custom SIM binding implementation for iOS (network detection, SIM tray validation)',
      'DevRev crash analytics with sensitive data masking',
      'Lookout SDK for RASP (malicious app, reverse engineering detection)',
      'Screenshot blocking for sensitive screens',
      'Backend compliance logging for audit trails'
    ],
    keyFeatures: [
      'Multi-layered security (RASP, SIM binding, screenshot blocking)',
      'Real-time threat detection and response',
      'Compliance-ready with audit logging',
      'DevRev integration for secure crash reporting'
    ],
    challenges: [
      'SIM binding implementation on iOS (no native APIs)',
      'Balancing security with user experience',
      'Integrating Lookout SDK without performance impact',
      'Masking sensitive data in crash videos'
    ],
    architectureType: 'Security-First Mobile Architecture with RASP',
    architectureDiagram: {
      title: 'RASP Security Layer',
      description: 'Runtime Application Self-Protection intercepting threats before they reach the core.',
      nodes: [
        { id: 'threat', label: 'Threat', type: 'external', x: 10, y: 50, subLabel: 'Malware/Root' },
        { id: 'rasp', label: 'RASP SDK', type: 'security', x: 30, y: 50, subLabel: 'Lookout' },
        { id: 'app', label: 'App Core', type: 'app', x: 55, y: 50, subLabel: 'React Native' },
        { id: 'log', label: 'Audit Log', type: 'server', x: 80, y: 30, subLabel: 'Splunk' },
        { id: 'block', label: 'Block', type: 'security', x: 80, y: 70, subLabel: 'Terminate' },
      ],
      flows: [
        { id: 'f1', source: 'threat', target: 'rasp', label: 'Attack' },
        { id: 'f2', source: 'rasp', target: 'block', label: 'Detect & Block' },
        { id: 'f3', source: 'rasp', target: 'app', label: 'Allow Safe' },
        { id: 'f4', source: 'rasp', target: 'log', label: 'Report' },
      ]
    }
  },

  {
    id: 'hdfc-observability-dynatrace',
    name: 'End-to-End Observability with Dynatrace',
    client: 'Major Indian Private Bank',
    realClient: 'HDFC Bank',
    anonymizedClient: 'Major Indian Private Bank',
    isNDA: true,
    description: 'Comprehensive application performance monitoring (APM) with Dynatrace for user journey tracking, backend tracing, and MTTR optimization',
    problem: 'Difficulty in debugging production issues due to lack of visibility into user journeys, backend service calls, and database queries',
    solution: 'Integrated Dynatrace APM for complete observability from frontend user interactions to backend database queries with multi-service tracing',
    duration: '4+ months',
    teamSize: '2 engineers',
    capabilities: [
      'Complete user journey mapping (click-to-database)',
      'Button click and input field tracking',
      'Navigation trail visualization',
      'Backend API call tracing',
      'Internal service-to-service call tracking',
      'Database query monitoring',
      'Multi-service workflow tracking',
      'Exact failure point identification',
      'Mean Time to Resolve (MTTR) optimization'
    ],
    technologies: ['Dynatrace APM', 'React Native', 'Golang (Backend Microservices)', 'Oracle Banking Platform'],
    workTypes: ['architecture', 'fullstack'],
    status: 'production',
    businessImpact: [
      { metric: 'MTTR', value: '-60%', description: 'Faster issue resolution' },
      { metric: 'Production Issues', value: '-40%', description: 'Proactive issue detection' },
      { metric: 'Debugging Time', value: '-70%', description: 'Complete visibility into user journey' }
    ],
    technicalHighlights: [
      'Full-stack observability (Frontend → API → Services → Database)',
      'User session replay for debugging',
      'Multi-service distributed tracing',
      'Performance bottleneck identification',
      'Real-time alerts and dashboards'
    ],
    architectureType: 'APM-Driven Observability Architecture',
    architectureDiagram: {
      title: 'Full-Stack Observability',
      description: 'Tracing user journey from UI interaction to Database query.',
      nodes: [
        { id: 'user', label: 'User Action', type: 'user', x: 10, y: 50 },
        { id: 'app', label: 'App (Agent)', type: 'app', x: 30, y: 50, subLabel: 'RUM' },
        { id: 'api', label: 'API Gateway', type: 'gateway', x: 50, y: 50, subLabel: 'Tracing' },
        { id: 'svc', label: 'Service', type: 'service', x: 70, y: 50, subLabel: 'Span' },
        { id: 'db', label: 'Database', type: 'database', x: 90, y: 50, subLabel: 'Query' },
      ],
      flows: [
        { id: 'f1', source: 'user', target: 'app', label: 'Click' },
        { id: 'f2', source: 'app', target: 'api', label: 'Trace ID' },
        { id: 'f3', source: 'api', target: 'svc', label: 'Child Span' },
        { id: 'f4', source: 'svc', target: 'db', label: 'SQL Trace' },
        { id: 'f5', source: 'db', target: 'app', label: 'Metrics' },
      ]
    }
  },

  // ====================
  // REGTECH & COMPLIANCE
  // ====================
  {
    id: 'tyfone-kyc-aml',
    name: 'Automated KYC/AML Platform',
    client: 'US-based Credit Union Platform',
    realClient: 'Tyfone NAO',
    anonymizedClient: 'US-based Credit Union Platform',
    isNDA: false,
    description: 'Fully automated identity verification and compliance platform integrating 13+ verification providers including Persona, Experian, TransUnion, ChexSystems, and OFAC screening',
    problem: 'Manual KYC/AML process took 5+ days, required significant manual review effort (90%+), and resulted in 60% user drop-offs during onboarding',
    solution: 'Built automated KYC/AML orchestration platform with parallel verification, real-time decision engine, and complete audit trail, reducing approval time from days to minutes',
    duration: '18+ months',
    teamSize: '4-5 engineers',
    capabilities: [
      'Government ID verification (front & back)',
      'Selfie verification with liveness detection',
      'TIN verification (SSN/EIN/ITIN)',
      'Database verification',
      'Watchlist screening (OFAC, Interpol)',
      'Credit bureau report (Experian - Soft inquiry)',
      'Debit bureau report (ChexSystems)',
      'Phone risk report and carrier verification',
      'Email risk report',
      'Address lookup report',
      'Adverse media report',
      'Politically Exposed Person (PEP) report',
      'Social media report',
      'Multi-applicant support (joint accounts)',
      'Application resumption feature',
      '10-step onboarding workflow'
    ],
    technologies: ['Node.js', 'PostgreSQL', 'Persona API', 'Experian API', 'TransUnion API', 'ChexSystems', 'OFAC', 'React (Frontend)', 'Redis'],
    workTypes: ['backend', 'fullstack'],
    status: 'production',
    businessImpact: [
      { metric: 'Conversion Rate', value: '+60%', description: 'Improved onboarding completion (40% → 85%)' },
      { metric: 'Time to Approval', value: 'Minutes', description: 'Down from 5+ days' },
      { metric: 'Manual Review', value: '-90%', description: 'Reduction in manual effort' },
      { metric: 'Compliance', value: '100%', description: 'Full regulatory adherence (OFAC, BSA/AML)' },
      { metric: 'Cost Savings', value: '70%', description: 'Reduced operational costs' }
    ],
    technicalHighlights: [
      'Parallel verification orchestration (13+ providers)',
      'Real-time decision engine with rule-based logic',
      'Complete audit trail system for compliance',
      'PII encryption at rest and in transit',
      'Automatic retries and fallback mechanisms',
      'Customer ID and account validation',
      'Biometric/fingerprint enrollment'
    ],
    keyFeatures: [
      'End-to-end automated KYC/AML workflow',
      'Multi-provider integration (Persona, Experian, TransUnion, ChexSystems)',
      'Real-time compliance screening (OFAC, PEP, Adverse Media)',
      'Application state persistence (resume capability)',
      'Multi-applicant joint account support',
      'Complete digital audit trail'
    ],
    challenges: [
      'Orchestrating 13+ third-party verification providers',
      'Handling API failures and implementing fallback strategies',
      'Real-time decision engine with complex rule logic',
      'PII data encryption and secure storage',
      'Multi-applicant state management'
    ],
    architectureType: 'Orchestration Layer with Parallel Verification',
    architectureDiagram: {
      title: 'Parallel KYC Orchestration',
      description: 'Orchestrating 13+ concurrent verification calls for sub-minute approval.',
      nodes: [
        { id: 'web', label: 'Web/Mobile', type: 'app', x: 10, y: 50 },
        { id: ' orch', label: 'Orchestrator', type: 'service', x: 40, y: 50, subLabel: 'Node.js Logic' },
        { id: 'persona', label: 'Persona', type: 'external', x: 70, y: 20, subLabel: 'ID Check' },
        { id: 'experian', label: 'Experian', type: 'external', x: 70, y: 50, subLabel: 'Credit' },
        { id: 'ofac', label: 'OFAC', type: 'external', x: 70, y: 80, subLabel: 'Watchlist' },
        { id: 'db', label: 'User DB', type: 'database', x: 90, y: 50 }
      ],
      flows: [
        { id: 'f1', source: 'web', target: ' orch', label: 'Submit KYC' },
        { id: 'f2', source: ' orch', target: 'persona', label: 'Check ID' },
        { id: 'f3', source: ' orch', target: 'experian', label: 'Check Credit' },
        { id: 'f4', source: ' orch', target: 'ofac', label: 'Screen' },
        { id: 'f5', source: ' orch', target: 'db', label: 'Save Profile' },
      ]
    }
  },

  // ====================
  // PAYMENTS & OBSERVABILITY
  // ====================
  {
    id: 'razorpay-observability',
    name: 'Payment Observability Platform',
    client: 'Leading Indian Payment Gateway',
    realClient: 'Razorpay',
    anonymizedClient: 'Leading Indian Payment Gateway',
    isNDA: false,
    description: 'Distributed tracing and observability platform for payment systems using Hypertrace integration and internal API monitoring (Razorpay Stat Ping)',
    problem: 'Difficulty in debugging payment issues across microservices, lack of visibility into service dependencies, and slow issue resolution',
    solution: 'Integrated Hypertrace for distributed tracing and built internal API monitoring service (Stat Ping) for real-time health checks and performance tracking',
    duration: 'Closed (Development phase)',
    teamSize: '3-4 engineers',
    capabilities: [
      'Hypertrace integration for distributed tracing',
      'Service dependency mapping',
      'Request flow visualization',
      'Razorpay Stat Ping service (internal API monitoring)',
      'Real-time health checks',
      'API response time tracking',
      'Error rate monitoring',
      'Service availability tracking',
      'End-to-end transaction tracing',
      'Microservices monitoring',
      'Performance bottleneck identification'
    ],
    technologies: ['Angular', 'React', 'Redux', 'SCSS', 'Golang', 'GraphQL', 'Hypertrace', 'SonarQube', 'Sentry', 'Cypress', 'Jest', 'Global Protect VPN'],
    workTypes: ['frontend', 'backend', 'fullstack'],
    status: 'production',
    businessImpact: [
      { metric: 'Issue Resolution', value: '-50%', description: 'Faster debugging with distributed tracing' },
      { metric: 'System Reliability', value: 'Improved', description: 'Real-time service tracking' },
      { metric: 'MTTR', value: '-40%', description: 'Mean Time to Resolve reduced' }
    ],
    technicalHighlights: [
      'Hypertrace for distributed tracing across microservices',
      'Custom Stat Ping service for internal API monitoring',
      'GraphQL API for unified data access',
      'SonarQube for code quality',
      'Sentry for error tracking',
      'Cypress and Jest for automated testing'
    ],
    keyFeatures: [
      'End-to-end distributed tracing',
      'Service dependency visualization',
      'Real-time API health monitoring',
      'Performance metrics dashboard'
    ],
    architectureType: 'Distributed Tracing with Hypertrace',
    architectureDiagram: {
      title: 'Distributed Payment Tracing',
      description: 'End-to-end visibility into payment lifecycle across microservices.',
      nodes: [
        { id: 'gw', label: 'Payment GW', type: 'gateway', x: 10, y: 50 },
        { id: 'svc1', label: 'Order Svc', type: 'service', x: 35, y: 30 },
        { id: 'svc2', label: 'Risk Svc', type: 'service', x: 35, y: 70 },
        { id: 'agent', label: 'Trace Agent', type: 'service', x: 60, y: 50, subLabel: 'Hypertrace' },
        { id: 'ui', label: 'Dashboard', type: 'app', x: 85, y: 50, subLabel: 'Analytics' },
      ],
      flows: [
        { id: 'f1', source: 'gw', target: 'agent', label: 'Span' },
        { id: 'f2', source: 'svc1', target: 'agent', label: 'Span' },
        { id: 'f3', source: 'svc2', target: 'agent', label: 'Span' },
        { id: 'f4', source: 'agent', target: 'ui', label: 'Visualize' },
      ]
    }
  },

  {
    id: 'hdfc-payment-gateway',
    name: 'Payment Gateway Orchestration',
    client: 'Major Indian Private Bank',
    realClient: 'HDFC Bank',
    anonymizedClient: 'Major Indian Private Bank',
    isNDA: true,
    description: 'Multi-gateway payment orchestration with smart routing, real-time fraud detection, and settlement automation',
    problem: 'Single payment gateway caused high failure rates (15%+), no cost optimization, and limited fraud detection',
    solution: 'Built payment orchestration platform with multiple gateways, smart routing based on cost/success rate, and AI-powered fraud detection',
    duration: '12+ months',
    teamSize: '4-5 engineers',
    capabilities: [
      'Multiple payment gateway integration',
      'Smart routing for cost optimization',
      'Real-time fraud detection',
      'PCI-DSS compliance',
      'Settlement automation',
      'Webhook handling',
      'Payment analytics'
    ],
    technologies: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'Kafka', 'Payment Gateway APIs', 'ML models'],
    workTypes: ['backend', 'ai-ml', 'architecture'],
    status: 'production',
    businessImpact: [
      { metric: 'Uptime', value: '99.9%', description: 'SLA achievement' },
      { metric: 'Payment Failures', value: '-40%', description: 'Through smart routing and failover' },
      { metric: 'Fraud Detection', value: '95%', description: 'AI-powered detection rate' },
      { metric: 'Response Time', value: '<100ms', description: 'Transaction processing' },
      { metric: 'Cost Savings', value: '25%', description: 'Optimized gateway routing' }
    ],
    technicalHighlights: [
      'Event-driven architecture with Kafka',
      'Circuit breaker pattern for gateway failover',
      'Real-time analytics pipeline',
      'Automated reconciliation with bank statements',
      'ML-based fraud scoring'
    ],
    architectureType: 'Payment Orchestration with Event-Driven Architecture',
    architectureDiagram: {
      title: 'Smart Payment Routing',
      description: 'AI-driven routing to optimal payment gateways based on success rates and cost.',
      nodes: [
        { id: 'req', label: 'Pay Req', type: 'app', x: 10, y: 50 },
        { id: 'router', label: 'Smart Router', type: 'service', x: 35, y: 50, subLabel: 'AI Model' },
        { id: 'gw1', label: 'HDFC GW', type: 'external', x: 65, y: 20 },
        { id: 'gw2', label: 'Razorpay', type: 'external', x: 65, y: 50 },
        { id: 'gw3', label: 'Stripe', type: 'external', x: 65, y: 80 },
        { id: 'kafka', label: 'Kafka', type: 'server', x: 90, y: 50, subLabel: 'Events' },
      ],
      flows: [
        { id: 'f1', source: 'req', target: 'router', label: 'Initiate' },
        { id: 'f2', source: 'router', target: 'gw1', label: 'Route A' },
        { id: 'f3', source: 'router', target: 'gw2', label: 'Route B' },
        { id: 'f4', source: 'router', target: 'kafka', label: 'Log Event' },
      ]
    }
  },

  // ====================
  // TRADING & WEALTH
  // ====================
  {
    id: 'bajaj-social-trading',
    name: 'Social Trading Discussion Platform',
    client: 'Bajaj',
    anonymizedClient: 'Major Financial Services Company',
    isNDA: true,
    description: 'A social engagement platform for traders to discuss market trends, share insights, and build communities. Note: This is a social discussion app, not a stock broker/trading execution platform.',
    problem: 'Traders lacked a dedicated, verified community space to discuss market strategies without noise, while the client wanted to increase user engagement metrics.',
    solution: 'Built a real-time social feed with "stock-tags" (cashtags), community groups, verified influencer profiles, and sentiment analysis widgets.',
    duration: '8+ months',
    teamSize: '3-4 engineers',
    capabilities: [
      'Real-time social feed (WebSocket)',
      'Cashtag ($STOCK) integration',
      'Community groups and moderation tools',
      'Influencer verification system',
      'Sentiment analysis visualization',
      'Deep linking to external trading apps',
      'Rich media sharing (Charts/Images)',
      'User reputation system',
      'Trending topics algorithm'
    ],
    technologies: ['React', 'PWA', 'WebSocket', 'PostgreSQL', 'Node.js', 'Market Data APIs'],
    workTypes: ['frontend', 'fullstack'],
    status: 'production',
    businessImpact: [
      { metric: 'Real-Time Access', value: 'Seamless', description: 'Low-latency trading' },
      { metric: 'Responsive Design', value: '100%', description: 'Works across all devices' },
      { metric: 'Installation', value: 'Not required', description: 'PWA accessible via browser' }
    ],
    technicalHighlights: [
      'Progressive Web App with offline capabilities',
      'Deep linking and intelligent back navigation',
      'Responsive design with breakpoint management',
      'Real-time WebSocket data streaming',
      'Change Request (CR) management workflow'
    ],
    keyFeatures: [
      'PWA with installability',
      'Real-time trading dashboard',
      'Responsive across devices',
      'Portfolio analytics'
    ],
    challenges: [
      'Complex navigation with deep linking',
      'Cross-device UI consistency',
      'Responsive design challenges',
      'Handling multiple change requests during development'
    ],
    architectureType: 'Progressive Web App with Real-Time Data'
  },

  // ====================
  // AI/ML & R&D
  // ====================
  {
    id: 'nlq-sql-analytics',
    name: 'Natural Language to SQL Analytics',
    client: 'Internal R&D',
    anonymizedClient: 'Internal Innovation Project',
    isNDA: false,
    description: 'AI-powered platform converting natural language queries to SQL for business intelligence, democratizing data access across organization',
    problem: 'Non-technical business users unable to access data, creating bottleneck on engineering team for query requests',
    solution: 'Built NLQ-to-SQL system using LLM, vector embeddings, and schema understanding to generate SQL from natural language',
    duration: 'POC - 3 months',
    teamSize: '2 ML engineers',
    capabilities: [
      'NLP to SQL conversion',
      'Schema understanding and context awareness',
      'Query optimization',
      'Role-based access control',
      'Multi-database support (PostgreSQL, MySQL)',
      'Query result validation',
      'Natural language result explanation'
    ],
    technologies: ['Python', 'LLM (OpenAI/Open-source)', 'PostgreSQL', 'Vector Embeddings', 'FastAPI', 'React (Frontend)'],
    workTypes: ['ai-ml', 'backend'],
    status: 'poc',
    businessImpact: [
      { metric: 'Data Access', value: '100%', description: 'Democratized across organization' },
      { metric: 'Time to Insight', value: '-80%', description: 'Faster decision making' },
      { metric: 'Engineering Load', value: '-60%', description: 'Reduced query requests' }
    ],
    technicalHighlights: [
      'Fine-tuned transformer model for financial domain',
      'Context-aware SQL generation with schema understanding',
      'Query result validation and safety checks',
      'Audit logging for compliance',
      'Vector similarity search for schema context'
    ],
    architectureType: 'AI-Powered Analytics with LLM',
    architectureDiagram: {
      title: 'Natural Language to SQL',
      description: 'Converting English queries into optimized SQL for data retrieval.',
      nodes: [
        { id: 'user', label: 'User Question', type: 'user', x: 10, y: 50 },
        { id: 'llm', label: 'LLM Engine', type: 'cloud', x: 40, y: 50, subLabel: 'Transformer' },
        { id: 'vector', label: 'Vector DB', type: 'database', x: 40, y: 20, subLabel: 'Schema Ctx' },
        { id: 'db', label: 'Data Warehouse', type: 'database', x: 70, y: 50, subLabel: 'SQL Exec' },
        { id: 'ui', label: 'Result', type: 'app', x: 90, y: 50, subLabel: 'Chart' },
      ],
      flows: [
        { id: 'f1', source: 'user', target: 'llm', label: 'Ask' },
        { id: 'f2', source: 'llm', target: 'vector', label: 'Context' },
        { id: 'f3', source: 'llm', target: 'db', label: 'Gen SQL' },
        { id: 'f4', source: 'db', target: 'ui', label: 'Show Data' },
      ]
    }
  },

  {
    id: 'fraud-detection-h2o',
    name: 'AI Fraud Detection Platform',
    client: 'Multiple Pilots',
    anonymizedClient: 'Internal Innovation Project',
    isNDA: false,
    description: 'Advanced fraud detection using h2o.ai AutoML with real-time transaction scoring, behavioral analysis, and continuous learning',
    problem: 'Traditional rule-based fraud detection systems have high false positive rates (20%+) and miss evolving fraud patterns',
    solution: 'Built ML-powered fraud detection with h2o.ai AutoML, 200+ behavioral features, and <100ms real-time scoring',
    duration: 'POC - 4 months',
    teamSize: '2 ML engineers',
    capabilities: [
      'Real-time transaction scoring (<100ms)',
      'Behavioral analysis with 200+ features',
      'Device fingerprinting',
      'Velocity checks (transaction frequency, amount)',
      'Continuous learning with AutoML',
      'Gradient Boosting & Deep Learning models',
      'Explainable AI (SHAP values)',
      'Feedback loop for model improvement'
    ],
    technologies: ['Python', 'h2o.ai AutoML', 'Redis', 'Kafka', 'PostgreSQL', 'FastAPI', 'React (Dashboard)'],
    workTypes: ['ai-ml', 'backend'],
    status: 'poc',
    businessImpact: [
      { metric: 'Fraud Detection', value: '95%+', description: 'Detection accuracy' },
      { metric: 'False Positives', value: '<2%', description: 'Minimal false blocks' },
      { metric: 'Decision Time', value: '<100ms', description: 'Real-time scoring' },
      { metric: 'Cost Savings', value: '60%', description: 'Reduced fraud losses' }
    ],
    technicalHighlights: [
      'h2o.ai AutoML for model selection and optimization',
      'Gradient Boosting and Deep Learning ensemble',
      '200+ behavioral features (device, location, velocity, patterns)',
      'Real-time inference with Redis caching',
      'Feedback loop for continuous model improvement',
      'Explainable AI for regulatory compliance'
    ],
    architectureType: 'Machine Learning Pipeline with AutoML',
    architectureDiagram: {
      title: 'Real-Time Fraud Detection',
      description: 'Sub-100ms fraud scoring using AutoML and behavioral features.',
      nodes: [
        { id: 'txn', label: 'Transaction', type: 'gateway', x: 10, y: 50 },
        { id: 'redis', label: 'Feature Store', type: 'database', x: 35, y: 20, subLabel: 'Redis' },
        { id: 'model', label: 'AutoML Model', type: 'service', x: 60, y: 50, subLabel: 'H2O.ai' },
        { id: 'act', label: 'Action', type: 'server', x: 85, y: 50, subLabel: 'Block/Allow' },
      ],
      flows: [
        { id: 'f1', source: 'txn', target: 'model', label: 'Score Req' },
        { id: 'f2', source: 'model', target: 'redis', label: 'Fetch Feat' },
        { id: 'f3', source: 'model', target: 'act', label: 'Decision' },
        { id: 'f4', source: 'act', target: 'txn', label: 'Response' },
      ]
    }
  },

  // ====================
  // REACT NATIVE NEW ARCHITECTURE
  // ====================
  {
    id: 'hdfc-react-native',
    name: 'React Native New Architecture Implementation',
    client: 'HDFC Bank',
    anonymizedClient: 'Major Indian Private Bank',
    isNDA: true,
    description: 'High-performance mobile banking app using React Native New Architecture with TurboModules and Fabric renderer',
    problem: 'Old React Native architecture had high native call latency (300ms+), causing performance issues and poor user experience',
    solution: 'Migrated to React Native New Architecture with TurboModules and Fabric, achieving 75% reduction in native call latency',
    duration: '12+ months',
    teamSize: '4-5 engineers',
    capabilities: [
      'TurboModules implementation for native features',
      'Fabric renderer integration',
      '75% reduction in native call latency',
      'Offline-first architecture with data sync',
      'Biometric authentication (Face ID/Touch ID)',
      'Custom native modules (Camera, QR Scanner, Security)',
      'Advanced security features (RASP, SIM binding)',
      'High app stability (<0.1% crash rate)'
    ],
    technologies: ['React Native', 'TypeScript', 'TurboModules', 'Fabric', 'Redux', 'React Query', 'JSI (JavaScript Interface)', 'C++ (Bridge)', 'Objective C', 'Java/Kotlin'],
    workTypes: ['frontend', 'architecture'],
    status: 'production',
    businessImpact: [
      { metric: 'Performance', value: '+75%', description: 'Faster native calls (300ms → 75ms)' },
      { metric: 'User Rating', value: '4.5/5', description: 'App store rating' },
      { metric: 'Crash Rate', value: '<0.1%', description: 'High stability' },
      { metric: 'User Retention', value: '+30%', description: 'Improved due to performance' }
    ],
    technicalHighlights: [
      'React Native New Architecture (TurboModules + Fabric)',
      'Custom TurboModules for native features (QR Scanner, Biometrics, RASP)',
      'JSI (JavaScript Interface) for synchronous native calls',
      'Offline data synchronization with Redux Persist',
      'Advanced security (RASP, SIM binding, screenshot blocking)',
      'Modular architecture with separate repos'
    ],
    keyFeatures: [
      'High-performance native calls with TurboModules',
      'Custom native modules for complex features',
      'Offline-first with seamless sync',
      'Bank-grade security implementation'
    ],
    challenges: [
      'Migration from old to new architecture',
      'Custom TurboModule development for iOS and Android',
      'Performance optimization for heavy banking operations',
      'Backward compatibility during transition'
    ],
    architectureType: 'React Native New Architecture with Custom TurboModules',
    architectureDiagram: {
      title: 'New Architecture (Fabric/Turbo)',
      description: 'JSI-based synchronous bridge eliminating serialization overhead.',
      nodes: [
        { id: 'js', label: 'JS Realm', type: 'app', x: 20, y: 50, subLabel: 'React' },
        { id: 'jsi', label: 'JSI Bridge', type: 'service', x: 50, y: 50, subLabel: 'C++ Host' },
        { id: 'native', label: 'Native Mod', type: 'legacy', x: 80, y: 50, subLabel: 'ObjC/Java' },
      ],
      flows: [
        { id: 'f1', source: 'js', target: 'jsi', label: 'Sync Call' },
        { id: 'f2', source: 'jsi', target: 'native', label: 'Direct Access' },
        { id: 'f3', source: 'native', target: 'js', label: 'Result' },
      ]
    }
  },
  // ====================
  // LENDING & BNPL
  // ====================
  {
    id: 'education-financing',
    name: 'Education Financing Platform',
    client: 'Leading Education Lender',
    realClient: 'EFG (Education Finance Group)',
    anonymizedClient: 'Leading Education Lender',
    isNDA: true,
    description: 'Digital lending platform for education financing with flexible schemes (Short-term MOM, Long-term Golden) and automated disbursement',
    problem: 'Manual loan processing for education fees was slow, lacked flexibility for different parent needs, and had high operational overhead',
    solution: 'Built a dedicated education loan platform with specialized schemes, automated EMI calculations (compound/FIFO), and direct institution disbursement',
    duration: '12+ months',
    teamSize: '4-5 engineers',
    capabilities: [
      'MOM Scheme (6/9/12 month loans)',
      'Golden Scheme (3+ year loans with inflation adjustment)',
      'Digital disbursement to institutions',
      'Weighted Average EMI calculation',
      'eNACH integration for auto-debit',
      'Foreclosure and Moratorium management',
      'FIFO late fee logic'
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Java Spring Boot', 'AWS'],
    workTypes: ['fullstack', 'backend'],
    status: 'production',
    businessImpact: [
      { metric: 'Loan Processing', value: '4x Faster', description: 'Automated workflow' },
      { metric: 'Collection Efficiency', value: '+35%', description: 'via eNACH integration' }
    ],
    technicalHighlights: [
      'Complex interest calculation engine (Reducing balance, Inflation adjustment)',
      'Automated reconciliation with educational institutions'
    ],
    keyFeatures: [
      'Flexible loan tenures',
      'Inflation-adjusted long-term loans',
      'Transparent fee structure'
    ],
    challenges: [
      'Handling complex interest logic for different schemes',
      'Integrating with multiple school fee structures'
    ],
    architectureType: 'Microservices with Rule Engine',
    architectureDiagram: {
      title: 'Education Loan Workflow',
      description: 'End-to-end flow from application to direct fee disbursement.',
      nodes: [
        { id: 'parent', label: 'Parent', type: 'user', x: 10, y: 50 },
        { id: 'portal', label: 'Loan Portal', type: 'app', x: 30, y: 50 },
        { id: 'engine', label: 'Rule Engine', type: 'service', x: 55, y: 30, subLabel: 'Schemes' },
        { id: 'bank', label: 'Core Banking', type: 'legacy', x: 80, y: 50 },
        { id: 'school', label: 'School', type: 'external', x: 80, y: 80 },
      ],
      flows: [
        { id: 'f1', source: 'parent', target: 'portal', label: 'Apply' },
        { id: 'f2', source: 'portal', target: 'engine', label: 'Select Scheme' },
        { id: 'f3', source: 'engine', target: 'bank', label: 'Sanction' },
        { id: 'f4', source: 'bank', target: 'school', label: 'Disburse Fee' },
      ]
    }
  },
  {
    id: 'bnpl-integration',
    name: 'BNPL & Credit Line Integration',
    client: 'Major Fintech Lender',
    realClient: 'LazyPay',
    anonymizedClient: 'Major Fintech Lender',
    isNDA: true,
    description: 'Integration of Buy Now Pay Later (BNPL) services into bill payment ecosystems with real-time credit checks and settlement',
    problem: 'Need to offer credit line options for utility bill payments to increase user retention and transaction volume',
    solution: 'Integrated BNPL middleware (MBE) with real-time credit limit checks, transaction blocking/allowing, and automated repayment flows',
    duration: '6+ months',
    teamSize: '3 engineers',
    capabilities: [
      'Real-time credit limit check',
      'LazyPay payment option integration',
      'MBE Middleware integration',
      'Repayment scheduling',
      'Transaction settlement reconciliation'
    ],
    technologies: ['Node.js', 'REST APIs', 'PostgreSQL', 'Redis', 'MBE Integration'],
    workTypes: ['backend', 'integration'],
    status: 'production',
    businessImpact: [
      { metric: 'Transaction Vol', value: '+20%', description: 'Due to credit option' },
      { metric: 'User Retention', value: 'High', description: 'Sticky feature' }
    ],
    technicalHighlights: [
      'Low-latency credit check (<200ms)',
      'Robust error handling for third-party API failures'
    ],
    keyFeatures: [
      'One-tap BNPL payment',
      'Auto-repayment setup',
      'Credit usage dashboard'
    ],
    challenges: [
      'Handling timeout scenarios with third-party credit provider',
      'Ensuring transactional integrity'
    ],
    architectureType: 'Middleware Integration',
    architectureDiagram: {
      title: 'BNPL Transaction Flow',
      description: 'Real-time credit check and transaction authorization.',
      nodes: [
        { id: 'user', label: 'User', type: 'user', x: 10, y: 50 },
        { id: 'app', label: 'BillPay App', type: 'app', x: 30, y: 50 },
        { id: 'mbe', label: 'Orchestrator', type: 'service', x: 55, y: 50, subLabel: 'MBE' },
        { id: 'lp', label: 'LazyPay API', type: 'external', x: 80, y: 50, subLabel: 'Credit Provider' },
      ],
      flows: [
        { id: 'f1', source: 'user', target: 'app', label: 'Select BNPL' },
        { id: 'f2', source: 'app', target: 'mbe', label: 'Init Txn' },
        { id: 'f3', source: 'mbe', target: 'lp', label: 'Check Limit' },
        { id: 'f4', source: 'lp', target: 'mbe', label: 'Auth Token' },
        { id: 'f5', source: 'mbe', target: 'app', label: 'Success' },
      ]
    }
  }
];

// ============================================================================
// CAPABILITIES DATA - Organized by L1/L2/L3 taxonomy
// ============================================================================

export const capabilities: Capability[] = [
  // ====================
  // DIGITAL BANKING
  // ====================
  {
    id: 'digital-banking-cx-onboarding',
    l1: 'Digital Banking',
    l2: 'Customer Experience & Onboarding',
    l3: 'CX',
    title: 'Digital Onboarding & Multi-Factor Authentication',
    description: 'Secure user registration with SIM binding, biometric authentication, Net Banking/Debit Card verification, and seamless onboarding flows',
    projects: projects.filter(p => ['hdfc-registration-nli', 'tyfone-kyc-aml'].includes(p.id)),
    marketTrends: [
      'Zero-friction user registration',
      'Multi-device experience',
      'Biometric-first security',
      'Automated KYC/AML compliance'
    ],
    workTypes: ['frontend', 'fullstack']
  },
  {
    id: 'digital-banking-em-core',
    l1: 'Digital Banking',
    l2: 'Core Banking Modernization',
    l3: 'EM',
    title: 'Legacy System Modernization with Strangler Fig Pattern',
    description: 'Gradual migration from legacy core banking (OBP, FlexCube) to microservices with zero downtime and 56% latency reduction',
    projects: projects.filter(p => p.id === 'hdfc-core-banking'),
    marketTrends: [
      'Legacy system modernization',
      'Cloud-native architecture',
      'Microservices adoption',
      'Protocol modernization (SOAP → gRPC/REST)'
    ],
    workTypes: ['backend', 'architecture']
  },
  {
    id: 'digital-banking-cx-account',
    l1: 'Digital Banking',
    l2: 'Retail Banking Services',
    l3: 'CX',
    title: 'Account Management & PPF Services',
    description: 'Multi-account dashboard, PPF opening/linking, locker management, and real-time balance retrieval',
    projects: projects.filter(p => p.id === 'hdfc-account-management'),
    marketTrends: [
      'Self-service banking',
      'Digital-first experiences',
      'Reduced branch visits',
      'RBI-compliant digital services'
    ],
    workTypes: ['frontend', 'fullstack']
  },
  {
    id: 'digital-banking-pi-loans',
    l1: 'Digital Banking',
    l2: 'Loan Services & Credit',
    l3: 'PI',
    title: 'Digital Loan Management & Eligibility',
    description: 'Loan dashboard with EMI tracking, eligibility-based applications, and RBI-compliant digital lending',
    projects: projects.filter(p => p.id === 'hdfc-loans-module'),
    marketTrends: [
      'Digital lending ecosystems',
      'Eligibility-based offers',
      'RBI digital loan compliance',
      'Cross-selling opportunities'
    ],
    workTypes: ['frontend']
  },
  {
    id: 'digital-banking-pi-transfers',
    l1: 'Digital Banking',
    l2: 'Money Transfers & Payments',
    l3: 'PI',
    title: 'Multi-Mode Money Transfer (NEFT/RTGS/IMPS)',
    description: 'Comprehensive money transfer with transaction tracking and on-hold transaction management',
    projects: projects.filter(p => p.id === 'hdfc-money-transfer'),
    marketTrends: [
      'Real-time payment processing',
      'Transaction transparency',
      'Multi-mode transfer support'
    ],
    workTypes: ['backend', 'fullstack']
  },
  {
    id: 'digital-banking-cx-cards',
    l1: 'Digital Banking',
    l2: 'Credit Card Management',
    l3: 'CX',
    title: 'Unified Card Management with SmartEMI',
    description: 'Credit and debit card management including EMI tracking, SmartEMI conversion, fraud reporting, and RBAC',
    projects: projects.filter(p => p.id === 'hdfc-credit-card'),
    marketTrends: [
      'Unified card platforms',
      'Dynamic role-based permissions',
      'Real-time fraud detection',
      'SmartEMI for cross-selling'
    ],
    workTypes: ['frontend', 'backend', 'fullstack']
  },
  {
    id: 'digital-banking-pi-mobile',
    l1: 'Digital Banking',
    l2: 'Mobile Banking',
    l3: 'PI',
    title: 'React Native New Architecture for High Performance',
    description: 'Cutting-edge mobile banking with TurboModules, Fabric renderer, and 75% performance improvement',
    projects: projects.filter(p => p.id === 'hdfc-react-native'),
    marketTrends: [
      'Modern mobile architecture',
      'Performance-first development',
      'Native feature integration',
      'Offline-first capabilities'
    ],
    workTypes: ['frontend', 'architecture']
  },

  // ====================
  // DIGITAL PAYMENTS
  // ====================
  {
    id: 'digital-payments-pi-upi',
    l1: 'Digital Payments and Wallets',
    l2: 'UPI & Real-Time Payments',
    l3: 'PI',
    title: 'Comprehensive UPI Payment System with NPCI SDK',
    description: 'Full-featured UPI with registration, custom QR scanner, collect requests, mandates, and biometric UPI',
    projects: projects.filter(p => p.id === 'hdfc-upi-payment'),
    marketTrends: [
      'UPI as India\'s payment backbone',
      'Biometric UPI authentication',
      'QR-based payments',
      'Cross-border UPI (future)',
      'UPI Lite for small transactions'
    ],
    workTypes: ['frontend', 'backend', 'fullstack']
  },
  {
    id: 'digital-payments-pi-gateway',
    l1: 'Digital Payments and Wallets',
    l2: 'Payment Gateway & SDK',
    l3: 'PI',
    title: 'Payment Orchestration with Smart Routing',
    description: 'Multi-gateway payment orchestration with smart routing, fraud detection, and 99.9% uptime',
    projects: projects.filter(p => p.id === 'hdfc-payment-gateway'),
    marketTrends: [
      'Payment orchestration platforms',
      'Smart routing for cost optimization',
      'Event-driven architecture',
      'AI-powered fraud detection'
    ],
    workTypes: ['backend', 'ai-ml', 'architecture']
  },
  {
    id: 'digital-payments-em-observability',
    l1: 'Digital Payments and Wallets',
    l2: 'Payment Observability & Monitoring',
    l3: 'EM',
    title: 'Distributed Tracing for Payment Systems',
    description: 'Hypertrace and internal API monitoring for complete payment system observability',
    projects: projects.filter(p => p.id === 'razorpay-observability'),
    marketTrends: [
      'Distributed tracing',
      'Microservices observability',
      'Real-time monitoring',
      'Performance optimization'
    ],
    workTypes: ['frontend', 'backend', 'fullstack']
  },

  // ====================
  // REGTECH & COMPLIANCE
  // ====================
  {
    id: 'regtech-bpm-kyc',
    l1: 'RegTech and Compliance',
    l2: 'KYC/AML Automation',
    l3: 'BPM',
    title: 'Automated KYC/AML with Multi-Provider Integration',
    description: 'End-to-end KYC/AML automation with 13+ verification providers, reducing approval time from days to minutes',
    projects: projects.filter(p => p.id === 'tyfone-kyc-aml'),
    marketTrends: [
      'Automated identity verification',
      'Regulatory compliance automation',
      'Real-time screening (OFAC, PEP)',
      'Digital-first onboarding'
    ],
    workTypes: ['backend', 'fullstack']
  },
  {
    id: 'regtech-em-security',
    l1: 'RegTech and Compliance',
    l2: 'Application Security (RASP)',
    l3: 'EM',
    title: 'Runtime Application Self-Protection for Mobile Banking',
    description: 'RASP implementation with Lookout SDK, SIM swap detection, and sensitive data redaction',
    projects: projects.filter(p => p.id === 'hdfc-security-rasp'),
    marketTrends: [
      'Runtime application protection',
      'Device-level security',
      'Compliance-driven security (RBI mandates)',
      'Zero-trust architecture'
    ],
    workTypes: ['frontend', 'architecture']
  },
  {
    id: 'regtech-ai-fraud',
    l1: 'RegTech and Compliance',
    l2: 'Fraud Detection & Monitoring',
    l3: 'AI',
    title: 'AI-Powered Fraud Detection with h2o.ai',
    description: 'Real-time fraud scoring with 95%+ accuracy, <2% false positives, and continuous learning',
    projects: projects.filter(p => p.id === 'fraud-detection-h2o'),
    marketTrends: [
      'AI-driven fraud prevention',
      'Real-time scoring (<100ms)',
      'Explainable AI for compliance',
      'Continuous model improvement'
    ],
    workTypes: ['ai-ml', 'backend']
  },

  // ====================
  // TRADING & WEALTH
  // ====================
  {
    id: 'trading-pi-platform',
    l1: 'Trading and Wealth Platforms',
    l2: 'Investor Experience & Platforms',
    l3: 'PI',
    title: 'PWA Trading Platform with Real-Time Data',
    description: 'Progressive Web App for trading with real-time market data, order execution, and responsive design',
    projects: projects.filter(p => p.id === 'bajaj-trading-platform'),
    marketTrends: [
      'PWA for trading platforms',
      'Real-time data streaming',
      'Cross-device trading',
      'Low-latency execution'
    ],
    workTypes: ['frontend', 'fullstack']
  },
  {
    id: 'trading-ai-analytics',
    l1: 'Trading and Wealth Platforms',
    l2: 'Data & Analytics',
    l3: 'AI',
    title: 'Natural Language to SQL for Business Intelligence',
    description: 'AI-powered NLQ-to-SQL system democratizing data access with 80% faster insights',
    projects: projects.filter(p => p.id === 'nlq-sql-analytics'),
    marketTrends: [
      'Natural language interfaces',
      'Data democratization',
      'AI-powered analytics',
      'Self-service BI'
    ],
    workTypes: ['ai-ml', 'backend']
  },

  // ====================
  // OBSERVABILITY
  // ====================
  {
    id: 'observability-em-dynatrace',
    l1: 'Observability & Monitoring',
    l2: 'End-to-End Observability',
    l3: 'EM',
    title: 'Full-Stack APM with Dynatrace',
    description: 'Complete user journey tracking from frontend to database with 60% MTTR reduction',
    projects: projects.filter(p => p.id === 'hdfc-observability-dynatrace'),
    marketTrends: [
      'Application Performance Monitoring (APM)',
      'Full-stack observability',
      'User journey analytics',
      'Proactive issue detection'
    ],
    workTypes: ['architecture', 'fullstack']
  },
  {
    id: 'lending-bnpl-operations',
    l1: 'Lending & BNPL',
    l2: 'Lending & Credit Operations',
    l3: 'CX',
    title: 'Digital Lending & BNPL Integration',
    description: 'End-to-end digital lending platforms and real-time Buy Now Pay Later integrations for education and utility sectors',
    projects: projects.filter(p => ['education-financing', 'bnpl-integration', 'hdfc-loans-module'].includes(p.id)),
    marketTrends: [
      'Embedded Finance & BNPL',
      'Automated Loan Processing',
      'Alternative Credit Scoring',
      'Digital Disbursement'
    ],
    workTypes: ['fullstack', 'backend']
  }
];
