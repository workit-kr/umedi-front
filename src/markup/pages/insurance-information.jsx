import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';


function InsuranceInformation() {
  const bookingObject = JSON.parse(sessionStorage.getItem('bookingObject'));
  const navigate = useNavigate();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [gender, setGender] = useState("");
	const [genderList] = useState(["Male", "Female", "Other"]);
  const [value, setValue] = useState(null);
  const [additionalInformation, setAdditionalInformation] = useState("");

	useEffect(() => {
		if (bookingObject?.information) {
			const data = bookingObject?.information;
			setFirstName(data.firstName);
			setLastName(data.lastName);
			setGender(data.gender);
			setValue(dayjs(new Date(data.dateOfBirth)));
			setAdditionalInformation(data.additionalInformation);
		}
	}, [])

	const handleNext = () => {		
		sessionStorage.setItem('bookingObject', 
			JSON.stringify(
			{
				...bookingObject, 
				information: {
					firstName: firstName,
					lastName: lastName,
					gender: gender,
					dateOfBirth: value,
					additionalInformation: additionalInformation
				}
			}
		))
		navigate("/insurance-additional-information");
	}


	return(
		<>
			<div className="page-content bg-white">
				<section className="section-area section-sp1 bg-white">
					<div className="container">
						<div className="col-md-12 mb-30 mt-50 information-container">
							<h1 className="home-title">
								<div className="title-text">Your Information for </div>
								<div className="title-text">Insurance Claim</div>
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
										MenuProps={{ disableScrollLock: true }}
										labelId="Last Name"
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
										MenuProps={{ disableScrollLock: true }}
										labelId="First Name"
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
											MenuProps={{ disableScrollLock: true }}
											labelId="search-gender"
											id="search-gender"
											value={gender}
											select
											fullWidth
											onChange={(e) => setGender(e.target.value)}
											InputProps={{
												startAdornment: 
												<InputAdornment position="start" sx={{ paddingLeft: '10px' }}>
													<i className="fas fa-transgender-alt">
													</i>
													{
														!gender && <div className="icon-text">Gender</div>
													}
												</InputAdornment>,
											}}
										>
											{
												genderList.map(data => <MenuItem value={data}>{data}</MenuItem>)
											}
									</TextField>
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<DatePicker 
											sx={{
												width: '100%',
												margin: '0px 0px 0.25rem',
												".MuiOutlinedInput-notchedOutline": {
													borderColor: '#006EB7 !important',
													borderWidth: '1px',
													paddingLeft: '14px',
												},
												".MuiOutlinedInput-input": {
													paddingLeft: '20px',
													fontSize: '15px',
												}
											}} 
											value={value} 
											onChange={(newValue) => setValue(newValue)} 
											format="YYYY-MM-DD"
											slotProps={{
												textField: {
													InputProps: {
														startAdornment: (
															<InputAdornment position="start" sx={{ paddingLeft: '10px' }}>
																<i className="far fa-calendar fa-lg"></i>
															</InputAdornment>
														),
														placeholder: 'Date of Birth'
													},
												},
											}}
											renderInput={(params) => (
												<TextField 
													{...params} 
												/>
											)}
										/>
									</LocalizationProvider>
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
										labelId="additional-information-label"
										id="additional-information"
										fullWidth
										multiline
										maxRows={4}
										placeholder='Additional Information'
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
										className={(!firstName || !lastName || !gender || !value) && 'booking-disabled'}
										variant="primary" 
										size="sm" 
										onClick={handleNext}
									>
										Next
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

export default InsuranceInformation;