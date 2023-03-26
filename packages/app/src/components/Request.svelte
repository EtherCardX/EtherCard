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
  import { foundry } from "@wagmi/core/chains";
  import { onMount } from "svelte";
  import { ethers, Wallet, BigNumber } from "ethers";
  import { formatEther, parseEther } from "ethers/lib/utils.js";
  import UserBalanceDisplay from "./Display/UserBalanceDisplay.svelte";
  import RequestInput from "./Input/RequestInput.svelte";
  import RequestButton from "./Button/RequestButton.svelte";
  import TransactionLine from "./Transaction/TransactionLine.svelte";
  import { amount, scanStatus } from "../stores";
  import { userETH, transactions } from "../stores";
  import { etherCardABI, etherCardAddress } from "../generated";
  import pako from "pako";

  import kaching from "../audio/kaching.mp3";
  import { scroll_testnet } from "../domain/chain";
  // variables
  let receiverAddress: `0x${string}`;
  let receiverETH: string;
  let inputAmount: number = 0;
  let audio: any;
  let PAYMASTER = import.meta.env.VITE_PAYMASTER;
  let _scanStatus: string;
  let items: Array<{ timestamp: string; amount: BigNumber }>;
  // let items: Array<{ timestamp: string; amount: BigNumber }> = [
  //   { timestamp: "1678953370", amount: parseEther("0.1") },
  //   { timestamp: "1679943370", amount: parseEther("0.2") },
  //   { timestamp: "1688933370", amount: parseEther("0.3") },
  // ];

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
  interface Proof {
    a: { X: BigNumber; Y: BigNumber };
    b: { X: [BigNumber, BigNumber]; Y: [BigNumber, BigNumber] };
    c: { X: BigNumber; Y: BigNumber };
  }
  // variables
  // let amount = "";
  let messageFromContract = "";
  // let proof: Proof = {
  //   a: {
  //     X: BigNumber.from(0x0fe45bd30c499f0aa5cb67879b66df200b6805f578965ef193f6df852f211c1c),
  //     Y: BigNumber.from(0x22dbc00882591e7269fda8a277483e26b39369451b1e76ef23e18c14f1025e93),
  //   },
  //   b: {
  //     X: [
  //       BigNumber.from(0x21fb3cabbf98991d2783219d5851300400c9057ef80be1c0482ad2f0bd30b946),
  //       BigNumber.from(0x27be7cc0f84fcdfe2722f77caad94940ac3d09ebe2935c1e7bb521eb08c6f8df),
  //     ],
  //     Y: [
  //       BigNumber.from(0x11a2b80b45ef08019bf2d163e89b36acbc96c05a9ef9d64768fa804cae5f37ad),
  //       BigNumber.from(0x06921f0aa38875ceabef76e03a0c8ccb63908dc75e95a9a7a9285d2d09bb889a),
  //     ],
  //   },
  //   c: {
  //     X: BigNumber.from(0x2d2959333a4d831a68304df8b842a9be4cebf5922eb726aa7251f511f1112437),
  //     Y: BigNumber.from(0x238a76759606eafbbb0193bd27ebe559d0532510006a91b7934dfecaf6631239),
  //   },
  // }; // In Production we will not be hardcoding this

  // gzipped proof
  let _proof =
    "eNoVkMkRADEIw1riCFc5QKD/Ejb7NYPHEuwcqcvQJ2IhU7rU3KJU7xJAqYOsmIfKLAbvy11oCbGxiW41gDtJ4Bhp7E1PMjvOQ1ocrHEE6111lnjQG88ikEww4RZ3Vm14BF4yf1lccUEGOAAdIDbrUIMNxykvLfyTK46S1Vg3rJ/tu0NGtGadeePEgWy+EFNDwdJvQ5UQToG3rt9FTKrXfR4cOGDU0kXl8SjW7OrQBsmYjavH1DcdTufIsuUFjYfwvLG7SU/W7OMETmjv55ID/LY91leSlkEul96mKvdIuhQSzJznOmOqM5wnuPxQRs3pqZUgmnpyM40EVxDfcKTDRuxpahIKOrlV9Ri4nsfHLBIXhN8LAGgGlgW/9ulcVUbi+ACBsotF";

  function ungzipProof(base64compressed: string): string {
    const str = atob(base64compressed);

    // Convert the string to an array of uint8
    const bytes = new Uint8Array(str.length);
    for (let i = 0; i < str.length; ++i) {
      bytes[i] = str.charCodeAt(i);
    }

    const decompressed = pako.inflate(bytes, { to: "string" });
    return decompressed;
  }

  function expandProof(concatenatedProof: string) {
    return {
      a: { X: "0x" + concatenatedProof.slice(0, 64), Y: "0x" + concatenatedProof.slice(64, 128) },
      b: {
        X: ["0x" + concatenatedProof.slice(128, 192), "0x" + concatenatedProof.slice(192, 256)],
        Y: ["0x" + concatenatedProof.slice(256, 320), "0x" + concatenatedProof.slice(320, 384)],
      },
      c: {
        X: "0x" + concatenatedProof.slice(384, 448),
        Y: "0x" + concatenatedProof.slice(448, 512),
      },
    };
  }

  // async function receiveETH() {
  //   const config = await prepareWriteContract({
  //     address: etherCardAddress[foundry.id],
  //     abi: etherCardABI,
  //     functionName: "transferTo",

  //     args: [
  //       "0x345B2978F0b2B0dB24c681AB476aB4faDA5a68b5",
  //       ethers.utils.parseEther(inputAmount.toString()),
  //       proof,
  //     ],
  //   });
  //   await writeContract(config);
  // }

  amount.subscribe((value) => {
    inputAmount = value;
  });

  scanStatus.subscribe(async (value) => {
    _scanStatus = value;
    // If scanning is true, then we want to start scanning
    if (value === "scanning") {
      await startScanning();
    } else if (value === "success") {
      // If scanning is false, then we want to stop scanning
      // await updateTransactionList();
    }
  });

  transactions.subscribe((value) => {
    items = value;
  });

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
          const wallet = loadWallet(PAYMASTER); // NOTE: In production, we will not be using the paymaster's private key in the frontend app
          await sendTransaction(wallet, json);
        },
        { once: true }
      );
    } catch (error) {
      console.log(`Error! Scan failed to start: ${error}.`);
    }
  }

  async function sendTransaction(wallet: Wallet, json: string) {
    // decode json

    let proof = ungzipProof(_proof);
    let expandedProof = expandProof(proof);
    console.log("🚀 | sendTransaction | proof:", proof);

    let tx;
    try {
      console.log("senderAddress:", wallet.address);
      console.log("receiverAddress:", receiverAddress);
      console.log("value:", inputAmount.toString());

      let contract = new ethers.Contract(etherCardAddress[scroll_testnet.id], etherCardABI, wallet);

      tx = await contract.transferTo(
        receiverAddress,
        ethers.utils.parseEther(inputAmount.toString()),
        expandedProof
      );
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
        console.log("🚀 | sendTransaction | items:", items);
        items.push({
          timestamp: Date.now().toString(),
          amount: parseEther(inputAmount.toString()),
        });
        transactions.set(items);
        audio.play();
      } catch (error) {
        console.log("tx error: ", error);
      }
    } else {
      console.log("tx failed");
    }
  }

  async function handleSimulateNFCTap() {
    console.log("simulating NFC Tap...");
    scanStatus.set("success");
    const wallet = loadWallet(PAYMASTER); // NOTE: In production, we will not be using the paymaster's private key in the frontend app
    await sendTransaction(wallet, _proof);
  }
</script>

<audio src={kaching} bind:this={audio} />

<section>
  <container>
    <UserBalanceDisplay amount={receiverETH} />
    <RequestInput />
    <RequestButton />
    {#if _scanStatus === "scanning"}
      <div style="border-bottom: 1px solid black" on:click={handleSimulateNFCTap}>
        Simulate NFC Tap
      </div>
    {/if}
    <transaction-title> Transactions: </transaction-title>
    <transaction-container>
      {#each items.reverse() as item}
        <!-- content here -->
        <TransactionLine amount={item.amount} timestamp={item.timestamp} />
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
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    display: flex;
    align-items: center;

    margin-top: 16px;
    width: 100%;
    border-width: 0px 0px 1px 0px;
    border-style: solid;
    border-color: #b7adad;
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
