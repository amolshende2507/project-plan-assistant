import { useState, useEffect } from 'react';

// Get API URL from env (handling Vite's way)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function useCredits(userId?: string | null) {
  const [credits, setCredits] = useState(3);
  const [loading, setLoading] = useState(true);

  // 1. FETCH CREDITS (Hybrid Strategy)
  const fetchCredits = async () => {
    setLoading(true);
    
    if (userId) {
      // 🟢 LOGGED IN: Fetch from Real Database
      try {
        const res = await fetch(`${API_URL}/api/credits?userId=${userId}`);
        const data = await res.json();
        setCredits(data.credits);
      } catch (error) {
        console.error("Failed to fetch credits", error);
      }
    } else {
      // ⚪ GUEST: Fetch from LocalStorage
      const saved = localStorage.getItem('analyzer_credits');
      if (saved !== null) {
        setCredits(parseInt(saved));
      } else {
        setCredits(3); // Default Guest Limit
      }
    }
    setLoading(false);
  };

  // Run on mount or when userId changes
  useEffect(() => {
    fetchCredits();
  }, [userId]);

  // 2. SPEND CREDIT (Optimistic UI Update)
  // We decrement locally immediately for speed, backend validates later
  const spendCredit = () => {
    if (credits <= 0) return false;

    const newBalance = credits - 1;
    setCredits(newBalance);

    if (!userId) {
      // Only update localStorage if guest
      localStorage.setItem('analyzer_credits', newBalance.toString());
    }
    
    return true;
  };

  return { credits, spendCredit, refreshCredits: fetchCredits, loading };
}