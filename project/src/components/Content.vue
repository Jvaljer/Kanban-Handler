<template>
    <!-- This is the CORE component of the app -> It contains the content, and is the one handling the changing of those -->
    <!-- 
        For the following components, only one is displayed at a time !
        On each reload there must be the selection of which must be displayed, and which shall be hidden. 
    -->
    <div class="content-container"
        :class="{ 'content-container-expanded': isExpanded }"
    >
        <Dashboard v-if="!projectOpened" 
            :todayDate="todayDate"
            :projects="allProjects"
            :username="userName"
            @openProjectCategory="openProject"
        />
        <Project v-if="projectOpened"
            :project="openedProject"
            :defaultState="defaultState"
            :category="openedCategory"
            :openedWithCategory="categoryOpened"
        /> 
    </div>
</template>
  
  
<!-- LOCAL SCRIPT -->
<script setup>
import { ref } from 'vue';

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
    categoryOpened: {
        type: Boolean
    },
    openedProject: {
        type: Object
    },
    openedCategory: {
        type: Object
    },
    defaultState: {
        type: String
    },
    allProjects: {
        type: Array,
        required: true
    },
    userPseudo: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    }
});

const emits = defineEmits(['openProjectWithCategory']);

const date = new Date();

// turn into DD-MM-YYYY
const day = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();

todayDate.value = ""+day+"-"+month+"-"+year;

function openProject(projectName, categoryName)
{
    console.log("Content -> Received & Sending "+projectName+" with "+categoryName);
    emits('openProjectWithCategory', projectName, categoryName);
}
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