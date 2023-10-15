import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';


function Information() {
  const bookingObject = JSON.parse(sessionStorage.getItem('bookingObject'));
  const navigate = useNavigate();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
  const [additionalInformation, setAdditionalInformation] = useState("");

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

		if (!isEmailValid()) {
			alert('Please enter a valid email address');
			return;
		}
		sessionStorage.setItem('bookingObject', 
			JSON.stringify(
			{
				...bookingObject, 
				information: {
					firstName: firstName,
					lastName: lastName,
					email: email,
					phoneNumber: phoneNumber,
					additionalInformation: additionalInformation
				}
			}
		))
		navigate("/complete");
	}

	const isEmailValid = () => {
		const matchedEmail = String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
		return !!matchedEmail;
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
									<TextField
										sx={{
											margin: '0px 0px 0.25rem',
											".MuiOutlinedInput-notchedOutline": {
												borderColor: '#006EB7 !important',
												borderWidth: '1px',
												paddingLeft: '14px',
											},
											".MuiOutlinedInput-input": {
												paddingLeft: '25px'
											}
										}}
										id="Last Name"
										fullWidth
										placeholder="Last Name"
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
										InputProps={{
											startAdornment: 
											<InputAdornment position="start" sx={{ paddingLeft: '10px' }}>
												<i className="far fa-user"></i>
											</InputAdornment>,
										}}
									>
									</TextField>
									<TextField
										sx={{
											margin: '0px 0px 0.25rem',
											".MuiOutlinedInput-notchedOutline": {
												borderColor: '#006EB7 !important',
												borderWidth: '1px',
												paddingLeft: '14px',
											},
											".MuiOutlinedInput-input": {
												paddingLeft: '25px'
											}
										}}
										id="First Name"
										fullWidth
										placeholder="First Name"
										value={firstName}				
										onChange={(e) => setFirstName(e.target.value)}
										InputProps={{
											startAdornment: 
											<InputAdornment position="start" sx={{ paddingLeft: '10px' }}>
												<i className="far fa-user"></i>
											</InputAdornment>,
										}}
									>
									</TextField>

									<TextField
										sx={{
											margin: '0px 0px 0.25rem',
											".MuiOutlinedInput-notchedOutline": {
												borderColor: '#006EB7 !important',
												borderWidth: '1px',
												paddingLeft: '14px',
											},
											".MuiOutlinedInput-input": {
												paddingLeft: '25px'
											}
										}}
										id="email"
										fullWidth
										placeholder="abc@email.com"
										value={email}				
										onChange={(e) => setEmail(e.target.value)}
										InputProps={{
											startAdornment: 
											<InputAdornment position="start" sx={{ paddingLeft: '10px' }}>
												<i className="far fa-envelope"></i>
											</InputAdornment>,
										}}
									>
									</TextField>
									<TextField
										sx={{
											margin: '0px 0px 0.25rem',
											".MuiOutlinedInput-notchedOutline": {
												borderColor: '#006EB7 !important',
												borderWidth: '1px',
												paddingLeft: '14px',
											},
											".MuiOutlinedInput-input": {
												paddingLeft: '25px'
											}
										}}
										id="Phone Number"
										fullWidth
										placeholder="Your phone number"
										value={phoneNumber}				
										onChange={handlePhoneNumberChanged}
										InputProps={{
											startAdornment: 
											<InputAdornment position="start" sx={{ paddingLeft: '10px' }}>
												<i className="fas fa-phone-alt"></i>
											</InputAdornment>,
										}}
									>
									</TextField>
									<TextField
										sx={{
											margin: '0px 0px 0.25rem',
											".MuiOutlinedInput-notchedOutline": {
												borderColor: '#006EB7 !important',
												borderWidth: '1px',
												paddingLeft: '14px',
											},
											".MuiOutlinedInput-input": {
												paddingLeft: '25px'
											}
										}}
										id="additional-information"
										fullWidth
										multiline
										maxRows={4}
										placeholder='Additional Information (Optional)'
										value={additionalInformation}
										onChange={(e) => setAdditionalInformation(e.target.value)}
										InputProps={{
											startAdornment: 
											<InputAdornment position="start" sx={{ paddingLeft: '15px' }}>
												<i className="fas fa-info"></i>
											</InputAdornment>,
										}}
										>
									</TextField>
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