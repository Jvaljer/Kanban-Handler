<template>
    <div class="project-details">

        <div class="details-header">
            <div class="details-header-infos">
                <span class="detail-item-type">{{ itemIsTask ? "Task" : "Category" }}</span>
                <span class="detail-item-name">{{ item.name }}</span>
            </div>
            <div class="detail-header-buttons">
                <button class="detail-button"
                    @click="applyChanges"
                >
                    Apply
                </button>
                <button class="detail-button"
                    @click="closeItem"
                >
                    Close
                </button>
            </div>
        </div>

        <div class="details-body">
            <div v-if="itemIsTask" class="details-body-task-properties">
                <!-- TODO:
                    * If task then show -> State, Priority, Description.
                -->
                <div class="details-body-property">
                    <span class="details-body-property-name">State:</span>
                    <div class="details-body-property-value">
                        <div v-for="state in states" class="details-body-property-value-item">
                            <span class="details-body-property-value-item-name"
                                :class="(state.name===currentState) ? 'selected-state' : 'unselected-state'"
                                @click="selectState(state)"
                            >
                                {{ (state.name===currentState) ? state.name : "" }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="details-body-property">
                    <span class="details-body-property-name">Priority:</span>
                    <span class="details-body-property-value">{{ item.priority }}</span>
                </div>
                <div class="details-body-property"> <!-- Might need to be a textarea & different style -->
                    <span class="details-body-property-name">Description:</span>
                    <span class="details-body-property-value">{{ item.description }}</span>
                </div>
            </div>
            <div v-if="!itemIsTask" class="details-body-category-properties">
                <!-- TODO:
                    * If category then show -> Color, Description.
                -->
                <div class="details-body-property">
                    <span class="details-body-property-name">Color:</span>
                    <span class="details-body-property-value">{{ item.color }}</span>
                </div>
                <div class="details-body-property"> <!-- Might need to be a textarea & different style -->
                    <span class="details-body-property-name">Description:</span>
                    <span class="details-body-property-value">{{ item.description }}</span>
                </div>
            </div>

            <div class="details-body-insights">
                <!-- TODO:
                    * If task then show NOTES.
                    * If category then show FINISHED-TASKS.
                -->
                <div v-if="itemIsTask" class="details-body-task-insight">

                </div>
                <div v-if="!itemIsTask" class="details-body-category-insight">

                </div>
            </div>
        </div>
    </div>
</template>
  
  
<!-- LOCAL SCRIPT -->
<script setup>
import { ref } from 'vue';

const props = defineProps({
    item: {
        type: Object,
        required: true
    },
    states: {
        type: Array,
        required: true
    },
    currentState: {
        type: String,
        required: true
    },
    tasks: {
        type: Array,
        required: true
    },
    itemIsTask: {
        type: Boolean,
        required: true
    }
})

const emits = defineEmits(['closeItem']);

const currentState = ref(props.currentState);

function applyChanges()
{
    // TODO : fetch all changes in below sections and modify DB
}

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
.detail-header-buttons {
    display: flex;
    flex-direction: row;
    gap: 8px;
}
.detail-button {
    height: fit-content;
    font-size: 16px;
    color: var(--main-dark-brown-80);
    border: solid 1px var(--main-dark-brown-80);
    border-radius: 32px;
    padding: 8px 16px;
    background: transparent;

    transition: all 0.33s ease;
}
.detail-button:hover {
    transform: scale(1.05);
}
.detail-button:active {
    background: var(--main-brown-32);
    transform: scale(1);
}

/* BODY STYLES */
.details-body {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 32px;
}
.details-body-task-properties {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    gap: 16px;
    justify-content: space-between;
    width: 100%;
    padding-bottom: 32px;
    border-bottom: solid 1px var(--main-dark-brown-16);
}
.details-body-property {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 8px;
    background: var(--main-brown-16);
}

.details-body-category-properties {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    gap: 16px;
    justify-content: start;
    width: 100%;
    padding-bottom: 32px;
    border-bottom: solid 1px var(--main-dark-brown-16);
}

</style>