<template>
    <div class="project-container container urbanist">
        <div class="project">
            <div class="project-header">
                <div class="project-header-infos">
                    <span class="project-infos-name">{{ project.name }}</span>
                    <div class="project-infos-collaborators">
                        <div v-for="user in project.participants"
                            :key="user"
                            class="project-infos-user-icon hover-pointer"
                            :title="user"
                        >
                            <!-- TODO: find the picture (or color) related to this user in the DB -->
                        </div>
                    </div>
                </div>
                <div class="project-header-statistics">
                    <!-- TODO  -->
                </div>
                <div class="project-header-options">
                    <button class="project-option-button"
                        @click="openProjectParameters"
                    >
                        <img alt="Parameters" title="Parameters" src="@/assets/icons/parameters-icon.png"/>
                    </button>
                    <button class="project-option-button"
                        @click="openProjectSettings"
                    >
                        <img alt="Settings" title="Settings" src="@/assets/icons/settings-icon.png"/>
                    </button>
                </div>
            </div>
            <div class="project-body">
                <!-- PUT THIS IN ANOTHER COMPONENT "CATEGORIE.VUE" -->
                <div v-for="category in project.categories"
                    :key="category.name"
                    class="project-item hover-pointer"
                    :style="{ backgroundColor: category.color }"
                    @click="openItem(category)"
                    v-show="showCategory(category)"
                >
                    <div class="project-item-header">
                        <span class="project-header-category-name">{{ category.name }}</span>
                        <span class="project-header-tasks-amount">{{ getCategoryTasksCount(category.name) }} tasks </span>
                    </div>
                    <div class="project-item-body">
                        <div v-for="task in getCategoryTasks(category.name)"
                            :key="category.name"
                            class="project-task"
                            @click.stop="openItem(task)"
                        >
                            <div class="task-header">
                                <span class="task-name">{{ task.name }}</span>
                                <div class="task-priority"
                                    :style="{ backgroundColor: getPriorityColorFromTask(task) }"
                                ></div>
                            </div>
                            <span class="task-description">{{ task.description }}</span>
                            <div class="task-state"
                                :style="{ backgroundColor: getStateColorFromTask(task) }"
                            >
                                {{ task.state }}
                            </div>
                        </div>
                    </div>

                    <div class="project-item-footer"
                        @click.stop="addTaskByCategory(category.name)"
                    >
                        <span class="project-add-task">Add New Task</span>
                    </div>
                </div>

                <div 
                    v-show="!detailOpened"
                    class="project-item project-create-category"
                >
                    <div class="project-item-header create-category-header">
                        <span class="project-header-category-name">New Category</span>
                        <span class="project-header-tasks-amount">click to create !</span>
                    </div>
                </div>

                <div
                    v-show="detailOpened"
                    class="project-item-details"
                >
                    <div class="item-details-content">Hello There</div>
                    <button class="close-item-details"
                        @click="closeItem"
                    >
                        X
                    </button>
                </div>
            </div>
            <div class="project-footer">
                <span class="project-creation">Created on {{ project.creationDate }}, by {{ project.creator }}.</span>
                <span class="project-deadline">Due for {{ project.deadline }}.</span>
            </div>
        </div>
    </div>
</template>
  
  
<!-- LOCAL SCRIPT -->
<script setup>
import { ref } from 'vue';

const detailOpened = ref(false);
const openedItem = ref();

const props = defineProps({
    project: {
        type: Object,
        required: true
    }
});

function getCategoryTasksCount(categoryName)
{
    return props.project.tasks.filter(task => task.category === categoryName).length;
}

function getCategoryTasks(categoryName)
{
    return props.project.tasks.filter(task => task.category === categoryName);
}

function getStateColorFromTask(task)
{
    const taskState = task.state;
    return props.project.states.filter(state => state.name === taskState)[0].color;
}

function getPriorityColorFromTask(task)
{
    var resultColor = '';
    switch (task.priority)
    {
        case 'Low':
            resultColor = "var(--item-bright-yellow)";
            break;
        case 'Medium':
            resultColor = "var(--item-bright-orange)";
            break;
        case 'High':
            resultColor = "var(--item-bright-red)";
            break;
        default: break;
    }
    return resultColor;
}

function openProjectParameters()
{
    // TODO
}

function openProjectSettings()
{
    // TODO
}

function addTaskByCategory(categoryName)
{
    console.log("Adding task to "+categoryName);
    // TODO
}
function showCategory(category)
{
    if (detailOpened.value)
    {
        if (openedItem.value.category != undefined) //in this case TASK
            return (openedItem.value.category === category.name);
        else //otherwise CATEGORY
            return (openedItem.value.name === category.name);
    }
    else
        return true;
}

function openItem(item)
{
    detailOpened.value = true;
    openedItem.value = item;
}

function closeItem()
{
    detailOpened.value = false;
    openedItem = null;
}
</script>
  
<!-- LOCAL STYLES -->
<style>
.project-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.project {
    padding: 4px 8px 4px 8px;
    width: calc(94% - 16px);
    height: calc(94% - 8px);
    border: solid 2px var(--main-beige-16);
    border-radius: 8px;
    background-color: var(--main-beige-08);
    
    display: flex;
    flex-direction: column;
}

