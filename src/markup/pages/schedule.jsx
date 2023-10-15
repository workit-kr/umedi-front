import React, { useState, } from 'react';
import Button from 'react-bootstrap/Button';
import Chip from '@mui/material/Chip';
import { useNavigate } from "react-router-dom";
import {Accordion} from 'react-bootstrap';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const SLOTS = [
	{ label: "AM 09:00" , value: "AM 09:00" , flag: "M"},
	{ label: "AM 09:30" , value: "AM 09:30" , flag: "M"},
	{ label: "AM 10:00", value: "AM 10:00", flag: "M"},
	{ label: "AM 10:30", value: "AM 10:30", flag: "M"},
	{ label: "AM 11:00", value: "AM 11:00", flag: "M"},
	{ label: "AM 11:30", value: "AM 11:30", flag: "M"},
	{ label: "PM 12:00", value: "PM 12:00", flag: "A"},
	{ label: "PM 12:30", value: "PM 12:30", flag: "A"},
	{ label: "PM 01:00" , value: "PM 01:00" , flag: "A"},
	{ label: "PM 01:30" , value: "PM 01:30" , flag: "A"},
	{ label: "PM 02:00" , value: "PM 02:00" , flag: "A"},
	{ label: "PM 02:30" , value: "PM 02:30" , flag: "A"},
	{ label: "PM 03:00" , value: "PM 03:00" , flag: "A"},
	{ label: "PM 03:30" , value: "PM 03:30" , flag: "A"},
	{ label: "PM 04:00" , value: "PM 04:00" , flag: "A"},
	{ label: "PM 04:30" , value: "PM 04:30" , flag: "A"},
	{ label: "PM 05:00" , value: "PM 05:00" , flag: "A"},
	{ label: "PM 05:30" , value: "PM 05:30" , flag: "A"},
	{ label: "PM 06:00" , value: "PM 06:00" , flag: "A"},
];

