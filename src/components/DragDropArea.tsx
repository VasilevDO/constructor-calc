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

const DraggableContainer = styled.div<{isDragging?:boolean, isDragMode:boolean}>`
	* {
		pointer-events:${props => props.isDragMode ? 'none' : 'auto'}
	}
`;

type Props={
	id:string;
	items:DraggableItem[];
	isLocked?:boolean;
	isCopy?:boolean;
	isDragMode?:boolean
}

const DragDropArea = (props:Props) => {
	const {items, id, isLocked, isDragMode} = props;
	return (
		<Droppable droppableId={id} isDropDisabled={isLocked === undefined ? false : isLocked}>
			{provided => (
				<Container ref={provided.innerRef}
					{...provided.droppableProps}>
					{
						items.map((u, i) => (
							<Draggable draggableId={`${id}/${u.id}`} index={i} key={u.id} isDragDisabled={u.isLocked}>
								{(provided, snapshot) => (
									<DraggableContainer
										className={snapshot.isDragging ? 'draggable-active' : ''}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										ref={provided.innerRef}
										isDragging={snapshot.isDragging}
										isDragMode={isDragMode}
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
