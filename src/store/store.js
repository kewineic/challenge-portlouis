const store = new Vuex.Store({
  state: {
    savedContacts: [],
  },

  mutations: {
    CREATE_CONTACT({savedContacts}, data) {
      savedContacts.push(data);
    },

    UPDATE_CONTACT({savedContacts}, {index, data}) {
      savedContacts.splice(index, 1, data);
    },

    DELETE_CONTACT({savedContacts}, index) {
      savedContacts.splice(index, 1);
    }
  },

  actions: {
    includeContactData({ commit }, data) {
      commit('CREATE_CONTACT', data);
    },

    updateContactData({ commit }, {index, data}) {
      commit('UPDATE_CONTACT', {index, data});
    },

    deleteContactData({ commit }, index) {
      commit('DELETE_CONTACT', index);
    }
  },

  getters: {
    readContactData({ savedContacts }) {
      return savedContacts
    }
  }
});