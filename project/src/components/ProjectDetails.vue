<template>
    <div class="project-details">
        <span v-show="itemIsTask">TASK</span>
        <span v-show="!itemIsTask">CATEGORY</span>
        <div class="details-content">Hello There</div>
        <button class="close-details"
            @click="closeItem"
        >
            X
        </button>
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
    background-color: var(--main-light-beige);
    border: solid 2px var(--main-beige-32);
    border-radius: 16px;
}
</style>