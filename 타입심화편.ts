function first() {
    type A = string | number;
    type B = string;

    type C = string & number; // never 타입이 된다.

    // 좁은 타입에서 넓은타입으로는 들어가지만 넓은타입에서 좁은타입으론 못들어간다.

}

function inObject(){
    // 객체는 상세할수록, 구체적일수록 타입이 좁은것임. 따라서 아래서는 C가 제일 좁은 타입. D가 제일 넓은 타입.
    type A = { name: string };
    type B = { age: number };
    type C = { name: string, age: number }; // = A & B
    type D = A | B;

    // 좁은타입, 넓은타입검사시 남은 속성에 대해서는 잉여속성검사를해서, 리터럴로 바로 넣을 경우 에러가 발생한다.
    // 아래 c 변수에 married 속성을 추가할 경우(객체리터럴) 발생하는 에러가 잉여속성검사시 발생한 것임. >> 변수를 따로빼주면 에러없어짐.
    const ab: D = { name: 'aaa' };
    const c: C = { name: 'aaa', age: 3};
    // const c: C = { name: 'aaa', age: 3, married: false }; // 에러발생

    // 잉여속성검사
    // 객체리터럴을 바로 대입할때 잉여속성검사가 추가로 들어간다.

}

// 함수에서는 무슨 공변성 반공변성 챕터꺼 보래.


// void 타입 : return 값이 없거나 undefined 여야한다. null은안됨.
function aaaaaa(): void {

}
// return 이 void인것, 매개변수가 void 함수가 들어간 것, 객체에 들어간 void매서드. 이렇게 3개?
// 매개변수가 void인 함수도 return값이 존재해도된다. 매서드에도.
// 함수 리턴값이 void인경우에만 리턴이 존재하면 안된다.
// 그 외 2개에는 왜 되냐? 나머지 두개는 리턴값이 있던없던 사용하지 않겠다는 의미임.
// return 이 void인건 return 안한단것
// 그 예제:
// declare 는 함수의 바디를 선언하고싶지 않을때 앞에 붙이고, javascript 로 변환시 사라진다.
// 따라서 타입만 생성하기 가능함.
// 아래 forEach함수로 void 와 undefined 의 차이를 보자.
//declare function forEach(arr: number[], callback: (el: number) => undefined): void;
// 타입스크립트입장에서는 forEach함수가 다른파일에 있는지 알 수 없어서 아래 declare문을 제거하면 밑에 함수호출부분에서 에러나잖아
// 근데 이 함수있어. 라고 보증하기위해 선언만 해두는 용도도 될 수 있다.
declare function forEach(arr: number[], callback: (el: number) => void): void;

let target: number[] = [];
forEach([1,2,3], el => target.push(el)); // push는 리턴값이 number임. 근데 위에 undefined 로 정의해서 에러난다.


// 강제형변환방법에는
// 1. 꺽쇠
const example1 = <number><unknown>a.talk();
// 2. as
const example1 = a.talk() as unknown as number;
// as를 더 권장한다. 왜냐면 react 에서 jsx 에서 꺽쇠 사용하기때문에.

// unknown 이랑 any 의 차이
// 일단 : any 쓸거면 unknow을 써라.
// any는 이제 타입체크 안할거야!! 라고 말한거임.
// unknown은 나중에 말해줄게.
const b: unknown = a.talk();
(b as A).talk();
// 이렇게.

// unknown을 제일 많이 쓰이는경우는 try catch에서 에러잡을때임.
try {

}catch(error) {
    (error as Error).message
}

// 타입가드 기법 : 타입을 구분한다.
function typeCheck(a: number | string) {
  if(typeof a === 'number'){
    a.toFixed(1);
  }

  if(typeof a === 'string') {
    a.charAt(3);
  }
}

// is가 들어가면 커스텀 타입추론 함수임.
interface Cat { meow: number }
interface Dog { bow: number }
function catOrDog(a: Cat | Dog): a is Dog {
  if ((a as Cat).meow) { return false }
  return true;
}
const cat: Cat | Dog = { meow: 3 }
if (catOrDog(cat)) {
    console.log(cat.meow);
}
if ('meow' in cat) {
    console.log(cat.meow);
}

// {}, Object 는 모든타입이다(null과 unknown은 제외). 객체아님.
// 실제 객체는 object. 앞에가 소문자야.
// 보통은 object 지양, interface, type, class 쓰기.

// unknown = {} | null | undefined 로 바뀌었다.

interface A3 {
    readonly a: string,
    b: string
}

const aaa3: A3 = { a: 'hello', b:'world' };
aaa3.a = '123' // 못바꾼다.


// 인덱스드 시그니처 indexed signiture : 모든 값들이 string이었으면 좋겠다.
type B3 = { [key: string]: string };

// mapped types 맵드 타입스. 키로 올 수 있는애들을 줄여놓는다.
type C3 = 'Human' | 'Mammal' | 'Animal'; // interface 는 이렇게 또는(|)을 쓸 수 없다.
type D3 = { [key in C3 ] : number };
const aa3: D3 = { Human: 123, Mammal: 5, Animal: 7 };



// 옵셔널 b,c는 받아도되고 안받아도 된다.
function abc3(a: number, b?: number, c?: number) { }

// 제네릭 : 타입 나중에 정할게요. T = unknown 라고 넣는건 react jsx 와 헷갈려하기때문이다. T, 일케 T뒤에 콤마하나찍어도된대. 근데 오타같아보이기때문에 확실히하기.
function add4<T = unknown extends number | string>(x: T, y: T): T {
    return x + y;
}
