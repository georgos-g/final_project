import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ModalVideo from "react-modal-video";
import { AutoScaling } from "aws-sdk";

const getItems = (count) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
        id: `item-${k}`,
        content: `item ${k}`,
    }));

// const getItems = (count) => Array.from({ length: count }, (v, k) => k).map(k => {
//     const u = window.unique = (window.unique || 0) + 1
//     return {
//         id: `item-${u}`,
//         content: `item ${u}`
//     };
// });

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

// Moves an item from one list to another list.

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
    padding: grid * 1,
    margin: `0 0 ${grid}px 0`,
    display: "inline-flex",
    //flexDirection: "row",
    //flexWrap: "wrap",

    // change background colour if dragging
    //background: isDragging ? "rgba(255, 255, 255, 0.5)" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle,
});
//style on drag
const getListStyle = (isDraggingOver) => ({
    //background: isDraggingOver ? "rgba(255, 255, 255, 0.1)" : "#161616",
    minHeight: 480,
    padding: grid,
    //display: 'inline-flex',
    //overflow: "auto",

    //width: "100%",
    //flexDirection: "row",
    //flexWrap: "wrap",
    //justifyContent: "center",
    // margin: "auto",
});

const getListStyleSecond = (isDraggingOver) => ({
    paddingTop: 10,
    paddingBottom: 10,
    background: isDraggingOver
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(0, 0, 0, 0.3)",
    //background: isDraggingOver ? "" : "",
    display: "flex",

    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    minHeight: 220,
    //img bg----
    // backgroundImage: "url('./assets/images/bg3.jpg')",
    // backgroundSize: 'cover',
    // backgroundPosition: '50%',
    // backgroundAttachment: 'fixed',
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false, //ModalVideo

            //items: getItems(4),
            // selected: getItems(1, 2),
            items: [
                {
                    name: "HOVER BOARD SHOW",
                    img: "./static/hoverboard-show-act-02-650x365.jpg",
                    link:
                        "https://event-entertainment.eu/language/en/portfolio/hoverboard-show-act/",
                    filter: "hitech",
                    info: "Casual and cool. At the pulse of time",
                    video: "331934243",
                    details: "max 5min | 8x4m | gala/show ",
                },
                {
                    name: "LED DRONE SHOW",
                    img: "./static/drone-show-02-650x365.jpg",
                    link:
                        "https://event-entertainment.eu/language/en/portfolio/led_drone_show_act/",
                    filter: "hitech",
                    info: "An absolutely unique LED Drone Showact",
                    video: "267222163",
                    details: "max 10min | 12x4m | highlight act ",
                },

                {
                    name: "LASER DANCE PERFORMANCE",
                    img: "./static/laser-dance-performance-650x365.jpg",
                    link:
                        "https://event-entertainment.eu/language/en/portfolio/laser-dance-performance/",
                    filter: "hitech",
                    info: "choreography of light and movement",
                    video: "116750941",
                    details: "max 5min | 8x4m | gala/show ",
                },

                {
                    name: "HOLOGRAPHIC PERFORMANCE",
                    img: "./static/holographic-performance2-650x365.jpg",
                    link:
                        "https://event-entertainment.eu/language/en/portfolio/holographic-performance/",
                    filter: "hitech",
                    info:
                        "“materialize” everything that comes up with imagination ",
                    video: "116053237",
                    details: "max 10min | 8x6m | highlight act ",
                },

                {
                    name: "LED SHOW ACT",
                    img: "./static/led-bmx-showact1-650x365.jpg",
                    link:
                        "https://event-entertainment.eu/language/en/portfolio/led-show-act/",
                    filter: "hitech",
                    info: "High tech LED costumes, high tech LED requisite ",
                    video: "107921842",
                    details: "max 8min | 6x4m | gala/show ",
                },

                {
                    name: "PROJECTION MAPPING SHOW ACT",
                    img: "./static/projection-mapping2-650x365.jpg",
                    link:
                        "https://event-entertainment.eu/language/en/portfolio/projection-mapping-show-act/",
                    filter: "hitech",
                    info: "2D- or 3D objects turn into a video display",
                    video: "107048760",
                    details: "max 8min | 6x4m | gala/show ",
                },

                {
                    name: "AERIAL STRAPS SHOW ACT",
                    img: "./static/aerial-straps-showact-650x365.jpg",
                    link:
                        "https://event-entertainment.eu/language/en/portfolio/aerial-straps-show-act/",
                    filter: "aerial",
                    info: "breathtaking acrobatics at the highest stage",
                    video: "116738569",
                    details: "max 5min | 4x4m | gala/show ",
                },

                {
                    name: "VERTICAL DANCE SHOW ACT",
                    img: "./static/vertical-dance-showact-650x365.jpg",
                    link:
                        "https://event-entertainment.eu/language/en/portfolio/vertical-dance-show-act/",
                    filter: "aerial",
                    info: "A wall bekomes a stage",
                    video: "116739608",
                    details: "max 6min | wall 8x20m | highlight act ",
                },

                {
                    name: "AERIAL CHANDELIER SHOW ACT",
                    img: "./static/aerial-chandelier-showact-650x365.jpg",
                    link:
                        "https://event-entertainment.eu/language/en/portfolio/aerial-chandelier-show-act/",
                    filter: "aerial",
                    info:
                        "an oversized chandelier, 2000 sparkling crystals, and high-class acrobatics",
                    video: "119430517",
                    details: "max 6min | 2x2m | gala/show ",
                },

                {
                    name: "ACROBATIC TANGO BALLET",
                    img: "./static/acrobatic-tango-ballet-01-650x365.jpg",
                    link:
                        "https://event-entertainment.eu/language/en/portfolio/acrobatic-tango-ballet/",
                    filter: "dance",
                    info:
                        "ballet and acrobatics combined “Adagio” on the ground and in the air",
                    video: "119430517",
                    details: "max 5min | 4x4m | gala/show ",
                },

                {
                    name: "ACROBATIC DANCE DUET",
                    img: "./static/acrobatic-dance-duet-01-650x365.jpg",
                    link:
                        "https://event-entertainment.eu/language/en/portfolio/acrobatic-dance-duet/",
                    filter: "dance",
                    info:
                        "The highest art of acrobatics, dance, and gymnastics come together",
                    video: "119430517",
                    details: "max 5min | 4x4m | gala/show ",
                },

                {
                    name: "STREET DANCE CHAMPIONS",
                    img: "./static/street-dance-champions-01-650x365.jpg",
                    link:
                        "https://event-entertainment.eu/language/en/portfolio/street-dance-champions/",
                    filter: "dance",
                    info:
                        "Gifted dancers, spectacular hip-hop, the winners of the hip-hop World Championship",
                    video: "120694062",
                    details: "max 10min | 6x4m | gala/show ",
                },

                {
                    name: "BODYPERCUSSION",
                    img: "./static/bodypercussion-01-650x365.jpg",
                    link:
                        "https://event-entertainment.eu/language/en/portfolio/bodypercussion/",
                    filter: "dance",
                    info:
                        "The instruments: the own body and the simplest requisites",
                    video: "117275535",
                    details: "max 8min | 4x4m | gala/show ",
                },

                {
                    name: "MUSICAL STAR SINGERS",
                    img: "./static/musical-star-singer-8-650x365.jpg",
                    link:
                        "https://event-entertainment.eu/language/en/portfolio/musical-star-singers/",
                    filter: "music",
                    info:
                        "Voices that go under the skin, Singers from well-known musical theater productions",
                    video: "118121682",
                    details: "max 45min | 6x3m | gala/show ",
                },

                {
                    name: "A CAPELLA BEATBOX SINGER",
                    img:
                        "./static/acapella_group_00-e1496228761814-650x365.jpg",
                    link:
                        "https://event-entertainment.eu/language/en/portfolio/a-capella-band/",
                    filter: "music",
                    info:
                        "Live and without instruments – but still a whole orchestra performs",
                    video: "117475280",
                    details: "max 45min | 8x3m | gala/show ",
                },

                {
                    name: "CLASSICAL ENSEMBLE",
                    img: "./static/klassik-ensemble-03-650x365.jpg",
                    link:
                        "https://event-entertainment.eu/language/en/portfolio/classical-ensemble/",
                    filter: "music",
                    info:
                        "your company accompanied live by members of a symphony orchestra",
                    video: "170281136",
                    details: "max 45min | 3x4m | gala/show ",
                },

                {
                    name: "BMX WORLD CHAMPION FLATLAND",
                    img: "./static/bmx-weltmeister-flatland-05-650x365.jpg",
                    link:
                        "https://event-entertainment.eu/language/en/portfolio/bmx-world-champion/",
                    filter: "special",
                    info:
                        " the rider and his bike melt to a unit of dynamic, speed, and acrobatics ",
                    video: "120468132",
                    details: "max 10min | 6x6m | gala/show ",
                },

                {
                    name: "THE MOVER WALKING ACT",
                    img: "./static/the-movers-walking-act-01-650x365.jpg",
                    link:
                        "https://event-entertainment.eu/language/en/portfolio/the-mover-walking-act-2/",
                    filter: "special",
                    info:
                        "Like marionettes without strings. They illustrate and initiate, interact and inform",
                    video: "119330265",
                    details: "max 10min | 10x2m | walking act ",
                },

                {
                    name: "DANCING HORSES SHOW ACT",
                    img: "./static/tanzende-pferde-showact-650x365.jpg",
                    link:
                        "https://event-entertainment.eu/language/en/portfolio/dancing-horses/",
                    filter: "special",
                    info:
                        "The award winning artists enchant the spectators with their mixture of powerful ride and dancing",
                    video: "121893940",
                    details: "max 15min | 15x20m | highlight act",
                },

                {
                    name: "LED PYRO KITES",
                    img: "./static/led-pyro-kites-showact-650x365.jpg",
                    link:
                        "https://event-entertainment.eu/language/en/portfolio/led-pyro-kites/",
                    filter: "special",
                    info:
                        "Open up or end your event with a scenario in the firmament that is just as unique as simple",
                    video: "121688548",
                    details: "max 15min | 70x30m | highlight act  ",
                },

                {
                    name: "CUBE SHOW ACT",
                    img: "./static/cube-showact-05-650x365.jpg",
                    link:
                        "https://event-entertainment.eu/language/en/portfolio/cube-show-act/",
                    filter: "variete",
                    info:
                        "An impressive Jonglange with the cube made of chrome and steel: “force equals mass times acceleration”",
                    video: "119452887",
                    details: "max 5min | 5x5m | gala/show ",
                },

                {
                    name: "DANCE ON HANDS ",
                    img: "./static/handstand-showact-650x365.jpg",
                    link:
                        "https://event-entertainment.eu/language/en/portfolio/handstand-show-act/",
                    filter: "variete",
                    info:
                        "Two hands, one body, a thousand figures. A combination of Handstand-Acrobatics, contortion and dance",
                    video: "121891303",
                    details: "max 5min | 3x3m | gala/show ",
                },

                {
                    name: "HANDVOLTIGE",
                    img: "./static/hand-voltige-showact_01-650x365.jpg",
                    link:
                        "https://event-entertainment.eu/language/en/portfolio/handvoltige-show-act/",
                    filter: "variete",
                    info:
                        "Up to ten performers whirl across the stage creating moments of breathless suspense",
                    video: "119525075",
                    details: "max 9min | 10x4m | gala/show ",
                },

                {
                    name: "CYR WHEEL",
                    img: "./static/CyrWheel_01-e1496232945413-650x365.jpg",
                    link:
                        "https://event-entertainment.eu/language/en/portfolio/cyr-wheel-show-act/",
                    filter: "variete",
                    info:
                        "the Cyr Wheel is a 360° universe of its own, where impressive pictures are created in its orbit.",
                    video: "110474457",
                    details: "max 5min | 4x6m | gala/show ",
                },
            ],

            selected: getItems(),
        };
        //Modal Video
        this.openModal = this.openModal.bind(this);

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

    // MODAL VIDEO
    openModal() {
        this.setState({ isOpen: true });
    }

    render() {
        return (
            <DragDropContext onDragEnd={(result) => this.onDragEnd(result)}>
                <Droppable droppableId="droppable" direction="horizontal">
                    {(provided, snapshot) => (
                        <div
                            className=""
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {/* ================== Portfolio Filter ==================  */}
                            <section
                                id="react"
                                className="container-fluid portfolio-layout portfolio-columns-fw"
                            >
                                <div className="row">
                                    <header className="sec-heading">
                                        <h2>Create your Production</h2>
                                        <span className="subheading">
                                            drag and drop the show acts to the
                                            AREA below
                                        </span>
                                    </header>
                                </div>
                                <div className="row">
                                    <ul
                                        id="pfolio-filters"
                                        className="portfolio-filters"
                                    >
                                        <li className="active">
                                            <a href="#" data-filter="*">
                                                All
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" data-filter=".hitech">
                                                Hitech
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" data-filter=".aerial">
                                                Aerial
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" data-filter=".dance">
                                                Dance
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" data-filter=".music">
                                                Music
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" data-filter=".special">
                                                Special
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" data-filter=".variete">
                                                Varieté
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            
                                <div className="row">
                                    <div id="pfolio2">
                                        {this.state.items.map(
                                            (
                                                {
                                                    name,
                                                    img,
                                                    link,
                                                    filter,
                                                    info,
                                                },
                                                index
                                            ) => (
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
                                                            ref={
                                                                provided.innerRef
                                                            }
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={getItemStyle(
                                                                snapshot.isDragging,
                                                                provided
                                                                    .draggableProps
                                                                    .style
                                                            )}
                                                        >
                                                            {/* === Portfolio Items === */}

                                                            <div
                                                                className={
                                                                    "portfolio-item " +
                                                                    filter
                                                                }
                                                            >
                                                                <div className="show_module_img-txt">
                                                                    <div className="p-wrapper hover-default">
                                                                        <img
                                                                            className="responsive"
                                                                            src={
                                                                                img
                                                                            }
                                                                            alt={
                                                                                name
                                                                            }
                                                                        ></img>
                                                                        <div className="p-hover">
                                                                            <div className="p-content">
                                                                                <h4>
                                                                                    {
                                                                                        name
                                                                                    }
                                                                                </h4>
                                                                                <h6 className="subheading">
                                                                                    {
                                                                                        info
                                                                                    }
                                                                                </h6>
                                                                            </div>
                                                                        </div>
                                                                        <a
                                                                            href={
                                                                                link
                                                                            }
                                                                            className="open-btn"
                                                                        >
                                                                            <i className="fa fa-expand"></i>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            )
                                        )}
                                        {provided.placeholder}
                                    </div>
                                    {/* //pfolio */}
                                </div>
                                {/* //row */}
                            </section>
                        </div>
                    )}
                </Droppable>
                {/* ========== SECOND AREA ==========  */}
                <div>
                    <header className="sec-heading section-30-0">
                        <span className="subheading">
                            drop the modules here
                        </span>
                    </header>
                </div>
                <Droppable droppableId="droppable2" direction="horizontal">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyleSecond(snapshot.isDraggingOver)}
                        >
                            {this.state.selected.map(
                                (
                                    { name, img, link, filter, details, video },
                                    index
                                ) => (
                                    <Draggable
                                        key={name}
                                        draggableId={name}
                                        index={index}
                                        link={link}
                                        filter={filter}
                                        info={details}
                                        video={video}
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
                                                    <div>
                                                        <img src={img}></img>
                                                        {name} <br /> {filter}{" "}
                                                        {"| "}
                                                        {details}
                                                    </div>
                                                    {/*  ====== Modal Video ====== */}
                                                    <div className="video-react-button">
                                                        {this.state.isOpen ==
                                                            video && (
                                                            <ModalVideo
                                                                channel="vimeo"
                                                                isOpen={() =>
                                                                    this.state
                                                                        .isOpen ===
                                                                    video
                                                                }
                                                                videoId={video}
                                                                onClose={() =>
                                                                    this.setState(
                                                                        {
                                                                            isOpen: false,
                                                                        }
                                                                    )
                                                                }
                                                            />
                                                        )}
                                                        <button
                                                            className="btn-small btn-ghost-light "
                                                            onClick={() =>
                                                                this.setState({
                                                                    isOpen: video,
                                                                })
                                                            }
                                                        >
                                                            Video
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                )
                            )}

                            {console.log(
                                "SELECTED ITEMS",
                                JSON.stringify(this.state.selected)
                            )}
                            {/* {this.state.selected.map({ name, filter, link })}
                            { console.log('SELECTED ITEMS TO SEND', JSON.stringify(this.state.selected.map({ name, filter, link })))} */}

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
                                            placeholder="Enter your Name"
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
                                            //placeholder={JSON.stringify(this.state.selected, null, 1)}
                                            value={JSON.stringify(
                                                this.state.selected,
                                                null,
                                                1
                                            )}

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

console.log("GG 12:00");
// Put the things into the DOM!
ReactDOM.render(<App />, document.getElementById("react"));
