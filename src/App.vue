<template>
  <img alt="Vue logo" src="./assets/logo.png">
<!--  <label>https://www.youtube.com/watch?v=UbYt1PokMrM</label>-->
  <ul>
    <li v-for="post in allPosts" :key="post.id">
        <h4>{{ post.id }}</h4>
        <h4>{{ post.title }}</h4>
      <button @click="deleteAndUpdateCache(post.id)">Delete</button>
    </li>
  </ul>
</template>

<script>

import {useQuery, useMutation} from '@vue/apollo-composable'
import allPostsQuery from '../src/graphql/posts/allPosts.query.gql'
import deletePostMutation from '../src/graphql/posts/deletePost.mutation.gql'

import {computed} from "vue";

export default {
  name: 'App',
  components: {},
  setup(){
    const {result} = useQuery(allPostsQuery)
    const allPosts = computed(() => result.value?.posts.data ?? []);

    const { mutate: deletePost } = useMutation(deletePostMutation)

    function deleteAndUpdateCache(id){
      deletePost({ id }, {
        update: (store, {}) => {
          const data = store.readQuery({query: allPostsQuery})
          const updateData = data.posts.data.filter(post => post.id !== id)
          store.writeQuery({query: allPostsQuery, data: { data: updateData }})
        }
      }
      )}

    return {
      allPosts,
      deletePost,
      deleteAndUpdateCache
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
