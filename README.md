# Full-Stack Ethereum DApp

This project combines a Next.js frontend with Foundry-managed smart contracts.

## Prerequisites

- Node.js 16+ and Yarn
- Foundry (forge, anvil, and cast)

## Project Structure

```
├── src/                # Next.js frontend source code
├── contracts/          # Solidity smart contracts
│   ├── src/           # Contract source files
│   ├── test/          # Contract test files
│   └── script/        # Contract deployment scripts
```

## Quick Start

1. Install frontend dependencies:
```bash
yarn install
```

2. Install Foundry dependencies:
```bash
cd contracts && forge install && cd ..
```

3. Start local blockchain:
```bash
anvil
```

4. In a new terminal, compile and deploy contracts:
```bash
cd contracts
forge build
forge script script/Counter.s.sol:CounterScript --rpc-url http://localhost:8545 --broadcast
```

5. Start the frontend:
```bash
yarn dev
```

Visit `http://localhost:3000` to see your app.

## Development

- Frontend: `yarn dev` - Starts Next.js development server
- Contracts: `forge test` - Runs contract tests
- Local blockchain: `anvil` - Starts local Ethereum node
