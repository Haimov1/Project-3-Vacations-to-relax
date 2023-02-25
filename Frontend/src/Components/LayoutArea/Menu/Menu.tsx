import { Add, Assessment } from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
import { SpeedDial, SpeedDialAction } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    const [role, setRole] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        setRole(localStorage.getItem("role"));
    }, []);

    return (
        <div className="Menu">
            {role === "Admin" &&
                <SpeedDial
                    ariaLabel="Category"
                    sx={{ position: 'fixed', bottom: 16, right: 16 }}
                    icon={<MenuIcon />}
                >
                    <SpeedDialAction
                        icon={<Add />}
                        tooltipTitle="Add vacation"
                        onClick={() => navigate("/add")}
                    />

                    <SpeedDialAction
                        icon={<Assessment />}
                        tooltipTitle="Reports Page"
                        onClick={() => navigate("/reports")}
                    />
                </SpeedDial>
            }
        </div >
    );
}

export default Menu;

