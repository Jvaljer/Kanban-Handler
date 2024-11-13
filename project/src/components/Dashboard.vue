<template>
     <div class="dashboard-container container">
        <div class="dashboard">
            <div class="dashboard-left">
                <div class="dashboard-upcoming-deadlines">
                    <DeadlineProject v-for="projectName of deadlineProjects.keys()"
                        :project="deadlineProjects.get(projectName)[0]"
                        :deadlineCount="deadlineProjects.get(projectName)[1]"
                    />
                </div>
                <div class="dashboard-graph">
                    <!-- TODO  -->
                </div>
            </div>
            <div class="dashboard-right">
                <div class="dashboard-welcome-card">
                    <span class="dashboard-welcome-card-title">
                        Hello There !
                    </span>
                    <span class="dashboard-welcom-card-subtitle">
                        nice to see you
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
    }
});

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
    
    var result = new Map();;
    
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
</style>