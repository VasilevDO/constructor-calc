import {Droppable} from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
    display:flex;
    flex-direction:column;
    padding:20px;
    border:2px solid gray;
    width:300px;
`;

const ConstructorArea = () => {
	const kek = 'w';
	return (
		<Droppable droppableId={'2'}>
			{provided => (
				<Container ref={provided.innerRef}
					{...provided.droppableProps}>
					{provided.placeholder}
				</Container>
			)}
		</Droppable>
	);
};

export default ConstructorArea;
