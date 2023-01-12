import './App.css';
import {Header} from "../Header/Header";
import {Navigation} from "../Navigation/Navigation";
import {Main} from "../Main/Main";
import {Footer} from "../Footer/Footer";

function App() {
  return (
    <>
        <Header>
            <Navigation />
        </Header>
        <Main />
        <Footer />
    </>
  );
}

export default App;
