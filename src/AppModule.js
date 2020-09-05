import React from "react";
import ShowModule from "./ShowModule.js";

export default class AppModule extends React.Component {
    constructor() {
        super();
        this.state = [
            {
                name: "Show 1",
                img: "./dbp/assets/images/portfolio/projekt1.jpg",
            },
            {
                name: "Show 2",
                img: "./dbp/assets/images/portfolio/Projekt2.jpg",
            },
            {
                name: "Show 3",
                img: "./dbp/assets/images/portfolio/projekt3.jpg",
            },
            {
                name: "Show 4",
                img: "./dbp/assets/images/portfolio/projekt4.jpg",
            },
            {
                name: "Show 5",
                img: "./dbp/assets/images/portfolio/Projekt_5.jpg",
            },
        ];
    }
    render() {
        return (
            <div>
                {this.state.map((item) => (
                    <div key>
                        <ShowModule name={item.name} img={item.img} />
                    </div>
                ))}
            </div>
        );
    }
}
