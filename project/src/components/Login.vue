<template>
    <div class="login-container">
        <div class="login-box">
            <div class="login-box-content">
                <div class="login-box-content-field">
                    <span class="login-content-username">Username</span>
                    <input type="text" placeholer=". . ."/>
                    <a class="login-content-register-link">Not an user yet ?</a>
                </div>
                <div class="login-box-content-field">
                    <span class="login-content-password">Password</span>
                    <input type="text" placeholer=". . ."/>
                    <a class="login-content-password-link">Forgot your password ?</a>
                </div>
            </div>
            <button class="login-button"></button>
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