import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Select, Table, Tag, Button, Input, Space, Form } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { SUBMIT_UPDATE_BOOK } from '../../../redux/type/BookType';
import { useNavigate } from 'react-router-dom'
import { TOKEN_ADMIN } from '../../../utils/constant/data';
import listTitleOption from './listTitleOption.json'


export default function ListBook() {

    const dispatch = useDispatch()
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const { listBookBorrowOfStudent, idBookDb, clickBook, statusUpdate, book } = useSelector(state => state.bookReducer)
    const [isModalBookOpen, setIsModalBookOpen] = useState(false);
    const navigate = useNavigate()
    const { Option } = Select

    useEffect(() => {
        if (!localStorage.getItem(TOKEN_ADMIN)) {
            navigate('/login', { replace: true })
        }
        dispatch({
            type: 'GET_BOOK_BORROW_STUDENT',
        })
    }, [])

    useEffect(() => {
        fetchData()
    }, [listBookBorrowOfStudent])

    const fetchData = () => {
        setLoading(true)
        setData(dataTable)
        setLoading(false)
    };

    const handleDeleteBook = (id) => {
        dispatch({
            type: 'DELETE_BOOK',
            data: id
        })
    }

    const handleRecreateBook = (id) => {
        dispatch({
            type: 'RECREATE_BOOK',
            data: id
        })
    }

    const dataTable = () => {
        return listBookBorrowOfStudent.map((item, index) => {
            if (item.status === '0') {
                return {
                    ...item,
                    nameSearch: item.name,
                    authorSearch: item.author,
                    id: <p style={{ fontSize: '17px', fontWeight: '450', height: '14px' }}>{item.id}</p>,
                    name: <p style={{ fontSize: '17px', fontWeight: '450', height: '14px' }}>{item.name}</p>,
                    author: <p style={{ fontSize: '17px', fontWeight: '450', height: '14px' }}>{item.author}</p>,
                    countPage: <p style={{ fontSize: '17px', fontWeight: '450', height: '14px' }}>{item.countPage}</p>,
                    positionBook: <p style={{ fontSize: '17px', fontWeight: '450', height: '14px' }}>{item.positionBook}</p>,
                    title: <p style={{ fontSize: '17px', fontWeight: '450', height: '14px' }}>{item.title}</p>,
                    year: <p style={{ fontSize: '17px', fontWeight: '450', height: '14px' }}>{item.year}</p>,
                    tags: ['delete', 'update', item.id],
                    status: item.status,
                    titleSearch: item.title
                }
            }
            else if (item.status === '1') {
                return {
                    ...item,
                    nameSearch: item.name,
                    authorSearch: item.author,
                    id: <p style={{ fontSize: '17px', fontWeight: '450', height: '14px', color: 'red' }}>{item.id}</p>,
                    name: <p style={{ fontSize: '17px', fontWeight: '450', height: '14px', color: 'red' }}>{item.name}</p>,
                    author: <p style={{ fontSize: '17px', fontWeight: '450', height: '14px', color: 'red' }}>{item.author}</p>,
                    countPage: <p style={{ fontSize: '17px', fontWeight: '450', height: '14px', color: 'red' }}>{item.countPage}</p>,
                    positionBook: <p style={{ fontSize: '17px', fontWeight: '450', height: '14px', color: 'red' }}>{item.positionBook}</p>,
                    title: <p style={{ fontSize: '17px', fontWeight: '450', height: '14px', color: 'red' }}>{item.title}</p>,
                    year: <p style={{ fontSize: '17px', fontWeight: '450', height: '14px', color: 'red' }}>{item.year}</p>,
                    tags: ['recreate', item.id],
                    status: item.status,
                    titleSearch: item.title
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
            if (dataIndex === 'author') {
                return record.authorSearch.trim().toLowerCase().includes(value.trim().toLowerCase())
            } else if (dataIndex === 'name') {

                return record.nameSearch.trim().toLowerCase().includes(value.trim().toLowerCase())
            } else if (dataIndex === 'title') {

                return record.titleSearch.trim().toLowerCase().includes(value.trim().toLowerCase())
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
            key: 'id',
            title: 'Id',
            dataIndex: 'id',
            width: 50,
        },
        {
            key: 'name',
            title: 'Tên sách',
            dataIndex: 'name',
            width: 280,
            ...getColumnSearchProps('name'),
        },
        {
            key: 'author',
            title: 'Tác giả',
            dataIndex: 'author',
            width: 200,
            ...getColumnSearchProps('author'),
        },
        {
            key: 'countPage',
            title: 'Số trang',
            dataIndex: 'countPage',
            width: 90,
        },
        {
            key: 'positionBook',
            title: 'Vị trí',
            dataIndex: 'positionBook',
            width: 90,
        },
        {
            title: 'Thể loại',
            key: 'title',
            dataIndex: 'title',
            width: 180,
            ...getColumnSearchProps('title'),
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
                                <Button onClick={() => { handleDeleteBook(tags[2]) }} style={{ border: 'none', background: 'none', height: '40px' }} ><Tag style={{ paddingTop: '4px', paddingBottom: '4px', paddingLeft: '12px', paddingRight: '12px' }} color={color} key={tag}>
                                    Xóa sách
                                </Tag></Button>
                            )
                        } else if (tag === 'update') {
                            color = 'green'
                            return (
                                <Button onClick={() => {
                                    dispatch({
                                        type: 'GET_BOOK_ID',
                                        data: tags[2]
                                    })
                                    showModalBook()
                                }} style={{ border: 'none', background: 'none', height: '40px' }} ><Tag style={{ paddingTop: '3px', paddingBottom: '3px', paddingLeft: '12px', paddingRight: '12px' }} color={color} key={tag}>
                                        Cập nhật
                                    </Tag></Button>
                            )
                        } else if (tag === 'recreate') {
                            color = 'black'
                            return (
                                <Button onClick={() => { handleRecreateBook(tags[1]) }} style={{ border: 'none', background: 'none', height: '40px' }} ><Tag style={{ paddingTop: '3px', paddingBottom: '3px', paddingLeft: '12px', paddingRight: '12px' }} color={color} key={tag}>
                                    Tạo lại
                                </Tag></Button>
                            )
                        }
                    })}
                </>
            ),
            filters: [
                { text: 'Đã xóa', value: '1' },
                { text: 'Còn hiệu lực', value: '0' }
            ],
            onFilter: (value, record) => {
                return record.status === value
            }
        }
    ];


    //modal
    const showModalBook = () => {
        setIsModalBookOpen(true);
    };
    const handleBookOk = () => {
        dispatch({
            type: SUBMIT_UPDATE_BOOK,
            data: 0
        })
        setIsModalBookOpen(false);
    };
    const handleBookCancel = () => {
        dispatch({
            type: SUBMIT_UPDATE_BOOK,
            data: 0
        })
        setIsModalBookOpen(false);
    };



    //thông báo thành công hoặc lỗi khi updatebook
    const onFinish = (values) => {
        dispatch({
            type: 'UPDATE_BOOK',
            data: {
                values: values,
                bookId: idBookDb
            }
        })
    };
    const onFinishFailed = (errorInfo) => {
        dispatch({
            type: 'UPDATE_BOOK',
            data: {
                values: 'errorInput',
                bookId: idBookDb
            }
        })
    };

    const renderOptionTitle = () => {
        return listTitleOption.map(item => {
            return <Option value={item.title}>{item.title}</Option>
        })
    }


    return (
        <div style={{ width: '1175px', margin: 'auto' }}>
            <h3 style={{ marginTop: '12px', marginBottom: '20px', marginLeft: '-900px', fontWeight: '600' }}>Danh sách các quyển sách</h3>
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
            <Modal title="Cập nhật sách" width={600} open={isModalBookOpen} onOk={handleBookOk} onCancel={handleBookCancel}>
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
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    initialValues={{
                        "name": book.name,
                        "author": book.author,
                        "title": book.title,
                        "countPage": book.countPage,
                        "year": book.year,
                        "positionBook": book.positionBook
                    }}
                >
                    <Form.Item
                        style={{ marginTop: '30px' }}
                        label="Tên sách"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Cần nhập giá trị!',
                            },
                        ]}
                    >
                        <Input style={{ textAlign: 'left', marginLeft: '15px' }} />
                    </Form.Item>
                    <Form.Item
                        style={{ marginTop: '30px' }}
                        label="Tác giả"
                        name="author"
                        rules={[
                            {
                                required: true,
                                message: 'Cần nhập giá trị!',
                            },
                        ]}
                    >
                        <Input style={{ textAlign: 'left', marginLeft: '15px' }}/>
                    </Form.Item>
                    <Form.Item
                        name='title'
                        label="Tiêu đề"
                        rules={[
                            {
                                required: true,
                                message: 'Xin hãy chọn tiêu đề!',
                            },
                        ]}
                        style={{ textAlign: 'left', height: '40px' }}
                    >
                        <Select style={{ textAlign: 'left', marginLeft: '15px' }} placeholder="Chọn tiêu đề ...">
                            {renderOptionTitle()}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        style={{ marginTop: '30px' }}
                        label="Số trang"
                        name="countPage"
                        rules={[
                            {
                                required: true,
                                pattern: new RegExp(/^[0-9]+$/),
                                message: 'Cần nhập giá trị số!',
                            },
                        ]}
                    >
                        <Input style={{ textAlign: 'left', marginLeft: '15px' }}/>
                    </Form.Item>
                    <Form.Item
                        style={{ marginTop: '30px' }}
                        label="Năm xuất bản"
                        name="year"
                        rules={[
                            {
                                required: true,
                                pattern: new RegExp(/^[0-9]+$/),
                                message: 'Cần nhập giá trị số!',
                            },
                        ]}
                    >
                        <Input style={{ textAlign: 'left', marginLeft: '15px' }}/>
                    </Form.Item>
                    <Form.Item
                        style={{ marginTop: '30px' }}
                        label="Vị trí sách"
                        name="positionBook"
                        rules={[
                            {
                                required: true,
                                message: 'Cần nhập giá trị!',
                            },
                        ]}
                    ><Input style={{ textAlign: 'left', marginLeft: '15px' }}/>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 15,
                            span: 10,
                        }}
                    >
                        <Button onClick={() => {
                            dispatch({
                                type: SUBMIT_UPDATE_BOOK,
                                data: 1
                            })
                        }} type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                {(clickBook === 0) ? <span></span> : ((statusUpdate === 500) ? <span style={{ color: 'red', marginLeft: '220px' }}>Cập nhật sách thất bại!</span> : <span style={{ color: 'grey', marginLeft: '210px' }}>Cập nhật sách thành công</span>)}
            </Modal>
        </div >
    )
}
