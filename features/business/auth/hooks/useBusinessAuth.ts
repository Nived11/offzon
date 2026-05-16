// features/business/auth/hooks/useBusinessAuth.ts
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { businessAuthAPI } from '@/features/business/auth/api/authService';
import { extractError } from '@/utils/errorHandler';

export const useBusinessAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const register = async (formData: any) => {
    setLoading(true); setError(null);
    try {
      await businessAuthAPI.register(formData);
      sessionStorage.setItem('verify_email', formData.email);
      router.replace(`/business/verify-otp?email=${formData.email}`); // Back അടിക്കാൻ പറ്റില്ല
    } catch (err) {
      setError(extractError(err));
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (email: string, otp: string) => {
    setLoading(true); setError(null);
    try {
      const data = await businessAuthAPI.verifyOtp({ email, otp });
      setSuccessMsg(data.message);
      sessionStorage.removeItem('verify_email'); // വെരിഫിക്കേഷൻ കഴിഞ്ഞാൽ പാസ്സ് ഡിലീറ്റ് ചെയ്യണം
      setTimeout(() => router.replace('/business/login'), 2000);
    } catch (err) {
      setError(extractError(err));
    } finally {
      setLoading(false);
    }
  };

  const login = async (formData: any) => {
    setLoading(true); setError(null);
    try {
      await businessAuthAPI.login(formData);
      router.replace('/business/dashboard'); 
    } catch (err) {
      setError(extractError(err));
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    setLoading(true); setError(null);
    try {
      await businessAuthAPI.forgotPassword({ email });
      // സെക്യൂരിറ്റി പാസ്സ് വയ്ക്കുന്നു
      sessionStorage.setItem('reset_email', email);
      router.replace(`/business/reset-password?email=${email}`); // Back അടിക്കാൻ പറ്റില്ല
    } catch (err) {
      setError(extractError(err));
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (formData: any) => {
    setLoading(true); setError(null);
    try {
      const data = await businessAuthAPI.resetPassword(formData);
      setSuccessMsg(data.message);
      sessionStorage.removeItem('reset_email'); // പാസ്‌വേഡ് മാറ്റി കഴിഞ്ഞാൽ പാസ്സ് ഡിലീറ്റ് ചെയ്യണം
      setTimeout(() => router.replace('/business/login'), 2000);
    } catch (err) {
      setError(extractError(err));
    } finally {
      setLoading(false);
    }
  };

  return { register, verifyOtp, login, forgotPassword, resetPassword, loading, error, successMsg };
};