import styled from 'styled-components';
import MathOperator from '../models/MathOperator.model';

const Container = styled.div`
    display: grid;
    padding:4px;
    width:240px;
    grid-template-columns:repeat(4,auto);
    grid-column-gap: 8px;
    grid-row-gap: 8px;
	background: #FFFFFF;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1);
	border-radius: 4px;
`;

const StyledButton = styled.button`
    height:48px;
	background: #FFFFFF;
	border: 1px solid #E2E3E5;
	box-sizing: border-box;
	border-radius: 6px;
`;

interface CalcOperationsI {
    action:(operator:MathOperator)=>void
}

const CalcOperations = (props:CalcOperationsI) => {
	const {action} = props;

	const operations = [
		new MathOperator('/', (a, b) => a / b),
		new MathOperator('x', (a, b) => a * b),
		new MathOperator('-', (a, b) => a - b),
		new MathOperator('+', (a, b) => a + b),
	];

	const handleClick = (i:number) => {
		const operator = operations[i];
		action(operator);
	};

	return (
		<Container>
			{operations.map((u, i) =>
				<StyledButton key={u.symbol} type="button" className="btn btn-light" onClick={() => handleClick(i)}>{u.symbol}</StyledButton>,
			)}
		</Container>
	);
};

export default CalcOperations;
