<template>
  <div style="margin-top: 5%;">
    <strong style="margin-top: 10%;font-size: 200%;">
      <center>Register page</center>
    </strong>
    <v-divider class="mb-4"></v-divider>
    <v-sheet width="400" class="mx-auto sheet">
      <v-icon icon="fa:fas fa-edit"></v-icon>
      <v-form @submit="form_submit">
        <v-text-field name="first_name" v-model="first_name" label="First name" :rules="first_nameRules"></v-text-field>
        <v-text-field name="last_name" v-model="last_name" label="Last name" :rules="last_nameRules"></v-text-field>
        <v-text-field name="identity_number" v-model="identity_number" label="Identity number"
          :rules="identity_numberRules"></v-text-field>
        <v-text-field name="email" v-model="email" label="Email" :rules="emailRules"></v-text-field>
        <v-text-field name="username" v-model="username" label="Create Username" :rules="usernameRules"></v-text-field>
        <v-text-field name="password" v-model="password" label="Create Password" :rules="passwordRules"></v-text-field>
        <v-btn style="color: white;margin-top: 5%;" theme="dark" append-icon="mdi-login" width="100%" type="Submit">
          Submit
        </v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

  
<script>
import router from '@/router';
export default {
  data: () => ({
    //name
    first_name: '',
    first_nameRules: [
      value => {
        if (/[a-z]/.test(value)) return true
        return 'First name must be small characters.'
      },
    ],

    //last_name
    last_name: '',
    last_nameRules: [
      value => {
        if (/[a-z]/.test(value)) return true
        return 'Last name must be small characters.'
      },
    ],

    //identity_number
    identity_number: '',
    identity_numberRules: [
      value => {
        if (/[0-9]/.test(value) && value?.length == 13) return true
        return 'Identity number must be 0 - 9. and 13 digit'
      },
    ],

    //email
    email: '',
    emailRules: [
      true
    ],

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

  //submit
  methods: {
    form_submit(event) {
      event.preventDefault()
      const fd = new FormData(event.target)
      const fe = Object.fromEntries(fd.entries())
      fetch('/api/db/create/register', {
        method: 'POST',
        body: JSON.stringify(fe),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => response.text())
        .then(result => {
          if (result === 'true') {
            event.target.reset()
            alert('ข้อมูลถูกจัดเก็บแล้ว')
            router.push({ name: '02_Login', })
          } else {
            alert('เกิดข้อผิดพลาด ข้อมูลไม่ถูกบันทึก')
          }
        })
        .catch(err => alert(err))
    }
  }

}
</script>
  
<style>
.sheet {
  background-color: rgb(255, 255, 255);
  width: 30%;
}
</style>