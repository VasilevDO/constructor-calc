import styled from 'styled-components';

const Container = styled.div`
    display: grid;
    padding:4px;
    width:240px;
    grid-template-columns:repeat(3,auto);
    grid-column-gap: 8px;
    grid-row-gap: 8px;
`;

const StyledButton = styled.button<{width: number}>`
    grid-column: span ${props => props.width};
    // width:72px;
    height:48px;
`;

const CalcDigits = () => {
	const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, ','];

	return (
		<Container>
			{digits.map(u =>
				<StyledButton key={u} width={u === 0 ? 2 : 1} type="button" className="btn btn-light">{u}</StyledButton>,
			)}
		</Container>
	);
};

export default CalcDigits;
