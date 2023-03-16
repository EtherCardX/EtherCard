<script lang="ts">
  export let amount: number = 0;

  function handleInput(event: any) {
    const input = event.target as HTMLInputElement;
    amount = parseFloat(input.value);
  }
</script>

<label>
  Amount:
  <input type="number" bind:value={amount} on:input={handleInput} />
</label>

<style>
  /* your styles go here */

  label {
    width: 100%;
  }
  input {
    width: 100%;
    height: 64px;
    background: #ffffff;
    border: 1px solid #2f3e46;
    border-radius: 8px;
    color: #000000;
    margin: 0px;
  }
</style>
