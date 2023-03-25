<script lang="ts">
  import { amount } from "../../stores";

  let _amount = "";
  function handleInput(event: any) {
    const input = event.target as HTMLInputElement;
    let _amount = parseFloat(input.value);
    amount.set(_amount);
  }
</script>

<container>
  <title> Amount: </title>
  <input type="number" bind:value={_amount} on:input={handleInput} />
</container>

<style>
  /* your styles go here */

  container {
    width: 100%;
    /* auto arrange */
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  title {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    display: flex;
    align-items: center;

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
