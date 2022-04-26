import {ReactNode} from 'react';

class DraggableItem {
	item:ReactNode;

	id:string;

	isBlocked:boolean;

	constructor(component:ReactNode, id:string, isBlocked:boolean) {
		this.item = component;
		this.id = id;
		this.isBlocked = isBlocked;
	}

	block() {
		this.isBlocked = true;
	}
}

export default DraggableItem;
