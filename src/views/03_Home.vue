<template>
  <myNavbar />
  <v-img width="6%" aspect-ratio="16/9" cover src="..\img\logo.png"></v-img>
  <div class="text-right">welcome <b style="margin-left: 1%;"> {{ username }} </b> <v-btn density="plain" @click="logout"
      size="small" icon="mdi-logout"></v-btn></div>
  <v-divider class="mb-4"></v-divider>

  <v-sheet style="margin-top: 1%;" width="60%" class="mx-auto box text_foe">
    <center><strong>Choose your route.</strong><v-icon>mdi-train</v-icon></center>
    <v-form @submit.prevent="submitForm">
      <v-select clearable v-model="origin" label="Origin" :items="items" variant="underlined"></v-select>
      <v-select clearable v-model="destination" label="Destination" :items="items" variant="underlined"></v-select> <input
        type="date" name="date" v-model="date" min="2023-04-12" max="" placeholder="Select a date">
      <v-btn style="color: aliceblue;" append-icon="mdi-magnify" theme="dark" type="submit" block
        class="mt-2">search</v-btn>
    </v-form>
  </v-sheet>
</template>
<script>
import router from '@/router';
import myNavbar from '@/components/myNavbar.vue';
import axios from 'axios';

export default {
  name: 'HomeView',
  data() {
    return {
      docs: [],
      member: [],
      status: 'กำลังโหลด',
      items: [],
      origin: null,
      destination: null,
      date: null,
      username: this.$route.query.username,
      password: this.$route.query.password,
      id: this.$route.query._id,
    }
  },
  components: {
    myNavbar
  },
  mounted() {   //โหลดข้อมูลทันทีเมื่อแสดงคอมโพเนนต์
    if (this.username == null) {
      router.push({ name: '02_Login' })
    }
    else if (this.username == "admin999" && this.password == "admin999") {
      router.push({ name: '100_adminhomepage', query: { username: this.username, password: this.password } })
    }
    let index = 0;
    fetch('/api/db/read/train_station')
      .then(response => response.json())
      .then(result => {
        if (result.length > 0) {
          this.docs = result
          console.log(result)
          while (result.length != index) {
            this.items[index] = result[index].station_name
            index++;
          }
        } else {
          this.docs = []
          this.status = 'ไม่มีรายการข้อมูล'
        }
      })
      .catch(err => alert(err))

      axios.get('/api/db/read/member', {
            params: {
                username: this.username,
                password: this.password
            }
        })
            .then(response => {
                response.data.forEach(item => {
                    this.member.push(item);
                });
            })
            .catch(error => console.error(error));
  },

  methods: {
    submitForm() {
      router.push({ name: '04_TrainNumber', query: {username: this.username, password: this.password, 
        first_name: this.member[0].first_name,  last_name: this.member[0].last_name,  
        origin: this.origin, destination: this.destination, date: this.date } })
    },
    logout() {
      this.username = null;
      router.push({ name: '02_Login' })
    }
  }
}
</script>

<style>
.box {
  background-color: rgba(255, 255, 255, 0.822);
  color: black;
  padding: 30px;
  border-radius: 20px;
  width: 500px;
}

.text-right {
  text-align: right;
  font-size: 75%;
}
</style>