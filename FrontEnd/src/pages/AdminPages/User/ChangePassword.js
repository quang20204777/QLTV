import React, { useEffect } from 'react';
import { Button, Form, Input, message, Popconfirm } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { STATUS_CHANGE_PASSWORD_ADMIN, VALUE_CHANGE_PASSWORD_ADMIN } from '../../../redux/type/UserType';
import { STATUS_CODE } from '../../../utils/constant/statusCode';

export default function ChangePassword() {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const { valueChangePasswordAdmin, statusChangePasswordAdmin } = useSelector(state => state.userReducer)

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
        setTimeout(confirm, 200)
    }, [valueChangePasswordAdmin, statusChangePasswordAdmin])

    const onFinish = (values) => {
        dispatch({
            type: VALUE_CHANGE_PASSWORD_ADMIN,
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
        if (!isEmpty(valueChangePasswordAdmin)) {
            if (valueChangePasswordAdmin.reNewPassword === valueChangePasswordAdmin.newPassword) {
                if(valueChangePasswordAdmin.newPassword === valueChangePasswordAdmin.oldPassword){
                    message.error('Mật khẩu mới và cũ trùng nhau, hãy nhập lại!')
                }else{
                    dispatch({
                        type: 'CONFIRM_CHANGE_PASSWORD_ADMIN',
                        data: valueChangePasswordAdmin
                    })
                    setTimeout(() => {
                        if (statusChangePasswordAdmin === STATUS_CODE.SUCCESS_PUT) {
                            message.success('Đổi mật khẩu thành công!')
                        } else if (statusChangePasswordAdmin === STATUS_CODE.SERVER_ERROR) {
                            message.error('Lỗi server hoặc mật khẩu cũ điền không đúng, hãy thử lại!')
                        }
                        dispatch({
                            type: VALUE_CHANGE_PASSWORD_ADMIN,
                            data: {}
                        })
                        dispatch({
                            type: STATUS_CHANGE_PASSWORD_ADMIN,
                            data: null
                        })
                    }, 200)
                }
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
                    marginLeft: '-20px',
                    marginTop: '30px'
                }}
                validateMessages={validateMessages}
            >
                <Form.Item
                    name="oldPassword"
                    label="Mật khẩu cũ"
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
                    name="newPassword"
                    label="Mật khẩu mới"
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
                    name="reNewPassword"
                    label="Nhập lại mật khẩu mới"
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
                        title="Đổi mật khẩu"
                        description="Bạn có chắc chắn đổi mật khẩu không?"
                        onConfirm={() => {
                            form.submit()
                        }
                        }
                        onCancel={cancel}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button danger type="primary" htmlType="submit">
                            Xác nhận
                        </Button>
                    </Popconfirm>
                </Form.Item>
            </Form>
        </div>
    )
}
