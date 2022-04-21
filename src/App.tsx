import {DragDropContext} from 'react-beautiful-dnd';
import Column from './components/Column.component';
import initialData from './init';

const App = () => {
	const kek = 'w';

	const state = initialData;

	const dragEndHandler = (res:any) => {
		console.log(res);
	};

	// Return (
	// 	<DragDropContext onDragEnd={dragEndHandler}>
	// 		<div>
	// 			<h1>{kek}</h1>
	// 			<Concalc/>
	// 			<ConstructorArea/>
	// 		</div>
	// 	</DragDropContext>

	// );

	return (
		<DragDropContext onDragEnd={dragEndHandler}>
			{state.columnOrder.map(columnId => {
				const column = state.columns[columnId];
				const tasks = column.taskIds.map(taskId => state.tasks[taskId]);
				return <Column key={column.id} column={column} tasks={tasks}/>;
			})}
		</DragDropContext>
	);
};

export default App;
