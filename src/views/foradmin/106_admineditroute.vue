<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/100"><a class="nav-link active" aria-current="page">Home</a></router-link>
          </li>
          <li class="nav-item dropdown" style="margin-left: 10%;">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              TicketListBooked
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><router-link to="/101"><a class="dropdown-item" href="#">Ticket</a></router-link></li>
            </ul>
          </li>
          <li class="nav-item dropdown" style="margin-left: 10%;">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              Check
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><router-link to="/103"><a class="dropdown-item" href="#">Train</a></router-link></li>
            </ul>
          </li>
          <li class="nav-item dropdown" style="margin-left: 10%;">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              Edit
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><router-link to="/104"><a class="dropdown-item" href="#">Train</a></router-link></li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li><router-link to="/105"><a class="dropdown-item" href="#">Available Train</a></router-link></li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li><router-link to="/106"><a class="dropdown-item" href="#">Route</a></router-link></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="text-right"><v-btn @click="logout" style="color: white;" color="danger" append-icon="mdi-logout">LOGOUT
      </v-btn></div>
  </nav>

  <center>
    <div> <v-row>
        <v-col> <a href="/106D"><v-btn class="btn">delete</v-btn></a></v-col>
        <v-col> <a href="/106"><v-btn class="btn">add</v-btn></a></v-col>

      </v-row></div>
  </center>

  <div style="margin-top: 5%;">
    <strong style="margin-top: 10%;font-size: 200%;">
      <center>ADD STATION</center>
    </strong>
    <v-divider class="mb-4"></v-divider>
    <v-sheet width="400" class="mx-auto sheet">
      <v-icon icon="fa:fas fa-edit"></v-icon>
      <v-form @submit="form_submit" style="background-color: black; color: yellowgreen;">

        <v-text-field name="station_name" v-model="station_name" label="Train Station"></v-text-field>
        <v-btn style="color: white;margin-top: 5%;" theme="dark" append-icon="mdi-login" width="100%" type="Submit">
          ADD
        </v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<script>
//import router from '@/router';
import $router from '@/router';
export default {
  name: 'HomeView',
  data() {
    return {
      docs: [],
      status: 'กำลังโหลด',
      items: [],
      station_name:null,
    }
  },
  

  methods: {

    logout() {
      this.username = null;
      $router.push({ name: '02_Login' })
    },
    form_submit(event) {
      event.preventDefault()
      const fd = new FormData(event.target)
      const fe = Object.fromEntries(fd.entries())
      fetch('/api/db/create/train_station', {
        method: 'POST',
        body: JSON.stringify(fe),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => response.text())
        .then(result => {
          if (result === 'true') {
            event.target.reset()
            alert('ข้อมูลถูกจัดเก็บแล้ว')
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
.text-right {
  text-align: right;
  font-size: medium;
}

.btn {
  height: 60px;
  width: 300px;
  font-style: color="white";
  color: yellowgreen;
  background-color: black;
  margin-top: 30px;
}</style>