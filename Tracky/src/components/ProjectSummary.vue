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
        type: Object,
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
</style>