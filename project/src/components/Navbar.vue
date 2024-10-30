<template>
    <button class="resize-navbar-button" 
        @click="switchNavbarSize"
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
            <img class="navbar-header-user-icon" src="@/assets/icons/user-icon.png"/>
            <transition name="fade">
                <span class="navbar-header-user-name"
                    v-show="!isCollapsed"
                >
                    {{ username }}
                </span>
            </transition>
        </div>
        <div class="navbar-container-content">
            <!-- Here show the user's projects fetched from database -->
            <div 
                v-for="(project, index) in projects" 
                :key="index" 
                class="navbar-project-item"
                :class="{ 'item-collapsed': isCollapsed}"
            >
                {{ project.name }}
            </div>
        </div>
        <div class="navbar-container-footer"></div>
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

function switchNavbarSize()
{
    isCollapsed.value = !isCollapsed.value;
}

console.log("NAVBAR loaded ...");
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
    transition: left 0.5s ease-in;
}
.resize-navbar-button:hover, .resize-icon-collapse {
    transform: scale(0.8);
}
.resize-collapse {
    rotate: 180deg;
    padding-top: 4px;
    padding-bottom: 0px;
    left: 98px;
}
.resize-navbar-button:hover {
    color: var(--main-dark-brown-64);
}
.navbar-container {
    width: 304px;
    background: url('@/assets/background-images/navbar-bg.png');
    display: flex;
    flex-direction: column;

    transition: width 0.5s ease-in;
}
.navbar-collapsed {
    width: 96px;
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
    border-bottom: solid 2px var(--main-beige);
}
.navbar-header-user-icon {
    width: 64px;
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
    padding: 16px;
    font-size: 16px;
    color: var(--main-dark-brown-80);
    background-color: var(--main-dark-brown-16-solid);
    border-radius: 8px;
    border: solid 1px var(--main-dark-brown-16-solid);

    transition: background-color 0.25s ease, 
                border-color 0.25s ease, 
                border-radius 0.25s ease;
}
.navbar-project-item:hover {
    background-color: var(--main-dark-brown-08-solid);
    border: solid 1px var(--main-dark-brown-80);
    border-radius: 16px;
}
.item-collapsed {
    padding: 8px;
}

/* FOOTER STYLES */
.navbar-container-footer {
    border-top: solid 2px var(--main-dark-brown-16);
    width: 100%;
    height: 10%;
}

/* TRANSITIONS RELATED STYLES */
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
.fade-enter-to, .fade-leave {
    opacity: 1;
}
</style>