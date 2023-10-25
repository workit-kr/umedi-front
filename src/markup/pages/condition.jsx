import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

const {
  REACT_APP_UMEDI_URL,
  REACT_APP_UMEDI_ACCESS_TOKEN
} = process.env;

function Condition(){
  const bookingObject = JSON.parse(sessionStorage.getItem('bookingObject'));
  const navigate = useNavigate();

	const [value, setValue] = useState("");
	const [conditionList, setConditionList] = useState([]);
	const [filteredConditionList, setFilteredConditionList] = useState([]);
	const [isMatched, setIsMatched] = useState(true);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		const hospital = bookingObject?.hospitalObj;

    axios.get(
		`/speciality`,
		{
			baseURL: REACT_APP_UMEDI_URL,
			headers: {
				'X-Api-Key': REACT_APP_UMEDI_ACCESS_TOKEN
			}
		},
	).then(({data}) => {
		setLoading(false);
		setConditionList(data);

		if (hospital) {
			setFilteredConditionList(data.filter(d => d.code === hospital?.speciality_1 || d.code === hospital?.speciality_2));
		} else {
			setFilteredConditionList(data);
		}
	})
	}, []);

	useEffect(() => {
		setIsMatched(conditionList.length !== 0);
	}, [conditionList]);

	const handleInputValueChanged = (e) => {
		const input = e.target.value;
		setValue(input);

		const filtered = conditionList.filter(condition => condition.name.toLowerCase().includes(input));

		if (filtered.length === 0) {
			setIsMatched(false);
		} else {
			setFilteredConditionList(filtered);
			setIsMatched(true);
		}
	}

	const removeInputValue = () => {
		setValue("");
		setFilteredConditionList(conditionList);
	}

	const handleConditionClicked = (condition) => {
		sessionStorage.setItem('bookingObject', JSON.stringify({...bookingObject, condition: condition.name, conditionCode: condition.code}))

		if (bookingObject?.hospitalId) {
			navigate(`/agreement`);
		} else {
			navigate(`/condition/${condition.code}/hospital`);
		}
	}

	return(
		<>
			<div className="page-content bg-white">
				<section className="section-area section-sp1 bg-white">
					<div className="container">
							<div className="col-md-12 mb-30 mt-30 condition-container">
								<h1 className="home-title">
									<div className="title-text">Select your Condition, </div>
									<div className="title-text">Procedure, Doctor</div>
								</h1>

								<div className="clear" id="select-wrap">
									<TextField
										id="input-with-icon-textfield"
										variant="outlined"
										fullWidth
										sx={{
											padding: '5px 15px 15px',
											borderColor: "#006EB7",
											"&.MuiTextField-root": {
												"&:hover fieldset": {
													borderColor: "#006EB7",
												},
												"&.Mui-focused fieldset": {
													borderColor: "#006EB7",
												},
											},
											"& .MuiOutlinedInput-root": {
												"&:hover fieldset": {
													borderColor: "#006EB7",
												},
												"&.Mui-focused fieldset": {
													borderColor: "#006EB7",
												},
											},
										}}
										placeholder="Condition, Procedure, Doctor.."
										InputProps={{
											startAdornment: (
												<InputAdornment position="start" sx={{ paddingLeft: '10px' }}>
													<i className="fa fa-search"></i>
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
								</div>
								<div className="row list">
									{
										loading && (<div className="loading-wrap">
											<Spinner animation="border" role="status" />
										</div>)
									}
									{
										!loading && isMatched && filteredConditionList.length > 0 && filteredConditionList.map((condition, idx) => (
											<div className="feature-container feature-bx1 feature4 condition" key={idx} onClick={() => handleConditionClicked(condition)}>
												<div className="icon-content">
													<h4 className="ttr-title">{condition.name}</h4>
												</div>
											</div>
											)
										)
									}
									{
										!loading && !isMatched && (
											<section className="section-area section-sp2 error-404">
												<div className="container">
													<div className="inner-content">
														<h2 className="error-title"><span></span></h2>
														<p>Sorry, No Results.</p>
														<div className="clearfix">
														</div>
													</div>
												</div>
											</section>
										)
									}
								</div>
						</div>
					</div>
				</section>

			</div>
		</>

	);
}

export default Condition;