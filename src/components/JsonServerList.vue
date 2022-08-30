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
  </div>
</template>

<script>
import { gql } from "apollo-boost";
import { useQuery } from "@vue/apollo-composable";

// QUERY
const ALL_POST_QUERY = gql`
  {
    allPosts {
      id
      title
    }
  }
`;

export default {
  name: 'JsonServerList',
  setup() {
    // QUERY
    const { result, loading, error } = useQuery(
        ALL_POST_QUERY
    );

    return {
      result,
      loading,
      error
    };
  },
}
</script>
