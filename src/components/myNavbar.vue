<template>
    <v-app-bar flat>
        <v-container class="fill-height d-flex align-center">
            <v-btn variant="text"  v-on:click="Homebtn" >
                Home
            </v-btn>
            <v-btn variant="text" v-on:click="Myticketbtn" >
                My Ticket
            </v-btn>
            <v-btn variant="text" v-on:click="Canclebtn" >
                Downlode Ticket
            </v-btn>
            <v-spacer></v-spacer>
            <v-responsive max-width="260">
                <v-text-field density="compact" hide-details variant="solo"></v-text-field>
            </v-responsive>
        </v-container>
    </v-app-bar>
</template>

<script>

import router from '@/router'
export default {
    name: 'myNavbar',
    data: () => ({
    }),
    methods: {
        Homebtn() {
            router.push({path: '/03', query:{username:'user9999',password: 'user9999'}})
        },
        Myticketbtn() {
            router.push({path: '/08', query:{username:'user9999',password: 'user9999'}})
        },
        Canclebtn() {
            router.push({path: '/09', query:{username:'user9999',password: 'user9999'}})
        }
    }
}

</script>

<style>
.footer_col {
    background-color: black;
}
</style>