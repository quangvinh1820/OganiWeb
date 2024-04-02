const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService");

const createUser = async (newUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { name, email, password, confirmPassword, phone } = newUser;
            const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            const isCheckEmail = reg.test(email);
            const checkUser = await User.findOne({ email: email });

            if (!email || !password || !confirmPassword) {
                return reject({ status: 'ERR', message: 'The input is required' });
            } else if (!isCheckEmail) {
                return reject({ status: 'ERR', message: 'The input is email' });
            } else if (password !== confirmPassword) {
                return reject({ status: 'ERR', message: 'The password is equal confirmPassword' });
            } else if (checkUser !== null) {
                return reject({ status: 'ERR', message: 'The email is already' });
            }

            const hash = bcrypt.hashSync(password, 10);
            const createdUser = await User.create({ name, email, password: hash, phone });

            if (createdUser) {
                return resolve({ status: 'OK', message: 'SUCCESS', data: createdUser });
            }
        } catch (e) {
            return reject({ status: 'ERR', message: e.message });
        }
    });
};

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { email, password } = userLogin
            const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            const isCheckEmail = reg.test(email)
            if (!email || !password) {
                return reject({
                    status: 'ERR',
                    message: 'The input is required'
                })
            } else if (!isCheckEmail) {
                return reject({
                    status: 'ERR',
                    message: 'The input is email'
                })
            }
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser === null) {
                return reject({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)

            if (!comparePassword) {
                return reject({
                    status: 'ERR',
                    message: 'The password or user is incorrect'
                })
            }
            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            return resolve({
                status: 'OK',
                message: 'SUCCESS',
                access_token,
                refresh_token
            })
        } catch (e) {
            return reject({ status: 'ERR', message: e.message });
        }
    })
}

// const updateUser = (id, data) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const checkUser = await User.findOne({
//                 _id: id
//             })
//             if (checkUser === null) {
//                 resolve({
//                     status: 'ERR',
//                     message: 'The user is not defined'
//                 })
//             }

//             const updatedUser = await User.findByIdAndUpdate(id, data, { new: true })
//             resolve({
//                 status: 'OK',
//                 message: 'SUCCESS',
//                 data: updatedUser
//             })
//         } catch (e) {
//             reject(e)
//         }
//     })
// }

// const uploadAvatarHandler = (userId, image) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const avatarUser = await User.findByIdAndUpdate(userId, { avatar: image }, { new: true })
//             resolve({
//                 status: 'OK',
//                 message: 'SUCCESS',
//                 data: avatarUser
//             })
//         } catch (e) {
//             reject(e)
//         }
//     })
// }

const updateUser = (userId, userData, avatarImage) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Update user information
            const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
            
            // Update avatar if provided
            if (avatarImage) {
                const avatarUser = await User.findByIdAndUpdate(userId, { avatar: avatarImage }, { new: true });
                resolve({ status: 'OK', message: 'SUCCESS', data: { updatedUser, avatarUser } });
            } else {
                resolve({ status: 'OK', message: 'SUCCESS', data: updatedUser });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }

            await User.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete user success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyUser = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {

            await User.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Delete user success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find().sort({createdAt: -1, updatedAt: -1})
            resolve({
                status: 'OK',
                message: 'Success',
                data: allUser
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            })
            if (user === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: user
            })
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    deleteManyUser
}