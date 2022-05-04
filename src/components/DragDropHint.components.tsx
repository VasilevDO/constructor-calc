import styled from 'styled-components';

const Container = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;    
     p {
        font-size:12px;
    }
`;

const DragDropHint = () => {
	const hintText = 'Drag here to start';

	return (
		<Container>
			<p>{hintText}</p>
		</Container>

	);
};

export default DragDropHint;

