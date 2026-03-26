
import React, { useState } from 'react';
import {
  User,
} from '../../../types';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';

interface ProfileSettingsProps {
  user: User;
  onUpdateProfile: (settings: FormData) => void;
}

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({ user, onUpdateProfile }) => {
  const [name, setName] = useState(user.name || '');
  const [description, setDescription] = useState(user.description || '');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [backgroundMedia, setBackgroundMedia] = useState<File | null>(null);
  const { toast } = useToast();

  // Handle file selection
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4'];
      const maxSize = 5 * 1024 * 1024;

      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a JPEG, PNG, or GIF image",
          variant: "destructive"
        });
        return;
      }

      if (file.size > maxSize) {
        toast({
          title: "File Too Large",
          description: "File must be smaller than 5MB",
          variant: "destructive"
        });
        return;
      }

      setFile(file);
    } else {
      setFile(null);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create FormData object to handle file uploads
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);

    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    if (backgroundMedia) {
      formData.append('backgroundMedia', backgroundMedia);
    }

    onUpdateProfile(formData);
  };
  // {console.log(name)}

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-x-white"
              placeholder="Your name"
            />
          </div>

          <div>
            <Label>Description</Label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full min-h-24 p-2 border rounded bg-black border-x-white"
              placeholder="Add a Bio"
            />
          </div>

          <div>
            <Label>Profile Picture</Label>
            <Input
              type="file"
              className='bg-gray-700'
              accept="image/jpeg,image/png,image/gif"
              onChange={(e) => handleFileChange(e, setProfilePicture)

              }
            />
            {profilePicture && (
              <p className="text-sm text-muted-foreground mt-2">
                <img src={URL.createObjectURL(profilePicture)}  className="mt-2 rounded-lg" />
                Selected: {profilePicture.name}
              </p>
            )}
          </div>

          <div>
  <Label>Background Media <span className='text-red-400'>{`image or video -(Max 5MB only)`}</span></Label>
  <Input
    type="file"
    className="bg-gray-700"
    accept="image/jpeg,image/png,image/gif,video/mp4"
    onChange={(e) => handleFileChange(e, setBackgroundMedia)}
  />
  {backgroundMedia && (
    <div className="text-sm text-muted-foreground mt-2">
      {backgroundMedia.type.startsWith("video/") ? (
        <>
          <p>Selected Video: {backgroundMedia.name}</p>
          <video
            className="mt-2 rounded-lg"
            src={URL.createObjectURL(backgroundMedia)}
            controls
            width="100%"
          />
        </>
      ) : (
        <>
          <p>Selected Image: {backgroundMedia.name}</p>
          <img
            className="mt-2 rounded-lg"
            src={URL.createObjectURL(backgroundMedia)}
            alt="Background Preview"
          />
        </>
      )}
    </div>
  )}
</div>


          <Button type="submit">Update Profile</Button>
        </form>
      </CardContent>
    </Card>
  );
};

