'use client';

import { MessageCard } from '@/components/MessageCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Message } from '@/model/User';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { Copy, Loader2, MailQuestion, RefreshCcw } from 'lucide-react';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AcceptMessageSchema } from '@/schemas/acceptMessageSchema';
import { toast } from 'sonner';

function UserDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

    const handleDeleteMessage = (messageId: string) => {
     setMessages(
      messages.filter((message) => message._id.toString() !== messageId)
     );
   };
  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(AcceptMessageSchema),
    defaultValues: {
      acceptMessages: false,
     },
   });

  const { register, watch, setValue } = form;
  const acceptMessages = watch('acceptMessages');

  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true);

    try {
      const response = await axios.get<ApiResponse>('/api/accept-messages');

      setValue('acceptMessages', response.data.isAcceptingMessages);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      toast.error(
        axiosError.response?.data.message ?? 'Failed to fetch message settings'
      );
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(false);

      try {
        const response = await axios.get<ApiResponse>('/api/get-messages');

        setMessages(response.data.messages || []);

        if (refresh) {
          toast.success('Showing latest messages');
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;

        toast.error(
          axiosError.response?.data.message ?? 'Failed to fetch messages'
        );
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (!session || !session.user) return;

    fetchMessages();
    fetchAcceptMessages();
  }, [session, fetchAcceptMessages, fetchMessages]);

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>('/api/accept-messages', {
        acceptMessages: !acceptMessages,
      });

      setValue('acceptMessages', !acceptMessages);

      toast.success(response.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      toast.error(
        axiosError.response?.data.message ?? 'Failed to update message settings'
      );
    }
  };

  if (!session || !session.user) {
    return <div></div>;
  }

  const { username } = session.user as User;

  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success('Profile URL has been copied to clipboard.');
  };

  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 md:p-8 bg-white rounded-xl border border-gray-200 shadow-sm w-full max-w-6xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
        User Dashboard
      </h1>

      <div className="mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">
          Copy your unique link
        </h2>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="w-full p-2.5 text-sm border border-gray-200 rounded-md bg-gray-50 text-gray-600"
          />

          <Button onClick={copyToClipboard} className="shrink-0">
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <Switch
          {...register('acceptMessages')}
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading}
        />

        <span className="text-sm font-medium text-gray-700">
          Accept messages:{' '}
          <span className={acceptMessages ? 'text-green-600' : 'text-gray-500'}>
            {acceptMessages ? 'On' : 'Off'}
          </span>
        </span>
      </div>

      <Separator />

      <div className="flex items-center justify-between mt-6 mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Messages</h2>

        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            fetchMessages(true);
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCcw className="h-4 w-4" />
          )}
        </Button>
      </div>

      {messages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {messages.map((message) => (
            <MessageCard
              key={message._id}
              message={message}
              onMessageDelete={handleDeleteMessage}
            />
          ))}
        </div>
      ) : (
        <Card className="border-dashed border-gray-300 bg-gray-50/50">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <MailQuestion className="w-10 h-10 text-gray-400 mb-3" />
            <p className="text-sm font-medium text-gray-700">
              No messages yet
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Share your link to start receiving anonymous messages.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default UserDashboard;