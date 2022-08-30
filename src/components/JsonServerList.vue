<template>
  <div>
    <button >ADD POST</button>
    <div v-if="loading">
      <h2>Loading</h2>
    </div>
    <div v-else-if="error">
      <h2>{{error}}</h2>
    </div>
    <div v-else>
      <h2>Query Results</h2>
      <div v-for="p in result.allPosts" :key="p.id">{{p.title}}</div>
    </div>
    <div>
      <input type="text" v-model="title" placeholder="enter the title" />
      <button @click="addPost">ADD POST</button>
    </div>
  </div>
</template>

<script>
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@vue/apollo-composable";
import {ref} from "vue";


// QUERY
const ALL_POST_QUERY = gql`
  {
    allPosts {
      id
      title,
      user_id
    }
  }
`;

// MUTATION
const ADD_POST_MUTATION = gql`
  mutation createPost($title: String!, $id: ID!, $userId: ID!) {
    createPost(title: $title, views: 0, user_id: $userId, id: $id) {
      id
      title,
      user_id
    }
  }
`;

export default {
  name: 'JsonServerList',
  setup() {
    const title = ref('')
    const id = ref(200)
    const userId = ref(200)
    // QUERY
    const { result, loading, error } = useQuery(
        ALL_POST_QUERY
    );

    // MUTATION <== NEW
    const {
      loading: mLoading,
      error: mError,
      mutate: createPost
    } = useMutation(ADD_POST_MUTATION, {
      update: (cache, { data: { createPost } }) => {
        // get the posts from the cache...
        const data = cache.readQuery({ query: ALL_POST_QUERY });
        // add the new post to the cache
        data.allPosts.push(createPost);
        // write results back to cache
        cache.writeQuery({ query: ALL_POST_QUERY, data });
      }
    });

    const addPost = () => {
      createPost({title: title.value, id: id.value, userId: userId.value})
    }

    return {
      result,
      loading: loading || mLoading,
      error: error || mError,
      createPost,
      addPost,
      title
    };
  },
}
</script>
