import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";


function Information() {
  const bookingObject = JSON.parse(sessionStorage.getItem('bookingObject'));
  const navigate = useNavigate();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");

	const handlePhoneNumberChanged = (e) => {
		const input = e.target.value;
		const isString = input.match(/[^0-9]/g);
		if (isString) {
			alert('Only Numbers are Allowed');
			return;
		}

		setPhoneNumber(input);
	}

	const handleNext = () => {

		sessionStorage.setItem('bookingObject', 
			JSON.stringify(
			{
				...bookingObject, 
				information: {
					firstName: firstName,
					lastName: lastName,
					email: email,
					phoneNumber: phoneNumber
				}
			}
		))
		navigate("/complete");
	}


	return(
		<>
			<div className="page-content bg-white">
				<section className="section-area section-sp1 bg-white">
					<div className="container">
						<div className="col-md-12 mb-30 mt-50 information-container">
							<h1 className="home-title">
								<div className="title-text">Your Information</div>
							</h1>
							<div className="input-area" id="comments">

								<div className="input-container" id="respond">

									<InputGroup className="mb-1 input-group">
										<InputGroup.Text id="lastName"><i className="far fa-user"></i></InputGroup.Text>
										<Form.Control
											className="input-label"
											placeholder="Last Name"
											aria-label="Last Name"
											aria-describedby="Last Name"
											value={lastName}
											onChange={(e) => setLastName(e.target.value)}
										/>
									</InputGroup>
									<InputGroup className="mb-1">
										<InputGroup.Text id="firstName"><i className="far fa-user"></i></InputGroup.Text>
										<Form.Control
											placeholder="First Name"
											aria-label="First Name"
											aria-describedby="First Name"	
											value={firstName}				
											onChange={(e) => setFirstName(e.target.value)}
										/>
									</InputGroup>
									<InputGroup className="mb-1">
										<InputGroup.Text id="email"><i className="far fa-envelope"></i></InputGroup.Text>
										<Form.Control
											placeholder="abc@email.com"
											aria-label="Email"
											aria-describedby="Email"	
											value={email}				
											onChange={(e) => setEmail(e.target.value)}
										/>
									</InputGroup>
									<InputGroup className="mb-1">
										<InputGroup.Text id="phoneNumber"><i className="fas fa-phone-alt"></i></InputGroup.Text>
										<Form.Control
											placeholder="Your phone number"
											aria-label="Phone Number"
											aria-describedby="Phone Number"	
											value={phoneNumber}				
											onChange={handlePhoneNumberChanged}
										/>
									</InputGroup>
								</div>

								<div className="submit-button">
									<Button 
										className={(!firstName || !lastName || !email || !phoneNumber) && 'booking-disabled'}
										variant="primary" 
										size="sm" 
										onClick={handleNext}
									>
										Submit
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

export default Information;