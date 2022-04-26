import styled from 'styled-components';
import {DragDropContext, DragStart, DropResult} from 'react-beautiful-dnd';
import CalcDigits from '../components/CalcDigits.component';
import DraggableItem from '../models/DraggableItem.model';
import CalcScreen from '../components/CalcScreen.component';
import CalcOperations from '../components/CalcOperations.component';
import CalcResolveButton from '../components/CalcResolveButton.component';
import {useState} from 'react';
import DragDropCopyArea from '../components/DragDropCopyArea.component';
import DragDropArea from '../components/DragDropArea';

type DragDropType = {
	[key:string]:DraggableItem
}

const Container = styled.div`
    display:flex;
	padding:20px;
	border:3px solid gray;
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

	const [componentsAreaItems, setComponentsAreaItems] = useState([dragDrop[calcScreenId], dragDrop[calcOperationsId], dragDrop[calcDigitsId], dragDrop[calcResolveButtonId]]);
	const [constructorAreaItems, setConstructorAreaItems] = useState([]);

	const copyPostfix = '-copy';

	const dragStartHandler = (start:DragStart) => {
		console.log(start);
		// If (source.droppableId === componentsAreaId) {
		// 	const newcomponentsAreaItems = Array.from(componentsAreaItems);
		// 	dragDrop;
		// }
	};

	const dragEndHandler = (res:DropResult) => {
		console.log(res);
		const {destination, draggableId} = res;
		if (destination.droppableId === constructorAreaId) {
			console.log(constructorAreaItems.find(u => u.id === `${draggableId}${copyPostfix}`));
			if (constructorAreaItems.find(u => u.id === `${draggableId}${copyPostfix}`)) {
				return;
			}

			const newItem = new DraggableItem(dragDrop[draggableId].item, `${dragDrop[draggableId].id}${copyPostfix}`, false);
			const newConstructorAreaItems = Array.from(constructorAreaItems);
			newConstructorAreaItems.push(newItem);
			console.log(newConstructorAreaItems);
			setConstructorAreaItems(newConstructorAreaItems);
		}
	};

	return (
		<DragDropContext onDragEnd={dragEndHandler} onDragStart={dragStartHandler}>
			<Container>
				<DragDropCopyArea id={componentsAreaId} items={componentsAreaItems} isLocked={true}/>
				<DragDropArea id={constructorAreaId} items={constructorAreaItems}/>
			</Container>
		</DragDropContext>
	);
};

export default Concalc;
