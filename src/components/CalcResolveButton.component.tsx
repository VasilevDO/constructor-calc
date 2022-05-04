import styled from 'styled-components';
import ButtonMain from './ButtonMain.component';

const Container = styled.div`
    display: grid;
    padding:4px;
    width:240px;
	background: #FFFFFF;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1);
	border-radius: 4px;
	> button {
		background-color: #5D5FEF;
	}
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
			<ButtonMain action={() => handleButtonClick()} text={buttonText}/>
		</Container>
	);
};

export default CalcResolveButton;
