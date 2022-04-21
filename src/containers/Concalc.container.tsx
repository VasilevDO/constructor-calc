import styled from 'styled-components';

import CalcDigits from '../components/CalcDigits/CalcDigits.component';
import CalcOperations from '../components/CalcOperations/CalcOperations.component';
import Switcher from '../components/Switcher/Switcher.components';

const StyledResolveButton = styled.button`
    height:48px;
    width:240px;
`;

const Concalc = () => {
	const switcherValues = ['Runtime', 'Constructor'];

	return (
		<div className={'concalc'}>
			<Switcher values={switcherValues}/>
			<CalcOperations/>
			<CalcDigits/>
			<StyledResolveButton type="button" className="btn btn-light">=</StyledResolveButton>
		</div>
	);
};

export default Concalc;
