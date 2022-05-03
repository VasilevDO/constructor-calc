import styled from 'styled-components';
import {useEffect} from 'react';
import {DragDropContext, DragStart, DragUpdate, DropResult} from 'react-beautiful-dnd';

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
import {ConcalcActionTypes} from '../redux/concalc/concalc.type';
import MathOperator from '../models/MathOperator.model';

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
	const dispatch = useDispatch();

	const state = useSelector((state: RootState) => state.concalc);
	const {componentsArea, constructorArea} = state;

	const switcherState = useSelector((state:RootState) => state.switcher);
	const {values, currentValue} = switcherState;

	const calcDigitsId = 'calc-digits';
	const calcScreenId = 'calc-screen';
	const calcScreenDisabledId = 'calc-screen-disabled';
	const calcOperationsId = 'calc-operations';
	const calcResolveButtonId = 'calc-resolve';

	const handleDigitsAction = (val:string) => {
		dispatch({
			type: ConcalcActionTypes.CONCALC_DIGITS_ACTION,
			payload: val,
		});
	};

	const handleOperationsAction = (operator:MathOperator) => {
		dispatch({
			type: ConcalcActionTypes.CONCALC_OPERATOR_ACTION,
			payload: operator,
		});
	};

	const handleResolveAction = () => {
		dispatch({
			type: ConcalcActionTypes.CONCALC_RESOLVE,
		});
	};

	const screenValue = state.screen;

	const dragDrop = new Map()
		.set(calcScreenId, <CalcScreen value={screenValue} />)
		.set(calcScreenDisabledId, <CalcScreen value={'0'} />)
		.set(calcOperationsId, <CalcOperations action={handleOperationsAction}/>)
		.set(calcDigitsId, <CalcDigits action={handleDigitsAction}/>)
		.set(calcResolveButtonId, <CalcResolveButton action={handleResolveAction}/>);

	const componentsAreaId = 'components-area';
	const constructorAreaId = 'constructor-area';

	useEffect(() => {
		const componentsArea = Array.from(dragDrop.keys());
		dispatch({
			type: ConcalcActionTypes.CONCALC_COMPONENTS_AREA_SET,
			payload: componentsArea,
		});
	}, []);

	const dragEndHandler = (res:DropResult) => {
		const {destination, draggableId, source} = res;

		const itemId = draggableId.split('/')[1];

		const newConstructorArea = Array.from(constructorArea);

		if (source.droppableId === componentsAreaId) {
			if (!destination) {
				return;
			}

			if (destination.droppableId === constructorAreaId) {
				if (constructorArea.includes(itemId)) {
					return;
				}

				newConstructorArea.splice(destination.index, 0, itemId);
			}
		} else if (source.droppableId === constructorAreaId) {
			if (!destination) {
				newConstructorArea.splice(source.index, 1);
			} else if (destination.droppableId === constructorAreaId) {
				newConstructorArea.splice(source.index, 1);
				newConstructorArea.splice(destination.index, 0, itemId);
			}
		}

		dispatch({
			type: ConcalcActionTypes.CONCALC_CONSTRUCTOR_AREA_SET,
			payload: newConstructorArea,
		});
	};

	const dragUpdateHandler = (status:DragUpdate) => {
		const {destination, draggableId, source} = status;
		const target = document.querySelector('.draggable-active');
		if (destination) {
			target.classList.remove('almost-zero-animation');
		} else {
			target.classList.add('almost-zero-animation');
		}
	};

	const dragStartHandler = (start:DragStart) => {
		const {source} = start;
		if (source.droppableId === componentsAreaId) {
			const target = document.querySelector('.draggable-active');
			target.classList.add('almost-zero-animation');
		}
	};

	const componentsAreaItems = componentsArea.filter(u => u !== calcScreenId).map(u => {
		const isLocked = Boolean(constructorArea.includes(u));
		return new DraggableItem(dragDrop.get(u), u, isLocked);
	});
	const constructorAreaItems = constructorArea.map(u => {
		const isLocked = values.indexOf(currentValue) === 1;
		if (u === calcScreenDisabledId) {
			return new DraggableItem(dragDrop.get(calcScreenId), u, isLocked);
		}

		return new DraggableItem(dragDrop.get(u), u, isLocked);
	});

	return (
		<DragDropContext onDragStart={dragStartHandler} onDragEnd={dragEndHandler} onDragUpdate={dragUpdateHandler}>
			<Container>
				<Switcher/>
				<CalcContainer>
					<DragDropCopyArea id={componentsAreaId} items={componentsAreaItems} isLocked={true} isDragMode={values.indexOf(currentValue) === 0}/>
					<DragDropArea id={constructorAreaId} items={constructorAreaItems} isDragMode={values.indexOf(currentValue) === 0}/>
				</CalcContainer>
			</Container>
		</DragDropContext>
	);
};

export default Concalc;
