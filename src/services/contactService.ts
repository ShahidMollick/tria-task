import { Contact, CreateContactInput } from '@/types/contact';

// Mock data - In a real application, this would be fetched from an API
let mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Albert Flores',
    email: 'albert@nexustrch.com',
    phone: '(229) 555-0109',
    company: 'Nexus Tech',
    role: 'Founder',
    status: 'Customer',
    website: 'nexustrch.com',
    access: 'Everyone',
    leadScore: 201,
    tags: ['test tag', 'another tag', 'a tag hey here'],
    createdDate: '22 Oct 2016',
    avatar: 'https://ui-avatars.com/api/?name=Albert+Flores&background=3b82f6&color=fff'
  },
  {
    id: '2',
    name: 'Jenny Wilson',
    email: 'jenny@codespark.com',
    phone: '(505) 555-0125',
    company: 'Code Spark',
    role: 'Sales Manager',
    status: 'Personal',
    website: 'codespark.com',
    access: 'Only me',
    leadScore: 123,
    tags: ['urgent', 'vip'],
    createdDate: '16 Oct 2016',
    avatar: 'https://ui-avatars.com/api/?name=Jenny+Wilson&background=f59e0b&color=fff'
  },
  {
    id: '3',
    name: 'Arlene McCoy',
    email: 'arlene@dstream.com',
    phone: '(480) 555-0103',
    company: 'Dstream',
    role: 'Data Analysis',
    status: 'Employees',
    website: 'dstream.com',
    access: 'Only me',
    leadScore: 33,
    tags: ['employee', 'tech'],
    createdDate: '22 Jul 2016',
    avatar: 'https://ui-avatars.com/api/?name=Arlene+McCoy&background=10b981&color=fff'
  },
  {
    id: '4',
    name: 'Bessie Cooper',
    email: 'bessie@innolab.com',
    phone: '(307) 555-0133',
    company: 'Inno Lab',
    role: 'Co Founder',
    status: 'Customer',
    website: 'innolab.com',
    access: 'Everyone',
    leadScore: 8,
    tags: ['startup', 'innovation'],
    createdDate: '31 Dec 2016',
    avatar: 'https://ui-avatars.com/api/?name=Bessie+Cooper&background=8b5cf6&color=fff'
  },
  {
    id: '5',
    name: 'Kristin Watson',
    email: 'kristin@cyshield.com',
    phone: '(704) 555-0127',
    company: 'CyShield',
    role: 'Founder',
    status: 'Customer',
    website: 'cyshield.com',
    access: 'Everyone',
    leadScore: 99,
    tags: ['security', 'enterprise'],
    createdDate: '31 Dec 2016',
    avatar: 'https://ui-avatars.com/api/?name=Kristin+Watson&background=ec4899&color=fff'
  },
  {
    id: '6',
    name: 'Michael Chen',
    email: 'michael@techvision.io',
    phone: '(415) 555-0198',
    company: 'TechVision',
    role: 'CTO',
    status: 'Customer',
    website: 'techvision.io',
    access: 'Everyone',
    leadScore: 187,
    tags: ['enterprise', 'tech lead'],
    createdDate: '15 Jan 2017',
    avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=06b6d4&color=fff'
  },
  {
    id: '7',
    name: 'Sarah Johnson',
    email: 'sarah@cloudnine.com',
    phone: '(212) 555-0142',
    company: 'CloudNine',
    role: 'Product Manager',
    status: 'Personal',
    website: 'cloudnine.com',
    access: 'Only me',
    leadScore: 156,
    tags: ['product', 'saas'],
    createdDate: '03 Feb 2017',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=ef4444&color=fff'
  },
  {
    id: '8',
    name: 'David Martinez',
    email: 'david@growthlab.co',
    phone: '(323) 555-0176',
    company: 'GrowthLab',
    role: 'Marketing Director',
    status: 'Customer',
    website: 'growthlab.co',
    access: 'Everyone',
    leadScore: 143,
    tags: ['marketing', 'growth'],
    createdDate: '18 Feb 2017',
    avatar: 'https://ui-avatars.com/api/?name=David+Martinez&background=f97316&color=fff'
  },
  {
    id: '9',
    name: 'Emily Rodriguez',
    email: 'emily@designstudio.com',
    phone: '(646) 555-0189',
    company: 'DesignStudio',
    role: 'Creative Director',
    status: 'Employees',
    website: 'designstudio.com',
    access: 'Only me',
    leadScore: 92,
    tags: ['design', 'creative'],
    createdDate: '25 Mar 2017',
    avatar: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=a855f7&color=fff'
  },
  {
    id: '10',
    name: 'Robert Taylor',
    email: 'robert@fintech.io',
    phone: '(917) 555-0134',
    company: 'FinTech Pro',
    role: 'CEO',
    status: 'Customer',
    website: 'fintech.io',
    access: 'Everyone',
    leadScore: 234,
    tags: ['finance', 'vip'],
    createdDate: '10 Apr 2017',
    avatar: 'https://ui-avatars.com/api/?name=Robert+Taylor&background=14b8a6&color=fff'
  },
  {
    id: '11',
    name: 'Lisa Anderson',
    email: 'lisa@datawise.com',
    phone: '(310) 555-0167',
    company: 'DataWise',
    role: 'Data Scientist',
    status: 'Employees',
    website: 'datawise.com',
    access: 'Only me',
    leadScore: 67,
    tags: ['data', 'analytics'],
    createdDate: '22 Apr 2017',
    avatar: 'https://ui-avatars.com/api/?name=Lisa+Anderson&background=84cc16&color=fff'
  },
  {
    id: '12',
    name: 'James Wilson',
    email: 'james@blockchain.dev',
    phone: '(650) 555-0145',
    company: 'BlockChain Dev',
    role: 'Lead Developer',
    status: 'Customer',
    website: 'blockchain.dev',
    access: 'Everyone',
    leadScore: 178,
    tags: ['blockchain', 'crypto'],
    createdDate: '05 May 2017',
    avatar: 'https://ui-avatars.com/api/?name=James+Wilson&background=6366f1&color=fff'
  },
  {
    id: '13',
    name: 'Maria Garcia',
    email: 'maria@socialboost.co',
    phone: '(424) 555-0192',
    company: 'SocialBoost',
    role: 'Social Media Manager',
    status: 'Personal',
    website: 'socialboost.co',
    access: 'Only me',
    leadScore: 88,
    tags: ['social', 'content'],
    createdDate: '17 May 2017',
    avatar: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=f43f5e&color=fff'
  },
  {
    id: '14',
    name: 'Christopher Lee',
    email: 'chris@aiventures.com',
    phone: '(408) 555-0183',
    company: 'AI Ventures',
    role: 'Research Scientist',
    status: 'Customer',
    website: 'aiventures.com',
    access: 'Everyone',
    leadScore: 198,
    tags: ['ai', 'research'],
    createdDate: '29 May 2017',
    avatar: 'https://ui-avatars.com/api/?name=Christopher+Lee&background=0ea5e9&color=fff'
  },
  {
    id: '15',
    name: 'Jessica Brown',
    email: 'jessica@ecomhub.com',
    phone: '(702) 555-0156',
    company: 'EcomHub',
    role: 'Operations Manager',
    status: 'Employees',
    website: 'ecomhub.com',
    access: 'Only me',
    leadScore: 112,
    tags: ['ecommerce', 'operations'],
    createdDate: '12 Jun 2017',
    avatar: 'https://ui-avatars.com/api/?name=Jessica+Brown&background=eab308&color=fff'
  },
  {
    id: '16',
    name: 'Daniel White',
    email: 'daniel@cybersec.io',
    phone: '(858) 555-0171',
    company: 'CyberSec',
    role: 'Security Analyst',
    status: 'Customer',
    website: 'cybersec.io',
    access: 'Everyone',
    leadScore: 145,
    tags: ['security', 'compliance'],
    createdDate: '24 Jun 2017',
    avatar: 'https://ui-avatars.com/api/?name=Daniel+White&background=7c3aed&color=fff'
  },
  {
    id: '17',
    name: 'Amanda Harris',
    email: 'amanda@healthtech.com',
    phone: '(619) 555-0188',
    company: 'HealthTech',
    role: 'Medical Director',
    status: 'Customer',
    website: 'healthtech.com',
    access: 'Everyone',
    leadScore: 167,
    tags: ['healthcare', 'medical'],
    createdDate: '08 Jul 2017',
    avatar: 'https://ui-avatars.com/api/?name=Amanda+Harris&background=22c55e&color=fff'
  },
  {
    id: '18',
    name: 'Kevin Martin',
    email: 'kevin@mobilefirst.io',
    phone: '(213) 555-0194',
    company: 'MobileFirst',
    role: 'Mobile Developer',
    status: 'Employees',
    website: 'mobilefirst.io',
    access: 'Only me',
    leadScore: 78,
    tags: ['mobile', 'ios'],
    createdDate: '19 Jul 2017',
    avatar: 'https://ui-avatars.com/api/?name=Kevin+Martin&background=3b82f6&color=fff'
  },
  {
    id: '19',
    name: 'Michelle Thompson',
    email: 'michelle@contentpro.com',
    phone: '(818) 555-0165',
    company: 'ContentPro',
    role: 'Content Strategist',
    status: 'Personal',
    website: 'contentpro.com',
    access: 'Only me',
    leadScore: 134,
    tags: ['content', 'strategy'],
    createdDate: '02 Aug 2017',
    avatar: 'https://ui-avatars.com/api/?name=Michelle+Thompson&background=f59e0b&color=fff'
  },
  {
    id: '20',
    name: 'Brian Moore',
    email: 'brian@devops.tech',
    phone: '(949) 555-0172',
    company: 'DevOps Tech',
    role: 'DevOps Engineer',
    status: 'Customer',
    website: 'devops.tech',
    access: 'Everyone',
    leadScore: 189,
    tags: ['devops', 'cloud'],
    createdDate: '15 Aug 2017',
    avatar: 'https://ui-avatars.com/api/?name=Brian+Moore&background=10b981&color=fff'
  },
  {
    id: '21',
    name: 'Nicole Jackson',
    email: 'nicole@brandify.co',
    phone: '(714) 555-0181',
    company: 'Brandify',
    role: 'Brand Manager',
    status: 'Customer',
    website: 'brandify.co',
    access: 'Everyone',
    leadScore: 156,
    tags: ['branding', 'marketing'],
    createdDate: '27 Aug 2017',
    avatar: 'https://ui-avatars.com/api/?name=Nicole+Jackson&background=8b5cf6&color=fff'
  },
  {
    id: '22',
    name: 'Ryan Thomas',
    email: 'ryan@saasbuilder.com',
    phone: '(562) 555-0196',
    company: 'SaaSBuilder',
    role: 'Product Lead',
    status: 'Employees',
    website: 'saasbuilder.com',
    access: 'Only me',
    leadScore: 98,
    tags: ['saas', 'product'],
    createdDate: '09 Sep 2017',
    avatar: 'https://ui-avatars.com/api/?name=Ryan+Thomas&background=ec4899&color=fff'
  },
  {
    id: '23',
    name: 'Laura Lewis',
    email: 'laura@uxdesign.studio',
    phone: '(626) 555-0174',
    company: 'UX Design Studio',
    role: 'UX Designer',
    status: 'Personal',
    website: 'uxdesign.studio',
    access: 'Only me',
    leadScore: 124,
    tags: ['ux', 'design'],
    createdDate: '21 Sep 2017',
    avatar: 'https://ui-avatars.com/api/?name=Laura+Lewis&background=06b6d4&color=fff'
  },
  {
    id: '24',
    name: 'Steven Walker',
    email: 'steven@quantum.tech',
    phone: '(424) 555-0168',
    company: 'Quantum Tech',
    role: 'Quantum Engineer',
    status: 'Customer',
    website: 'quantum.tech',
    access: 'Everyone',
    leadScore: 212,
    tags: ['quantum', 'research'],
    createdDate: '04 Oct 2017',
    avatar: 'https://ui-avatars.com/api/?name=Steven+Walker&background=ef4444&color=fff'
  },
  {
    id: '25',
    name: 'Karen Hall',
    email: 'karen@greentech.io',
    phone: '(805) 555-0179',
    company: 'GreenTech',
    role: 'Sustainability Officer',
    status: 'Customer',
    website: 'greentech.io',
    access: 'Everyone',
    leadScore: 143,
    tags: ['sustainability', 'green'],
    createdDate: '16 Oct 2017',
    avatar: 'https://ui-avatars.com/api/?name=Karen+Hall&background=f97316&color=fff'
  },
  {
    id: '26',
    name: 'Joseph Allen',
    email: 'joseph@robotics.ai',
    phone: '(951) 555-0186',
    company: 'Robotics AI',
    role: 'Robotics Engineer',
    status: 'Employees',
    website: 'robotics.ai',
    access: 'Only me',
    leadScore: 87,
    tags: ['robotics', 'automation'],
    createdDate: '28 Oct 2017',
    avatar: 'https://ui-avatars.com/api/?name=Joseph+Allen&background=a855f7&color=fff'
  },
  {
    id: '27',
    name: 'Patricia Young',
    email: 'patricia@edtech.com',
    phone: '(909) 555-0191',
    company: 'EdTech Plus',
    role: 'Education Director',
    status: 'Customer',
    website: 'edtech.com',
    access: 'Everyone',
    leadScore: 176,
    tags: ['education', 'learning'],
    createdDate: '10 Nov 2017',
    avatar: 'https://ui-avatars.com/api/?name=Patricia+Young&background=14b8a6&color=fff'
  },
  {
    id: '28',
    name: 'Thomas King',
    email: 'thomas@gamestudio.dev',
    phone: '(747) 555-0163',
    company: 'Game Studio',
    role: 'Game Developer',
    status: 'Personal',
    website: 'gamestudio.dev',
    access: 'Only me',
    leadScore: 109,
    tags: ['gaming', 'entertainment'],
    createdDate: '22 Nov 2017',
    avatar: 'https://ui-avatars.com/api/?name=Thomas+King&background=84cc16&color=fff'
  },
  {
    id: '29',
    name: 'Sandra Wright',
    email: 'sandra@legaltech.co',
    phone: '(661) 555-0197',
    company: 'LegalTech',
    role: 'Legal Counsel',
    status: 'Customer',
    website: 'legaltech.co',
    access: 'Everyone',
    leadScore: 154,
    tags: ['legal', 'compliance'],
    createdDate: '05 Dec 2017',
    avatar: 'https://ui-avatars.com/api/?name=Sandra+Wright&background=6366f1&color=fff'
  },
  {
    id: '30',
    name: 'Paul Scott',
    email: 'paul@traveltech.io',
    phone: '(530) 555-0184',
    company: 'TravelTech',
    role: 'Travel Consultant',
    status: 'Employees',
    website: 'traveltech.io',
    access: 'Only me',
    leadScore: 72,
    tags: ['travel', 'hospitality'],
    createdDate: '17 Dec 2017',
    avatar: 'https://ui-avatars.com/api/?name=Paul+Scott&background=f43f5e&color=fff'
  },
  {
    id: '31',
    name: 'Nancy Green',
    email: 'nancy@realestate.pro',
    phone: '(559) 555-0175',
    company: 'RealEstate Pro',
    role: 'Real Estate Agent',
    status: 'Customer',
    website: 'realestate.pro',
    access: 'Everyone',
    leadScore: 167,
    tags: ['realestate', 'property'],
    createdDate: '29 Dec 2017',
    avatar: 'https://ui-avatars.com/api/?name=Nancy+Green&background=0ea5e9&color=fff'
  },
  {
    id: '32',
    name: 'Mark Adams',
    email: 'mark@logistics.tech',
    phone: '(209) 555-0169',
    company: 'Logistics Tech',
    role: 'Supply Chain Manager',
    status: 'Customer',
    website: 'logistics.tech',
    access: 'Everyone',
    leadScore: 138,
    tags: ['logistics', 'supply chain'],
    createdDate: '11 Jan 2018',
    avatar: 'https://ui-avatars.com/api/?name=Mark+Adams&background=eab308&color=fff'
  },
  {
    id: '33',
    name: 'Betty Baker',
    email: 'betty@fashion.design',
    phone: '(831) 555-0193',
    company: 'Fashion Design',
    role: 'Fashion Designer',
    status: 'Personal',
    website: 'fashion.design',
    access: 'Only me',
    leadScore: 95,
    tags: ['fashion', 'design'],
    createdDate: '23 Jan 2018',
    avatar: 'https://ui-avatars.com/api/?name=Betty+Baker&background=7c3aed&color=fff'
  },
  {
    id: '34',
    name: 'George Nelson',
    email: 'george@autotech.ai',
    phone: '(916) 555-0177',
    company: 'AutoTech AI',
    role: 'Automotive Engineer',
    status: 'Customer',
    website: 'autotech.ai',
    access: 'Everyone',
    leadScore: 192,
    tags: ['automotive', 'ai'],
    createdDate: '05 Feb 2018',
    avatar: 'https://ui-avatars.com/api/?name=George+Nelson&background=22c55e&color=fff'
  },
  {
    id: '35',
    name: 'Dorothy Carter',
    email: 'dorothy@biotech.lab',
    phone: '(925) 555-0185',
    company: 'BioTech Lab',
    role: 'Research Director',
    status: 'Customer',
    website: 'biotech.lab',
    access: 'Everyone',
    leadScore: 205,
    tags: ['biotech', 'research'],
    createdDate: '18 Feb 2018',
    avatar: 'https://ui-avatars.com/api/?name=Dorothy+Carter&background=3b82f6&color=fff'
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const contactService = {
  // Fetch all contacts
  async getContacts(): Promise<Contact[]> {
    await delay(500); // Simulate network delay
    return [...mockContacts];
  },

  // Search contacts by name
  async searchContacts(query: string): Promise<Contact[]> {
    await delay(300);
    const lowerQuery = query.toLowerCase().trim();
    
    if (!lowerQuery) {
      return [...mockContacts];
    }
    
    return mockContacts.filter(contact =>
      contact.name.toLowerCase().includes(lowerQuery)
    );
  },

  // Add a new contact
  async addContact(input: CreateContactInput): Promise<Contact> {
    await delay(400);
    
    const newContact: Contact = {
      id: Date.now().toString(),
      ...input,
      access: 'Everyone',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(input.name)}&background=6366f1&color=fff`
    };
    
    mockContacts = [newContact, ...mockContacts];
    return newContact;
  },

  // Get contact by ID (utility function)
  async getContactById(id: string): Promise<Contact | undefined> {
    await delay(200);
    return mockContacts.find(contact => contact.id === id);
  }
};
