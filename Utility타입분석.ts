// 타입에 중복되는게 싫을 때

interface Profile {
    name: string,
    age: number,
    married: boolean,
}

//Partial 기능의 타입 타이핑
type P<T> = {
    // [key: string]: string,// 인덱스 시그니처
    [Key in keyof T]?: T[Key];// 맵드 타입스. 프로필의 키를 다 꺼내서 물음표로 만든 것의 값의 타입은 프로필의 키의 타입으로 바꾼다는 의미.
}

// 필수값이었던 Profile 의 속성을 옵셔널로 만들어준다.
// partial이 좋은건 아님. 잘 사용되지 않음.
// pick 또는 omit 을 사용한다.
const newPerson: Partial<Profile> = {
    name: 'hj',
    age: 27
}

// pick의 타입 직접써보기
// 제네릭의 제한조건먼저 붙여주자. (extends 말하는것임.)
type P2<T, S extends keyof T> = {
    [Key in S]: T[Key];
}

// pick
const newPerson2: Pick<Profile, 'name' | 'age'> = { // name과 age만 가져온다.
    name: 'hj',
    age: 27
}

// exclude를 알아야한다.
type E = Exclude<keyof Profile, 'married'>
type Animal3 = 'Cat' | 'Dog' | 'Human';
type Mammal3 = Exclude<Animal, 'Human'>;

// Omit의 type 직접 작성해보기.
type O<T, S extends keyof any> = Pick<T, Exclude<keyof T, S>>

//omit
const newPerson3: Omit<Profile, 'married'> = { // married만 빼고 가져온다.
    name: 'hj',
    age: 27
}

// ? 는 옵셔널. -? 는 modifier. 옵션을 없애는 것임. +? 는 ? 랑 같다.
// readonly도 -readonly 가능하다.
// 남이 만들어놓은 interface 혹은 type을 extends 할 때....필요할수도있다.

// record는.. interface 를 간단하게 만든 것임.
interface Obj {
    [key: string]: number;
}
// 위으 Obj 를 record로 표현하면 아래와 같다.
const aaaaaa2: Record<string, number> = { a: 3, b: 5};

// Record의 타입은
type R<T extends keyof any, S> = {
    [Key in T]: S;
}
// 객체의 키는 string, number, symbol만 올 수 있다. 그래서 keyof any를 extends한 것.


// nonnullable : null, undefined 빼고 가져온다.
type AAA3 = string | null | undefined | boolean;
type AAA4 = NonNullable<AAA3>;

// nonNullable의 타입
type N<T> = T extends null | undefined ? never : T;


function zip(x: number, y: string, z: boolean): {x: number, y: string, z: boolean}{
    return { x, y, z };
}



// Parameters의 타입
// infer는 extends에서만 사용 가능함. infer = 추론하다.
// 함수 제한하는것 = <T extends (...args: any) => any>
type P3<T extends (...args: any) => any> = T extends (...args: infer A) => any ? A : never;
// T는 무조건 함수여야한다.   

// 리턴타입 가져오기
type P4<T extends (...args: any) => any> = T extends (...args: any) => infer A ? A : never;
type Returns = P4<typeof zip>;
type Second = Returns['x'];
type Second2 = ReturnType<typeof zip>;

// 파라미터 가져오기
type Params = P3<typeof zip>;
type First = Params[0];


// constuctorParameters, instanceType 타입

                          
