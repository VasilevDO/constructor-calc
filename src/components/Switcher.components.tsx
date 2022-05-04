import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import {RootState} from '../redux/store';
import {SWITCHER_VALUE_CHANGE} from '../redux/switcher/switcher.type';

const StyledSwitcher = styled.div`
    display: inline-flex;
	justify-content:center;
    border-radius: 6px;
    background-color:#F3F4F6;
    padding:1px;
`;

const StyledOption = styled.button<{active?:boolean}>`
    border-radius:5px;
    border: ${props => props.active ? '1px solid #E2E3E5' : 'none'};
    background-color:${props => props.active ? '#FFFFFF' : 'none'};
    transition: transform 1s;
    padding:8px 12px;
    `;

const Switcher = () => {
	const state = useSelector((state:RootState) => state.switcher);
	const dispatch = useDispatch();

	const {values, currentValue} = state;

	const handleSwitcherClick = (i:number) => {
		const newValue = values[i];
		dispatch({type: SWITCHER_VALUE_CHANGE, payload: newValue});
	};

	return (
		<StyledSwitcher>
			{values.map((u, i) => <StyledOption key={u + i} active={u === currentValue} value={i} onClick={() => handleSwitcherClick(i)}><span>{u}</span></StyledOption>)}
		</StyledSwitcher>
	);
};

export default Switcher;
