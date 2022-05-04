import styled from 'styled-components';
import MathOperator from '../models/MathOperator.model';
import ButtonMain from './ButtonMain.component';

const Container = styled.div`
    display: grid;
    padding:4px;
    width:240px;
    grid-template-columns:repeat(4,auto);
	background: #FFFFFF;
	justify-content: space-between;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1);
	border-radius: 4px;
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

	const buttonsWidth = '52px';

	return (
		<Container>
			{operations.map((u, i) =>
				<ButtonMain key={u.symbol} action={() => handleClick(i)} text={u.symbol} width={buttonsWidth}/>,
			)}
		</Container>
	);
};

export default CalcOperations;
