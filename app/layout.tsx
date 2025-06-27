import './globals.css';
import Header from '../components/header';

export const metadata = {
  title: 'Task Manager',
  description: 'Track your tasks with ease',
};

import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 min-h-screen">
        <div className="min-h-screen flex flex-col">
          <Header /> {/* Only can see when logged in */}
          <main className="flex-1 max-w-4xl mx-auto p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
