import React, { useEffect } from 'react'
import { TOKEN_USER } from '../../../utils/constant/data'
import { useNavigate } from 'react-router-dom'
export default function Contact() {

  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem(TOKEN_USER)) {
      navigate('/login', { replace: true })
    }
  }, [])

  return (
    <div>
      <h3 style={{ color: 'red', marginTop: '60px', marginLeft: '150px', fontWeight: '600', textAlign: 'left' }}>Lịch sử hình thành và phát triển</h3>
      <div style={{ padding: '50px 30px', width: '58%', marginLeft: '150px', backgroundColor: '#f7f7f7', marginTop: '30px', borderRadius: '0px 90px 0px 90px', marginBottom: '100px' }}>
        <p style={{ fontSize: '16px', textAlign: 'left' }}> <span style={{ color: '#b71c1c', fontWeight: '500' }}>Thư viện Trường Đại học Bách Khoa Hà Nội</span> được thành lập từ năm 1956 (ngay sau ngày thành lập trường). Trải qua quá trình xây dựng và phát triển, Thư viện đã có nhiều đóng góp quan trọng vào việc đào tạo đội ngũ cán bộ khoa học kỹ thuật đông đảo, đóng góp tích cực vào sự nghiệp phát triển kinh tế - khoa học - kỹ thuật của đất nước.
        </p><br />
        <p style={{ fontSize: '16px', textAlign: 'left' }}> Nhìn lại chặng đường đã qua, trong những năm đầu mới thành lập, với số vốn tài liệu ban đầu là 5000 cuốn sách, cơ sở vật chất nghèo nàn và 2 cán bộ phụ trách không có nghiệp vụ thư viện, Thư viện là một bộ phận trực thuộc Phòng Giáo vụ. Có thể nói điều kiện hoạt động của Thư viện lúc bấy giờ rất khó khăn, cơ sở vật chất thiếu thốn do tình hình chung của Trường và đất nước trong những năm tháng chiến tranh. Tuy nhiên, Thư viện vẫn không ngừng phấn đấu để đảm bảo phục vụ tốt cho cán bộ và sinh viên trong trường, kể cả trong thời gian sơ tán.
        </p><br />
        <p style={{ fontSize: '16px', textAlign: 'left' }}> Thư viện đã từng đi sơ tán ở: Lạng Sơn, Hà Bắc, Hải Hưng, Hà Tây cùng khối lượng lớn sách đem theo để phục vụ đào tạo cán bộ khoa học kỹ thuật cho đất nước.
        </p><br />
        <p style={{ fontSize: '16px', textAlign: 'left' }}> Cũng trong giai đoạn này, từ Trường ĐHBK Hà Nội đã hình thành những trường đại học mới như: Đại học Xây dựng, Đại học Mỏ-Địa chất, Đại học Công nghiệp nhẹ và Phân hiệu II về Quân sự (nay là học viện Kỹ thuật Quân sự). Thư viện Trường cũng chia sẻ nhiều tài liệu và đã cử cán bộ sang làm việc công tác tại Thư viện ở trường Đại học Mỏ - địa chất và trường Đại học Xây dựng.
        </p><br />
        <p style={{ fontSize: '16px', textAlign: 'left' }}> Từ năm 1973, Thư viện tách ra thành đơn vị độc lập. Ban Thư viện đã liên tục được đầu tư và phát triển không ngừng. Khi miền Nam được giải phóng, một số cán bộ Thư viện đã vào công tác tại miền Trung và miền Nam để xây dựng Thư viện trong đó.
        </p><br />
        <p style={{ fontSize: '16px', textAlign: 'left' }}> Trong thời kỳ đổi mới, Trường Đại học Bách Khoa Hà Nội đã tiến hành hiện đại hóa công tác đào tạo, nâng cao chất lượng dạy và học. Trường cũng đã đầu tư đáng kể cho Thư viện như tăng thêm kinh phí bổ sung, nâng cấp cơ sở vật chất cho xứng đáng với tầm vóc 50 năm phát triển và trưởng thành của Trường cũng như Thư viện, nhất là đầu tư xây dựng Thư viện điện tử rất quy mô và hiện đại.
        </p><br />
        <p style={{ fontSize: '16px', textAlign: 'left' }}> Tháng 11/2003, Thư viện và Trung tâm thông tin và mạng đã sáp nhập thành đơn vị mới là Thư viện và Mạng thông tin với hai nhiệm vụ chính: vận hành và khai thác Thư viện điện tử mới và quản lý điều hành Mạng thông tin của Trường Đại học Bách Khoa Hà Nội.
        </p><br />
        <p style={{ fontSize: '16px', textAlign: 'left' }}> Từ năm học 2006 - 2007, Thư viện điện tử Trường Đại học Bách Khoa Hà Nội mở cửa phục vụ bạn đọc với hệ thống các phòng đọc tự chọn, cùng 2000 chỗ ngồi và tăng cường khả năng truy cập vào các học liệu điện tử trực tuyến.
        </p><br />
        <p style={{ fontSize: '16px', textAlign: 'left' }}> Đầu tháng 9/2008, theo sự chỉ đạo của Ban Giám hiệu để phù hợp với tình hình mới, Bộ phận Thư viện tách ra và trở thành đơn vị Thư viện Tạ Quang Bửu độc lập, bước vào một giai đoạn phát triển mới cùng với sự phát triển mạnh mẽ của trường ĐHBK Hà Nội.
        </p><br />
      </div>
    </div>
  )
}
