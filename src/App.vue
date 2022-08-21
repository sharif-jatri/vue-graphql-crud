<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <ul>
    <li v-for="post in allPosts" :key="post.id">
        <h4>{{ post.id }}</h4>
        <h4>{{ post.title }}</h4>
      <button>Delete</button>
    </li>
  </ul>
</template>

<script>

import {useQuery} from '@vue/apollo-composable'
import allPostsQuery from '../src/graphql/posts/allPosts.query.gql'
import {computed} from "vue";

export default {
  name: 'App',
  components: {},
  setup(){
    const {result} = useQuery(allPostsQuery)
    const allPosts = computed(() => result.value?.posts.data ?? []);

    return {
      allPosts
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
