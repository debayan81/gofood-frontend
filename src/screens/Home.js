import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card'; // Make sure this path is correct for your project!

export default function Home() {
  // 1. State variable to hold the food array
  const [foodItem, setFoodItem] = useState([]);

  // 2. Function to fetch data from the backend
  const loadData = async () => {
    try {
      console.log("🟢 TRACER 1: loadData function just started!"); 
      
      let response = await fetch("http://localhost:5000/api/data/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log("🟢 TRACER 2: Fetch successfully knocked on port 5000!", response); 
      
      response = await response.json();
      
      console.log("🟢 TRACER 3: Data received from database:", response); 
      setFoodItem(response[0]); 
      
    } catch (error) {
      console.error("🔴 TRACER ERROR: The fetch completely failed!", error);
    }
  }

  // 3. Run this function exactly once when the page first loads
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h2>Welcome to GoFood</h2>
        <hr />
        
        {/* Dynamic Card Rendering */}
        <div className="row">
          {foodItem.length > 0 ? (
            foodItem.map((data) => {
              return (
                <div key={data._id} className="col-12 col-md-6 col-lg-3 mb-4">
                  <Card 
                    foodName={data.name} 
                    options={data.options[0]} 
                    imgSrc={data.img} 
                    description={data.description} 
                  />
                </div>
              );
            })
          ) : (
            <div className="fs-3 mt-4">Loading Menu...</div>
          )}
        </div>

      </div>
    </div>
  );
}