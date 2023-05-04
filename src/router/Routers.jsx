
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../pages/home/Home'
import Quiz from '../pages/Quiz/Quiz'
const Routers = () => {
    return (
        <div>
            <Routes>
                {/* <Route path='/' element={<Navigate to="/home" />} /> */}
                <Route path='/' element={<Home />} />
                <Route path='/quiz/:id' element={<Quiz />} />

            </Routes>
            {/* <Routes>


                <Routes> */}

        </div>

    )
}

export default Routers
