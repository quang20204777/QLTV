import React, { useEffect } from 'react'
import { Card, Row, Col, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import { TOKEN_USER } from '../../../utils/constant/data';
import { DOMAIN_FILE_SERVER } from '../../../utils/constant/domain';

export default function MyBook() {
  const { Meta } = Card
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { myBook } = useSelector(state => state.bookReducer)

  useEffect(() => {
    if (!localStorage.getItem(TOKEN_USER)) {
      navigate('/login', { replace: true })
    }
    dispatch({
      type: 'MY_BOOK'
    })
  }, [])

  const renderBook = () => {
    return myBook.map(item => {
      const endDate = new Date(item.endDate)
      const time = endDate - Date.now()
      if (time < 0) {
        //hết hạn
        return <Col span={6}>
          <NavLink className="nav-link" to="/userPage/book/title/bookDetailtail" onClick={() => {
            let array = []
            JSON.parse(localStorage.getItem('allBook')).map(i => {
              if (item.title === i.title) {
                array.push(i.listBook)
              }
            })
            localStorage.setItem('listBookByTitle', JSON.stringify(array[0]))
            localStorage.setItem('bookDetail', JSON.stringify(item))
            localStorage.setItem('title', item.title)
          }}>
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
                  <div style={{ backgroundColor: 'rgba(0,0,0,0.7)', width: '250px', height: '300px', backgroundSize: '100% 100%', padding: '110px 0px', borderRadius: '15px 15px 0px 0px' }} >
                    <span style={{ color: 'tomato', fontSize: '30px', fontWeight: '600' }}>Hết hạn</span>
                  </div>
                </div>
              }
            >
              <Meta title={item.name} description={item.author} />
            </Card>
          </NavLink>
        </Col>
      } else {
        return <Col span={6}>
          <NavLink className="nav-link" to="/userPage/book/title/bookDetailtail" onClick={() => {
            let array = []
            JSON.parse(localStorage.getItem('allBook')).map(i => {
              if (item.title === i.title) {
                array.push(i.listBook)
              }
            })
            localStorage.setItem('listBookByTitle', JSON.stringify(array[0]))
            localStorage.setItem('bookDetail', JSON.stringify(item))
            localStorage.setItem('title', item.title)
          }}>
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
      }
    })
  }


  return (
    <div>
      <Row style={{ marginTop: '80px' }}>
        {renderBook()}
      </Row>
    </div>
  )
}
