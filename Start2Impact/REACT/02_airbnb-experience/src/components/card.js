import React from "react";
import card1 from "../images/card1.svg";
import star from "../images/star.svg";

export default function Card() {
    return (
        <div className="card">
            <img
            src={card1}
            alt="card1"
            className="card--image"
            />
            <div className="card--stats">
                <img 
                src={star}
                alt="star"
                className="card--star"
                />
                <span>5.0</span>
                <span className="gray">(6) ·</span>
                <span className="gray">USA</span>
            </div>
            <p>Life Lessons with Katie Zaferes</p>
            <p><span className="bold">From $136</span> / person</p>
        </div>
    )
}