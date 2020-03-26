const state = {
   expenses: null
};

const mutations = {
   addExpense: (state, expense) => state.expenses.push(expense),
   removeExpense: (state, index) => state.expenses.split(index, 1)
};

export default {
   state,
   mutations
}