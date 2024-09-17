import {BrowserRouter,Route,Routes} from "react-router-dom" // Poder utilizar diferentes vistas
import RegisterPage from "./page/registerPage" // importando el componente 
import Homepage from "./page/homepage"
import { AuthProvider } from "./context/authContext";

function App(){
  return(
    <AuthProvider>
       <BrowserRouter>
    <Routes>
    <Route path="/" element={<Homepage></Homepage>}></Route>
    <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
    </Routes>
    </BrowserRouter>
    </AuthProvider>  

    );

}
export default App