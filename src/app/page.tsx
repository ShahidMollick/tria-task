'use client';

import { useState, useEffect } from 'react';
import ContactList from '@/components/ContactList';
import SearchBar from '@/components/SearchBar';
import AddContactForm from '@/components/AddContactForm';
import ContactDetailPanel from '@/components/ContactDetailPanel';
import { Contact, CreateContactInput } from '@/types/contact';
import { contactService } from '@/services/contactService';
import { Button } from '@/components/ui/button';
import { Plus, Filter, LayoutList, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [displayedContacts, setDisplayedContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  // Load contacts on mount
  useEffect(() => {
    loadContacts();
  }, []);

  // Search contacts when query changes
  useEffect(() => {
    const searchContacts = async () => {
      if (!searchQuery.trim()) {
        setDisplayedContacts(contacts);
        return;
      }

      try {
        const results = await contactService.searchContacts(searchQuery);
        setDisplayedContacts(results);
      } catch (error) {
        console.error('Error searching contacts:', error);
      }
    };

    searchContacts();
  }, [searchQuery, contacts]);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const data = await contactService.getContacts();
      setContacts(data);
      setDisplayedContacts(data);
    } catch (error) {
      console.error('Error loading contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddContact = async (input: CreateContactInput) => {
    try {
      const newContact = await contactService.addContact(input);
      setContacts(prev => [newContact, ...prev]);
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding contact:', error);
      throw error;
    }
  };

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
  };

  const handleClosePanel = () => {
    setSelectedContact(null);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="mx-auto max-w-[1400px] px-6 py-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
              Contacts
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              {contacts.length.toLocaleString()} total
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="default" 
              className="bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md transition-all duration-200 ease-in-out"
            >
              Export
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Preferences</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Toolbar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800">
              <LayoutList className="h-4 w-4" />
              Table view
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800">
              Sort
            </Button>
          </div>
          <div className="flex-1 flex items-center gap-3 sm:ml-auto">
            <div className="flex-1 sm:max-w-xs">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Type to search..."
              />
            </div>
            <Button variant="outline" size="sm" className="gap-2 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              View settings
            </Button>
          </div>
        </div>

        {/* Contact List */}
        <ContactList
          contacts={displayedContacts}
          loading={loading}
          onContactClick={handleContactClick}
        />

        {/* Add Contact Form */}
        <AddContactForm
          open={showAddForm}
          onOpenChange={setShowAddForm}
          onSubmit={handleAddContact}
        />

        {/* Contact Detail Panel */}
        <ContactDetailPanel
          contact={selectedContact}
          isOpen={!!selectedContact}
          onClose={handleClosePanel}
        />

        {/* Floating Action Button */}
        <button
          onClick={() => setShowAddForm(true)}
          className="fixed bottom-8 right-8 h-14 w-14 rounded-full bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out flex items-center justify-center group"
          aria-label="Add contact"
        >
          <Plus className="h-6 w-6 transition-transform group-hover:rotate-90 duration-300 ease-in-out" />
        </button>
      </div>
    </div>
  );
}
