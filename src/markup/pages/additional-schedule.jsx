import React, { useState } from 'react';
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

function AdditionalSchedule(){
  const bookingObject = JSON.parse(sessionStorage.getItem('bookingObject') || null);
  const navigate = useNavigate();

  const [value, setValue] = useState(dayjs(new Date()));
	const [selectedDate, setSelectedDate] = useState("");
	const [selectedSlot, setSelectedSlot] = useState("");
	const [activeTab, setActiveTab] = useState("0");

	useState(() => {
		if (bookingObject?.schedules.length > 1) {
			const data = bookingObject?.schedules[1];
			setSelectedDate(dayjs(new Date(data.date)));
			setSelectedSlot(data.slot);
			setActiveTab("-1");
		}

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

	const handleNext = () => {
		const schedule = bookingObject.schedules[0];

		sessionStorage.setItem('bookingObject', 
			JSON.stringify(
			{
				...bookingObject, 
				schedules: [
					schedule,
					{
						date: selectedDate,
						slot: selectedSlot
					}
				]
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
						<div className="container">
								<div className="col-md-12 col-xl-4 mb-30 mt-50 schedule-container">
								<h1 className="home-title">
									<div className="title-text">Additional Appointment</div>
								</h1>
									<div className="input-area" id="comments">
										<div className="col-lg-6">
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
																					border: '1px solid #565acf !important',
																				},
																				'&.MuiChip-fillDefault': {
																					backgroundColor: '#565acf !important',
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
																						border: '1px solid #565acf !important',
																					},
																					'&.MuiChip-fillDefault': {
																						backgroundColor: '#565acf !important',
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
										<div>
											<div className="continue-button">
												<Button variant="primary" size="sm" onClick={handleNext} disabled={!selectedDate || !selectedSlot}>
													<span className="agree-text">CONTINUE</span>
												</Button>
											</div>
										</div>
									</div>


							</div>
						</div>
					</section>

				</div>
		</>

	);
}

export default AdditionalSchedule;