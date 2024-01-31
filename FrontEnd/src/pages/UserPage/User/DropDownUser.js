import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import { Menu} from 'antd';
import {TOKEN_USER } from '../../../utils/constant/data';

export default function DropDownUser() {

    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem(TOKEN_USER)
        navigate('/login', { replace: true })
    }

    return (
        <Menu.SubMenu theme="light" icon=<UserOutlined style={{ fontSize: '25px', marginLeft: '40px' }} />>
            <Menu.Item onClick={() => logout()} style={{ fontSize: '15px', fontWeight: '500', color: '#303f9f', paddingTop:'5px', paddingLeft: '31px', boxSizing: 'border-box' }}>Đăng xuất</Menu.Item>
        </Menu.SubMenu>
    );
}
