<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title"/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
  html{
    height: 100%;
    padding: 0;
    margin: 0
  }
  body{
    padding: 0;
  }
	#app {
    height: 100%;
	}
</style>