## ☀️ MARS 프로젝트 (Management Automated Reporting System)

공사현장에서 사용하는 장비에 gps디바이스를 부착하여 데이터를 수집하여<br/>
장비 실시간 모니터링, 장비를 선제관리 하기 위한 시스템

#### [시연영상 보러가기](https://www.youtube.com/watch?v=pn_MEgDiRi4)

  <br />
  
## ☀️ 개발 인원 및 기간

- 개발기간: 2022/07/18 ~ 2022/08/11 (4주)

- 개발 인원

  - F/E(2명) : 전지현, 김민석
  - B/E(2명) : 정지민, 김지영 ( [백엔드 github 링크](https://github.com/jiminnote/Mars_project) )

<br />

## ☀️ 기술스택

<img src="https://img.shields.io/badge/react-61DAFB?style=flat-square&logo=react&logoColor=white"/> <img src="https://img.shields.io/badge/ReactRouter-CA4245?style=flat-square&logo=ReactRouter&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/>
<img src="https://img.shields.io/badge/MobX-FF9955?style=flat-square&logo=MobX&logoColor=white"/>
<img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=TailwindCSS&logoColor=white"/>

<br />

#### < Communication Tool >

<b> 1. Notion </b>

- 회의록 작성
- F/E 구성원 간의 컨벤션 관리 및 사용법 공유
- F/E, B/E 간의 API 협의 , API문서화

<b> 2. Trello </b> : Sprint 목표와 전반적인 업무 진행을 파악하기 위한 Tool로 Trello를 사용

<b> 3. Slack </b> : 간단한 요청사항이나 일정조율 , API Server 주소 공유를 위해 사용

<br />

## ☀️ 담당 페이지

| 전지현                                                    | 김민석                                         |
| :-------------------------------------------------------- | :--------------------------------------------- |
| **Home** - Equipment, Device를 실시간 모니터링            | **Sign-in**                                    |
| **Equipment Detail** - 장비 상세정보 , 수리 등 이력 관리  | **Nav bar** - Device 이상징후시 알람           |
| **Device Detail** - 디바이스 상세정보 , 수리 등 이력 관리 | **Equipment List** - 장비 항목 검색            |
|                                                           | **Device List** - 디바이스 항목 검색           |
|                                                           | **Mapping** - 장비와 디바이스 매칭             |
|                                                           | **History** - 장비,디바이스의 모든 이력을 조회 |

<br />

## ☀️ 상세 업무

#### 1. 구글지도

- 장비의 위치와 가동상태를 마커로 표시 <br/>
- 공사현장 도면을 배경이미지로 활용

   <br/>

#### 2. CRUD

- GET - 장비, 디바이스 정보 get요청 후 렌더링 <br/>
- PATCH - 장비, 디바이스 정보 수정 <br/>
- POST - 수리,교체 이력 추가 <br/>
- DELETE - 장비와 디바이스 매칭 해지

   <br/>

#### 3. Mobx를 통한 상태관리

- 장비 데이터, 디바이스 데이터를 store로 관리
- 컴포넌트 간 상태 공유를 통해 자동 리렌더링

  <br/>

#### 4. 공통 컴포넌트 구상

- 반복되는 UI는 공통 컴포넌트로 만들어 재활용
