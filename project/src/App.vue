<template>
  <div class="app-container container">
    <Login @userConnect="onUserConnect" v-if="!isConnected"/>
    <Navbar v-if="isConnected" :username="username" :projects="projects"/>
    <Content v-if="isConnected"/>
  </div>
</template>


<!-- LOCAL SCRIPT -->
<script setup>
import Login from './components/Login.vue';
import Navbar from './components/Navbar.vue';
import Content from './components/Content.vue';
import { ref } from 'vue';

// test project -> basic project & organization as JSON, aim is to do the same then in the DB
const debugProject = {
  "name": "My Project",
  "description": "Void project allowing me to test my front & semi-back (local JSON before DB)",
  "participants": ["ahenry", "abelo"],
  "states": [
    { "name": "pending", "isDefault": true, "color": "var(--item-bright-red)" },
    { "name": "in-progress", "isDefault": false, "color": "var(--item-bright-yellow)" },
    { "name": "advanced", "isDefault": false, "color": "var(--item-bright-green)" },
    { "name": "done", "isDefault": false, "color": "var(--item-bright-blue)" }
  ],
  "categories": [
    {
      "name": "Development",
      "color": "var(--item-base-red)",
      "description": "Dev-Oriented tasks, all tech concerned."
    },
    {
      "name": "Design",
      "color": "var(--item-base-green)",
      "description": "Design-related tasks, wether it is UX, UI or Product ..."
    },
    {
      "name": "Marketing",
      "color": "var(--item-base-blue)",
      "description": "Whatever is concerning the selling and funding of the solution."
    }
  ],
  "tasks": [
    {
      "name": "Setup Project",
      "state": "pending",
      "category": "Development",
      "description": "Create core code organization.",
      "priority": "High"
    },
    {
      "name": "Refine UX",
      "state": "in-progress",
      "category": "Design",
      "description": "Improve interactions and discoverability",
      "priority": "High"
    },
    {
      "name": "Write Pitch",
      "state": "advanced",
      "category": "Marketing",
      "description": "Sales Pitch to obtain second fundings",
      "priority": "Medium"
    },
    {
      "name": "Make Slideshow",
      "state": "done",
      "category": "Marketing",
      "description": "Create the slides for Sales Pitch",
      "priority": "Low"
    },
    {
      "name": "Design Smaller Interactions",
      "state": "in-progress",
      "category": "Design",
      "description": "Find better small-interactions (hover, focus, active, ...)",
      "priority": "Medium"
    }
  ],
  "kanbanView": "state"
};

// TODO: make another one that has "kanbanView = "category" to test both layouts

// Define a reactive variable to track connection status
const isConnected = ref(false);
const username = ref(''); // and the user's info
const projects = ref([]);

// Function triggered when userConnect event is emitted
function onUserConnect(user) {
    isConnected.value = true;
    username.value = user;
    projects.value = fetchProjectsInDatabase(user);
}

function fetchProjectsInDatabase(username)
{
  // TODO: link this to a DB that retrieve possible projects for user
  const projectList = [ debugProject ];
  return projectList;
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
