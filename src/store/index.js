import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    tickets: [],
  },
  getters: {},
  mutations: {
    setNewTicketImg(state, { itemId, file }) {
      const item = state.tickets.find((el) => el.id === itemId);
      if (item) {
        item.url = file;
      }
    },
    setTicketsData(state, items) {
      state.tickets = items;
    },
    updateTicketAvatar(state, newData) {
      const item = state.tickets.find((el) => el.id === newData.id);
      const itemIndex = state.tickets.indexOf(item);
      state.tickets[itemIndex] = newData;
    },
    addNewTicket(state, newItem) {
      if (!state.tickets.includes(newItem)) {
        state.tickets.push(newItem);
      }
    },
  },
  actions: {
    getTickets({ commit }, limit) {
      axios.get(`https://dummyjson.com/users?limit=${limit}`)
        .then((response) => {
          commit('setTicketsData', response.data.users);
        })
        .catch((error) => console.log(error));
    },
    setNewAvatar({ commit }, { formData, itemId }) {
      axios.put(
        `https://dummyjson.com/users/${itemId}`,
        formData,
        { headers: { 'Content-Type': 'application/json' } },
      )
        .then((response) => {
          commit('updateTicketAvatar', response.data);
        })
        .catch((error) => console.log(error));
    },
  },
});
