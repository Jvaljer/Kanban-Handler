<template>
  <Login />
  <div class="window-container" hidden> <!-- This must only be displayed if the "Login" component is on state #connected# -->
    <Navbar />
    <Content />
  </div>
</template>


<!-- LOCAL SCRIPT -->
<script setup>

import Login from './components/Login.vue';
import Navbar from './components/Navbar.vue';
import Content from './components/Content.vue';

import { useToast } from 'vue-toastification';
import { red, computed, onMounted } from 'vue'; //check which one are really needed here

</script>

<!-- LOCAL STYLES -->
<style>

</style>
