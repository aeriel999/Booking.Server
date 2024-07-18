import {useRef, useState} from "react";
import {useAppDispatch} from "../../hooks/redux";
import {Link, useNavigate} from "react-router-dom";
import * as React from "react";
import {unwrapResult} from "@reduxjs/toolkit";
import ErrorHandler from "../../components/common/ErrorHandler.ts";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import OutlinedErrorAlert from "../../components/common/ErrorAlert.tsx";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import InputGroup from "../../components/common/InputGroup.tsx";
import {ConfirmPasswordValidator, PasswordValidator} from "../../validations/account";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import {Breadcrumbs} from "@mui/material";
import Divider from "@mui/material/Divider";
import {IChangePassword} from "../../interfaces/user";
import {changePassword} from "../../store/users/user.action.ts";
import {logout} from "../../store/accounts/account.slice.ts";

export  default function  ChangePasswordPage(){
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | undefined >(undefined);
    const [isFormValid, setIsFormValid] = useState(false);
    const formValid = useRef({ password: false, confirmPassword: false});

    const confirmPassValidator = (value: string | number): string | false | undefined => {
        return ConfirmPasswordValidator(password, value);
    };

    function handleChange() {
        setIsFormValid(Object.values(formValid.current).every(isValid => isValid));
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (Object.values(formValid.current).every(isValid => isValid)) {
            const model : IChangePassword = {
                currentPassword: data.get("currentPassword")  as string,
                newPassword: data.get("newPassword")  as string,
                confirmNewPassword: data.get("confirmNewPassword")  as string,
            }
            console.log("model", model)
            try {
                const response = await dispatch(changePassword(model));
                unwrapResult(response);

                dispatch(logout());

                navigate(`/authentication/login`);

            } catch (error ) {

                setErrorMessage(ErrorHandler(error));
            }
        }
    };

    return (
      <>
          <Breadcrumbs aria-label="breadcrumb" style={{marginBottom: "20px"}}>
              <Link to={"/dashboard/profile"}>
                  <Typography variant="h6" color="text.primary">Dashboard</Typography>
              </Link>
              <Link to={"/dashboard/profile"}>
                  <Typography variant="h6" color="text.primary">Profile</Typography>
              </Link>
              <Typography variant="h6" color="text.primary">Change Password</Typography>
          </Breadcrumbs>
          <Divider />
          <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                  sx={{
                      marginTop: 8,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                  }}
              >

                  {errorMessage && <OutlinedErrorAlert message={errorMessage} />}

                  <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                      <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                      Change  Password
                  </Typography>
                  <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} onChange={handleChange}>
                      <Grid container spacing={2}>
                          <Grid item xs={12}>
                              <InputGroup
                                  label="Current Password"
                                  field="currentPassword"
                                  type= "password"
                                  validator={PasswordValidator}
                                  onChange={isValid => (formValid.current.password = isValid)}
                              />
                          </Grid>
                          <Grid item xs={12}>
                              <InputGroup
                                  label="New Password"
                                  field="newPassword"
                                  type= "password"
                                  validator={PasswordValidator}
                                  onChange={isValid => (formValid.current.password = isValid)}
                                  setIncomeValue={setPassword}
                              />
                          </Grid>
                          <Grid item xs={12}>
                              <InputGroup
                                  label="Confirm New Password"
                                  field="confirmNewPassword"
                                  type= "password"
                                  validator={confirmPassValidator}
                                  onChange={isValid => (formValid.current.confirmPassword = isValid)}
                              />

                          </Grid>
                      </Grid>

                      <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                          disabled={!isFormValid}
                      >
                          Reset
                      </Button>

                  </Box>
              </Box>

          </Container>
      </>

    );
}