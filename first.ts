// 자바스크립트의 변수, 매개변수, 리턴값에 타입을 붙이면 타입스크립트!
// 타입은 소문자로
let a: string = 'hello';
const b: number = 5;
const c: boolean = true;
const d: undefined = undefined;
const e: null = null;
const f: symbol = Symbol.for('abc');
const g: bigint = 10000000n;

let h: any = '123';
h = true;
