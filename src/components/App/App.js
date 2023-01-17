import './App.css';
import {Header} from "../Header/Header";
import {Navigation} from "../Navigation/Navigation";
import {Main} from "../Main/Main";
import {Footer} from "../Footer/Footer";
import {Route, Router, Switch} from "react-router-dom";
import {Movies} from "../Movies/Movies";
import {SavedMovies} from "../SavedMovies/SavedMovies";
import {Profile} from "../Profile/Profile";

function App() {
    return (
        <>
            <Header>
                <Navigation/>
            </Header>
            <Switch>
                {/*<Route path="/">*/}
                {/*    <Main/>*/}
                {/*</Route>*/}
                <Route path="/movies">
                    <Movies/>
                </Route>
                <Route path="/saved-movies">
                    <SavedMovies/>
                </Route>
                <Route path="/profile">
                    <Profile />
                </Route>
            </Switch>
            <Footer/>
        </>
    );
}

export default App;
