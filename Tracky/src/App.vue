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
      :projectCategories="openedProjectCategories"
      :projectStates="openedProjectStates"
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

// import projectsData from '@/assets/database-json/projects.json';

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
const openedProjectCategories = ref([]);
const openedProjectStates = ref([]);

// Function triggered when userConnect event is emitted
async function onUserConnect(userObject) {
  user.value = userObject;
  username.value = userObject.name;

  projects.value = await fetchProjectsInDatabase(userObject.username);
  // console.log(`projects fetched: ${JSON.stringify(projects.value)}`);

  categories.value = await fetchCategoriesForProjects(projects.value);
  // console.log(`categories fetched: ${JSON.stringify(categories.value)}`);

  states.value = await fetchStatesForProject(projects.value);
  // console.log(`states fetched: ${JSON.stringify(states.value)}`);

  isConnected.value = true;
}

async function fetchProjectsInDatabase(username)
{
  try
  {
    const response = await fetch(`http://localhost:3000/projects?username=${username}`);
    if (!response.ok) throw new Error('Failed to fetch projects');

    const data = await response.json();

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
    const idList = projectList.map(p => p.id);

    const response = await fetch(`http://localhost:3000/categories?projects=${idList}`);
    if (!response.ok) throw new Error('Failed to fetch categories');

    const data = await response.json();

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
    const idList = projectList.map(p => p.id);

    const response = await fetch(`http://localhost:3000/states?projects=${idList}`);
    if (!response.ok) throw new Error('Failed to fetch states');

    const data = await response.json();

    return data.states;
  } 
  catch (err)
  {
    console.error(`Error fetching projects: ${err}`);
    return [];
  }
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
  // console.log("states -> ",states.value);
  for (const state of states.value/*project.states*/) // project and states are now 2 different tables
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
  for (const category of categories.value/*project.categories*/) //same as above
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
  // here more stuff to fetch now that using SQL instead of JSON
  openedProject.value = searchProjectByName(projectName);
  // console.log("##### Opened Project - ",openedProject.value.name," #####");
  openedProjectCategories.value = getProjectCategories(openedProject.value.id);
  openedProjectStates.value = getProjectStates(openedProject.value.id);
  defaultState.value = searchDefaultStateInProject(openedProject.value);
}

function getProjectCategories(id)
{
  let list = [];
  for (const category of categories.value)
  {
    if (category.project_id == id) list.push(category);
  }
  // console.log("##### Categories are - ",list," #####");
  return list;
}

function getProjectStates(id)
{
  let list = [];
  for (const state of states.value)
  {
    if (state.project_id == id) list.push(state);
  }
  // console.log("##### States are - ",list," #####");
  return list;
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
