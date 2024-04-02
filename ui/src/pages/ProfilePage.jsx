import React, { useState, useEffect } from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from '../redux/userRedux';
import * as UserService from '../services/UserService';
import { useMutationHooks } from '../hooks/useMutationHook';
import Loading from '../component/Loading';
import * as message from '../component/Message';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { getBase64 } from '../utils';
import { Button, Upload } from 'antd';

export default function Profile() {
    const [isShowUpdate, setIsShowUpdate] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [avatar, setAvatar] = useState('');
    const [newAvatar, setNewAvatar] = useState(null);

    const mutation = useMutationHooks(
        (data) => {
            const { id, access_token, ...rests } = data
            UserService.updateUser(id, rests, access_token)
        }
    );
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { isSuccess, isError } = mutation;

    useEffect(() => {
        setEmail(user?.email);
        setName(user?.name);
        setPhone(user?.phone);
        setAddress(user?.address);
        setAvatar(user?.avatar);
    }, [user]);

    useEffect(() => {
        if (isSuccess) {
            message.success();
            handleGetDetailsUser(user?.id, user?.access_token);
        } else if (isError) {
            message.error();
        }
    }, [isSuccess, isError]);

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }));
    };

    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setNewAvatar(file.originFileObj);
        setAvatar(file.preview);
    };

    const handleUpdate = async () => {
        if (newAvatar) {
            try {
                await UserService.updateAvatar(user.id, newAvatar, user.access_token);
                const updatedUser = await UserService.getDetailsUser(user.id, user.access_token);
                dispatch(updateUser({ ...updatedUser?.data, access_token: user.access_token }));
                message.success('Avatar updated successfully.');
            } catch (error) {
                console.error('Error updating avatar:', error);
                message.error('Failed to update avatar.');
            }
        }
        mutation.mutate({ id: user?.id, email, name, newAvatar, phone, address, access_token: user?.access_token });
    };

    return (
        <>
            <Header />
            <section className="bg-light" style={{ backgroundColor: "#eee" }}>
                <div className="container py-5">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card mb-4">
                                <div className="card-body text-center">
                                    <div style={{ position: "relative" }}>
                                        <img src={avatar} alt="avatar"
                                            className="rounded-circle img-fluid" style={{ width: "150px", height: "150px", borderRadius: "50%" }} />
                                        {isShowUpdate ? (
                                            <>
                                                <Upload onChange={handleOnchangeAvatar} maxCount={1}>
                                                    <Button
                                                        style={{ position: "absolute", top: "110px", right: "90px", backgroundColor: "#979797", borderRadius: "50%", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", border: "none" }}
                                                    >
                                                        <CameraAltIcon style={{ color: "#fff" }} />
                                                    </Button>
                                                </Upload>
                                            </>
                                        ) : ""}
                                    </div>
                                    <h5 className="my-4">{name}</h5>
                                    <div class="d-flex justify-content-center mb-2">
                                        <button
                                            type="button"
                                            class="btn btn-primary"
                                            style={{ marginRight: '5px' }}
                                            onClick={() => {
                                                if (isShowUpdate) {
                                                    setIsShowUpdate(false); // Đóng form cập nhật
                                                    handleUpdate(); // Thực hiện cập nhật thông tin
                                                } else {
                                                    setIsShowUpdate(true); // Mở form cập nhật
                                                }
                                            }}
                                        >
                                            {isShowUpdate ? 'Confirm' : 'Update Your Profile'}
                                        </button>
                                        <button type="button" class="btn btn-danger">Delete Account</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {isShowUpdate ? (
                            <>
                                <div className="col-lg-8">
                                    <div className="card mb-4">
                                        <div className="card-body">
                                            <input
                                                style={{ border: "none" }}
                                                type="text"
                                                className="form-control form-control-user"
                                                placeholder="Full name..."
                                                value={name}
                                                onChange={(e) => setName(e.target.value)} />
                                            <hr />
                                            <input
                                                style={{ border: "none" }}
                                                type="text"
                                                className="form-control form-control-user"
                                                placeholder="Email..."
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)} />
                                            <hr />
                                            <input
                                                style={{ border: "none" }}
                                                type="text"
                                                className="form-control form-control-user"
                                                placeholder="Phone..."
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)} />
                                            <hr />
                                            <input
                                                style={{ border: "none" }}
                                                type="text"
                                                className="form-control form-control-user"
                                                placeholder="Address..."
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="col-lg-8">
                                    <div className="card mb-4">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p className="mb-0">Full Name</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    <p className="text-muted mb-0">{name}</p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p className="mb-0">Email</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    <p className="text-muted mb-0">{email}</p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p className="mb-0">Phone</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    <p className="text-muted mb-0">(+84) {phone}</p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p className="mb-0">Address</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    <p className="text-muted mb-0">{address}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
