import React from "react"
import { Route, Routes } from "react-router-dom"
import Main from "./components/page/main"
import Login from "./components/page/login"
import NotFound from "./components/page/not-found"

function App() {
    return (
        <>
            <div className="container-fluid bg-success pb-5"></div>
            <Routes>
                <Route path="/" Component={Login} />
                <Route path="/chat" Component={Main} />
                <Route path="*" Component={NotFound} />
            </Routes>
        </>
    )
}

export default App
