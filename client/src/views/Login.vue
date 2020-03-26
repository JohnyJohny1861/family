<template>
    <v-app id="inspire">
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
               <v-col cols="12" sm="8" md="4">
                  <v-card class="elevation-12">
                     <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>Login form</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form v-model="valid" v-if="!loading">
                           <v-text-field label="Username"
                                v-model="user.username"
                                :prepend-icon="icons.username"
                                :rules="notEmptyRules"
                                type="text" />
                           <v-text-field
                                label="Password"
                                v-model="user.password"
                                :rules="notEmptyRules"
                                :prepend-icon="icons.password"
                                type="password" />

                        </v-form>

                        <div v-else class="d-flex justify-center">
                           <v-progress-circular  
                                :size="50" 
                                color="primary" 
                                indeterminate />
                        </div>

                     </v-card-text>
                     <v-card-actions>
                        <v-spacer />
                        <v-btn 
                           @click="login"
                           class="mb-4 mr-4"
                           type="button" 
                           color="primary" 
                           :disabled="!valid">Login</v-btn>
                     </v-card-actions>
                  </v-card>
               </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
   import axios from 'axios';
   import { mdiAccount, mdiLock } from '@mdi/js';
   export default {
      name: 'login',
      data: (vm) => ({
         icons: {
            username: mdiAccount,
            password: mdiLock,
         },
         user: {
            username: '',
            password: '',
         },
         loading: false,
         valid: false,
         notEmptyRules: [ v => !!v || 'Can not be empty'],
         confirmPasswordRules: [v => v === vm.user.password || 'Password must match']
      }),
      methods: {
         async login() {
            try {
                this.loading = true;
                const res = await axios.post('http://localhost:3030/authentication', {
                    ...this.user,
                    strategy: 'local'
                });
                console.log(res.data)
                this.$store.commit('setUser', res.data.user)
                this.$router.push('/');
                window.localStorage.setItem('token', res.data.accessToken);
                window.localStorage.setItem('user', JSON.stringify(res.data.user));
            } catch (err) { 
                console.log(err) 
            }
            finally {
                this.loading = false
            }
         }
      }
   }
</script>