import React from "react";
import PhotoIntro from "../images/photo-grid.svg";

export default function Navbar() {
    return (
        <section className="hero">
            <img 
            src={PhotoIntro} 
            alt="PhotoIntro" 
            className="hero--photo"
            />
            <h1 className="hero--header">Online Experiences</h1>
            <p className="hero--text">Join unique interactive activities led by 
            one-of-a-kind hosts—all without leaving 
            home.</p>
        </section>
    )
}