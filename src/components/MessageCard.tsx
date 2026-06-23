'use client';

import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { X } from 'lucide-react';
import { Message } from '@/model/User';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { ApiResponse } from '@/types/ApiResponse';

type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

export function MessageCard({
  message,
  onMessageDelete,
}: MessageCardProps) {
  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete<ApiResponse>(
        `/api/delete-message/${message._id}`
      );

      toast.success(response.data.message);

      onMessageDelete(message._id);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      toast.error(
        axiosError.response?.data.message ??
          'Failed to delete message'
      );
    }
  };

  return (
    <Card className="group relative rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 bg-white">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-3">
          <CardTitle className="text-base font-semibold leading-snug text-gray-900 break-words">
            {message.content}
          </CardTitle>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="icon"
                variant="destructive"
                className="h-7 w-7 rounded-full shrink-0 opacity-80 group-hover:opacity-100 transition-opacity"
                aria-label="Delete message"
              >
                <X className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Delete this message?
                </AlertDialogTitle>

                <AlertDialogDescription>
                  This action can&apos;t be undone. The message will be
                  permanently removed.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>
                  Cancel
                </AlertDialogCancel>

                <AlertDialogAction onClick={handleDeleteConfirm}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="text-xs text-gray-500 mt-1">
          {dayjs(message.createdAt).format('MMM D, YYYY h:mm A')}
        </div>
      </CardHeader>

      <CardContent />
    </Card>
  );
}