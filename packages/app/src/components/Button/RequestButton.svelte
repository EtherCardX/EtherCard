<script lang="ts">
  import { Jumper } from "svelte-loading-spinners";

  import { onMount } from "svelte";

  let buttonState: "normal" | "scanning" | "success" = "normal";

  import { scanStatus } from "../../stores/stores";

  scanStatus.subscribe((value) => {
    // @ts-ignore
    buttonState = value;
  });

  function handleClick() {
    if (buttonState === "normal") {
      scanStatus.set("scanning");
    } else if (buttonState === "scanning") {
      scanStatus.set("normal");
    } else if (buttonState === "success") {
      scanStatus.set("normal");
    }
  }

  onMount(() => {
    console.log(`Initial button state: ${buttonState}`);
  });
</script>

<button on:click={handleClick}>
  {#if buttonState === "normal"}
    <button-text>Request</button-text>
  {:else if buttonState === "scanning"}
    <button-text>Requesting...(tap to cancel)</button-text>
    <button-loader>
      <Jumper color="#CAD2C5" />
    </button-loader>
  {:else if buttonState === "success"}
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
    margin: 0px;

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
