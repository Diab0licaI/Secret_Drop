'use client';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { User } from 'next-auth';

export default function Navbar() {
  const { data: session } = useSession();

  const user = session?.user as User | undefined;

  return (
    <nav className="px-4 md:px-8 py-4 bg-[#0f172a] text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
        <Link href="/" className="text-xl font-bold">
          True Feedback
        </Link>

        {session ? (
          <div className="flex flex-col md:flex-row items-center gap-4">
            <span className="text-sm md:text-base text-gray-200">
              Welcome, {user?.username || user?.email}
            </span>

            <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-200 hover:text-white transition-colors"
            >
              Dashboard
            </Link>

            <Button
              onClick={() => signOut()}
              variant="outline"
              size="sm"
              className="bg-white text-black hover:bg-gray-100"
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link href="/sign-in">
            <Button
              variant="outline"
              size="sm"
              className="bg-white text-black hover:bg-gray-100"
            >
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}