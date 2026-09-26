/*
 * 포트폴리오 내용은 전부 이 파일에서 수정합니다.
 * [예시] 라고 표시된 값들을 실제 내용으로 바꿔 주세요.
 *
 * - 모든 기록은 date: "YYYY.MM" 을 기준으로 연도별 페이지에 자동 배치됩니다.
 * - 아직 안 한 일(응시 예정 등)은 planned: true 로 두면 "Planned" 표시가 붙습니다.
 * - 이미지(특허증, 자격증, 수료증)는 assets/ 폴더에 넣고 image 에 경로를 적으면 "Certificate" 같은 보기 버튼이 생깁니다.
 * - 항목 추가는 { ... } 블록을 복사해서 배열에 붙여 넣으면 됩니다.
 */
window.PORTFOLIO = {
  profile: {
    name: "KiHun",
    nameKo: "전기헌",
    authorName: "Ki Hun Jun", // 논문 저자 목록에서 굵게 표시할 이름
    // 히어로에서 타이핑되며 번갈아 나오는 직함
    roles: ["Healthcare AI Researcher", "Biosignal Engineer", "Medical Imaging Enthusiast"],
    // highlight 부분에 손으로 그린 동그라미가 쳐집니다
    headline: { before: "의료 데이터로 ", highlight: "임상 현장", after: "의 문제를 푸는 AI를 만듭니다" },
    intro:
      "[예시] 생체신호·의료영상 기반 딥러닝 모델을 개발하고, 이를 실제 임상 의사결정에 쓸 수 있는 형태로 만드는 데 관심이 있습니다. 연구 결과를 특허와 학회 발표로 이어 왔고, 현재 저널 투고를 준비하고 있습니다.",
    photo: "assets/profile.jpg",          // About 카드의 증명사진 (3:4)
    avatar: "",                           // 첫 화면 동그라미 사진 (비워 두면 동그라미 없이 표시)
    location: "Seoul, Korea",
    links: {
      // 메일 여러 개 가능. 첫 번째가 강조 버튼이 됩니다.
      emails: [
        { label: "Gmail", address: "kingworm40@gmail.com" },
        { label: "Naver", address: "never_read@naver.com" }
      ],
      phone: "", // 공개 사이트라 비워 두는 걸 권장 (이력서 PDF에만 적기)
      github: "https://github.com/Elechun",
      linkedin: "",
      scholar: "",
      cv: "" // 예: "assets/CV.pdf"
    }
  },

  interests: [
    "Medical Imaging",
    "Biosignal Analysis",
    "Clinical Decision Support",
    "Explainable AI",
    "Multimodal Learning"
  ],

  // 학력: 최신 학위부터 위에 적습니다.
  // gpa / majorGpa 는 숫자로 적으면(예: 4.12) "GPA 4.12 / 4.5" 처럼 한 줄 정보로 나오고, null 이면 표시되지 않습니다.
  // gpaMax 는 만점 기준 (4.5 또는 4.3). 비어 있는 칸("")은 사이트에서 자동으로 빠집니다.
  education: [
    {
      degree: "M.S.",                 // B.S. / M.S. / Ph.D.
      status: "Current",              // Current / Graduated / Expected
      school: "광운대학교",
      schoolEn: "Kwangwoon University", // 영문 학교명 (두 번째 줄에 작게 표시)
      major: "컴퓨터공학과",
      majorEn: "",                    // 영문 학과명 (선택)
      lab: "Healthcare & AI Lab (HAI)", // 연구실 (선택)
      labUrl: "https://sites.google.com/view/hai-lab",
      advisor: "최상호 교수",          // 지도교수 (선택)
      period: "2025.09 – Present",
      gpa: 4.41,                      // 전체 평점
      gpaMax: 4.5,
      majorGpa: null,
      notes: []                       // 예: ["연구 주제: 비접촉 생체신호 기반 수면 모니터링"]
    },
    {
      degree: "B.S.",
      status: "Graduated",
      school: "광운대학교",
      schoolEn: "Kwangwoon University",
      major: "컴퓨터정보공학부 (지능정보공학 전공)",
      majorEn: "Computer and Information Engineering",
      lab: "",
      labUrl: "",
      advisor: "",
      period: "2022.03 – 2025.08",
      gpa: 3.53,                      // 전체 평점
      gpaMax: 4.5,
      majorGpa: null,                 // 전공 평점 (선택)
      notes: []                       // 예: ["성적우수 장학금 2회"]
    }
  ],

  // 연도별 페이지 머리말: 한 줄 회고 + 그 해 평점(선택)
  years: {
    "2026": { summary: "[예시] 연구를 논문으로 정리하는 해.", gpa: null },
    "2025": { summary: "[예시] 첫 학회 발표와 첫 특허 출원을 한 해.", gpa: null }
  },

  // status: "Pending"(출원) | "Granted"(등록). 등록되면 status 를 "Granted"로, number 를 "Patent No. …"로 바꾸세요.
  patents: [
    {
      title: "개인맞춤형 수면 자세 추론 온디바이스 인공지능 모델 제공 장치 및 방법",
      titleEn: "Device and method for providing an on-device AI model for inferring personalized sleep postures",
      status: "Pending",
      number: "Application No. 10-2025-0182152",
      date: "2025.11", // 출원일 2025.11.26
      inventors: "최상호, 전기헌",
      applicant: "광운대학교 산학협력단",
      summary: "침대에 설치한 FSR·PVDF 센서 신호로 수면 자세를 분류하는 멀티모달 AI 모델을, 사용자 기기에서 적은 파라미터만 미세 조정(PEFT)해 개인 맞춤형으로 만들고 온디바이스로 실시간 추론.",
      image: "assets/patents/patent-10-2025-0182152.jpg" // 출원번호통지서 (개인정보 없음)
    }
  ],

  // status: "In preparation" | "Submitted" | "Under review" | "Accepted" | "Published"
  // 게재된 논문은 journal / citation / doi 를 채우고, 준비 중인 논문은 target / expected 를 채웁니다.
  // authors 안의 profile.authorName 과 같은 이름은 자동으로 굵게 표시됩니다.
  publications: [
    {
      title: "Unconstrained Sleep Apnea Detection With Conv-ViT Network: LoRA Tuning for Personalized Monitoring",
      authors: "Hyun Bin Kwon, Ki Hun Jun, Heenam Yoon, Eun Yeon Joo, Sang Ho Choi",
      journal: "IEEE Sensors Journal",
      citation: "vol. 26, no. 4, pp. 6331–6343, Feb. 2026",
      doi: "10.1109/JSEN.2025.3650450",
      status: "Published",
      date: "2026.01", // Date of Publication: 14 January 2026
      summary: "매트리스 토퍼 아래에 둔 PVDF 필름 센서로 몸에 아무것도 붙이지 않고 수면무호흡을 검출하는 Conv-ViT 모델. 수면다원검사(PSG)를 받은 121명의 데이터로 학습하고, LoRA 튜닝으로 사용자별 맞춤 모니터링을 구현.",
      link: "https://ieeexplore.ieee.org/document/11353375"
    }
  ],

  // 개인 프로젝트. status: "Completed" | "In Progress"
  // highlights 는 Projects 섹션에만, summary 는 Projects 와 연도별 타임라인 둘 다에 나옵니다.
  projects: [
    {
      title: "저선량 흉부 X-ray 디노이저 — 진단 성능 기준 평가",
      subtitle: "How far can chest X-ray dose fall before the diagnosis goes with it?",
      date: "2026.09",
      status: "Completed",
      summary: "검출기 물리 모델(Poisson–Gaussian)로 저선량 촬영을 시뮬레이션하고, 디노이저를 PSNR이 아니라 고정된 판독 모델(DenseNet-121)의 진단 AUC로 평가.",
      highlights: [
        "선량 1%에서 판독 AUC 0.502(찍기 수준) → 디노이징 후 0.720 (전선량 0.729)",
        "NIH ChestX-ray14, 학습셋과 환자가 겹치지 않는 검증 1,026장 · 95% 부트스트랩 신뢰구간",
        "대조 실험(linear probe, Gaussian blur)으로 회복분 중 상당 부분이 분포 이동 보정임을 직접 검증",
        "read noise 4배 오차에도 성능 유지 — 노이즈 모델 오차에 대한 강건성 분석"
      ],
      tech: ["PyTorch", "U-Net", "VST", "Noise2Noise / Noise2Void", "torchxrayvision"],
      repo: "https://github.com/Elechun/View-works",
      image: "assets/projects/view-works-dose-auc.png"
    },
    {
      title: "DWI 기반 급성 뇌경색 병변 분할 · 뇌졸중 병인 분류",
      subtitle: "Acute ischemic stroke lesion segmentation and etiology classification",
      date: "2026.09",
      status: "In Progress",
      summary: "공개 데이터 OpenNeuro SOOP(급성 뇌졸중 1,715명, DWI+ADC)로 병변 분할 → 부피 산출 → 병인 분류까지 전 과정을 직접 구현.",
      highlights: [
        "2D U-Net(DWI·ADC 2채널) 분할, 환자 단위 3D Dice · 검출 민감도 · 병변 부피 ICC/Bland–Altman 평가 설계",
        "병변 특징 + 임상변수(NIHSS 등)로 병인 4클래스 분류, 크기 특징 포함/제외 비교로 지름길 학습 점검",
        "여러 AI 에이전트로 데이터 · 방법론 · 누수 진단을 교차검증하는 연구 워크플로 구축",
        "환자 단위 split(시드 고정), 단위 테스트 15개"
      ],
      tech: ["PyTorch", "U-Net", "MRI (DWI/ADC)", "nibabel", "scikit-learn"],
      repo: "https://github.com/Elechun/JLK-",
      image: ""
    },
    {
      title: "ScalpAI — 두피 영상 다중 증상 중증도 분류",
      subtitle: "Multi-symptom severity grading from scalp microscopy",
      date: "2026.09",
      status: "In Progress",
      summary: "AI Hub '유형별 두피 이미지'(약 10만 장)로 사진 한 장에서 6개 증상의 중증도(4등급)를 동시에 예측하고, 시술 전후 변화를 리포트.",
      highlights: [
        "EfficientNet-B0 백본 + 증상별 6개 헤드, 결측 라벨 마스킹 손실",
        "순서형 지표 QWK · within-1 · macro-F1, 피험자 단위 분할과 데이터 누수 점검",
        "시술 전후 사진 비교 리포트 기능",
        "더미 데이터로 전체 파이프라인 검증 완료 · 실제 데이터 학습 예정"
      ],
      tech: ["PyTorch", "EfficientNet", "torchvision", "scikit-learn"],
      repo: "https://github.com/Elechun/Bazbiomedic",
      image: ""
    }
  ],

  // 교내·대외 활동 (학생회, 동아리, 봉사 등). Activities 섹션에 한 목록으로 나옵니다 (최근 시작한 활동이 위).
  // end 를 비워 두면 "Ongoing".
  // category 는 탭 안에서 묶이는 분류이고, 아래 activityCategories 순서대로 나옵니다.
  activityCategories: ["Student Council", "Clubs", "External", "Volunteering", "Campus"],
  // roles: 연도별로 맡은 직책을 { "2023": "부회장" } 처럼 적으면 카드 왼쪽과 펼친 내용의 직책 흐름에 보입니다 (없는 해는 role).
  activities: [
    {
      title: "광운알리미 — 광운대학교 입학전형 홍보대사",
      role: "입학전형 홍보대사",
      roles: { "2023": "부회장", "2024": "회장" },
      org: "광운대학교",
      category: "Campus",
      start: "2022.04",
      end: "2025.08",
      summary: "광운대학교 입학전형 홍보대사로 3년 5개월간 고등학생 대상 전공 체험, 입시 안내, 멘토링을 진행. 2023년 부회장, 2024년 회장으로 단체 운영을 이끌며 레고 마인드스톰 수업 개편과 신규 프로그램 기획을 맡았음.",
      highlights: [
        "레고 마인드스톰 전공 체험 수업 개편 — 고등학생 대상 로봇·코딩 실습 커리큘럼을 새로 구성",
        "신규 전공 체험·입시 프로그램 기획 및 운영",
        "고등학생 진로·전공 멘토링과 입시 설명·상담 지원"
      ],
      link: "https://iphak.kw.ac.kr/highschool/notification.php", // 고교 대상 프로그램 안내
      blog: "https://blog.naver.com/PostList.nhn?blogId=kwiphak",  // 입학처 블로그
      image: ""
    }
  ],

  // 학회 발표. type: "Oral" | "Poster" 등. 심사 중이면 status: "Under Review" + planned: true (점선 카드, 숫자 요약에서 제외)
  // 대한의용생체공학회(KOSOMBE)는 매년 5월(춘계)·11월(추계)에 열림
  conferences: [
    {
      title: "[발표 제목 입력]",
      titleEn: "",
      venue: "대한의용생체공학회 추계학술대회 (KOSOMBE 2026 Fall)",
      location: "",
      date: "2026.11",
      status: "Under Review",
      planned: true,
      type: "",                 // 결과 나오면 "Oral" / "Poster"
      authors: "",
      summary: "",
      award: "",
      poster: "",
      link: ""
    },
    {
      title: "DH-Spikformer: Dendritic Heterogeneity 기반 Spiking Transformer를 활용한 Apnea-ECG의 다중 시간 스케일 동역학 분석",
      titleEn: "DH-Spikformer: Multi-Time-Scale Temporal Dynamics Modeling for Apnea-ECG Analysis with a Dendritic Heterogeneity-Based Spiking Transformer",
      venue: "대한의용생체공학회 춘계학술대회 (KOSOMBE 2026 Spring)",
      location: "",
      date: "2026.05",
      type: "Poster",
      authors: "전기헌, 최상호",
      summary: "여러 시간 스케일의 동역학(DH-LIF)과 Spikformer의 전역 문맥 학습을 결합한 DH-Spikformer 제안. ECG에서 뽑은 RRI·RAMP·EDR 특징으로 수면무호흡 구간을 분류해 F1 0.921, AUROC 0.969, 피험자 단위 AHI 추정 r = 0.978 (PhysioNet Apnea-ECG, 35명).",
      award: "",
      poster: "assets/conferences/kosombe-2026-spring-poster.jpg",
      link: ""
    },
    {
      title: "UWB 레이더 신호 기반의 SNN-CNN 하이브리드 모델을 이용한 비접촉 인체 위치 및 호흡 모니터링",
      titleEn: "Non-contact Human Localization and Respiration Monitoring Using an SNN-CNN Hybrid Model Based on UWB Signals",
      venue: "대한의용생체공학회 추계학술대회 (KOSOMBE 2025 Fall)",
      location: "",
      date: "2025.11",
      type: "Poster",
      authors: "전기헌, 최상호",
      summary: "UWB 레이더 2대로 48명을 측정. SNN이 실내 위치(14개 구역)를 먼저 찾고(테스트 정확도 92.4%, CNN 대비 파라미터 약 1/7·학습시간 1/3), 그 영역에서 CNN이 호흡 신호를 추출해 BIOPAC 기준 신호와 특징 유사도 0.94를 확인.",
      award: "",
      poster: "assets/conferences/kosombe-2025-fall-poster.jpg",
      link: ""
    },
    {
      title: "UWB 레이더를 이용한 에너지 효율적인 사용자 실내 위치 추정을 위한 스파이킹 뉴럴 네트워크",
      titleEn: "Spiking Neural Networks for Energy-Efficient User Indoor Localization using UWB Radar",
      venue: "대한의용생체공학회 춘계학술대회 (KOSOMBE 2025 Spring)",
      location: "",
      date: "2025.05",
      type: "Poster",
      authors: "전기헌, 최상호",
      summary: "비접촉 UWB 레이더 데이터를 Latency 인코딩해 2층 LIF 기반 SNN으로 실내 움직임 9개 클래스를 분류. 48명 대상 5-fold 평균 96.18%, 테스트 99.8%로 CNN과 비슷한 정확도를 파라미터 약 1/7, 학습시간 1/4로 달성.",
      award: "",
      poster: "assets/conferences/kosombe-2025-spring-poster.jpg",
      link: ""
    }
  ],

  // 국가/민간 자격증. 응시 전이면 planned: true
  licenses: [
    {
      title: "SQLD (SQL 개발자)",
      issuer: "한국데이터산업진흥원",
      date: "2026.11", // [예시] 응시 예정 연월
      planned: true,
      number: "",
      image: ""
    },
    {
      title: "리눅스마스터 2급",
      issuer: "한국정보통신진흥협회 (KAIT)",
      date: "2026.04",
      number: "",
      image: ""
    }
    // 응시 결정되면 주석 해제:
    // , { title: "ADsP (데이터분석 준전문가)", issuer: "한국데이터산업진흥원", date: "2027.03", planned: true, number: "", image: "" }
  ],

  // 어학 성적. 응시 전이면 planned: true + goal 에 목표 등급
  languages: [
    {
      title: "TOEIC Speaking",
      date: "2026.09",          // 응시 연월 (정확한 달이 다르면 수정)
      score: "IM2",
      image: ""                 // 성적표 이미지를 넣으면 "Score Report" 버튼이 생김
    }
  ],

  // category: 수료증 카드 뱃지 ("Coursera", "University", "NIPA" 등 자유롭게)
  // period / number 는 선택 (교육기간, 수료번호)
  // courses 가 있는 항목은 여러 강좌로 된 과정의 진행률로 표시됩니다. 강좌를 끝내면 done: true 로 바꾸고,
  // 받은 강좌 수료증은 아래에 별도 항목으로 추가하세요. 전부 끝나면 planned 를 지우면 됩니다.
  certificates: [
    {
      title: "AI in Healthcare Specialization",
      issuer: "Stanford Online · Coursera",
      category: "Coursera",
      date: "2026.09",
      planned: true,
      courses: [
        { title: "Introduction to Healthcare", done: true },
        { title: "Introduction to Clinical Data", done: false },
        { title: "Fundamentals of Machine Learning for Healthcare", done: false },
        { title: "Evaluations of AI Applications in Healthcare", done: false },
        { title: "AI in Healthcare Capstone", done: false }
      ],
      credentialUrl: "",
      image: ""
    },
    {
      title: "Introduction to Healthcare",
      issuer: "Stanford Online · Coursera",
      category: "Coursera",
      date: "2026.09", // 2026.09.09 발급
      credentialUrl: "https://coursera.org/verify/7CRMA9X6BYWE",
      image: "assets/certificates/coursera-intro-to-healthcare.jpg"
    },
    {
      title: "NIPA-NVIDIA AI 전문가 과정 (1단계)",
      issuer: "정보통신산업진흥원(NIPA) · 수도권 ICT이노베이션스퀘어",
      category: "NIPA",
      date: "2025.08",
      period: "2025.07.04 – 2025.08.07 · 200시간",
      number: "제2025-BT-03-0043호",
      credentialUrl: "",
      image: "assets/certificates/nipa-nvidia-ai-2025.jpg" // 생년월일 가림 처리한 이미지
    }
  ],

  skills: [
    { group: "Languages", items: ["Python", "C++", "SQL", "MATLAB"] },
    { group: "ML / DL", items: ["PyTorch", "TensorFlow", "scikit-learn", "MONAI"] },
    { group: "Medical Data", items: ["DICOM", "ECG/EEG", "EHR (MIMIC-IV)", "FHIR"] },
    { group: "Tools", items: ["Git", "Docker", "Linux", "Weights & Biases"] }
  ]
};
