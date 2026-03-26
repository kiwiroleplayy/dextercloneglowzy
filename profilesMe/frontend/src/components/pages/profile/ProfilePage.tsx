import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import {
  Instagram,
  Youtube,
  Twitch,
  Github,
  Globe,
  Linkedin,
  Mail,
  X,
} from 'lucide-react';
import { toast } from 'react-toastify';
import { API_URL } from '@/services/api';
import logo from '../../../../public/p.png'
interface UserProfile {
  id: number;
  username: string;
  name: string;
  description: string | null;
  profilePicture: string | null;
  backgroundMedia: string | null;
  backgroundType: 'image' | 'video' | null;
  links: Array<{
    id: number;
    title: string;
    url: string;
  }>;
}

const getLinkIcon = (url: string) => {
  const domain = url.toLowerCase();
  if (domain.includes('x.com')) return X;
  if (domain.includes('instagram.com')) return Instagram;
  if (domain.includes('youtube.com')) return Youtube;
  if (domain.includes('twitch.tv')) return Twitch;
  if (domain.includes('github.com')) return Github;
  if (domain.includes('mailto:')) return Mail;
  if (domain.includes('linkedin')) return Linkedin;
  return Globe;
};

const ProfilePage: React.FC = () => {
  const navigate = useNavigate()
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [videoStatus , setVideoStatus] = useState("play here")


  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    document.title = `${username}`
    const fetchProfile = async () => {
      try {
        console.log('before fetchinggggg')
        const response = await fetch(`${API_URL}/users/${username}`);
        if (!response.ok) throw new Error('Profile not found');
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

   fetchProfile()
  }, [username]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-xl">Loading...</div>
    </div>
  );

  if (!profile) return (
    <div className="min-h-screen flex flex-col items-center justify-center">

      <div className="mb-4">
        <img src={logo} alt="Logo" className="w-16 h-16" />

      </div>
      <div className="text-xl text-white">Profile not found</div>
      <div className='mb-4'>
      <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-900"
          >
           {`> `} Create One?
          </button>
      </div>
    </div>
  );

  const { profilePicture, backgroundMedia, backgroundType, name, description, links } = profile;

  // Function to play or pause the video
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setVideoStatus("Pause Here")
      } else {
        setVideoStatus("Play Here")
        videoRef.current.pause();
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">

      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/10 animate-gradient" />

      {backgroundMedia && backgroundType === 'image' && (
        <div
          className="absolute inset-0 opacity-100 blur-sm"
          style={{
            backgroundImage: `url(${backgroundMedia})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}

      {backgroundMedia && backgroundType === 'video' && (
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            // muted
            className="absolute inset-0 w-full h-full object-cover opacity-1 blur-sm"
          >
            <source src={backgroundMedia} type="video/mp4" />
          </video>
          <button
            onClick={togglePlayPause}
            className="absolute top-4 right-4 z-10 bg-red-700 text-white px-4 py-2 rounded hover:bg-black/70 transition"
          >
            {videoStatus}
          </button>
        </div>
      )}

      <Card className="relative w-full max-w-md mx-4 bg-black/2 backdrop-blur-md border border-black/10 rounded-sm">
        <div className="p-8 flex flex-col items-center space-y-6">

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse blur-xl opacity-50" />
            <img
              src={profilePicture || '/p.png'}
              alt={name[0]?.toUpperCase()}
              className="relative w-24 h-24 rounded-full border-2 border-white/50 object-cover"
            />
          </div>

          {/* Profile Info */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-extrabold text-white">{name}</h1>
            {description && (
              <p className="text-sm text-gray-300 font-semibold max-w-xs">{description}</p>
            )}
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {links.map(link => {
              const IconComponent = getLinkIcon(link.url);
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                  <div className="relative p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {link.title}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
