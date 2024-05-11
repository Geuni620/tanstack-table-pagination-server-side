import { createClient } from '@supabase/supabase-js';

import { Login } from '@/components/login';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPBASE_KEY,
);

export const App = () => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <Login />
    </div>
  );
};
