<template>
    <div class="login-container">
        <div class="login-box">
            <!-- TODO -->
        </div>
    </div>
</template>
  
  
<!-- LOCAL SCRIPT -->
<script setup>
console.log("LOGIN loaded ...");
</script>
  
<!-- LOCAL STYLES -->
<style>
.login-container {
    height: 100vh;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
}
.login-box {
    background: url('@/assets/background-images/login-bg.png');
    width: 416px;
    height: 576px;
    box-shadow: 8px 8px 8px var(--main-shadow-color);
    border-radius: 104px 104px 32px 32px;
}
</style>