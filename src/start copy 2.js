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
    background: isDraggingOver ? "rgba(255, 255, 255, 0.2)" : "#161616",
    //display: 'flex',
    // padding: grid,
    // width: "100%",
    // flexDirection: "row",
    // flexWrap: "wrap",
    // justifyContent: "center",

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
    minHeight: 200,
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
                    link:
                        "https://event-entertainment.eu/portfolio/hoverboard-showact/",
                    filter: "hitech",
                    info: "portfolio-item",
                },

                {
                    name: "Show 1",
                    img: "./assets/images/portfolio/projekt1.jpg",
                    filter: "hitech",
                    info: "portfolio-item",
                },
                {
                    name: "Show 2",
                    img: "./assets/images/portfolio/Projekt2.jpg",
                    filter: "hitech",
                    info: "portfolio-item",
                },
                {
                    name: "Show 3",
                    img: "./assets/images/portfolio/projekt3.jpg",
                    filter: "funny",
                    info: "portfolio-item",
                },
                {
                    name: "Show 4",
                    img: "./assets/images/portfolio/projekt4.jpg",
                    filter: "funny",
                    info: "portfolio-item",
                },
                {
                    name: "Show 5",
                    img: "./assets/images/portfolio/Projekt_5.jpg",
                    filter: "funny",
                    info: "portfolio-item",
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
                                    <li><a href="#" data-filter=".funny">Funny</a></li>
        
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
                                                        
                                                                {/* <div className="portfolio-item hover-bottom show_module_img-txt"> */}
                                                                {/* {item.content} */}
                                                                <img src={img}></img>
                                                                {name}

                                                                <button className="btn-small btn-ghost-light">
                                                                    <a href={link} onClick={link}>MORE</a>
                                                                </button>

                                                                <div className="show_module_description">
                                                                    {/* {link} */}
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
                                    >
                                        {(provided, snapshot) => (
                                            //Show module dragged
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
                                                
                                                <div className="show_module_img-txt">
                                                    {/* {item.content} */}
                                                    <img src={img}></img>
                                                    {name}
                                                    {/* {link} */}
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
