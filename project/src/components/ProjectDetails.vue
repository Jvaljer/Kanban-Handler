<template>
    <div class="project-details">

        <div class="details-header">
            <div class="details-header-infos">
                <span class="detail-item-type">{{ itemIsTask ? "Task" : "Category" }}</span>
                <span class="detail-item-name">{{ item.name }}</span>
            </div>
            <button class="detail-close-button"
                @click="closeItem"
            >
                Close
            </button>
        </div>

        <div class="details-body">
            <div class="details-visualisations">
                <!-- TODO -->
            </div>
            <div class="details-item-settings item-task-settings"
                v-if=itemIsTask
            >
                <!-- TODO: PAINFUL -->
            </div>
            <div class="details-item-settings item-category-settings"
                v-if=!itemIsTask
            >
                <!-- TODO: PAINFUL -->
            </div>
        </div>

        <div class="details-footer">
            <!-- yet unecessary -->
        </div>
    </div>
</template>
  
  
<!-- LOCAL SCRIPT -->
<script setup>
const props = defineProps({
    item: {
        type: Object,
        required: true
    },
    itemIsTask: {
        type: Boolean,
        required: true
    }
})

const emits = defineEmits(['closeItem']);

function closeItem()
{
    emits('closeItem');
}
</script>
  
<!-- LOCAL STYLES -->
<style>
.project-details {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background-color: var(--main-brown-04);
    border-radius: 16px;
    padding: 16px;
}

/* HEADER STYLES */
.details-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 16px;
    border-bottom: solid 1px var(--main-dark-brown-16);
}
.details-header-infos {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.detail-item-type {
    color: var(--main-brown-64);
    font-style: italic;
    font-size: 24px;
}
.detail-item-name {
    color: var(--main-dark-brown-80);
    font-size: 32px;
}
.detail-close-button {
    height: fit-content;
    font-size: 16px;
    color: var(--main-dark-brown-80);
    border: solid 1px var(--main-dark-brown-80);
    border-radius: 32px;
    padding: 8px 16px;
    background: transparent;

    transition: all 0.33s ease;
}
.detail-close-button:hover {
    transform: scale(1.05);
}
.detail-close-button:active {
    background: var(--main-brown-32);
    transform: scale(1);
}

/* BODY STYLES */
.details-body {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
}
.details-visualisations {
    border-right: solid 1px var(--main-dark-brown-16);
    flex-grow: 1;
}
.details-item-settings {
    background: red;
    height: 100%;
}
</style>