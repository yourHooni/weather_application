# 날씨 정보 앱

### 설명
```
 'https://openweathermap.org/api'에 대한 오픈소스 API를 이용하여 도시에 대한 날씨 정보를
 보여주는 웹앱이다.
```

### 환경 구성
```
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.3.0",
    "react-scripts": "5.0.1",
    "recoil": "^0.7.4",
    "recoil-persist": "^4.2.0",
    "styled-components": "^5.3.5",
    "typescript": "^4.7.4"
  }
```

### 실행 방법
```
$ npm install
$ npm run start
```

### 프로젝트 구조
```
|-- react
|   |-- public
|   |-- src
|   |   |-- assets      #  정적 파일 디렉토리 (fonts, images..)
|   |   |-- components  #  컴포넌트 디렉토리
|   |   |   |-- BaseContainer.tsx  # container 컴포넌트
|   |   |   |-- BaseInput.tsx  # input 컴포넌트
|   |   |   |-- SearchFragment.tsx  # 검색 컴포넌트
|   |   |   |-- SuggestionFragment.tsx  # 검색 내용 컴포넌트
|   |   |-- interfaces  #  prop type 디렉토리
|   |   |   |-- city.ts  # city 관련 prop type
|   |   |-- layouts   # layout 디렉토리
|   |   |   |-- PageLayout.tsx    # 기본 페이지 레이아웃
|   |   |-- pages   # page 디렉토리
|   |   |   |-- CityListPage.tsx    # 도시정보 리스트 페이지
|   |   |   |-- WeatherInfoPage.tsx    # 날씨정보 페이지
|   |   |-- services    # service(api) 디렉토리
|   |   |   |-- weather.ts    # weather api
|   |   |-- styles      #  스타일 디렉토리
|   |   |   |-- global-style.ts # global 스타일
```

### 기능
##### 도시 검색
- 도시 조회 페이지
    - 최초 진입시, 검색어가 없을 경우 모든 도시 리스트 제공
    - 검색어 입력시, 해당 검색어가 이름에 포함된 도시 리스트 제공
- 도시 검색바
    - 검색어 입력시, 해당 검색어가 이름에 포함된 도시 리스트 제공
- 도시 조회
    - 검색어에 대해 도시 리스트 제공
    - 첫 조회시 500개씩 제공
    - 스크롤이 하단에 위치할때마다, 500개씩 추가 제공
- 검색
    - 검색바 옆의 검색버튼 클릭시, 도시 리스트 제공

##### 검색 히스토리
- 검색 히스토리
    - 검색바 옆의 검색버튼 클릭시, 검색 히스토리 리스트 제공
    - 도시 검색시, 해당 도시에 대한 검색 히스토리 추가
    - X 버튼 클릭시, 해당 도시에 대한 검색 히스토리 제공
    - persist 제공

##### 날씨
- 날씨
    - 'https://openweathermap.org/api'에서 도시id에 대해 조회된 날씨 정보 제공
    - 날씨 정보가 없을 경우 에러 페이지 제공
- 도시
    - 해당 id에 대한 도시 정보가 없을 경우 에러 페이지 제공
