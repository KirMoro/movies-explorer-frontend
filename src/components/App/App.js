import './App.css';
import {Header} from "../Header/Header";
import {Navigation} from "../Navigation/Navigation";
import {Main} from "../Main/Main";

function App() {
  return (
    <>
        <Header>
            <Navigation />
        </Header>
        <Main />
    </>
  );
}

export default App;
