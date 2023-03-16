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
  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

  onMount(async () => {
    let { address: receiverAddress } = getAccount();
    receiverAddress = receiverAddress ? receiverAddress : ZERO_ADDRESS;
    console.log("🚀 | onMount | receiverAddress: ", receiverAddress);
    receiverETH = formatEther((await fetchBalance({ address: receiverAddress })).value);
    console.log("🚀 | onMount | receiverETH:", receiverETH);
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
    <UserBalanceDisplay amount={receiverETH} />
    <RequestInput />
    <RequestButton />
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
    gap: 24px;
    height: 100vh;
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
