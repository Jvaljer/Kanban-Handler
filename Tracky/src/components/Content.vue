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
            :categories="allCategories"
            :username="userName"
            @openProjectCategory="openProject"
        />
        <Project v-if="projectOpened"
            :project="openedProject"
            :categories="projectCategories"
            :states="projectStates"
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
    projectCategories: {
        type: Array
    },
    projectStates: {
        type: Array
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
    allCategories: {
        type: Array,
        required: true
    },
    allStates: {
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
    // console.log("##### openProject - ",projectName, categoryName," #####");
    emits('openProjectWithCategory', projectName, categoryName);
}
</script>
  
<!-- LOCAL STYLES -->
<style>
.content-container {
    width: calc(100vw - 208px);
    background-color: var(--main-light-beige);

    transition: width 0.25s ease;
}
.content-container-expanded {
    width: calc(100vw - 104px);
}
</style>