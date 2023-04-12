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

    <v-table theme="dark">
        <thead>
            <tr>
                <th class="text-left">
                    avaliable train name
                </th>
                <th class="text-left">
                    Class
                </th>
                <th class="text-left">
                    Type
                </th>
                <th class="text-left">
                    Price/Seat
                </th>
                <th class="text-left">
                    Train No.
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(d, i) in docs" :key="i">
                <td>{{ docs[i].avaliable_train_name }}</td>
                <td>{{ docs[i].avaliable_train_class }}</td>
                <td>{{ docs[i].avaliable_train_type }}</td>
                <td>{{ docs[i].avaliable_train_price }}</td>
                <td>{{ docs[i].train_no }}</td>
            </tr>
        </tbody>
    </v-table>
    <v-btn style="color: white;margin-left: 80%;margin-top: 1%;" theme="dark" width="20%" @click="$router.go(-1)">
        back
    </v-btn>
</template>
<script>
import $router from '@/router';
import axios from 'axios';


export default {
    data() {
        return {
            train_no: this.$route.query.train_no,
            docs: [],
        }
    },
    mounted() {
        axios.get('/api/db/read/available_train', {
            params: {
                train_no: this.train_no,
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



    }
}
</script>

<style>
.text-right {
    text-align: right;
    font-size: medium;
}
</style> 

