import React from 'react';
import './App.scss';
import {BrowserRouter as Router} from "react-router-dom";
import NavBar from "./components/PageLayout/NavBar";
import Footer from "./components/PageLayout/Footer";
import ContentContainer from "./components/PageLayout/ContentContainer";
import SignIn from "./components/SignIn/SignIn";
import useToken from "./hooks/useToken";
import Container from "@material-ui/core/Container";

function App() {
    const {token, setToken} = useToken();

    if (!token) {
        return (
            <Router>
                <NavBar />
                <SignIn setToken={setToken} />
            </Router>
        );
    }

    return (
            <Router>
                <Container maxWidth="md">
                <NavBar />
                <ContentContainer />
                <Footer />
                </Container>
            </Router>
    );
}

export default App;
