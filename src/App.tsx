import {DragDropContext, Draggable, Droppable, DropResult} from 'react-beautiful-dnd';
import styled from 'styled-components';
import CalcDigits from './components/CalcDigits/CalcDigits.component';
import CalcOperations from './components/CalcOperations/CalcOperations.component';
import CalcScreen from './components/CalcScreen/CalcScreen.component';

const Container = styled.div`
	display:flex;
	width:100%;
	> div {
		width:400px;
		border:2px solid gray;
	}
`;

const App = () => {
	const dragEndHandler = (res:DropResult) => {
		console.log(res);
	};

	console.log('kek');

	return 	(
		<DragDropContext onDragEnd={dragEndHandler}>
			<Container>

				<div>
					<Droppable droppableId={'1'}>
						{provided => (
							<Container ref={provided.innerRef}
								{...provided.droppableProps}>
								<Draggable draggableId={'kek1'} index={0} {...provided}>
									{provided => (
										<Container
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											ref={provided.innerRef}
										>
											<CalcScreen value={0}/>
										</Container>
									)}
								</Draggable>
							</Container>
						)}

					</Droppable>

					{/* <Draggable draggableId={'kek1'} index={0}>
						{provided => (
							<Container
								{...provided.draggableProps}
								{...provided.dragHandleProps}
								ref={provided.innerRef}
							>
								<CalcScreen value={0}/>
							</Container>
						)}
					</Draggable> */}
				</div>
				<div>
123
				</div>

			</Container>
		</DragDropContext>
	);
};

export default App;
