import styled from 'styled-components';

type CalcScreenProps = {
    value:number;
}

const Container = styled.div`
    padding:5px;
    border:2px solid gray;
`;

const CalcScreen = (props:CalcScreenProps) => {
	const {value} = props;
	return (
		<Container>
			<h1>{value}</h1>
		</Container>
	);
};

export default CalcScreen;
