import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const recommendationsTableSlice = createSlice({
  name: "recommendationsTable",
  initialState: {
    recommendationsTable: [],
  },

  reducers: {
    setRecommendationsTable: (state, action) => {
      state.recommendationsTable = action.payload;
    },
  },
});

const { setRecommendationsTable } = recommendationsTableSlice.actions;

export const getRecommendationsTable = () => (dispatch) => {
  axios.get("api/recommendations").then((r) => dispatch(setRecommendationsTable(r.data)));
};

export const addRecommendationsTable = (recommendation) => (dispatch) => {
 console.log(recommendation)
  axios
    .post("api/recommendations", {
      name: recommendation.name, 
      email: recommendation.email, 
      desc: recommendation.text 
    })
    .then((r) => {
      dispatch(setRecommendationsTable());
    });
};

// export const removeTableItem = (id) => (dispatch) => {
//   console.log(id)
//   axios.delete("/api/venues/" + id).then((r) => {
//     dispatch(getDashboardTable())
    
//   }).catch((error) => {
//     console.log('error')
//   })
// }


export const selectRecommendationsTable = (state) => state.recommendationsTable.recommendationsTable;
// export const selectNewRecommendations = (state) => state.form.recommendations;

export default recommendationsTableSlice.reducer;
