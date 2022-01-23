import React, { useState } from "react";
import './SearchBar.css'
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from 'react-router-dom';

function SearchBar({  data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (

           <>
        <input className="form-control " type="search" placeholder="Search" aria-label="Search" value={wordEntered} onChange={handleFilter} />
        <div className="searchIcon">
          {/* {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
              <CloseIcon id="clearBtn" onClick={clearInput} />
            )} */}
        </div>


      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 5).map((value, key) => {
            return (

              <Link onClick={clearInput} className="dataItem" to={value.link} key={key}>
                <p>{value.title} </p>

              </Link>
            );
          })}
        </div>
      )}
  </>
  );

}


export default SearchBar;
