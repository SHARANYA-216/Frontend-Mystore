import { Link } from "react-router-dom"
function Register(){
    return (
        <div>
        <h2>RegistrationPage</h2>
        <p><input type="text" placeholder="Name"/></p>
        <p><input type="text" placeholder="Email"/></p>
        <p><input type="password" placeholder="Password"/></p>
        <p>
            <button>Login</button>
        </p>
        <p>
            <Link to="/register">New user Register here</Link>
        </p>
        </div>
    );
}
export default Register;