import React, { useState, useEffect } from 'react'
import './Login.css'
import { NavLink, useNavigate } from 'react-router-dom'
import './ForgotPassword.css'
import { useDispatch, useSelector } from 'react-redux'
import { STATUS_CODE } from '../../utils/constant/statusCode'

export default function Login() {
    const navigate = useNavigate()
    let { status } = useSelector(state => state.userReducer)
    const dispatch = useDispatch()

    const [user, setUser] = useState({
        mssv: '',
        password: '',
        error: '',
        'url': '/'
    })

    const handleOnChange = (event) => {
        let { name, value } = event.target
        let changeValues = { ...user, [name]: value }
        setUser({
            ...user,
            mssv: changeValues.mssv,
            password: changeValues.password,
        })
    }

    const HandleStatus = () => {
        if (status === 'ADMIN') {
            // window.location='http://localhost:3001/adminPage'
            // window.location.assign('http://localhost:3001/adminPage')
            navigate('/adminPage', { replace: true })
        } else if (status === 'USER') {
            navigate('/userPage', { replace: true })
        }
        else if(status === STATUS_CODE.CLIENT_ERROR){
            setUser({
                ...user,
                error: 'mssv hoặc mật khẩu bị sai'
            })
        }
    }

    const submitForm = (event) => {
        //chặn không cho submit reload lại trang
        event.preventDefault()
        dispatch({
            type: 'LOGIN_USER',
            userLogin: {
                mssv: user.mssv,
                password: user.password
            }
        })
        HandleStatus()
    }

    useEffect(() => {
        dispatch({
            type: 'LOGIN_USER',
            userLogin: {
                mssv: user.mssv === '' ? document.getElementById('mssv').value : user.mssv,
                password: user.password === '' ? document.getElementById('password').value : user.password,
            }
        })
    }, [user])

    return (
        <div className='container-fluid m-0 p-0' style={{ backgroundImage: 'url("./hust_background.png")', backgroundSize: 'cover', width: '100%', height: '100vh' }}>
            <div style={{ backgroundColor: 'rgba(0,0,0,0.6)', width: '100%', height: '100vh' }}>
                <div className='row'>
                    <div className='col-7'>

                    </div>
                    <div className='col-4 ml-3 mr-3'>
                        <div className='row'>
                            <div className="col-lg-11 ml-5 p-4 mr-5" style={{ backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: '15px', marginTop: '40px' }}>
                                <div className="card-body p-md-4 mx-md-3">
                                    <form autoComplete="off" onSubmit={(event) => { submitForm(event) }}>
                                        <h1 style={{ paddingTop: '50px' }}>Đăng nhập</h1>
                                        <div className="form-outline mb-4 mt-5 mr-4 ml-3">
                                            <input autocomplete="off" id="mssv" name='mssv' type="text" className="form-control" placeholder="Mssv/msnv" onChange={(event) => { handleOnChange(event) }} />
                                        </div>
                                        <div className="form-outline mb-4 mr-4 ml-3">
                                            <input autocomplete="off" id="password" name='password' type="password" autoComplete="new-password" className="form-control" placeholder="Mật khẩu" onChange={(event) => { handleOnChange(event) }} />
                                        </div>
                                        <div style={{ height: '30px', marginTop: '-20px' }}>
                                            <span style={{ color: 'red' }}>{user.error}</span>
                                        </div>
                                        <div className="text-center pt-1 mb-5 pb-1" style={{ paddingLeft: '88px' }}>
                                            <button className="btn btn-primary btn-block fa-lg gradient-custom-2"
                                                style={{ width: '180px', fontSize: '16px', paddingTop: '12px', paddingBottom: '12px', marginBottom: '6px' }} >Đăng nhập</button>
                                            
                                        </div>
                                        <div className="d-flex align-items-center justify-content-center pb-4">
                                            <p className="mb-0 me-2" style={{ fontSize: '13px' }}>Bạn chưa có tài khoản?</p>
                                            <button type="button" style={{ fontSize: '14px' }} className="ml-4 btn btn btn-light btn-outline-info"><NavLink className="nav-link" to="/register">Đăng ký ngay</NavLink></button>
                                        </div>
                                    </form>
                                    {/* Modal */}
                                    <div className="modal fade" id="modelId" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div style={{ marginTop: '22%', borderRadius: '11px' }} className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title">Thay đổi mật khẩu</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">×</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body" style={{ height: '250px' }}>
                                                    <span className='text-success'>Bạn cần xác nhận những thông tin sau!</span>
                                                    <div className='container' style={{ width: '100%', marginTop: '20px' }}>
                                                        <div className='row'>
                                                            <div className='col-8'>
                                                                <div className="group">
                                                                    <input name="phone" type="text" required />
                                                                    <span className="highlight" />
                                                                    <span className="bar-full" />
                                                                    <label>Số điện thoại</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='container' style={{ width: '100%', marginTop: '-30px' }}>
                                                        <div className='row'>
                                                            <div className='col-8'>
                                                                <div className="group">
                                                                    <input name='phone' type="text" required />
                                                                    <span className="highlight" />
                                                                    <span className="bar-full" />
                                                                    <label>Mssv</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Thoát</button>
                                                    <button type="button" className="btn btn-primary">Xác nhận</button>
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
        </div >
    )
}

