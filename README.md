## 시현 영상

👉 [보러가기]()
<br />

## ☀️ PROJECT MARS란?

- 다양한 디바이스에서 수집되는 정보를 하나의 데이터 Pipeline에서 수집합니다
- 이상 징후 탐지, 고장 및 예방 정비 예측 등이 가능한 플랫폼 개발

## ☀️ PROJECT MARS 핵심 기능

- 다양한 디바이스의 정보 수집
- 수집 정보의 가공 및 메타 데이터 추가
- 수집 데이터 분석
- 분석 결과를 통한 예측 및 장애 방지
  <br />

## ☀️ 개발 내용

- Equiment 모니터링
  - 중장비, 운송 장비 등 Equipment 상태 모니터링
- Device 모니터링
  - Equipment 데이터 수신용 Device 상태 모니터링
- Equipment, Device 관리
  - Equipment, Device 매칭
  - 각종 장비 수리이력 관리

## ☀️ 개발 인원 및 기간

- 개발기간: 2022/07/18 ~ 2022/08/11

- 개발 인원

  - F/E(2명) : 전지현, 김민석
  - B/E(2명) : 정지민, 김지영

- 담당 파트

  - 전지현
    - Monitoring(Home) : Equipment, Device를 모니터링을 할 수 있습니다
      ✏︎ Equipment의 현재 위치 모니터링
      ✏︎ Device의 이상징후, 고장 및 정비에 대한 통계
      ✏︎ 현장의 날씨 확인
    - Management(Detail) : Equipment Controller가 Equipment, Device를 관리할 수 있습니다
      ✏︎ Equipment, Device에 대한 전반적인 관리
      ✏︎ 수리, 교체, 설치 이력 관리
  - 김민석
    - Sign-in
    - Navigation(Nav) : Equipment Controller가 담당 Device의 이상징후에 대한 알람을 받을 수 있도록 관리합니다.
    - Search(List) : Equipment, Device에 대한 메타 데이터를 조회할 수 있습니다.
    - Mapping : Equipment와 Device를 Matching 하는 페이지 입니다.
      ✏︎ Equipment와 Device를 Matching
      ✏︎ Equipment, Device의 초기 정보 등록
    - History(List) : Equipment, Device의 모든 이력을 조회할 수 있습니다.

- [백엔드 github 링크](https://github.com/jiminnote/Mars_project)

<br />

## ☀️ 기술스택

<img src="https://img.shields.io/badge/react-61DAFB?style=flat-square&logo=react&logoColor=white"/><img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/><img src="https://img.shields.io/badge/MobX-FF9955?style=flat-square&logo=MobX&logoColor=white"/><img src="https://img.shields.io/badge/ReactRouter-CA4245?style=flat-square&logo=ReactRouter&logoColor=white"/><img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=TailwindCSS&logoColor=white"/>

<br />

## ☀️ Communication

1. Git / Github

- 브랜치 이름 : 페이지 단위로 분할 및 feature/release/hotfix로 구분
- 라벨 활용 : 이슈 , 진행상황 등을 구분하기 위해서 라벨 사용

2. Trello

<img src=""/>

Sprint 목표와 전반적인 업무 진행을 파악하기 위한 Tool로 Trello를 사용했습니다.

- Backlog : 프로젝트 미팅을 하며 전체 업무를 기능별로 세분화하여 전체 티켓을 발행했습니다.
- This Sprint : 일주일을 기준으로 진행해야 할 업무 티켓을 가리킵니다.
- In progress : 현재 개발 중인 업무 티켓을 가리킵니다.
- Discussion : 추가 기능 구현을 제외한 필수 기능을 구현한 티켓을 가리킵니다.
- Done : merge가 완료되고 정상적으로 작동하는 기능을 가리킵니다.
