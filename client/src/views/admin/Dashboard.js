import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Dashboard.module.css";

import {
  display,
  getVenue,
  addVenue,
  selectDashboard,
} from "./dashboardSlice.js";

export default function Dashboard() {
  const dispatch = useDispatch();
  const venues = useSelector(selectDashboard);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [location_id, setLocation_id] = useState("");
  const [type, setType] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    dispatch(getVenue());
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addVenue(title, desc, location_id, type, link));

    setTitle("");
    setDesc("");
    setLocation_id("");
    setType("");
    setLink("");
  }

  // function handleUpdate(name, desc) {
  //   dispatch(updateRecommendations({ name, desc }));
  // }

  return (
    <div>
      <h1>dashbord view</h1>
      <form className={styles.form} 
      onSubmit={handleSubmit}>
        {/* title form */}
        <div className={styles.title}>
          <label for="title">Title</label>
          <input type="text" onChange={(e) => setTitle(e.target.value)}
                      value={title} />
        </div>
        {/* description form */}
        <div className={styles.desc} >
          <label for="desc">Desc</label>
          <textarea onChange={(e) => setDesc(e.target.value)}
                      value={desc} />
        </div>
{/* Location_id form */}
        <div className={styles.location_id}>
          <label for="location_id">Location_id</label>
          <input type="number" onChange={(e) => setLocation_id(e.target.value)}
                      value={location_id} />
        </div>



{/* Type form */}
        <div className={styles.type}>
          <label for="type">Venue Type</label>
          <select
          onChange={(e) => setType(e.target.value)}
          value={type}
            
            required=""
            className={styles.type}
          >
            <option disabled="" value="" selected="selected">
              Select Type
            </option>
            <optgroup label="Venue type:">
              <option value="bar">bar</option>
              <option value="experience">Experience</option>
              <option value="restaurant">Restaurant</option>
              <option value="shop">Shop</option>
            </optgroup>
          </select>
        </div>

        {/* Link form */}
        <div className={styles.link}>
          <label for="link">Link</label>
          <input type="text" onChange={(e) => setLink(e.target.value)}
                      value={link}  />
        </div>
        <div className={styles.submit}>
          <button className={styles.submit} type="submit" value="Submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
