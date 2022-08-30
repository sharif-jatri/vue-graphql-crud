<template>
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
import allPostsQuery from '../graphql/posts/allPosts.query.gql'
import deletePostMutation from '../graphql/posts/deletePost.mutation.gql'

import SignupForm from "@/components/SignupForm";
import JsonServerList from "@/components/JsonServerList";
import {computed} from "vue";

export default {
  name: 'OnlineServerList',
  components: {JsonServerList, SignupForm},
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

