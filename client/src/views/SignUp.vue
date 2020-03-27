<template>
    <v-app id="inspire">
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
               <v-col cols="12" sm="8" md="4">
                  <v-card class="elevation-12">
                     <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>Signup form</v-toolbar-title>
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
                           
                           <v-text-field
                              label="Confirm password"
                              v-model="user.confirmPassword"
                              :rules="confirmPasswordRules"
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
                           @click="signup"
                           class="mb-4 mr-4"
                           type="button" 
                           color="primary" 
                           :disabled="!valid">Signup</v-btn>
                     </v-card-actions>
                  </v-card>
               </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
   import { mapActions, mapState } from 'vuex'
   import { mdiAccount, mdiAccountArrowLeft, mdiLock, mdiImage } from '@mdi/js';
   export default {
      name: 'signup',
      data: (vm) => ({
         icons: {
            username: mdiAccount,
            displayName: mdiAccountArrowLeft,
            password: mdiLock,
            imageUrl: mdiImage
         },
         user: {
            username: '',
            password: '',
            confirmPassword: ''
         },
         valid: false,
         notEmptyRules: [ v => !!v || 'Can not be empty'],
         confirmPasswordRules: [v => v === vm.user.password || 'Password must match']
      }),
      computed: {
         ...mapState('users', { loading: 'isCreatePending' }),
      },
      methods: {
         ...mapActions('users', [ 'create' ]),
         ...mapActions('auth', [ 'authenticate' ]),
         async signup() {
            try {
               await this.create({
                  ...this.user,
                  strategy: 'local'
               });
               this.$router.push('/login');
            } catch (err) { 
               console.log(err) 
            }
         }
      },
      async mounted() {
         try {
            const res = await this.authenticate()
            if(res.user) {
               this.$router.push('/');
            }
         } catch (err) {
            console.log(err);
         }
      }
   }
</script>