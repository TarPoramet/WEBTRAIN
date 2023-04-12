<template>
    <myNavbar />

    <br><v-icon>mdi-train</v-icon> {{ new Date().getHours() }} : {{ new Date().getMinutes() }} — <strong>current
        time</strong>
    /<span style="margin-left: 1%;" class="gradient-text">{{ this.$route.query.origin }}</span>
    <v-icon icon="mdi-chevron-right"></v-icon><span class="gradient-text">{{ this.$route.query.destination }}</span>
    <v-divider class="mb-4"></v-divider>

    <br>

    <h5> Please Check Your Ticket: </h5> <br>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col"></th>
                <th scope="col">total amount</th>
                <th cope="col"></th>
                <th cope="col"></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{{ ticket.first_name }}</td>
                <td> {{ ticket.last_name }}</td>
                <td>{{ ticket.total_amount }} Bath</td>
                <td></td>
                <td></td>
            </tr>
        </tbody>

        <thead>
            <tr>
                <th scope="col">Train number</th>
                <th scope="col">Type</th>
                <th scope="col">Origin</th>
                <th scope="col">Destination</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{{ ticket.train_no }}</td>
                <td> {{ ticket.type }}</td>
                <td>{{ ticket.origin }}</td>
                <td>{{ ticket.destination }}</td>
                <td></td>
            </tr>
        </tbody>

        <thead>
            <tr>
                <th scope="col">Date</th>
                <th scope="col">Dep Time</th>
                <th scope="col">Arr Time</th>
                <th scope="col">Class</th>
                <th scope="col">Seat</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{{ ticket.date }}</td>
                <td> {{ ticket.departure_time }}</td>
                <td>{{ ticket.arrival_time }}</td>
                <td>{{ ticket.avaliable_train_class }}</td>
                <td>{{ ticket.seatArray }}</td>
            </tr>
        </tbody>
    </table>

    <v-row>
        <v-col>
            <input width="100%" type="file">
            <v-img width="40%" aspect-ratio="16/9" cover src="..\img\qr.jpg"></v-img>
        </v-col>
        <v-col><v-btn @click="$router.go(-1)" style="color: white;margin-top: 15%;" theme="dark"
                append-icon="mdi-arrow-left-circle" width="80%">
                back to choose
            </v-btn>
        </v-col>
        <v-col>
            <v-btn @click="submitForm" style="color: lightgreen;margin-left: 1%;margin-top: 15%;" theme="dark"
                append-icon="mdi-checkbox-marked-circle" width="80%" type="submit">
                payment confirmation
            </v-btn>
            
        </v-col>
    </v-row>
</template>

<script>
import $router from '@/router';
import axios from 'axios';
import myNavbar from '@/components/myNavbar.vue';


export default {
    data() {
        return {
            ticket: {
                username: this.$route.query.username,
                password: this.$route.query.password,
                first_name: this.$route.query.first_name,
                last_name: this.$route.query.last_name,
                date: this.$route.query.date,
                origin: this.$route.query.origin,
                destination: this.$route.query.destination,
                train_no: this.$route.query.train_no,
                departure_time: this.$route.query.departure_time,
                arrival_time: this.$route.query.arrival_time,
                type: this.$route.query.type,
                avaliable_train_name: this.$route.query.avaliable_train_name,
                avaliable_train_class: this.$route.query.avaliable_train_class,
                avaliable_train_type: this.$route.query.avaliable_train_type,
                seatArray: this.$route.query.seatArray,
                total_amount: this.$route.query.total_amount,
                bill_status: 'unverified'
            },
        }
    },
    components: {
        myNavbar
    },
    methods: {
        submitForm() {
            const ticket_data = {
                ...this.ticket,
                bill_img: 'img'
            };
            const seat_data = {
                seat_date: this.ticket.date,
                seat_num: this.ticket.seatArray,
                available_train_name: this.ticket.avaliable_train_name,
            };
            axios.post('/api/db/create/ticket', ticket_data)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });

            axios.post('/api/db/create/seat', seat_data)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
            alert('Wait a moment for verification.');
            $router.push({ name: '03_Home', query: { username: this.ticket.username, password: this.ticket.password } })
        }
    }
}
</script>

<style>
.table {
    background-color: rgba(255, 255, 255, 0.771);
}
</style>
    
