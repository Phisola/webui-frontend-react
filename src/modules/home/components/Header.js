//library
import React from 'react';
import { Container, Navbar, NavDropdown } from 'react-bootstrap'

//component
import './Header.css'
import data from './../../../components/menu.json'

function Header() {
    var homeData =JSON.parse(JSON.stringify(data));
    homeData.forEach((d) => {
        d.parent = true
    })
    function mapheader(header_array, depth) {
        return header_array.map((d, i) => {
            if (d.children && d.children.length > 0) {
                // console.log("iteration " + i + " text " + d.text + " depth " + depth + " parentlength " + data.length + " isparent " + d.parent)
                if (d.parent && depth !== homeData.length) {
                    return (
                        <NavDropdown key={`title` + i} title={d.text} id="basic-nav-dropdown">
                            {mapheader(d.children, depth++)}
                        </NavDropdown>
                    )
                }
                else if (depth === data.length - 1 && !d.parent) {
                    return (
                        <NavDropdown drop="start" key={`title` + i} title={d.text} id="basic-nav-dropdown">
                            {mapheader(d.children, depth++)}
                        </NavDropdown>
                    )
                }
                else {
                    return (
                        <NavDropdown drop="end" key={`title` + i} title={d.text} id="basic-nav-dropdown">
                            {mapheader(d.children, depth++)}
                        </NavDropdown>
                       
                    )
                }
            }
            else {
                return (
                    <NavDropdown.Item key={`title` + i} href={d.url}>{d.text}</NavDropdown.Item>
                )
            }
        })
    }
    return (
        <div className="header-container">
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Container>
                    {mapheader(homeData, 0)}
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;
