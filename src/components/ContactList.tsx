'use client';

import { Contact } from '@/types/contact';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreVertical, Edit, Trash2, Copy } from 'lucide-react';
import { useState } from 'react';

interface ContactListProps {
  contacts: Contact[];
  loading?: boolean;
  onContactClick?: (contact: Contact) => void;
}

export default function ContactList({ contacts, loading, onContactClick }: ContactListProps) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const toggleRowSelection = (id: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const toggleAllRows = () => {
    if (selectedRows.size === contacts.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(contacts.map(c => c.id)));
    }
  };
  if (loading) {
    return (
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-hidden shadow-sm">
        <div className="space-y-0">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-50 dark:bg-gray-900 h-16 border-b border-gray-100 dark:border-gray-800"></div>
          ))}
        </div>
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-16 text-center">
        <div className="mx-auto max-w-sm">
          <svg
            className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h3 className="mt-6 text-base font-medium text-gray-900 dark:text-gray-100">No contacts found</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Try adjusting your search or add a new contact to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-hidden shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/50 dark:bg-gray-900/50 hover:bg-gray-50/50 dark:hover:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
            <TableHead className="w-12 py-3">
              <input
                type="checkbox"
                checked={selectedRows.size === contacts.length && contacts.length > 0}
                onChange={toggleAllRows}
                className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-2 transition-all cursor-pointer"
              />
            </TableHead>
            <TableHead className="font-medium text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 py-3">
              Basic Info
            </TableHead>
            <TableHead className="font-medium text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Company
            </TableHead>
            <TableHead className="font-medium text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Lead Score
            </TableHead>
            <TableHead className="font-medium text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Phone
            </TableHead>
            <TableHead className="font-medium text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Tags
            </TableHead>
            <TableHead className="font-medium text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Created Date
            </TableHead>
            <TableHead className="w-12"></TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow
              key={contact.id}
              onMouseEnter={() => setHoveredRow(contact.id)}
              onMouseLeave={() => setHoveredRow(null)}
              className={`
                group border-b border-gray-100 dark:border-gray-800 last:border-0
                transition-all duration-200 ease-in-out
                ${selectedRows.has(contact.id) 
                  ? 'bg-blue-50/50 dark:bg-blue-950/20' 
                  : 'hover:bg-gray-50/80 dark:hover:bg-gray-900/50'
                }
                cursor-pointer
              `}
              onClick={() => onContactClick?.(contact)}
            >
              <TableCell className="py-4">
                <input
                  type="checkbox"
                  checked={selectedRows.has(contact.id)}
                  onChange={() => toggleRowSelection(contact.id)}
                  onClick={(e) => e.stopPropagation()}
                  className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-2 transition-all cursor-pointer"
                />
              </TableCell>
              <TableCell className="py-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 border border-gray-200 dark:border-gray-700">
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback className="bg-linear-to-br from-blue-500 to-purple-600 text-white text-xs font-semibold">
                      {contact.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm text-gray-900 dark:text-gray-100">
                      {contact.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {contact.email}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-4">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  {contact.company || '—'}
                </div>
              </TableCell>
              <TableCell className="py-4">
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {contact.leadScore || Math.floor(Math.random() * 200)}
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {contact.phone}
                </div>
              </TableCell>
              <TableCell className="py-4">
                <div className="flex flex-wrap gap-1.5">
                  {contact.tags?.slice(0, 3).map((tag, idx) => (
                    <Badge 
                      key={idx}
                      variant="secondary"
                      className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 border-0 transition-colors"
                    >
                      {tag}
                    </Badge>
                  )) || (
                    <>
                      <Badge variant="secondary" className="px-2 py-0.5 text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 border-0">
                        test tag
                      </Badge>
                      <Badge variant="secondary" className="px-2 py-0.5 text-xs bg-purple-50 text-purple-700 hover:bg-purple-100 border-0">
                        another tag
                      </Badge>
                    </>
                  )}
                </div>
              </TableCell>
              <TableCell className="py-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {contact.createdDate || '22 Jul 2016'}
                </div>
              </TableCell>
              <TableCell className="py-4">
                <div 
                  className={`
                    transition-opacity duration-200 ease-in-out
                    ${hoveredRow === contact.id ? 'opacity-100' : 'opacity-0'}
                  `}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </TableCell>
              <TableCell className="py-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem className="gap-2 cursor-pointer">
                      <Edit className="h-4 w-4" />
                      Edit Contact
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 cursor-pointer">
                      <Copy className="h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-red-600 focus:text-red-600 cursor-pointer">
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
