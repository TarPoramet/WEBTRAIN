<template>
    <myNavbar />
    <v-form>
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
                    
                </tr>
            </tbody>
        </v-table>
    </v-form>
</template>

<script>

import axios from 'axios';
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
        axios.get('/api/db/read/ticket', {
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
    }
}
</script>
    

