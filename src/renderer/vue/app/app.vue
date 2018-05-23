<template>
    <div id="app" 
         class="col">
        <main-/>
    </div>
</template>
<script>
import main from './main.vue';

export default {
    name: 'app',
    components: {
        ...'./main.vue',
        // 'main-': main
    },
    mounted() {},
    methods: {},
};
</script>
