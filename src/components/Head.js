import React, { useState } from 'react'
import SearchBar from './SearchBar';
import data from './menu.json'
import { Link } from 'react-router-dom';
import './Headers.css'
import { Container, Navbar, NavDropdown } from 'react-bootstrap'
export default function Head() {
  let searchArray = []
  function SearchArray(sData) {
    if (sData) {
      sData.map((d, i) => {
        if (d.children) {
          let parent = d.text
          d.children.forEach((c,j) =>{
            c.text = parent + " " + c.text
          })
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
  var homeData =JSON.parse(JSON.stringify(data));
  { SearchArray(homeData) }
  console.log(searchArray)
  // console.log(data)

  return (
    <div className="header-container" >
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo01" >

            <ul className="navbar-nav mr-auto mt-2 mt-lg-0" >
              <li className="nav-item active">
                {/* <a className="navbar-brand" href="#">logo</a> */}
                <img src="lab.jpg" className="logo" alt="" />


              </li>
              <li className="nav-item active">
                <a className="navbar-brand" href="#" style={{ marginRight: "20rem" }}><strong>Lab Automation Equipment Pod</strong></a>

              </li>

              <li className="nav-item active" >
                <a className="nav-link" href="#" style={{ height: "1px", marginBottom: "0.1rem" }}> <SearchBar data={searchArray} /> </a>
              </li>

              <li className="nav-item">
                {/* <Link classNameName="nav-link active" aria-current="page" to="" style={{ fontWeight: "bold", color: "#004080" }}>Home</Link> */}
                <Link to="/" className="nav-link active">
                  <img src="house-door.svg" style={{ fontWeight: "bold", color: "#004080" }} className="homeButton" alt="" />
                </Link>
              </li>
              <li className="nav-item active">

                <Link className="nav-link active" aria-current="page" to="" style={{ fontWeight: "bold", color: "#004080" }}>Help</Link>
              </li>

              <li className="nav-item">

                <a className="nav-link active dropdown-toggle" href="/" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ fontWeight: "bold", color: "#004080" }}>
                  My Automation
                </a>
              </li>
            </ul>

          </div>


        </Container>
      </Navbar>
    </div>
  )
}
