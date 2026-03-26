
import React, { useState } from 'react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


interface LinkFormProps {
  onSubmit: (link: { title: string; url: string }) => void;
  initialData?: { title: string; url: string };
}


const LinkForm: React.FC<LinkFormProps> = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [url, setUrl] = useState(initialData?.url || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, url });
    setTitle('');
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Title</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Link title"
        />
      </div>
      <div>
        <Label>URL</Label>
        <Input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          placeholder="https://example.com"
        />
      </div>
      <Button type="submit">
        {initialData ? 'Update Link' : 'Add Link'}
      </Button>
    </form>
  );
};

export default LinkForm