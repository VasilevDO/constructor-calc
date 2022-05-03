import styled from 'styled-components';

type CalcScreenProps = {
    value:string;
	disabled?:boolean
}

const Container = styled.div<{disabled?:boolean}>`
	width: 240px;
	height: 60px;
    padding:4px;
	background-color: #CEF9F2;
	background: #FFFFFF;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1);
	border-radius: 4px;
`;

const InnerContainer = styled.div`
	height:100%;
	width:100%;
	display:flex;
	justify-content:flex-end;
	align-items:center;
	background: #F3F4F6;
	border-radius: 6px;
	padding: 4px 8px;

	> p {
		font-weight:800;
		font-size:36px;
		margin:0;
		line-height: 44px;
	}
`;

const CalcScreen = (props:CalcScreenProps) => {
	const {value, disabled = false} = props;
	const placeholder = '0';
	const valueToRender = disabled ? placeholder : String(value).split('.').join(',');
	return (
		<Container disabled={disabled}>
			<InnerContainer>
				<p>{valueToRender}</p>
			</InnerContainer>
		</Container>
	);
};

export default CalcScreen;
