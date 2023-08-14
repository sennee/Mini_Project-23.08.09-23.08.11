import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar({isLogged, setIsLogged}) {

    console.log("isLogged : " + isLogged);
    const navigate = useNavigate();

    function logout() {
        window.localStorage.removeItem("userId");
        setIsLogged(false);
        navigate("/login")
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Home</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current = "page" to="/signup">Sign up</Link>
                        </li>
                        <li className="nav-item">
                            {isLogged ? (
                                <button className="nav-link active" onClick={logout}>
                                    Logout
                                </button>
                            ) : (
                                <Link className="nav-link active" to="/login">
                                    Login
                                </Link>
                            )}
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/board">Board</Link>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search for products" aria-label="Search"/>
                        <button className="btn btn-outline-secondary" type="submit">Search</button>
                    </form> 
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
