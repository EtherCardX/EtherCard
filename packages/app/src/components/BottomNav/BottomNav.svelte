<script lang="ts">
  import CardsNavItem from "./Item/CardsNavItem.svelte";
  import RequestNavItem from "./Item/RequestNavItem.svelte";

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
      Receive
    </button>
    <button class={activeTab === "cards" ? "active" : ""} on:click={() => setActiveTab("cards")}>
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
    width: 100%;
    font-size: 16px;
    color: #fff;
    border: none;
    border-radius: 0px;
    background: #2f3e46;
    background-color: transparent;
    cursor: pointer;
    margin: 0;
  }

  button.active {
    width: 100%;
    color: #fff;
    border: none;
    border-radius: 0px;

    background: #455c68;
    font-weight: bold;
  }
</style>