function Schedule(){
  const bookingObject = JSON.parse(sessionStorage.getItem('bookingObject'));
  const navigate = useNavigate();

  const [value, setValue] = useState(dayjs(new Date()));
	const [selectedDate, setSelectedDate] = useState("");
	const [selectedSlot, setSelectedSlot] = useState("");
	const [activeTab, setActiveTab] = useState("0");

  const [optionalValue, setOptionalValue] = useState(dayjs(new Date()));
	const [optionalDate, setOptionalDate] = useState("");
	const [optionalSlot, setOptionalSlot] = useState("");
	const [optionalTab, setOptionalTab] = useState("-1");
	const [hasOptional, setHasOptional] = useState(false);

	useState(() => {
		bookingObject?.schedules?.forEach((data, idx) => {
			setActiveTab("-1");
			if (idx === 0) {
				setSelectedDate(dayjs(new Date(data.date)));
				setSelectedSlot(data.slot);
			} else {
				setOptionalDate(dayjs(new Date(data.date)));
				setOptionalSlot(data.slot);
				setHasOptional(true);
			}
		})
		const obj = bookingObject;
		delete obj.information;

		sessionStorage.setItem('bookingObject', JSON.stringify(obj))
	}, []);


	const handleDateSelected = (value) => {
		setValue(value);
		setSelectedDate(value);
		setActiveTab("1");
	}

	const handleSlotSelected = (value) => {
		setSelectedSlot(value);
		setActiveTab("-1");
	}

	const handleTab = (key) => {
		if (key === activeTab) {
			setActiveTab("-1");
		} else {
			setActiveTab(key);
		}
	}

	const handleOptionalTab = (key) => {
		if (key === optionalTab) {
			setOptionalTab("-1");
		} else {
			setOptionalTab(key);
		}
	}

	const handleOptionalDateSelected = (value) => {
		setOptionalValue(value);
		setOptionalDate(value);
		setOptionalTab("1");
		setHasOptional(true);
	}

	const handleOptionalSlotSelected = (value) => {
		setOptionalSlot(value);
		setOptionalTab("-1");
		setHasOptional(true);
	}

	const handleNext = () => {
		let schedules = [{ date: selectedDate, slot: selectedSlot}];
		if (hasOptional) {
			schedules.push({date: optionalDate,slot: optionalSlot})
		}

		sessionStorage.setItem('bookingObject', 
			JSON.stringify(
			{
				...bookingObject, 
				schedules: schedules
			}
		))
		if (bookingObject?.insuranceClaiming) {
			navigate("/insurance-information");
		} else {
			navigate("/information");
		}
	}


	return(
		<>
			<div className="page-content bg-white">
				<section className="section-area section-sp1 bg-white">
					<div className="container col">
						<div className="col-md-12 mb-30 mt-50 schedule-container">
							<h1 className="home-title">
								<div className="title-text">Appointment</div>
							</h1>
							<div className="input-area" id="comments">
								<div className="accordion-wrap">
									<div className='subtitle'>Option 1 <span className='required'>*</span></div>
									<Accordion activeKey={activeTab} className="accordion schedule-accordion1">
										<Accordion.Item eventKey="0">
											<Accordion.Header onClick={() => handleTab("0")}>
												<div className='schedule-wrap'>
													<div>
														<i className="far fa-calendar fa-lg"></i>
														<span className="agree-text">Date</span>
													</div>
													<div>{selectedDate && dayjs(selectedDate).format('YYYY MMM-DD')}</div>
												</div>
											</Accordion.Header>
											<Accordion.Body>
												<LocalizationProvider dateAdapter={AdapterDayjs}>
													<DateCalendar 
														sx={{width: 'auto'}} 
														value={value} 
														onChange={handleDateSelected} 
														minDate={dayjs(new Date())}
													/>
												</LocalizationProvider>
											</Accordion.Body>
										</Accordion.Item>
										<Accordion.Item eventKey="1">
											<Accordion.Header onClick={() => handleTab("1")}>
												<div className='schedule-wrap'>
													<div>
														<i className="far fa-clock fa-lg"></i>
														<span className="agree-text">Time</span>	
													</div>
													<div>{selectedSlot}</div>
												</div>															
											</Accordion.Header>
											<Accordion.Body>
												<div className="time-title">Morning Slots</div>
												<div className="slots">
													{
														SLOTS.map(slot => 
															slot.flag === "M" && (
																<Chip 
																	sx={{ 
																		cursor: 'pointer',
																		'&.MuiChip-outlinedDefault': {
																			border: '1px solid #006EB7 !important',
																		},
																		'&.MuiChip-fillDefault': {
																			backgroundColor: '#006EB7 !important',
																			color: '#fff'
																		}
																	}} 
																	key={slot.value} 
																	label={slot.label} 
																	variant={(selectedSlot === slot.value) ? 'fill' : 'outlined'}
																	onClick={() => handleSlotSelected(slot.value)} 
																/>
															)
														)
													}
												</div>
												<div className="time-title">Afternoon Slots</div>
												<div className="slots">
													{
															SLOTS.map(slot => 
																slot.flag === "A" && (
																	<Chip 
																		sx={{ 
																			cursor: 'pointer',
																			'&.MuiChip-outlinedDefault': {
																				border: '1px solid #006EB7 !important',
																			},
																			'&.MuiChip-fillDefault': {
																				backgroundColor: '#006EB7 !important',
																				color: '#fff'
																			}
																		}} 
																		key={slot.value} 
																		label={slot.label} 
																		variant={(selectedSlot === slot.value) ? 'fill' : 'outlined'}
																		onClick={() => handleSlotSelected(slot.value)} 
																	/>
																)
															)
														}
												</div>
											</Accordion.Body>
										</Accordion.Item>
									</Accordion>
								</div>
								<div className="accordion-wrap">
									<div className='subtitle'>Option 2</div>
									<Accordion activeKey={optionalTab} className="accordion schedule-accordion1">
										<Accordion.Item eventKey="0">
											<Accordion.Header onClick={() => handleOptionalTab("0")}>
												<div className='schedule-wrap'>
													<div>
														<i className="far fa-calendar fa-lg"></i>
														<span className="agree-text">Date</span>
													</div>
													<div>{optionalDate && dayjs(optionalDate).format('YYYY MMM-DD')}</div>
												</div>
											</Accordion.Header>
											<Accordion.Body>
												<LocalizationProvider dateAdapter={AdapterDayjs}>
													<DateCalendar 
														sx={{width: 'auto'}} 
														value={optionalValue} 
														onChange={handleOptionalDateSelected} 
														minDate={dayjs(new Date())}
													/>
												</LocalizationProvider>
											</Accordion.Body>
										</Accordion.Item>
										<Accordion.Item eventKey="1">
											<Accordion.Header onClick={() => handleOptionalTab("1")}>
												<div className='schedule-wrap'>
													<div>
														<i className="far fa-clock fa-lg"></i>
														<span className="agree-text">Time</span>	
													</div>
													<div>{optionalSlot}</div>
												</div>															
											</Accordion.Header>
											<Accordion.Body>
												<div className="time-title">Morning Slots</div>
												<div className="slots">
													{
														SLOTS.map(slot => 
															slot.flag === "M" && (
																<Chip 
																	sx={{ 
																		cursor: 'pointer',
																		'&.MuiChip-outlinedDefault': {
																			border: '1px solid #006EB7 !important',
																		},
																		'&.MuiChip-fillDefault': {
																			backgroundColor: '#006EB7 !important',
																			color: '#fff'
																		}
																	}} 
																	key={slot.value} 
																	label={slot.label} 
																	variant={(optionalSlot === slot.value) ? 'fill' : 'outlined'}
																	onClick={() => handleOptionalSlotSelected(slot.value)} 
																/>
															)
														)
													}
												</div>
												<div className="time-title">Afternoon Slots</div>
												<div className="slots">
													{
															SLOTS.map(slot => 
																slot.flag === "A" && (
																	<Chip 
																		sx={{ 
																			cursor: 'pointer',
																			'&.MuiChip-outlinedDefault': {
																				border: '1px solid #006EB7 !important',
																			},
																			'&.MuiChip-fillDefault': {
																				backgroundColor: '#006EB7 !important',
																				color: '#fff'
																			}
																		}} 
																		key={slot.value} 
																		label={slot.label} 
																		variant={(optionalSlot === slot.value) ? 'fill' : 'outlined'}
																		onClick={() => handleOptionalSlotSelected(slot.value)} 
																	/>
																)
															)
														}
												</div>
											</Accordion.Body>
										</Accordion.Item>
									</Accordion>
								</div>
							</div>
						</div>

						<div className="continue-button">
							<Button 
								disabled={!selectedDate || !selectedSlot}
								variant="primary" 
								size="sm" 
								onClick={handleNext}
							>
								<span className="agree-text">CONTINUE</span>
							</Button>
						</div>

					</div>
				</section>

			</div>
		</>

	);
}

export default Schedule;