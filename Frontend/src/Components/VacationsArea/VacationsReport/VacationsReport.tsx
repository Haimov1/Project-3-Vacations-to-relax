import { DownloadForOffline } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import "./VacationsReport.css";

function VacationsReport(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [role, setRole] = useState<string>("");
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);

    useEffect(() => {
        setRole(localStorage.getItem("role"));
        vacationsService.getAllVacation()
            .then(dbVacation => setVacations(dbVacation))
            .catch(err => alert(err.message));
    }, []);

    let dataCsv = [];
    dataCsv.push(["Followers", "Destination"]);

    // Pushing the follower count and destination to the array.
    for (let i = 0; i <= vacations.length; i++) {
        dataCsv.push([vacations[i]?.followersCount, vacations[i]?.destination]);
    }

    let dataGraph = [];

    // Pushing the follower count and destination to the array.
    for (let i = 0; i < vacations.length; i++) {
        dataGraph.push(
            {
                "Destination": vacations[i]?.destination,
                "Followers": vacations[i]?.followersCount
            });
    }

    return (
        <div className="VacationsReport">
            <div>
                {role === "Admin" &&
                    <Button className="CsvLink">
                        <CSVLink data={dataCsv} filename={"Vacation Followers.csv"}>
                            <DownloadForOffline />
                        </CSVLink>
                    </Button>}
            </div>
            <div>
                <h1>Vacations report</h1>
                <BarChart width={1400} height={400} data={dataGraph} >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Destination" fontSize={11} height={100} interval={0} angle={30} dy={30} tick={{ fill: "white" }} />
                    <YAxis allowDecimals={false} tick={{ fill: "white" }} />
                    <Tooltip />
                    <Bar dataKey="Followers" fill={"#" + randomColor} />
                </BarChart>
            </div>
        </div>
    );
}

export default VacationsReport;

