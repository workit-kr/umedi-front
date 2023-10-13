import React from 'react';
import Markup from './markup/markup';

// Slick Carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Fonts
import "./vendor/line-awesome/css/line-awesome.min.css";
import "./vendor/font-awesome/css/all.min.css";
import "./vendor/themify/themify-icons.css";

// StyleSheet
import './App.scss';

function App() {
  const bookingObject = JSON.parse(sessionStorage.getItem('bookingObject'));
  sessionStorage.setItem('bookingObject', JSON.stringify(bookingObject || {}));

	return (
		<div className="page-wraper">
			<Markup />
		</div>
	);
}

export default App;