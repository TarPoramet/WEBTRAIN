<template>
  <v-app id="inspire">

    <v-main class="bg-grey-lighten-3">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer class="d-flex flex-column footer_col"  >
      <div class="bg-teal d-flex w-100 align-center px-4">
        <strong>Smooth journey, safe arrival.</strong>
        <v-spacer></v-spacer>
      </div>
      <div class="px-4 py-2 bg-black text-center w-100">
        {{ new Date().getFullYear() }} — <strong>state railway of thailand </strong>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    links: [
      'Dashboard',
      'Messages',
      'Profile',
      'Updates',
    ],
  }),
}
</script>

<style>
main {
  background-image: url('./img/bg.png');
  background-size: cover;
}

.footer_col {
  background-color: black;
}
</style>