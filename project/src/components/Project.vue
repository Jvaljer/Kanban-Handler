<template>
    <div class="project-container container">
        <div class="project">
            <!-- TODO  -->
             {{ project.name }}
        </div>
    </div>
</template>
  
  
<!-- LOCAL SCRIPT -->
<script setup>

const props = defineProps({
    project: {
        type: Object,
        required: true
    }
});

</script>
  
<!-- LOCAL STYLES -->
<style>
.project-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.project {
    padding: 16px;
    width: calc(90% - 32px);
    height: calc(90% - 32px);
    border: solid 2px var(--main-beige-16);
    border-radius: 8px;
    background-color: var(--main-beige-08);
}
</style>