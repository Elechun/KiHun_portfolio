/*
 * 포트폴리오 내용은 전부 이 파일에서 수정합니다.
 * [예시] 라고 표시된 값들을 실제 내용으로 바꿔 주세요.
 * 항목을 추가하려면 { ... } 블록을 복사해서 배열에 붙여 넣으면 됩니다.
 * 이미지(특허증, 수료증)는 assets/ 폴더에 넣고 경로를 적어 주세요. 비워 두면 버튼이 숨겨집니다.
 */
window.PORTFOLIO = {
  profile: {
    name: "KiHun",
    nameKo: "기훈",
    role: "Healthcare AI Researcher",
    tagline: "의료 데이터로 임상 현장의 문제를 푸는 AI를 연구합니다.",
    intro:
      "[예시] 생체신호·의료영상 기반 딥러닝 모델을 개발하고, 이를 실제 임상 의사결정에 쓸 수 있는 형태로 만드는 데 관심이 있습니다. 연구 결과를 특허와 학회 발표로 이어 왔고, 현재 저널 투고를 준비하고 있습니다.",
    photo: "", // 예: "assets/profile.jpg"
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

  // status: "등록" | "출원"
  patents: [
    {
      title: "[예시] 딥러닝 기반 심전도 이상 탐지 장치 및 방법",
      status: "등록",
      number: "제10-0000000호",
      date: "2025.08",
      inventors: "홍길동, 기훈 외 2인",
      summary:
        "[예시] 단일 리드 심전도 신호에서 부정맥을 실시간으로 검출하는 경량 신경망 구조 및 이를 탑재한 웨어러블 장치.",
      image: "" // 예: "assets/patents/patent-1.jpg"
    }
  ],

  // type: "Oral" | "Poster" | "Invited" 등
  conferences: [
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

  // status: "In preparation" | "Submitted" | "Under review" | "Accepted" | "Published"
  publications: [
    {
      title: "[예시] A Lightweight Transformer for Real-time Arrhythmia Detection on Wearable Devices",
      authors: "기훈*, 홍길동, 김철수 (*first author)",
      target: "[예시] IEEE Journal of Biomedical and Health Informatics",
      status: "In preparation",
      expected: "2026 Q4 투고 예정",
      summary:
        "[예시] 모바일 환경에서 동작 가능한 경량 트랜스포머로 기존 대비 연산량 70% 절감, F1 0.94 달성.",
      link: ""
    }
  ],

  // category: 필터 탭 이름으로 쓰입니다 ("Coursera", "학교", "기타" 등 자유롭게)
  certificates: [
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
