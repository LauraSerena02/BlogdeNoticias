import {BrowserRouter,Route,Routes} from "react-router-dom" // Poder utilizar diferentes vistas

import Homepage from "./page/homepage"
import IniciarSesion from "./page/IniciarSesion";
import GestorNoticias from "./page/GestorNoticias";
import Resgistrarse from "./page/registrarse";

function App(){
  return(
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<Homepage></Homepage>}></Route>
    
    <Route path="/IniciarSesion" element={<IniciarSesion></IniciarSesion>}></Route>
    <Route path="/GestorNoticias" element={<GestorNoticias></GestorNoticias>}></Route>
    <Route path="/Resgistrarse" element={<Resgistrarse></Resgistrarse>}></Route>
    </Routes>
    </BrowserRouter>);

}
export default App