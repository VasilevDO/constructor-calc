import styled from 'styled-components';

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
`;

const StyledButton = styled.button<{width: number}>`
    grid-column: span ${props => props.width};
    height:48px;
	background: #FFFFFF;
	border: 1px solid #E2E3E5;
	box-sizing: border-box;
	border-radius: 6px;
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

	return (
		<Container>
			{digits.map((u, i) =>
				<StyledButton key={u} width={u === '0' ? 2 : 1} type="button" className="btn btn-light" onClick={() => handleClick(i)}>{u}</StyledButton>,
			)}
		</Container>
	);
};

export default CalcDigits;
