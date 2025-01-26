<template>
     <div class="project-item hover-pointer"
        :style="{ backgroundColor: srcCategory.color }"
        @click.stop="openCategoryDetails(srcCategory)"
        @dragenter="enterCategory(srcCategory.name)"
     >

        <div class="project-item-header">
            <span class="project-header-category-name">{{ srcCategory.name }}</span>
            <span class="project-header-tasks-amount">{{ (tasks.length===undefined ? "0" : tasks.length) }} tasks</span>
        </div>

        <div class="project-item-body">
            <!-- Put Tasks in another Component ? -->
            <div v-for="task in tasks"
                :key="task.name"
                class="project-task"
                :class="{ 'notOpenedTask': taskIsNotOpened(task.name) && detailsOpened }"
                draggable="true"
                @click.stop="openTaskDetails(task)"
                @dragstart="pickTaskItem(task)"
                @dragend="dropTaskItem(task)"
            >
                <div class="task-header">
                    <span class="task-name">{{ task.name }}</span>
                    <div class="task-priority"
                        :style="{ backgroundColor: getPriorityColorFromTask(task.priority) }"
                    ></div>
                </div>
                <span class="task-description" >{{  task.description }}</span>
                <button class="task-state"
                    :style="{ backgroundColor: getStateColorFromTask(task) }"
                    @click.stop="openStateModal(task)"
                >
                    {{ task.state }}
                </button>
                <div
                    v-if="taskStateClicked(task)"
                    class="task-modal-state"
                >
                    <span class="task-modal-state-title">
                        Switch state:
                    </span>
                    <div class="modal-state-list">
                        <div v-for="state of project.states"
                            class="modal-state-item"
                            :style="{ backgroundColor: state.color }"
                            @click.stop="updateTaskState(task, state)"
                        >
                            <span>
                                {{  state.name }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="project-item-footer"
            @click.stop="addTaskForCategory(srcCategory.name)"
        >
            <span class="project-add-task">Add New Task</span>
        </div>
     </div>
</template>
  
  
<!-- LOCAL SCRIPT -->
<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const emits = defineEmits(['openCategory','openTask', 'pickTask', 'dropTask', 'currentCategoryHolder']);

const props = defineProps({
    srcCategory: {
        type: Object,
        required: true
    },
    project: {
        type: Object,
        required: true
    },
    states: {
        type: Array,
        required: true
    },
    defaultState: {
        type: String
    },
    detailsOpened: {
        type: Boolean,
        required: true
    },
    openedItem: {
        type: Object
    },
    movingTask: {
        type: Object
    },
    isHoldingTask: {
        type: Boolean
    },
    activeModalTask: {
        type: Object
    }
});

const tasks = ref([]);

async function fetchTasksForCategory(categoryId)
{
    // todo
    const response = await fetch(`http://localhost:3000/tasks?category=${categoryId}`);
    if (!response.ok) throw new Error('Failed to fetch projects');

    const data = await response.json();
    // console.log("fetched tasks -> "+data.tasks);

    return data.tasks;
}

function getStateColorFromTask(task) // UNUSED NOW, NEED TO CHECK HOW TO FETCH !!!
{
    // HERE
    const taskState = task.state;
    // return props.project.states.filter(state => state.name === taskState)[0].color;
    let state = props.states.filter(s => s.name === taskState);
    if (state.length > 0)
        return state[0].color;
    else
        return "";
}

function getPriorityColorFromTask(priority)
{
    var resultColor = '';
    switch (priority)
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

function addTaskForCategory(categoryName)
{
    const newTask = { //yet an empty one
        name: "Empty Task",
        state: props.defaultState,
        category: categoryName,
        description: "This is an empty task ...",
        priority: "Low"
    }

    // HERE
    // modify this in 2 ways: 
    // - correctly target tge tasks reference
    // - add it to the database ...
    props.project.tasks.push(newTask);
}

function openCategoryDetails(category)
{
    closeActiveModal();
    emits('openCategory', category);
}

function openTaskDetails(task)
{
    closeActiveModal();
    emits('openTask', task);
}

function taskIsNotOpened(taskName)
{
    if (props.openedItem)
    {
        return !(taskName === props.openedItem.name);
    }
    return true;
}

// Drag event handlers
function pickTaskItem(task)
{
    emits('pickTask', task);
}
function dropTaskItem(task)
{
    emits('dropTask'); //nothing to pass (as task was saved in a tmp var)
}

function enterCategory()
{
    emits('currentCategoryHolder', props.srcCategory.name);
}

// State switching handlers
function openStateModal(task)
{
    emits('updateModalTask', task);
}
function taskStateClicked(task)
{
    return props.activeModalTask && props.activeModalTask.name === task.name;
}
function closeActiveModal()
{
    emits('updateModalTask', null);
}

function updateTaskState(task, state)
{
    task.state = state.name;
    closeActiveModal();
}
// Handling global click detection (to close modal)
function clickOutModal(event)
{
    if (!event.target.closest('.task-modal-state'))
        emits('updateModalTask', null);
}

onMounted( async () => {
    window.addEventListener('click', clickOutModal);
    tasks.value = await fetchTasksForCategory(props.srcCategory.id);
    // console.log("##### Tasks are -\n", JSON.stringify(tasks.value),"\n#####");
})
onUnmounted( () => {
    window.removeEventListener('click', clickOutModal);
})
</script>
  
<!-- LOCAL STYLES -->
<style>
.project-item {
    display: flex;
    flex-direction: column;
    width: 232px;
    min-width: 232px;
    height: calc(100% - 16px);
    border-radius: 16px;
    box-shadow: 2px 2px 4px var(--main-shadow-color);
    border: solid 2px transparent;
    padding: 8px 0px;

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
    /* padding-top: 16px; */
    padding: 16px 8px 0px 8px;
    display: flex;
    flex-direction: column;

    overflow-x: visible;
    overflow-y: scroll;
}
.project-item-body::-webkit-scrollbar {
  display: none;
}
.project-item-body {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
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
    width: 80%;
    align-self: center;
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
    position: relative;
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

    transition: all 0.25s ease;
}
.task-name {
    width: 80%;
}
.project-task:hover {
    box-shadow: none;
    border: solid 2px var(--main-dark-brown-16);
    border-radius: 16px;
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

    border: solid 2px transparent;
    border-radius: 16px;

    padding: 2px 16px;
    width: fit-content;
}
.task-state:hover {
    border: solid 2px var(--main-dark-brown-16);
}
.task-state:active {
    border: solid 2px var(--main-dark-brown);
}
.task-priority {
    width: 12px;
    height: 12px;
    border: solid 1px var(--main-dark-brown-32);
    border-radius: 16px;
}

.notOpenedTask {
    opacity: 0.32;
}

.task-modal-state {
    position: absolute;
    bottom: -160px; /* should have something dynamic here ...*/
    z-index: 5;

    width: calc( 100% - 32px);
    height: fit-content;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;

    background-color: var(--main-light-beige);
    padding: 8px 8px 12px 8px;
    color: var(--main-dark-brown);
    font-size: 20px;

    border: solid 2px var(--main-brown-32);
    border-radius: 8px;
}

.modal-state-list {
    display: flex;
    flex-direction: column;

    width: 80%;

    justify-content: center;
    align-items: center;

    gap: 8px;
}
.modal-state-item {
    color: var(--main-dark-brown);
    width: 100%;
    font-size: 16px;

    display: flex;
    justify-content: center;
    padding: 2px 0;

    border: solid 2px transparent;
    border-radius: 16px;
}
.modal-state-item:hover {
    border-color: var(--main-dark-brown-32);
}
.modal-state-item:active {
    transform: scale(0.9);
}
.active-modal-state {
    border-color: var(--main-dark-brown);
}
</style>