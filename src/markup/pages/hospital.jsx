import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useParams  } from 'react-router-dom';
import { LOCATION_LIST } from '../const/const';
import { Badge } from 'react-bootstrap';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from "react-router-dom";
import HospitalModal from '../elements/hospital-modal';

const {
  REACT_APP_UMEDI_URL,
  REACT_APP_UMEDI_ACCESS_TOKEN
} = process.env;

function Hospital(){
  const bookingObject = JSON.parse(sessionStorage.getItem('bookingObject'));
  const navigate = useNavigate();
  const params = useParams();

	const [condition, setCondition] = useState({name: bookingObject?.condition, code: bookingObject?.conditionCode});
  const [value, setValue] = useState('');
	const [hospitalList, setHospitalList] = useState([]);
	const [filteredHospitalList, setFilteredHospitalList] = useState([]);
	const [selectedLocation, setSelectedLocation] = useState("");
	const [selectedHospital, setSelectedHospital] = useState("");
	const [isMatched, setIsMatched] = useState(true);	
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [openModal, setOpenModal] = useState(false);

	useEffect(() => {
		fetchHospitalList();
	}, [condition, selectedLocation]);

	const fetchHospitalList = () => {
		setLoading(true);
		const strippedValue = selectedLocation.replace(/ *\([^)]*\) */g, "");

    axios.get(
			`/hospital?speciality=${condition?.code || ''}&city=${strippedValue}`,
			{
				baseURL: REACT_APP_UMEDI_URL,
				headers: {
					'X-Api-Key': REACT_APP_UMEDI_ACCESS_TOKEN
				}
			},
		)
		.then(({data}) => {
			setLoading(false);
			setError(null);
			setIsMatched(true)
			setHospitalList(data);
			setFilteredHospitalList(data);
		})
		.catch(error => {
			const response = error.response;
			if (response.data.message === 'no items') {
				setIsMatched(false);
			}
			setLoading(false);
			setError(error);
		})
	}

	const onConditionDeleted = () => {
		setCondition({});
		setFilteredHospitalList(hospitalList);
	}

	useEffect(() => {
		setIsMatched(hospitalList.length !== 0);
	}, [hospitalList]);


	const handleInputValueChanged = (e) => {
		const input = e.target.value;
		setValue(input);
		
		if (!input) {
			if (selectedLocation) {
				setFilteredHospitalList(hospitalList.filter(hospital => selectedLocation.startsWith(hospital.city)));
			} else {
				setFilteredHospitalList(hospitalList);
			}
			return;
		}

		let filtered = [];

		if (condition.code) {
			filtered = filteredHospitalList.filter(hospital => hospital.speciality_1 === condition.code || hospital?.speciality_2 === condition.code);
		}
		filtered = filteredHospitalList.filter(hospital => hospital.name.toLowerCase().includes(input));


		if (filtered.length === 0) {
			setIsMatched(false);
		} else {
			setFilteredHospitalList(filtered);
			setIsMatched(true);
		}
	}

	const removeInputValue = () => {
		setValue("");

		if (selectedLocation) {
			setFilteredHospitalList(hospitalList.filter(hospital => selectedLocation.startsWith(hospital.city)));
		} else {
			setFilteredHospitalList(hospitalList);
		}
	}

	const handleLocationChanged = (e) => {
		const selected = e.target.value;
		const strippedValue = selected.replace(/ *\([^)]*\) */g, "");

		if (strippedValue === selectedLocation) {
			setSelectedLocation("");
		} else {
			setSelectedLocation(selected);
		}
		setFilteredHospitalList(hospitalList.filter(hospital => selected.startsWith(hospital.city)));
	}

	const handleLocationClicked = (e) => {
		const text = e.target.textContent.trim();
		const strippedValue = text.replace(/ *\([^)]*\) */g, "");		
		const strippedSelected = selectedLocation.replace(/ *\([^)]*\) */g, "");

		if (strippedValue === strippedSelected) {
			setSelectedLocation("")
			setFilteredHospitalList(hospitalList);
		} else {
			setFilteredHospitalList(hospitalList.filter(hospital => hospital.city === strippedValue));
		}
	}

	const handleHospitalSelected = (hospital) => {
		sessionStorage.setItem('bookingObject', JSON.stringify({...bookingObject, hospital: hospital.name, hospitalId: hospital.id, hospitalObj: hospital}))

		if (condition?.code) {
			navigate(`/agreement`);
		} else {
			navigate(`/hospital/${hospital.id}/condition`);
		}
	}

	const handleHospitalClicked = (hospital) => {
		setSelectedHospital(hospital);
		setOpenModal(true);
	}

	return(
		<>
			<HospitalModal show={openModal} handleClose={() => setOpenModal(false)} hospital={selectedHospital} okButton="Enter Now!" handleOK={null}/>
			<div className="page-content bg-white">
				<section className="section-area section-sp1 bg-white">
					<div className="container">
							<div className="col-md-12 col-lg-7 col-xl-8 mb-30 mb-md-50">
							</div>
							<div className="col-md-12 col-lg-5 col-xl-4 mb-30">
								<h1 className="home-title">
									<div className="title-text">Select the Hospital </div>
								</h1>

								<div className="clear" id="select-wrap">
									<TextField
										id="input-with-icon-textfield"
										variant="outlined"
										fullWidth
										sx={{
											padding: '5px 15px'
										}}
										placeholder="Hospital"
										InputProps={{
											startAdornment: (
												<InputAdornment position="start" sx={{ paddingLeft: '10px' }}>
													<i className="fa fa-hospital"></i>
												</InputAdornment>
											),
											endAdornment: (
												<InputAdornment position="end" sx={{ paddingRight: '10px' }} onClick={removeInputValue}>
													<i className="fa fa-times"></i>
												</InputAdornment>
											),
										}}
										value={value}
										onChange={handleInputValueChanged}
									/>
									<div className="hospital-filter">
										{
											condition?.code && <Chip label={condition?.name} variant="outlined" onDelete={onConditionDeleted} />
										}
										<Select
											labelId="location-select"
											id="location-select"
											value={selectedLocation}
											onChange={handleLocationChanged}
											onClick={handleLocationClicked}
											displayEmpty
											sx={{
										    alignItems: "center",
												height: "32px",
												borderRadius: "16px"
											}}
										>
											<MenuItem value="" disabled>
												<div><i className="fa fa-filter"></i> Location</div>
											</MenuItem>
											{
												LOCATION_LIST.map(location => (
												<MenuItem value={location} key={location}>
													<div>
													{
														selectedLocation && location === selectedLocation && <i className="fa fa-check"></i>
													} {location}
													</div>
												</MenuItem>
												))
											}
										</Select>

									</div>
								</div>

								<section className="section-area">
									<div className="container">
										<div className="row list">
											{
												loading && (
													<div className="loading-wrap">
														<Spinner animation="border" role="status" />
													</div>
												)
											}
											{
												!loading && isMatched && filteredHospitalList.map((hospital, index) => (
													<div key={hospital.id} className="col-lg-4 mb-20">
														<div className="hospital-wrap">
															<div className="hospital-row">
																<div className="hospital-info">
																	<div className="hospital-info-content" onClick={() => handleHospitalClicked(hospital)}>
																		<span className="title">{hospital.name}
																			<svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
																				<path fillRule="evenodd" clipRule="evenodd" d="M15.0001 26.4857L15.9016 25.47C16.9244 24.2986 17.8444 23.1871 18.663 22.13L19.3387 21.2386C22.1601 17.4371 23.5716 14.42 23.5716 12.19C23.5716 7.43 19.7344 3.57143 15.0001 3.57143C10.2659 3.57143 6.42871 7.43 6.42871 12.19C6.42871 14.42 7.84014 17.4371 10.6616 21.2386L11.3373 22.13C12.5051 23.6263 13.7268 25.0782 15.0001 26.4857Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
																				<path d="M15.0001 15.7143C16.9726 15.7143 18.5716 14.1153 18.5716 12.1429C18.5716 10.1704 16.9726 8.57143 15.0001 8.57143C13.0277 8.57143 11.4287 10.1704 11.4287 12.1429C11.4287 14.1153 13.0277 15.7143 15.0001 15.7143Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
																			</svg>
																			</span>
																		<span className="text-secondary">{hospital?.speciality1_name} {hospital?.speciality2_name ? `| ${hospital?.speciality2_name }` : ''}</span>
																		<span className="text-secondary">{hospital?.city}</span>
																	</div>
																</div>
															</div>
															<div className="hospital-badge">
																<Badge bg="primary" onClick={() => handleHospitalSelected(hospital)}>Select</Badge>
															</div>
														</div>
													</div>
												))
											}
										</div>
										{
											!loading && !isMatched && (
											<div className="error-404">
												<div className="inner-content">
													<h2 className="error-title"><span></span></h2>
													<p>Sorry, No Results.</p>
													<div className="clearfix">
													</div>
												</div>
											</div>
											)
										}
									</div>
								</section>

						</div>
					</div>
				</section>

			</div>
		</>

	);
}

export default Hospital;