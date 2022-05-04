import styled from 'styled-components';

const Container = styled.button<{width:string}>`
    height:48px;
    width:${props => props.width};
    background: #FFFFFF;
	border: 1px solid #E2E3E5;
	border-radius: 6px;
	user-select: none;
	cursor: pointer;

	&:hover {
		border: 2px solid #5D5FEF;
	}
	&:active {
		background: #5D5FEF;
	}
`;

interface ButtonMainProps {
    text:string,
    width?:string,
    action?:()=>void
}

const ButtonMain = (props:ButtonMainProps) => {
	const {text, width, action} = props;

	const buttonWidth = width || 'auto';

	return (
		<Container width={buttonWidth} onClick={action}>
			{text}
		</Container>

	);
};

export default ButtonMain;

