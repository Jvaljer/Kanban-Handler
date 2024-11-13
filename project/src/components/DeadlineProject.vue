<template>
    <div class="deadline-project-container urbanist"
        :class="{ 'short-deadline-border': deadlineCount<=3 }">
        <div class="deadline-header"
            :class="{ 'short-deadline-color': deadlineCount<=3 }"
        >
            {{ project.name }}
        </div>

        <div class="deadline-body">
             <span class="deadline-count"
                :class="{ 'short-deadline-color': deadlineCount<=3 }"
             >
                {{ deadlineCount }} days left
            </span>
             <div class="deadline-categories">
                <div v-for="category in project.categories"
                    :key="category.name"
                    class="deadline-category-count"
                    :style="{ 'backgroundColor': getCategoryColor(category) }"
                >
                    {{ category.unfinishedTasks }}
                </div>
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
    },
    deadlineCount: {
        type: Number,
        required: true
    }
});

function getCategoryColor(category)
{
    return category.color;
}
</script>
  
<!-- LOCAL STYLES -->
<style>
.deadline-project-container {
    display: flex;
    flex-direction: column;

    border-radius: 16px;
    border: solid 4px var(--main-beige-56);
    overflow: hidden;
}

.short-deadline-border {
    border: solid 4px var(--item-bright-red);
}
.short-deadline-color {
    color: var(--item-dark-red);
    opacity: 0.8;
}

.deadline-header {
    width: 100%;
    padding: 8px;
    font-size: 24px;
    border-bottom: solid 2px var(--main-beige-56);

    font-weight: 550;
}

.deadline-body {
    display: flex;
    padding: 8px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.deadline-count {
    font-size: 24px;
}

.deadline-categories {
    display: flex;
    flex-flow: column wrap;
    height: 144px;
    gap: 8px;
    margin-top: 16px;
    margin-bottom: 8px;
}
.deadline-category-count {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    border-radius: 16px;
    border: solid 2px var(--main-dark-brown-64);
    color: var(--main-dark-brown-80);

    font-weight: 600;
    font-size: 32px;

    width: 64px;
    height: 64px;
}
</style>