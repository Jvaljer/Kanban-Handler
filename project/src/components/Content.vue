<template>
    <!-- This is the CORE component of the app -> It contains the content, and is the one handling the changing of those -->
    <!-- 
        For the following components, only one is displayed at a time !
        On each reload there must be the selection of which must be displayed, and which shall be hidden. 
    -->
    <div class="content-container container">
        <Dashboard />
        <Project v-if="projectOpened"/> <!-- Needs a precision on WHICH project is opened -->
    </div>
</template>
  
  
<!-- LOCAL SCRIPT -->
<script setup>
import Dashboard from './Dashboard.vue';
import Project from './Project.vue';

const projectOpened = false;

</script>
  
<!-- LOCAL STYLES -->
<style>
.content-container {
    background-color: var(--main-light-beige);
}
</style>