import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import {Accordion} from 'react-bootstrap';
import IconButton from '@mui/material/IconButton';

function Agreement(){
  const bookingObject = JSON.parse(sessionStorage.getItem('bookingObject') || null);

	const [agreeToAll, setAgreeToAll] = useState(bookingObject?.termsAgreed);
	const [term1, setTerm1] = useState(bookingObject?.termsAgreed);
	const [term2, setTerm2] = useState(bookingObject?.termsAgreed);
	const [activeTab, setActiveTab] = useState("-1");
  const navigate = useNavigate();

	useEffect(() => {
		if (term1 && term2) {
			setAgreeToAll(true);
		}
	}, [term1, term2])

	const handleTab = (key) => {
		if (key === activeTab) {
			setActiveTab("-1");
		} else {
			setActiveTab(key);
		}
	}

	const handleAgreeAll = () => {
		setTerm1(!agreeToAll)
		setTerm2(!agreeToAll)
		setAgreeToAll(prev => !prev);

		setActiveTab("-1");
	}

	const handleNext = () => {
		sessionStorage.setItem('bookingObject', JSON.stringify({...bookingObject, termsAgreed: true}))
		navigate("/insurance");
	}

	return(
		<>
			<div className="page-content bg-white">
				<section className="section-area section-sp1 bg-white">
					<div className="container">
						<div className="col-md-12 mb-50 mt-50 agree-container">
							<h1 className="home-title">
								<div className="title-text">Agreement</div>
							</h1>
							<div className="input-area" id="comments">
								<div>
									<div className='agree-button'>
										<Button variant="primary" size="sm" className={!agreeToAll && 'agree-disabled'} onClick={handleAgreeAll}>
											<i className="fa fa-check-circle fa-lg"></i>
											<span className="agree-text">YES, I ALL AGREE</span>
										</Button>
									</div>

									<Accordion activeKey={activeTab} className="accordion agree-accordion1">
										<Accordion.Item eventKey="0" onClick={() => handleTab("0")}>
											<Accordion.Header>
												<IconButton aria-label="term1" color="inherit" onClick={() => setTerm1(prev => !prev)}>
													{
														term1 ? 
														(<i className="fas fa-check-circle fa-sm"></i>) : 
														(<i className="far fa-check-circle fa-sm"></i>)
													}
												</IconButton>
												<span className="agree-text">I agree to the privacy policy.</span>
											</Accordion.Header>
											<Accordion.Body>
												<p className="mb-0">
												Article 1 Consent to Collection of Personal Information and Collection Method
&lt; The name of a company or website &gt; (&ldquo;URL&rdquo; hereinafter &ldquo;Website&rdquo;) shall establish a procedure for allowing customers to click the button &ldquo;Agree&rdquo; to the terms of use, collection of personal information, and details of personal information used. Customers shall be deemed to have agreed to the collection and use of their personal information by clicking the &ldquo;Agree&rdquo; button.
Article 2 Personal Information Items Collected and Purpose of Using Personal Information
&ldquo;Personal Information&rdquo; means information on living persons and refers to their names, resident registration numbers, or any other information that identifies such persons. Article 1 Consent to Collection of Personal Information and Collection Method
&lt; The name of a company or website &gt; (&ldquo;URL&rdquo; hereinafter &ldquo;Website&rdquo;) shall establish a procedure for allowing customers to click the button &ldquo;Agree&rdquo; to the terms of use, collection of personal information, and details of personal information used. Customers shall be deemed to have agreed to the collection and use of their personal information by clicking the &ldquo;Agree&rdquo; button.
Article 2 Personal Information Items Collected and Purpose of Using Personal Information
&ldquo;Personal Information&rdquo; means information on living persons and refers to their names, resident registration numbers, or any other information that identifies such persons.
												</p>
											</Accordion.Body>
										</Accordion.Item>
										<Accordion.Item eventKey="1" onClick={() => handleTab("1")}>
											<Accordion.Header>
												<IconButton aria-label="term2" color="inherit" onClick={() => setTerm2(prev => !prev)}>
													{
														term2 ? 
														(<i className="fas fa-check-circle fa-sm"></i>) : 
														(<i className="far fa-check-circle fa-sm"></i>)
													}
												</IconButton>
												<span className="agree-text">Agreement of Personal Information provision to the Third party.</span>
											</Accordion.Header>
											<Accordion.Body>
												<p className="mb-0">
													The name of the website (hereinafter referred to as the "Service"), I have read the following information and agree to provide my personal information collected by the Service to a third party as follows.1. Person who receives personal informationOOO2. Items providedName, Contact3. Purpose of using personal information of recipientPrize-winning prize4. Period of holding and using personal information of person receiving personal informationPersonal information shall be retained and used during the period of providing the service and destroyed so that the personal information of the person concerned can not be viewed or used when the user terminates the service (withdrawal of membership). However, the following cases shall be excluded.If it is determined separately by the Act,5. The customer has the right to refuse consent to the provision of personal information to third parties, and there is no disadvantage to the refusal of consent. However, the service will not be available or the service will be restricted according to the purpose of using the service.6. General information regarding the handling of personal information that is not listed above is subject to the service's privacy policy. I fully understand, understand and agree to my consent to the provision of this personal information to third parties.
												</p>
											</Accordion.Body>
										</Accordion.Item>
									</Accordion>
								</div>

								<div className="continue-button">
									<Button variant="primary" size="sm" className={!agreeToAll && 'agree-disabled'} onClick={handleNext}>
										<span className="agree-text">CONTINUE</span>
									</Button>
								</div>
							</div>


						</div>
					</div>
				</section>
			</div>
		</>

	);
}

export default Agreement;