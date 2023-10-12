import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { CONDITION_LIST } from '../const/const';
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
		setFilteredConditionList(data);
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
			navigate(`/condition/${condition.code}/hospital/${bookingObject?.hospitalId}/main`);
		} else {
			navigate(`/condition/${condition.code}/hospital`);
		}
	}

	return(
		<>
			<div className="page-content bg-white">
				<section className="section-area section-sp1 bg-white">
					<div className="container">
							<div className="col-md-12 col-lg-7 col-xl-8 mb-30 mb-md-50">
							</div>
							<div className="col-md-12 col-xl-4 mb-30">
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
											<div className="col-lg-6" key={idx} onClick={() => handleConditionClicked(condition)}>
												<div className="feature-container feature-bx1 feature4 condition">
													<div className="icon-md">
														<span className="icon-cell">
															<svg enableBackground="new 0 0 512 512" height="85" viewBox="0 0 512 512" width="85" xmlns="http://www.w3.org/2000/svg">
																<path d="m181.049 229.112-76.87 76.971c-14.045 14.07-14.045 36.883 0 50.953l50.881 50.974c14.045 14.07 36.815 14.07 50.86 0l178.611-178.899h-203.482z" fill="#e2c4ff"/>
																<path d="m495.277 81.339c-10.57-10.578-24.625-16.403-39.574-16.403-3.325 0-6.605.288-9.813.853 3.065-17.397-2.103-35.975-15.505-49.387-10.57-10.577-24.624-16.402-39.574-16.402s-29.003 5.825-39.573 16.402c-21.816 21.83-21.816 57.352 0 79.182 2.71 2.712 5.648 5.111 8.772 7.18l-18.689 18.716-52.105-52.184c-3.902-3.907-10.233-3.912-14.142-.012-3.908 3.902-3.914 10.234-.011 14.143l18.64 18.67-196.602 196.922c-17.56 17.593-17.902 46.002-1.029 64.017l-16.422 16.452c-3.896 3.903-3.896 10.226 0 14.129l12.383 12.406-88.75 88.913c-3.901 3.909-3.896 10.24.013 14.142 1.953 1.948 4.509 2.922 7.065 2.922 2.562 0 5.125-.979 7.078-2.936l88.724-88.887 12.357 12.38c1.876 1.88 4.422 2.936 7.078 2.936s5.202-1.056 7.078-2.936l16.396-16.426c8.547 8.028 19.644 12.432 31.418 12.432 12.28 0 23.825-4.79 32.506-13.487l196.588-196.91 18.617 18.648c1.953 1.956 4.515 2.935 7.077 2.935 2.557 0 5.113-.975 7.065-2.923 3.908-3.902 3.914-10.234.011-14.143l-52.155-52.24 18.732-18.758c2.054 3.126 4.453 6.09 7.198 8.836 10.57 10.577 24.624 16.402 39.573 16.402s29.003-5.825 39.574-16.402c21.817-21.831 21.817-57.352.001-79.182zm-129.892-50.8c6.792-6.796 15.822-10.539 25.426-10.539s18.635 3.743 25.427 10.539c13.407 13.416 13.997 34.875 1.773 49.001-.638.583-1.266 1.183-1.881 1.799-.616.617-1.214 1.245-1.795 1.882-6.533 5.671-14.791 8.766-23.524 8.766-9.604 0-18.634-3.743-25.427-10.54-14.025-14.035-14.025-36.873.001-50.908zm-239.787 380.799-24.74-24.786 9.327-9.344 14.287 14.313 10.454 10.473zm73.244-10.392c-4.903 4.912-11.42 7.617-18.352 7.617s-13.449-2.705-18.353-7.617l-50.881-50.975c-10.134-10.152-10.134-26.672-.001-36.823l196.578-196.898 87.616 87.767zm177.227-244.657-20.619-20.654 24.634-24.669c3.498.676 7.086 1.021 10.727 1.021 3.325 0 6.606-.288 9.813-.853-1.189 6.75-1.139 13.678.151 20.413zm105.062-9.905c-6.792 6.796-15.823 10.539-25.427 10.539s-18.635-3.743-25.427-10.539c-13.407-13.416-13.998-34.875-1.773-49.001.638-.583 1.266-1.183 1.881-1.799.617-.617 1.215-1.246 1.797-1.884 6.532-5.67 14.789-8.764 23.521-8.764 9.604 0 18.635 3.743 25.427 10.54 14.026 14.035 14.026 36.873.001 50.908z" fill="#020288"/>
															</svg>
														</span>
													</div>
													<div className="icon-content">
														<h4 className="ttr-title">{condition.name}</h4>
													</div>
												</div>
											</div>
											)
										)
									}
								</div>
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
				</section>

			</div>
		</>

	);
}

export default Condition;