import { Link } from "react-router-dom";
import logo from "../../../Assets/Images/logo.svg";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header" >

            <Link to="/vacations">
                <img src={logo} alt="Logo" />
            </Link>

            <AuthMenu />
        </div>
    );
}

export default Header;
