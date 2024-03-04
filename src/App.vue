<script>
  import SideBar from './components/SideBar.vue';
  export default {
    components: {
      SideBar
    }
  }
</script>

<template>
  <div class="mainContainer">
    <div class="sidebarWrapper">
      <SideBar />
    </div>
    <div class="viewWrapper">
      <router-view />
    </div>
  </div>

</template>

<style scoped>
  .mainContainer {
    display: flex;
  }
  .sidebarWrapper {
    background-color: lightblue;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    width: 20vw;
    text-align: center;
  }
  .viewWrapper {
    min-height: 100vh;
    width: 80vw;
  }
</style>
