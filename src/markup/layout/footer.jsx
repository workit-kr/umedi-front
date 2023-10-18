import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Images
import Logo from '../../images/logo.png';
import footerBg from '../../images/background/footer.jpg';
import ptImg1 from '../../images/shap/wave-blue.png';
import ptImg2 from '../../images/shap/circle-dots.png';
import ptImg3 from '../../images/shap/plus-blue.png';
import ptImg4 from '../../images/shap/wave-blue.png';

// Social Images
import facebook from '../../images/social/facebook.png';
import twitter from '../../images/social/twitter.png';
import instagram from '../../images/social/instagram.png';
import linkedin from '../../images/social/linkedin.png';


import umedi from '../../images/u-medi-white.png';

class aboutSection extends Component{
	render(){
	
		const resetData = () => {
			sessionStorage.setItem('bookingObject', JSON.stringify({}));
		}

		return(
			<>
				<footer className="footer">
					<div className="footer-top">
						<div className="container">
							<div className="row">
								<div className="widget widget_info">
									<div className='sns-links'>
										<a type="button" href="https://www.facebook.com/umediwellness/" target="_blank">
											<i className='fab fa-facebook-f'/>
										</a>
										<a href="mailto:info@u-medi.com" target="_blank">
											<i className='fas fa-envelope'/>
										</a>
										<a type="button" href="http://968vp.channel.io/support-bots/51785" target="_blank">
											<i className='fas fa-comment-dots'/>
										</a>
									</div>
									<div className="footer-logo">
										<Link to="/main"><img src={umedi} alt="main page" onClick={resetData}/></Link>
									</div>
									<div className="footer-text"><span className='medium bold'>U-MEDI Co., Ltd.</span><span>Business License:  131-86-60359</span></div>
									<div className="footer-text"><span style={{ display: 'block' }}>Tel. 070-4639-0022 &nbsp;&nbsp;&nbsp; E-mail. info<a href="mailto:wellness@u-medi.com">@u-medi.com</a>&nbsp;&nbsp;&nbsp;Add. 23 Fl. 263, Central-ro, Yeonsu-gu, Incheon</span></div>
									<br /><br />
									<div className="footer-text"><span className='medium'>Terms and conditions</span><span className='medium'>Privacy policy</span></div>
									<div className="footer-text"><span>Copyright ⓒ 2023 U-MEDIㅣYour MEDIcal Platform All rights reserved.</span></div>
								</div>
							</div>
						</div>
					</div>
				</footer>

			</>
		);
	}
}

export default aboutSection;