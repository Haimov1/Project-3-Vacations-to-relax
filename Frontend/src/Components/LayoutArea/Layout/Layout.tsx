import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";

function Layout(): JSX.Element {
    if (window.location.pathname !== "/vacations") {
        localStorage.removeItem("selectedPage");
    }

    return (
        <div className="Layout">
            <header>
                <Header />
            </header>
            <menu>
                <Menu />
            </menu>
            <main>
                <Routing />
            </main>
        </div>
    );
}

export default Layout;
