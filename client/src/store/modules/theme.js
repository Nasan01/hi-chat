const darkTheme = {
  text: "text-gray-200",
  text2: "text-gray-400",
  bg1: "bg-gray-700",
  bg2: "bg-gray-600"
}

const lightTheme = {
  text: "text-gray-700",
  text2: "text-gray-500",
  bg1: "bg-gray-100",
  bg2: "bg-gray-50"
}

const theme = {
  state: () => {
    return {
      dark: false,
      theme: lightTheme
    }
  },

  mutations: {
    switchTheme(state) {
      state.dark = !state.dark
      if(state.dark) {
        state.theme = darkTheme
      } else {
        state.theme = lightTheme
      }
    }
  },
}

export default theme
