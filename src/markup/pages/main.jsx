import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from '../elements/modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import illustration from '../../images/Illustration.png';
import alliances from '../../images/alliances.png';


function Main() {
  const bookingObject = JSON.parse(sessionStorage.getItem('bookingObject'));
  const navigate = useNavigate();

	const [openModal, setOpenModal] = useState(false);
	const [message, setMessage] = useState("");
	const [hospital, setHospital] = useState(bookingObject?.hospital);
	const [condition, setCondition] = useState(bookingObject?.condition);
	
	useEffect(() => {
		const obj = bookingObject;
		delete obj?.termsAgreed;

		sessionStorage.setItem('bookingObject', JSON.stringify(obj))
	}, [])

	useEffect(() => {
		setHospital(bookingObject?.hospital || "");
		setCondition(bookingObject?.condition || "");
	}, [bookingObject?.hospital, bookingObject?.condition])

	const handleModalClose = () => {
		setOpenModal(false);
	}

	const handleConditionClicked = () => {
		navigate("/condition");
	}

	const handleHospitalClicked = () => {
		navigate("/hospital");
	}

	const handleBookingNow = () => {
		if (!bookingObject?.condition) {
			setMessage("Please enter your condition.");
			setOpenModal(true);
			return;
		}

		if (!bookingObject?.hospital) {
			setMessage("Please enter hospital you want ");
			setOpenModal(true);
			return;
		}

		navigate("/agreement");
	}

	const handleOK = () => {
		if (!bookingObject?.condition) {
			navigate("/condition");
			return;
		}

		if (!bookingObject?.hospital) {
			navigate("/hospital");
			return;
		}
	}



	return(
		<>
				<Modal show={openModal} handleClose={handleModalClose} message={message} okButton="Enter Now!" handleOK={handleOK}/>
				<div className="page-content bg-white col" style={{ height: 'auto' }}>
					<section className="section-area section-sp1 bg-white main-media">
						<div className="">
							<div className="col-md-12 mb-30 mt-80">
								<h1 className="home-title">
									<div className="title-text">Find Doctors who Take </div>
									<div className="title-text">Your Insurance in Korea</div>
								</h1>
								<div className="home-subtitle">Having trouble finding doctors in Korea who accept Cigna & other international insurances? </div>
								<div className="home-subtitle">We're here to make your healthcare in Korea more convenient. </div>

								<div className="clear" id="comment-list">
										<div className="input-area" id="comments">

											<div className="input-container" id="respond">

												<InputGroup className="mb-1 input-group">
													<InputGroup.Text id="Condition"><i className="fa fa-search"></i></InputGroup.Text>
													<Form.Control
														className="input-label"
														placeholder="Condition, Procedure, Doctor.. "
														aria-label="Condition"
														aria-describedby="Condition"
														value={condition}
														onClick={handleConditionClicked}
														onChange={() => {}}
													/>
												</InputGroup>
												<InputGroup className="mb-1">
													<InputGroup.Text id="Hospital"><i className="fa fa-hospital"></i></InputGroup.Text>
													<Form.Control
														placeholder="Hospital"
														aria-label="Hospital"
														aria-describedby="Hospital"	
														value={hospital}
														onClick={handleHospitalClicked}													
														onChange={() => {}}
													/>
												</InputGroup>
												<div className="booking-button" >
													<Button variant="primary" size="sm" onClick={handleBookingNow}>Booking Now!</Button>
												</div>
											</div>

										</div>
								</div>
							</div>
							<img src={illustration} alt="main-illustration" />
						</div>
					</section>
					<div className="we-offer-container">
						<div className="we-offer">What We Offer</div>
						<div className="we-offer-wrap">
							<div className="title">Doctor Search</div>
							<div className="content">Easily search for doctors and medical facilities in your area, filtering by specialty, location, and the language you prefer for your appointment.</div>
						</div>
						<div className="we-offer-wrap">
							<div className="title">Insurance Compatibility</div>
							<div className="content">We offer information about doctors and hospitals that accept your non-Korean insurance, including international insurers like Cigna and others. Plus, with our partnered Cigna services, you can enjoy the convenience of not having to pay upfront and waiting for reimbursement. Your insurance covers the cost directly.</div>
						</div>
						<div className="we-offer-wrap">
							<div className="title">Real Reviews</div>
							<div className="content">Read reviews and ratings from fellow expats to make informed choices about your healthcare providers.</div>
						</div>
						<div className="we-offer-wrap">
							<div className="title">Insurance Guidance</div>
							<div className="content">Receive assistance in navigating the insurance process, including guidance on the required documents for reimbursement, or, in the case of Cigna, benefit from our hassle-free direct coverage with no upfront payments.</div>
						</div>
						<img src={alliances} alt="alliances" />
					</div>
				</div>
		</>

	);
}

export default Main;