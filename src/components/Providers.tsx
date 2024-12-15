'use client';

import { OnchainKitProvider } from '@coinbase/onchainkit';
import type { ReactNode } from 'react';
import { base } from 'wagmi/chains';

export function Providers(props: { children: ReactNode }) {
  return (
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
  );
}

// export function Providers(props: { children: ReactNode }) {
//   return <WagmiProvider config={wagmiConfig}>{props.children}</WagmiProvider>
// }
