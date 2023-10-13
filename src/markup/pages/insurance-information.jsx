import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
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
  const [value, setValue] = useState(dayjs(new Date()));

	useEffect(() => {
		if (bookingObject?.information) {
			const data = bookingObject?.information;
			setFirstName(data.firstName);
			setLastName(data.lastName);
			setGender(data.gender);
			setValue(dayjs(new Date(data.dateOfBirth)));
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
					dateOfBirth: value
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

									<InputGroup className="mb-1 input-group">
										<InputGroup.Text id="lastName"><i className="fa fa-search"></i></InputGroup.Text>
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
										<InputGroup.Text id="firstName"><i className="fa fa-hospital"></i></InputGroup.Text>
										<Form.Control
											placeholder="First Name"
											aria-label="First Name"
											aria-describedby="First Name"	
											value={firstName}				
											onChange={(e) => setFirstName(e.target.value)}
										/>
									</InputGroup>
									<TextField
											sx={{
												margin: '0px 0px 0.25rem',
												".MuiOutlinedInput-notchedOutline": {
													borderColor: 'rgb(86, 90, 207) !important',
													borderWidth: '1px',
													paddingLeft: '14px',
												},
												".MuiOutlinedInput-input": {
													paddingLeft: '25px'
												}
											}}
											MenuProps={{ disableScrollLock: true }}
											labelId="search-condition-label"
											id="search-condition"
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
													borderColor: 'rgb(86, 90, 207) !important',
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
											minDate={dayjs(new Date())}
											format="YYYY-MM-DD"
											slotProps={{
												textField: {
													InputProps: {
														startAdornment: (
															<InputAdornment position="start" sx={{ paddingLeft: '10px' }}>
																<i className="far fa-calendar fa-lg"></i>
															</InputAdornment>
														)
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