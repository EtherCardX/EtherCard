# EtherCard

## Stack

1. Hardhat
2. Svelte + wagmi-core

## Installation

1. Prerequisite
   1. Install `pnpm`:
Using npm: `npm install -g pnpm`
   1. Others: <https://pnpm.io/installation>

2. `pnpm i`
3. Set web3modal project id in `packages/app/.env` ([obtain a project id for web3modal](https://cloud.walletconnect.com/sign-in))

## Start the development environment

> You will have three development windows, start them all and source all .env files with `source .env && source packages/app/.env`.

1. Start local chain: `anvil -m $MNEMONIC`
2. Deploy the Foo contract: `forge script Deploy --broadcast --rpc-url $FOUNDRY && pnpm -F app wagmi`
3. Start app: `pnpm -F app dev`

## Faucet links

### Sepolia

- [Receive Ether on Sepolia](https://sepolia-faucet.pk910.de/)

### Taiko

- [Receive Ether on Taiko](https://l2faucet.hackathon.taiko.xyz/)