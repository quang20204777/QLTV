import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Table, Tag, Button, Input, Space, Form } from 'antd';
import Highlighter from 'react-highlight-words';
import { useNavigate } from 'react-router-dom'
import { SearchOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { GET_USERID_CLICK, SUBMIT_CHARGE } from '../../../redux/type/CardStudentType'
import { TOKEN_ADMIN } from '../../../utils/constant/data';



export default function UserManager() {
    const { getAllStudent } = useSelector(state => state.userReducer)
    const { listBookBorrowOfStudent, bookById } = useSelector(state => state.bookReducer)
    const { userIdClick, status, clickCharge, balance } = useSelector(state => state.cardStudentReducer)
    const dispatch = useDispatch()
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalCardOpen, setIsModalCardOpen] = useState(false);
    const navigate = useNavigate()


    //chức năng tạo lại tài khoản đã xóa
    const updateAccount = (item) => {
        dispatch({
            type: 'UPDATE_STUDENT',
            id: item
        })
    }

    //chức năng xóa tài khoản đang active
    const deleteAccount = (item) => {
        dispatch({
            type: 'DELETE_STUDENT',
            id: item
        })
    }

    useEffect(() => {
        if (!localStorage.getItem(TOKEN_ADMIN)) {
            navigate('/login', { replace: true })
        }
        dispatch({
            type: 'GET_ALL_STUDENT'
        })
        dispatch({
            type: 'GET_BOOK_BORROW_STUDENT',
        })
    }, [])

    useEffect(() => {
        fetchData()
        dispatch({
            type: 'GET_BALANCE',
            data: userIdClick
        })
    }, [getAllStudent, balance])


    const fetchData = () => {
        setLoading(true)
        setData(dataTable)
        setLoading(false)
    };

    //lấy dữ liệu từ state gán vào data của table và custom style cho nó
    const dataTable = () => {
        return getAllStudent.map((item, index) => {
            let idName = item.iddb + 'name'
            let idMssv = item.iddb + 'password'
            if (item.isDelete === 0) {
                return {
                    ...item,
                    idSort: item.iddb,
                    id: <p style={{ fontSize: '17px', fontWeight: '450', height: '14px' }}>{item.id}</p>,
                    name: <p id={idName} style={{ fontSize: '17px', fontWeight: '450', height: '14px' }}>{item.name}</p>,
                    mssv: <p id={idMssv} style={{ fontSize: '17px', fontWeight: '450', height: '14px' }}>{item.mssv}</p>,
                    phoneNumber: <p style={{ fontSize: '17px', fontWeight: '450', height: '14px' }}>{item.phoneNumber}</p>,
                    email: <p style={{ fontSize: '17px', fontWeight: '450', height: '14px' }}>{item.email}</p>,
                    isDelete: item.isDelete,
                    tags: ['delete', 'getBooks', 'chargeCard', item.iddb, item.userType],
                    mssvSearch: item.mssv,
                    nameSearch: item.name,
                }
            }
            else {
                return {
                    ...item,
                    idSort: item.iddb,
                    id: <p id={item.id} style={{ fontSize: '17px', fontWeight: '450', height: '14px', color: 'red' }}>{item.id}</p>,
                    name: <p id={idName} style={{ fontSize: '17px', fontWeight: '450', height: '14px', color: 'red' }}>{item.name}</p>,
                    mssv: <p id={idMssv} style={{ fontSize: '17px', fontWeight: '450', height: '14px', color: 'red' }}>{item.mssv}</p>,
                    phoneNumber: <p style={{ fontSize: '17px', fontWeight: '450', height: '14px', color: 'red' }}>{item.phoneNumber}</p>,
                    email: <p style={{ fontSize: '17px', fontWeight: '450', height: '14px', color: 'red' }}>{item.email}</p>,
                    isDelete: item.isDelete,
                    tags: ['recreate', item.iddb],
                    mssvSearch: item.mssv,
                    nameSearch: item.name,
                }
            }
        })
    }


    // (từ đây)các chức năng để tìm kiếm
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText();
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => { handleSearch(selectedKeys, confirm, dataIndex) }}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) => {
            if (dataIndex === 'mssv') {
                return record.mssvSearch.includes(value)
            } else if (dataIndex === 'name') {

                return record.nameSearch.trim().toLowerCase().includes(value.trim().toLowerCase())
            }
        },
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    //(đến đây) các chức năng tìm kiếm


    const columns = [
        {
            key: 'userId',
            title: 'Id',
            dataIndex: 'id',
            width: 50,
        },
        {
            key: 'nameUser',
            title: 'Tên',
            dataIndex: 'name',
            width: 240,
            ...getColumnSearchProps('name'),
        },
        {
            key: 'mssv',
            title: 'Mssv',
            dataIndex: 'mssv',
            width: 150,
            ...getColumnSearchProps('mssv'),
        },
        {
            key: 'phoneNumber',
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            width: 150,
        },
        {
            key: 'email',
            title: 'Email',
            dataIndex: 'email',
            width: 230,
        },
        {
            title: 'Quản lý',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color
                        if (tag === 'delete') {
                            color = 'red';
                            return (
                                <Button onClick={() => { deleteAccount(tags[3]) }} style={{ border: 'none', background: 'none', height: '40px' }} ><Tag style={{ paddingTop: '4px', paddingBottom: '4px', paddingLeft: '12px', paddingRight: '12px' }} color={color} key={tag}>
                                    Xóa
                                </Tag></Button>
                            )
                        } else if (tag === 'getBooks') {
                            color = 'yellow'
                            return (
                                <Button onClick={() => {
                                    let arrayAdd = []
                                    listBookBorrowOfStudent.forEach(item => {
                                        if (tags[3] === item.userId && item.status === '0') {
                                            arrayAdd.push(item)
                                        }
                                    })
                                    dispatch({
                                        type: 'GET_DATA_BOOK_BY_USERID',
                                        data: arrayAdd
                                    });
                                    showModal()
                                }} style={{ border: 'none', background: 'none', height: '40px' }} ><Tag style={{ paddingTop: '3px', paddingBottom: '3px', paddingLeft: '12px', paddingRight: '12px' }} color={color} key={tag}>
                                        Xem sách
                                    </Tag></Button>
                            )
                        } else if (tag === 'chargeCard' && tags[4] === "userOtherSchool") {
                            color = 'yellow'
                            return (
                                <Button onClick={() => {
                                    dispatch({
                                        type: GET_USERID_CLICK,
                                        data: tags[3]
                                    })
                                    dispatch({
                                        type: 'GET_BALANCE',
                                        data: tags[3]
                                    })
                                    showModalCard()
                                }} style={{ border: 'none', background: 'none', height: '40px' }} ><Tag style={{ paddingTop: '3px', paddingBottom: '3px', paddingLeft: '12px', paddingRight: '12px' }} color={color} key={tag}>
                                        Nạp thẻ
                                    </Tag></Button>
                            )
                        } else if (tag === 'recreate') {
                            color = 'black'
                            return (
                                <Button onClick={() => { updateAccount(tags[1]) }} style={{ border: 'none', background: 'none', height: '40px' }} ><Tag style={{ paddingTop: '3px', paddingBottom: '3px', paddingLeft: '12px', paddingRight: '12px' }} color={color} key={tag}>
                                    Tạo lại
                                </Tag></Button>
                            )
                        }
                    })}
                </>
            ),
            filters: [
                { text: 'Đã xóa', value: 1 },
                { text: 'Còn hiệu lực', value: 0 }
            ],
            onFilter: (value, record) => {
                return record.isDelete === value
            }
        }
    ];


    //modal
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const showModalCard = () => {
        setIsModalCardOpen(true);
    };
    const handleCardOk = () => {
        dispatch({
            type: SUBMIT_CHARGE,
            data: 0
        })
        setIsModalCardOpen(false);
    };
    const handleCardCancel = () => {
        dispatch({
            type: SUBMIT_CHARGE,
            data: 0
        })
        setIsModalCardOpen(false);
    };

    //table modal
    const columnsModal = [
        {
            title: 'Tên sách',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'Số trang',
            dataIndex: 'countPage',
            key: 'countPage',
        },
        {
            title: 'Vị trí',
            key: 'positionBook',
            dataIndex: 'positionBook',
        },
        {
            title: 'Tiêu đề',
            key: 'title',
            dataIndex: 'title',
        },
        {
            title: 'Năm xuất bản',
            key: 'year',
            dataIndex: 'year',
        },
    ];
    const dataModal = [...bookById]

    //thông báo thành công hoặc lỗi khi rechargeCard
    const { confirm } = Modal;
    const onFinish = (values) => {
        confirm({
            title: 'Bạn chắc chắn muốn nạp tiền cho tài khoản này?',
            icon: <ExclamationCircleFilled />,
            onOk() {
                //dispatch dữ liệu để đăng ký
                dispatch({
                    type: 'RECHARGE_CARD_BY_USERID',
                    data: {
                        balance: values,
                        userId: userIdClick
                    }
                })
                setTimeout(() => {
                    dispatch({
                        type: SUBMIT_CHARGE,
                        data: 1
                    })
                    dispatch({
                        type: 'GET_BALANCE',
                        data: userIdClick
                    })
                }, 200)
            },
            onCancel() {

            },
        });
    };
    const onFinishFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
    };

    return (
        <div style={{ width: '1175px', margin: 'auto' }} >
            <h3 style={{ marginTop: '12px', marginBottom: '20px', marginLeft: '-900px', fontWeight: '600' }}>Trang quản lý người dùng</h3>
            <>
                <Table size="large" rowKey={(record) => record.id} columns={columns} dataSource={data} pagination={{
                    current: page,
                    pageSize: pageSize,
                    total: dataTable.length,
                    onChange: (page, pageSize) => {
                        setPage(page)
                        setPageSize(pageSize)
                    }
                }}
                    loading={loading} />
            </>
            <Modal title="Danh sách sách của sinh viên" width={850} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Table columns={columnsModal} dataSource={dataModal} pageSize={dataModal.length} />
            </Modal>
            <Modal title="Nạp thẻ cho sinh viên" width={600} open={isModalCardOpen} onOk={handleCardOk} onCancel={handleCardCancel}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 10,
                    }}
                    wrapperCol={{
                        span: 15,
                    }}
                    style={{
                        maxWidth: 400
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <span style={{ color: 'green' }}>{balance=="Người dùng chưa có thẻ" ? <p style={{color: 'red'}}>"Người dùng chưa có thẻ"</p> : <p> Số dư tài khoản: {balance}</p>}</span>
                    <Form.Item
                        style={{ marginTop: '30px' }}
                        label="Số tiền cần nạp"
                        name="rechargeCard"
                        rules={[
                            {
                                required: true,
                                pattern: new RegExp(/^[0-9]+$/),
                                message: 'Cần nhập giá trị số !',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 15,
                            span: 10,
                        }}
                    >
                        <Button onClick={() => {
                            setTimeout(() => {
                                dispatch({
                                    type: 'GET_BALANCE',
                                    data: userIdClick
                                })
                            }, 200)
                        }} type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                {(clickCharge === 0) ? <span></span> : ((status === 500) ? <span style={{ color: 'red', marginLeft: '233px' }}>Nạp tiền thất bại!</span> : <span style={{ color: 'grey', marginLeft: '223px' }}>Nạp tiền thành công</span>)}
            </Modal>
        </div>
    )
}