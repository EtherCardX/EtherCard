<script lang="ts">
  import BottomNav from "../components/BottomNav/BottomNav.svelte";
  import "@picocss/pico/css/pico.min.css";
  import { taiko, gnosis, mumbai, scroll_testnet } from "../domain/chain";
  import { ethereumClient, wagmiClient, web3Modal, providers } from "../stores";
  import { configureChains, createClient } from "@wagmi/core";
  import { sepolia, foundry } from "@wagmi/core/chains";
  import { EthereumClient, w3mConnectors } from "@web3modal/ethereum";
  import { Web3Modal } from "@web3modal/html";
  import { ethers } from "ethers";
  import { jsonRpcProvider } from "@wagmi/core/providers/jsonRpc";

  import circleProfile from "../public/images/circle-profile.svg";
  import SuccessModal from "../components/Modal/SuccessModal.svelte";

  const projectId = import.meta.env.VITE_WEB3MODAL_PROJECT_ID;
  let modalOpen = false;

  function toggleModal() {
    modalOpen = !modalOpen;
    console.log(modalOpen);
  }
  $providers = {
    [sepolia.id]: new ethers.providers.JsonRpcProvider("https://rpc.sepolia.org"),
    [taiko.id]: new ethers.providers.JsonRpcProvider("https://l2rpc.hackathon.taiko.xyz"),
    [foundry.id]: new ethers.providers.JsonRpcProvider("http://localhost:8545"),
    [gnosis.id]: new ethers.providers.JsonRpcProvider(gnosis.rpcUrls.default.http[0]),
    [mumbai.id]: new ethers.providers.JsonRpcProvider(mumbai.rpcUrls.default.http[0]),
    [scroll_testnet.id]: new ethers.providers.JsonRpcProvider(
      scroll_testnet.rpcUrls.default.http[0]
    ),
  };
  const { chains, provider } = configureChains(
    [sepolia, taiko, foundry, gnosis, mumbai, scroll_testnet],
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
  $web3Modal = new Web3Modal(
    {
      projectId,
      defaultChain: sepolia,
      themeVariables: {
        "--w3m-font-family": "Roboto, sans-serif",
        "--w3m-accent-color": "#7338BE",
      },
    },
    $ethereumClient
  );
</script>

<!-- Header -->
<header>
  <header-wrapper>
    EtherCard

    <img
      src={circleProfile}
      alt="circle-profile"
      on:click={toggleModal}
      on:keypress={toggleModal}
    />

    {#if modalOpen}
      <modal>
        <w3m-wrapper>
          <w3m-network-switch style="position: relative; right: 0px" />
          <w3m-core-button balance="hide" icon="hide" />
        </w3m-wrapper>
      </modal>
    {/if}
  </header-wrapper>
</header>

<main>
  <slot />
</main>

<footer><BottomNav /></footer>

<style>
  @font-face {
    font-family: "Figtree";
    src: url("../public/fonts/Figtree/Figtree-VariableFont_wght.ttf");
  }
  header {
    background: #ffffff;
    /* border: 10px solid #ffffff; */
  }
  header-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 64px;
    padding: 24px 16px 0px 16px;
    margin-bottom: -1px;
    background: #ffffff;

    color: #000000;
    font-family: "Figtree";
    font-size: 32px;
    font-weight: 800;
  }

  w3m-wrapper {
    display: flex;
    flex-direction: column;
    margin: auto;
    align-items: center;
    /* justify-content: space-between; */
    gap: 8px;
    padding: 16px;
  }

  modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    /* height: 500px; */
    background-color: #ffffff;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.25);
    display: flex;
    /* align-items: center;
    justify-content: center; */
    z-index: 1;
  }

  footer {
    height: auto;
    width: 100%;
    position: fixed;
    bottom: 0px;
    margin: 0px;
    background: #ffffff;
  }
  main {
    font-family: "Figtree";
    background: #ffffff;
    color: #000000;
    border: none;
  }
</style>
