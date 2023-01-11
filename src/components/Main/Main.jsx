import './Main.css';
import {Promo} from "./Promo/Promo";
import {AboutProject} from "./AboutProject/AboutProject";
import {Techs} from "./Techs/Techs";
import {AboutMe} from "./AboutMe/AboutMe";

export const Main = ({children}) => {
    return (
        <main className="main">
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe />
        </main>
    );
};

