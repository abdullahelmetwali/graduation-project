import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import App from '@/App.tsx';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster.tsx';
import { HistoryProvider } from './store/calculations-history';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HistoryProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <App />
          <Toaster />
        </ThemeProvider>
      </HistoryProvider>
    </QueryClientProvider>
  </StrictMode>,
)
