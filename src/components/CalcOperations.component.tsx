import styled from 'styled-components';

const Container = styled.div`
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
		<Container>
			{operations.map(u =>
				<StyledButton key={u} type="button" className="btn btn-light">{u}</StyledButton>,
			)}
		</Container>
	);
};

export default CalcOperations;
