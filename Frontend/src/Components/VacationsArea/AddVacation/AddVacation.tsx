import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Container, CssBaseline, Stack, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import { vacationsStore } from "../../../Redux/VacationsState";
import vacationsService from "../../../Services/VacationsService";
import "./AddVacation.css";

function AddVacation(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<VacationModel>();

    // Maintains the minimum end date.
    const [startVacation, setStartVacation] = useState("");

    const navigate = useNavigate();

    // Validation of deselecting a past date.
    const currentDate = new Date();
    const minDatePlusOne = new Date(new Date(currentDate).setDate(new Date(currentDate).getDate() + 1)).toISOString().slice(0, 10);
    const minDatePlusTwo = new Date(new Date(currentDate).setDate(new Date(currentDate).getDate() + 2)).toISOString().slice(0, 10);
    const [maxDate, setMaxDate] = useState("");

    // Validation that the user will not be able to select a time before the current time.
    const startVacationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Takes the value from the input.
        const startVacationValue = event.target.value;
        const startVacationDate = new Date(startVacationValue);
        // If the date entered in the input is less than today's date an error message will appear.
        if (startVacationDate < currentDate) {
            alert("Start vacation cannot be in the past.");
            return;
        }
        setStartVacation(startVacationValue);
    }

    // Validation that the user will not be able to select a time before the session begin
    const endVacationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Takes the value from the input.
        const endVacationValue = event.target.value;
        const startVacationDate = new Date(startVacation);
        const endVacationDate = new Date(endVacationValue);

        // If the end vacation date entered in the input is less than today's date an error message will appear.
        if (endVacationDate < currentDate) {
            alert("End meeting cannot be in the past.");
            return;
        }
        // If the end vacation date entered in the input is less than start vacation date an error message will appear.
        if (endVacationDate < startVacationDate) {
            alert("End meeting should be after the start meeting.");
            return;
        }
        // Causes the start date input field to be before the end date.
        const maxDateMinusOne = new Date(new Date(endVacationValue).setDate(new Date(endVacationValue).getDate() - 1));
        setMaxDate(maxDateMinusOne.toISOString().slice(0, 10));
    }

    async function send(vacation: VacationModel) {
        try {
            await vacationsService.addVacation(vacation);
            alert("Vacation has been added.");
            vacationsStore.getState().vacations.length = 0;
            navigate("/vacations");
        }
        catch (err: any) {
            alert("We couldn't get the relevant ones to add the vacation, please check the notes that appear while adding.");
        }
    }

    const [file, setFile] = useState("");
    // Causes the image to be displayed.
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setFile(URL.createObjectURL(event.target.files[0]))
    }

    // Turns off the option to enter a date with the keyboard.
    function disableKeyboardInput(event: KeyboardEvent<HTMLInputElement>) {
        event.preventDefault();
    }

    return (
        <div className="AddVacation">
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box>
                    <Typography component="h1" variant="h5">
                        <NavLink to={"/vacations"}>
                            <ArrowBack className="BackButton" />
                        </NavLink>
                        Add vacation
                    </Typography>


                    <Box component="form" noValidate onSubmit={handleSubmit(send)}>
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
                            InputProps={{
                                inputProps: {
                                    min: minDatePlusOne, max: maxDate, onChange: startVacationChange, onKeyDown: disableKeyboardInput
                                }
                            }}
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
                            InputLabelProps={{ shrink: true }}
                            InputProps={{ inputProps: { min: (startVacation || minDatePlusTwo), onChange: endVacationChange, onKeyDown: disableKeyboardInput } }}
                            {...register("endVacation", VacationModel.startVacationValidation)}
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
                                <input type="file" hidden accept="image/*" {...register("image", VacationModel.imageValidation)} />
                            </Button>
                        </Stack>
                        <br />
                        <img src={file} />

                        <span className="Err">{formState.errors.image?.message}</span>

                        <Button
                            type="submit"
                            fullWidth
                        >
                            Add vacation
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

export default AddVacation;

