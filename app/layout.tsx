import Link from 'next/link';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 font-sans">
        <header className="bg-green-700 py-4 shadow-md">
          <nav className="max-w-7xl mx-auto flex justify-between items-center px-4">
            <div className="space-x-6">
              <Link href="/" className="text-white hover:text-gray-300">Home</Link>
              <Link href="/about" className="text-white hover:text-gray-300">About</Link>
              <Link href="/adoptions" className="text-white hover:text-gray-300">Adoptions</Link>
              <Link href="/contact" className="text-white hover:text-gray-300">Contact</Link>
            </div>
          </nav>
        </header>
        <main className="min-h-screen max-w-7xl mx-auto px-4 py-6">
          {children}
        </main>
        <footer className="bg-gray-800 text-white py-4 mt-12">
          Footer
        </footer>
      </body>
    </html>
  );
}