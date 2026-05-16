import axiosInstance from '@/lib/axiosInstance'; 

export const businessAuthAPI = {
  register: async (data: any) => {
    const response = await axiosInstance.post('/auth/register', data); 
    return response.data;
  },
  verifyOtp: async (data: { email: string; otp: string }) => {
    const response = await axiosInstance.post('/auth/verify-otp', data);
    return response.data;
  },
  login: async (data: any) => {
    const response = await axiosInstance.post('/auth/business/login', data); 
    return response.data;
  },
  forgotPassword: async (data: { email: string }) => {
    const response = await axiosInstance.post('/auth/forgot-password', data);
    return response.data;
  },
  resetPassword: async (data: any) => {
    const response = await axiosInstance.post('/auth/reset-password', data);
    return response.data;
  }
};