import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sticky from 'react-stickynode';

// Images
import umedi from '../../images/umedi.png';
import umedi2 from '../../images/umedi2.png';
import { useLocation } from "react-router-dom";

const Header = () => {
	const location = useLocation();

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isSearchFormOpen, setIsSearchBtn] = useState(false);
	const quikSearchBtn = () => setIsSearchBtn(!isSearchFormOpen);
	const quikSearchClose = () => setIsSearchBtn(false);
	const [activeItem, setActiveItem] = useState(null);
	const [isMobileView, setIsMobileView] = useState(false);
	const [showBackButton, setShowBackButton] = useState(true);

	useEffect(() => {
		sessionStorage.setItem('bookingObject', {})
	}, [])

	const toggleSubmenu = (item) => {
		setActiveItem(item === activeItem ? null : item);
	};

	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};

	const handleMenuLinkClick = () => {
		if (window.innerWidth <= 991) {
			setIsMenuOpen(false);
		}
	};

	const handleContactBtnClick = () => {
		setIsMenuOpen(false);
		// Implement the logic to toggle the contact sidebar here.
	};

	const handleMenuCloseClick = () => {
		setIsMenuOpen(false);
	};

	useEffect(() => {
		if (location.pathname === "/main" || location.pathname === "/" || location.pathname === "/complete") {
			setShowBackButton(false);
		} else {
			setShowBackButton(true);
		}
	}, [location.pathname])


	useEffect(() => {
		const handleResize = () => {
			setIsMobileView(window.innerWidth >= 768);
		};

		// Check the screen size on initial render and whenever the window is resized
		handleResize();

		window.addEventListener('resize', handleResize);

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const resetData = () => {
    sessionStorage.setItem('bookingObject', null);
	}

	const goBack = () => {
		window.history.go(-1);
	}

	return (
		<header className="header header-transparent rs-nav">
			<Sticky enabled={true} className="sticky-header navbar-expand-lg">
				<div className="menu-bar clearfix">
					<div className="container-fluid clearfix">
						<div className="menu-logo logo-dark">
							{
								showBackButton ? (
								<div className="left-arrow" onClick={goBack}>
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
										<path d="M10 19l-7-7 7-7" strokeLinejoin="round" fill="none" stroke="#222" strokeLinecap="round" strokeWidth="2"/>
										<path d="M3 12h18" fill="none" stroke="#222" strokeLinecap="round" strokeWidth="2"/>
									</svg>
								</div>
								) : (<div></div>)
							}
							<div onClick={resetData}>
								<Link to="/main"><img src={umedi} alt="main page" onClick={resetData}/></Link>
								<Link to="/main"><img src={umedi2} alt="main page" onClick={resetData}/></Link>
							</div>
							<div></div>
						</div>
					</div>
				</div>
			</Sticky>

			<div className={`nav-search-bar ${isSearchFormOpen ? 'show' : ''}`}>
				<form>
					<input type="text" className="form-control" placeholder="Type to search" />
					<span><i className="ti-search"></i></span>
				</form>
				<span id="searchRemove" onClick={quikSearchClose}><i className="ti-close"></i></span>
			</div>

		</header>

	);
}

export default Header;