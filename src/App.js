import logo from "./logo.svg";
import "./App.css";
import CollapsibleNavBar from "./copmpnent/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./copmpnent/Home/Home";
import Signup from "./copmpnent/Signup";
import Signin from "./copmpnent/Signin";
import ItemsTable from "./copmpnent/ItemsTable/ItemsTable";
import EditItem from "./copmpnent/EditItem/EditItem"
import AddNewItem from "./copmpnent/NewItem/NewItem";
import Favorites from "./copmpnent/Fav";
function App() {
  return (
    <div className="d-flex flex-column site">
      <header>
        <CollapsibleNavBar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/itemstable" element={<ItemsTable />} />
          <Route path="/edititem/:id" element={< EditItem/>} />
          <Route path="/newitem" element={<AddNewItem />} />
          <Route path="/fav" element={<Favorites />} />



        </Routes>
      </main>
      <footer bg="dark" variant="dark" className="my-0">
        <div className="text-center ">All right is reserved</div>
      </footer>
    </div>
  );
}

export default App;
