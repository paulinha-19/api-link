import { Home } from "./components/index";
import { NavBar } from "./layout/NavBar";
import { Toolbar } from "@mui/material";

function App() {
  return (
    <div>
      <Toolbar />
      <NavBar />
      <Home/>
    </div>
  )
}

export default App
