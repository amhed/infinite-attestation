'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MessageFeed from '@/components/MessageFeed';
import ComposeMessage from '@/components/ComposeMessage';
import { Address, Avatar, EthBalance, Name } from '@coinbase/onchainkit/identity';
import { Identity } from '@coinbase/onchainkit/identity';
import { ConnectWallet, Wallet, WalletDropdown, WalletDropdownDisconnect } from '@coinbase/onchainkit/wallet';
import { useAccount } from 'wagmi';

export default function Home() {
  const account = useAccount();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Attestations</h1>
        <Wallet>
          <ConnectWallet className={account.isConnected ? '' : 'h-8'}>
            <Avatar className="h-6 w-6" />
            <Name />
          </ConnectWallet>
          <WalletDropdown>
            <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
              <Avatar />
              <Name />
              <Address />
              <EthBalance />
            </Identity>
            <WalletDropdownDisconnect />
          </WalletDropdown>
        </Wallet>
      </div>
      <Tabs defaultValue="feed">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="compose">Compose</TabsTrigger>
        </TabsList>
        <TabsContent value="feed">
          <MessageFeed />
        </TabsContent>
        <TabsContent value="compose">
          <ComposeMessage />
        </TabsContent>
      </Tabs>
    </div>
  );
}
