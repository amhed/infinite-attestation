'use client';

import { useAccount, useWriteContract, useSwitchChain } from 'wagmi';
import { base } from 'wagmi/chains';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';
import { INFINITE_ATTEST_ABI, INFINITE_ATTEST_ADDRESS } from '@/config/contracts';

export default function ComposeMessage() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState<string>('');
  const [txStatus, setTxStatus] = useState<'idle' | 'pending' | 'mining' | 'success' | 'error'>('idle');
  const account = useAccount();
  const { writeContract, data: txResponse } = useWriteContract();

  const connectAndSend = async () => {
    if (!message) {
      toast({
        title: 'Empty Message',
        description: 'Please enter a message to send.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setTxStatus('pending');

    console.log('txResponse', txResponse);

    try {
      await writeContract({
        address: INFINITE_ATTEST_ADDRESS,
        abi: INFINITE_ATTEST_ABI,
        functionName: 'attest',
        args: [message],
      });

      setTxStatus('mining');

      // toast({
      //   title: 'Transaction Sent',
      //   description: `Transaction hash: ${hash}`,
      // });

      setTxStatus('success');
      toast({
        title: 'Message Attested',
        description: 'Your message has been successfully attested on-chain.',
      });

      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
      setTxStatus('error');
      toast({
        title: 'Operation Failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compose Message</CardTitle>
        <CardDescription>
          {account.address ? `Connected: ${account.address}` : 'Connect your wallet to attest any message onchain.'}
        </CardDescription>
        <CardDescription>Chain Id: {account.chainId}</CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Type your message here"
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="min-h-[100px]"
        />
      </CardContent>
      <CardFooter>
        {account?.address && (
          <>
            <Button size="lg" onClick={connectAndSend} disabled={isLoading || txStatus === 'mining'}>
              {txStatus === 'mining'
                ? 'Confirming...'
                : txStatus === 'pending'
                  ? 'Confirm in Wallet...'
                  : 'Attest Message'}
            </Button>
            {txHash && (
              <a
                href={`https://sepolia.etherscan.io/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 text-sm text-blue-500 hover:underline"
              >
                View Transaction
              </a>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
}
