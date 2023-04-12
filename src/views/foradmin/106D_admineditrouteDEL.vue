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
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            TicketListBooked
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><router-link to="/101"><a class="dropdown-item" href="#">Ticket</a></router-link></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown" style="margin-left: 10%;">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            Check
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><router-link to="/103"><a class="dropdown-item" href="#">Train</a></router-link></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown" style="margin-left: 10%;">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            Edit
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><router-link to="/104"><a class="dropdown-item" href="#">Train</a></router-link></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><router-link to="/105"><a class="dropdown-item" href="#">Available Train</a></router-link>
                            </li>
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
    <br>
    <v-form @submit.prevent="submitForm">
        <div v-for="(d, i) in docs" :key="i">
            <v-sheet elevation="12" max-width="auto" rounded="lg" width="100%" class="pa-4 text-center mx-auto gradient">
                <v-row>
                    
                    <v-col >
                        <v-row>
                            <v-col>
                                <strong style="font-size: 75%;">
                                    Station
                                </strong>
                            </v-col>
                        </v-row>
                        <v-divider class="mb-4"></v-divider>
                        <v-row>
                            <v-col> 
                                <strong class="sheet_down lable_db">
                                    {{ docs[i].station_name }}
                                </strong>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="1">
                        <input type="radio" name="_id" :value="d._id" v-model="isChecked" class="radio-btn">
                    </v-col>
                    
                </v-row>
            </v-sheet>
            <br>
        </div>
        <center>
            <v-btn style="color: red;margin-left: 1%;" type="submit">
                DELETE
            </v-btn>
        </center>
    </v-form>
    <!-- <div class="check"><v-btn  @click="gotrain" >CHECK BOOKED TICKET</v-btn></div>
<div class="check"><v-btn  @click="gotrain" >CHECK PAYMENT</v-btn></div>
<div class="check"><v-btn  @click="goroute" >CHECK ROUTE</v-btn></div>
<div class="check"><v-btn  @click="gotrain" >CHECK TRAIN</v-btn></div>
<div class="check"><v-btn  @click="gotrain" >EDIT ROUTH</v-btn></div>
<div class="check"><v-btn  @click="gotrain" >EDIT TRAIN</v-btn></div>
<div class="check"><v-btn  @click="gotrain" >EDIT AVAILABLETRAIN</v-btn></div> -->
</template>

<script>
//import router from '@/router';
import axios from 'axios';
import $router from '@/router';
export default {
    name: 'HomeView',
    data() {
        return {
            docs: [],
            status: 'กำลังโหลด',
            items: [],
            isChecked: false,
            station_name:this.$route.query.station_name,
        }
    },
    mounted() {
        axios.get('/api/db/read/train_station', {
            params: {
                station_name: this.station_name
            }
        })
            .then(response => {
                response.data.forEach(item => {
                    this.docs.push(item);
                });
            })
            .catch(error => console.error(error));
    },
    methods: {
        // submitForm() {
        //   $router.push({ name: '04_TrainNumber', query: { origin: this.origin, destination: this.destination } })
        // },
        logout() {
            this.username = null;
            $router.push({ name: '02_Login' })
        },
        submitForm(event) {
            event.preventDefault()
            if (!this.isChecked) {
                alert('กรุณาเลือกรายการที่จะลบ')
                return
            }

            if (!window.confirm('ยืนยันการลบรายการนี้')) {
                return
            }

            const fd = new FormData(event.target)
            const fe = Object.fromEntries(fd.entries())

            fetch('/api/db/delete/train_station', {
                method: 'POST',
                body: JSON.stringify(fe),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => response.json())
                .then(result => {
                    if (result.error) {
                        alert(result.error)
                    } else {
                        //หลังการลบ ฝั่งเซิร์ฟเวอร์จะอ่านข้อมูลใหม่ แล้วส่งกลับมา
                        //เราก็นำมาแสดงผลใหม่อีกครั้ง
                        alert('ข้อมูลถูกลบแล้ว')
                        location.href = '/106D'
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

}

.radio-btn {
    margin-top: 25px;
    height: 40px;
    width: 40px;
}</style>