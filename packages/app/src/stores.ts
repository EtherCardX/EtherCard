import type { BigNumber, ethers } from "ethers";

import type { Client } from "@wagmi/core";
import type { EthereumClient } from "@web3modal/ethereum";
import type { Web3Modal } from "@web3modal/html";
import { writable } from "svelte/store";

export const ethereumClient = writable<EthereumClient>();
export const wagmiClient = writable<Client>();
export const web3Modal = writable<Web3Modal>();
export const providers = writable<{ [chainId: number]: ethers.providers.JsonRpcProvider }>();

export const amount = writable(0);
export const isScanning = writable(false);
export const scanStatus = writable("normal"); // normal, scanning, success
export const userETH = writable("");
export const transactions = writable<{ timestamp: string; amount: BigNumber; txHash: string }[]>(
  []
);
export const modalState = writable(true);
