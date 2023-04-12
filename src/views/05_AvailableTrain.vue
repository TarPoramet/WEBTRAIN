<template>
    <myNavbar />

    <br><v-icon>mdi-train</v-icon> {{ new Date().getHours() }} : {{ new Date().getMinutes() }} — <strong>current
        time</strong>
    /<span style="margin-left: 1%;" class="gradient-text">{{ this.$route.query.origin }}</span>
    <v-icon icon="mdi-chevron-right"></v-icon><span class="gradient-text">{{ this.$route.query.destination }}</span>
    <v-divider class="mb-4"></v-divider>

    <h6>Select Available train name</h6> <br>
    <v-form @submit.prevent="submitForm">
        <strong style="font-size: 80%;">
            <div v-for="(d, i) in docs" :key="i">
                <v-sheet elevation="12" max-width="800" rounded="lg" width="100%" class="pa-4 text-center mx-auto gradient">
                    <v-row>
                        <v-col>
                            <v-row style="color: brown;">
                                <div class="title">
                                    name
                                </div>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row>
                                <div class="title">
                                    {{ docs[i].avaliable_train_name }}
                                </div>
                            </v-row>
                        </v-col>

                        <v-col>
                            <v-row>
                                <div class="title">
                                    name
                                </div>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row>
                                <div class="title">
                                    {{ docs[i].avaliable_train_type }}
                                </div>
                            </v-row>
                        </v-col>

                        <v-col>
                            <v-row>
                                <div class="title">
                                    name
                                </div>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row>
                                <div class="title">
                                    {{ docs[i].avaliable_train_class }}
                                </div>
                            </v-row>
                        </v-col>

                        <v-col>
                            <v-row>
                                <div class="title">
                                    price/seat
                                </div>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row>
                                <div class="title">
                                    {{ docs[i].avaliable_train_price }}
                                </div>
                            </v-row>
                        </v-col>

                        <v-col>
                            <input type="radio" id="option-{{i}}" class="radio-btn" name="avaliable_train_name"
                                v-model="avaliable_train" :value="{
                                    avaliable_train_name: docs[i].avaliable_train_name,
                                    avaliable_train_price: docs[i].avaliable_train_price,
                                    avaliable_train_class: docs[i].avaliable_train_class,
                                    avaliable_train_type: docs[i].avaliable_train_type,
                                }">
                        </v-col>
                    </v-row>
                </v-sheet>
                <br>
            </div>
            <center><v-btn @click="$router.go(-1)" style="color: white;" theme="dark" append-icon="mdi-arrow-left-circle"
                    width="20%">
                    Change Route
                </v-btn>
                <v-btn style="color: white;margin-left: 1%;" theme="dark" append-icon="mdi-arrow-right-circle" width="20%"
                    type="submit">
                    Selected Train
                </v-btn>
            </center>
        </strong>
    </v-form>
    <v-icon icon="mdi-choose"></v-icon>
</template>

<script>
import $router from '@/router';
import axios from 'axios';
import myNavbar from '@/components/myNavbar.vue';
// import { query } from 'express';

export default {
    data() {
        return {
            train_no: this.$route.query.train_no,
            docs: [],
        }
    },
    components: {
        myNavbar
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
        submitForm() {
            $router.push({
                name: '06_Seat', query: {
                    username: this.$route.query.username, password: this.$route.query.password,
                    first_name: this.$route.query.first_name, last_name: this.$route.query.last_name,
                    date: this.$route.query.date, origin: this.$route.query.origin, destination: this.$route.query.destination,
                    train_no: this.$route.query.train_no, departure_time: this.$route.query.departure_time,
                    arrival_time: this.$route.query.arrival_time, type: this.$route.query.type,
                    avaliable_train_name: this.avaliable_train.avaliable_train_name,
                    avaliable_train_price: this.avaliable_train.avaliable_train_price,
                    avaliable_train_class: this.avaliable_train.avaliable_train_class,
                    avaliable_train_type: this.avaliable_train.avaliable_train_type,
                }
            })
        }
    }
}
</script>
    
<style>
.pa-4 {
    background-color: rgb(255, 255, 255);
}

.gradient-text {
    font-size: 120%;
    background: linear-gradient(to right, #212121, #424242, #616161);
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.gradient {
    background: linear-gradient(to bottom right, #ffffff, #d1d1d1);
}

.title {
    margin: auto;
    margin-top : 5%;
    margin-bottom : 5%;
}

input[type="radio"] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border: 3px solid #000000;
    border-radius: 40%;
    width: 16.667%;
    height:40%;
    background-color: #ffffff;
} 

 input[type="radio"]:checked {
    background-color: #000000;
}
</style>


