<template>
    <myNavbar />
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
                <tr v-for="(ticket, index) in ticket" :key="index">
                    <td>{{ ticket.origin }}</td>
                    <td>{{ ticket.destination }}</td>
                    <td>{{ ticket.departure_time }}</td>
                    <td>{{ ticket.arrival_time }}</td>
                    <td>{{ ticket.date }}</td>
                    <td>{{ ticket.train_no }}</td>
                    <td>{{ ticket.avaliable_train_name }}</td>
                    <td>{{ ticket.seatArray }}</td>
                    <td>{{ ticket.bill_status }}</td>
                    <td><input type="radio" id="option-1" class="radio-btn" name="selected" v-model="selected"
                            :value="ticket._id"></td>
                </tr>
            </tbody>
        </v-table>
        <v-btn style="color: white;margin-left: 80%;margin-top: 1%;" theme="dark" append-icon="mdi-doenload-circle" width="20%"
            type="submit">
            Print Pdf
        </v-btn>
    </v-form>
</template>
<script>

import axios from 'axios';
import $router from '@/router';
import myNavbar from '@/components/myNavbar.vue';

export default {
    data() {
        return {
            ticket: [],
        }
    },
    components: {
        myNavbar
    },
    mounted() {
        axios.get('/api/db/read/pass_ticket', {
            params: {
                username: 'user9999',
            }
        })
            .then(response => {
                response.data.forEach(item => {
                    this.ticket.push(item);
                });
            })
            .catch(error => console.error(error));
    },
    methods: {
        submitForm() {
            $router.push({
                name: '10_PrintTicket', query: {
                    _id: this.selected
                }
            })
        }
    }
}
</script>

<style>
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
    

