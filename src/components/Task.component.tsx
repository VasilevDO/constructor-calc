import {Draggable} from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
    border:1px solid lightgrey;
    border-radius:2px;
    padding:8px;
    margin-bottom:8px;
`;

const Task = (props:any) => {
	const {task} = props;
	return (
		<Draggable draggableId={task.id} index={props.index}>
			{provided => (
				<Container
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					{task.content}
				</Container>
			)}
		</Draggable>

	);
};

export default Task;
