import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Send, Loader2, ChevronDown } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';

type ContactMessage = Tables<'contact_messages'>;

interface ReplyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  message: ContactMessage | null;
  onReplySent: () => void;
}

const ReplyDialog: React.FC<ReplyDialogProps> = ({
  isOpen,
  onClose,
  message,
  onReplySent
}) => {
  const [subject, setSubject] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [sending, setSending] = useState(false);

  // Auto-populate subject when message changes
  React.useEffect(() => {
    if (message) {
      setSubject(message.subject.startsWith('Re: ') ? message.subject : `Re: ${message.subject}`);
    }
  }, [message]);

  const handleSendReply = async () => {
    if (!message || !subject.trim() || !replyContent.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setSending(true);
    try {
      // Call the edge function to send the reply email
      const { error } = await supabase.functions.invoke('send-reply-email', {
        body: {
          to: message.email,
          toName: `${message.first_name} ${message.last_name}`,
          subject: subject,
          content: replyContent,
          originalMessage: {
            subject: message.subject,
            content: message.message,
            date: message.created_at
          }
        }
      });

      if (error) {
        console.error('Error sending reply:', error);
        toast.error('Failed to send reply');
        return;
      }

      // Update message status to replied
      const { error: updateError } = await supabase
        .from('contact_messages')
        .update({ 
          status: 'replied',
          updated_at: new Date().toISOString()
        })
        .eq('id', message.id);

      if (updateError) {
        console.error('Error updating message status:', updateError);
        // Don't return here as the email was sent successfully
      }

      toast.success('Reply sent successfully');
      onReplySent();
      onClose();
      
      // Reset form
      setSubject('');
      setReplyContent('');
    } catch (error: any) {
      console.error('Error sending reply:', error);
      const errorMessage = error.message?.includes('domain is not verified') 
        ? 'Email domain not verified. Please verify constantcap.com.gh in Resend settings.'
        : 'Failed to send reply. Please try again.';
      toast.error(errorMessage);
    } finally {
      setSending(false);
    }
  };

  const handleClose = () => {
    if (!sending) {
      onClose();
      setSubject('');
      setReplyContent('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl w-full mx-4 max-h-[95vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Reply to Message</DialogTitle>
          <DialogDescription>
            Send a reply to {message?.first_name} {message?.last_name} ({message?.email})
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              disabled={sending}
              className="w-full"
            />
          </div>
          
          <div>
            <Label htmlFor="content">Message</Label>
            <Textarea
              id="content"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Type your reply here..."
              rows={6}
              disabled={sending}
              className="w-full resize-none"
            />
          </div>

          {message && (
            <Collapsible defaultOpen={false} className="space-y-2">
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                <span className="font-medium text-sm">Original Message</span>
                <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="border rounded-lg p-4 bg-muted/20 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="font-medium text-muted-foreground">From:</span>
                    <p className="break-words">{message.first_name} {message.last_name}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Email:</span>
                    <p className="break-all">{message.email}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Date:</span>
                    <p>{message.created_at ? new Date(message.created_at).toLocaleDateString() : 'N/A'}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Subject:</span>
                    <p className="break-words">{message.subject}</p>
                  </div>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Message:</span>
                  <div className="mt-2 p-3 bg-background rounded border text-sm max-h-32 overflow-y-auto whitespace-pre-wrap">
                    {message.message}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>

        <DialogFooter className="flex-shrink-0 pt-4 border-t">
          <div className="flex flex-col sm:flex-row justify-end gap-2 w-full">
            <Button variant="outline" onClick={handleClose} disabled={sending} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button onClick={handleSendReply} disabled={sending || !subject.trim() || !replyContent.trim()} className="w-full sm:w-auto">
              {sending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Reply
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReplyDialog;