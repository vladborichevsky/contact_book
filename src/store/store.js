
import { createStore } from "vuex"

export default createStore( {

  state: () => ( { 
    nightMode: false, // переменная, отвечающая за ночной режим
  }),

  mutations: {
    setNightMode(state, newValue) {
      state.nightMode = newValue
    }
  }
  
})
