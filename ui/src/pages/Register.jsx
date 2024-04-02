import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import * as UserService from '../services/UserService';
import { useMutationHooks } from '../hooks/useMutationHook';
import * as message from '../component/Message'
import Loading from "../component/Loading";

const Register = () => {
    const navigate = useNavigate();

    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const mutation = useMutationHooks(
        data => UserService.signupUser(data)
    )

    const { data, isPending, isSuccess, isError, error } = mutation
    console.log(mutation)

    useEffect(() => {
        if (isSuccess) {
        message.success()
        handleNavigateSignIn()
        } else if (isError) {
        message.error();
        setErrorMessage(error.response.data.error);
        }
    }, [isSuccess, isError])

    const handleNavigateSignIn = () => {
        navigate('/sign-in')
    }

    const handleSignUp = () => {
        mutation.mutate({ email, password, confirmPassword })
    }

    return (
        <div className="bg-gradient-primary">
            <div className="container">
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                            <div className="col-lg-7">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                                    </div>
                                    <div className="user">
                                        <div className="form-group">
                                            <input
                                            type="text"
                                            className="form-control form-control-user"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Your email..."/>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-sm-6 mb-3 mb-sm-0">
                                                <div style={{ position: 'relative' }}>
                                                    <span
                                                    onClick={() => setIsShowPassword(!isShowPassword)}
                                                    style={{
                                                        zIndex: 10,
                                                        position: 'absolute',
                                                        top: '4px',
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
                                                <input
                                                type={isShowPassword ? "text" : "password"}
                                                className="form-control form-control-user"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Password"/>
                                            </div>
                                            <div className="col-sm-6">
                                                <div style={{ position: 'relative' }}>
                                                    <span
                                                    onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                                                    style={{
                                                        zIndex: 10,
                                                        position: 'absolute',
                                                        top: '4px',
                                                        right: '8px'
                                                    }}
                                                    >{
                                                        isShowConfirmPassword ? (
                                                        <VisibilityIcon />
                                                        ) : (
                                                        <VisibilityOffIcon />
                                                        )
                                                    }
                                                    </span>
                                                </div>
                                                <input
                                                type={isShowConfirmPassword ? "text" : "password"}
                                                className="form-control form-control-user"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder="Confirm Password"/>
                                            </div>
                                        </div>
                                        {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
                                        <Loading isLoading={isPending}>
                                            <button
                                                type="submit"
                                                className="btn btn-primary btn-user btn-block"
                                                disabled={!email.length || !password.length || !confirmPassword.length}
                                                onClick={handleSignUp}
                                            >
                                                Register Account
                                            </button>
                                        </Loading>
                                        <hr/>
                                        <Link to="" className="btn btn-google btn-user btn-block">
                                            <i className="fab fa-google fa-fw"></i> Register with Google
                                        </Link>
                                        <Link to="" className="btn btn-facebook btn-user btn-block">
                                            <i className="fab fa-facebook-f fa-fw"></i> Register with Facebook
                                        </Link>
                                    </div>
                                    <hr/>
                                    <div className="text-center">
                                        <Link className="small" to="">Forgot Password?</Link>
                                    </div>
                                    <div className="text-center">
                                        <Link className="small" to="/sign-in">Already have an account? Login!</Link>
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

export default Register;
