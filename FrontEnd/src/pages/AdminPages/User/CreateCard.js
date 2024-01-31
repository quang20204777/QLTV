import React, { useEffect } from 'react'
import { Button, Form, Input, message, Popconfirm } from 'antd';
import { useDispatch, useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import { TOKEN_ADMIN } from '../../../utils/constant/data';
import { CHECK_MSSV_REDUCER } from '../../../redux/type/UserType';
import { STATUS_CODE } from '../../../utils/constant/statusCode';
import { CREATE_CARD_STUDENT } from '../../../redux/type/CardStudentType';

export default function CreateCard() {
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const { statusCreate } = useSelector(state => state.cardStudentReducer)
    const { checkMssv } = useSelector(state => state.userReducer)
    const navigate = useNavigate()

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
        if (!localStorage.getItem(TOKEN_ADMIN)) {
            navigate('/login', { replace: true })
        }
    }, [])

    useEffect(() => {
        setTimeout(confirm, 100)
    }, [statusCreate])

    const onFinish = (values) => {
        //check mssv
        dispatch({
            type: 'CHECK_MSSV',
            data: values.mssv
        })
        //create card
        dispatch({
            type: 'CREATE_CARD',
            data: values
        })
    };


    const confirm = (e) => {
        if (statusCreate === STATUS_CODE.SUCCESS_PUT && checkMssv === true) {
            message.success('Tạo thẻ thành công!');
        } else if (statusCreate === STATUS_CODE.SERVER_ERROR && checkMssv === true) {
            message.error('Tạo thẻ thất bại, mssv này đã tạo thẻ hoặc mssv này là mssv trong trường!')
        } else if (checkMssv === false) {
            message.error('Không tồn tại mssv này trong hệ thống!')
        }
        setTimeout(() => {
            dispatch({
                type: CHECK_MSSV_REDUCER,
                data: null
            })
            dispatch({
                type: CREATE_CARD_STUDENT,
                data: null
            })
        }, 100)
    };

    const onFinishFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
    };

    const cancel = (e) => {
        message.error('Chưa xác nhận!');
    };


    return (
        <div>
            <h3 style={{ textAlign: 'left', marginLeft: '50px', fontSize: '29px' }}>
                Tạo thẻ cho sinh viên trường ngoài
            </h3>
            <p style={{ textAlign: 'left', marginLeft: '50px', color: 'green' }}>* Sinh viên trường đại học Bách Khoa Hà Nội sử dụng thẻ sinh viên do nhà trường cung cấp</p>
            <Form
                form={form}
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{
                    maxWidth: 880,
                    marginTop: '100px'
                }}
                validateMessages={validateMessages}
            >
                <Form.Item
                    name='mssv'
                    label="Mssv"
                    rules={[
                        {
                            required: true,
                            pattern: new RegExp(/^[0-9]{8}$/),
                            message: 'Xin hãy nhập mssv với 8 chữ số!'
                        },
                    ]}
                    style={{ height: '40px' }}
                >
                    <Input style={{ marginLeft: '15px' }} />
                </Form.Item>
                <Form.Item
                    name='school'
                    label="Tên trường"
                    rules={[
                        {
                            required: true,
                            message: 'Xin hãy nhập tên trường!'
                        },
                    ]}
                    style={{ height: '40px' }}
                >
                    <Input style={{ marginLeft: '15px' }} />
                </Form.Item>
                <Form.Item
                    name='balance'
                    label="Số tiền nạp"
                    rules={[
                        {
                            required: true,
                            pattern: new RegExp(/^[0-9]+$/),
                            message: 'Xin hãy nhập số tiền bằng số!'
                        },
                    ]}
                    style={{ height: '40px' }}
                >
                    <Input style={{ marginLeft: '15px' }} />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        ...layout.wrapperCol,
                        offset: 8,
                    }}
                    style={{ marginTop: '20px' }}
                >
                    <Popconfirm
                        title="Tạo thẻ thư viện"
                        description="Bạn có chắc chắn cho sinh viên này tạo thẻ?"
                        onConfirm={(e) => {
                            form.submit()
                        }
                        }
                        onCancel={cancel}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Popconfirm>
                </Form.Item>
            </Form>

        </div>
    )
}
