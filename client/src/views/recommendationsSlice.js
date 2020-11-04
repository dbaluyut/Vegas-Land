import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const recommendationsSlice = createSlice({
  name: "form",
  initialState: {
    recommendations: [],
  },

  reducers: {
    display: (state, action) => {
      state.recommendations = action.payload;
    },
  },
});

const { display } = recommendationsSlice.actions;

export const getRecommendations = () => (dispatch) => {
  axios.get("api/recommendations").then((r) => dispatch(display(r.data)));
};

export const addRecommendations = (name, email, text) => (dispatch) => {
  axios
    .post("api/recommendations", {name: name, email: email, desc: text })
    .then((r) => {
      dispatch(getRecommendations());
    });
};

// export const addTodo = (text) => (dispatch) => {
//     axios.post("api/todos", {content: text}).then((resp) => {
//       // console.log(text)
//       dispatch(fetchTodos())
//     })
//   }

export const selectRecommendations = (state) => state.form.recommendations;
export const selectNewRecommendations = (state) => state.form.recommendations;

export default recommendationsSlice.reducer;
