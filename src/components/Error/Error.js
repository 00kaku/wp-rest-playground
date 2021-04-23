import NomatchMessage from '../NomatchMessage/NomatchMessage';
const Error = () => {
	return (
		<NomatchMessage
			message={
				'Something went wrong with the api fetch. Try again after some time.'
			}
			isLoading={ false }
		/>
	);
};

export default Error;
