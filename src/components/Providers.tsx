'use client';

import { OnchainKitProvider } from '@coinbase/onchainkit';
import type { ReactNode } from 'react';
import { base, baseSepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { http, createConfig } from 'wagmi';

const queryClient = new QueryClient();

export const wagmiConfig = createConfig({
  chains: [base, baseSepolia],
  multiInjectedProviderDiscovery: false,
  ssr: true,
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});

export function Providers(props: { children: ReactNode }) {
  console.log('Providers, setting chain to ', base);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={base}
          config={{
            appearance: {
              name: 'Infinity.oo', // Displayed in modal header
              logo: '/images/infinity_notepad.png', // Displayed in modal header
              mode: 'auto', // 'light' | 'dark' | 'auto'
              theme: 'base',
            },
            wallet: {
              display: 'modal',
            },
          }}
        >
          {props.children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

// export function Providers(props: { children: ReactNode }) {
//   return <WagmiProvider config={wagmiConfig}>{props.children}</WagmiProvider>
// }
