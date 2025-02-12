# Frontend Documentation

## Overview
This document provides an overview of the frontend architecture for the decentralized application (dApp). The frontend is built using Next.js with TypeScript, integrating Wagmi and RainbowKit for blockchain interactions. Tailwind CSS and ShadCN are used for styling and UI components.

## Tech Stack
- **Framework**: Next.js (React-based, SSR & SSG support)
- **Language**: TypeScript
- **Blockchain Integration**: Wagmi, RainbowKit
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN

## Folder Structure
```
/frontend
│── public/            # Static assets
│── src/
│   ├── components/    # Reusable UI components
│   ├── hooks/         # Custom React hooks
│   ├── pages/         # Next.js pages
│   ├── styles/        # Global styles
│   ├── utils/         # Helper functions
│   ├── context/       # Context providers
│   ├── services/      # API & blockchain interactions
│── next.config.js     # Next.js configuration
│── tailwind.config.js # Tailwind configuration
│── tsconfig.json      # TypeScript configuration
```

## Dependencies
Install dependencies with:
```sh
npm install next react wagmi rainbowkit ethers tailwindcss @shadcn/ui
```

## Blockchain Integration
### Setting up Wagmi & RainbowKit
```tsx
import { WagmiConfig, createClient, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

const { chains, provider } = configureChains([
  mainnet, sepolia
], [publicProvider()]);

const { connectors } = getDefaultWallets({ chains });
const client = createClient({ autoConnect: true, connectors, provider });

function App({ children }) {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
```

## Styling with Tailwind & ShadCN
### Tailwind Setup
Ensure Tailwind is set up in `tailwind.config.js`:
```js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### Using ShadCN Components
Example usage of a button component:
```tsx
import { Button } from '@shadcn/ui';

export default function Example() {
  return <Button>Click me</Button>;
}
```

## API & Blockchain Calls
All blockchain interactions should be handled in the `services/` folder:
```tsx
import { useContractWrite } from 'wagmi';
import contractABI from '../abis/contract.json';

const { write } = useContractWrite({
  address: '0xContractAddress',
  abi: contractABI,
  functionName: 'mintSample',
});

function MintButton() {
  return <button onClick={() => write()}>Mint</button>;
}
```

## Next Steps
- Implement authentication with WalletConnect
- Add server-side rendering optimizations
- Improve UI/UX with animations and state management

This document ensures a structured approach to building the frontend for the dApp. 🚀

