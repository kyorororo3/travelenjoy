import React from 'react';
import { Link } from 'react-router-dom';
import  '../../resources/common/css/footer.css';

class Footer extends React.Component {
  render() {
    return(
      <div className="footer-wrapper container">
        {/* <h1>Here is Footer</h1> */}
          
          <div className='footer-text'>
          <font className="subtitle">Travel&joy</font><br></br>
            COMPANY : 트래블엔조이(Travel&joy)<br></br>         
            CEO : 민송김강이<br></br>           
            ADDRESS : 서울특별시 서초구 서초동 1303-34<br></br>           
            BUSINESS LICENSE : 000-00-00000<br></br>            
            ECOMMERCE LICENSE : 0000-0000-0000 [사업자정보확인]<br></br>           
            CONTACT US : mskkl770@gmail.com
          </div>

          <div className='footer-text'>
          <font className="subtitle">CS CENTER</font><br></br>	
            TEL : 0000-0000<br></br>	
            Mon - Fri : AM 11:00 - PM 6:00 | Lunch : PM 1:00 - 2:00 |<br></br>	
            Sat, Sun & Holiday : OFF<br></br><br></br>				
          </div>

          <div className='footer-text'>
          <font className="subtitle">FOLLOW US!</font><br></br>	
            <i className="fab fa-instagram sns" />
            <i className="fab fa-facebook-square sns" />
            <i className="fab fa-youtube sns" />
          </div>

          <div className="footer-copyright">        	
            Copyright © Travel&joy. All rights reserved.      	 	 
          </div>  
      </div>
    )
  }
}

export default Footer;