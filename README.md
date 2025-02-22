# 🚨알럿-유(Alert-You)

![Alert-You Logo 256](https://user-images.githubusercontent.com/93081720/202115376-796bca49-0ab7-4814-a631-ab1fea8f64cc.png)

<br>

## 🚀프로젝트 소개

>  #### 원 터치 학생 보호 어플리케이션

학교 폭력 현장을 떠올려보면 피해 학생들은 도움을 요청할 시간이 부족하고, 누구에게 도움을 구할지 고민이 됩니다.

알럿-유는 학교 폭력 신고에 대한 허들을 낮춰, 피해자/목격자가 부담 없이 도움을 요청할 수 있습니다.

### 🤔기획 의도

안심 귀가 서비스는 있는데, 왜 학교 폭력 관련 어플리케이션은 없지?

학교 폭력 사전 교육, 피해자 상담, 가해자 처벌 등 사전/사후 조치 뿐만아니라, 학교 폭력이 발생하고 있는 그 순간에 누군가 도와줄 수는 없을까?




### 🎯서비스 대상

#### 👩‍🎓학생(피해자/목격자)👨‍🎓

학교 폭력 대상자는 원터치 알림 버튼을 통해 피해 사실을 재빨리 신고하고 증거물을 자동 수집할 수 있으며, 목격자는 정확한 신고와 증거자료를 수집할 수 있습니다.

또한 다른 학생의 보디가드가 되어 피해자들을 지켜줄 수 있습니다.


#### 👨‍🏫선생님👩‍🏫

선생님은 보디가드 역할을 할 학생들을 지정하여 함께 학교 폭력을 예방하는데 앞장 섭니다. 또한 증거 자료를 열람하고 다운로드 받을 수 있습니다.



### 📅일정

#### 📌22.10.10 ~ 22.11.18 (6주)
기획 및 설계 : 10.10 ~ 10.21 (2주)
- 기획 : 프로젝트 아이디어 논의, 주제 구체화, 기술 스택 선정
- 설계 : 유저 스토리 및 기능 요구 명세서 작성, ERD, 와이어프레임

개발 : 10.24 ~ 11.09 (2.5주)
- Front : 프로젝트 환경 설정, 페이지 UI 구현, 알림 및 증거자료 수집 등 핵심 기능 구현 
- Back : API 명세서 작성, API 개발 및 수정, 데이터 정제, 배포 및 인프라 구축

테스트 및 배포 : 11.10 ~ 11.18 (1.5주)
- 통합 테스트 및 QA
- 산출물 정리 및 발표

<br>

## 🔍프로젝트 정보

### 🌼산출물

[기능 명세서](./산출물/01_기능명세서.md) | [ERD](./산출물/02_ERD.png) | [API 명세서](./산출물/06_API_명세서.pdf) | [와이어 프레임](./산출물/03_화면_정의서.pdf) | [배포 메뉴얼](./exec/알럿유_배포%20메뉴얼.md) | [실행 메뉴얼](./exec/알럿유_실행%20메뉴얼.md) 

### 🛠기술 스택

![image](https://user-images.githubusercontent.com/93081720/200549588-cc43c57d-d7de-4b2d-8a3c-bda602c25ff2.png)

<br>

## ⭐주요 기능

### ⏰원 터치 알림

- 피해자는 원 터치 알림 버튼을 눌러서 즉시 신고를 할 수 있으며, 신고 즉시 자동으로 녹음이 진행됩니다.

- 목격자의 경우, 원 터치 알림 버튼을 눌러서 상세 신고 내용을 추가적으로 입력할 수 있습니다.

![원 터치 알림](/gifs/1.gif) ![목격자 상세 신고](/gifs/2.gif)

### 📸증거물 자동 수집 및 저장

- 목격자 역시 피해자와 마찬가지로 학교 폭력 현장에 대해 녹음 증거자료를 확보할 수 있으며, 추가적으로 사진으로도 증거물을 촬영해 업로드할 수 있습니다.

![사진촬영](/gifs/3.gif) ![사진 업로드](/gifs/4.gif) ![녹음](/gifs/5.gif) ![녹음2](/gifs/6.gif)

### 🌍신고 내역 조회 및 위치 정보 제공

- 신고 목록에서 3일간의 신고 내역을 조회할 수 있으며, 클릭 시 지도 UI를 통해 신고 위치 및 상세 신고 내역을 확인할 수 있습니다.

![신고 내역 조회](/gifs/7.gif)

### 👨‍🏫학생 관리(보디가드 등록/해제, 학급원 제외)

- 교사 사용자의 경우, 학급원에 대해 보디가드로 임명 또는 해제할 수 있으며, 졸업/전학 등으로 인해 더 이상 학급원이 아닐 경우 학급에서 제외할 수 있습니다.

![보디 가드 등록](/gifs/10.gif) ![보디가드 해제](/gifs/11.gif)![학급원 제외](/gifs/12.gif)

### 🔐증거 자료 조회/다운로드

- 교사 사용자의 경우 개별 학생의 신고 내역과 증거 자료를 조회/다운로드할 수 있습니다.

![증거 자료 조회/다운](/gifs/13.gif)

<br>

## 🤝팀원

### 🙋‍♂️🙋‍♀️구성원 및 담당 역할

#### 🛰BE

| 이름       | 개발 내용                                                    |
| ---------- | ------------------------------------------------------------ |
| [박시원]() | 인증/인가 로직 구현, Reverse GeoCoding API 기능 구현, FCM 알림 기능 구현, 스프링 시큐리티 적용, 학교 데이터 정제 |
| [이현정]() | 신고, 알림 기능 API 구현, 학교 데이터 정제, FCM 알림 기능 구현, Infra, 발표자료 제작 |
| [김애리]() | S3, 증거 자료(사진, 녹음 파일)  기능 API 구현, 교사/학생 API 구현, Infra, 발표자료 제작 |

#### 🌈FE

| 이름       | 개발 내용                                                    |
| ---------- | ------------------------------------------------------------ |
| [박승훈]() | 신고, 증거자료(사진, 녹음 파일)  UI/기능 구현, 앱 디자인     |
| [송상진]() | 상세 신고 내역, 교사/학생 페이지 UI/기능 구현, FCM 알림 기능 구현, UCC 제작 |
| [이원우]() | 로그인/회원가입, 마이페이지 UI/기능 구현, 앱 디자인, 빌드 및 배포 |

### ⚙팀 운영
> 에자일(Agile)하게 일 해보자!

#### 노션
| 데일리 스크럼 | 주간 회고 | 별명 위키                                                                                                           |
|----|-------|-----------------------------------------------------------------------------------------------------------------|
| ![image](https://user-images.githubusercontent.com/93081720/200457143-d1cdc6c2-795b-4304-b320-06bbf4345692.png) | ![image](https://user-images.githubusercontent.com/93081720/200458224-026dea4b-6cc7-4289-bb74-27fdaabe30e0.png) | ![image](https://user-images.githubusercontent.com/93081720/200458331-ceeb76e0-870b-4baa-97f7-54d7edbd1331.png) |

#### 깃과 지라
| 깃                                                                                                                |지라|
|------------------------------------------------------------------------------------------------------------------|---|
| ![image](https://user-images.githubusercontent.com/93081720/200459048-158fd784-0932-4857-a2ba-1813e42c243c.png)  | ![image](https://user-images.githubusercontent.com/93081720/200458554-b5216148-e447-4f7c-8466-a1d14c516dd2.png) |


### ✒프로젝트 회고

#### 🐸박시원

> 어플리케이션 제작의 어려움과 백엔드 기술적 성장에 대한 고민, 프로젝트 관리 방법론
>

프로젝트 기술 스택에서 알 수 있듯이 규모가 큰 프로젝트는 아니었습니다. 처음에는 빠른 1차 개발 후에 2차로 규모를 확장해 나가고자 했으나, 예상치 못한 변수가 너무 많았습니다. 코드를 짜는 코어 업무보다 빌드 에러를 잡는 프론트 팀원들을 보면서 RN으로 어플리케이션을 만들기가 상당히 어렵다는 것을 알게 되었습니다.

백엔드 기술의 적용에 있어서 기본 중에 기본이라고 할 수 있는 인증과 인가 로직을 구현하면서, 많은 것을 배웠습니다. 스프링 시큐리티, 필터 적용 등 평소 해보고 싶었던 파트를 담당해볼 수 있어서 좋았습니다. 아쉬움이 있다면, 웹이 아니라 모바일이어서 토큰을 관리하는 방법에 있어서 적용한 방법이 보안에 있어서 올바른 방법인지 의문이 남습니다. 이번 프로젝트를 통해서 기술적인 성장에 대해 더 많이 고민하고, 어떤 것을 학습해야 할지에 대한 방향성을 고민하는 기회를 가졌습니다.

또한, 지라 사용 등 프로젝트 관리에 대해서도 고민해보는 기회를 가졌습니다. 에자일하게 일하기 위해서 지라를 사용한다고 배웠지만, 실제 사용 경험에서 에자일함을 느끼지 못했습니다. 일정도 자세히 짜지 않았고, 노션 사용 및 정리도 많이 하지 않는 등 프로젝트 관리를 많이 느슨하게 했는데, 굉장히 체계적이고 탄탄하게 관리하는 팀을 보면서 '저렇게 관리를 했어야 했나?'라는 생각이 들면서 팀장 및 팀/프로젝트 관리 역량이 부족하다는 것을 느꼈습니다. 실제 현업에서 프로젝트를 경험해 보았는데도 수준이 이정도라는 것에 많은 반성을 하게 됩니다.

하반기 취업에 성공하지 못했지만, 포기하지 않고 끝까지 계속하다보면 언젠가 목표를 이룰 수 있을 것이라 생각하면서 마무리 하고자 합니다.

다들 화이팅!! 

#### 🐭이현정

>  아쉬움이 많이 남는 프로젝트였습니다.

이번 프로젝트는 아쉬움이 많이 남는 프로젝트였습니다. 원래 목표였던 새로운 기술의 습득 및 꼼꼼한 코드 리뷰를 하기에 개인적인 상황이 여의치 않았기 때문입니다. 이러한 상황에서 좋은 팀원들을 만나 많은 도움을 받아 고맙고 미안하였습니다. 또한, 프로젝트를 진행하면서 꼼꼼한 코드리뷰의 중요성과 의사소통의 중요성을 느낄 수 있었습니다. 지우학 팀원분들 감사했습니다.

#### 🐹김애리

> 여러가지를 활용해보고 겪으면서, 부족하지만 많은 도움을 얻을 수 있었습니다. 

앞에 두 번째 프로젝트를 진행하면서, 사실 어떤 코드가 좋은 코드인지 생각하기보다는 그냥 알맞은 데이터를 주는 것에 조금 더 집중했었습니다. 이번 자율 프로젝트를 진행하면서는 ‘이 부분에서 쓰이는 것이 맞을까?’ 하는 고민을 했던 것 같습니다. 또한 테스트코드나 S3등 기존에 해본 적 없는 것들을 사용해보며 실력적으로도, 정신적으로도 한차례 성장할 수 있던 프로젝트 였습니다.

여러가지를 활용해보고 겪으면서, 부족하지만 많은 도움을 얻을 수 있었습니다. 팀원들 덕분에 재미있게 프로젝트 진행할 수 있었습니다. 감사합니다!

#### 🐻박승훈

> 새로운 위치에서 많은 도전들을 해보았던 경험이었습니다.

React 학습과 실습을 목표로 시작했던 프로젝트였지만 프로젝트 아이템 특성상 어플리케이션이 방향에 일치해 React-native를 사용했습니다. 리액트 활용 자체에도 익숙치 않았고 recoil, react query 등 다양한 라이브러리를 겸해서 사용해야했기 때문에 걱정이 앞섰지만, 열심히 학습하고 부딪히면서 적응할 수 있었습니다.

의외로 난관이었던 것은 3rd party 라이브러리들이었습니다. 저는 홈 화면과 홈 화면의 기능들, 녹취나 카메라 촬영, 갤러리 접근과 위치 정보 등 모바일 기기의 특징을 활용하는 기능 개발을 맡았는데, 이 각각이 정식 React-native에서 지원하는 것이 아니라 npm community에 있는 라이브러리를 활용해야만 가능한 것들이었습니다. 그러다보니 각 라이브러리마다 환경 설정에 애를 먹었고, 버전 문제로 충돌하거나 공식문서의 설치 가이드가 잘못 되어서 헤매는 등 개발 외적으로 어려움을 많이 겪었습니다.

하지만 이내 잘 적응하고 개발적인 차원에서도 유의미한 성장을 이뤄낼 수 있었습니다. natice-base 프레임워크에 의존했던 개발 초기와 달리 stylesheet를 활용한 non-framework 개발까지 가능하게 되었습니다. native-base가 다양한 컴포넌트를 지원하지만 디자인 유틸 요소까지 tsx에서 표시하기에 tsx를 더럽게 한다는 점에서 아쉬웠는데, 이후에는 stylesheet를 혼용해 깔끔한 tsx를 유지할 수 있게 되었습니다.

또다른 어려움은 디자인이었습니다. 모던하면서도 눈이 띄는 디자인, 그리고 디자인에서 그치지 않고 UX를 고려한 디자인을 만들어내기 위해 노력을 많이 했는데, 과연 프로젝트들을 거치면서 나의 디자인 능력이 많이 발전했는가에 대한 고찰을 해보았습니다. 다른 동기들의 산출물은 대단할 정도로 높은 퀄리티를 자랑하는 경우도 있는데 나는 왜 이런가 하는 자기 반성을 해보기도 했고, 이것이 자극이 되어 디자인 개선에 시간을 할애하기도 했습니다. 다행히 점차 만족스러운 디자인으로 개선이 되었고, 확실히 미적으로 발전한 서비스를 개발할 수 있게 되어 기쁘게 생각합니다.

새로운 점은 이번 프로젝트는 지금까지 팀장으로서 프로젝트를 이끌었던 이전 프로젝트들과 달리 팀원으로서 임했던 프로젝트였습니다. 경험 많고 리더십 좋은 큰 형님이 기대처럼 프로젝트를 잘 이끌어주셔서 원활하게 팀으로서 잘 운영이 되었다고 느꼈습니다. 팀원으로서 잘하는 리더의 밑에서 팔로워로서 활동하며 리더의 자질과 역량에 대해 생각해볼 수 있는 좋은 기회였고, 솔선수범하며 팀원들을 이끌어주신 박시원 팀장님에게 감사의 인사를 드리고 싶습니다.

그리고 다른 팀원들 모두 견줄 데 없이 자신의 영역에서 남들보다 먼저 나서서 일하는 열정적인 팀원들이었습니다. 멋진 팀원들과 함께여서 영광이었습니다.

#### 🐺송상진

> 마지막이라 아쉽지만, 앞으로 프로젝트들을 진행할 때 큰 도움이 될 수 있을 기간이었습니다.

프로젝트를 하면서 가장 많이 느꼈던 점은, 새로운 기술을 시도하는 것은 역시 쉽지 않다는 것이었습니다. 프로젝트 주제에 맞는 기술을 선정할 때 역시 충분히 그 기술에 대해 알아보고, 우리 프로젝트에 잘 맞는 기술인지 아닌지를 심사숙고해야한다는 점을 깨달았습니다. 또한, 트러블슈팅 내용을 잘 정리해놔야 다음에 비슷한 문제로 시간을 허비하지 않을 수 있다는 것도 많이 느꼈습니다. 부족한점이 많았지만 열심히 주변에서 도와준 팀원들 너무 감사합니다! 

#### 🦙이원우

> 팀원들과 더 소통을 매끄럽게 할 수 있어서 좋았던 프로젝트

프로젝트 주제가 좋았고, 오프라인 교육을 통해 팀원들과 더 소통을 매끄럽게 할 수 있어서 좋았던 프로젝트였습니다. React Native 빌드 문제가 힘들게했지만 모두 함께 노력한 결과 프로젝트를 성공적으로 마칠 수 있어 감사했습니다.
