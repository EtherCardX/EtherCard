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

  // variables
  let inputMessage = "";
  let messageFromContract = "";
  let senderAddress: `0x${string}`;
  let receiverETH: string;
  let senderETH: string;
  let isScanning: boolean = false;
  let spinnerColour: string = "#FF0000";
  let items: Array<{ txHash: string; amount: string }> = [
    { txHash: "0x0", amount: "0" },
    { txHash: "0x0", amount: "0" },
    { txHash: "0x0", amount: "0" },
  ];

  formatEther;

  onMount(async () => {
    console.log("onMountt");
    const { address: receiverAddress } = getAccount();
    console.log("🚀 | onMount | receiverAddress: ", receiverAddress);
    senderAddress = receiverAddress ? receiverAddress : `0x${"0".repeat(40)}`;
    receiverETH = formatEther((await fetchBalance({ address: senderAddress })).value);
    senderETH = formatEther(
      (await fetchBalance({ address: receiverAddress ? receiverAddress : senderAddress })).value
    );
  });

  function loadWallet(pk: string): Wallet {
    return new ethers.Wallet(pk, getProvider());
  }

  // functions
  async function requestPayment() {
    console.log("requestPayment");
    isScanning = true;

    try {
      //@ts-ignore
      const ndef = new NDEFReader();
      await ndef.scan();
      //@ts-ignore
      ndef.addEventListener("reading", async ({ message, serialNumber }) => {
        spinnerColour = "#FFFF00";

        let records = message.records;
        records = records.filter((record: any) => {
          return record.mediaType === "application/json";
        });
        const textDecoder = new TextDecoder();
        const text = textDecoder.decode(records[0].data);
        const json = JSON.parse(text);

        const wallet = loadWallet(json.key);
        let tx;
        try {
          tx = await wallet.sendTransaction({
            to: senderAddress,
            value: ethers.utils.parseEther("1"),
          });
        } catch (error) {
          console.log("error: ", error);
        }

        // if tx is successful
        if (tx) {
          await tx.wait();
          isScanning = false;
          spinnerColour = "#FF0000";

          console.log("tx: ", tx);
          const { address: receiverAddress } = getAccount();
          receiverETH = formatEther((await fetchBalance({ address: senderAddress })).value);
          senderETH = formatEther(
            (await fetchBalance({ address: receiverAddress ? receiverAddress : senderAddress }))
              .value
          );
          alert("Success!");
        } else {
          console.log("tx failed");
        }
      });
    } catch (error) {
      console.log(`Error! Scan failed to start: ${error}.`);
    }
  }
</script>

<section>
  <container>
    <UserBalanceDisplay />
    <RequestInput />
    <RequestButton />
    <transaction-container>
      {#each items as item}
        <!-- content here -->
        <TransactionLine />
      {/each}
    </transaction-container>

    <!-- <div style="text-align: center">Send 1 ETH</div>
    <input
      type="text"
      bind:value={inputMessage}
      placeholder="Enter message to send to contract"
      style="width: 100%"
    /> -->
    <!-- <button on:click={sendMessageToContract}> Send</button> -->
    <!-- <div style="text-align: center">Message from contract: {messageFromContract}</div> -->
  </container>
  <!-- Current ETH: {receiverETH}
  <div style="text-align: center">Request 1 ETH</div>
  {#if isScanning}
    <Jumper color={spinnerColour} />
  {/if}
  <button on:click={requestPayment}> Request</button>
  walletAddress: {senderAddress} -->
</section>

<style>
  /* Auto layout */
  container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 24px 17px 191px;
    gap: 24px;
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
