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
            <div id="scrollable-body" class="project-body" ref="scrollableBody">
                <Category v-for="category in categories"
                    :key="category.name"
                    :srcCategory="category"
                    :project="project"
                    :states="states"
                    :defaultState="defaultState"
                    :detailsOpened="detailOpened"
                    :openedItem="openedItem"
                    :movingTask="pickedTask"
                    :activeModalTask="activeModalTask"
                    @updateModalTask="updateModalTask"
                    @openTask="openTaskDetails"
                    @openCategory="openCategoryDetails"
                    @pickTask="pickTask"
                    @dropTask="dropTask"
                    @currentCategoryHolder="enteringCategory"
                    v-show="showCategory(category)"
                />

                <div 
                    v-show="!detailOpened"
                    class="project-create-category"
                >
                    <div class="project-item-header create-category-header">
                        <span class="project-header-category-name">New Category</span>
                        <span class="project-header-tasks-amount">click to create !</span>
                    </div>
                </div>

                <ProjectDetails
                    v-if="detailOpened"
                    :item="openedItem"
                    :itemIsTask="openedItemIsTask"
                    @closeItem="closeItem"
                />

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
import Category from './Category.vue';
import { onMounted, onUnmounted, ref } from 'vue';
import ProjectDetails from './ProjectDetails.vue';

const detailOpened = ref(false);
const openedItem = ref();
const openedItemIsTask = ref(false);

const pickedTask = ref(null);
const holderCategoryName = ref(null);
const activeModalTask = ref(null);

const scrollableBody = ref(null);

const props = defineProps({
    project: {
        type: Object,
        required: true
    },
    categories: {
        type: Array,
        required: true
    },
    states: {
        type: Array,
        required: true
    },
    defaultState: {
        type: String
    },
    category: {
        type: Object
    },
    openedWithCategory: {
        type: Boolean,
        required: true
    }
});

function openProjectParameters()
{
    // TODO
}

function openProjectSettings()
{
    // TODO
}
function showCategory(category)
{
    if (detailOpened.value)
    {
        console.log("##### Show : openedItem - ",openedItem.value);
        if (openedItem.value.category_id != undefined) //in this case TASK
            return (openedItem.value.category_id === category.id);
        else // otherwise CATEGORY
            return (openedItem.value.id === category.id);
    }
    else
        return true;
}

function openCategoryDetails(category)
{
    openItem(category, false);
}
function openTaskDetails(task)
{
    openItem(task, true);
}

function openItem(item, isTask)
{
    detailOpened.value = true;
    openedItem.value = item;
    openedItemIsTask.value = isTask;
}

function closeItem()
{
    detailOpened.value = false;
    openedItem.value = null;
}

// Horizontal Scrolling Behaviour
function handleWheelScroll(event) {
    event.preventDefault();
    if (scrollableBody.value) {
        scrollableBody.value.scrollLeft += event.deltaY;
    }
}

// Task Drag and Drop emits handling
function pickTask(task)
{
    pickedTask.value = task;
}
function dropTask()
{
    // first we figure which category is holding the task
    for (const category of props.project.categories)
    {
        if (category.name === holderCategoryName.value)
        {
            pickedTask.value.category = category.name;
            pickedTask.value = null;
        }
    }

}
function enteringCategory(categoryName)
{
    holderCategoryName.value = categoryName;
}

function updateModalTask(task)
{
    activeModalTask.value = task
}

// Calculation at the start of the component
onMounted(() => {
    if (scrollableBody.value) {
        scrollableBody.value.addEventListener('wheel', handleWheelScroll, { passive: false });
    }
});

onUnmounted(() => {
    if (scrollableBody.value) {
        scrollableBody.value.removeEventListener('wheel', handleWheelScroll);
    }
});

if (props.category && props.openedWithCategory)
{
    openCategoryDetails(props.category);
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

    overflow-x: scroll;
    overflow-y: hidden;
}
.project-body::-webkit-scrollbar {
  display: none;
}
.project-body {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.project-create-category {
    display: flex;
    flex-direction: column;
    width: 224px;
    min-width: 224px;
    height: calc(100% - 16px);
    border-radius: 16px;
    box-shadow: none;
    border: solid 2px var(--main-dark-brown-16);
    padding: 8px;

    transition: box-shadow 0.33s ease, border 0.125s ease, border-radius 0.25s ease;
}
.project-create-category:hover {
    border: solid 2px var(--main-dark-brown-32);
}
.project-create-category:active {
    border: solid 2px var(--main-dark-brown-64);
    background-color: var(--main-beige-16);
    box-shadow: none;
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
</style>