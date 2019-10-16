import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {Nav, Navbar, NavItem } from "react-bootstrap";

class Header extends Component {

    static propTypes = {
        authenticated: PropTypes.bool
    };

    renderLinks() {
            return (
                
                <Nav>
                    <NavItem key={1} componentClass={Link} href="/upload" to="/upload">
                        Upload Image
                    </NavItem>
                    <NavItem key={2} componentClass={Link} href="/list" to="/list">
                        List Images
                    </NavItem>
		            <NavItem key={3} componentClass={Link} href="/viewer" to="/viewer">
                        Image Viewer
                    </NavItem>
                </Nav>
                
            );
    }

    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Image manager</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                {this.renderLinks()}
            </Navbar>
        )
    }
}

export default Header
