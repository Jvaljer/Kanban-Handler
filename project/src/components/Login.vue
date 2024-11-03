<template>
    <!-- Toast display -->
    <div v-if="showToast"class="urbanist" :class="['toast', toastColor]">{{ toastMessage }}</div>
    <!-- Login Component -->
    <div class="login-container container">
        <div class="login-box">
            <div class="login-box-content">
                <div class="login-box-content-field">
                    <span class="login-field-title urbanist">Username</span>
                    <input v-model="username"
                        class="login-field-input"
                        :class="{ 'field-input-error': loginFailed }"
                        type="text"/>
                    <a href="" class="login-content-link urbanist">Not an user yet ?</a>
                </div>
                <div class="login-box-content-field">
                    <span class="login-field-title urbanist">Password</span>
                    <div class="login-password-field-container">
                        <input v-model="password"
                            class="login-field-input"
                            :class="{ 'field-input-error': loginFailed }"
                            :type="showPassword ? 'text' : 'password'" />
                        <button type="button" class="toggle-password-button" @click="togglePassword">
                            <img class="toggle-password-icon" :src="showPassword ? eyeCloseIcon : eyeOpenIcon" alt="Toggle Password Visibility" />
                        </button>
                    </div>
                    <a href="" class="login-content-link urbanist">Forgot your password ?</a>
                </div>
                <button class="login-button urbanist" @click="tryLogin">Sign In</button>
            </div>
        </div>
    </div>

    <SignIn v-if="showSignIn"/>
    <ForgotPassword v-if="showForgotPassword"/>
</template>

<!-- LOCAL SCRIPT -->
<script setup>
import SignIn from './SignIn.vue';
import ForgotPassword from './ForgotPassword.vue';
import { ref, defineEmits } from 'vue';

import eyeOpenIcon from '@/assets/icons/eye-open.png';
import eyeCloseIcon from '@/assets/icons/eye-close.png';

// Emit function setup
const emit = defineEmits(['userConnect']);

// Instantiating reactive variables
const username = ref('');
const password = ref('');
const loginFailed = ref(false);
const showToast = ref(false);
const toastMessage = ref('');
const toastColor = ref('');
const showPassword = ref(false);


function checkUserInfos(username, password)
{
    return (username=="ahenry" && password=="azerty1234");
}

function tryLogin()
{
    // Attempt to log in with provided credentials
    if (checkUserInfos(username.value, password.value))
    {
        toastMessage.value = "Informations Correct";
        toastColor.value = "green"; // success toast color
        loginFailed.value = false;

        emit('userConnect', username.value);
    }
    else
    {
        toastMessage.value = "Informations are incorrect ...";
        toastColor.value = "red"; // error toast color
        loginFailed.value = true;
    }

    showToast.value = true;
    setTimeout(() => showToast.value = false, 3000); // Hide toast after 3 seconds
}

function togglePassword()
{
    showPassword.value = !showPassword.value;
}

function showSignIn()
{
    // TODO
}
function showForgotPassword()
{
    // TODO
}
</script>
  
<!-- LOCAL STYLES -->
<style>
.login-container {
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    overflow: visible;
}
.login-box {
    background: url('@/assets/background-images/login-bg.png');
    width: 416px; /* would be better relative */
    height: 576px; /* would be better relative */
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
    background-color: var(--main-light-beige-32);
    color: var(--main-dark-brown-64);
    border: none;
    border-radius: 16px;
    padding: 8px;
    font-size: 24px;
    text-align: top;
}
.field-input-error {
    color: var(--item-dark-red);
    border-bottom: 2px solid var(--item-dark-red);
    padding: 7px 8px;
}
.login-button {
    width: fit-content;
    margin-top: 16px;
    font-size: 24px;
    padding: 8px 16px;
    border: none;
    border-radius: 16px;
    font-weight: var(--urbanist-semibold);
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
.login-button:active {
    background-color: var(--main-light-beige-64);
}

/* Toast styling */
.toast {
    position: fixed;
    top: 16px;
    right: 16px; /* Should be properly centered. */
    padding: 16px 32px;
    border-radius: 8px;
    font-size: 24px;
}
.toast.green {
    background-color: var(--item-bright-green);
    border: solid 2px var(--item-dark-green);
    color: var(--item-dark-green);
}
.toast.red {
    background-color: var(--item-bright-red);
    border: solid 2px var(--item-dark-red);
    color: var(--item-dark-red);
}
.login-password-field-container {
    display: flex;
    align-items: center;
    position: relative;
}
.toggle-password-button {
    background: none;
    border: none;
    color: var(--main-light-beige);
    font-size: 16px;
    cursor: pointer;
    position: absolute;
    right: 8px;
}
.toggle-password-icon {
    width: 32px;
    opacity: 0.64;
}
</style>