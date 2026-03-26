import React, { useState } from 'react';
import { SOCIAL_PLATFORMS } from './SocialLinkForm';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

interface LinkFormProps {
  initialLinks: Record<string, string>; // { [platformId]: url }
  onSubmit: (updatedLinks: Record<string, string>) => void;
}

const BulkLinkForm: React.FC<LinkFormProps> = ({ initialLinks, onSubmit }) => {
  const [links, setLinks] = useState<Record<string, string>>(initialLinks);
  const { toast } = useToast();

  const handleChange = (platformId: string, value: string) => {
    setLinks((prev) => ({
      ...prev,
      [platformId]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const hasEmptyFields = Object.values(links).some((url) => !url.trim());
    if (hasEmptyFields) {
      toast({
        title: 'Error',
        description: 'Please fill out all fields or remove unused platforms.',
        variant: 'destructive',
      });
      return;
    }

    onSubmit(links);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {SOCIAL_PLATFORMS.map((platform) => (
        <div key={platform.id} className="space-y-2">
          <label className="flex items-center space-x-2">
            <platform.icon className="h-5 w-5" />
            <span className="text-sm font-medium">{platform.name} URL</span>
          </label>
          <input
            type="url"
            value={links[platform.id] || ''}
            onChange={(e) => handleChange(platform.id, e.target.value)}
            placeholder={platform.placeholder}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>
      ))}

      <Button type="submit" className="w-full">
        Save All Links
      </Button>
    </form>
  );
};

export default BulkLinkForm;
