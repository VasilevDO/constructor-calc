type initType = {
	tasks: {
		[key:string]: {
			id:string,
			content:string
		}
	},
	columns: {
		[key:string]:{
			id:string,
			title:string,
			taskIds:string[]
		}
	},
	columnOrder:string[]
}

const initialData:initType = {
	tasks: {
		'task-1': {id: 'task-1', content: 'Take out the 1'},
		'task-2': {id: 'task-2', content: 'Take out the 2'},
		'task-3': {id: 'task-3', content: 'Take out the 3'},
		'task-4': {id: 'task-4', content: 'Take out the 4'},
	},
	columns: {
		'column-1': {
			id: 'column-1',
			title: 'Title',
			taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
		},
		'column-2': {
			id: 'column-2',
			title: 'Title',
			taskIds: [],
		},
		'column-3': {
			id: 'column-3',
			title: 'Title',
			taskIds: [],
		},
	},
	columnOrder: ['column-1', 'column-2', 'column-3'],
};

export default initialData;
