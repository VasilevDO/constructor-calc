import Concalc from './containers/Concalc.container';

const App = () => {
	console.log('kek');

	return 	(
		<Concalc/>
		// <DragDropContext onDragEnd={dragEndHandler}>
		// 	<Container>
		// 		<Droppable droppableId={'1'}>
		// 			{provided => (
		// 				<FlexContainer ref={provided.innerRef}
		// 					{...provided.droppableProps}>
		// 					<Draggable draggableId={'kek1'} index={0} {...provided}>
		// 						{provided => (
		// 							<Container
		// 								{...provided.draggableProps}
		// 								{...provided.dragHandleProps}
		// 								ref={provided.innerRef}
		// 							>
		// 								<CalcScreen value={0}/>
		// 							</Container>
		// 						)}
		// 					</Draggable>
		// 					<Draggable draggableId={'kek2'} index={1} {...provided}>
		// 						{provided => (
		// 							<Container
		// 								{...provided.draggableProps}
		// 								{...provided.dragHandleProps}
		// 								ref={provided.innerRef}
		// 							>
		// 								<CalcDigits/>
		// 							</Container>
		// 						)}
		// 					</Draggable>
		// 					{provided.placeholder}
		// 				</FlexContainer>
		// 			)}

	// 		</Droppable>
	// 	</Container>
	// </DragDropContext>
	);
};

export default App;
