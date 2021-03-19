import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import Songs from "../Songs/Songs";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import SongDetail from "../Songs/SongDetail";
import Events from "../Events/Events";
import AudioRecognition from "../AudioRecognition/AudioRecognition";


function ContentContainer() {

    return (
        <div>
            <TransitionGroup className="transition-group">
                <CSSTransition
                    timeout={{enter: 300, exit: 300}}
                    classNames="fade"
                >
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => {
                                return (
                                        <Redirect to="/audio-recognition" />
                                )
                            }}
                        />
                        <Route path="/audio-recognition" component={AudioRecognition}/>
                        <Route path="/songs" component={Songs}/>
                        <Route path="/events" component={Events}/>
                        <Route path="/song/:id" component={SongDetail} />
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </div>
    )

}

export default ContentContainer;
