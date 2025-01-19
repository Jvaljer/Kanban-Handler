<template>
     <div class="dashboard-container container">
        <div class="dashboard">
            <div class="dashboard-left">
                <div class="dashboard-upcoming-deadlines">
                    <!-- Replace with projects in the latest opened order -->
                    <!-- <DeadlineProject v-for="projectName of deadlineProjects.keys()"
                        :project="deadlineProjects.get(projectName)[0]"
                        :deadlineCount="deadlineProjects.get(projectName)[1]"
                        @openProjectCategory="openProjectCategory"
                    /> -->
                    <ProjectSummary v-for="projectName of sortedProjects.keys()"
                        :project="sortedProjects.get(projectName)[0]"
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
                </div>
            </div>
        </div>  
     </div>
</template>
  
  
<!-- LOCAL SCRIPT -->
<script setup>
import { ref } from 'vue';
import DeadlineProject from './DeadlineProject.vue';

const props = defineProps({
    todayDate: {
        type: String,
        required: true
    },
    projects: {
        type: Object,
        required: true
    },
    username: {
        type: String,
        required: true
    }
});

const emits = defineEmits(['openProjectCategory']);

// Here we wanna calculate a bunch of stuff:
/*
 - The projects that have an upcoming deadline
 - The latest opened project (or the most productive ??)
    + Data to make the graph ...
*/

const deadlineProjects = ref(getUpcomingDeadlinesProjects());

function getUpcomingDeadlinesProjects()
{
    // Project has an upcoming deadline when the deadline is 7 (or less) days far from today.
    var result = new Map();
    
    if (props.projects)
    {
        for (const project of props.projects)
        {
            const deadlineDate = project.deadline;
            if (deadlineDate != "none")
            {
                const [dayNow, monthNow, yearNow] = props.todayDate.split("-");
                const [dayEnd, monthEnd, yearEnd] = deadlineDate.split("-");
                // Month is 0-indexed BUT NOT IN DATE NOW !!
                const dateNow = new Date(yearNow, monthNow, dayNow); 
                const dateEnd = new Date(yearEnd, monthEnd - 1, dayEnd);

                // Difference in milliseconds
                const dateDiffMs = Math.abs(dateEnd - dateNow);

                // Convert milliseconds to days
                const dateDiffDays = dateDiffMs / (1000 * 60 * 60 * 24);

                if (dateDiffDays <= 7)
                {                    
                    result.set(""+project.name, [project, dateDiffDays]);
                }
            }
        }
        
        return result;
    }
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