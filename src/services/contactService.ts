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
