<script lang="ts">
  // imports
  import {
    readContract,
    prepareWriteContract,
    writeContract,
    fetchBalance,
    getAccount,
    type FetchBalanceResult,
    getProvider,
  } from "@wagmi/core";
  import { fooABI, fooAddress } from "../generated";
  import { foundry } from "@wagmi/core/chains";
  import { onMount } from "svelte";
  import { ethers, Wallet, type BigNumber } from "ethers";
  import { formatEther } from "ethers/lib/utils.js";
  import { Jumper } from "svelte-loading-spinners";
  import UserBalanceDisplay from "./Display/UserBalanceDisplay.svelte";
  import RequestInput from "./Input/RequestInput.svelte";
  import RequestButton from "./Button/RequestButton.svelte";
  import TransactionLine from "./Transaction/TransactionLine.svelte";
  import { amount, scanStatus } from "../stores/stores";
  import { userETH } from "../stores/stores";

  // variables
  let senderAddress: `0x${string}`;
  let receiverAddress: `0x${string}`;
  let receiverETH: string;
  let senderETH: string;
  let isScanning: boolean = false;
  let spinnerColour: string = "#FF0000";
  let inputAmount: number = 0;

  let items: Array<{ txHash: string; amount: string }> = [
    { txHash: "0x0", amount: "0" },
    { txHash: "0x0", amount: "0" },
    { txHash: "0x0", amount: "0" },
  ];

  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

  onMount(async () => {
    let { address } = getAccount();
    receiverAddress = address ? address : ZERO_ADDRESS;
    console.log("🚀 | onMount | receiverAddress: ", receiverAddress);
    receiverETH = formatEther((await fetchBalance({ address: receiverAddress })).value);
    userETH.set(receiverETH);
  });

  function loadWallet(pk: string): Wallet {
    return new ethers.Wallet(pk, getProvider());
  }

  amount.subscribe((value) => {
    inputAmount = value;
  });

  scanStatus.subscribe(async (value) => {
    // If scanning is true, then we want to start scanning
    if (value === "scanning") {
      await startScanning();
    } else if (value === "success") {
      // If scanning is false, then we want to stop scanning
      // await updateTransactionList();
    }
  });

  // Get

  // functions
  async function startScanning() {
    try {
      //@ts-ignore
      const ndef = new NDEFReader();
      await ndef.scan();
      //@ts-ignore
      ndef.addEventListener(
        "reading",
        //@ts-ignore
        async ({ message, serialNumber }) => {
          let records = message.records;
          records = records.filter((record: any) => {
            return record.mediaType === "application/json";
          });
          const textDecoder = new TextDecoder();
          const text = textDecoder.decode(records[0].data);
          const json = JSON.parse(text);
          const wallet = loadWallet(json.key);
          await sendTransaction(wallet);
        },
        { once: true }
      );
    } catch (error) {
      console.log(`Error! Scan failed to start: ${error}.`);
    }
  }

  async function sendTransaction(wallet: Wallet) {
    let tx;
    try {
      console.log("senderAddress:", wallet.address);
      console.log("receiverAddress:", receiverAddress);
      console.log("value:", inputAmount.toString());

      tx = await wallet.sendTransaction({
        to: receiverAddress,
        value: ethers.utils.parseEther(inputAmount.toString()),
      });
      console.log(tx);
    } catch (error) {
      console.log("error: ", error);
    }

    // if tx is successful
    if (tx) {
      scanStatus.set("success");
      try {
        await tx.wait();
        receiverETH = formatEther((await fetchBalance({ address: receiverAddress })).value);
        scanStatus.set("normal");
        console.log(tx);
      } catch (error) {
        console.log("tx error: ", error);
      }
    } else {
      console.log("tx failed");
    }
  }
</script>

<section>
  <container>
    <UserBalanceDisplay amount={receiverETH} />
    <RequestInput />
    <RequestButton />
    <transaction-title> Transactions: </transaction-title>
    <transaction-container>
      {#each items as item}
        <!-- content here -->
        <TransactionLine />
      {/each}
    </transaction-container>
  </container>
</section>

<style>
  section {
    height: 100%;
  }

  /* Auto layout */
  container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 16px 16px;
    gap: 8px;
    height: 100vh;
    width: 100%;
  }

  transaction-title {
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    display: flex;
    align-items: center;

    margin-top: 16px;

    color: #ffffff;
  }
  transaction-container {
    /* Transaction Container */

    /* Auto layout */

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0px;

    width: 100%;
  }
</style>
