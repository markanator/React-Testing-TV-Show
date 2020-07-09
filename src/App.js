import React, { useState, useEffect } from "react";
import Dropdown from "react-dropdown";
import parse from "html-react-parser";

import { formatSeasons } from "./utils/formatSeasons";

import Episodes from "./components/Episodes";
import "./styles.css";

// api import
import {fetchShow} from './api/Fetchshow';

export default function App() {
  const [show, setShow] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState("");
  const episodes = seasons[selectedSeason] || [];

  useEffect(() => {
    fetchShow()
    .then(res => {
      console.log(res)
      setShow(res);
      setSeasons(formatSeasons(res._embedded.episodes));
    })
    .catch(err => console.log(err))
  }, []);

  const handleSelect = e => {
    setSelectedSeason(e.value);
  };

  if (!show) {
    return <h2 data-testid='fetch'>Fetching data...</h2>;
  }

  return (
    <div className="App">
      <img data-testid='poster' className="poster-img" src={show.image.original} alt={show.name} />
      <h1>{show.name}</h1>
      {parse(show.summary)}
      <Dropdown
        data-testid='dropy'
        options={Object.keys(seasons)}
        onChange={handleSelect}
        value={selectedSeason || "Select a season"}
        placeholder="Select an option"
      />
      <Episodes episodes={episodes} />
    </div>
  );
}
