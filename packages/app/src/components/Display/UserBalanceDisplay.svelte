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
    gap: 24px;

    width: 100%;

    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
  }

  balance-title {
    /* Balance */

    width: auto;
    height: 44px;

    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    display: flex;
    align-items: center;

    color: #000000;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
  }

  balance-amount {
    /* 0.00 ETH */

    width: auto;
    height: 39px;

    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 39px;
    /* identical to box height */

    display: flex;
    align-items: center;

    color: #000000;

    /* Inside auto layout */

    flex: none;
    order: 1;
    flex-grow: 0;
  }
</style>
