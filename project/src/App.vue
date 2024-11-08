<template>
  <div class="app-container container">
    <Login @userConnect="onUserConnect" v-if="!isConnected"/>

    <Navbar v-if="isConnected" 
      :username="username"
      :projects="projects"
      @toggleNavbar="resizeContent"
      @openProject="openProject"
      @backHome="closeProject"
    />

    <Content v-if="isConnected"
      :isExpanded="contentExpanded"
      :projectOpened="projectIsOpened"
      :openedProject="openedProject"
      :defaultState="defaultState"
    />

  </div>
</template>


<!-- LOCAL SCRIPT -->
<script setup>
import Login from './components/Login.vue';
import Navbar from './components/Navbar.vue';
import Content from './components/Content.vue';
import { ref } from 'vue';

import projectsData from '@/assets/database-json/projects.json';

const projects = ref(projectsData.projects);

// Define a reactive variable to track connection status
const isConnected = ref(false);
const username = ref(''); // and the user's info
const contentExpanded = ref(false);
const projectIsOpened = ref(false);
const openedProject = ref();
const defaultState = ref('');

// Function triggered when userConnect event is emitted
function onUserConnect(user) {
    isConnected.value = true;
    username.value = user;
    projects.value = fetchProjectsInDatabase(user);
}

function fetchProjectsInDatabase(username)
{
  var projectList = [];
  if (projects.value)
  {
    for (const project in projects.value)
    {
      if (project.participants.includes(username))
      {
        projectList.push(project);
      }
    }
  }
  return projectList;
}

function searchProjectByName(name)
{
    for (let project of projects.value)
    { 
        if (project.name === name)
        {
            return project;
        }
    }
    return null;
}

function searchDefaultStateInProject(project)
{
  if (project == null) return "ERR_NO_PROJECT";

  console.log("Searching default  state in : "+JSON.stringify(project.states));
  for (const state of project.states)
  {
    console.log("project state : "+JSON.stringify(state));
    if (state.isDefault)
    {
      console.log("Found default !");
      return state.name;
    }
  }
  return "ERR_NO_DEFAULT_STATE";
}

function resizeContent()
{
  contentExpanded.value = !contentExpanded.value;
}

function openProject(projectName)
{
  console.log("APP -> openProject("+projectName+")");
  projectIsOpened.value = true;
  openedProject.value = searchProjectByName(projectName);
  defaultState.value = searchDefaultStateInProject(openedProject.value);
  console.log("APP -> DefaultState is "+defaultState.value);
}

function closeProject()
{
  projectIsOpened.value = false;
  openedProject.value = null; //is there something better to do that defining null ? maybe an empty project ??
}
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
