import { DeleteForever, Edit } from "@mui/icons-material";
import { AspectRatio, Box, Card, CardCover, IconButton, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import { vacationsStore } from "../../../Redux/VacationsState";
import followingService from "../../../Services/FollowingsService";
import appConfig from "../../../Utils/AppConfig";
import "./VacationCard.css";

interface VacationCardProps {
    vacation: VacationModel;
    deleteVacation: (vacationId: number) => Promise<void>;
}

function VacationCard(props: VacationCardProps): JSX.Element {

    const [buttonText, setButtonText] = useState('❤️');
    const [role, setRole] = useState<string>("");

    useEffect(() => {
        setRole(localStorage.getItem("role"));
        if (props.vacation.isFollowing !== 0) {
            setButtonText("💔");
        }
        else {
            setButtonText("❤️");
        }
    }, []);

    // Changes the date format to Israeli configuration.
    function formatTime(date: string): string {
        const time = new Date(date);
        return time.toLocaleDateString("he-IL");
    }

    async function deleteMe() {
        try {
            if (!window.confirm("Are you sure?")) return;
            await props.deleteVacation(props.vacation.vacationId);
            alert("Vacation has been deleted");
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    async function following() {
        try {
            const vacationId = +props.vacation.vacationId;
            if (buttonText === "❤️") {
                await followingService.addFollow(vacationId);
                setButtonText("💔");
                // Causes the follow state number to change up.
                ++vacationsStore.getState().vacations.find(v => v.vacationId === vacationId).followersCount;
                ++vacationsStore.getState().vacations.find(v => v.vacationId === vacationId).isFollowing;
            }
            else if (buttonText === "💔") {
                await followingService.deleteFollow(vacationId);
                setButtonText("❤️");
                // Causes the follow state number to change down.
                --vacationsStore.getState().vacations.find(v => v.vacationId === vacationId).followersCount; 
                --vacationsStore.getState().vacations.find(v => v.vacationId === vacationId).isFollowing;
            }
        }
        catch (err: any) {
            alert(err.message);
        }
    }
    return (
        <div className="VacationCard">
            <Card
                sx={{
                    width: 300,
                    padding: 1,
                    opacity: '90%',
                    height: 350,
                }}
            >
                <Box sx={{ position: 'relative' }}>

                    <AspectRatio ratio="4/3">
                        <img
                            src={appConfig.vacationsImageUrl + props.vacation?.imageName}
                            loading="lazy"
                            alt="Vacations images"
                        />
                    </AspectRatio>

                    <CardCover
                        className="Gradient-cover"
                        sx={{
                            '&:hover, &:focus-within': {
                                opacity: 1,
                            },
                            opacity: 0,
                            transition: '0.1s ease-in',
                            background:
                                'linear-gradient(180deg, transparent 62%, rgba(0,0,0,0.00345888) 63.94%, rgba(0,0,0,0.014204) 65.89%, rgba(0,0,0,0.0326639) 67.83%, rgba(0,0,0,0.0589645) 69.78%, rgba(0,0,0,0.0927099) 71.72%, rgba(0,0,0,0.132754) 73.67%, rgba(0,0,0,0.177076) 75.61%, rgba(0,0,0,0.222924) 77.56%, rgba(0,0,0,0.267246) 79.5%, rgba(0,0,0,0.30729) 81.44%, rgba(0,0,0,0.341035) 83.39%, rgba(0,0,0,0.367336) 85.33%, rgba(0,0,0,0.385796) 87.28%, rgba(0,0,0,0.396541) 89.22%, rgba(0,0,0,0.4) 91.17%)',
                        }}
                    >
                        <Box>
                            <Box
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1.5,
                                    flexGrow: 1,
                                    alignSelf: 'flex-end',
                                }}
                            >
                                {role === "Admin" && <>
                                    <IconButton size="md" sx={{ ml: 'auto' }} onClick={deleteMe}>
                                        <DeleteForever className="DeleteButton" fontSize="medium" />
                                    </IconButton>

                                    <NavLink to={"/vacations/edit/" + props.vacation.vacationId}><Edit className="EditButton" fontSize="medium" /></NavLink>
                                </>
                                }
                            </Box>
                        </Box>
                    </CardCover>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', paddingTop: 2 }}>
                    <Typography sx={{ fontSize: 'md', fontWeight: 'xl' }}>
                        {props.vacation.destination}
                    </Typography>

                    <Typography sx={{ fontSize: 'md', fontWeight: 'md' }}>
                        ${props.vacation.price}
                    </Typography>
                    {role !== "Admin" && <>
                        <IconButton size="md" onClick={following}>{buttonText}</IconButton>

                        <Typography sx={{ fontSize: 'lg', fontWeight: 'sm' }}>
                            {props.vacation.followersCount}
                        </Typography>
                    </>
                    }
                </Box>
                <br />
                <Typography sx={{ fontSize: 'md', fontWeight: 'xs' }}>
                    {formatTime(props.vacation.startVacation)} - {formatTime(props.vacation.endVacation)}
                </Typography>

                <Box>
                    <Typography sx={{ fontSize: 'md', paddingTop: 1, paddingBottom: 2 }}>
                        {props.vacation.description}
                    </Typography>
                </Box>
            </Card>
        </div >
    );
}

export default VacationCard;
