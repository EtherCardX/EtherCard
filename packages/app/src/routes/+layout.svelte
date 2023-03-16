<script lang="ts">
  import BottomNav from "../components/BottomNav/BottomNav.svelte";
  import "@picocss/pico/css/pico.min.css";
  import { taiko } from "../domain/chain";
  import { ethereumClient, wagmiClient, web3Modal, providers } from "../stores";
  import { configureChains, createClient } from "@wagmi/core";
  import { sepolia, foundry } from "@wagmi/core/chains";
  import { EthereumClient, w3mConnectors } from "@web3modal/ethereum";
  import { Web3Modal } from "@web3modal/html";
  import { ethers } from "ethers";
  import { jsonRpcProvider } from "@wagmi/core/providers/jsonRpc";

  import logo from "../images/logo.svg";

  const projectId = import.meta.env.VITE_WEB3MODAL_PROJECT_ID;

  $providers = {
    [sepolia.id]: new ethers.providers.JsonRpcProvider("https://rpc.sepolia.org"),
    [taiko.id]: new ethers.providers.JsonRpcProvider("https://l2rpc.hackathon.taiko.xyz"),
    [foundry.id]: new ethers.providers.JsonRpcProvider("http://localhost:8545"),
  };
  const { chains, provider } = configureChains(
    [sepolia, taiko, foundry],
    [
      jsonRpcProvider({
        rpc: (chain) => ({ http: $providers[chain.id].connection.url }),
      }),
    ]
  );

  // @ts-ignore
  $wagmiClient = createClient({
    autoConnect: true,
    connectors: w3mConnectors({ chains, version: 1, projectId }),
    provider,
  });
  $ethereumClient = new EthereumClient($wagmiClient, chains);
  $web3Modal = new Web3Modal({ projectId, defaultChain: sepolia }, $ethereumClient);
</script>

<!-- Header -->
<header>
  <header-wrapper>
    LOGO
    <w3m-wrapper>
      <w3m-network-switch style="position: relative; right: 0px" />
      <w3m-core-button balance="hide" icon="hide" />
    </w3m-wrapper>
  </header-wrapper>
</header>

<main>
  <slot />
</main>

<footer><BottomNav /></footer>

<style>
  header {
    background: #354f52;
  }
  header-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0px;
    gap: 4px;
    width: 100%;
    height: 64px;
    margin: 0px;
    padding: 24px 24px 0px 24px;
    background: #354f52;
  }

  w3m-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  footer {
    height: auto;
    width: 100%;
    position: fixed;
    bottom: 0px;
    margin: 0px;
    background: #354f52;
  }
  main {
    background: #354f52;
  }
</style>
