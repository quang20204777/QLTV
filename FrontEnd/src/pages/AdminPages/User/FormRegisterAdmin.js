import React, { useEffect } from 'react';
import { Button, Form, Input, message, Popconfirm } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { STATUS_REGISTER_ADMIN, VALUE_REGISTER_ADMIN } from '../../../redux/type/UserType';
import { STATUS_CODE } from '../../../utils/constant/statusCode';

export default function FormRegisterAdmin() {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const { valueRegisterAdmin, statusRegisterAdmin } = useSelector(state => state.userReducer)

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };
    /* eslint-enable no-template-curly-in-string */

    useEffect(() => {
        setTimeout(confirm, 300)
    }, [valueRegisterAdmin, statusRegisterAdmin])

    const onFinish = (values) => {
        dispatch({
            type: VALUE_REGISTER_ADMIN,
            data: values
        })
    };

    const onFinishFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
    };

    function isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    const confirm = (e) => {
        if (!isEmpty(valueRegisterAdmin)) {
            if (valueRegisterAdmin.rePassword === valueRegisterAdmin.password) {
                dispatch({
                    type: 'CONFIRM_REGISTER_ADMIN',
                    data: valueRegisterAdmin
                })
                setTimeout(() => {
                    if (statusRegisterAdmin === STATUS_CODE.SUCCESS_PUT) {
                        message.success('Đăng ký tài khoản admin thành công!')
                    } else if (statusRegisterAdmin === STATUS_CODE.SERVER_ERROR) {
                        message.error('Msnv đã được đăng ký, hãy nhập msnv khác!')
                    }
                    dispatch({
                        type: VALUE_REGISTER_ADMIN,
                        data: {}
                    })
                    dispatch({
                        type: STATUS_REGISTER_ADMIN,
                        data: null
                    })
                }, 200)
            } else {
                message.error('Lỗi: Mật khẩu nhập lại chưa trùng khớp!')
            }
        }
    }

    const cancel = (e) => {
        message.error('Chưa xác nhận!');
    };

    return (
        <div>
            <Form
                form={form}
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{
                    maxWidth: 550,
                    marginLeft: '-40px',
                    marginTop: '30px'
                }}
                validateMessages={validateMessages}
            >
                <Form.Item
                    name="name"
                    label="Tên nhân viên"
                    rules={[
                        {
                            required: true,
                            message: 'Tên nhân viên không được bỏ!'
                        },
                    ]}
                    style={{ height: '40px', textAlign: 'center' }}
                >
                    <Input style={{ marginLeft: '15px' }} />
                </Form.Item>
                <Form.Item
                    name="mssv"
                    label="Mã số nhân viên"
                    rules={[
                        {
                            required: true,
                            pattern: new RegExp(/^[0-9]{8}$/),
                            message: 'Xin hãy nhập msnv sách bằng 8 chữ số!'
                        },
                    ]}
                    style={{ height: '40px', textAlign: 'center' }}
                >
                    <Input style={{ marginLeft: '15px' }} />
                </Form.Item>
                <Form.Item
                    name="phoneNumber"
                    label="Số điện thoại"
                    rules={[
                        {
                            required: true,
                            pattern: new RegExp(/^[0-9]{10}$/),
                            message: 'Xin hãy nhập số điện thoại bằng 10 chữ số!'
                        },
                    ]}
                    style={{ height: '40px', textAlign: 'center' }}
                >
                    <Input style={{ marginLeft: '15px' }} />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            required: true,
                            type: "email",
                            message: 'Xin hãy nhập đúng định dạng email!'
                        },
                    ]}
                    style={{ height: '40px', textAlign: 'center' }}
                >
                    <Input style={{ marginLeft: '15px' }} />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    style={{ height: '40px', textAlign: 'center' }}
                >
                    <Input.Password style={{ marginLeft: '15px' }} />
                </Form.Item>
                <Form.Item
                    name="rePassword"
                    label="Nhập lại mật khẩu"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    style={{ height: '40px', textAlign: 'center' }}
                >
                    <Input.Password style={{ marginLeft: '15px' }} />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        ...layout.wrapperCol,
                        offset: 8,
                    }}
                    style={{ height: '40px', textAlign: 'center' }}
                >
                    <Popconfirm
                        title="Đăng ký tài khoản admin"
                        description="Bạn có chắc chắn tạo tài khoản này?"
                        onConfirm={() => {
                            form.submit()
                        }
                        }
                        onCancel={cancel}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button danger type="primary" htmlType="submit">
                            Đăng ký
                        </Button>
                    </Popconfirm>
                </Form.Item>
            </Form>
        </div>
    )
}
