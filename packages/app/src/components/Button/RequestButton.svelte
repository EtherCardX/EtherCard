<script lang="ts">
  import { Jumper } from "svelte-loading-spinners";

  import { onMount } from "svelte";

  let buttonState: "normal" | "loading" | "transaction_received" = "normal";

  function handleClick() {
    // If button is normal, transit to loading

    // If button is loading, transit to normal

    // If after 2sconds when button is loading, transit to transaction_received

    // If after 2 seconds when button is transaction_received, transit to normal
    if (buttonState === "normal") {
      buttonState = "loading";
      // Make API call here to initiate the transaction
      setTimeout(() => {
        buttonState = "transaction_received";
      }, 2000);
    } else if (buttonState === "loading") {
      buttonState = "normal";
    } else if (buttonState === "transaction_received") {
      buttonState = "normal";
    }
  }

  onMount(() => {
    console.log(`Initial button state: ${buttonState}`);
  });
</script>

<button on:click={handleClick}>
  {#if buttonState === "normal"}
    <button-text>Request</button-text>
  {:else if buttonState === "loading"}
    <button-text>Requesting...(tap to cancel)</button-text>
    <button-loader>
      <Jumper color="#CAD2C5" />
    </button-loader>
  {:else if buttonState === "transaction_received"}
    <button-text>Processing Payment...</button-text>
    <button-loader>
      <Jumper color="#ADFFEA" />
    </button-loader>
  {/if}
</button>

<style>
  /* your styles go here */
  button {
    /* Auto layout */
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 32px;

    height: 64px;

    background: #84a98c;
    border-radius: 8px;
  }
  button-text {
    /* Request */

    height: 24px;

    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    /* identical to box height */

    display: flex;
    align-items: center;

    color: #ffffff;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
  }
  button-loader {
    position: relative;
    left: 16px;
  }
</style>
