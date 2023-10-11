import "./pantry.css";
import logoImg from "../../images/Vector.png";
import React, { useEffect, useState } from "react";

const Pantry = () => {
    const [pantry, setPantry] = useState([]);


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }
    
                const response = await fetch("http://localhost:8080/user/pantry", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    method: "GET",
                });
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
    
                const data = await response.json();
                setPantry(data.pantry);
            } catch (error) {
                console.error('Error fetching user pantry:', error);
            }
        };
    
        fetchUserData();
    }, []);
    
    

    return (
        <div className="container">
            {/* Left Container - Pantry */}
            <div className="left-container">
                <h3>My Pantry</h3>
                <ul>
                    {pantry.map((item, index) => (
                        <li key={index}>{item.ingredientName}</li>
                    ))}
                </ul>
            </div>
    
            {/* Center Container - Remix Button */}
            <div className="center-container">
                {/* Replace with your logoImg or Remix Button */}
                <div className="remix-button">
                    Remix
                </div>
            </div>
    
            {/* Right Container - Recipe Matching (To be implemented later) */}
            <div className="right-container">
                {/* Placeholder for Recipe Matching */}
                <h3>Matched Recipes</h3>
            </div>
        </div>
    );
    
}

export default Pantry;