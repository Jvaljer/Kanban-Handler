<template>
     <div class="dashboard-container container">
        <div class="dashboard">
            <div class="dashboard-left">
                <div class="dashboard-upcoming-deadlines">
                    <!-- TODO  -->
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
    padding: 16px;
    width: calc(90% - 32px);
    height: calc(90% - 32px);
    border: solid 2px var(--main-beige-16);
    border-radius: 8px;
    background-color: var(--main-beige-08);
}
</style>