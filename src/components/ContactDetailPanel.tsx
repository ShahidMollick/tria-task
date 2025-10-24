'use client';

import { Contact } from '@/types/contact';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Mail, Phone, Globe, Building2, Briefcase, Calendar, Tag, Edit, Trash2, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ContactDetailPanelProps {
  contact: Contact | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactDetailPanel({ contact, isOpen, onClose }: ContactDetailPanelProps) {
  if (!contact) return null;

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Customer': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Personal': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Employees': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-md transition-all duration-500 ease-out z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Side Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[520px] bg-white dark:bg-gray-950 shadow-2xl transform transition-all duration-500 ease-out z-50 border-l border-gray-200 dark:border-gray-800 ${
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
              Contact Details
            </h2>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 active:scale-95"
                  >
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 shadow-xl">
                  <DropdownMenuItem className="gap-2 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors duration-200">
                    <Edit className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span className="font-medium">Edit Contact</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 focus:bg-red-50 dark:focus:bg-red-950/30 focus:text-red-600 dark:focus:text-red-400 cursor-pointer transition-colors duration-200">
                    <Trash2 className="h-4 w-4" />
                    <span className="font-medium">Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-10 w-10 rounded-full hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 hover:scale-110 active:scale-95 hover:rotate-90"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {/* Profile Section */}
            <div className="px-8 py-10 border-b border-gray-200 dark:border-gray-800 bg-linear-to-b from-gray-50/50 to-transparent dark:from-gray-900/50">
              <div className="flex flex-col items-center text-center">
                <div className="relative group">
                  <Avatar className="h-28 w-28 border-4 border-white dark:border-gray-900 shadow-xl ring-2 ring-gray-200 dark:ring-gray-800 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl">
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback className="bg-linear-to-br from-blue-500 to-purple-600 text-white text-3xl font-bold">
                      {contact.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-emerald-500 dark:bg-emerald-400 border-4 border-white dark:border-gray-950 shadow-lg animate-pulse" />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                  {contact.name}
                </h3>
                {contact.role && (
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {contact.role}
                  </p>
                )}
                {contact.status && (
                  <Badge className={`mt-4 ${getStatusColor(contact.status)} border font-medium px-3 py-1 transition-all duration-300 hover:scale-105`}>
                    {contact.status}
                  </Badge>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="px-8 py-6 space-y-6">
              <div>
                <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-5 flex items-center gap-2">
                  <div className="h-1 w-8 bg-linear-to-r from-blue-500 to-transparent rounded-full" />
                  Contact Information
                </h4>
                <div className="space-y-3">
                  {/* Email */}
                  <div className="flex items-start gap-3 group cursor-pointer p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-all duration-300 hover:shadow-sm">
                    <div className="shrink-0 mt-0.5">
                      <div className="h-10 w-10 rounded-xl bg-linear-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm">
                        <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Email</p>
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 break-all group-hover:underline underline-offset-2"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3 group cursor-pointer p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-all duration-300 hover:shadow-sm">
                    <div className="shrink-0 mt-0.5">
                      <div className="h-10 w-10 rounded-xl bg-linear-to-br from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm">
                        <Phone className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Phone</p>
                      <a
                        href={`tel:${contact.phone}`}
                        className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200 group-hover:underline underline-offset-2"
                      >
                        {contact.phone}
                      </a>
                    </div>
                  </div>

                  {/* Website */}
                  {contact.website && (
                    <div className="flex items-start gap-3 group cursor-pointer p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-all duration-300 hover:shadow-sm">
                      <div className="shrink-0 mt-0.5">
                        <div className="h-10 w-10 rounded-xl bg-linear-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm">
                          <Globe className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Website</p>
                        <a
                          href={`https://${contact.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 break-all group-hover:underline underline-offset-2"
                        >
                          {contact.website}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Organization */}
              {(contact.company || contact.role) && (
                <div>
                  <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-5 flex items-center gap-2">
                    <div className="h-1 w-8 bg-linear-to-r from-purple-500 to-transparent rounded-full" />
                    Organization
                  </h4>
                  <div className="space-y-3">
                    {contact.company && (
                      <div className="flex items-start gap-3 group cursor-pointer p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-all duration-300 hover:shadow-sm">
                        <div className="shrink-0 mt-0.5">
                          <div className="h-10 w-10 rounded-xl bg-linear-to-br from-gray-50 to-gray-100/50 dark:from-gray-900 dark:to-gray-800/50 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm">
                            <Building2 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Company</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {contact.company}
                          </p>
                        </div>
                      </div>
                    )}

                    {contact.role && (
                      <div className="flex items-start gap-3 group cursor-pointer p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-all duration-300 hover:shadow-sm">
                        <div className="shrink-0 mt-0.5">
                          <div className="h-9 w-9 rounded-lg bg-gray-50 dark:bg-gray-900 flex items-center justify-center group-hover:bg-gray-100 dark:group-hover:bg-gray-800 transition-colors">
                            <Briefcase className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Role</p>
                          <p className="text-sm text-gray-900 dark:text-gray-100">
                            {contact.role}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Additional Information */}
              <div>
                <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
                  Additional Information
                </h4>
                <div className="space-y-4">
                  {/* Lead Score */}
                  <div className="flex items-start gap-3 group">
                    <div className="shrink-0 mt-0.5">
                      <div className="h-9 w-9 rounded-lg bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center group-hover:bg-amber-100 dark:group-hover:bg-amber-950/50 transition-colors">
                        <svg className="h-4 w-4 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Lead Score</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {contact.leadScore || Math.floor(Math.random() * 200)}
                      </p>
                    </div>
                  </div>

                  {/* Created Date */}
                  {contact.createdDate && (
                    <div className="flex items-start gap-3 group">
                      <div className="shrink-0 mt-0.5">
                        <div className="h-9 w-9 rounded-lg bg-gray-50 dark:bg-gray-900 flex items-center justify-center group-hover:bg-gray-100 dark:group-hover:bg-gray-800 transition-colors">
                          <Calendar className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Created Date</p>
                        <p className="text-sm text-gray-900 dark:text-gray-100">
                          {contact.createdDate}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  {contact.tags && contact.tags.length > 0 && (
                    <div className="flex items-start gap-3 group">
                      <div className="shrink-0 mt-0.5">
                        <div className="h-9 w-9 rounded-lg bg-gray-50 dark:bg-gray-900 flex items-center justify-center group-hover:bg-gray-100 dark:group-hover:bg-gray-800 transition-colors">
                          <Tag className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Tags</p>
                        <div className="flex flex-wrap gap-1.5">
                          {contact.tags.map((tag, idx) => (
                            <Badge 
                              key={idx}
                              variant="secondary"
                              className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 border-0 transition-colors"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
            <div className="flex gap-3">
              <Button 
                variant="default" 
                className="flex-1 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all duration-200"
              >
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
