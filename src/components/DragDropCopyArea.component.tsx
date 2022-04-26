import {Draggable, Droppable} from 'react-beautiful-dnd';
import styled from 'styled-components';
import DraggableItem from '../models/DraggableItem.model';

const Container = styled.div`
    display:flex;
    flex-direction:column;
    padding:20px;
    border:2px solid gray;
    width:300px;  
`;

const DraggableContainer = styled.div<{isDragging?:boolean}>`
	opacity:${props => props.isDragging ? '1' : '0'};
	position:absolute;
	top:0;
	left:0;
	right:0;
	// transform: translate(0px,0px) !important;
	// position:${props => props.isDragging ? 'absolute' : 'inherit'};
`;

const Clone = styled.div`
	// transform: translate(0px,0px) !important;
	top:0 !important;
	left:0 !important;
	position:fixed;
`;

const ItemContainer = styled.div`
	position:relative;
`;

type Props={
	id:string;
	items:DraggableItem[];
	isLocked?:boolean;
	isCopy?:boolean;
}

const DragDropCopyArea = (props:Props) => {
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
									<ItemContainer>
										{u.item}
										<DraggableContainer
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											ref={provided.innerRef}
											isDragging={snapshot.isDragging}
										>
											{u.item}

										</DraggableContainer>
									</ItemContainer>
								)}
							</Draggable>))
					}
					{provided.placeholder}
				</Container>
			)}
		</Droppable>
	);
};

export default DragDropCopyArea;
