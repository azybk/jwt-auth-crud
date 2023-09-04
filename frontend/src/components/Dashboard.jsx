import axios from "axios"
import jwt_decode from 'jwt-decode'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

const Dashboard = () => {
    const [name, setName] = useState('')
    const [token, setToken] = useState('')
    const [expire, setExpire] = useState('')
    const [users, setUsers] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        refreshToken()
        getUsers()
    }, [])

    const refreshToken = async() => {
        try {
            const response = await axios.get('http://localhost:5000/token')
            setToken(response.data.accessToken)
            const decoded = jwt_decode(response.data.accessToken)
            
            setName(decoded.name)
            setExpire(decoded.exp)

        } catch(err) {
            if(err.response) {
                navigate('/')
            }
        }
    }

    const axiosJWT = axios.create()

    axiosJWT.interceptors.request.use(async(config) => {
        const currentDate = new Date()

        if(expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/token')
            config.headers.Authorization = `Bearer ${response.data.accessToken}`
            setToken(response.data.accessToken)

            const decode = jwt_decode(response.data.accessToken)
            setName(decode.name)
            setExpire(decode.exp)
        }
        return config

    }, (err) => {
        return Promise.reject(err)
    })

    const getUsers = async() => {
        const response = await axiosJWT.get('http://localhost:5000/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        setUsers(response.data)
    }

    return (
        <div className="container mt-5">
            <h1>Welcome Back: {name} </h1>
            <button onClick={getUsers} className="button is-info">Get Users</button>

            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Email</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        users.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))
                    }
                    
                </tbody>
            </table>

        </div>
    )
}

export default Dashboard