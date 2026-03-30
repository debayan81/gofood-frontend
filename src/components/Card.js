import React from 'react'

export default function Card(props) {
    // 1. Safely extract the options from props (fallback to empty object if it's still loading)
    let options = props.options || {};
    
    // 2. Extract just the keys (e.g., ["regular", "medium", "large"]) to create the dropdown menu
    let priceOptions = Object.keys(options);

    return (
        <div>
            <div className="card mt-3 shadow" style={{ width: "18rem", maxHeight: "360px" }}>
                {/* Dynamic Image */}
                <img 
                    src={props.imgSrc} 
                    className="card-img-top" 
                    alt={props.foodName} 
                    style={{ height: "150px", objectFit: "cover" }} 
                />
                
                <div className="card-body">
                    {/* Dynamic Title */}
                    <h5 className="card-title">{props.foodName}</h5>
                    
                    {/* Dynamic Description */}
                    <p className="card-text" style={{ fontSize: "0.9rem", color: "#555", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {props.description}
                    </p>
                    
                    <div className="container w-100 p-0">
                        {/* Quantity Dropdown */}
                        <select className="m-2 h-100 bg-success text-white rounded">
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}> {i + 1} </option>
                                )
                            })}
                        </select>

                        {/* Size/Price Options Dropdown */}
                        <select className="m-2 h-100 bg-success text-white rounded">
                            {priceOptions.map((data) => {
                                return (
                                    <option key={data} value={data}>{data}</option>
                                )
                            })}
                        </select>

                        {/* Total Price Placeholder (We will make this calculate real math soon!) */}
                        <div className="d-inline h-100 fs-5">
                            Total Price
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}