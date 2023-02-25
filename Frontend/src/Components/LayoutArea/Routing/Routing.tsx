import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import EditVacation from "../../VacationsArea/EditVacation/EditVacation";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import VacationsReport from "../../VacationsArea/VacationsReport/VacationsReport";
import PageNotFound from "../PageNotFound/PageNotFound";

function Routing(): JSX.Element {

    const token = localStorage.getItem("token");
    const [role, setRole] = useState<string>("");

    useEffect(() => {
        setRole(localStorage.getItem("role"));

        authStore.subscribe(() => {
            setRole(authStore.getState().user.role);
        });
    }, []);

    const parseJwt = (token: any) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        }
        catch (err: any) {
            return null;
        }
    };

    const decodedJwt = parseJwt(token);

    if (decodedJwt?.exp * 1000 < Date.now()) {
        authService.logout();
    }

    return (
        <Routes>

            {role === "Admin" &&
                <>
                    <Route path="/vacations" element={<VacationsList />} />
                    <Route path="/add" element={<AddVacation />} />
                    <Route path="vacations/edit/:vacationId" element={<EditVacation />} />
                    <Route path="/reports" element={<VacationsReport />} />
                    <Route path="/login" element={<Navigate to="/vacations" />} />
                    <Route path="/register" element={<Navigate to="/vacations" />} />
                    <Route path="/" element={<Navigate to="/vacations" />} />
                    <Route path="*" element={<PageNotFound />} />

                </>
            }

            {role === "User" &&
                <>
                    <Route path="/vacations" element={<VacationsList />} />
                    <Route path="/login" element={<Navigate to="/vacations" />} />
                    <Route path="/register" element={<Navigate to="/vacations" />} />
                    <Route path="/" element={<Navigate to="/vacations" />} />
                    <Route path="*" element={<PageNotFound />} />

                </>
            }

            {!role && <>
                <Route path="/vacations" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="*" element={<PageNotFound />} />
            </>}

        </Routes>
    );
}

export default Routing;
