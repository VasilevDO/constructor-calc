import styled from 'styled-components';
import Draggable from 'react-draggable';

import CalcDigits from '../components/CalcDigits/CalcDigits.component';
import CalcOperations from '../components/CalcOperations/CalcOperations.component';
import Switcher from '../components/Switcher/Switcher.components';

const StyledResolveButton = styled.button`
    height:48px;
    width:240px;
`;

const dragEvent = (e, data) => {
	console.log('Event Type', e.type);
	console.log({e, data});
	return false;
};

const Concalc = () => {
	const switcherValues = ['Runtime', 'Constructor'];
	return (
		<div className={'concalc'}>
			<Switcher values={switcherValues}/>
			<CalcOperations/>
			<CalcDigits/>
			<Draggable onStop={dragEvent}>
				<StyledResolveButton type="button" className="btn btn-light">=</StyledResolveButton>
			</Draggable>

		</div>
	);
};

export default Concalc;
