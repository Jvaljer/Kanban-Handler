<template>
    <div class="login-container">
        <div class="login-box">
            <div class="login-box-content">
                <div class="login-box-content-field">
                    <span class="login-field-title urbanist">Username</span>
                    <input class="login-field-input" type="text" placeholer=". . ."/>
                    <a href="" class="login-content-link urbanist">Not an user yet ?</a>
                </div>
                <div class="login-box-content-field">
                    <span class="login-field-title urbanist">Password</span>
                    <input class="login-field-input" type="text" placeholer=". . ."/>
                    <a href="" class="login-content-link urbanist">Forgot your password ?</a>
                </div>
                <button class="login-button urbanist" @click="">Sign In</button>
            </div>
        </div>
    </div>

    <SignIn hidden/>
    <ForgotPassword hidden/>
</template>
  
  
<!-- LOCAL SCRIPT -->
<script setup>
import SignIn from './SignIn.vue';
import ForgotPassword from './ForgotPassword.vue';

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
    overflow: visible;
}
.login-box {
    background: url('@/assets/background-images/login-bg.png');
    width: 416px;
    height: 576px;
    box-shadow: 8px 8px 8px var(--main-shadow-color);
    border-radius: 104px 104px 32px 32px;

    scale: 0.8; /* check if better full-size of divided ... */
}
.login-box-content {
    margin-top: 200px;
    padding: 56px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}
.login-box-content-field {
    display: flex;
    flex-direction: column;
    gap: 4px;
}
.login-field-title {
    color: var(--main-light-beige);
    font-size: 32px;
    font-weight: var(--urbanist-semibold);
}
.login-content-link {
    color: var(--main-light-beige);
    opacity: 0.64;
    text-align: right;
    font-size: 20px;
}
.login-field-input {
    background-color: var(--main-light-beige);
    border: none;
    border-radius: 16px;
    padding: 8px;
    font-size: 24px;
    text-align: top;
    opacity: 0.32;
}
.login-button {
    width: fit-content;
    margin-top: 16px;
    font-size: 24px;
    padding: 8px 16px;
    border: none;
    border-radius: 16px;
    font-weight: bold;
    background-color: var(--main-light-beige);
    color: var(--main-beige);
    opacity: 0.64;

    transition: opacity 0.3s ease, padding 0.3s ease, border-radius 0.3s ease;
}
.login-button:hover {
    opacity: 1;
    padding: 8px 24px;
    border-radius: 32px;
}
</style>