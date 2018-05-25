<template>
    <div>
        <button @click="fbLogin">
            Login with Facebook
        </button>
    </div>
</template>
<script>
import { ipcRenderer } from 'electron';

export default {
    methods: {
        fbLogin() {
            const abc = ipcRenderer.sendSync('facebook login');
            console.log(abc);
        },
    },
};
</script>
