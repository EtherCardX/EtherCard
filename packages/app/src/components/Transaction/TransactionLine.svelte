<script lang="ts">
  import type { BigNumber } from "ethers";
  import caretIcon from "../../images/caret-down.svg";
  import doubleCheck from "../../images/double-check.svg";
  // your script goes here
  import { formatEther, parseEther } from "ethers/lib/utils.js";

  export let amount: BigNumber;
  export let timestamp: string;

  // Convert amount to string with 5 decimal place
  let displayAmount = formatEther(amount);

  // Convert timestamp to HH:MM
  let displayTimestamp = new Date(Number(timestamp) * 1000);
  let _displayTimestamp = displayTimestamp
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    })
    .toString();
</script>

<!-- <section>Transaction Line</section> -->

<container>
  <transaction-header>
    <img src={caretIcon} alt="caret" />
    <received_marker>Received </received_marker>
  </transaction-header>
  <transaction-body>
    <transaction-value>{displayAmount} ETH</transaction-value>
    <transaction-timestamp-container>
      <img src={doubleCheck} alt="checks" />
      <transaction-timestamp>{_displayTimestamp}</transaction-timestamp>
    </transaction-timestamp-container>
  </transaction-body>
</container>

<style>
  container {
    /* Transaction */

    /* Auto layout */

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 8px;
    gap: 3px;

    position: relative;
    width: 100%;
    height: 54px;
    margin: 0px;

    background: #354f52;
    border-width: 0px 0px 1px 0px;
    border-style: solid;
    border-color: #ffffff;
  }

  transaction-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 4px;

    width: 327px;
    height: 16px;

    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;

    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 8px;
    line-height: 10px;
    /* identical to box height */

    display: flex;
    align-items: center;

    color: #ffffff;
  }

  transaction-body {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;

    align-self: stretch;
  }
  transaction-value {
    /* Frame 1 */

    /* Auto layout */

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;

    color: #ffffff;

    /* Inside auto layout */

    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 1;
  }
  transaction-timestamp-container {
    /* Frame 1 */

    /* Auto layout */

    display: flex;
    flex-direction: row;
    gap: 4px;
  }
  transaction-timestamp {
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 8px;
    line-height: 10px;

    color: #ffffff;
  }
</style>
