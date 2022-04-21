import {useState} from 'react';
import styled from 'styled-components';

interface SwitcherProps {
    values:string[]
}

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

const Switcher = (props:SwitcherProps) => {
	const {values} = props;

	const [activeOption, setActiveOption] = useState(0);

	const handleOptionClick = (i:number) => {
		setActiveOption(i);
	};

	return (
		<StyledSwitcher>
			{values.map((u, i) => <StyledOption key={u + i} active={activeOption === i} value={i} onClick={() => handleOptionClick(i)}>{u}</StyledOption>)}
		</StyledSwitcher>
	);
};

export default Switcher;
