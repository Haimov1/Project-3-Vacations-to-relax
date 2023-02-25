import { Box, Button, Container, CssBaseline, Grid, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notify from "../../../Utils/Notify";
import "./Register.css";

function Register(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<UserModel>();
    const navigate = useNavigate();

    async function send(user: UserModel) {
        try {
            await authService.register(user);
            notify.success("Welcome " + user.firstName);
            navigate("/vacations");
        }
        catch (err: any) {
            notify.error(err);
        }
    }
    return (
        <div className="Register">
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit(send)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="First Name"
                                    type="text"
                                    autoFocus
                                    {...register("firstName", UserModel.firstNameValidation)}
                                />
                                <span className="Err">{formState.errors.firstName?.message}</span>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Last Name"
                                    type="text"
                                    {...register("lastName", UserModel.lastNameValidation)}
                                />
                                <span className="Err">{formState.errors.lastName?.message}</span>

                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Email Address"
                                    type="email"
                                    {...register("email", UserModel.emailValidation)}
                                />
                                <span className="Err">{formState.errors.email?.message}</span>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    {...register("password", UserModel.passwordValidation)}
                                />
                                <span className="Err">{formState.errors.password?.message}</span>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid fontSize="small">
                            <Typography>
                                Already have an account?</Typography>
                            <Link to={"/login"}>Sign in</Link>
                        </Grid>
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

export default Register;
