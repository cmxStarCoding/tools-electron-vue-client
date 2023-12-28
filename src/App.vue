<template>
	<img alt="Vue logo" src="./assets/logo.png">
	<HelloWorld msg="Welcome to Your Vue.js App" />
</template>

<script>
// const { remote } = require('electron');
// const mainProcessEnv = remote.getGlobal('process.env');
import HelloWorld from './components/HelloWorld.vue'
// console.log(process.env.VUE_APP_API_URL, 'asdasdasd111')

export default {
	name: 'App',
	components: {
		HelloWorld
	}
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
