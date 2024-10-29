<template>
  <div class="app-container container">
    <Login @userConnect="onUserConnect" v-if="!isConnected"/>
    <Navbar v-if="isConnected" :username="username"/>
    <Content v-if="isConnected"/>
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
const username = ref(''); // and the user's info

// Function triggered when userConnect event is emitted
function onUserConnect(user) {
    isConnected.value = true;
    username.value = user;
}

console.log("APP loaded ...");
</script>

<!-- LOCAL STYLES -->
<style>
.app-container {
  background-color: var(--main-light-beige);
  margin: -8px; /* Strange that I need this, otherwise it */
  display: flex;
  flex-direction: row;
  gap: 0px;
}
</style>
