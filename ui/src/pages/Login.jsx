import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from '../redux/userRedux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { jwtDecode } from "jwt-decode";
import * as UserService from '../services/UserService';
import { useMutationHooks } from '../hooks/useMutationHook';
import Loading from "../component/Loading";

const Login = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user  = useSelector((state) => state.user);

    const mutation = useMutationHooks(
        data => UserService.loginUser(data)
    );

    const { data, isPending, isSuccess, isError, error } = mutation;
    console.log(mutation)

    useEffect(() => {
        if (isSuccess) {
            if(location?.state) {
                navigate(location?.state)
            } else {
                navigate('/')
            }
            localStorage.setItem('access_token', JSON.stringify(data?.access_token))
            localStorage.setItem('refresh_token', JSON.stringify(data?.refresh_token))
            if (data?.access_token) {
                const decoded = jwtDecode(data?.access_token)
                if (decoded?.id) {
                handleGetDetailsUser(decoded?.id, data?.access_token)
                }
            }
        } else if (isError) {
            setErrorMessage(error.response.data.message.message);
        }
    }, [isSuccess, isError])
    
    const handleGetDetailsUser = async (id, token) => {
        const storage = localStorage.getItem('refresh_token')
        const refreshToken = JSON.parse(storage)
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }))
    }

    const handleSignIn = (e) => {
        mutation.mutate({
        email,
        password
        })
    }

    return (
        <div className="bg-gradient-primary">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                            </div>
                                            <div className="user">
                                                <div className="form-group">
                                                    <input
                                                    type="text"
                                                    className="form-control form-control-user"
                                                    placeholder="Enter Username or Email..."
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group" style={{position: "relative"}}>
                                                    <input
                                                    type={isShowPassword ? "text" : "password"}
                                                    className="form-control form-control-user"
                                                    placeholder="Password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                    <span
                                                        onClick={() => setIsShowPassword(!isShowPassword)}
                                                        style={{
                                                            zIndex: 10,
                                                            position: 'absolute',
                                                            top: '5px',
                                                            right: '8px'
                                                        }}
                                                        >{
                                                            isShowPassword ? (
                                                                <VisibilityIcon />
                                                                ) : (
                                                                <VisibilityOffIcon />
                                                            )
                                                        }
                                                    </span>
                                                </div>
                                                {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}    
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox small">
                                                        <input 
                                                        type="checkbox" 
                                                        className="custom-control-input" 
                                                        id="customCheck"/>
                                                        <label 
                                                        className="custom-control-label" 
                                                        htmlFor="customCheck">
                                                            Remember Me
                                                        </label>
                                                    </div>
                                                </div>
                                                <Loading isLoading={isPending}>
                                                    <button
                                                        className="btn btn-primary btn-user btn-block"
                                                        onClick={handleSignIn}
                                                        disabled={!email.length || !password.length}
                                                    >
                                                        Login
                                                    </button>

                                                </Loading>
                                                <hr/>
                                                <Link to="index.html" className="btn btn-google btn-user btn-block">
                                                    <i className="fab fa-google fa-fw"></i> Login with Google
                                                </Link>
                                                <Link to="index.html" className="btn btn-facebook btn-user btn-block">
                                                    <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
                                                </Link>
                                            </div>
                                            <hr/>
                                            <div className="text-center">
                                                <Link className="small" to="/forgot-password">Forgot Password?</Link>
                                            </div>
                                            <div className="text-center">
                                                <Link className="small" to="/sign-up">Do not have an account?</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;