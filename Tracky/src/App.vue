<template>
  <div class="app-container container">
    <Login @userConnect="onUserConnect" v-if="!isConnected"/>

    <Navbar v-if="isConnected" 
      :username="user.username"
      :projects="projects"
      @toggleNavbar="resizeContent"
      @openProject="openProject"
      @backHome="closeProject"
    />

    <Content v-if="isConnected"
      :isExpanded="contentExpanded"
      :projectOpened="projectIsOpened"
      :categoryOpened="categoryIsOpened"
      :openedProject="openedProject"
      :openedCategory="openedCategory"
      :defaultState="defaultState"
      :allProjects="projects"
      :allCategories="categories"
      :allStates="states"
      :userPseudo="user.username"
      :userName="user.name"
      @openProjectWithCategory="openProjectWithCategory"
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

// const projects = ref(projectsData.projects);
const projects = ref(null);
const categories = ref(null);
const states = ref(null);

// Define a reactive variable to track connection status
const isConnected = ref(false);
const user = ref(); // and the user's info
const username = ref('');
const contentExpanded = ref(false);
const projectIsOpened = ref(false);
const categoryIsOpened = ref(false);
const openedProject = ref();
const openedCategory = ref();
const defaultState = ref('');

// Function triggered when userConnect event is emitted
async function onUserConnect(userObject) {
  user.value = userObject;
  username.value = userObject.name;

  projects.value = await fetchProjectsInDatabase(userObject.username);
  console.log(`projects fetched: ${JSON.stringify(projects.value)}`);

  categories.value = await fetchCategoriesForProjects(projects.value);
  console.log(`categories fetched: ${JSON.stringify(categories.value)}`);

  states.value = await fetchStatesForProject(projects.value);
  console.log(`states fetched: ${JSON.stringify(states.value)}`);

  isConnected.value = true;
  // !!! HERE !!!
  /*
    Yet projects.value simply looks like:
    [{
      id, name, description, kanbanView, creationDate, deadline, creator, lastOpen
    }
    ...
    ]

    And now I need to get the states & categories for each project ...

    2 options:
    * (RECOMMENDED) fetch the related states & categories and store them as projectStates & projectCategories
      - this means having to pass all 3 each time
      - more straightforward, less data mixing
    * (X) fetch all project related informations and then create a json object mixing all of them
      - keeps current architecture
      - data mixing isn't good ?
  */
}

async function fetchProjectsInDatabase(username)
{
  try
  {
    const response = await fetch(`http://localhost:3000/projects?username=${username}`);
    if (!response.ok) throw new Error('Failed to fetch projects');

    const data = await response.json();

    // projects.value = data.projects;
    return data.projects;
  } 
  catch (err)
  {
    console.error(`Error fetching projects: ${err}`);
    return [];
  }
}

async function fetchCategoriesForProjects(projectList)
{
  try
  {
    // first retrieve all ids
    const idList = projectList.map(p => p.id);
    const response = await fetch(`http://localhost:3000/categories?projects=${idList}`);
    if (!response.ok) throw new Error('Failed to fetch categories');

    const data = await response.json();

    // categories.value = data.categories;
    return data.categories;
  } 
  catch (err)
  {
    console.error(`Error fetching projects: ${err}`);
    return [];
  }
}

async function fetchStatesForProject(projectList)
{
  try
  {
    // first retrieve all ids
    const idList = projectList.map(p => p.id);
    const response = await fetch(`http://localhost:3000/states?projects=${idList}`);
    if (!response.ok) throw new Error('Failed to fetch states');

    const data = await response.json();

    // categories.value = data.categories;
    return data.states;
  } 
  catch (err)
  {
    console.error(`Error fetching projects: ${err}`);
    return [];
  }
}

function fetchProjectsInJsonDatabase(username)
{
  // If many projects, should be better to retrieve the list of user's project and then grab it from DB
  var projectList = [];
  if (projects.value)
  {
    for (const project of projects.value)
    {
      if (project.participants.includes(username)) // error here ...
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

  for (const state of project.states)
  {
    if (state.isDefault)
    {
      return state.name;
    }
  }
  return "ERR_NO_DEFAULT_STATE";
}

function searchCategoryInProject(project, categoryName)
{
  for (const category of project.categories)
  {
    if (category.name === categoryName)
    {
      return category;
    }
  }
  return "ERR_CATEGORY_NOT_FOUND";
}

function resizeContent()
{
  contentExpanded.value = !contentExpanded.value;
}

function openProject(projectName)
{
  projectIsOpened.value = true;
  openedProject.value = searchProjectByName(projectName);
  defaultState.value = searchDefaultStateInProject(openedProject.value);
}
function openProjectWithCategory(projectName, categoryName)
{
  projectIsOpened.value = true;
  categoryIsOpened.value = true;
  openedProject.value = searchProjectByName(projectName);
  defaultState.value = searchDefaultStateInProject(openedProject.value);
  openedCategory.value = searchCategoryInProject(openedProject.value, categoryName);
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
