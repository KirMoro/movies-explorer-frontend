import './Main.css';
import {Promo} from "./Promo/Promo";
import {AboutProject} from "./AboutProject/AboutProject";
import {Techs} from "./Techs/Techs";

export const Main = ({children}) => {
    return (
        <main className="main">
            <Promo />
            <AboutProject />
            <Techs />
        </main>
    );
};

