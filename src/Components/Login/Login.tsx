import React from "react";
import {Button, FormControl, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import {useFormik} from "formik";
import style from "./Login.module.css"
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from 'react-router-dom'
import {AuthType, loginTC} from "../../Redux/reducer";
import {AppRootStateType} from "../../Redux/store";

export const Login = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, AuthType>(state => state.data.isLoggedIn)
    const load = useSelector<AppRootStateType, boolean>(state => state.data.load)
    const formik = useFormik({
        validate: (values) => {
            if (!values.email) {
                return {
                    email: <span className={style.redStar}>'Email is required'</span>
                }
            }
            if (!values.password) {
                return {
                    password: <span className={style.redStar}>'Password is required'</span>
                }
            }
        },
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: values => {
            dispatch(loginTC(values.email, values.password));
        },
    })
    if (isLoggedIn === 'success') {
        return <Navigate to={'/contacts'}/>
    }
    return (
        <div className={style.state}>
            <Grid container
                  justifyContent="center">
                <Grid item xs={5}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl style={{width: '300px', left: '-60px', textAlign: 'left'}}>
                            <FormLabel>
                                <p>Test account credentials:</p>
                                <p> Email: testcase@gmail.com</p>
                                <p>Password: testcaseP654</p>
                                <h4 className={style.error}>
                                    {isLoggedIn === 'invalid credentials' &&
                                        'wrong username or password, please try again'}</h4>
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
                                <Button type={'submit'} variant={'contained'} color={'primary'}
                                        disabled={load}>Login</Button>
                            </FormGroup>
                        </FormControl>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
}