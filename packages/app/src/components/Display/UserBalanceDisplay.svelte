<script lang="ts">
  export let amount: string = "0";
  // your script goes here
</script>

<container>
  <balance-title>Balance</balance-title>
  <balance-amount>{amount} ETH</balance-amount>
</container>

<style>
  /* your styles go here */
  container {
    /* BalanceDisplay */

    /* Auto layout */

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 16px;
    /* gap: 24px; */

    width: 100%;

    background: #f3f3f3;
    border-radius: 8px;
    /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
  }

  balance-title {
    /* Balance */

    width: auto;

    font-style: normal;
    font-weight: 650;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;
    /* letter-spacing: -0.02em; */

    color: #000000;
  }

  balance-amount {
    /* 0.00 ETH */

    width: auto;

    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    /* identical to box height */

    display: flex;
    align-items: center;

    color: #000000;
  }
</style>
