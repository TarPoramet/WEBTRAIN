<template>
  <div style="margin-top: 5%;">
    <strong style="margin-top: 10%;font-size: 200%;">
      <center>Login Page</center>
    </strong>
    <v-divider class="mb-4"></v-divider>
    <v-sheet class="mx-auto sheet">
      <v-form fast-fail @submit.prevent="submitForm">
        <v-text-field v-model="username" label="Username" :rules="usernameRules"></v-text-field>
        <v-text-field type="password" v-model="password" label="Password" :rules="passwordRules"></v-text-field>
        <v-btn style="color: white;margin-top: 5%;" theme="dark" append-icon="mdi-login" width="100%" type="Submit">
          Submit
        </v-btn>
      </v-form>
    </v-sheet>
    <center><a href="/01" style="font-size: 90%;background-color: aliceblue;">You are not a member? Go to Register
        page.</a></center>
    <v-divider class="mb-4"></v-divider>
  </div>
</template>

<script>
import $router from '@/router';
import axios from 'axios';
export default {
  data: () => ({
    

    //usernameRules
    username: '',
    usernameRules: [
      value => {
        if (value?.length >= 8) return true
        return ' Username must be at least 8 characters.'
      },
    ],

    //passwordRules
    password: '',
    passwordRules: [
      value => {
        if (value?.length >= 8) return true

        return 'Password must be at least 8 characters.'
      },
    ],
  }),
  methods: {
    submitForm() {
      axios.get('/api/db/read/member', {
        params: {
          username: this.username,
          password: this.password
        }
      })
        .then(response => {
          response.data.forEach(item => {
            $router.push({ path: '/03', query: { username: this.username, password: this.password } })
            this.docs.push(item);
          });
        })
        .catch(error => console.error(error));
    }
  }
}
</script>

<style>
.sheet {
  background-color: rgba(255, 255, 255, 0);
  width: 30%;
}
</style>

