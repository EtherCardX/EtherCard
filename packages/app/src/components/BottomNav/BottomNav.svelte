<script lang="ts">
  import CardsNavItem from "./Item/CardsNavItem.svelte";
  import RequestNavItem from "./Item/RequestNavItem.svelte";

  import receive from "../../public/images/request-active.svg";
  import receiveInactive from "../../public/images/request-inactive.svg";
  import card from "../../public/images/card-active.svg";
  import cardInactive from "../../public/images/card-inactive.svg";
  // variables
  export let activeTab: "receive" | "cards" = "receive";

  function setActiveTab(tabName: "receive" | "cards") {
    activeTab = tabName;
  }
</script>

<section>
  <nav class="navbar">
    <button
      class={activeTab === "receive" ? "active" : ""}
      on:click={() => setActiveTab("receive")}
    >
      <img src={activeTab === "receive" ? receive : receiveInactive} alt="card" />

      Receive
    </button>
    <button class={activeTab === "cards" ? "active" : ""} on:click={() => setActiveTab("cards")}>
      <img src={activeTab === "cards" ? card : cardInactive} alt="card" />
      Cards
    </button>
  </nav>
</section>

<style>
  section {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0;
  }

  nav {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0;
  }

  button {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    font-size: 16px;
    color: #aeaeae;
    border: none;
    border-radius: 0px;
    background-color: transparent;
    cursor: pointer;
    margin: 0;
    box-shadow: none;
  }

  button.active {
    width: 100%;
    color: #7338be;
    border: none;
    border-radius: 0px;

    background: #eaeeff;
    font-weight: bold;
    box-shadow: none;
  }
</style>
