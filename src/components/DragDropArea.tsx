import {Draggable, Droppable} from 'react-beautiful-dnd';
import styled from 'styled-components';
import DraggableItem from '../models/DraggableItem.model';

const Container = styled.div`
    display:flex;
    flex-direction:column;
    padding:20px;
    border:2px solid gray;
    width:300px;  
	background-color: yellow;
`;

const DraggableContainer = styled.div<{isDragging?:boolean}>`
`;

type Props={
	id:string;
	items:DraggableItem[];
	isLocked?:boolean;
	isCopy?:boolean;
}

const DragDropArea = (props:Props) => {
	const {items, id, isLocked} = props;
	return (
		<Droppable droppableId={id} isDropDisabled={isLocked === undefined ? false : isLocked}>
			{(provided, snapshot) => (
				<Container ref={provided.innerRef}
					{...provided.droppableProps}>
					{
						items.map((u, i) => (
							<Draggable draggableId={u.id} index={i} key={u.id} isDragDisabled={u.isBlocked}>
								{(provided, snapshot) => (
									<DraggableContainer
										className={`draggable-${u.id}`}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										ref={provided.innerRef}
										isDragging={snapshot.isDragging}
									>
										{u.item}
									</DraggableContainer>
								)
								}
							</Draggable>))
					}
					{provided.placeholder}
				</Container>
			)}
		</Droppable>
	);
};

export default DragDropArea;
