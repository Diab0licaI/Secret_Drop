import './globals.css';
import AuthProvider from '@/context/AuthProvider';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'True Feedback',
  description: 'Anonymous messaging platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}