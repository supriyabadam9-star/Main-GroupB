import { useState, useEffect } from 'react';
import { adminData } from '../data/adminData';

export const useAdminStats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats(adminData);
    }, 500);
  }, []);

  return stats;
};