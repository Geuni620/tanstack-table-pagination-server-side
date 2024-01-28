import 'src/index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'sonner';
import { App } from 'src/App';
import { QueryProvider } from 'src/components/common/QueryProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryProvider>
      <Toaster />
      <App />
    </QueryProvider>
  </React.StrictMode>,
);
