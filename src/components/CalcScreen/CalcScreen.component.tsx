interface CalcScreenProps {
    value:number
}

const CalcScreen = (props:CalcScreenProps) => {
	const {value} = props;
	return (
		<div>
			<h1>{value}</h1>
		</div>
	);
};

export default CalcScreen;
