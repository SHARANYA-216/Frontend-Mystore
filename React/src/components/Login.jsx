import {Link} from "react-router-dom"
function Login(){
    return <div>
        <h2>Login Page</h2>
        <p><input type="text" placeholder="Email"/>
        <input type="password" placeholder="Password"/>
        <p>
            <button>Login</button>
        </p>
        <p>
            <Link to="/register">New user Register here</Link>
        </p>
        </p></div>
}
export default Login;