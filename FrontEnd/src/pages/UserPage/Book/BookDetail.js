import React, { useEffect } from 'react'
import { Card, Row, Col, Dropdown, Button, Space } from 'antd';
import { DOMAIN_FILE_SERVER } from '../../../utils/constant/domain';
import { NavLink, useNavigate } from 'react-router-dom'
import { TOKEN_USER } from '../../../utils/constant/data';


export default function BookDetail() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem(TOKEN_USER)) {
      navigate('/login', { replace: true })
      window.scrollTo(0, 0)
    }
  }, [])

  const inforBook = () => {
    let status = JSON.parse(localStorage.getItem('bookDetail')).userId === null ? <span style={{ color: 'green' }}>Có thể mượn</span> : <span style={{ color: 'red' }}>Đã có người mượn</span>
    //check xem sách bao giờ có thể mượn sách (nếu sách còn hạn)
    let date = null
    if (JSON.parse(localStorage.getItem('bookDetail')).userId !== null) {
      let endDate = JSON.parse(localStorage.getItem('bookDetail')).endDate
      let x = (new Date(endDate) - Date.now()) / (1000 * 60 * 60 * 24)
      console.log(new Date(endDate))
      console.log(Date.now())
      date = (x > 0) ? <p>Cần chờ thêm {Math.floor(x)} ngày nữa để mượn sách</p> : <p>Chưa xác định ngày trả lại (người mượn đã quá hạn nhưng chưa trả)</p>
    }

    return <div style={{ textAlign: 'left', marginLeft: '30px', marginTop: '30px' }}>
      <p style={{ fontSize: '14px', marginBottom: '6px' }}><span style={{ fontWeight: '500' }}>Tác giả:</span> {JSON.parse(localStorage.getItem('bookDetail')).author}</p>
      <p style={{ fontSize: '14px', marginBottom: '6px' }}><span style={{ fontWeight: '500' }}>Thể loại:</span> {JSON.parse(localStorage.getItem('bookDetail')).title}</p>
      <p style={{ fontSize: '14px', marginBottom: '6px' }}><span style={{ fontWeight: '500' }}>Năm sản xuất:</span> {JSON.parse(localStorage.getItem('bookDetail')).year}</p>
      <p style={{ fontSize: '14px', marginBottom: '6px' }}><span style={{ fontWeight: '500' }}>Số trang:</span> {JSON.parse(localStorage.getItem('bookDetail')).countPage}</p>
      <p style={{ fontSize: '14px', marginBottom: '6px' }}><span style={{ fontWeight: '500' }}>Vị trí sách:</span> {JSON.parse(localStorage.getItem('bookDetail')).positionBook}</p>
      <p style={{ fontSize: '14px', marginBottom: '6px' }}><span style={{ fontWeight: '500' }}>Trạng thái: {status}</span></p>
      <div style={{ color: 'green', fontSize: '23px', margin: '50px 0px' }}>{date}</div>
    </div>
  }

  const renderBookLikeTitle = () => {
    if (JSON.parse(localStorage.getItem('bookFilterLibrary')) === null) {
      const arrayBook = JSON.parse(localStorage.getItem('listBookByTitle'))
      let t = 0
      const book = JSON.parse(localStorage.getItem('bookDetail'))
      return arrayBook.map(item => {
        if (item.id !== book.id && t <= 7) {
          t++
          return <NavLink className="nav-link" to="/userPage/book/title/bookDetailtail" onClick={() => {
            localStorage.setItem('bookDetail', JSON.stringify(item))
          }} style={{ fontWeight: '300', fontSize: '16px', fontFamily: 'initial', borderBlockEnd: '1px #bdbdbd solid', writingMode: 'horizontal-tb', width: '100%', margin: '0 auto', paddingTop: '10px' }}>
            <p style={{ marginBottom: '-5px', textAlign: 'left', paddingLeft: '50px', fontSize: '19px', fontWeight: '550', fontFamily: 'initial' }}>{item.name}</p>
            <p style={{ marginBottom: '5px', textAlign: 'left', paddingLeft: '50px', fontSize: '14px' }}>{item.author}</p>
          </NavLink>
        }
      })
    } else {
      const arrayBook = JSON.parse(localStorage.getItem('bookFilterLibrary'))
      let t = 0
      const book = JSON.parse(localStorage.getItem('bookDetail'))
      return arrayBook.map(item => {
        if (item.id !== book.id && t <= 7) {
          t++
          return <NavLink className="nav-link" to="/userPage/book/title/bookDetailtail" onClick={() => {
            localStorage.setItem('bookDetail', JSON.stringify(item))
          }} style={{ fontWeight: '300', fontSize: '16px', fontFamily: 'initial', borderBlockEnd: '1px #bdbdbd solid', writingMode: 'horizontal-tb', width: '100%', margin: '0 auto', paddingTop: '10px' }}>
            <p style={{ marginBottom: '-5px', textAlign: 'left', paddingLeft: '50px', fontSize: '19px', fontWeight: '550', fontFamily: 'initial' }}>{item.name}</p>
            <p style={{ marginBottom: '5px', textAlign: 'left', paddingLeft: '50px', fontSize: '14px' }}>{item.author}</p>
          </NavLink>
        }
      })
    }
  }

  return (
    <div style={{ marginTop: '50px', marginBottom: '100px' }}>
      <p style={{ fontSize: '21px', fontWeight: '500', marginLeft: '170px', textAlign: 'left' }}> Thể loại: <span style={{ fontSize: '18px' }}>{localStorage.getItem('title')} /</span> <span style={{ color: '#9e9e9e', fontWeight: '400', fontSize: '16px' }}>{JSON.parse(localStorage.getItem('bookDetail')).name}</span></p>
      <Row>
        <Col span={15} style={{ width: '70%', backgroundColor: 'white', minHeight: '200px', marginLeft: '160px', paddingBottom: '100px', borderRadius: '20px 0px 0px 20px' }}>
          <Row >
            <Col span={7}>
              <div style={{ backgroundImage: `url("${DOMAIN_FILE_SERVER}/avatarBook/${JSON.parse(localStorage.getItem('bookDetail')).urlImage}")`, width: '200px', height: '230px', backgroundSize: '100% 100%', marginLeft: '30px', marginTop: '30px' }} />
            </Col>
            <Col span={16}>
              <p style={{ fontSize: '27px', fontFamily: 'initial', fontWeight: '900', marginTop: '25px', textAlign: 'left' }}>{JSON.parse(localStorage.getItem('bookDetail')).name}</p>
              <p style={{ textAlign: 'left', padding: '15px 30px 15px 0px' }}>{JSON.parse(localStorage.getItem('bookDetail')).name} is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
                book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more
                recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </Col>
          </Row>
          {inforBook()}
        </Col>
        <Col style={{ backgroundColor: '#eceff1', width: '80%', minHeight: '200px', borderRadius: '0px 20px 20px 0px' }} span={5}>
          <p style={{ fontWeight: '700', fontSize: '20px', fontFamily: 'initial', padding: '20px 5px 0px 5px', borderBlockEnd: '2px #4527a0 solid', writingMode: 'horizontal-tb', width: '80%', margin: '0 auto' }}>Truyện cùng thể loại</p>
          <div style={{ marginTop: '10px' }}>
            {renderBookLikeTitle()}
          </div>
        </Col>
      </Row>
    </div>
  )
}
