import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export const AuthCallback: React.FC = () => {
  const { toast } = useToast();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    console.log(token)
    if (token) {
      localStorage.setItem('token', token);
      window.location.href = '/dashboard';
    } else {
      toast({
        title: "Authentication Error",
        description: "Failed to authenticate",
        variant: "destructive"
      });
    }
  }, []);

  return <div>Authenticating...</div>;
};