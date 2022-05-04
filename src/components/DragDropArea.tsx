import {Draggable, Droppable} from 'react-beautiful-dnd';
import styled from 'styled-components';
import DraggableItem from '../models/DraggableItem.model';
import DragDropHint from './DragDropHint.components';

const Container = styled.div<{isEmpty:boolean, isDraggingOver:boolean}>`
    position:relative;
	width:240px;

	display: grid;
	grid-template-columns:240px;
	justify-content: center;
	align-content: start;
	grid-row-gap: 12px;

	box-sizing: border-box;
	border-radius: 6px;
	background-color: #FFFFFF;
	background-color: ${props => props.isDraggingOver ? '#F0F9FF' : '#FFFFFF'};
	border:${props => props.isEmpty ? '2px dashed #C4C4C4' : 'none'}
`;

const DraggableContainer = styled.div<{isDragging?:boolean, isDragMode:boolean}>`
	* {
		pointer-events:${props => props.isDragMode ? 'none' : 'auto'}
	}
`;

const HintContainer = styled.div`
	position:absolute;
	top:50%;
	left:50%;
	transform: translate(-50%,-50%);
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
		<Droppable droppableId={id} isDropDisabled={isLocked === undefined ? false : isLocked} >

			{(provided, snapshot) => (
				<Container
					ref={provided.innerRef}
					{...provided.droppableProps}
					isEmpty={!items.length}
					isDraggingOver={snapshot.isDraggingOver}
				>
					{	items.length
						? items.map((u, i) => (
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
						: <HintContainer>
							<DragDropHint/>
						</HintContainer>
					}
					{provided.placeholder}
				</Container>
			)
			}
		</Droppable>
	);
};

export default DragDropArea;
