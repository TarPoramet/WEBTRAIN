<template>
    <myNavbar /> <br>
    <strong style="color: red;"><button @click="printPDF">Print PDF</button></strong> <br><br><br><br>
    <div class="print-section">
        <strong>State Railway Of Thailand</strong> <br><br>
        <div v-if="ticket.length > 0">
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
                        <td>{{ ticket[0].first_name }}</td>
                        <td> {{ ticket[0].last_name }}</td>
                        <td>{{ ticket[0].total_amount }} Bath</td>
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
                        <td>{{ ticket[0].train_no }}</td>
                        <td> {{ ticket[0].type }}</td>
                        <td>{{ ticket[0].origin }}</td>
                        <td>{{ ticket[0].destination }}</td>
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
                        <td>{{ ticket[0].date }}</td>
                        <td> {{ ticket[0].departure_time }}</td>
                        <td>{{ ticket[0].arrival_time }}</td>
                        <td>{{ ticket[0].avaliable_train_class }}</td>
                        <td>{{ ticket[0].seatArray }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import myNavbar from '@/components/myNavbar.vue';

export default {
    data() {
        return {
            ticket: [],
            imageUrl: '',
        }
    },
    components: {
        myNavbar
    },
    methods: {
        printPDF() {
            window.print();
        }
    },
    mounted() {
        axios.get('/api/db/read/ticket_id', {
            params: {
                _id: this.$route.query._id,
            },
        })
            .then(response => {
                this.ticket = response.data;
                const ticket = this.ticket[0]; // Assuming you only expect one ticket to be returned
                console.log(ticket.bill_img); // Check the response data
                const url = URL.createObjectURL(new Blob([ticket.bill_img], { type: 'image/jpeg' }));
                this.imageUrl = url;
            })
            .catch(error => console.error(error));
    },
}
</script>

<style>
@media print {
    body * {
        visibility: hidden;
    }

    .print-section,
    .print-section * {
        visibility: visible;
    }

    .print-section {
        position: absolute;
        left: 0;
        top: 0;
    }
}

.table{
    background-color: rgba(255, 255, 255, 0.726);
}

</style>

