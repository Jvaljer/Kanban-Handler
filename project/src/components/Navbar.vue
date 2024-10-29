<template>
    <button class="resize-navbar-button" @click="switchNavbarSize">{{ isCollapsed ? '>>' : '<<' }}</button>
    <div class="navbar-container container urbanist">
        <div class="navbar-container-header">
            <img class="navbar-header-user-icon" src="@/assets/icons/user-icon.png"/>
            <span class="navbar-header-user-name">{{ username }}</span>
        </div>
        <div class="navbar-container-content"></div>
        <div class="navbar-container-footer"></div>
    </div>
    <!-- TODO -->
</template>
  
  
<!-- LOCAL SCRIPT -->
<script setup>
import { ref } from 'vue';

const isCollapsed = ref(false);

const props = defineProps({
    username: {
        type: String,
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
    position: absolute;
    top: 16px;
    left: 320px; /* Should be less when collapsed */
}
.navbar-container {
    width: 304px; /* must set to less when collapsed */
    background: url('@/assets/background-images/navbar-bg.png');
    display: flex;
    flex-direction: column;
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
    width: 100%;
    flex-grow: 1;
    overflow-y: auto;
}

/* FOOTER STYLES */
.navbar-container-footer {
    border-top: solid 2px var(--main-dark-brown-16);
    width: 100%;
    height: 10%;
}
</style>