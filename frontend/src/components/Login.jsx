import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')
    
    const navigate = useNavigate()

    const Auth = async(e) => {
        e.preventDefault()

        try {
            await axios.post('http://localhost:5000/login', {
                email: email,
                password, password
            })
            navigate('/Dashboard')

        } catch (err) {
            setMsg(err.response.data.message)
        }
    }

    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
          <div className="hero-body">
            <div className="container">
              <div className="columns is-centered">
                <div className="column is-4-desktop">

                    <form onSubmit={Auth} className="box">
                        <p className="has-text-centered">{msg}</p>

                        <div className="field mt-5">
                            <label className="label">Email</label>
                            <div className="controls">
                                <input type="text" className="input" placeholder="Email" 
                                        value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>

                        <div className="field mt-5">
                            <label className="label">Password</label>
                            <div className="controls">
                                <input type="password" className="input" placeholder="******"
                                        value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>

                        <div className="field mt-5">
                            <button className="button is-success is-fullwidth">Login</button>
                        </div>
                    </form>

                </div>
              </div>
            </div>
          </div>
        </section>
    )
}

export default Login