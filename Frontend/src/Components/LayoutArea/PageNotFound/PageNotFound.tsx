import "./PageNotFound.css";
import pageNotFound from "../../../Assets/Images/page-not-found.png";

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
            <p>The page you are looking for doesn't exist.</p>
            <img src={pageNotFound} alt="page not found" />
        </div>
    );
}

export default PageNotFound;