import React from "react";

export default function ShowModule(props) { 
    const { name, img } = props;
    return (
        <div className='show_module'>
            
            <h3>
                {name}
            </h3>
            <img src={img}></img>

        </div>
    );
}
