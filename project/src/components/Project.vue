<template>
    <div class="project-container container urbanist">
        <div class="project">
            <div class="project-header">
                <div class="project-header-infos">
                    <span class="project-infos-name">{{ project.name }}</span>
                    <div class="project-infos-collaborators">
                        <div v-for="user in project.participants"
                            :key="user"
                            class="project-infos-user-icon"
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
                    class="project-item"
                    :style="{ backgroundColor: category.color }"
                >
                    <div class="project-item-header">
                        <span class="project-header-category-name">{{ category.name }}</span>
                        <span class="project-header-tasks-amount">{{ getCategoryTasksCount(category.name) }} tasks </span>
                    </div>
                    <div class="project-item-body">
                        <!-- TODO -->
                    </div>
                    <div class="project-item-footer">
                        <!-- TODO -->
                    </div>
                </div>
                <div class="project-item project-create-category">
                    <div class="project-item-header create-category-header">
                        <span class="project-header-category-name">New Category</span>
                        <span class="project-header-tasks-amount">click to create !</span>
                    </div>
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

function openProjectParameters()
{
    // TODO
}

function openProjectSettings()
{
    // TODO
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
    padding: 16px;
    width: calc(90% - 4px);
    height: calc(90% - 8px);
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
    border-bottom: solid 2px var(--main-beige);
}
.project-header-infos {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    width: fit-content;
    padding-right: 12px;
    border-right: solid 2px var(--main-beige);
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
    border-left: solid 2px var(--main-beige);
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

/* BODY STYLES */
.project-body {
    flex-grow: 1;
    padding: 16px 4px;

    display: flex;
    flex-direction: row;
    gap: 16px;
}
.project-item {
    width: 224px;
    height: calc(100% - 16px);
    border-radius: 16px;
    box-shadow: 2px 2px 4px var(--main-shadow-color);
    border: solid 1px transparent;
    padding: 8px;

    transition: box-shadow 0.33s ease, border 0.25s ease, border-radius 0.25s ease;
}
.project-item:hover {
    box-shadow: none;
    border: solid 1px var(--main-dark-brown-08);
    border-radius: 24px;
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
.project-create-category:hover .create-category-header {
    border-radius: 16px;
    border-bottom: none;
    background-color: var(--main-dark-brown-08);
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
    opacity: 0.8;
}

/* FOOTER STYLES */
.project-footer {
    display: flex;
    flex-direction: row;
    width: 100%;
    background-color: lightskyblue;
}
</style>