import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AppModule from "./AppModule.js";
import AppModulSingle from "./AppModulSingle.js";
import ShowModule from "./ShowModule.js";

// fake data generator

// const getItems = (count, offset = 0) =>
//     Array.from({ length: count }, (v, k) => k).map((k) => ({
//         id: `item-${k + offset}`,
//         content: `Project ${k + offset}`,
//     }));

const getItems = count =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k}`,
        content: `item ${k}`,
    }));



// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 0;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    //padding: grid * 2,
    //margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "rgba(255, 255, 255, 0.5)" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle,
});
//style on drag
const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "rgba(255, 255, 255, 0.1)" : "#161616",
    minHeight: 300,
    //display: 'flex',
    // padding: grid,
    // width: "100%",
    //flexDirection: "row",
    //flexWrap: "wrap",
    //justifyContent: "center",

});

const getListStyleSecond = (isDraggingOver) => ({
    paddingTop: 10,
    paddingBottom: 10,
    //background: isDraggingOver ? "lightblue" : "transparent",
    display: 'flex',
    //padding: grid,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    minHeight: 220,
    backgroundImage: "url('./assets/images/bg3.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: '50%',
    backgroundAttachment: 'fixed',

});


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // items: getItems(10),
            // selected: getItems(1, 2),
            items: [
                {
                    name: "HOVER BOARD SHOW",
                    img: "./static/hoverboard-show-act-02-650x365.jpg",
                    link:"https://event-entertainment.eu/language/en/portfolio/hoverboard-show-act/",
                    filter: "hitech",
                    info: "Casual and cool. At the pulse of time",
                },
                {
                    name: "LED DRONE SHOW",
                    img: "./static/drone-show-02-650x365.jpg",
                    link:"https://event-entertainment.eu/language/en/portfolio/led_drone_show_act/",
                    filter: "hitech",
                    info: "An absolutely unique LED Drone Showact",
                },
                
                {
                    name: "LASER DANCE PERFORMANCE",
                    img: "./static/laser-dance-performance-650x365.jpg",
                    link:"https://event-entertainment.eu/language/en/portfolio/laser-dance-performance/",
                    filter: "hitech",
                    info: "choreography of light and movement",
                },
               
                {
                    name: "HOLOGRAPHIC PERFORMANCE",
                    img: "./static/holographic-performance2-650x365.jpg",
                    link:"https://event-entertainment.eu/language/en/portfolio/holographic-performance/",
                    filter: "hitech",
                    info: "“materialize” everything that comes up with imagination ",
                },

                {
                    name: "LED SHOW ACT",
                    img: "./static/led-bmx-showact1-650x365.jpg",
                    link:"https://event-entertainment.eu/language/en/portfolio/led-show-act/",
                    filter: "hitech",
                    info: "High tech LED costumes, high tech LED requisite ",
                },

                {
                    name: "PROJECTION MAPPING SHOW ACT",
                    img: "./static/projection-mapping2-650x365.jpg",
                    link:"https://event-entertainment.eu/language/en/portfolio/projection-mapping-show-act/",
                    filter: "hitech",
                    info: "2D- or 3D objects turn into a video display",
                },

                {
                    name: "AERIAL STRAPS SHOW ACT",
                    img: "./static/aerial-straps-showact-650x365.jpg",
                    link: "https://event-entertainment.eu/language/en/portfolio/aerial-straps-show-act/",
                    filter: "aerial",
                    info: "breathtaking acrobatics at the highest stage",
                },

                {
                    name: "VERTICAL DANCE SHOW ACT",
                    img: "./static/vertical-dance-showact-650x365.jpg",
                    link: "https://event-entertainment.eu/language/en/portfolio/vertical-dance-show-act/",
                    filter: "aerial",
                    info: "A wall bekomes a stage",
                },

                {
                    name: "AERIAL CHANDELIER SHOW ACT",
                    img: "./static/aerial-chandelier-showact-650x365.jpg",
                    link: "https://event-entertainment.eu/language/en/portfolio/aerial-chandelier-show-act/",
                    filter: "aerial",
                    info: "an oversized chandelier, 2000 sparkling crystals, and high-class acrobatics",
                },

                {
                    name: "ACROBATIC TANGO BALLET",
                    img: "./static/acrobatic-tango-ballet-01-650x365.jpg",
                    link: "https://event-entertainment.eu/language/en/portfolio/acrobatic-tango-ballet/",
                    filter: "dance",
                    info: "ballet and acrobatics combined “Adagio” on the ground and in the air",
                },
               
            ],

            selected: getItems(),
        };

        /**
         * A semi-generic way to handle multiple lists. Matches
         * the IDs of the droppable container to the names of the
         * source arrays stored in the state.
         */
        this.id2List = {
            droppable: "items",
            droppable2: "selected",
        };
    }

    getList(id) {
        return this.state[this.id2List[id]];
    }

    onDragEnd(result) {
        const { source, destination } = result;
        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { items };

            if (source.droppableId === "droppable2") {
                state = { selected: items };
            }

            this.setState(state);
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            this.setState({
                items: result.droppable,
                selected: result.droppable2,
            });
        }
    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (
            <DragDropContext onDragEnd={(result) => this.onDragEnd(result)}>
                <Droppable droppableId="droppable" direction="horizontal">
                    {(provided, snapshot) => (
                        //kasten-----------------------------------------------
                        <div className=""
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {/* ================== Portfolio Filter ==================  */}
                            
                            <div className="row">
                                <ul id="pfolio-filters" className="portfolio-filters">
                                    <li className="active"><a href="#" data-filter="*">All</a></li>
                                    <li><a href="#" data-filter=".hitech">Hitech</a></li>
                                    <li><a href="#" data-filter=".aerial">Aerial</a></li>
                                    <li><a href="#" data-filter=".dance">Dance</a></li>
                                    <li><a href="#" data-filter=".music">Music</a></li>
                                    <li><a href="#" data-filter=".special">Special</a></li>
                                    <li><a href="#" data-filter=".variete">Variete</a></li>
        
                                </ul>
                            </div>
                            <div className="row">
                                <div id='pfolio'>


                                    {this.state.items.map(
                                        ({ name, img, link, filter, info }, index) => (
                                            <Draggable
                                                key={name}
                                                draggableId={name}
                                                index={index}
                                                link={link}
                                                filter={filter}
                                                info={info}
                                            >
                                                {(provided, snapshot) => (
                                                    // Show module draggable
                                                    <div
                                                        className="show_module"
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps
                                                                .style
                                                        )}
                                                    >
                                                        {/* === Portfolio Items === */}
                                                        <div className={"portfolio-item " + filter}>
                                                            <div className="show_module_img-txt"> 
                                                                <div className="p-wrapper hover-default">
                                                                    <img className="responsive" src={img} alt={name}></img>
                                                                    <div className="p-hover">
                                                                        <div className="p-content">
                                                                            <h4>{name}</h4>
                                                                            <h6 className="subheading">{info}</h6>
                                                                        </div>
                                                                    </div>
                                                                    <a href={link} className="open-btn"><i className="fa fa-expand"></i></a>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                )}
                                            </Draggable>
                                        )
                                    )}
                                    {provided.placeholder}
                                </div>{/* //pfolio */}
                                
                            </div>{/* //row */}
                                
                        </div>

                    )}
                </Droppable>
                {/* ------------SECOND AREA----------------- */}
                <div>
                   
                    <header className="sec-heading section-30-0">
                        <span className="subheading">drop the show moduls here</span>
                    </header>
                </div>
                <Droppable droppableId="droppable2" direction="horizontal">
                    {(provided, snapshot) => (
                        <div 
                            ref={provided.innerRef}
                            style={getListStyleSecond(snapshot.isDraggingOver)}
                        >
                     
                            {this.state.selected.map(
                                ({ name, img, link }, index) => (
                                    <Draggable
                                        key={name}
                                        draggableId={name}
                                        index={index}
                                        link={link}
                                    >
                                        {(provided, snapshot) => (
                                            //Show module dragged
                                            <div
                                                className="show_module_second"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps
                                                        .style
                                                )}
                                            >
                                                
                                                <div className="show_module_img-txt_second">
                                                    <img src={img}></img>
                                                    {name}
                                                    
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                )
                            )}

                            
                            {/* {console.log("Selected", this.state.selected)} */}
                            { console.log('SELECTED ITEMS', JSON.stringify(this.state.selected))}

                            {provided.placeholder}
                            <div></div>
                        </div>
                    )}
                </Droppable>

                {/* ====== EMAIL FORM ====== */}

                {
                    <div>
                        <header className="sec-heading section-30-0">
                            <span className="subheading">
                                send us your production ideas
                            </span>
                        </header>
                        <div className="center_row">
                            <div className="col-lg-4">
                                <form
                                    action="./assets/contact-form/contact-form.php"
                                    method="POST"
                                    className="form-ajax wow fadeInUp"
                                    data-wow-duration="1s"
                                    data-wow-delay=".1s"
                                >
                                    {/* <!-- Name --> */}
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name-contact-1"
                                            className="form-control validate-locally"
                                            placeholder="Enter your name"
                                        ></input>
                                        <label htmlFor="name-contact-1">
                                            Name
                                        </label>
                                        <span className="pull-right alert-error"></span>
                                    </div>

                                    {/* <!-- Email --> */}
                                   

                                    <div className="form-group">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email-contact-1"
                                            className="form-control validate-locally"
                                            placeholder="Email"
                                        ></input>
                                        <label htmlFor="email-contact-1">
                                            Email
                                        </label>
                                        <span className="pull-right alert-error"></span>

                                        <p className="antispam">
                                            Leave this empty: <br />
                                            <input name="url" />
                                        </p>
                                    </div>

                                    {/* <!-- Message --> */}
                                    <div className="not_visible form-group ">
                                        <textarea
                                            className="form-control"
                                            name="message"
                                            id="message-contact-1"
                                            rows="5"
                                            placeholder={JSON.stringify(this.state.selected, null, 1)}
                                            
                                           
                                            
                                            // "Your Message"
                                        >
                                            {this.state.selected}
                                        </textarea>
                                        <label htmlFor="message-contact-1">
                                        Message
                                        </label>
                                    </div>
                                    <input
                                        type="submit"
                                        className="btn pull-right"
                                        value="Send your choices"
                                    ></input>

                                    {/* <!-- Ajax Message --> */}
                                    <div className="ajax-message col-md-12 no-gap"></div>
                                </form>
                            </div>
                        </div>
                    </div>
                }
            </DragDropContext>
        );
    }
}
console.log("GG 20:27");
// Put the things into the DOM!
ReactDOM.render(<App />, document.getElementById("react"));
