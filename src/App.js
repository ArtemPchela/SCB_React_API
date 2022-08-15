import {Routes, Route} from "react-router-dom";
import Header from "./Molecules/Header";
import Intro from "./Organisms/Intro";
import Contacts from "./Organisms/Contacts";
import SearchAPI from "./Organisms/Search API";
import Footer from "./Molecules/Footer";
import NotFound from "./Molecules/NotFound";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Intro/>}/>
        <Route path='/contacts' element={<Contacts/>}/>
        <Route path='/search' element={<SearchAPI/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
