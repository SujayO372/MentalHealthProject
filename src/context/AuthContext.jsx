import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('Guest');
  const [loading, setLoading] = useState(true);

  // Load user & username from Supabase on mount
  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setUser(data.session.user);
        fetchUsername(data.session.user.id);
      } else {
        setUser(null);
        setUsername('Guest');
      }
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        fetchUsername(session.user.id);
      } else {
        setUser(null);
        setUsername('Guest');
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const fetchUsername = async (userId) => {
    const { data, error } = await supabase
      .from('users')
      .select('username')
      .eq('auth_id', userId)
      .single();

    if (!error && data?.username) setUsername(data.username);
    else setUsername('Guest');
  };

  const value = {
    user,
    username,
    setUsername,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
