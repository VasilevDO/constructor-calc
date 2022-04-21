import styled from 'styled-components';

const StyledCalcOperations = styled.div`
    display: grid;
    padding:4px;
    width:240px;
    grid-template-columns:repeat(4,auto);
    grid-column-gap: 8px;
    grid-row-gap: 8px;
    > button {
       
    }
`;

const StyledButton = styled.button`
    height:48px;
`;

const CalcOperations = () => {
	const operations = ['/', 'x', '-', '+'];

	return (
		<StyledCalcOperations>
			{operations.map(u =>
				<StyledButton key={u} type="button" className="btn btn-light">{u}</StyledButton>,
			)}
		</StyledCalcOperations>
	);
};

export default CalcOperations;
