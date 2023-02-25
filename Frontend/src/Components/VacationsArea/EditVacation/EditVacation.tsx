import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Container, CssBaseline, Stack, TextField, Typography } from "@mui/material";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import { vacationsStore } from "../../../Redux/VacationsState";
import vacationsService from "../../../Services/VacationsService";
import appConfig from "../../../Utils/AppConfig";
import "./EditVacation.css";

function EditVacation(): JSX.Element {
    const [vacation, setVacation] = useState<VacationModel>();
    const { register, handleSubmit, setValue, formState } = useForm<VacationModel>();
    const navigate = useNavigate();
    const params = useParams();

    const [startVacation, setStartVacation] = useState("");

    // Validation of deselecting a past date.
    const currentDate = new Date();
    const minDatePlusOne = new Date(new Date(startVacation || currentDate).setDate(new Date(startVacation || currentDate).getDate() + 1)).toISOString().slice(0, 10);

    // Maintains the minimum end date.
    const [maxDate, setMaxDate] = useState("");

    // Validation that the user will not be able to select a time before the current time.
    const startVacationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const startVacationValue = e.target.value;
        setStartVacation(startVacationValue);
    }

    // Validation that the user will not be able to select a time before the session begins.
    const endVacationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Takes the value from the input.
        const endVacationValue = event.target.value;
        const startVacationDate = new Date(startVacation);
        const endVacationDate = new Date(endVacationValue);
        // If the end vacation date entered in the input is less than start vacation date an error message will appear.
        if (endVacationDate < startVacationDate) {
            alert("End meeting should be after the start meeting.");
            return;
        }
        // Causes the start date input field to be before the end date.
        const maxDateMinusOne = new Date(new Date(endVacationValue).setDate(new Date(endVacationValue).getDate() - 1));
        setMaxDate(maxDateMinusOne.toISOString().slice(0, 10));
    }

    useEffect(() => {
        vacationsService.getOneVacation(+params.vacationId)
            .then(vacation => {
                setValue("vacationId", vacation.vacationId);
                setValue("destination", vacation.destination);
                setValue("description", vacation.description);
                setValue("startVacation", vacation.startVacation.substring(0, 10));
                setValue("endVacation", vacation.endVacation.substring(0, 10));
                setValue("price", vacation.price);
                setVacation(vacation);
            })
            .catch(err => alert(err.message));
    }, []);

    async function send(vacation: VacationModel) {
        try {
            await vacationsService.updateVacation(vacation);
            alert("Vacation has been updated.");
            vacationsStore.getState().vacations.length = 0;
            navigate("/vacations");
        }
        catch (err: any) {
            alert(err.message);
        }
    }
    const [file, setFile] = useState("");


    // Saves the image when editing.
    const [imageToDisplay, setImageToDisplay] = useState(false);

    // Causes the image to be replaced when editing and causes the image to arrive.
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setImageToDisplay(true);
        setFile(URL.createObjectURL(event.target.files[0]));
    }

    // Turns off the option to enter a date with the keyboard.
    function disableKeyboardInput(event: KeyboardEvent<HTMLInputElement>) {
        event.preventDefault();
    }

    return (
        <div className="EditVacation">
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box>
                    <Typography component="h1" variant="h5">
                        <NavLink to={"/vacations"}>
                            <ArrowBack className="BackButton" />
                        </NavLink>
                        Edit vacation
                    </Typography>

                    <Box component="form" noValidate onSubmit={handleSubmit(send)}>
                        <TextField
                            className="HiddenInput"
                            type="hidden"
                            {...register("vacationId")}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Destination"
                            type="text"
                            autoFocus
                            {...register("destination", VacationModel.destinationValidation)}
                        />
                        <span className="Err">{formState.errors.destination?.message}</span>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Description"
                            type="text"
                            multiline
                            rows={5}
                            {...register("description", VacationModel.descriptionValidation)}
                        />
                        <span className="Err">{formState.errors.description?.message}</span>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Start vacation"
                            type="date"
                            InputProps={{ inputProps: { max: maxDate, onChange: startVacationChange, onKeyDown: disableKeyboardInput } }}
                            InputLabelProps={{ shrink: true }}
                            {...register("startVacation", VacationModel.startVacationValidation)}
                        />
                        <span className="Err">{formState.errors.startVacation?.message}</span>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="End vacation"
                            type="date"
                            InputProps={{ inputProps: { min: minDatePlusOne || startVacation, onChange: endVacationChange, onKeyDown: disableKeyboardInput } }}
                            InputLabelProps={{ shrink: true }}
                            {...register("endVacation", VacationModel.endVacationValidation)}
                        />
                        <span className="Err">{formState.errors.endVacation?.message}</span>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Price"
                            type="number"
                            {...register("price", VacationModel.priceValidation)}
                        />
                        <span className="Err">{formState.errors.price?.message}</span>

                        <Stack direction="row" justifyContent="space-around" spacing={2} onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event)}>
                            <Button component="label">
                                Upload
                                <input type="file" hidden accept="image/*" {...register("image")} />
                            </Button>
                        </Stack>
                        <br />
                        {imageToDisplay === false &&
                            <img src={appConfig.vacationsImageUrl + vacation?.imageName} />
                        }
                        <img src={file} />

                        <Button
                            type="submit"
                            fullWidth
                        >
                            Update vacation
                        </Button>
                    </Box>
                </Box>
                <br />
                <Typography>
                    {"Copyright © Yuval Haimov " + new Date().getFullYear() + "."}
                </Typography>
            </Container>
        </div >
    );
}

export default EditVacation;
