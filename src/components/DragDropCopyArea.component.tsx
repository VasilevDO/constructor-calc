import {Draggable, Droppable} from 'react-beautiful-dnd';
import styled from 'styled-components';
import DraggableItem from '../models/DraggableItem.model';

const Container = styled.div`
    display:flex;
    flex-direction:column;

	> *:not(:last-child) {
		margin-bottom:12px;
	}
`;

const DraggableContainer = styled.div<{isDragging?:boolean, isDragMode:boolean}>`
	opacity:${props => props.isDragging ? '1' : '0'};
	position:absolute;
	top:0;
	left:0;
	right:0;
	z-index:9999;

	* {
		pointer-events:none;
	}
`;

const ItemContainer = styled.div <{isDisabled:boolean}>`
	opacity:${props => props.isDisabled ? '0.5' : '1'};
	position:relative;
`;

const BaseItemContainer = styled.div<{isDragging:boolean}>`
	* {
		pointer-events:none;
	}
	opacity:${props => props.isDragging ? '0.5' : 1}
`;

type Props={
	id:string;
	items:DraggableItem[];
	isLocked?:boolean;
	isCopy?:boolean;
	isDragMode?:boolean
}

const DragDropCopyArea = (props:Props) => {
	const {items, id, isLocked, isDragMode} = props;
	return (
		<Droppable droppableId={id} isDropDisabled={isLocked === undefined ? false : isLocked}>
			{(provided, snapshot) => (
				<Container ref={provided.innerRef}
					{...provided.droppableProps}>
					{
						items.map((u, i) => (
							<Draggable draggableId={`${id}/${u.id}`} index={i} key={u.id} isDragDisabled={u.isLocked || !isDragMode}>
								{(provided, snapshot) => (
									<ItemContainer isDisabled={u.isLocked} >
										<BaseItemContainer isDragging={snapshot.isDragging}>
											{u.item}
										</BaseItemContainer>
										<DraggableContainer
											className={snapshot.isDragging ? 'draggable-active almost-zero-animation' : ''}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											ref={provided.innerRef}
											isDragging={snapshot.isDragging}
											isDragMode={isDragMode}
										>
											{u.item}
										</DraggableContainer>
									</ItemContainer>
								)}
							</Draggable>))
					}
					{isLocked
						? null
						: provided.placeholder}
				</Container>
			)}
		</Droppable>
	);
};

export default DragDropCopyArea;
