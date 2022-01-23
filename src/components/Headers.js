//library
import React from 'react'
import { Link } from 'react-router-dom';

//component
import './Headers.css'
import SearchBar from './SearchBar';
import data from './menu.json'


export default function Headers() {

  let searchArray = []
  function SearchArray(sData) {
    if (sData) {
      sData.map((d, i) => {
        if (d.children) {
          // let parent = d.text
          // d.children.forEach((c,j) =>{
          //   c.text = parent + " " + c.text
          // })
          SearchArray(d.children)
        }
        else {
          searchArray.push({
            title: d.text,
            link: d.url
          })
        }
      })
    }
  }
  { SearchArray(data) }
  console.log(searchArray)
  console.log(data)
  return (

    <div className="header-container">

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <img src="lab.jpg" className="logo" alt="" />
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav" >
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="hello" style={{ fontSize: "25px", fontWeight: "bold" }} >Lab Automation Equipment Pod</a>
              </li>
              <li className="nav-item" >

                <SearchBar data={searchArray} />

              </li>
              <li className="nav-item">
                <Link to="/">
                  <img src="house-door.svg" className="homeButton" alt="" />
                </Link>
              </li>
              <li className="nav-item" >
                <Link className="nav-link active" aria-current="page" to="" style={{ marginLeft: "10px", fontWeight: "bold", color: "#004080", marginTop: "7px" }}>Help</Link>
              </li>
              <li className="nav-item dropdown">

                <a className="nav-link active dropdown-toggle" href="/" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ fontWeight: "bold", color: "#004080", marginTop: "7px" }}>
                  My Automation
                </a>
                {/* MyAutomation list will be appear year */}

              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>

  )
}



