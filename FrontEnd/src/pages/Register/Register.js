import React, { useState } from 'react'
import './Register.css'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { CHECK_MSSV_REDUCER } from '../../redux/type/UserType'


export default function Register() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { checkMssv } = useSelector(state => state.userReducer)

    const [data, setData] = useState({
        values: {
            firstName: '',
            lastName: '',
            mssv: '',
            email: '',
            phone: '',
            password: '',
            passwordConfirm: ''
        },
        error: {
            firstName: '',
            lastName: '',
            mssv: '',
            email: '',
            phone: '',
            password: '',
            passwordConfirm: ''
        }
    })

    //modal confirm
    const { confirm } = Modal;
    const showConfirm = () => {
        confirm({
            title: 'Bạn chắc chắn muốn đăng ký tài khoản này?',
            icon: <ExclamationCircleFilled />,
            onOk() {
                //dispatch dữ liệu để đăng ký
                dispatch({
                    type: 'REGISTER_USER',
                    dataRegister: {
                        "name": data.values.firstName + ' ' + data.values.lastName,
                        "mssv": data.values.mssv,
                        "phoneNumber": data.values.phone,
                        "email": data.values.email,
                        "password": data.values.password,
                        "userType": "user"
                    }
                })
                //sử dụng tài khoản vừa đăng nhập để tiến hành login
                setTimeout(() => {
                    localStorage.setItem('confirmUserType', false)
                    dispatch({
                        type: 'LOGIN_USER',
                        userLogin: {
                            mssv: data.values.mssv,
                            password: data.values.password
                        }
                    })
                    dispatch({
                        type: CHECK_MSSV_REDUCER,
                        data: null
                    })
                }, 200)
                setTimeout(() => {
                    navigate('/userPage', { replace: true })
                }, 600)
            },
            onCancel() {

            },
        });
    };

    const handleOnChange = (event) => {
        let { name, value, type } = event.target
        //chèn vào key của data.values giá trị là value nếu như người dùng nhập giá trị vào input
        let changeValues = { ...data.values, [name]: value }
        let changeErrors = { ...data.error }
        //trim() sẽ giúp mảng xóa hết các dấu cách, dòng if này sẽ check dữ liệu của input có trống hay không
        if (value.trim() === '') {
            changeErrors[name] = name + ' không được bỏ trống!'
        } else {
            changeErrors[name] = ''
        }
        //check email
        if (type === 'email') {
            //regex của email
            const regexMail = /\S+@\S+\.\S+/
            //dùng regex test email, nếu email nhập vào là sai sẽ trả ra false, !false sẽ là true và gán giá trị cho changeError
            if (value.trim() === '') {
                changeErrors[name] = name + ' không được bỏ trống!'
            } else if (!regexMail.test(value)) {
                changeErrors[name] = name + ' không hợp lệ!'
            } else {
                changeErrors[name] = ''
            }
        }
        //check mssv có 8 chữ số
        if (name === 'mssv') {
            //ném giá trị mssv để check xem đã tồn tại hay chưa

            //regex của mssv
            const regexMssv = /^([0-9]{8})$/g
            //dùng regex test mssv
            if (value.trim() === '') {
                changeErrors[name] = name + ' không được bỏ trống!'
            } else if (!regexMssv.test(value.trim())) {
                changeErrors[name] = name + ' không hợp lệ!'
            } else {
                changeErrors[name] = ''
            }
            dispatch({
                type: 'CHECK_MSSV',
                data: value.trim()
            })
        }
        //check phone
        if (name === 'phone') {
            //regex của password
            const regexPhone = /^([0-9]{10})$/g
            //dùng regex test password
            if (value.trim() === '') {
                changeErrors[name] = name + ' không được bỏ trống!'
            } else if (!regexPhone.test(value)) {
                changeErrors[name] = name + ' không hợp lệ!'
            } else {
                changeErrors[name] = ''
            }
        }
        //check password
        if (name === 'password') {
            //regex của password
            const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g
            //dùng regex test password
            if (value.trim() === '') {
                changeErrors[name] = name + ' không được bỏ trống!'
            } else if (!regexPassword.test(value)) {
                changeErrors[name] = name + ' không hợp lệ!'
            } else {
                changeErrors[name] = ''
            }
        }
        //check passwordConfirm có giống password đã điền trước hay không
        if (name === 'passwordConfirm') {
            const checkVerifyPassword = (data.values.password === value)
            if (!checkVerifyPassword) {
                changeErrors[name] = 'password không trùng khớp!'
            } else {
                changeErrors[name] = ''
            }
        }
        setData({
            values: changeValues,
            error: changeErrors
        })
    }

    const handleSubmit = (event) => {
        //chặn không cho submit reload lại trang
        event.preventDefault()
        const { values, error } = data
        //khởi tạo biến kiểm tra dữ liệu đã nhập vào đúng hết chưa
        let valid = true
        //kiểm tra xem có dữ liệu nào chưa điền hay không
        for (let key in values) {
            if (values[key] === '') {
                valid = false
            }
        }
        //kiểm tra xem có dữ liệu nào chưa valid không
        for (let key in error) {
            if (error[key] !== '') {
                valid = false
            }
        }
        dispatch({
            type: 'CHECK_MSSV',
            data: values.mssv.trim()
        })
        console.log(checkMssv)
        if (checkMssv) {
            valid = false
            let changeValues = { ...data.values }
            let changeErrors = { ...data.error }
            changeErrors['mssv'] = 'mssv đã tồn tại trong hệ thống!'
            setData({
                values: changeValues,
                error: changeErrors
            })
        } else {
            valid = true
        }
        if (!valid) {
            Swal.fire({
                title: "Cần nhập đúng dữ liệu!",
                icon: 'error',
                confirmButtonText: 'Chấp nhận'
            })
        }
        else {
            showConfirm()
        }
    }
    return (
        <div className='d-flex justify-content-center' style={{ backgroundColor: '#eeeeee', margin: '0', padding: '0', height: '800px' }}>
            <form onSubmit={(event) => { handleSubmit(event) }} style={{ backgroundColor: 'white', height: '690px', marginTop: '50px', width: '650px', fontFamily: 'Google Sans' }}>
                <h3 className='text-center mt-5' style={{ fontWeight: 'bold' }}>Đăng ký tài khoản mượn sách thư viện</h3>
                <div className='container' style={{ marginTop: '50px', height: '90px' }}>
                    <div className='row'>
                        <div className='col-6'>
                            <div className="group">
                                <input autocomplete="off" type="text" name="firstName" required onChange={(event) => { handleOnChange(event) }} />
                                <span className="highlight" />
                                <span className="bar" />
                                <label>firstName</label>
                                <span className='text text-danger'>{data.error.firstName}</span>
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className="group">
                                <input autocomplete="off" type="text" name="lastName" required onChange={(event) => { handleOnChange(event) }} />
                                <span className="highlight" />
                                <span className="bar" />
                                <label>lastName</label>
                                <span className='text text-danger'>{data.error.lastName}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container' style={{ height: '90px' }}>
                    <div className='row'>
                        <div className='col-12'>
                            <div className="group">
                                <input autocomplete="off" className='input-full' name='mssv' type="text" required onChange={(event) => { handleOnChange(event) }} />
                                <span className="highlight" />
                                <span className="bar-full" />
                                <label>Mssv</label>
                                <span className='text text-danger'>{data.error.mssv}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container' style={{ height: '90px' }}>
                    <div className='row'>
                        <div className='col-12'>
                            <div className="group">
                                <input autocomplete="off" className='input-full' name='phone' type="text" required onChange={(event) => { handleOnChange(event) }} />
                                <span className="highlight" />
                                <span className="bar-full" />
                                <label>Phone</label>
                                <span className='text text-danger'>{data.error.phone}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container' style={{ height: '90px' }}>
                    <div className='row'>
                        <div className='col-12'>
                            <div className="group">
                                <input autocomplete="off" className='input-full' name='email' type="email" required onChange={(event) => { handleOnChange(event) }} />
                                <span className="highlight" />
                                <span className="bar-full" />
                                <label>Email</label>
                                <span className='text text-danger'>{data.error.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container' style={{ height: '90px' }}>
                    <div className='row' style={{ height: '70px' }}>
                        <div className='col-6'>
                            <div className="group">
                                <input autocomplete="off" type="password" name='password' required onChange={(event) => { handleOnChange(event) }} />
                                <span className="highlight" />
                                <span className="bar" />
                                <label>password</label>
                                <span className='text text-danger'>{data.error.password}</span><br />

                            </div>
                        </div>
                        <div className='col-6'>
                            <div className="group">
                                <input type="password" autocomplete="off" name='passwordConfirm' required onChange={(event) => { handleOnChange(event) }} />
                                <span className="highlight" />
                                <span className="bar" />
                                <label>passwordConfirm</label>
                                <span className='text text-danger'>{data.error.passwordConfirm}</span>
                            </div>
                        </div>
                    </div>
                    <span className='text text-warning text-left' style={{ marginRight: '165px', marginTop: '-50px' }}>* mật khẩu cần có ít nhất 8 ký tự, có cả chữ và số</span>
                </div>
                <div className='d-flex justify-content-center' style={{ marginTop: '50px' }}>
                    <button className='btn-dark' style={{ width: '200px', height: '40px', borderRadius: '4px' }}>Xác nhận</button>
                </div>
            </form>
        </div>
    )
}