/* HEADER STYLES */
.project-header {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: fit-content;
    border-bottom: solid 2px var(--main-beige-32);
}
.project-header-infos {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    width: fit-content;
    padding-right: 12px;
    border-right: solid 2px var(--main-beige-32);
}
.project-infos-name {
    font-size: 32px;
    color: var(--main-brown);
}
.project-infos-collaborators {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    margin-top: 4px;
    margin-bottom: 12px;
    width: 100%;
    gap: 4px;
}
.project-infos-user-icon {
    width: 20px;
    height: 20px;
    background-color: var(--main-dark-brown-16);
    border: solid 2px var(--main-brown-64);
    border-radius: 24px;

    transition: transform 0.25s ease;
}
.project-infos-user-icon:hover {
    transform: scale(1.05);
}

.project-header-statistics {
    flex-grow: 1;
}

.project-header-options {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    padding-left: 8px;
    border-left: solid 2px var(--main-beige-32);
}
.project-option-button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background: transparent;
}
.project-option-button:hover {
    transform: scale(1.1);
}
.project-option-button:active {
    transform: scale(1);
}

/* BODY STYLES */
.project-body {
    flex-grow: 1;
    padding: 8px 2px;

    display: flex;
    flex-direction: row;
    gap: 12px;
}
.project-item {
    display: flex;
    flex-direction: column;
    width: 224px;
    height: calc(100% - 16px);
    border-radius: 16px;
    box-shadow: 2px 2px 4px var(--main-shadow-color);
    border: solid 2px transparent;
    padding: 8px;

    transition: box-shadow 0.33s ease, border 0.125s ease, border-radius 0.25s ease;
}
.project-item:hover {
    box-shadow: none;
    border: solid 2px var(--main-dark-brown-08);
    border-radius: 24px;
}
.project-item:active {
    border: solid 2px var(--main-dark-brown-64);
}
.project-create-category {
    /* width: fit-content; */
    border: solid 2px var(--main-dark-brown-16);
    box-shadow: none;
}
.project-create-category:hover {
    border: solid 2px var(--main-dark-brown-32);
    box-shadow: 2px 2px 4px var(--main-shadow-color);
}
.project-create-category:active {
    border: solid 2px var(--main-dark-brown-64);
    background-color: var(--main-beige-16);
    box-shadow: none;
}

/* INNER ITEM STYLES */
.project-item-header {
    padding: 4px 8px 8px 8px;
    color: var(--main-dark-brown-64);
    display: flex;
    flex-direction: column;
    border-bottom: solid 1px var(--main-brown-32);
}
.project-header-category-name {
    font-size: 20px;
    font-weight: var(--urbanist-semibold);
}
.project-header-tasks-amount {
    color: var(--main-dark-brown-48);
}

.project-item-body {
    flex-grow: 1;
    padding-top: 16px;
    display: flex;
    flex-direction: column;
}

.project-item-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 4px;
    border-top: solid 1px var(--main-brown-32);
    border-right: solid 1px transparent;
    border-bottom: solid 1px transparent;
    border-left: solid 1px transparent;
    color: var(--main-dark-brown-48);
    background-color: transparent;

    transition: border-radius 0.25s ease, background-color 0.33s ease, border 0.33s ease;
}
.project-item-footer:hover {
    background-color: var(--main-dark-brown-04);
    border: solid 1px var(--main-brown-32);
    border-radius: 16px;
}
.project-item-footer:active {
    background-color: var(--main-dark-brown-16);
    border-radius: 16px;
}

/* TASKS STYLE */
.project-task {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 8px 8px;
    background-color: var(--main-light-beige-64);
    font-size: 16px;
    margin-bottom: 8px;
    border: solid 2px transparent;
    border-radius: 8px;
    color: var(--main-dark-brown-80);
    box-shadow: 2px 2px 4px var(--main-dark-brown-16);

    transition: transform 0.25s ease;
}
.task-name {
    width: 80%;
}
.project-task:hover {
    transform: scale(1.025);
}
.project-task:active {
    transform: scale(1);
    box-shadow: none;
    border: solid 2px var(--main-dark-brown);
}
.task-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 96%;
}
.task-description {
    padding: 4px;
    background-color: var(--main-dark-brown-04);
    border-radius: 8px;
}
.task-state {
    display: flex;
    justify-content: center;
    border-radius: 16px;
    padding: 2px 16px;
    width: fit-content;
}
.task-priority {
    width: 12px;
    height: 12px;
    border: solid 1px var(--main-dark-brown-32);
    border-radius: 16px;
}

/* FOOTER STYLES */
.project-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding-top: 4px;
    margin-top: 4px;
    border-top: solid 2px var(--main-beige-16);
    color: var(--main-beige);
}

/* DETAILS STYLES */
.project-item-details {
    flex-grow: 1;
    background-color: var(--main-light-beige);
    border: solid 2px var(--main-beige-32);
    border-radius: 16px;
}
</style>