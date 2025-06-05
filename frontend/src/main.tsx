import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { StoreProvider } from '@/store/store.provider';

import { App } from './app';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <StoreProvider>
        <App />
      </StoreProvider>
    </StrictMode>,
  );
}
