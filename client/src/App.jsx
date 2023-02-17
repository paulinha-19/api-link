import { Home } from "./components/index";
import { NavBar } from "./layout/NavBar";
import { Toolbar } from "@mui/material";
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div>
      <Toolbar />
      <NavBar />
      <Home />
      <ToastContainer />
    </div>
  )
}

export default App
