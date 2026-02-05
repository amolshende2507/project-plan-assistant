import { useState, useEffect } from 'react';

const INITIAL_CREDITS = 3;

export function useCredits() {
  const [credits, setCredits] = useState(INITIAL_CREDITS);

  // 1. Load credits when the app starts
  useEffect(() => {
    const saved = localStorage.getItem('analyzer_credits');
    // If no saved data, default to 3. If saved, parse it.
    if (saved !== null) {
      setCredits(parseInt(saved));
    } else {
      localStorage.setItem('analyzer_credits', INITIAL_CREDITS.toString());
    }
  }, []);

  // 2. The function to spend a credit
  const spendCredit = (): boolean => {
    if (credits <= 0) {
      return false; // Transaction Failed: No money
    }

    const newBalance = credits - 1;
    setCredits(newBalance);
    localStorage.setItem('analyzer_credits', newBalance.toString());
    return true; // Transaction Success
  };

  // 3. (Optional) Function to reset (for testing)
  const addCredits = (amount: number) => {
     const newBalance = credits + amount;
     setCredits(newBalance);
     localStorage.setItem('analyzer_credits', newBalance.toString());
  };

  return { credits, spendCredit, addCredits };
}