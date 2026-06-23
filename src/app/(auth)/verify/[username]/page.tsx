'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { verifySchema } from '@/schemas/verifySchema';

export default function VerifyAccount() {
  const router = useRouter();
  const params = useParams<{ username: string }>();

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      const response = await axios.post<ApiResponse>('/api/verify-code', {
        username: params.username,
        code: data.code,
      });

      toast.success(response.data.message);

      router.replace('/sign-in');
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      toast.error(
        axiosError.response?.data.message ??
          'An error occurred. Please try again.'
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0f172a] px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-xl">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-3 leading-tight">
            Verify Your Account
          </h1>

          <p className="text-gray-500">
            Enter the verification code sent to your email
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-[#0f172a] hover:bg-[#1e293b] text-white"
            >
              Verify
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}