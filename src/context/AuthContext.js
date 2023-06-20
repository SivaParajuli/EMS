import { createContext, useEffect, useState} from "react";

const AuthContext = createContext([{}, ()=>{} ]);

const AuthProvider = ({children})=> {

    const [state,setState] = useState({siderbarToggle:false,pageScroll:false,
        logstate:JSON.parse(sessionStorage.getItem("isoftype"))})
    
        
    // useEffect(()=>{
    //     if(JSON.parse(sessionStorage.getItem("isoftype")) != ""){
    //         setState((prevState)=>{return {...prevState,logstate:true}})
    //     }
    // },[state.logstate])

    return(
        <AuthContext.Provider value={[state,setState]}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext,AuthProvider}

