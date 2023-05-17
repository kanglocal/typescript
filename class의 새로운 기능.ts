// 클래스원래의 형태
class A4 {
    a: string;
    b: number;
    constructor(a: string, b: number = 123){
        this.a = '123';
        this.b = 123;
    }

    method(){
    }
}

const a4 = new A4('123');// A4의 기본값이 있기에 인수 하나만 넣어도 된다.
// class의 이름은 그대로 타입이 될 수 있는데, 이 이름은 클래스 자체를 가리키는게아니라, new 클래스임.
// 클래스 자체를 가리키려면 아래와 같이한다.
const b4: typeof A4 = A4;

// constructor 생략
class Aa4 {
    a: string = '123';
    b: number = 123;

    method(){
    }
}

// private 이 추가되었다.
class AA4 {
    private a: string = '123'; // typescript 에서 제공하는 private. 얘를 추천. 왜냐면 protected 쓸 수 있음.
    // public이 기본.
    // protected는 밖에선 못쓰고 상속받은곳에서는 쓸수있다.
    

    #b: number = 123; // javascript에서 제공하는 private.
}
// 인터페이스는 자바스크립트로바꿨을때 사라지기때문에 class쓰는게 좋다.
// 사라져도되고 추상에 의존하고싶다면  interface 쓰면된다.
// 근데 클래스도 abstract class 를 만들 수 있다. 그래서 선생님은 class만 쓴대.
