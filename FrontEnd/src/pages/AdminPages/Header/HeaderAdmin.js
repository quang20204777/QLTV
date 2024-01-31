import React, { useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Breadcrumb, Layout, Menu, theme, Col, Row } from 'antd';
import DropDownAdmin from '../User/DropDownAdmin';
import { useNavigate } from 'react-router-dom'
import { TOKEN_ADMIN } from '../../../utils/constant/data';

const { Header, Content, Sider, Footer } = Layout;

export default function HeaderAdmin() {

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem(TOKEN_ADMIN)) {
            navigate('/login', { replace: true })
        }
    }, [])

    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Row justify="start" style={{ width: '100%' }}>
                        <Col span={5}>
                            <p style={{ fontSize: '16px', marginLeft: '-100px' }}>
                                Thư viện Tạ Quang Bửu
                            </p>
                        </Col>
                        <Col className="gutter-row" span={17}>
                        </Col>
                        <Col span={2}>
                            <DropDownAdmin />
                        </Col>
                    </Row>
                </Menu>
            </Header>
            <Layout>
                <Sider
                    width={250}
                    style={{
                        background: colorBgContainer,
                    }}
                >
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{
                            height: '100%',
                            borderRight: 0,
                        }}>
                        <img src='https://thuvienvector.com/upload/images/items/vector-logo-truong-dai-hoc-bach-khoa-file-cdr-coreldraw-ai-216.webp' alt='icon_layout' style={{ width: '140px', height: '80px', marginTop: '10px' }} />
                        <Menu.Item key="/adminPage/indexAdmin" style={{ height: '45px', marginTop: '20px' }}>
                            <NavLink className="nav-link" to="/adminPage/indexAdmin" style={{ fontSize: '17px', fontWeight: '500', textAlign: 'left' }}>Trang chủ</NavLink>
                        </Menu.Item>
                        <Menu.SubMenu title="Quản lý người dùng" style={{ fontSize: '17px', fontWeight: '500' }}>
                            <Menu.Item><NavLink className="nav-link" to="/adminPage/userManager" style={{ fontSize: '16px', fontWeight: '500', textAlign: 'left', color: '#303f9f' }}>Quản lý người dùng</NavLink></Menu.Item>
                            <Menu.Item><NavLink className="nav-link" to="/adminPage/createCard" style={{ fontSize: '16px', fontWeight: '500', textAlign: 'left', color: '#303f9f' }}>Tạo thẻ</NavLink></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu title="Quản lý sách" style={{ fontSize: '17px', fontWeight: '500', marginLeft: '-55px' }}>
                            <Menu.Item><NavLink className="nav-link" to="/adminPage/bookManager/listBook" style={{ fontSize: '16px', fontWeight: '500', textAlign: 'left', marginLeft: '50px', color: '#303f9f' }}>Danh sách quyển sách</NavLink></Menu.Item>
                            <Menu.Item><NavLink className="nav-link" to="/adminPage/bookManager/createBook" style={{ fontSize: '16px', fontWeight: '500', textAlign: 'left', marginLeft: '50px', color: '#303f9f' }}>Tạo sách mới</NavLink></Menu.Item>
                            <Menu.Item><NavLink className="nav-link" to="/adminPage/bookManager/registerBook" style={{ fontSize: '16px', fontWeight: '500', textAlign: 'left', marginLeft: '50px', color: '#303f9f' }}>Đăng ký mượn sách</NavLink></Menu.Item>
                            <Menu.Item><NavLink className="nav-link" to="/adminPage/bookManager/giveBook" style={{ fontSize: '16px', fontWeight: '500', textAlign: 'left', marginLeft: '50px', color: '#303f9f' }}>Trả sách</NavLink></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu title="Quản lý chỗ ngồi" style={{ fontSize: '17px', fontWeight: '500', marginLeft: '-21px' }} disabled>
                           
                        </Menu.SubMenu>
                    </Menu>
                </Sider>
                <Layout
                    style={{
                        padding: '0 24px 24px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '10px 0',
                        }}
                    >

                    </Breadcrumb>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 550,
                            background: colorBgContainer,
                            backgroundColor: 'white'
                        }}
                    >
                        <Outlet />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Design 2023 Created by QLTV</Footer>
                </Layout>
            </Layout>
        </Layout>
    );
};