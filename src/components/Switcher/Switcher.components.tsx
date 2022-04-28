import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import {RootState} from '../../redux/store';
import {SWITCHER_VALUE_CHANGE} from '../../redux/switcher/switcher.type';

const StyledSwitcher = styled.div`
    display:inline-flex;
    background-color:lightgray;
    border-radius:5px;
    padding:5px 10px;
    > *:not(:first-child) {
        margin-left:10px;
    }
`;

const StyledOption = styled.button<{active?:boolean}>`
    font-size:24px;
    border:none;
    box-shadow: ${props => props.active ? '0px 0px 3px 2px rgba(34, 60, 80, 0.2)' : 'none'};
    border-radius:5px;
    background-color:${props => props.active ? 'white' : 'none'};
    transition: transform 1s;
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
			{values.map((u, i) => <StyledOption key={u + i} active={u === currentValue} value={i} onClick={() => handleSwitcherClick(i)}>{u}</StyledOption>)}
		</StyledSwitcher>
	);
};

export default Switcher;
