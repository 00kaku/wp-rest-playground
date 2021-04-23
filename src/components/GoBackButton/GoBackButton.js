const GoBackButton = () => {
	return (
		<span
			onClick={ () => window.history.back() }
			role="button"
			onKeyDown={ ( event ) =>
				event.key === 'Enter' ? window.history.back() : null
			}
			tabIndex={ 0 }
		>
			<i className="fa fa-window-close fa-lg"></i>
		</span>
	);
};

export default GoBackButton;
