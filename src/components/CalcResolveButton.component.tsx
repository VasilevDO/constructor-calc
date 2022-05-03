import styled from 'styled-components';

const Container = styled.div`
    display: grid;
    padding:4px;
    width:240px;
	background: #FFFFFF;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1);
	border-radius: 4px;
`;

const StyledButton = styled.button`
    height:48px;
	background: #5D5FEF;
	border-radius: 6px;
	color:white;
`;

interface CalcResolveButtonI {
	action:()=>void
}

const CalcResolveButton = (props:CalcResolveButtonI) => {
	const {action} = props;
	const buttonText = '=';

	const handleButtonClick = () => {
		action();
	};

	return (
		<Container>
			<StyledButton type="button" className="btn btn-light" onClick={() => handleButtonClick()}>{buttonText}</StyledButton>
		</Container>
	);
};

export default CalcResolveButton;
