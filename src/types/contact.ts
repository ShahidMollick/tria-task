export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  role?: string;
  status?: 'Customer' | 'Personal' | 'Employees';
  website?: string;
  access?: 'Everyone' | 'Only me';
  avatar?: string;
  leadScore?: number;
  tags?: string[];
  createdDate?: string;
}

export interface CreateContactInput {
  name: string;
  email: string;
  phone: string;
  company?: string;
  role?: string;
  status?: 'Customer' | 'Personal' | 'Employees';
  website?: string;
}
