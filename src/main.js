import {createApp, h, provide} from 'vue'
import {ApolloClient, gql, InMemoryCache} from '@apollo/client';
import { DefaultApolloClient } from '@vue/apollo-composable'
import App from './App.vue'

// const defaultClient = new ApolloClient({
//     uri: 'https://graphqlzero.almansi.me/api',
//     cache: new InMemoryCache()
// })

const defaultClient = new ApolloClient({
    connectToDevTools: true,
    uri: "http://localhost:3015",
    cache: new InMemoryCache()
})

createApp({
    setup(){
        provide(DefaultApolloClient, defaultClient)
    },
    render(){
        return h(App)
    }
}).mount('#app')

