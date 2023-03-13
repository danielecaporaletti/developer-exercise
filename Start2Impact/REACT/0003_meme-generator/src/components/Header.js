import React from "react";
import TrollFace from "../images/troll-face.svg"

export default function Header() {
    return (
        <header className="header">
            <img 
            src={TrollFace} 
            alt="troll-face" 
            className="header--image"
            />
            <h1 className="header--title">Meme Generator</h1>
            <h4 className="header--project">React Course - Project 3</h4>
        </header>
    )
}