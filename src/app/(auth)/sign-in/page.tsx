'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { signInSchema } from '@/schemas/signInSchema';

export default function SignInPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    if (result?.error) {
      if (result.error === 'CredentialsSignin') {
        toast.error('Incorrect username or password');
      } else {
        toast.error(result.error);
      }
      return;
    }

    if (result?.url) {
      toast.success('Login successful');
      router.replace('/dashboard');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0f172a] px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-xl">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-3 leading-tight">
            Welcome Back to True Feedback
          </h1>
          <p className="text-gray-500">
            Sign in to continue your secret conversations
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input type="password" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full bg-[#0f172a] hover:bg-[#1e293b] text-white" type="submit">
              Sign In
            </Button>
          </form>
        </Form>

        <div className="text-center pt-2">
          <p className="text-gray-700">
            Not a member yet?{' '}
            <Link
              href="/sign-up"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}