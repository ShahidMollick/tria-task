'use client';

import { useState, useEffect, useMemo } from 'react';
import ContactList from '@/components/ContactList';
import SearchBar from '@/components/SearchBar';
import AddContactForm from '@/components/AddContactForm';
import ContactDetailPanel from '@/components/ContactDetailPanel';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import Pagination from '@/components/Pagination';
import { Contact, CreateContactInput } from '@/types/contact';
import { contactService } from '@/services/contactService';
import { Button } from '@/components/ui/button';
import { Plus, Filter, LayoutList, MoreHorizontal, Settings2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Load contacts on mount
  useEffect(() => {
    loadContacts();
  }, []);

  // Filter contacts based on search query
  const filteredContacts = useMemo(() => {
    if (!searchQuery.trim()) {
      return contacts;
    }
    
    const query = searchQuery.toLowerCase();
    return contacts.filter(contact => 
      contact.name.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query) ||
      contact.company?.toLowerCase().includes(query) ||
      contact.phone.includes(query)
    );
  }, [searchQuery, contacts]);

  // Paginate filtered contacts
  const { paginatedContacts, totalPages } = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginated = filteredContacts.slice(startIndex, endIndex);
    const pages = Math.ceil(filteredContacts.length / itemsPerPage);
    
    return {
      paginatedContacts: paginated,
      totalPages: pages || 1
    };
  }, [filteredContacts, currentPage, itemsPerPage]);

  // Reset to page 1 when search query or items per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, itemsPerPage]);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const data = await contactService.getContacts();
      setContacts(data);
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
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-all duration-500">
      <div className="mx-auto max-w-[1400px] px-6 py-8">
        {/* Header */}
        <div className="mb-10 flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="space-y-1">
            <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-gray-900 via-purple-900 to-blue-900 dark:from-gray-100 dark:via-purple-100 dark:to-blue-100">
              Contacts
            </h1>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-2">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold">
                {filteredContacts.length}
              </span>
              {searchQuery ? (
                <span>
                  contacts found • {contacts.length} total
                </span>
              ) : (
                <span>contacts • Manage your network</span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeSwitcher />
            <Button 
              variant="default" 
              className="bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 ease-out font-semibold px-6 hover:scale-105 active:scale-95"
            >
              Export
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-10 w-10 rounded-xl border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm hover:shadow-md"
                >
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 shadow-xl">
                <DropdownMenuItem className="gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200">
                  <Settings2 className="h-4 w-4" />
                  <span className="font-medium">Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200">
                  <span className="font-medium">Preferences</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200">
                  <span className="font-medium">Import Contacts</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Enhanced Toolbar */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-top-6 duration-700 delay-100">
          <div className="flex items-center gap-2 flex-wrap">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 hover:border-purple-400 dark:hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/30 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md font-medium"
            >
              <LayoutList className="h-4 w-4" />
              Table view
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md font-medium"
            >
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 hover:border-cyan-400 dark:hover:border-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-950/30 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md font-medium"
            >
              Sort
            </Button>
          </div>
          <div className="flex-1 flex items-center gap-3 sm:ml-auto">
            <div className="flex-1 sm:max-w-sm">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Type to search..."
              />
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md font-medium"
            >
              <Settings2 className="h-4 w-4" />
              View settings
            </Button>
          </div>
        </div>

        {/* Contact List */}
        <div className="animate-in fade-in duration-700 delay-200">
          <ContactList
            contacts={paginatedContacts}
            loading={loading}
            onContactClick={handleContactClick}
          />
          
          {/* Pagination */}
          {!loading && filteredContacts.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredContacts.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          )}
        </div>

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
          className="fixed bottom-8 right-8 h-16 w-16 rounded-full bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(147,51,234,0.5)] transition-all duration-500 ease-out flex items-center justify-center group hover:scale-110 active:scale-95 ring-4 ring-purple-100 dark:ring-purple-900/30 hover:ring-8 hover:ring-purple-200 dark:hover:ring-purple-800/50"
          aria-label="Add contact"
        >
          <Plus className="h-7 w-7 transition-transform group-hover:rotate-180 duration-500 ease-out" />
        </button>
      </div>
    </div>
  );
}
