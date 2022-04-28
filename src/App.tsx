import {useSelector} from 'react-redux';
import Concalc from './containers/Concalc.container';

const App = () => {
	const store = useSelector(store => store);
	console.log(store);
	return 	(
		<Concalc/>
	);
};

export default App;
