import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const { link } = useSelector((state) => state.link)
    const [data, SetData] = useState([])
    const Navigate = useNavigate()
    useEffect(() => {

        fetchData()
    }, [])
    const fetchData = async () => {
        const postdata = await axios.get(`${link}/admin/get`)
        console.log(postdata);
        SetData(postdata.data)
    }
    console.log(data);
    return (
        <div>
            {
                data.map((val) => {
                    return (
                        <>
                            <h1>{val.topic}</h1>
                            <button onClick={() => {
                                {
                                    Navigate(`/quiz/${val._id}`)
                                }
                            }}  >Click</button>
                        </>
                    )
                })
            }
        </div>
    )
}

export default Home