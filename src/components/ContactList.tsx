'use client';

import { Contact } from '@/types/contact';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
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
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-hidden shadow-lg dark:shadow-2xl">
        <div className="space-y-0">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-50 dark:bg-gray-900 h-16 border-b border-gray-100 dark:border-gray-800 last:border-0"></div>
          ))}
        </div>
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-16 text-center shadow-lg dark:shadow-2xl">
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
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-hidden shadow-lg dark:shadow-2xl transition-shadow duration-300 hover:shadow-xl dark:hover:shadow-3xl">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 hover:bg-gray-50/50 dark:hover:bg-gray-900/50">
            <TableHead className="w-12 py-4">
              <Checkbox
                checked={selectedRows.size === contacts.length && contacts.length > 0}
                onCheckedChange={toggleAllRows}
                aria-label="Select all"
                className="border-gray-300 dark:border-gray-700"
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
                transition-all duration-300 ease-in-out
                ${selectedRows.has(contact.id) 
                  ? 'bg-blue-50/60 dark:bg-blue-950/30 shadow-sm' 
                  : 'hover:bg-gray-50/90 dark:hover:bg-gray-900/60 hover:shadow-md'
                }
                cursor-pointer hover:scale-[1.01] active:scale-[0.99]
              `}
              onClick={() => onContactClick?.(contact)}
            >
              <td className="py-4">
                <Checkbox
                  checked={selectedRows.has(contact.id)}
                  onCheckedChange={() => toggleRowSelection(contact.id)}
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                  aria-label={`Select ${contact.name}`}
                  className="border-gray-300 dark:border-gray-700 data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-500 transition-all duration-200"
                />
              </td>
                            <td className="py-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border-2 border-gray-200 dark:border-gray-700 shadow-sm transition-transform duration-200 group-hover:scale-110">
                    <AvatarImage 
                      src={contact.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(contact.name)}&background=random`}
                      alt={contact.name}
                    />
                    <AvatarFallback className="bg-linear-to-br from-blue-500 to-purple-500 text-white font-semibold">
                      {contact.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                      {contact.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200">
                      {contact.email}
                    </span>
                  </div>
                </div>
              </td>
              <td className="py-4">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {contact.company || '—'}
                </div>
              </td>
              <td className="py-4">
                <div className="flex items-center gap-2">
                  <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 px-3 py-1.5 bg-linear-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-full border border-emerald-200 dark:border-emerald-800 shadow-sm transition-all duration-200 group-hover:shadow-md">
                    {contact.leadScore || Math.floor(Math.random() * 200)}
                  </div>
                </div>
              </td>
              <td className="py-4">
                <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                  {contact.phone}
                </div>
              </td>
              <td className="py-4">
                <div className="flex flex-wrap gap-1.5">
                  {contact.tags?.slice(0, 3).map((tag, idx) => (
                    <Badge 
                      key={idx}
                      variant="secondary"
                      className="px-2.5 py-1 text-xs font-medium bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 text-blue-700 dark:text-blue-300 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/40 dark:hover:to-indigo-900/40 border border-blue-200 dark:border-blue-800 transition-all duration-200 hover:scale-105"
                    >
                      {tag}
                    </Badge>
                  )) || (
                    <>
                      <Badge variant="secondary" className="px-2.5 py-1 text-xs font-medium bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 text-blue-700 dark:text-blue-300 hover:from-blue-100 hover:to-cyan-100 border border-blue-200 dark:border-blue-800 transition-all duration-200 hover:scale-105">
                        test tag
                      </Badge>
                      <Badge variant="secondary" className="px-2.5 py-1 text-xs font-medium bg-linear-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 text-purple-700 dark:text-purple-300 hover:from-purple-100 hover:to-pink-100 border border-purple-200 dark:border-purple-800 transition-all duration-200 hover:scale-105">
                        another tag
                      </Badge>
                    </>
                  )}
                </div>
              </td>
              <td className="py-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {contact.createdDate || '22 Jul 2016'}
                </div>
              </td>
              <td className="py-4">
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
              </td>
              <td className="py-4">
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
              </td>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
