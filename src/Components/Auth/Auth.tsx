import React from "react";
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import {useFormik} from "formik";
import style from "./auth.module.css"
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from 'react-router-dom'
import {loginTC} from "../../Redux/reducer";
import {AppRootStateType} from "../../Redux/store";


export const Auth = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.data.isLoggedIn)

    const formik = useFormik({
        validate: (values) => {
            if (!values.email) {
                return {
                    email: 'Email is required'
                }
            }
            if (!values.password) {
                return {
                    password: 'Password is required'
                }
            }
        },
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: values => {
            console.log('Value: ', values)
            dispatch(loginTC(values.email, values.password));
        },
    })
    if(isLoggedIn){return <Navigate to={'/contacts'}/>}

    return (
        <div className={style.state}>
            <Grid container
                  justifyContent="center">
                <Grid item xs={5}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl style={{width: '300px', left: '-60px'}}>
                            <FormLabel>
                                <p>
                                    Test account credentials:
                                </p>
                                <p> Email: testcase@gmail.com
                                </p>
                                <p>
                                    Password: testcaseP654
                                </p>
                            </FormLabel>
                            <FormGroup>
                                <TextField
                                    label="Email"
                                    margin="normal"
                                    {...formik.getFieldProps("email")}
                                />
                                {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                                <TextField
                                    type="password"
                                    label="Password"
                                    margin="normal"
                                    {...formik.getFieldProps("password")}
                                />
                                {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                                <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                            </FormGroup>
                        </FormControl>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
}