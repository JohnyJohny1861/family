<template>
  <v-app>
    <v-app-bar app color="primary accent-4" dense dark>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title>Family expenses</v-toolbar-title>

      <v-spacer></v-spacer>

      <div v-if="$store.state.userModule.user">
        <v-btn @click="logout" text small>logout</v-btn>
      </div>

      <v-menu v-else left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="$router.push({name: 'signup'});">
            <v-list-item-title>Signup</v-list-item-title>
          </v-list-item><v-list-item @click="$router.push({name: 'login'});">
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item>
        </v-list>

      </v-menu>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    //
  }),
  methods: {
    logout() {
      this.$store.commit('setUser', null);
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('user');
      this.$router.push('/login')
    }
  },
  created() {
    const token = localStorage.getItem('token');
    if(token) {
      console.log(token);
      const user = JSON.parse(localStorage.getItem('user'));
      this.$store.commit('setUser', user);
    }
  }
};
</script>
