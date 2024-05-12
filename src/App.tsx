import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import { Dashboard } from '@/components/dashboard';
import { Login } from '@/components/login';
import { supabase } from '@/utils/supabase';

const PROVIDER = 'github';

export const App = () => {
  const [session, setSession] = useState<Session | null>(null);

  const onLoginClick = async () => {
    await supabase.auth.signInWithOAuth({
      provider: PROVIDER,
      options: {
        redirectTo: import.meta.env.VITE_ORIGIN_URL,
      },
    });
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session)
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Login onClick={onLoginClick} />
      </div>
    );

  return <Dashboard />;
};
