<template>
    <!-- This is the CORE component of the app -> It contains the content, and is the one handling the changing of those -->
    <!-- 
        For the following components, only one is displayed at a time !
        On each reload there must be the selection of which must be displayed, and which shall be hidden. 
    -->
    <div class="content-container"
        :class="{ 'content-container-expanded': isExpanded }"
    >
        <Dashboard v-if="!projectOpened" :todayDate="todayDate" :projects="allProjects"/>
        <Project v-if="projectOpened" :project="openedProject" :defaultState="defaultState"/> <!-- Needs a precision on WHICH project is opened -->
    </div>
</template>
  
  
<!-- LOCAL SCRIPT -->
<script setup>
import Dashboard from './Dashboard.vue';
import Project from './Project.vue';

const todayDate = ref("");

const props = defineProps({
    isExpanded: {
        type: Boolean
    },
    projectOpened: {
        type: Boolean
    },
    openedProject: {
        type: Object
    },
    defaultState: {
        type: String
    },
    allProjects: {
        type: Array,
        required: true
    }
});

const date = new Date();

// turn into DD-MM-YYYY
const day = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();

todayDate.value = ""+day+"-"+month+"-"+year;

</script>
  
<!-- LOCAL STYLES -->
<style>
.content-container {
    width: calc(100vw - 304px);
    background-color: var(--main-light-beige);

    transition: width 0.25s ease;
}
.content-container-expanded {
    width: calc(100vw - 152px);
}
</style>