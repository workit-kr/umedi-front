import React, { Component } from 'react';

class commentRespond extends Component{
	render(){
		return(
			<>
				<div className="comment-respond" id="respond">
					<h4 className="widget-title">Book Top Cigna<div>Doctors near Me</div></h4>
					<div className="comment-form" id="commentform">
						<p className="comment-form-author">
							<label htmlFor="Condition">Condition, Procedure, Doctor.. <span className="required">*</span></label>
							<input type="text" defaultValue="" name="Condition"  placeholder="Condition, Procedure, Doctor.." id="Condition"/>
						</p>
						<p className="comment-form-author">
							<label htmlFor="Hospital">Hospital <span className="required">*</span></label>
							<input type="text" defaultValue="" name="Hospital"  placeholder="Hospital" id="author"/>
						</p>
						<p className="form-submit">
							<input type="submit" defaultValue="Booking Now!" className="submit" id="Booking" name="Booking"/>
						</p>
					</div>
				</div>

			</>
		);
	}
}

export default commentRespond;