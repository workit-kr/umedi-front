import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// Elements
import BackToTop from './elements/back-top';
import PageScrollTop from './elements/page-scroll-top';

// Layout
import Header from "./layout/header";
import Footer from "./layout/footer";

import Error from './pages/error-404';
import Main from './pages/main';
import Condition from './pages/condition';
import Hospital from './pages/hospital';
import Agreement from './pages/agreement';
import Insurance from './pages/insurance';
import Schedule from './pages/schedule';
import Information from './pages/information';
import InsuranceInformation from './pages/insurance-information';
import AdditionalSchedule from './pages/additional-schedule';
import Complete from './pages/complete';
import InsuranceAddInformation from './pages/insurance-add-information';

class Markup extends Component{
	render(){
		return(
			<>
				<BrowserRouter>

					<Routes>

						<Route element={<ThemeLayout />}>
							<Route path='/main' element={<Main />} />

							<Route path='/condition' element={<Condition />} />
							<Route path='/hospital/:hospital/condition' element={<Condition />} />

							<Route path='/hospital' element={<Hospital />} />
							<Route path='/condition/:condition/hospital' element={<Hospital />} />

							<Route path='/condition/:condition/hospital/:hospital/main' element={<Main />} />
							<Route path='/hospital/:hospital/condition/:condition/main' element={<Main />} />
							<Route path='/agreement' element={<Agreement />} />
							<Route path='/insurance' element={<Insurance />} />
							<Route path='/schedule' element={<Schedule />} />
							<Route path='/additional-schedule' element={<AdditionalSchedule />} />
							<Route path='/insurance-information' element={<InsuranceInformation />} />
							<Route path='/insurance-additional-information' element={<InsuranceAddInformation />} />
							<Route path='/information' element={<Information />} />
							<Route path='/complete' element={<Complete />} />
							<Route path='/' element={<Main />} />

							<Route path="*" element={<Error />} />
						</Route>

					</Routes>

					<PageScrollTop />

				</BrowserRouter>

				<BackToTop />

			</>
		);
	}
}
function ThemeLayout(){
	return(
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
}
export default Markup;