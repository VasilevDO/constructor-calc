import {Draggable, Droppable} from 'react-beautiful-dnd';
import styled from 'styled-components';
import DraggableItem from '../models/DraggableItem.model';

const Container = styled.div<{isEmpty:boolean}>`
    width:240px;
	display:flex;
    flex-direction:column;

	border:${props => props.isEmpty ? '2px dashed black' : 'none'}

	> *:not(:last-child) {
		margin-bottom:12px;
	}
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

	console.log(items);
	return (
		<Droppable droppableId={id} isDropDisabled={isLocked === undefined ? false : isLocked}>
			{provided => (
				<Container
					ref={provided.innerRef}
					{...provided.droppableProps}
					isEmpty={Boolean(items.length)}
				>
					{
						items.map((u, i) => (
							<Draggable draggableId={`${id}/${u.id}`} index={i} key={u.id} isDragDisabled={u.isLocked}>
								{(provided, snapshot) => (
									<DraggableContainer
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										ref={provided.innerRef}
										className={snapshot.isDragging ? 'draggable-active' : ''}
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
