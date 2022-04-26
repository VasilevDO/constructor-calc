import styled from 'styled-components';

const Container = styled.div`
    display: grid;
    padding:4px;
    width:240px;
`;

const StyledButton = styled.button`
    height:48px;
`;

const CalcResolveButton = () => {
	const buttonText = '=';

	return (
		<Container>
			<StyledButton type="button" className="btn btn-light">{buttonText}</StyledButton>
		</Container>
	);
};

export default CalcResolveButton;
