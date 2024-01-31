import { getRenderPropValue } from 'antd/es/_util/getRenderPropValue'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TOKEN_ADMIN } from '../../../utils/constant/data'

export default function IndexAdmin() {
  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem(TOKEN_ADMIN)) {
      navigate('/login', { replace: true })
    }
  }, [])

  return (
    <div style={{ backgroundColor: 'rgba(157, 240, 190, 0.4)', margin: '-24px', height: '550px', borderRadius: '4px', padding: '40px', textAlign: 'left' }}>
      <p style={{ fontSize: '19px', fontWeight: '500' }}>Đề tài: Xây dựng hệ thống quản lý sách của thư viện (***)</p>
      <p style={{ fontSize: '17px', marginLeft: '50px' }}>i. Các chức năng cơ bản: Đăng nhập, Liệt kê các đầu sách thư viện có bao gồm đầy đủ thông tin của sách (VD: tên sách, tác giả, năm xuất bản, số trang, thể loại, vị trí, vv.); tìm kiếm sách (theo tên, theo tác giả, theo thể loại, vv); sắp xếp sách</p>
      <p style={{ fontSize: '17px', marginLeft: '50px' }}>ii. Điểm cộng: giao diện đẹp, thêm các tính năng khác (hợp lý)</p>
      <h5 style={{ lineHeight: '1.8', marginLeft: '50px', marginTop: '220px', color: 'rgba(157, 50, 0, 1)', fontWeight: '700' }}>Nếu cần hỗ trợ kỹ thuật, xin quý khách hãy liên hệ theo những cách sau:</h5>
      <p style={{ lineHeight: '1.1', marginLeft: '50px', color: 'rgba(157, 50, 0, 1)', fontSize: '17px' }}>1.Gọi hotline hỗ trợ khách hàng: <p style={{ fontWeight: '700', display: 'inline' }}>0123456789</p></p>
      <p style={{ lineHeight: '1.1', marginLeft: '50px', color: 'rgba(157, 50, 0, 1)', fontSize: '17px' }}>2.Email: <p style={{ fontWeight: '700', display: 'inline' }}>project1@gmail.com</p></p>
    </div>
  )
}
