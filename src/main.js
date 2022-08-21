import {createApp, h, provide} from 'vue'
import {ApolloClient, gql, InMemoryCache} from '@apollo/client';
import { DefaultApolloClient } from '@vue/apollo-composable'
import App from './App.vue'

const defaultClient = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql/',
    cache: new InMemoryCache()
})

// const query = gql `
//     query {
//         characters {
//             results {
//               name,
//               species
//             }
//         }
//     }
// `
// defaultClient.query({
//     query
// }).then(res => console.log(res))

createApp({
    setup(){
        provide(DefaultApolloClient, defaultClient)
    },
    render(){
        return h(App)
    }
}).mount('#app')
