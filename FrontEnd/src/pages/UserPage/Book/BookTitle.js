import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Dropdown, Button, Space } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom'
import { TOKEN_USER } from '../../../utils/constant/data';
import { DOMAIN_FILE_SERVER } from '../../../utils/constant/domain';
import { useDispatch, useSelector } from 'react-redux';
import listTitleOption from '../../AdminPages/Book/listTitleOption.json'
import book_unusable from '../../../assets/book/book_unusable.png'

export default function BookTitle() {
    const { Meta } = Card
    const dispatch = useDispatch()
    const { totalBookTitle } = useSelector(state => state.bookReducer)
    const navigate = useNavigate()
    const [filter, setFilter] = useState({
        status: 0,
        nameFilter: 'Bộ lọc'
    })

    useEffect(() => {
        if (!localStorage.getItem(TOKEN_USER)) {
            navigate('/login', { replace: true })
        }
        for (let i = 0; i < listTitleOption.length; i++) {
            setTimeout(() => {
                dispatch({
                    type: 'GET_DATA_BOOK_BY_TITLE',
                    data: listTitleOption[i].title
                })
            }, 10)
        }
    }, [])

    useEffect(() => {
        setFilter({ ...filter, status: 0 })
    }, [filter.status])


    const renderBook = () => {
        const titleBook = JSON.parse(localStorage.getItem('listBookByTitle'))
        return titleBook.map(item => {
            if (item.userId === null) {
                return <Col span={6}>
                    <NavLink onClick={() => {
                        let array = []
                        totalBookTitle.map(item => {
                            if (item.title === localStorage.getItem('title')) {
                                array.push(item.listBook)
                            }
                        })
                        localStorage.setItem('bookDetail', JSON.stringify(item))
                        localStorage.setItem('listBookByTitle', JSON.stringify(array[0]))
                    }} className="nav-link" to="/userPage/book/title/bookDetailtail">
                        <Card
                            hoverable
                            style={{
                                width: 250,
                                height: 400,
                                margin: 30,
                                borderRadius: 15,
                                backgroundColor: '#d2e0dc'
                            }}
                            cover={
                                <div style={{ backgroundImage: `url("${DOMAIN_FILE_SERVER}/avatarBook/${item.urlImage}")`, width: '250px', height: '300px', backgroundSize: '100% 100%', borderRadius: '15px 15px 0px 0px' }} />
                            }
                        >
                            <Meta title={item.name} description={item.author} />
                        </Card>
                    </NavLink>
                </Col>
            } else {
                return <Col span={6}>
                    <NavLink onClick={() => {
                        let array = []
                        totalBookTitle.map(item => {
                            if (item.title === localStorage.getItem('title')) {
                                array.push(item.listBook)
                            }
                        })
                        localStorage.setItem('bookDetail', JSON.stringify(item))
                        localStorage.setItem('listBookByTitle', JSON.stringify(array[0]))
                    }} className="nav-link" to="/userPage/book/title/bookDetailtail">
                        <Card
                            hoverable
                            style={{
                                width: 250,
                                height: 400,
                                margin: 30,
                                borderRadius: 15,
                                backgroundColor: '#d2e0dc'
                            }}
                            cover={
                                <div style={{ backgroundImage: `url("${DOMAIN_FILE_SERVER}/avatarBook/${item.urlImage}")`, width: '250px', height: '300px', backgroundSize: '100% 100%', borderRadius: '15px 15px 0px 0px' }} >
                                    <div style={{ backgroundColor: 'rgba(0,0,0,0.6)', width: '250px', height: '300px', backgroundSize: '100% 100%', borderRadius: '15px 15px 0px 0px' }} >
                                        <div style={{ backgroundImage: `url(${book_unusable})`, backgroundColor: 'rgba(0,0,0,0.5)', width: '90px', height: '90px', backgroundSize: '100% 100%', borderRadius: '13px 0px 25px 0px' }} >

                                        </div>
                                    </div>
                                </div>
                            }
                        >
                            <Meta title={item.name} description={item.author} />
                        </Card>
                    </NavLink>
                </Col>
            }
        })
    }

    //lọc những quyển sách chưa mượn
    const filterBookUnborrow = () => {
        let array = []
        totalBookTitle.map(item => {
            if (item.title === localStorage.getItem('title')) {
                array.push(item.listBook)
            }
        })
        let title = {
            listBook: []
        }
        array[0].map((item) => {
            if (item.userId === null) {
                title.listBook.push(item)
            }
        })
        setFilter({ nameFilter: 'Sách chưa mượn', status: 1 })
        localStorage.setItem('listBookByTitle', JSON.stringify(title.listBook))
    }

    //lọc những quyển sách đã mượn
    const filterBookBorrowed = () => {
        let array = []
        totalBookTitle.map(item => {
            if (item.title === localStorage.getItem('title')) {
                array.push(item.listBook)
            }
        })
        let title = {
            listBook: []
        }
        array[0].map((item) => {
            if (item.userId !== null) {
                title.listBook.push(item)
            }
        })
        setFilter({ nameFilter: 'Sách đã mượn', status: 1 })
        localStorage.setItem('listBookByTitle', JSON.stringify(title.listBook))
    }

    //lọc tất cả các quyển sách
    const filterAllBook = () => {
        let array = []
        totalBookTitle.map(item => {
            if (item.title === localStorage.getItem('title')) {
                array.push(item.listBook)
            }
        })
        setFilter({ nameFilter: 'Bộ lọc', status: 1 })
        localStorage.setItem('listBookByTitle', JSON.stringify(array[0]))
    }


    //item filter
    const items = [
        {
            key: '1',
            label: (
                <p onClick={filterBookUnborrow} style={{ padding: '0', margin: '0' }} >Sách chưa mượn</p>
            ),
        },
        {
            key: '2',
            label: (
                <p onClick={filterBookBorrowed} style={{ padding: '0', margin: '0' }} >Sách đã mượn</p>
            ),
        },
        {
            key: '2',
            label: (
                <p onClick={filterAllBook} style={{ padding: '0', margin: '0' }} >Tất cả sách</p>
            ),
        },
    ];

    return (
        <div style={{ textAlign: 'left' }}>
            <Row>
                <Col span={19}>
                    <p style={{ fontSize: '21px', fontWeight: '500', marginTop: '50px', paddingLeft: '170px', textAlign: 'left' }}> Thể loại: <span style={{ fontSize: '18px' }}>{localStorage.getItem('title')} </span></p>
                </Col>
                <Col span={5}>
                    <Space style={{marginTop: '50px', paddingLeft: '50px'}} direction="vertical">
                        <Space wrap>
                            <Dropdown
                                menu={{
                                    items,
                                }}
                                placement="bottom"
                            >
                                <Button style={{ width: '140px' }}>{filter.nameFilter}</Button>
                            </Dropdown>
                        </Space>
                    </Space>
                </Col>
            </Row>

            <Row style={{ marginTop: '20px', marginBottom: '90px' }}>
                {renderBook()}
            </Row>
        </div>
    )
}
