<template>
  <div class="app-container">
    <Login @userConnect="onUserConnect" v-if="!isConnected"/>
    <div class="window-container" v-if="isConnected"> <!-- This must only be displayed if the "Login" component is on state #connected# -->
      <Navbar />
      <Content />
    </div>
  </div>
</template>


<!-- LOCAL SCRIPT -->
<script setup>
import Login from './components/Login.vue';
import Navbar from './components/Navbar.vue';
import Content from './components/Content.vue';
import { ref } from 'vue';

// Define a reactive variable to track connection status
const isConnected = ref(false);

// Function triggered when userConnect event is emitted
function onUserConnect() {
    isConnected.value = true;
}

console.log("APP loaded ...");
</script>
<!-- LOCAL STYLES -->
<style>
.app-container {
  background-color: var(--main-light-beige);
  margin: -8px; /* Strange that I need this, otherwise it */
}
</style>
