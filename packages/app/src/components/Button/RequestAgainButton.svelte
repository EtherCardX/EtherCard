<script lang="ts">
  import { modalState } from "../../stores";

  function handleClick() {
    modalState.set(false);
  }
</script>

<button on:click={handleClick}>
  <button-text>Request Again</button-text>
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

    height: 64px;
    margin-top: 16px;

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
</style>
