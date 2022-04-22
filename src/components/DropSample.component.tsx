import {useState} from 'react';
import {DragDropContext, DropResult} from 'react-beautiful-dnd';
import styled from 'styled-components';
import initialData from '../init';
import Column from './Column.component';

const Container = styled.div`
	display:flex;
	width:100%;
`;

const DropSample = () => {
	const [state, setState] = useState(initialData);

	const dragEndHandler = (res:DropResult):void => {
		console.log(res);
		const {destination, source, draggableId} = res;

		if (!destination) {
			return undefined;
		}

		if (destination.droppableId === source.droppableId
			&& destination.index === source.index) {
			return undefined;
		}

		const start = state.columns[source.droppableId];
		const finish = state.columns[destination.droppableId];

		if (start === finish) {
			const newTaskIds = Array.from(start.taskIds);
			newTaskIds.splice(source.index, 1);
			newTaskIds.splice(destination.index, 0, draggableId);

			console.log(newTaskIds);

			const newColumn = {
				...start,
				taskIds: newTaskIds,
			};

			const newState = {
				...state,
				columns: {
					...state.columns,
					[newColumn.id]: newColumn,
				},
			};
			setState(newState);
		} else {
			const startTaskIds = Array.from(start.taskIds);
			startTaskIds.splice(source.index, 1);
			const newStart = {
				...start,
				taskIds: startTaskIds,
			};

			const finishTaskIds = Array.from(finish.taskIds);
			finishTaskIds.splice(destination.index, 0, draggableId);

			const newFinish = {
				...finish,
				taskIds: finishTaskIds,
			};

			const newState = {
				...state,
				columns: {
					...state.columns,
					[newStart.id]: newStart,
					[newFinish.id]: newFinish,
				},
			};
			setState(newState);
		}
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
		<Container>

			<DragDropContext onDragEnd={dragEndHandler}>
				{state.columnOrder.map(columnId => {
					const column = state.columns[columnId];
					const tasks = column.taskIds.map(taskId => state.tasks[taskId]);
					return <Column key={column.id} column={column} tasks={tasks}/>;
				})}
			</DragDropContext>
		</Container>
	);
};

export default DropSample;
