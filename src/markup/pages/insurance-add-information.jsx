import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import ImageTools from '../utilities/imageTools';


function Information() {
  const bookingObject = JSON.parse(sessionStorage.getItem('bookingObject'));
  const navigate = useNavigate();
  const fileInput = useRef();
  const additionalFileInput = useRef();

	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [insuranceImages, setInsuranceImages] = useState([]);
	const [additionalImages, setAdditionalImages] = useState([]);


	const handleNext = () => {

		sessionStorage.setItem('bookingObject', 
			JSON.stringify(
			{
				...bookingObject, 
				information: {
					email: email,
					phoneNumber: phoneNumber,
					additionalImages: additionalImages,
					insuranceImages: insuranceImages
				}
			}
		))
		navigate("/complete");
	}

	const onFileChange = (event) => {
    const inputFiles = event.target.files;
    const file = inputFiles[0];

    if (!file) {
      return;
    }

    ImageTools.resize(file, {
        width: 1500, // maximum width
        height: 750 // maximum height
    }, function(blob, didItResize) {

      blobToBase64(blob)
      .then(resizedFile => {
				setInsuranceImages([...insuranceImages, resizedFile]);

        const imageToUpload = {
        //   tran_seqno: sku.tran_seqno,
        //   cust_id: userDetail.account, 
        //   sku_code: sku.sku_code, 
        //   image_seq: uuid, 
        //   image_str: resizedFile.replace(/^data:image\/\w+;base64,/, '')
        } 

      })
    });

  }

	const onAdditionalFileChange = (event) => {
    const inputFiles = event.target.files;
    const file = inputFiles[0];

    if (!file) {
      return;
    }

    ImageTools.resize(file, {
        width: 1500, // maximum width
        height: 750 // maximum height
    }, function(blob, didItResize) {

      blobToBase64(blob)
      .then(resizedFile => {
				setAdditionalImages([...additionalImages, resizedFile]);

        const imageToUpload = {
        //   tran_seqno: sku.tran_seqno,
        //   cust_id: userDetail.account, 
        //   sku_code: sku.sku_code, 
        //   image_seq: uuid, 
        //   image_str: resizedFile.replace(/^data:image\/\w+;base64,/, '')
        } 
      })
    });

  }

	const blobToBase64 = (blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);

    return new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader?.result);
      };
    });
  };


  const onInsuranceCameraIconClicked = () => {
    if (insuranceImages.length > 2) {
      alert('사진은 최대 4개만 첨부할 수 있습니다.');
      return;
    }
		fileInput.current.click();
  }

	const onAdditionalCameraIconClicked = () => {
    if (additionalImages.length > 2) {
      alert('사진은 최대 4개만 첨부할 수 있습니다.');
      return;
    }
		additionalFileInput.current.click();
  }

	const handlePhoneNumberChanged = (e) => {
		const input = e.target.value;
		const isString = input.match(/[^0-9]/g);
		if (isString) {
			alert('Only Numbers are Allowed');
			return;
		}

		setPhoneNumber(input);
	}

	const deleteImage = (imageIdx) => {
		const copiedImages = [...insuranceImages];
		copiedImages.splice(imageIdx, 1);
		setInsuranceImages(copiedImages);
  }

	const deleteAdditionalImage = (imageIdx) => {
		const copiedImages = [...additionalImages];
		copiedImages.splice(imageIdx, 1);
		setAdditionalImages(copiedImages);
  }
	return(
		<>
			<div className="page-content bg-white">
				<section className="section-area section-sp1 bg-white">
					<div className="container">
						<div className="col-md-12 mb-30 mt-50 information-container">
							<h1 className="home-title">
								<div className="title-text">Your Information for</div>
								<div className="title-text">Insurance Claim</div>
							</h1>
							<div className="input-area" id="comments">

								<div className="input-container" id="respond">
									<InputGroup className="mb-1">
										<InputGroup.Text id="email"><i className="far fa-envelope"></i></InputGroup.Text>
										<Form.Control
											placeholder="abc@email.com"
											aria-label="Email"
											aria-describedby="Email"	
											value={email}				
											onChange={(e) => setEmail(e.target.value)}
										/>
									</InputGroup>
									<InputGroup className="mb-1">
										<InputGroup.Text id="phoneNumber"><i className="fas fa-phone-alt"></i></InputGroup.Text>
										<Form.Control
											placeholder="Your phone number"
											aria-label="Phone Number"
											aria-describedby="Phone Number"
											value={phoneNumber}				
											onChange={handlePhoneNumberChanged}
										/>
									</InputGroup>

									<div className="image-wrap">
										<div className="image-title">
											Insurance Card(front/back)
											<span className="required">*</span>
										</div>

										<div className="insurance-image-icon">
											<button className="image-button" onClick={onInsuranceCameraIconClicked} >
												<i className='fas fa-camera fa-lg'></i>
												<input
													id="attach-file"
													type="file"
													capture="camera"
													accept="image/*"
													ref={fileInput}
													style={{ display: 'none' }}
													onChange={onFileChange}
													/>

											</button>
											{
												[0, 1].map((val, idx) => (
													insuranceImages[val] ? (
													<div className="image-button-wrap" key={idx}>
														<button className="close" onClick={() => deleteImage(idx)}>
															<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																<path d="M16.192 6.34399L11.949 10.586L7.70697 6.34399L6.29297 7.75799L10.535 12L6.29297 16.242L7.70697 17.656L11.949 13.414L16.192 17.656L17.606 16.242L13.364 12L17.606 7.75799L16.192 6.34399Z" fill="#FFFFFF"/>
															</svg>
														</button>
														<div className="image-button">
															<img  className="image" src={insuranceImages[val]} alt={`insurance-${idx}`} />
														</div>
													</div>
													) : <div className="image-button"></div>
												))
											}
										</div>
									</div>

									<div className="image-wrap">
										<div className="image-title">
											Attached medical record/certificate..
										</div>

										<div className="insurance-image-icon">
											<button className="image-button" onClick={onAdditionalCameraIconClicked}>
												<i className='fas fa-camera fa-lg'></i>
												<input
													id="attach-file"
													type="file"
													capture="camera"
													accept="image/*"
													ref={additionalFileInput}
													style={{ display: 'none' }}
													onChange={onAdditionalFileChange}
													/>
											</button>
											{
												[0, 1, 2, 3].map((val, idx) => (
													additionalImages[val] ? (
													<div className="image-button-wrap" key={idx}>
														<button className="close" onClick={() => deleteAdditionalImage(idx)}>
															<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																<path d="M16.192 6.34399L11.949 10.586L7.70697 6.34399L6.29297 7.75799L10.535 12L6.29297 16.242L7.70697 17.656L11.949 13.414L16.192 17.656L17.606 16.242L13.364 12L17.606 7.75799L16.192 6.34399Z" fill="#FFFFFF"/>
															</svg>
														</button>
														<div className="image-button">
													<img  className="image" src={additionalImages[val]} alt={`insurance-${idx}`} />
														</div>
													</div>
													) : <div className="image-button"></div>
												))
											}
										</div>
									</div>
								</div>

								<div className="submit-button">
									<Button 
										className={(!email || !phoneNumber || insuranceImages.length < 2) && 'booking-disabled'}
										variant="primary" 
										size="sm" 
										onClick={handleNext}
									>
										Submit
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

export default Information;