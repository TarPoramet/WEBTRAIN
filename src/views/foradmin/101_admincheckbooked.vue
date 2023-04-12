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


    <br>

    <v-form @submit.prevent="submitForm">
        <v-table theme="dark">
            <thead>
                <tr>
                    <th class="text-left">
                        Origin
                    </th>
                    <th class="text-left">
                        Destination
                    </th>
                    <th class="text-left">
                        Depature
                    </th>
                    <th class="text-left">
                        Arrival
                    </th>
                    <th class="text-left">
                        Date
                    </th>
                    <th class="text-left">
                        Train No.
                    </th>
                    <th class="text-left">
                        Available Train
                    </th>
                    <th class="text-left">
                        Seat
                    </th>
                    <th class="text-left">
                        Status
                    </th>
                    <th class="text-left" style="color: red;">
                        Your Ticket
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(d, i) in docs" :key="i">
                    <td>{{ docs[i].origin }}</td>
                    <td>{{ docs[i].destination }}</td>
                    <td>{{ docs[i].departure_time }}</td>
                    <td>{{ docs[i].arrival_time }}</td>
                    <td>{{ docs[i].date }}</td>
                    <td>{{ docs[i].train_no }}</td>
                    <td>{{ docs[i].avaliable_train_name }}</td>
                    <td>{{ docs[i].seatArray }}</td>
                    <td>{{ docs[i].bill_status }}</td>
                    <td>
                        <input type="radio" name="_id" :value="d._id" v-model="isChecked" class="radio-btn">
                    </td>
                </tr>
            </tbody>
        </v-table>
        <v-btn style="color: white;margin-left: 80%;margin-top: 1%;" theme="dark" append-icon="mdi-doenload-circle"
            width="20%" type="submit">
            Change status
        </v-btn>
    </v-form>
</template>

<script>
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
            username: this.$route.query.username,
            first_name: this.$route.query.first_name,
            last_name: this.$route.query.last_name,
            origin: this.$route.query.origin,
            destination: this.$route.query.destination,
            date: this.$route.query.date,
            train_no: this.$route.query.train_no,
            departure_time: this.$route.query.departure_time,
            arrival_time: this.$route.query.arrival_time,
            type: this.type,
            avaliable_train_name: this.$route.query.avaliable_train_name,
            avaliable_train_type: this.$route.query.avaliable_train_type,
            avaliable_train_class: this.$route.query.avaliable_train_class,
            total_amount: this.$route.query.total_amount,
            bill_status: this.$route.query.bill_status
        }
    },
    mounted() {
        axios.get('/api/db/read/ticketall', {
            params: {
                username: this.username,
                first_name: this.first_name,
                last_name: this.last_name,
                origin: this.origin,
                destination: this.destination,
                date: this.date,
                train_no: this.train_no,
                departure_time: this.departure_time,
                arrival_time: this.arrival_time,
                type: this.type,
                avaliable_train_name: this.avaliable_train_name,
                avaliable_train_type: this.avaliable_train_type,
                avaliable_train_class: this.avaliable_train_class,
                total_amount: this.total_amount,
                bill_status: this.bill_status
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
        logout() {
            this.username = null;
            $router.push({ name: '02_Login' })
        },
        submitForm(event) {
            event.preventDefault()
            if (!this.isChecked) {
                alert('กรุณาเลือกรายการที่จะแก้ไข')
                return
            }

            if (!window.confirm('ยืนยันการแก้ไขรายการนี้')) {
                return
            }

            const fd = new FormData(event.target)
            const fe = Object.fromEntries(fd.entries())

            fetch('/api/db/updatestatus', {
                method: 'POST',
                body: JSON.stringify(fe),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => response.json())
                .then(result => {
                    if (result.error) {
                        alert(result.error)
                    } else {
                        //หลังการแก้ไข ฝั่งเซิร์ฟเวอร์จะอ่านข้อมูลใหม่ แล้วส่งกลับมา
                        //เราก็นำมาแสดงผลใหม่อีกครั้ง
                        alert('ข้อมูลถูกแก้ไขแล้ว')
                        location.href = '/101'
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

/* .radio-btn {
    margin-top: 25px;
    height: 40px;
    width: 40px;
} */
input[type="radio"] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border: 3px solid #000000;
    border-radius: 40%;
    width: 30%;
    height: 50%;
    background-color: #ffffff;
}

input[type="radio"]:checked {
    background-color: #ff0000;
}
</style>