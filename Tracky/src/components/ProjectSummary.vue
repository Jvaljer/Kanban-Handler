<template>
    <div class="project-summary-container urbanist hover-pointer">
        <span class="summary-header">{{ project.name }}</span>
        <div class="summary-body">
            <span class="summary-deadline">{{ project.deadline }}</span>
            <div class="summary-categories">
                <span v-for="category in categories"
                    class="summary-category-count"
                    :style="{ 'backgroundColor': category.color }"
                    @click="openProjectWithDetail(project.name, category.name)"
                >
                    {{ category.unfinishedTasks }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
const propos = defineProps({
    project: {
        type: Object,
        required: true
    },
    categories: {
        type: Array,
        required: true
    }
})

const emits = defineEmits(['openProjectCategory']);

function openProjectWithDetail(projectName, categoryName)
{
    emits('openProjectCategory', projectName, categoryName);
}
</script>

<style>
.project-summary-container {
    display: flex;
    flex-direction: column;
    border-radius: 16px;
    border: solid 2px var(--main-beige-56);
    background-color: var(--main-light-beige);
    overflow: hidden;
    transition: all 0.25s ease;

    & .summary-header {
        width: 100%;
        padding: 8px;
        font-size: 24px;
        border-bottom: solid 2px var(--main-beige-56);
        font-weight: 550;
    }

    & .summary-body {
        display: flex;
        padding: 8px;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        & .summary-deadline {
            font-size: 24px;
        }

        & .summary-categories {
            display: flex;
            flex-flow: column wrap;
            height: 144px;
            gap: 8px;
            margin-top: 16px;
            margin-bottom: 8px;

            & .summary-category-count {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                border-radius: 8px;
                border: solid 2px var(--main-dark-brown-64);
                color: var(--main-dark-brown-80);
                font-weight: 600;
                font-size: 32px;
                width: 64px;
                height: 64px;
                transition: all 0.25s ease;

                &:hover {
                    border-radius: 16px;
                }
                &:active {
                    transform: scale(0.95);
                }
            }
        }
    }

    &:hover {
        transform: scale(1.025);
        border-radius: 20px;
    }
}
</style>