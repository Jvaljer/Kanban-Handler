<template>
     <div class="dashboard-container container">
        <div class="dashboard">
            <div class="dashboard-left">
                <div class="dashboard-upcoming-deadlines">
                    <ProjectSummary v-for="project of sortedProjects"
                        :project="project"
                        :categories="categories"
                        @openProjectCategory="openProjectCategory"
                    />
                </div>
                <div class="dashboard-graph">
                    <!-- TODO  -->
                </div>
            </div>
            <div class="dashboard-right">
                <div class="dashboard-welcome-card">
                    <span class="dashboard-welcome-card-title urbanist">
                        Hello {{ username }} 👋
                    </span>
                    <span class="dashboard-welcome-card-subtitle urbanist">
                        Welcome Back !
                    </span>
                </div>
                <div class="dashboard-most-productive">
                    <!-- TODO  -->
                     TODO
                </div>
            </div>
        </div>  
     </div>
</template>
  
  
<!-- LOCAL SCRIPT -->
<script setup>
import { ref } from 'vue';
// import DeadlineProject from './DeadlineProject.vue';
import ProjectSummary from './ProjectSummary.vue';

const props = defineProps({
    todayDate: {
        type: String,
        required: true
    },
    projects: {
        type: Array,
        required: true
    },
    categories: {
        type: Array,
        required: true
    },
    username: {
        type: String,
        required: true
    }
});

const emits = defineEmits(['openProjectCategory']);

const sortedProjects = ref(getSortedProjects());
console.log("sorted projects - ",sortedProjects.value);

function getSortedProjects()
{
    if (!props.projects) return [];

    const sorted = props.projects.slice().sort((p1,p2) => {
        const [d1, m1, y1] = p1.lastOpen.split("-");
        const date1 = new Date(`${y1}-${m1}-${d1}`);

        const [d2, m2, y2] = p2.lastOpen.split("-");
        const date2 = new Date(`${y2}-${m2}-${d2}`);

        return date2 - date1;
    });

    return sorted;
}

function getLastOpenedProject()
{
    // Here must get the projects that have the closest 'lastOpen' date
        // Then how to select ??
    // TODO 
}

function openProjectCategory(projectName, categoryName)
{
    emits('openProjectCategory', projectName, categoryName);
}
</script>
  
<!-- LOCAL STYLES -->
<style>
.dashboard-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.dashboard {
    display: flex;
    flex-direction: row;
    padding: 16px;
    width: calc(90% - 32px);
    height: calc(90% - 32px);
    border: solid 2px var(--main-beige-16);
    border-radius: 8px;
    background-color: var(--main-beige-08);
}
.dashboard-left {
    flex-grow: 0.8;
    padding: 24px 24px;
    display: flex;
    flex-direction: column;
}
.dashboard-right {
    flex-grow: 0.2;
    display: flex;
    flex-direction: column;
    align-items: end;
}
.dashboard-upcoming-deadlines {
    display: flex;
    flex-direction: row;

    padding-bottom: 48px;
    margin-right: 48px;
    border-bottom: solid 2px var(--main-dark-brown-32);
}

.dashboard-welcome-card {
    display: flex;
    flex-direction: column;
    text-align: right;
}
.dashboard-welcome-card-title {
    font-size: 48px;
    font-weight: var(--urbanist-semibold);
}
.dashboard-welcome-card-subtitle {
    font-size: 32px;
}

.dashboard-most-productive {
    width: 100%;
    flex-grow: 1;
    border-left: solid 2px var(--main-dark-brown-32);

    display: flex;
    flex-direction: column;
    
}
</style>