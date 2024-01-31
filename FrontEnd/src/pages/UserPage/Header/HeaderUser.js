import React, { useEffect, useState } from 'react'
import { Layout, Menu, theme, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom'
import { TOKEN_USER } from '../../../utils/constant/data';
import DropDownUser from '../User/DropDownUser';
import { NavLink, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

export default function HeaderUser() {
    const { Header, Content, Footer } = Layout
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { statusBalance } = useSelector(state => state.cardStudentReducer)

    useEffect(() => {
        if (!localStorage.getItem(TOKEN_USER)) {
            navigate('/login', { replace: true })
        }
        dispatch({
            type: 'GET_BALANCE_CARD'
        })
    }, [])

    useEffect(() => {

    }, [statusBalance])


    const items = [{
        label: <p style={{ textAlign: 'center', height: '48px' }}>Sách</p>,
        key: 'book',
        children: [
            {
                type: 'group',
                label: <NavLink className="nav-link" to="/userPage/book/myBook" style={{ fontSize: '17px', fontWeight: '500', textAlign: 'left' }}>Sách của tôi</NavLink>,
            },
            {
                type: 'group',
                label: <NavLink className="nav-link" to="/userPage/book/bookLibrary" style={{ fontSize: '17px', fontWeight: '500', textAlign: 'left', paddingTop: '0' }}>Sách thư viện</NavLink>,
            },
        ],
    }]
    const [current, setCurrent] = useState('mail');

    const renderBalance = () => {
        if(localStorage.getItem('balance') !== null){
            return <p style={{ color: 'green', textAlign: 'right' }}>Số dư tài khoản: {localStorage.getItem('balance')}</p>
        }else{
            return <p></p>
        }
    }
    
    return (
        <Layout className="layout" style={{ width: '100%' }}>
            <Header className="header" style={{ width: '107%', marginLeft: '-55px', height: '65px', position: 'sticky', top: '0', zIndex: '1' }}>
                <div className="logo" />
                <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']} >
                    <Row justify="start" style={{ width: '100%', height: '65px' }}>
                        <Col span={5}>
                            <p style={{ fontSize: '18px', marginBottom: '0', marginLeft: '-10px' }}>
                                Thư viện Tạ Quang Bửu
                            </p>
                        </Col>
                        <Col className="gutter-row" span={14}>
                            <Row>
                                <Col span={8} style={{ height: '65px' }}></Col>
                                <Col span={3} style={{ height: '65px' }}>
                                    <Menu><NavLink className="nav-link" to="/userPage" style={{ color: 'black', fontWeight: '600', fontSize: '18px', padding: '0', borderRight: '1px solid #bdbdbd' }}>Trang chủ</NavLink></Menu>
                                </Col>
                                <Col span={3} style={{ height: '65px' }}>
                                    <Menu theme='light' style={{ color: 'black', fontWeight: '600', fontSize: '18px', paddingLeft: '20px', paddingBottom: '1px', borderRight: '1px solid #bdbdbd', borderBottom: '1px solid white' }} selectedKeys={[current]} mode="horizontal" items={items} />
                                </Col>
                                <Col span={3} style={{ height: '65px' }}>
                                    <Menu style={{ borderRight: '1px solid white' }}><NavLink className="nav-link" to="/userPage/introduce" style={{ color: 'black', fontWeight: '600', fontSize: '18px', padding: '0' }} >Giới thiệu</NavLink></Menu>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={3}>
                            {renderBalance()}
                        </Col>
                        <Col span={2}>
                            <DropDownUser />
                        </Col>
                    </Row>
                </Menu>
            </Header>
            <Content
                className="site-layout"
                style={{
                    marginTop: 0,
                    minHeight: 580,
                    backgroundColor: 'rgba(255,255,255,0.7)',
                }}
            >
                <Outlet />
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                    padding: 0,
                    margin: 0,
                }}
            >
                <div>
                    <div>
                        <Row style={{ height: '200px' }}>
                            <Col span={6}>
                                <img src='https://upload.wikimedia.org/wikipedia/commons/a/a1/Logo_Hust.png' alt='icon_layout' style={{ width: '93px', height: '130px', marginTop: '30px' }} />
                            </Col>
                            <Col span={16} style={{ textAlign: 'left', paddingTop: '20px' }}>
                                <h4 style={{ color: '#b71c1c', fontWeight: '600' }}>THƯ VIỆN TẠ QUANG BỬU - TRƯỜNG ĐẠI HỌC BÁCH KHOA HÀ NỘI</h4>
                                <p style={{ marginTop: '40px' }}>Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội</p>
                                <p style={{ marginTop: '-5px' }}>Điện thoại: (84-24) 3869 2243, Email: tvtqb@hust.edu.vn</p>
                            </Col>
                        </Row>
                    </div>
                    <div style={{ color: 'grey', backgroundColor: 'black', height: '50px', paddingTop: '15px' }}>Bản quyền © 2023, Thư viện Tạ Quang Bửu - Trường Đại học Bách khoa Hà Nội.</div>
                </div>
            </Footer>
        </Layout>
    )
}
