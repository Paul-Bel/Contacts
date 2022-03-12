import React from 'react';
import './App.css';
import {Auth} from "./Components/Auth/Auth";
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router-dom";
import {ContactContainer} from "./Components/Contacts/ContactContainer";
import {Provider, useSelector} from "react-redux";
import {Navbar} from "./Components/Navbar/Navbar";
import {Addcontact} from "./Components/AddContact/Addcontact";
import {LinearProgress} from "@mui/material";
import {AppRootStateType} from "./Redux/store";
import {ErrorSnackbar} from "./common/Error";

function App() {
    const preLoader = useSelector<AppRootStateType, boolean>(store => store.data.load)

    return (

        <BrowserRouter>
            <Navbar/>
            {preLoader && <LinearProgress/>}
            <div className="App">
                <Routes>
                    <Route path={'/'} element={<ContactContainer/>}/>
                    <Route path={'/Contacts'} element={<ContactContainer/>}/>
                    <Route path={'/Add_Contact'} element={<Addcontact/>}/>
                    <Route path={'/login'} element={<Auth/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
