<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import {ref} from "vue";
import {useQuery} from '@vue/apollo-composable'
import allCharactersQuery from '../src/graphql/allCharacters.query.gql'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  setup(){
    const message = ref('hello')
    const {result} = useQuery(allCharactersQuery)
    console.log(result)
    const characters = ref(result)
    console.log(characters)


    return {
      message,
      characters
    }
  },

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
