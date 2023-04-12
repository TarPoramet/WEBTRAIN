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
                        Type 
                    </th>
                    <th cl ass="text-left">
                        Train No.
                    </th>
                    <th class="text-left" style="color: red;">

                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(d, i) in docs" :key="i">
                    <td>{{ docs[i].origin }}</td>
                    <td>{{ docs[i].destination }}</td>
                    <td>{{ docs[i].departure_time }}</td>
                    <td>{{ docs[i].arrival_time }}</td>
                    <td>{{ docs[i].type }}</td>
                    <td>{{ docs[i].train_no }}</td>

                    <td>
                        <input type="radio" name="train_no" :value="docs[i].train_no" v-model="train_no" class="radio-btn">
                    </td>
                </tr>
            </tbody>
        </v-table>
        <v-btn style="color: white;margin-left: 80%;margin-top: 1%;" theme="dark" width="20%" type="submit">
            check available train
        </v-btn>
    </v-form>
</template>

<script>
//import router from '@/router';
import $router from '@/router';
import axios from 'axios';
export default {
    name: 'HomeView',
    data() {
        return {
            docs: [],
            username: this.$route.query.username,
            password: this.$route.query.password,
            origin: this.$route.query.origin,
            destination: this.$route.query.destination,
            departure_time: this.$route.query.departure_time,
            type: this.$route.query.type,
            arrival_time: this.$route.query.arrival_time,
        }
    },

    mounted() {
        axios.get('/api/db/read/admintrains', {
            params: {
                train_no: this.train_no,
                origin: this.origin,
                destination: this.destination,
                departure_time: this.departure_time,
                type: this.type,
                arrival_time: this.arrival_time
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
        submitForm() {
            $router.push({ name: '103-2_admincheckavailabletrain', query: { train_no: this.train_no } })
        }


    }
}
</script>

<style>
.text-right {
    text-align: right;
    font-size: medium;
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
    width: 60%;
    height: 50%;
    background-color: #ffffff;
}

input[type="radio"]:checked {
    background-color: #ff0000;
}
</style> 



