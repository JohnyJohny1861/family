<template>
  <v-card max-width="600" class="mx-auto mt-10">
    <v-list three-line>
      <v-subheader> Expenses </v-subheader>
      <template v-for="(exp) in expenses">

        <v-list-item :key="exp._id">

          <v-list-item-icon>
            <v-icon v-text="'mdi-account'"></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ exp.user }} - {{ exp.amount }} so'm</v-list-item-title>
            <v-list-item-subtitle>{{ exp.text }}</v-list-item-subtitle>
          </v-list-item-content>

        </v-list-item>
      </template>
    </v-list>

    <v-card-text>
      <v-form>
          <v-text-field label="Amount"
              v-model="newExp.amount"
              type="number" />
          <v-text-field
              label="Text"
              v-model="newExp.text"
              type="text" />
      </v-form>

    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn 
          @click="addExpense"
          class="mb-4 mr-4"
          type="button" 
          color="primary"
          :disabled="newExp.text === '' || newExp.amount === ''">Add expense</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import axios from 'axios';
  export default {
    data: () => ({
      expenses: [],
      newExp: {
        amount: '',
        text: ''
      }
    }),
    methods: {
      async addExpense() {
        try{
          const res = await axios('http://localhost:3030/expense', {
            method: 'POST',
            headers: {
              Authorization: window.localStorage.getItem('token')
            },
            data: {
              ...this.newExp,
              user: this.$store.state.userModule.user.username
            }
          });
          this.newExp.amount = '';
          this.newExp.text = '';
          this.valid = true;
          this.expenses.push(res.data);
        } catch(err) {
          console.log(err)
        }
        
      },
      async getExpenses() {
        try {
          const res = await axios.get('http://localhost:3030/expense', {
            headers: {
              Authorization: window.localStorage.getItem('token')
            }
          })
          this.expenses = res.data.data;
        } catch(err) {
          console.log(err)
        }
      }
    },
    mounted() {
      if(!this.$store.state.userModule.user) {
        return this.$router.push('/login');
      }
      this.getExpenses();
    }
  }
</script>
