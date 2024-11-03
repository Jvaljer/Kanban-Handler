<template>
    <!-- This is the CORE component of the app -> It contains the content, and is the one handling the changing of those -->
    <!-- 
        For the following components, only one is displayed at a time !
        On each reload there must be the selection of which must be displayed, and which shall be hidden. 
    -->
    <div class="content-container"
        :class="{ 'content-container-expanded': isExpanded }"
    >
        <Dashboard />
        <Project v-if="projectOpened" :project="openedProject"/> <!-- Needs a precision on WHICH project is opened -->
    </div>
</template>
  
  
<!-- LOCAL SCRIPT -->
<script setup>
import Dashboard from './Dashboard.vue';
import Project from './Project.vue';
import { ref } from 'vue';

const props = defineProps({
    isExpanded: {
        type: Boolean
    }
});

const projectOpened = false;
const openedProject = ref({});

</script>
  
<!-- LOCAL STYLES -->
<style>
.content-container {
    width: calc(100vw - 304px); /* must set to more when navbar is collapsed */
    background-color: var(--main-light-beige);

    transition: width 0.25s ease;
}
.content-container-expanded {
    width: calc(100vw - 132px);
}
</style>