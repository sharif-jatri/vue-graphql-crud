<template>
  <img alt="Vue logo" src="./assets/logo.png">
<!--  <label>https://www.youtube.com/watch?v=UbYt1PokMrM</label>-->
<!--  <label>https://dev.to/aaronksaunders/graphql-vue-composition-api-with-apollo-composable-3kk4</label>-->
<!--  <label>json-graphql-server db.js --p 3015</label>-->
  <SignupForm />
  <hr />
  <h1>JSON server</h1>
  <JsonServerList />
  <hr />
  <h1>OnlineServerList</h1>
  <OnlineServerList />
</template>

<script>
import SignupForm from "@/components/SignupForm";
import JsonServerList from "@/components/JsonServerList";
import OnlineServerList from "@/components/OnlineServerList";

export default {
  name: 'App',
  components: {OnlineServerList, JsonServerList, SignupForm}
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
