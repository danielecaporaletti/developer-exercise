import React from "react";
import reactLogo from "../images/React-ico.svg";

export default function Navbar(){
    return (
        <nav>
            <img 
            src={reactLogo}
            alt="React Logo"
            className="nav--ico" 
            />
            <h3 className="nav--logo_text">ReactFacts</h3>
            <h4 className="nav--title">React Course - Project 1</h4>
        </nav>
    )
}