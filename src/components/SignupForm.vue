<template>
  <div>
    <h1>Signup form</h1>
    <form>
      <label>name </label>
      <input type="text" placeholder="name" v-model="user.name" /> <br /> <br />
      <label>email </label>
      <input type="email" placeholder="email" v-model="user.email" /> <br /> <br />
      <label>password </label>
      <input type="password" placeholder="password" v-model="user.password" /> <br /> <br />
      <input
          type="submit"
          @click.prevent="addAdmin"
      />
    </form>
  </div>
</template>

<script>
import {reactive} from "vue";

export default {
  name: 'SignupForm',
  setup(){
    const user = reactive({
        name: "",
        email: "",
        password: ""
    })

    const addAdmin = () => {
      console.log(user)
      $apollo.mutate({
        // Query
        mutation: gql`mutation Signup($signupInput: SignupInput!) {
            signup(signupInput: $signupInput) {
              name
              email
              password
            }
          }
`,
        // Parameters
        variables: {
          name: user.name,
          email: user.email,
          password: user.password,
        },
    })
    }
    return{
      user,
      addAdmin,
    }
  }
}
</script>
