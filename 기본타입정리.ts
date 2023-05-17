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

// 타입에 원시값을 넣을 수 있음. 예를들어 const로 선언된 바뀌지않는 값에 사용된다.
const i: true = true;
const j: 6 = 6;

// 타입을 붙여주는 행위 = 타이핑
// 함수
function add(x: number, y: number):number {
    return x + y;
}

// 화살표함수. 아래의 Add타입을 인라인으로 넣은것. 세번째 number 가 리턴값임.
const add2: (x: number, y: number) => number = (x, y) => x + y;

// 타입 Alias
type Add = (x: number, y: number) => number;

// 타입 Alias를 넣은 함수 add3
const add3: Add = (x, y) => x + y;

// 인터페이스로 타입 선언
interface Add4 {
    (x: number, y: number): number;
}

// 인터페이스로 선언된 타입을 리턴하는 함수
const add5: Add4 = (x, y) => x + y;

// 객체
const obj: { lat: number, lon: number } = { lat: 37.5, lon: 127.5};

// 배열
const arr: string[] = ['123', '456'];
const arr2: number[] = [123,456];

// 튜플(길이가 고정된 배열)
const arr4: [number, number, string] = [123,456,'hello'];

// 배열인데 제네릭으로
const arr3: Array<number> = [123,456];


// 타입추론을 활용하되 any라고 추론하는애들만 타입을 정확히 써준다.

//선언따로, 내용따로할 수 있음.
function add6(x: number, y: number) : number;
function add6(x: number, y: number){
    return x + y;
}

// 앞의 타입을 강제로 바꿀 수 있다.
let aa = 123;
aa = 'hello' as unknown as number;

// never 타입
// 빈배열 조심하기. 빈배열이 never로된다는데..any인데?
const array:string[] = [];

// 또는 = |

// "헤드가 null일리없다. 무조건 존재한다! null이나 Element가 아니라 무조건 Element 다!!" 하면 느낌표를 붙인다. 하지만 사용비추.
const head = document.querySelector('#head')!;

// string이랑 String이랑 다르니까 소문자사용하기. 
// String은 new String(); 할때 사용한다.
const aaa: string = 'hello';
const bbb: String = 'hell';

// 최근 추가된 기능 : 자동완성얘기인가? 아니면 백틱에 저 변수쓸수있는거?
type World = "world" | "hell";
const aaaa:World = 'world';
// 타입에서도 백틱에 일케 쓸 수 있다.
type Greeting = `hello ${World}`;

// 배열에서...
let arrr2: string[] = [];
let arrr3: Array<string> = [];
function rest(a:string, ...args: string[]){ 
    console.log(a, args);
}
rest('1','2','3')

// 튜플
const tuple: [string, number] = ['1', 1];
//tuple[2] = 'hello'; // 얘는 에러인거 잡아주는데
// 아래 코드는 에러안잡아준다. 이거하면안돼. 튜플은 사이즈가 정해져있으니까.
// tuple.push('hello');


// enum: 여러변수들을 하나의 그룹으로 묶고싶을 때 사용한다. 객체를 사용해도된다. 자바스크립트로 변환시 사라진다.
const enum Edirection {
    Up = 3,
    Down = 4,
    Left = 5,
    Right,
}

const aaaaa = Edirection.Up;
const aaaaa2 = Edirection.Right;
console.log(aaaaa2);

// enum 말고 객체 : 자바스크립트에 남아있다.
const ODirection = {
    Up: 0,
    Down: 1,
    Left: 2,
    Right: 3
} as const;
// as const 를 붙이면 타입이 원시타입으로 잘 들어간다. 그리고 바꾸지못한다는 의미로 readonly 가 붙는다.
const ab1 = Edirection.Up;

// Enum 사용 예시
function walk(dir: Edirection) {}


// Enum안쓰면? 아래와같이 쓴다.
type Direction = typeof ODirection[keyof typeof ODirection];
function run(dir: Direction){}

walk(Edirection.Left);
walk(Edirection.Right);



// type, interface 비교
// 간단하게 하고싶으면 type, 상속받고, 객체지향할거면 interface 사용할 것.
type A = { a: string }; // A라는 타입을 선언했다.
const abc: A = { a: 'hello' }; // A타입의 객체를 만들었다.
const abc2: { a: string } = { a: 'hello' }; // 타입앨리어스 쓰지않을경우, 직접 적은 것. 변수 abc 와 bcd 는 같은의미.

interface B { a: string }//인터페이스 사용한 것.
const bcd: B = { a: 'hello' };


// union(|),intersection(&)
// function addA(x: string | number, y: string | number): string | number { return x + y }; // 이거 안됨. 왜냐면 .. 암튼안돼
// addA(1, 2);
// addA('1', '2');
// addA(1, '2');

type AA = string & number;
const aaba: AA = 1;

type AAb = { hello: 'world' } & {zero: 'cho'};
// type AAb = { hello: 'world' } | {zero: 'cho'}; // 요런거도 된다.
const aabc: AAb = { hello: 'world', zero: 'cho'};


type Animal = { breath: true };
type Mammal = Animal & { breed: true };
type Human = Mammal & { think: true };

interface Animal2 {
    breath: true;
}

interface Mammel2 extends Animal2 {
    breed: true;
}

// interface 는 같은이름으로 여러번 선언 가능. 선언할때마다 합쳐진다.
// 라이브러리들은 확장성이있기에 인터페이스로 되어있음.
// 그래서 우리가 직접 뭐 추가할수도 있어.
interface TestA {

}

interface TestA {

}

// 변수 네이밍 룰
// 인터페이스는 I, 타입은 T, 이넘은 E 붙이는 방법도있고
// 요즘 국룰은 안붙인다.
// 왜 안붙이냐면 어차피 에디터가 잘 알려주니까.

// 객체 vs 인터페이스면 인터페이스 많이 쓴다. 확장용이하기때문.
