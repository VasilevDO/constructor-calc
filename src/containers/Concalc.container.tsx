import styled from 'styled-components';
import {DragDropContext, DragStart, DragUpdate, Droppable, DropResult} from 'react-beautiful-dnd';
import CalcDigits from '../components/CalcDigits.component';
import DraggableItem from '../models/DraggableItem.model';
import CalcScreen from '../components/CalcScreen.component';
import CalcOperations from '../components/CalcOperations.component';
import CalcResolveButton from '../components/CalcResolveButton.component';
import {useEffect, useState} from 'react';
import DragDropCopyArea from '../components/DragDropCopyArea.component';
import DragDropArea from '../components/DragDropArea';

type DragDropType = {
	[key:string]:DraggableItem
}

type InitialStateType = {
	components:DragDropType,
	componentsArea:DraggableItem[],
	constructorArea:DraggableItem[],
}

const Container = styled.div`
    display:flex;
	padding:20px;
	border:3px solid gray;

`;

const DeleteContainer = styled.div`
	background-color:blue;
	opacity:0.3;
	position:absolute;
	top:0;
	left:0;
	right:0;
	bottom:0;
`;

const Concalc = () => {
	// Const switcherValues = ['Runtime', 'Constructor'];

	const calcDigitsId = 'calc-digits';
	const calcScreenId = 'calc-screen';
	const calcOperationsId = 'calc-operations';
	const calcResolveButtonId = 'calc-resolve';

	const dragDrop:DragDropType = {
		[calcDigitsId]: new DraggableItem(<CalcDigits/>, calcDigitsId, false),
		[calcScreenId]: new DraggableItem(<CalcScreen value={0}/>, calcScreenId, false),
		[calcOperationsId]: new DraggableItem(<CalcOperations/>, calcOperationsId, false),
		[calcResolveButtonId]: new DraggableItem(<CalcResolveButton/>, calcResolveButtonId, false),
	};

	const componentsAreaId = 'components-area';
	const constructorAreaId = 'constructor-area';

	const copyPostfix = '-copy';

	const initState:InitialStateType = {
		components: dragDrop,
		componentsArea: [dragDrop[calcScreenId], dragDrop[calcOperationsId], dragDrop[calcDigitsId], dragDrop[calcResolveButtonId]],
		constructorArea: [],
	};

	const [state, setState] = useState(initState);

	const dragUpdateHandler = (status:DragUpdate) => {
		const {destination, draggableId, source} = status;
		if (source.droppableId === constructorAreaId) {
			const target = document.querySelector(`.draggable-${draggableId}`);
			if (destination) {
				target.classList.remove('almost-zero-animation');
			} else {
				target.classList.add('almost-zero-animation');
			}
		}
	};

	const dragEndHandler = (res:DropResult) => {
		console.log(res);
		const {destination, draggableId, source} = res;

		const {componentsArea, constructorArea, components} = state;

		const item = components[draggableId];

		if (source.droppableId === componentsAreaId) {
			if (destination.droppableId === constructorAreaId) {
				if (!constructorArea.find(u => u.id === item.id + copyPostfix)) {
					const newItem = new DraggableItem(components[draggableId].item, `${components[draggableId].id}${copyPostfix}`, false);

					const newConstructorArea = [...constructorArea].splice(destination.index, 0, newItem);
					console.log(newConstructorArea);
					const newComponentsArea = [...componentsArea].map(u => {
						if (u.id === draggableId) {
							u.lock();
						}

						return u;
					});

					const newState = {
						...state,
						componentsArea: newComponentsArea,
						constructorArea: newConstructorArea,
					};

					setState(newState);
				}
			}
		}

		console.log(state);
		// If (source.droppableId === componentsAreaId) {
		// 	if (!destination) {
		// 		return;
		// 	}

		// 	if (destination.droppableId === constructorAreaId) {
		// 		if (constructorAreaItems.find(u => u.id === `${draggableId}${copyPostfix}`)) {
		// 			return;
		// 		}

		// 		const newItem = new DraggableItem(dragDrop[draggableId].item, `${dragDrop[draggableId].id}${copyPostfix}`, false);
		// 		const newConstructorAreaItems = Array.from(constructorAreaItems);
		// 		newConstructorAreaItems.splice(destination.index, 0, newItem);
		// 		setConstructorAreaItems(newConstructorAreaItems);
		// 	}
		// } else if (source.droppableId === constructorAreaId) {
		// 	if (!destination) {
		// 		const newConstructorAreaItems = [...constructorAreaItems];
		// 		newConstructorAreaItems.splice(source.index, 1);
		// 		setConstructorAreaItems(newConstructorAreaItems);
		// 	} else if (destination.droppableId === constructorAreaId) {
		// 		const item = constructorAreaItems[source.index];
		// 		const newConstructorAreaItems = [...constructorAreaItems];
		// 		newConstructorAreaItems.splice(source.index, 1);
		// 		newConstructorAreaItems.splice(destination.index, 0, item);
		// 		setConstructorAreaItems(newConstructorAreaItems);
		// 	}
		// }
	};

	// UseEffect(() => {
	// 	const newComponentsAreaItems = [...componentsAreaItems].map(u => {
	// 		if (constructorAreaItems.find(u2 => u2.id === u.id + copyPostfix)) {
	// 			u.lock();
	// 		} else {
	// 			u.unlock();
	// 		}

	// 		return u;
	// 	});
	// 	setComponentsAreaItems(newComponentsAreaItems);
	// }, [constructorAreaItems]);

	const componentsAreaItems = state.componentsArea;
	const constructorAreaItems = state.constructorArea;

	return (
		<DragDropContext onDragEnd={dragEndHandler} onDragUpdate={dragUpdateHandler}>
			<Container>
				<DragDropCopyArea id={componentsAreaId} items={componentsAreaItems} isLocked={true}/>
				<DragDropArea id={constructorAreaId} items={constructorAreaItems}/>
			</Container>
		</DragDropContext>
	);
};

export default Concalc;
