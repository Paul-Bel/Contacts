import React from 'react';
import './App.css';
import {Login} from "./Components/Login/Login";
import {HashRouter, BrowserRouter, Route, Routes} from "react-router-dom";
import {ContactContainer} from "./Components/Contacts/ContactContainer";
import {useSelector} from "react-redux";
import {Navbar} from "./Components/Navbar/Navbar";
import {Addcontact} from "./Components/AddContact/Addcontact";
import {LinearProgress} from "@mui/material";
import {AppRootStateType} from "./Redux/store";

function App() {
    const preLoader = useSelector<AppRootStateType, boolean>(store => store.data.load)

    return (
        <HashRouter>
            {<Navbar/>}
            {preLoader && <LinearProgress/>}
            <div className="App">
                <Routes>
                    <Route path={'/'} element={<ContactContainer/>}/>
                    <Route path={'/contacts'} element={<ContactContainer/>}/>
                    <Route path={'/add_Contact'} element={<Addcontact/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                </Routes>
            </div>
        </HashRouter>
    );
}

export default App;
