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
    nameKo: "기훈",
    authorName: "Ki Hun Jun", // 논문 저자 목록에서 굵게 표시할 이름
    // 히어로에서 타이핑되며 번갈아 나오는 직함
    roles: ["Healthcare AI Researcher", "Biosignal Engineer", "Medical Imaging Enthusiast"],
    // highlight 부분에 손으로 그린 동그라미가 쳐집니다
    headline: { before: "의료 데이터로 ", highlight: "임상 현장", after: "의 문제를 푸는 AI를 만듭니다" },
    intro:
      "[예시] 생체신호·의료영상 기반 딥러닝 모델을 개발하고, 이를 실제 임상 의사결정에 쓸 수 있는 형태로 만드는 데 관심이 있습니다. 연구 결과를 특허와 학회 발표로 이어 왔고, 현재 저널 투고를 준비하고 있습니다.",
    photo: "", // 예: "assets/profile.jpg" (비워 두면 이니셜 아바타)
    location: "Seoul, Korea",
    links: {
      email: "your.email@example.com",
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

  education: [
    {
      school: "[예시] OO대학교",
      degree: "학사 · 의공학과 (부전공: 컴퓨터공학)",
      period: "2021.03 – 2027.02 (예정)",
      gpa: 4.12,
      gpaMax: 4.5,
      majorGpa: 4.25,
      notes: [
        "[예시] 성적우수 장학금 3회",
        "[예시] 주요 과목: 의료영상처리, 머신러닝, 생체신호처리, 데이터구조"
      ]
    }
  ],

  // 연도별 페이지 머리말: 한 줄 회고 + 그 해 평점(선택)
  years: {
    "2026": { summary: "[예시] 연구를 논문으로 정리하는 해.", gpa: 4.30 },
    "2025": { summary: "[예시] 첫 특허 등록과 첫 구두 발표를 해낸 해.", gpa: 4.18 },
    "2024": { summary: "[예시] 의료 AI를 본격적으로 공부하기 시작한 해.", gpa: 4.05 }
  },

  // status: "등록" | "출원"
  patents: [
    {
      title: "[예시] 딥러닝 기반 심전도 이상 탐지 장치 및 방법",
      status: "등록",
      number: "제10-0000000호",
      date: "2025.08",
      inventors: "홍길동, 기훈 외 2인",
      summary: "[예시] 단일 리드 심전도 신호에서 부정맥을 실시간으로 검출하는 경량 신경망 구조 및 이를 탑재한 웨어러블 장치.",
      image: "" // 예: "assets/patents/patent-1.jpg"
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
    },
    {
      title: "[예시] A Lightweight Transformer for Real-time Arrhythmia Detection on Wearable Devices",
      authors: "기훈*, 홍길동, 김철수 (*first author)",
      target: "[예시] IEEE Journal of Biomedical and Health Informatics",
      status: "In preparation",
      date: "2026.09",
      expected: "2026 Q4 투고 예정",
      summary: "[예시] 모바일 환경에서 동작 가능한 경량 트랜스포머로 기존 대비 연산량 70% 절감, F1 0.94 달성.",
      link: ""
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
      authors: "기훈, 홍길동",
      award: "",
      link: ""
    },
    {
      title: "[예시] Explainable Deep Learning for Early Sepsis Prediction from EHR Time Series",
      venue: "[예시] 대한의료정보학회 추계학술대회 (KOSMI 2025)",
      location: "Seoul, Korea",
      date: "2025.11",
      type: "Oral",
      authors: "기훈, 홍길동, 김철수",
      award: "[예시] 우수발표상",
      link: ""
    },
    {
      title: "[예시] Self-supervised Pretraining for Chest X-ray Classification with Limited Labels",
      venue: "[예시] IEEE EMBC 2025",
      location: "Copenhagen, Denmark",
      date: "2025.07",
      type: "Poster",
      authors: "기훈, 홍길동",
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
  certificates: [
    {
      title: "[예시] Generative AI for Healthcare",
      issuer: "Coursera",
      category: "Coursera",
      date: "2026.01",
      credentialUrl: "",
      image: ""
    },
    {
      title: "[예시] 의료 인공지능 전문인력 양성 교육",
      issuer: "OO대학교 산학협력단",
      category: "학교",
      date: "2025.02",
      credentialUrl: "",
      image: ""
    },
    {
      title: "[예시] AI for Medicine Specialization",
      issuer: "DeepLearning.AI · Coursera",
      category: "Coursera",
      date: "2024.12",
      credentialUrl: "",
      image: ""
    },
    {
      title: "[예시] Machine Learning Specialization",
      issuer: "Stanford & DeepLearning.AI · Coursera",
      category: "Coursera",
      date: "2024.06",
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
