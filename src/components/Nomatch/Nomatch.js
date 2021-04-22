import NomatchMessage from '../NomatchMessage/NomatchMessage';

const Nomatch = () => {
	return (
		<NomatchMessage
			isLoading={ false }
			message={ 'The page you are looking for does not exist.' }
			title="Error 404"
		/>
	);
};
export default Nomatch;
