import './App.css';
import {Header} from "../Header/Header";
import {Navigation} from "../Navigation/Navigation";
import {Main} from "../Main/Main";
import {Footer} from "../Footer/Footer";
import {Route, Router, Switch} from "react-router-dom";

function App() {
  return (
    <>
        <Header>
            <Navigation />
        </Header>
        <Main />
        <Footer />
            <Switch>
                <Route path="/movies">
                    <Main />
                </Route>
            </Switch>
    </>
  );
}

export default App;
