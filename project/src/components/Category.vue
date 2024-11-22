<template>
     <div class="project-item hover-pointer"
        :style="{ backgroundColor: srcCategory.color }"
        @click.stop="openCategoryDetails(srcCategory)"
        @dragenter="enterCategory(srcCategory.name)"
     >

        <div class="project-item-header">
            <span class="project-header-category-name">{{ srcCategory.name }}</span>
            <span class="project-header-tasks-amount">{{ getCategoryTasksCount(srcCategory.name) }} tasks</span>
        </div>

        <div class="project-item-body">
            <!-- Put Tasks in another Component ? -->
            <div v-for="task in getCategoryTasks(srcCategory.name)"
                :key="task.name"
                class="project-task"
                :class="{ 'notOpenedTask': taskIsNotOpened(task.name) && detailsOpened }"
                draggable="true"
                @click.stop="openTaskDetails(task)"
                @dragstart="pickTaskItem(task)"
                @dragend="dropTaskItem(task)"
            > <!-- @dragend="onDragEnd" -->
                <div class="task-header">
                    <span class="task-name">{{ task.name }}</span>
                    <div class="task-priority"
                        :style="{ backgroundColor: getPriorityColorFromTask(task) }"
                    ></div>
                </div>
                <span class="task-description" >{{  task.description }}</span>
                <div class="task-state"
                    :style="{ backgroundColor: getStateColorFromTask(task) }"
                >
                    {{ task.state }}
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

function addTaskForCategory(categoryName)
{
    const newTask = { //yet an empty one
        name: "Empty Task",
        state: props.defaultState,
        category: categoryName,
        description: "This is an empty task ...",
        priority: "Low"
    }

    props.project.tasks.push(newTask);
}

function openCategoryDetails(category)
{
    emits('openCategory', category);
}

function openTaskDetails(task)
{
    emits('openTask', task);
}

function taskIsNotOpened(taskName)
{
    if (props.openedItem)
    {
        console.log("task '"+taskName+"' is '"+props.openedItem.name+"'");
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

.notOpenedTask {
    opacity: 0.32;
}
</style>