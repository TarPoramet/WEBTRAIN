<template>
  <myNavbar />

  <br><v-icon>mdi-train</v-icon> {{ new Date().getHours() }} : {{ new Date().getMinutes() }} — <strong>current
    time</strong>
  /<span style="margin-left: 1%;" class="gradient-text">{{ this.$route.query.origin }}</span>
  <v-icon icon="mdi-chevron-right"></v-icon><span class="gradient-text">{{ this.$route.query.destination }}</span>
  <v-divider class="mb-4"></v-divider>


  <div class="seating-plan">
    <h3>Select your seats:</h3>
    <strong> total : {{ f_total_amount() }} Bath </strong>
    <br><br>

    <v-row>
      <span v-for="(seat, index) in seats" :key="index">
        <v-col v-if="index < 10"><v-sheet class="cbox"><v-checkbox class="v-checkbox" v-model="seatsObject"
              :label="seat.number" :value="seat" :disabled="seat.reserved" /></v-sheet></v-col>
      </span>
      <v-col><v-sheet class="cbox toilet"><v-icon
            style="color: aliceblue;margin-left: 30%;margin-top: 15%;">mdi-toilet</v-icon></v-sheet></v-col>
    </v-row>

    <v-row>
      <span v-for="(seat, index) in seats" :key="index">
        <v-col v-if="index >= 10"><v-sheet class="cbox"><v-checkbox class="v-checkbox" v-model="seatsObject"
              :label="seat.number" :value="seat" :disabled="seat.reserved" /></v-sheet></v-col>
      </span>
      <v-col><v-sheet class="cbox toilet"> <v-icon
            style="color: aliceblue;margin-left: 30%;margin-top: 15%;">mdi-toilet</v-icon></v-sheet></v-col>
    </v-row>

    <br><br><br>

    <center><v-btn @click="$router.go(-1)" style="color: white;" theme="dark" append-icon="mdi-arrow-left-circle"
        width="20%">
        back to choose
      </v-btn>
      <v-btn :disabled="seatsObject.length === 0" @click="submitForm" style="color: white;margin-left: 1%;" theme="dark"
        append-icon="mdi-arrow-right-circle" width="20%" type="submit">
        Reserve Seats
      </v-btn>
    </center>


    {{ f_seatArray() }}

    <br>
  </div>
</template>

<script>
import axios from 'axios';
import $router from '@/router';
import myNavbar from '@/components/myNavbar.vue';


export default {
  data() {
    return {
      total_amount: 0,
      seats: [
        { number: '1', reserved: false },
        { number: '2', reserved: false },
        { number: '3', reserved: false },
        { number: '4', reserved: false },
        { number: '5', reserved: false },
        { number: '6', reserved: false },
        { number: '7', reserved: false },
        { number: '8', reserved: false },
        { number: '9', reserved: false },
        { number: '10', reserved: false },
        { number: '11', reserved: false },
        { number: '12', reserved: false },
        { number: '13', reserved: false },
        { number: '14', reserved: false },
        { number: '15', reserved: false },
        { number: '16', reserved: false },
        { number: '17', reserved: false },
        { number: '18', reserved: false },
        { number: '19', reserved: false },
        { number: '20', reserved: false },
      ],
      seatsObject: [],
      seatArray: [],
      docs: [],
    };
  },
  components: {
    myNavbar
  },
  mounted() {
    axios.get('/api/db/read/seat', {
      params: {
        date: this.$route.query.date,
        avaliable_train_name: this.$route.query.avaliable_train_name,
      }
    })
      .then(response => {
        response.data.forEach(item => {
          this.docs.push(item);
        });
        // console.log(this.docs.length);
        for (let i = 0; i < this.docs.length; i++) {
          for (let j = 0; j < 20; j++) {
            if (Number(this.docs[i].seat_num) == j + 1) {
              console.log(this.docs[i], j)
              this.seats[j].reserved = true;
            }
          }
        }
      })
      .catch(error => console.error(error));
  },
  methods: {
    submitForm() {
      $router.push({
        name: '07_Examine', query: {
          username: this.$route.query.username, password: this.$route.query.password,
          first_name: this.$route.query.first_name, last_name: this.$route.query.last_name,
          date: this.$route.query.date, origin: this.$route.query.origin, destination: this.$route.query.destination,
          train_no: this.$route.query.train_no, departure_time: this.$route.query.departure_time,
          arrival_time: this.$route.query.arrival_time, type: this.$route.query.type,
          avaliable_train_name: this.$route.query.avaliable_train_name,
          avaliable_train_price: this.$route.query.avaliable_train_price,
          avaliable_train_class: this.$route.query.avaliable_train_class,
          avaliable_train_type: this.$route.query.avaliable_train_type,
          seatArray: this.seatArray, total_amount: this.f_total_amount()
        }
      })
    },
    f_total_amount() {
      const pricePerSeat = parseFloat(this.$route.query.avaliable_train_price);
      const totalAmount = pricePerSeat * this.seatsObject.length;
      this.total_amount = totalAmount;
      return this.total_amount;
    },
    f_seatArray() {
      for (let i = 0; i < this.seatsObject.length; i++) {
        this.seatArray[i] = this.seatsObject[i].number
      }
      return this.seatArray;
    },
  },
};
</script>

<style scoped>
.seating-plan {
  margin: 0 auto;
  max-width: mx-auto;
}

.cbox {
  width: 80px;
  height: 50px;
  border-radius: 5%;
}

.cbox input[type="checkbox"]:checked+.v-checkbox .v-input--selection-controls__ripple {
  background-color: green;
}


.toilet {
  background-color: black;
}
</style>