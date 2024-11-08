<template>
    <button class="resize-navbar-button" 
        @click="toggleNavbar"
        :class="{ 'resize-collapse': isCollapsed}"
    >
        <img :class="{'resize-icon-collapse': isCollapsed}"
            src="@/assets/icons/double-arrow.png">
    </button>
    <div 
        class="navbar-container container urbanist"
        :class="{ 'navbar-collapsed': isCollapsed}"
    >
        <div class="navbar-container-header">
            <img class="navbar-header-user-icon" src="@/assets/icons/user-icon.png" @click="backHome"/>
            <span class="navbar-header-user-name"
                v-show="!isCollapsed"
            >
                {{ username }}
            </span>
        </div>
        <div class="navbar-container-content">
            <!-- Here show the user's projects fetched from database -->
            <button 
                v-for="project in projects"
                :key="project.name"
                class="navbar-project-item navbar-content-item"
                :class="{ 'item-collapsed': isCollapsed }"
                @click="openProject(project.name)"
            >
                {{ project.name }}
        </button>
            <button
                class="navbar-create-item-button navbar-content-item"
                :class="{ 'item-collapsed': isCollapsed}"
            >
                Create New Project
            </button>
        </div>
        <div
            class="navbar-container-footer"
            :class="{ 'navbar-footer-colllapsed': isCollapsed }"
        >
            <span class="navbar-footer-credits"
                v-show="!isCollapsed"
            >
                Kanban Handler, v0.0<br>by Jvaljer
            </span>
            <div class="navbar-footer-buttons">
                <button class="navbar-action-button">
                    <img alt="Help" title="Help & Tips" class="navbar-action-button-image" src="@/assets/icons/help-icon.png"/>
                </button>
                <button class="navbar-action-button">
                    <img alt="Documentation" title="Documentation" class="navbar-action-button-image" src="@/assets/icons/doc-icon.png"/>
                </button>
            </div>
        </div>
    </div>
</template>
  
  
<!-- LOCAL SCRIPT -->
<script setup>
import { ref } from 'vue';

const isCollapsed = ref(false);

const props = defineProps({
    username: {
        type: String,
        required: true
    },
    projects: {
        type: Array,
        required: true
    }
});

const emits = defineEmits(['toggleNavbar', 'openProject', 'backHome']);

function toggleNavbar()
{
    isCollapsed.value = !isCollapsed.value;
    emits('toggleNavbar');
}

function openProject(projectName)
{
    console.log("NAVBAR -> openProject("+projectName+")");
    emits('openProject', projectName);
}

function backHome()
{
    emits('backHome');
}
</script>
  
<!-- LOCAL STYLES -->
<style>
.resize-navbar-button {
    padding-top: 2px;
    padding-bottom: 0px;
    position: absolute;
    top: 16px;
    border: none;
    border-radius: 50%;
    background-color: transparent;
    color: var(--main-beige);
    font-size: 24px;
    letter-spacing: -4px;
    left: 304px;
    transition: left 0.25s ease-in;
}
.resize-navbar-button:hover, .resize-icon-collapse {
    transform: scale(0.8);
}
.resize-collapse {
    rotate: 180deg;
    padding-top: 4px;
    padding-bottom: 0px;
    left: 152px;
}
.resize-navbar-button:hover {
    color: var(--main-dark-brown-64);
}
.navbar-container {
    width: 304px;
    background: url('@/assets/background-images/navbar-bg.png');
    border-right: solid 2px var(--main-beige);
    display: flex;
    flex-direction: column;

    transition: width 0.25s ease-in;
}
.navbar-collapsed {
    width: 152px;
}

/* HEADER STYLES */
.navbar-container-header {
    width: 100%;
    padding: 16px 0;
    gap: 16px;

    display: flex;
    flex-direction: row;

    justify-content: center;
    align-items: center;

    height: fit-content;
    border-bottom: solid 1px var(--main-beige);
}
.navbar-header-user-icon {
    width: 64px;
}
.navbar-header-user-icon:hover {
    cursor: pointer;
    transform: scale(1.1);
}
.navbar-header-user-name {
    font-size: 32px;
    color: var(--main-dark-brown-80);
}

/* CONTENT STYLES */
.navbar-container-content {
    flex-grow: 1;
    overflow-y: auto;
    padding: 8px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
}
.navbar-project-item {
    background: none;
    width: 100%;
    padding: 16px;
    font-size: 20px;
    color: var(--main-dark-brown-64);
    border: solid 2px var(--main-dark-brown-64);
    border-radius: 8px;
    text-align: left;

    transition: border-radius 0.25s ease, padding 0.25s ease, font-size 0.25s ease;
}
.navbar-project-item:hover, .navbar-create-item-button:hover {
    background-color: var(--main-dark-brown-16);
    border-radius: 12px;
}
.item-collapsed {
    font-size: 20px;
    padding: 16px 12px;
}

.navbar-create-item-button {
    width: 100%;
    padding: 16px;
    font-size: 20px;
    text-align: left;
    background-color: transparent;
    color: var(--main-dark-brown-32);
    border: solid 2px var(--main-dark-brown-32);
    border-radius: 8px;

    transition: border-radius 0.25s ease, padding 0.25s ease, font-size 0.25s ease;
}
.navbar-content-item {
    margin-top: 4px;
    margin-bottom: 4px;
}
/* FOOTER STYLES */
.navbar-container-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    color: var(--main-dark-brown-32);
    border-top: solid 2px var(--main-beige);
}
.navbar-footer-colllapsed {
    justify-content: center;
}
.navbar-footer-buttons {
    display: flex;
    flex-direction: row;
    gap: 8px;
}
.navbar-action-button {
    border: 0px;
    background: none;
}
.navbar-action-button:hover {
    transform: scale(1.1);
}
</style>