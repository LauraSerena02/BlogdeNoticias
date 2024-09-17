import {  useContext,createContext,useState} from "react";
import {RegisterRequest} from '../api/auth'

//contesto para acceder al contexto de autentificacion
    const  AuthContext = createContext()

    export const useAuth = ()=>{
        const context = useContext(AuthContext);
        if(!context)
            {throw new Error("useauth must be use with an provider")}
        return context
    }

    export const AuthProvider = ({ children }) => {
   
   
    const [user,setUser] = useState(null)
   
    const signup = async (userData) =>{
        // try {
            const res = await RegisterRequest(userData); // Llama a la función API
      console.log(res.data);
      setUser(res.data)
      
        // } catch (error) {
        //     setErrors(error.response.data)
        // }
    }

   
   
   
    return (
    <AuthContext.Provider value={{
        signup,
        user,


    }}>
        {children}
    </AuthContext.Provider>

    )
 }