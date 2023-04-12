<template>
    <myNavbar />
    <br><v-icon>mdi-train</v-icon> {{ new Date().getHours() }} : {{ new Date().getMinutes() }} — <strong>current
        time</strong>
    /<span style="margin-left: 1%;" class="gradient-text">{{ origin }}</span>
    <v-icon icon="mdi-chevron-right"></v-icon><span class="gradient-text">{{ destination }}</span>
    <v-divider class="mb-4"></v-divider>

    <h6>Select Train number</h6> <br>
    <v-form @submit.prevent="submitForm">
        <div v-for="(d, i) in docs" :key="i">
            <v-sheet elevation="12" max-width="800" rounded="lg" width="100%" class="pa-4 text-center mx-auto gradient">
                <v-row>
                    <v-col cols="5">
                        <v-row>
                            <v-col>
                                <strong class="time_lable ">
                                    <span style="margin-right: 20%;">departure time</span>
                                    <span style="margin-left: 20%;">arrival time</span>
                                </strong>
                            </v-col>
                        </v-row>
                        <v-divider class="mb-4"></v-divider>
                        <v-row>
                            <v-col>
                                <strong class="lable_db sheet_down">
                                    <span style="margin-right: 20%;">{{ docs[i].departure_time }} </span>
                                    <v-icon icon="mdi-arrow-right-circle"></v-icon>
                                    <span style="margin-left: 20%;">{{ docs[i].arrival_time }}</span>
                                </strong>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="3">
                        <v-row>
                            <v-col>
                                <strong style="font-size: 75%;">
                                    Type
                                </strong>
                            </v-col>
                        </v-row>
                        <v-divider class="mb-4"></v-divider>
                        <v-row>
                            <v-col>
                                <strong class="sheet_down lable_db">
                                    {{ docs[i].type }}
                                </strong>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col>
                        <v-row>
                            <v-col>
                                <strong style="font-size: 75%;">
                                    Train Number
                                </strong>
                            </v-col>
                        </v-row>
                        <v-divider class="mb-4"></v-divider>
                        <v-row>
                            <v-col>
                                <strong class="sheet_down lable_db">
                                    {{ docs[i].train_no }}
                                </strong>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="1">
                        <input type="radio" id="option-1" class="radio-btn" name="train_no" v-model="train" :value="{ train_no: docs[i].train_no, 
                        departure_time: docs[i].departure_time, arrival_time: docs[i].arrival_time, type: docs[i].type }
                        ">
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
    </v-form>
    <v-icon icon="mdi-choose"></v-icon>
</template>

<script>
import $router from '@/router';
import axios from 'axios';
import myNavbar from '@/components/myNavbar.vue';

export default {
    data() {
        return {
            origin: this.$route.query.origin,
            destination: this.$route.query.destination,
            docs: [],
        }
    },
    components: {
        myNavbar
    },
    mounted() {
        axios.get('/api/db/read/trains', {
            params: {
                origin: this.origin,
                destination: this.destination
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
                name: '05_AvailableTrain', query: {
                    username: this.$route.query.username, password: this.$route.query.password, first_name: this.$route.query.first_name, last_name: this.$route.query.last_name, date: this.$route.query.date,
                    origin: this.$route.query.origin, destination: this.$route.query.destination,
                    train_no: this.train.train_no, departure_time: this.train.departure_time,
                    arrival_time: this.train.arrival_time, type: this.train.type
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

.time_lable {
    color: rgb(156, 133, 0);
    font-size: 80%;
}

.lable_db {
    font-size: 75%;
}

.sheet_down {
    color: #000000;
}

.gradient {
    background: linear-gradient(to bottom right, #ffffff, #d1d1d1);
}

input[type="radio"] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border: 3px solid #000000;
    border-radius: 40%;
    width: 60%;
    height: 28%;
    background-color: #ffffff;
}

input[type="radio"]:checked {
    background-color: #000000;
}</style>
