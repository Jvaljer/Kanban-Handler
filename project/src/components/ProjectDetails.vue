<template>
    <div class="project-details">
        <span v-if="itemIsTask">TASK</span>
        <span v-if="!itemIsTask">CATEGORY</span>
        <div class="details-content">Hello There</div>
        <button class="close-details"
            @click="closeItem"
        >
            X
        </button>

        <div class="details-header">
            <!-- TODO -->
        </div>

        <div class="details-body">
            <!-- TODO -->
        </div>

        <div class="details-footer">
            <!-- TODO -->
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
    background-color: var(--main-brown-08);
    border-radius: 16px;
    padding: 16px;
}
</style>