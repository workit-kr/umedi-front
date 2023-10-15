import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from '../elements/modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import illustration from '../../images/Illustration.png';


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
				<div className="page-content bg-white">
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

				</div>
		</>

	);
}

export default Main;