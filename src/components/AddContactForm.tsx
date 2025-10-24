'use client';

import { useState } from 'react';
import { CreateContactInput } from '@/types/contact';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AddContactFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (contact: CreateContactInput) => Promise<void>;
}

export default function AddContactForm({ open, onOpenChange, onSubmit }: AddContactFormProps) {
  const [formData, setFormData] = useState<CreateContactInput>({
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    status: 'Customer',
    website: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CreateContactInput, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CreateContactInput, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        ...formData,
        company: formData.company?.trim() || undefined,
        role: formData.role?.trim() || undefined,
        website: formData.website?.trim() || undefined,
      });
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        role: '',
        status: 'Customer',
        website: '',
      });
      setErrors({});
      onOpenChange(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof CreateContactInput, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Contact</DialogTitle>
          <DialogDescription>
            Fill in the information below to add a new contact to your list.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Name field */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="John Doe"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
              </div>

              {/* Phone field */}
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone <span className="text-red-500">*</span>
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="(555) 123-4567"
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
              </div>
            </div>

            {/* Email field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="john.doe@example.com"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Company field */}
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium">
                  Company
                </label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  placeholder="Acme Corporation"
                />
              </div>

              {/* Role field */}
              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium">
                  Role
                </label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                  placeholder="Founder"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Status field */}
              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium">
                  Status
                </label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleChange('status', value as 'Customer' | 'Personal' | 'Employees')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Customer">Customer</SelectItem>
                    <SelectItem value="Personal">Personal</SelectItem>
                    <SelectItem value="Employees">Employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Website field */}
              <div className="space-y-2">
                <label htmlFor="website" className="text-sm font-medium">
                  Website
                </label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleChange('website', e.target.value)}
                  placeholder="example.com"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : 'Add Contact'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
