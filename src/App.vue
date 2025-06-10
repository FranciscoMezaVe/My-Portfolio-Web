<template>
  <v-app>
    <v-theme-provider theme="darkTheme">
      <v-main class="app-main">
        <router-view />
      </v-main>
    </v-theme-provider>
  </v-app>
</template>

<script setup lang="ts"></script>

<style>
.custom-font {
  font-family: 'Space Grotesk', sans-serif;
}

body,
html,
#app {
  font-family: 'Space Grotesk', sans-serif;
}
</style>
