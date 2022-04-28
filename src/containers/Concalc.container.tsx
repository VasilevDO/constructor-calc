import styled from 'styled-components';
import {useState} from 'react';
import {DragDropContext, DragUpdate, DropResult} from 'react-beautiful-dnd';

import CalcDigits from '../components/CalcDigits.component';
import DraggableItem from '../models/DraggableItem.model';
import CalcScreen from '../components/CalcScreen.component';
import CalcOperations from '../components/CalcOperations.component';
import CalcResolveButton from '../components/CalcResolveButton.component';
import DragDropCopyArea from '../components/DragDropCopyArea.component';
import DragDropArea from '../components/DragDropArea';
import Switcher from '../components/Switcher/Switcher.components';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {useDispatch} from 'react-redux';
import {CONCALC_SWITCHER_STATE_CHANGE} from '../redux/types';

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
	flex-direction:column;
	padding:20px;
	border:3px solid gray;
`;

const CalcContainer = styled.div`
	display:flex;
	
`;

const Concalc = () => {
	// Const switcherValues = ['Runtime', 'Constructor'];
	const dispatch = useDispatch();

	const concalcState = useSelector((state: RootState) => state.concalc);

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

		const newConstructorArea = [...constructorArea];
		const newComponentsArea = [...componentsArea];

		if (source.droppableId === componentsAreaId) {
			if (destination.droppableId === constructorAreaId) {
				if (!constructorArea.find(u => u.id === item.id + copyPostfix)) {
					const newItem = new DraggableItem(components[draggableId].item, `${components[draggableId].id}${copyPostfix}`, false);

					newConstructorArea.splice(destination.index, 0, newItem);
				}
			}
		} else if (source.droppableId === constructorAreaId) {
			if (!destination) {
				newConstructorArea.splice(source.index, 1);
			} else if (destination.droppableId === constructorAreaId) {
				const item = constructorArea[source.index];
				newConstructorArea.splice(source.index, 1);
				newConstructorArea.splice(destination.index, 0, item);
			}
		}

		newComponentsArea.map(u => {
			if (newConstructorArea.find(u2 => u2.id === `${u.id}${copyPostfix}`)) {
				u.lock();
			} else {
				u.unlock();
			}

			return u;
		});

		const newState = {
			...state,
			componentsArea: newComponentsArea,
			constructorArea: newConstructorArea,
		};

		setState(newState);
	};

	const componentsAreaItems = state.componentsArea;
	const constructorAreaItems = state.constructorArea;

	const switcherValues = ['open', 'close'];
	const handleSwitcherChange = (i:number) => {
		const newSwitcherValue = switcherValues[i];
		dispatch({type: CONCALC_SWITCHER_STATE_CHANGE, payload: newSwitcherValue});
	};

	return (
		<DragDropContext onDragEnd={dragEndHandler} onDragUpdate={dragUpdateHandler}>
			<Container>
				<Switcher values={['open', 'close']} action={handleSwitcherChange}/>
				<CalcContainer>
					<DragDropCopyArea id={componentsAreaId} items={componentsAreaItems} isLocked={true}/>
					<DragDropArea id={constructorAreaId} items={constructorAreaItems}/>
				</CalcContainer>
			</Container>
		</DragDropContext>
	);
};

export default Concalc;
