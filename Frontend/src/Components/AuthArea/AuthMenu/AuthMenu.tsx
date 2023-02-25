import { Button, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<UserModel>();
    const [anchorEl, setAnchorEl] = useState<HTMLElement>(null);

    useEffect(() => {
        // Initialize user state variable by getting user data from authentication state store.
        setUser(authStore.getState().user);
        // subscribe to authentication state store to update user state variable whenever authentication state changes.
        authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });
    }, []);

    function logout(): any {
        authService.logout();
    }

    // Determine whether menu is open or closed based on value of anchorEl variable.
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        // Set anchorEl state variable to current target element of the event when button is clicked.
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        // Set anchorEl state variable to null when menu is closed.
        setAnchorEl(null);
    };

    return (
        <div className="AuthMenu">
            {user && <>
                <Button onClick={handleClick}>
                    {user?.firstName} {user?.lastName}
                </Button>
                <Menu
                    className="MenuButton"
                    sx={{ marginLeft: 3 }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}>
                    <MenuItem>
                        {user.role === "Admin" && user.role}
                    </MenuItem>
                    <MenuItem>
                        <NavLink className="LogoutButton" to="/login" onClick={logout}>Logout</NavLink>
                    </MenuItem>

                </Menu>
            </>}
        </div >
    );
}

export default AuthMenu;
