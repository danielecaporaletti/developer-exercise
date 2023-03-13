import React from "react";
import AirbnbLogo from "../images/airbnb-logo.svg";

export default function Navbar() {
    return (
        <nav>
            <img 
            src={AirbnbLogo} 
            alt="AirbnbLogo" 
            className="nav--logo"/>
        </nav>
    )
}