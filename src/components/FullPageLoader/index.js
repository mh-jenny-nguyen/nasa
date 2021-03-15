import React from "react";
import loadingGif from "../../assets/img/loading.gif";
import './style.scss';

const FullPageLoader = (props) => {
    return (
		<div className="loading">
			<div className="loading__wrapper">
				<img className="loading__img" src={loadingGif} alt="Loading"/>
			</div>
		</div>
	)
}

export default FullPageLoader;