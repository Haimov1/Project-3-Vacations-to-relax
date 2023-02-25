import { Box, Button, Container, CssBaseline, Grid, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notify from "../../../Utils/Notify";
import "./Login.css";

function Login(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            notify.success("Welcome back!");
            navigate("/vacations");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="Login">
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>

                    <Box component="form" noValidate onSubmit={handleSubmit(send)}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            type="email"
                            autoFocus
                            {...register("email", CredentialsModel.emailValidation)}
                        />
                        <span className="Err">{formState.errors.email?.message}</span>

                        <TextField
                            sx={{ color: "white" }}
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            {...register("password", CredentialsModel.passwordValidation)}
                        />
                        <span className="Err">{formState.errors.password?.message}</span>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid fontSize="small">
                            <Typography>Don't have an account?</Typography>
                            <Link to={"/register"}>Sign Up</Link>
                        </Grid>
                    </Box>
                </Box>
                <br />
                <Typography>
                    {"Copyright © Yuval Haimov " + new Date().getFullYear() + "."}
                </Typography>
            </Container>
        </div>
    );
}

export default Login;
