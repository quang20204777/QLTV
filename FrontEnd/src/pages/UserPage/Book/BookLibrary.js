import React, { useEffect, useState } from 'react'
import { Input, Space, Pagination, Row, Col, Card, Dropdown, Button } from 'antd';
import { TOKEN_USER } from '../../../utils/constant/data';
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { DOMAIN_FILE_SERVER } from '../../../utils/constant/domain';
import book_unusable from '../../../assets/book/book_unusable.png'
import listTitleOption from '../../AdminPages/Book/listTitleOption.json'

export default function BookLibrary() {

  const { Meta } = Card
  const { Search } = Input;
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { listBookBorrowOfStudent } = useSelector(state => state.bookReducer)
  const [currentPage, setCurrentPage] = useState({ page: 1 })
  const [filter, setFilter] = useState({
    status: 0,
    nameFilter: 'Bộ lọc'
  })

  useEffect(() => {
    if (!localStorage.getItem(TOKEN_USER)) {
      navigate('/login', { replace: true })
    }
    window.scrollTo(0, 0)
    dispatch({
      type: 'GET_BOOK_BORROW_STUDENT'
    })
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
    window.scrollTo(0, 0)
  }, [listBookBorrowOfStudent, filter.nameFilter, JSON.parse(localStorage.getItem('bookFilterLibrary'))])

  const onSearch = (value) => {
    dispatch({
      type: 'SEARCH_BOOK_SAGA',
      data: value
    })
  }

  const onChange = (page) => {
    //page đánh dấu trang nào đang được chọn
    setCurrentPage({ page: page })
    window.scrollTo(0, 0)
  };

  const renderBook = () => {
    if (JSON.parse(localStorage.getItem('bookFilterLibrary')) === null) {
      let t = currentPage.page * 12
      let arrayBook = []
      for (let i = 12 * (currentPage.page - 1); i < t; i++) {
        if (listBookBorrowOfStudent[i] !== undefined) {
          arrayBook.push(listBookBorrowOfStudent[i])
        }
      }
      return arrayBook.map(item => {
        if (item.userId === null) {
          return <Col span={6}>
            <NavLink onClick={() => {
              localStorage.setItem('bookFilterLibrary', JSON.stringify(listBookBorrowOfStudent))
              localStorage.setItem('bookDetail', JSON.stringify(item))
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
              localStorage.setItem('bookFilterLibrary', JSON.stringify(listBookBorrowOfStudent))
              localStorage.setItem('bookDetail', JSON.stringify(item))
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
    } else {
      let t = currentPage.page * 12
      let arrayBook = []
      let bookFilter = JSON.parse(localStorage.getItem('bookFilterLibrary'))
      for (let i = 12 * (currentPage.page - 1); i < t; i++) {
        if (bookFilter[i] !== undefined) {
          arrayBook.push(bookFilter[i])
        }
      }
      return arrayBook.map(item => {
        if (item.userId === null) {
          return <Col span={6}>
            <NavLink onClick={() => {
              localStorage.setItem('bookDetail', JSON.stringify(item))
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
              localStorage.setItem('bookDetail', JSON.stringify(item))
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
  }

  //lọc những quyển sách chưa mượn
  const filterBookUnborrow = () => {
    setCurrentPage({ page: 1 })
    let title = {
      listBook: []
    }
    listBookBorrowOfStudent.map((item) => {
      if (item.userId === null) {
        title.listBook.push(item)
      }
    })
    setFilter({ nameFilter: 'Sách chưa mượn', status: 1 })
    localStorage.setItem('bookFilterLibrary', JSON.stringify(title.listBook))
    setCurrentPage({ page: 1 })
  }

  //lọc những quyển sách đã mượn
  const filterBookBorrowed = () => {
    setCurrentPage({ page: 1 })
    let title = {
      listBook: []
    }
    listBookBorrowOfStudent.map((item) => {
      if (item.userId !== null) {
        title.listBook.push(item)
      }
    })
    setFilter({ nameFilter: 'Sách đã mượn', status: 1 })
    localStorage.setItem('bookFilterLibrary', JSON.stringify(title.listBook))
  }

  //lọc tất cả các quyển sách
  const filterAllBook = () => {
    setCurrentPage({ page: 1 })
    setFilter({ nameFilter: 'Bộ lọc', status: 1 })
    localStorage.removeItem('bookFilterLibrary')
  }


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
    <div>
      <Space direction="vertical" style={{ marginTop: '70px', width: '100%' }}>
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          style={{ width: '35%', margin: '0 auto' }}
          onSearch={onSearch}
        />
      </Space>
      <Row>
        <Col span={18}>
        </Col>
        <Col span={6}>
          <Space style={{ marginTop: '30px', paddingLeft: '50px' }} direction="vertical">
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
      <Row>
        {renderBook()}
      </Row>
      <Pagination style={{ marginTop: '40px', marginBottom: '100px' }} onChange={onChange} defaultCurrent={1} total={listBookBorrowOfStudent.length} />;
    </div>
  )
}
