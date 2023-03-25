<script lang="ts">
  import { Jumper } from "svelte-loading-spinners";

  import { onMount } from "svelte";

  let buttonState: "normal" | "scanning" | "success" = "normal";

  import { scanStatus } from "../../stores";

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
    <button-text-small>Requesting...(tap to cancel)</button-text-small>
    <button-loader>
      <Jumper color="#FFFFFF" />
    </button-loader>
  {:else if buttonState === "success"}
    <button-text-small>Processing Payment...</button-text-small>
    <button-loader>
      <Jumper color="#FFFFFF" />
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

    background: linear-gradient(100.32deg, #92aaff 22.58%, #7237bd 88.81%);
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
  }
  button-text {
    /* Request */

    height: 24px;

    font-style: normal;
    font-weight: 700;
    font-size: 24px;
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
  button-text-small {
    /* Request */

    height: 24px;

    font-style: normal;
    font-weight: 700;
    font-size: 16;
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
