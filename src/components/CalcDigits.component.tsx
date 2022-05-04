import styled from 'styled-components';
import ButtonMain from './ButtonMain.component';

const Container = styled.div`
    display: grid;
    padding:4px;
    width:240px;
    grid-template-columns:repeat(3,auto);
    grid-column-gap: 8px;
    grid-row-gap: 8px;
	background: #FFFFFF;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1);
	border-radius: 4px;
	> button:nth-child(10) {
		grid-column: span 2;
	}
`;

type CalcDigitsProps={
    action:(i:string)=>void,
}

const CalcDigits = (props:CalcDigitsProps) => {
	const {action} = props;
	const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ','];

	const handleClick = (i:number) => {
		action(digits[i]);
	};

	const buttonWidth = '72px';

	const zeroButtonWidth = `${(parseInt(buttonWidth, 10) * 2)}px`;

	return (
		<Container>
			{digits.map((u, i) =>
				<ButtonMain key={u} width={u === '0' ? zeroButtonWidth : buttonWidth} action = {() => handleClick(i)} text={u} />,
			)}
		</Container>
	);
};

export default CalcDigits;
