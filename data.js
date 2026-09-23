/*
 * 포트폴리오 내용은 전부 이 파일에서 수정합니다.
 * [예시] 라고 표시된 값들을 실제 내용으로 바꿔 주세요.
 *
 * - 모든 기록은 date: "YYYY.MM" 을 기준으로 연도별 페이지에 자동 배치됩니다.
 * - 아직 안 한 일(응시 예정 등)은 planned: true 로 두면 "예정" 표시가 붙습니다.
 * - 이미지(특허증, 자격증, 수료증)는 assets/ 폴더에 넣고 image 에 경로를 적으면 "증빙 보기" 버튼이 생깁니다.
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
    photo: "", // 촬영 후 assets/profile.jpg 로 올리고 "assets/profile.jpg" 로 적기. 첫 화면(동그라미)과 About(증명사진형) 둘 다에 쓰입니다.
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
  // gpa / majorGpa 는 숫자로 적으면(예: 4.12) "평점 4.12 / 4.5" 처럼 한 줄 정보로 나오고, null 이면 표시되지 않습니다.
  // gpaMax 는 만점 기준 (4.5 또는 4.3). 비어 있는 칸("")은 사이트에서 자동으로 빠집니다.
  education: [
    {
      degree: "석사",                 // 학사 / 석사 / 박사
      status: "재학 중",              // 재학 중 / 졸업 / 졸업 예정
      school: "광운대학교",
      schoolEn: "Kwangwoon University", // 영문 학교명 (두 번째 줄에 작게 표시)
      major: "컴퓨터공학과",
      majorEn: "",                    // 영문 학과명 (선택)
      lab: "Healthcare & AI Lab (HAI)", // 연구실 (선택)
      labUrl: "https://sites.google.com/view/hai-lab",
      advisor: "최상호 교수",          // 지도교수 (선택)
      period: "2025.09 – 현재",
      gpa: 4.41,                      // 전체 평점
      gpaMax: 4.5,
      majorGpa: null,
      notes: []                       // 예: ["연구 주제: 비접촉 생체신호 기반 수면 모니터링"]
    },
    {
      degree: "학사",
      status: "졸업",
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
    "2025": { summary: "[예시] 첫 특허를 출원한 해.", gpa: null }
  },

  // status: "등록" | "출원". 등록되면 status 를 "등록"으로, number 를 등록번호로 바꾸세요.
  patents: [
    {
      title: "개인맞춤형 수면 자세 추론 온디바이스 인공지능 모델 제공 장치 및 방법",
      titleEn: "Device and method for providing an on-device AI model for inferring personalized sleep postures",
      status: "출원",
      number: "출원번호 10-2025-0182152",
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

  // 개인 프로젝트. status: "완료" | "진행 중"
  // highlights 는 Projects 섹션에만, summary 는 Projects 와 연도별 타임라인 둘 다에 나옵니다.
  projects: [
    {
      title: "저선량 흉부 X-ray 디노이저 — 진단 성능 기준 평가",
      subtitle: "How far can chest X-ray dose fall before the diagnosis goes with it?",
      date: "2026.09",
      status: "완료",
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
      status: "진행 중",
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
      status: "진행 중",
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

  // 교내·대외 활동 (학생회, 동아리, 봉사 등). Activities 섹션에 연도 탭으로 나옵니다.
  // start ~ end 기간에 걸친 모든 연도 탭에 표시됩니다. end 를 비워 두면 "진행 중".
  // category 는 탭 안에서 묶이는 분류이고, 아래 activityCategories 순서대로 나옵니다.
  activityCategories: ["학생회", "동아리", "대외활동", "봉사", "교내 활동"],
  activities: [
    {
      title: "[예시] 학과 학생회",
      role: "[예시] 학술부장",
      org: "광운대학교",
      category: "학생회",
      start: "2025.03",
      end: "2026.02",
      summary: "[예시] 학과 학술제와 선배 멘토링 프로그램을 기획·운영.",
      highlights: ["[예시] 학술제 참가자 120명 규모 운영", "[예시] 신입생 멘토링 12개 조 편성"],
      link: "",
      image: ""
    },
    {
      title: "[예시] AI 학술 동아리",
      role: "[예시] 스터디 리더",
      org: "광운대학교",
      category: "동아리",
      start: "2026.03",
      end: "",
      summary: "[예시] 의료 AI 논문 리딩 스터디를 주 1회 진행.",
      highlights: [],
      link: "",
      image: ""
    },
    {
      title: "[예시] 지역 아동센터 코딩 교육 봉사",
      role: "[예시] 강사",
      org: "[예시] OO구 지역아동센터",
      category: "봉사",
      start: "2025.07",
      end: "2025.08",
      summary: "[예시] 초등학생 대상 파이썬 기초 수업 8회.",
      highlights: [],
      link: "",
      image: ""
    }
  ],

  // type: "Oral" | "Poster" | "Invited" 등
  conferences: [
    {
      title: "[예시] Multimodal EHR + ECG Fusion for ICU Mortality Prediction",
      venue: "[예시] 대한의료정보학회 춘계학술대회 (KOSMI 2026)",
      location: "Seoul, Korea",
      date: "2026.03",
      type: "Poster",
      authors: "전기헌, 홍길동",
      award: "",
      link: ""
    },
    {
      title: "[예시] Explainable Deep Learning for Early Sepsis Prediction from EHR Time Series",
      venue: "[예시] 대한의료정보학회 추계학술대회 (KOSMI 2025)",
      location: "Seoul, Korea",
      date: "2025.11",
      type: "Oral",
      authors: "전기헌, 홍길동, 김철수",
      award: "[예시] 우수발표상",
      link: ""
    },
    {
      title: "[예시] Self-supervised Pretraining for Chest X-ray Classification with Limited Labels",
      venue: "[예시] IEEE EMBC 2025",
      location: "Copenhagen, Denmark",
      date: "2025.07",
      type: "Poster",
      authors: "전기헌, 홍길동",
      award: "",
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
      date: "2026.11", // [예시] 응시 예정 연월
      planned: true,
      goal: "IH 이상",
      score: "",
      image: ""
    }
  ],

  // category: 수료증 카드 뱃지 ("Coursera", "학교", "기타" 등 자유롭게)
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
    },
    {
      title: "[예시] 의료 인공지능 전문인력 양성 교육",
      issuer: "OO대학교 산학협력단",
      category: "학교",
      date: "2025.02",
      credentialUrl: "",
      image: ""
    }
  ],

  skills: [
    { group: "Languages", items: ["Python", "C++", "SQL", "MATLAB"] },
    { group: "ML / DL", items: ["PyTorch", "TensorFlow", "scikit-learn", "MONAI"] },
    { group: "Medical Data", items: ["DICOM", "ECG/EEG", "EHR (MIMIC-IV)", "FHIR"] },
    { group: "Tools", items: ["Git", "Docker", "Linux", "Weights & Biases"] }
  ]
};
