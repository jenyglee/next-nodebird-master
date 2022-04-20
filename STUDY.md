## 패키지 설치할 때 팁

.eslintrc : json이며, eslint의 규칙을 관리하는 세팅파일이며 세팅할수 있는 것이 무궁무진해서 따로 공부해야한다.
-D : 개발용으로만 쓰겠다는 표시

```
 npm i eslint -D
```

# NEXT JS의 다양한 기능 정리

## next js에서 제공하는 유용한 태그

Head : HTML에서 Head 안에서 title, meta charSet 등 지정하는 것처럼 이 안에 지정해줄 수 있다.

```
import Head from "next/head"
```

## \_app.js

페이지들의 공통적인 것들을 처리할 수 있는 컴포넌트 파일이다.

## next에서 웹팩으로 import

next 안에는 기본적으로 웹팩이 들어가 있다.
import는 자바스크립트만 할수 있기 때문에 css는 할 수가 없는데
웹팩이 css를 보면 그것을 스타일태그로 바꿔서 html에 넣어준다.
그렇게 antd의 스타일링을 불러올 수 있는데, next에서는 전역에 스타일링을 다 줄 수 있도록 '\_app.js' 파일에서 불러와주면 된다.

```
(_app.js)
import "antd/dist/antd.css"
```

## PropTypes 정리

node : 화면에 그릴 수 있는 모든 것들 (return 안에 들어갈 수 있는 모든 것들)
element : element에서 props로 전달하기 전에 이미 태그로 만들어둔 상태.

```
<Header props={<Logo />}>
```

elementType : element에서 props로 전달할 때 import한 컴포넌트 이름만 그대로 집어넣을 때 사용한다.

```
import Logo from "components/logo"
<Header props={Logo}>
```

### proptypes의 다양한 사용처 예시

```
AppLayout.proptypes = {
    children : Proptypes.node.isRequire
    Component: PropTypes.element
    Component: PropTypes.elementType
}
```

## 컴포넌트에 스타일을 줄 때

### 이렇게 하지말자

```
<div style={{ marginTop : 10 }}>틀린 스타일</div>
```

위 방식으로 하면 최적화가 되지 않은 상태이다.

```
{} === {}
// false
```

위 처럼 같은 형태의 객체도 실제로 비교해보면 같지 않다고 뜨기 때문이다.
결국 객체로 되어있는 style은 안에 있는 css 값이 같다 하더라도 리렌더링 시 다르다고 판단하여 계속 리렌더링을 하게 되고 이것은 쓸데없는 성능 손실을 보게된다.

## useCallback 과 useMemo 사용하기

### useCallback은 컴포넌트에 쓰이는 함수에 씌운다.

```
const func = useCallback(()=>{ ... }, [] )

const Comp = ()=>{
    return (
        <Button onClick={func}>
            다음
        </Button>
    )
}
```

### useMemo는 값에다 씌운다.

```
const style = useMemo(()=>{ marginTop : 10 }, [])

const Comp = ()=>{
    return (
        <Button style={style}>
            다음
        </Button>
    )
}
```

## 신기한 antd 문법

1. 배열 안에 JSX를 쓸 때는 태그 안에 'key'를 꼭 넣어줘야 한다.

```
<Card actions={[
    <div key="twit">짹짹 0</div>,
    <div key="followings">팔로워 0</div>,
    <div key="twit">짹짹 0</div>,
]}>
```

2. antd에서 Row, Col 컴포넌트 사용시 쓰는 레이아웃 축약어는 아래와 같으며, 화면을 24분할 하는 것으로 기준을 잡아, 내가 그 중 컨텐츠영역으로 몇 컬럼을 정할건지 입력하여 쓸 수 있다.

-   xs : 모바일(screen < 576px)
-   sm : 태블릿(screen ≥ 576px)
-   md : 작은 데스크탑(screen ≥ 768px)
-   lg : 데스크탑(screen ≥ 992px)
-   xl : 큰 데스크탑(screen ≥ 1200px)
-   xxl : 매우 큰 데스크탑(screen ≥ 1600px)
-   gutter : 컬럼 사이의 간격

3.  Form 태그로 폼 만들 땐 마지막 버튼 태그에 htmlType='submit'을 붙여줘야 form이 제출되는데, 이때 onFinish가 호출된다. 여기에 기능을 입력할 수 있다.

## 코딩꿀팁

1. a 태그에서 target='\_blank' 속성을 써줬다면 반드시 뒤에 rel='noreferrer noopener' 를 넣어줘야 한다. 이건 하나의 보안장치로서, 새 창을 열었을 때 'referrer'와 'opener'라는 값이 생기는데, 이걸 차단해주는 역할을 한다.

2. css 지식

-   'verticalAlign' : 수직 정렬을 선택하는 것으로, inline과 table-cell에서 쓰인다.

3. 커스텀 훅
   반복되는 기능을 하나의 훅으로 만든다. 많은 연습이 필요하다.

```
(☑️반복되는 기능)
const [id, setId] = useState('')
const onChangeId=(e)=>{
    setId(e.target.value)
}
(✅커스텀 훅 전환)
export default (initialValue = null)=>{
const [value, setValue] = useState(initialValue)
const handler = (e) => {
    setValue(e.target.value)
}
return [value, handler]
}

```

## 리덕스 사용해보자(feat. next-redux-wrapper)

1. store 폴더를 만들고 그안에 configureStore.js를 만든다.
2. 'next-redux-wrapper', 'redux' 를 설치한다.
3. configureStore.js 안에 기본 틀을 만들어준다.

```
(store 기본 틀)
import { createWrapper } from "next-redux-wrapper"
const configureStore = ()=>{}
const wrapper = createWrapper(configureStore)
export default wrapper;
```

4. \_app.js에서 export 하는 컴포넌트를 wrapper.withRedux() 👈 이걸로 감싸준다.
5. 기본 틀로 돌아가서 configureStore 안에 기본 리덕스의 설정들을 넣어준다.

```
import { createStore } from 'redux';
const configureStore = ()=>{
    const store = createStore(reducer);
    return store;
}
```

### 기능정리

-   createWrapper : 스토어를 감싸주는 역할, 2번째 props에 옵션객체가 들어간다.
-   debug 옵션 : 이 부분이 true면 개발할 때 리덕스에 관해서 더 자세한 설명이 나온다. 개발할때는 true로 맞춰주자.

```
createWrapper(configureStore, {debug: process.env.NODE_ENV === "development"})
```

### NEXT 에서 리덕스 사용할 때 차이점!

1. 일반 프로젝트에서 리덕스를 사용하면 맨 상위 컴포넌트(ex. App)에 `<Provider store={store}>` 로 감싸주곤 한다. 하지만 next redux가 6버전 이후부터 알아서 Provider로 감싸주기 시작해서, 따로 넣어주지 않도록 변경됐다.
