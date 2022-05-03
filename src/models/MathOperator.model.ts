class MathOperator {
	symbol:string;

	fn:(a:number, b:number)=>number;

	constructor(symbol:string, fn:(a:number, b:number)=>number) {
		this.symbol = symbol;
		this.fn = fn;
	}
}

export default MathOperator;
