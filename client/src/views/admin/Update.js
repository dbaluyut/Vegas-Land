import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { DashboardTable } from "../../ui/DashboardTable"
import styles from "./Update.module.css";

import {
  display,
  getVenue,
  // addVenue,
  updateVenue,
  selectUpdate,
} from "./updateSlice.js";

export default function Update() {
  const dispatch = useDispatch();
  const venues = useSelector(selectUpdate);
  const [venueMap, setVenueMap] = useState({});

  useEffect(() => {
    const vMap = {};
    venues.map((item) => {
      vMap[item.id] = item;
    });
    setVenueMap(vMap);
  }, [venues]);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [location_id, setLocation_id] = useState("");
  const [type, setType] = useState("");
  const [link, setLink] = useState("");

  const [activeVenue, setActiveVenue] = useState("");

  useEffect(() => {
    dispatch(getVenue());
  }, []);

  // function handleSubmit(e) {
  //   e.preventDefault()
  //   dispatch(addVenue({ title, desc, location_id, type, link }))

  //   setTitle("")
  //   setDesc("")
  //   setLocation_id("")
  //   setType("")
  //   setLink("")
  // }

  const handleSelect = (e) => {
    /// select venue from map
    const id = e.target.value;
    console.log(venueMap[id]);
    setActiveVenue(e.target.value);
  };

  function handleUpdateVenue(venue) {
    dispatch(updateVenue({ title, desc, type, link }));
  }

  // function handleUpdate(name, desc) {
  //   dispatch(updateRecommendations({ name, desc }));
  // }

  return (
    <div className={styles.dashContainer}>
      <div className={styles.dashboardSidebar}>
        <h1>update page view</h1>
        <form className={styles.form} onSubmit={handleUpdateVenue}>
          {/* dropdown */}
          <div
            className={styles.dropdown}
            // onChange={setActiveVenue}
            // onChange={(e) => setActiveVenue(e.target.value)}
          >
            <label for="venues">Venues</label>
            <select
              className={styles.type}
              value={activeVenue}
              onChange={handleSelect}
            >
              <optgroup label="Venues:">
                {venues.map((venue) => {
                  return <option value={venue.id}>{venue.title}</option>;
                })}
              </optgroup>
            </select>
          </div>

          {/* title form */}
          <div className={styles.title}>
            <label for="title">Title</label>
            <input type="text" value={activeVenue.title} />
          </div>
          {/* description form */}
          <div className={styles.desc}>
            <label for="desc">Desc</label>
            <textarea></textarea>
          </div>
          {/* Location_id form */}
          <div className={styles.location_id}>
            <label for="location_id">Location_id</label>
            <input type="number" />
          </div>

          {/* Type form */}
          <div className={styles.type}>
            <label for="type">Venue Type</label>
            <select required="" className={styles.type}>
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
            <input type="text" value={link} />
          </div>
          <div className={styles.submit}>
            <button className={styles.submit} type="submit" value="Submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
