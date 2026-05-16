export const extractError = (err: any): string => {
  if (err.response && err.response.data) {
    const data = err.response.data;
    if (data.error) return data.error;
    if (data.message) return data.message;
    if (data.detail) return data.detail;
    
    if (typeof data === "object") {
      const firstKey = Object.keys(data)[0];
      if (Array.isArray(data[firstKey])) {
        return data[firstKey][0];
      }
      return data[firstKey];
    }
  }
  return err.message || "Something went wrong. Please try again.";
};