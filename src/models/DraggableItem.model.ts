import {ReactNode} from 'react';

class DraggableItem {
	item:ReactNode;

	id:string;

	isLocked:boolean;

	constructor(component:ReactNode, id:string, isLocked:boolean) {
		this.item = component;
		this.id = id;
		this.isLocked = isLocked;
	}
}

export default DraggableItem;
