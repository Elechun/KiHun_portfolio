# KiHun Portfolio

Healthcare AI 연구 포트폴리오 (정적 HTML, 빌드 과정 없음)

## 구성
| 파일 | 역할 |
|---|---|
| `data.js` | **내용은 전부 여기서 수정** (프로필, 학력/학점, 특허, 학회, 논문, 수료증, 스킬) |
| `index.html` | 페이지 뼈대 |
| `style.css` | 디자인 (라이트/다크 모드, 모바일, 인쇄용 스타일) |
| `main.js` | `data.js` 내용을 화면에 그려 주는 스크립트 |
| `assets/` | 특허증·수료증 이미지, 프로필 사진, CV PDF |

## 내용 수정하기
1. `data.js`를 열어 `[예시]`로 표시된 값을 실제 내용으로 바꿉니다.
2. 특허증/수료증 이미지는 `assets/patents/`, `assets/certificates/`에 넣고 `image: "assets/..."`로 경로를 적으면 카드에 **증빙 보기** 버튼이 생깁니다.
3. 수료증 `category` 값이 그대로 필터 탭이 됩니다 (예: `Coursera`, `학교`).
4. 상단 숫자 요약(특허/학회/논문/수료)은 항목 개수로 자동 계산됩니다.

## 로컬에서 보기
`index.html`을 브라우저로 바로 열면 됩니다.

## PDF로 저장
브라우저 인쇄(Ctrl/Cmd + P) → PDF로 저장. 메뉴·버튼은 자동으로 숨겨집니다.

## 배포 (GitHub Pages)
저장소 Settings → Pages → Branch를 `main` / `root`로 지정하면
`https://elechun.github.io/KiHun_portfolio/` 에서 볼 수 있습니다.
