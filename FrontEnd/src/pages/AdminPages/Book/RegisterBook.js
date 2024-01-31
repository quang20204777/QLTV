import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message, Popconfirm, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { STATUS_CODE } from '../../../utils/constant/statusCode';
import { useNavigate } from 'react-router-dom'
import { BORROW_BOOK_BY_USERID, CHECK_ID_BOOK_REDUCER } from '../../../redux/type/BookType';
import { TOKEN_ADMIN } from '../../../utils/constant/data';
import { CHECK_MSSV_REDUCER } from '../../../redux/type/UserType';

export default function RegisterBook() {

  const dispatch = useDispatch()
  const [form] = Form.useForm();
  const { statusBorrow, checkIdBook } = useSelector(state => state.bookReducer)
  const { checkMssv } = useSelector(state => state.userReducer)
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage();
  const [stateBook, setStateBook] = useState(0)


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
    localStorage.setItem('checkIdBook', 0)
    dispatch({
      type: 'GET_BOOK_UNBORROW',
    })
  }, [])

  useEffect(() => {
    setTimeout(confirm, 100)
    dispatch({
      type: 'GET_BOOK_UNBORROW',
    })
    setStateBook(0)
  }, [statusBorrow, stateBook])

  const onFinish = (values) => {
    loading()
    //check mssv
    dispatch({
      type: 'CHECK_MSSV',
      data: values.mssv
    })
    //check id book
    if(values.idBook === undefined) {
      localStorage.setItem('checkIdBook', null)
    }else{
      values.idBook.forEach((item) => {
        if (localStorage.getItem('checkIdBook') === 'true' || localStorage.getItem('checkIdBook') === 'null') {
          dispatch({
            type: 'CHECK_BOOK_ID',
            data: item
          })
        }
      })
    }
    //send data check status register book
    dispatch({
      type: 'BORROW_BOOK',
      data: values
    })

  };

  const loading = () => {
    messageApi.open({
      type: 'loading',
      content: 'Đang xử lý...',
      duration: 0,
    });
  };

  const confirm = (e) => {
    if (statusBorrow === STATUS_CODE.SUCCESS_PUT && localStorage.getItem('checkIdBook') === 'true' && checkMssv === true) {
      messageApi.destroy()
      message.success('Thành công!');
      localStorage.setItem('checkIdBook', null)
      setStateBook(1)
    } else if (statusBorrow === STATUS_CODE.CLIENT_ERROR) {
      messageApi.destroy()
      message.error('Danh sách id sách tồn tại sách đã được mượn hoặc không tồn tại. Hãy kiểm tra lại!');
      localStorage.setItem('checkIdBook', null)
    } else if (localStorage.getItem('checkIdBook') === 'false') {
      messageApi.destroy()
      message.error('Có quyển sách đã được mượn hoặc không tồn tại trong danh sách đăng ký. Vui lòng kiểm tra lại!')
      localStorage.setItem('checkIdBook', null)
    } else if (checkMssv === false) {
      messageApi.destroy()
      message.error('Không tồn tại mssv của người dùng này!')
    } else if (statusBorrow === null) {
    }
    setTimeout(() => {
      dispatch({
        type: BORROW_BOOK_BY_USERID,
        data: null
      })
      dispatch({
        type: CHECK_MSSV_REDUCER,
        data: null
      })
      dispatch({
        type: CHECK_ID_BOOK_REDUCER,
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


  const options = [];
  const bookUnborrows = JSON.parse(localStorage.getItem('bookUnborrow')) ? JSON.parse(localStorage.getItem('bookUnborrow')) : []
  bookUnborrows.forEach((item) => {
    options.push({
      value: item.id,
      label: item.id + " - " + item.name + "(" + item.author + ")"
    });
  })
  //handle change id book
  const handleIdBookChange = (value) => {

  };


  return (
    <div>
      {contextHolder}
      <h3 style={{ textAlign: 'left', marginLeft: '50px', fontSize: '29px' }}>
        Đăng ký mượn sách cho người dùng
      </h3>
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
          name='idBook'
          label="Id sách"
          style={{ height: '40px' }}
        >
          {/* <Input style={{ marginLeft: '15px' }} /> */}
          <Select
            mode="multiple"
            size="default"
            onChange={handleIdBookChange}
            style={{
              width: '100%',
              marginLeft: '15px'
            }}
            options={options}
          />
        </Form.Item>
        <span style={{ color: 'green', paddingLeft: '310px', width: '440px', textAlign: 'center' }}>Chú ý: Danh sách các id đăng ký cho người dùng mượn cần nằm trong danh sách gợi ý,</span><br></br>
        <span style={{ color: 'green', paddingLeft: '310px', width: '440px', textAlign: 'center' }}>không phải trong danh sách gợi ý sẽ là sách đã được mượn hoặc không tồn tại!</span>
        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 8,
          }}
          style={{ marginTop: '20px' }}
        >
          <Popconfirm
            title="Đăng ký mượn sách"
            description="Bạn có chắc chắn cho sinh viên này mượn sách?"
            onConfirm={(e) => {
              messageApi.destroy()
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
