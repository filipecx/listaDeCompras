import { useEffect } from "react";
import { BrowserRouter, Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies(null, { path: '/' });

export function ProtectedRout() {

    let cookie = cookies.get('faustao')
   
   
    useEffect(() => {
        //console.log('o cookie: ' + token)
        
    })
    return(
        <>
        {cookie ? <Outlet /> : <Navigate to='/' />}
        </>
    )
        
}