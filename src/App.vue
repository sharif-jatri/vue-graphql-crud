<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <ul>
    <li v-for="character in characters" :key="character.id">
        {{ character.name }}
    </li>
  </ul>
</template>

<script>

import {useQuery} from '@vue/apollo-composable'
import allCharactersQuery from '../src/graphql/allCharacters.query.gql'
import {computed} from "vue";

export default {
  name: 'App',
  components: {},
  setup(){
    const {result} = useQuery(allCharactersQuery)
    const characters = computed(() => result.value?.characters.results ?? []);
    return {
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
