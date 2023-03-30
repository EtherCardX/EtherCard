<script lang="ts">
  import type { BigNumber } from "ethers";
  import { formatEther } from "ethers/lib/utils.js";
  /** A Modal that pops up when a transaction goes through successfully It displays the transaction
hash, amount received, and new balance */

  import success from "../../public/images/success.svg";
  import RequestAgainButton from "../Button/RequestAgainButton.svelte";

  export let balance = "0";
  export let latestItem: {
    amount: string | BigNumber;
    txHash: string;
    timestamp: string | BigNumber;
  } = {
    amount: "0",
    txHash: "-",
    timestamp: "0",
  };

  function formatTime(timestamp: string | BigNumber) {
    const date = new Date(Number(timestamp));
    return date.toLocaleTimeString("en-US");
  }
</script>

<container>
  <title> Transaction Confirmed </title>
  <success-icon-wrapper>
    <img src={success} alt="success" />
  </success-icon-wrapper>
  <line-item-container>
    <line-item-title>Balance</line-item-title>
    <line-item-value>{balance} ETH</line-item-value>
  </line-item-container>
  <line-item-container>
    <line-item-title>Amount Received</line-item-title>
    <line-item-value>{formatEther(latestItem.amount)} ETH</line-item-value>
  </line-item-container>
  <line-item-container>
    <line-item-title>Timestamp</line-item-title>
    <line-item-value>{formatTime(latestItem.timestamp)}</line-item-value>
  </line-item-container>
  <line-item-container>
    <line-item-title>Transaction Link</line-item-title>
    <line-item-value>
      <a href={`https://blockscout.scroll.io/tx/${latestItem.txHash}`}>link</a>
    </line-item-value>
  </line-item-container>
  <RequestAgainButton />
</container>

<style>
  /* your styles go here */

  container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    /* height: 500px; */
    background-color: #ffffff;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    padding: 16px;
    /* align-items: center;
    justify-content: center; */
    z-index: 1;
  }

  success-icon-wrapper {
    height: 100px;
    width: 100px;
    align-items: center;
    justify-content: center;
    margin: auto;
  }

  line-item-container {
    display: flex;
    flex-direction: column;
    padding-top: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid #b7adad;
  }

  line-item-title {
    font-style: italic;
    font-weight: 300;
    font-size: 16px;
    line-height: 22px;
    display: flex;
    align-items: center;
    margin-left: 16px;
  }

  line-item-value {
    font-style: italic;
    font-weight: 300;
    font-size: 20px;
    line-height: 27px;
    display: flex;
    align-items: center;
    margin-left: 16px;
  }
  title {
    width: auto;
    text-align: center;
    word-wrap: break-word;
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    display: flex;
    align-items: center;
    margin: 24px auto 24px auto;

    color: #000000;
  }
  input {
    width: 100%;
    height: 64px;
    background: #ffffff;
    border: 1px solid #b7adad;
    border-radius: 8px;

    /* text */
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    /* identical to box height */

    color: #000000;
  }
</style>
