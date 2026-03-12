// ============================================================
// PORTFOLIO CONFIGURATION
// ============================================================
// 이 파일만 수정하면 사이트 전체에 반영됩니다.
// [YOUR_...] 부분을 본인 정보로 교체하세요.
// ============================================================

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
}

export interface Certificate {
  title: string;
  issuer: string;
  issuedAt: string;
  description: string;
  imageUrl: string;
  credentialUrl: string;
  tags: string[];
}

export interface SiteData {
  name: string;
  role: string;
  intro: string;
  aboutTitle: string;
  aboutDescription: string;
  email: string;
  githubUrl: string;
  blogUrl: string;
  resumeUrl: string;
  projects: Project[];
  certificates: Certificate[];
  floatingMethods: string[];
  techStack: {
    name: string;
    category: string;
    level: number;
  }[];
}

const siteData: SiteData = {
  // ──── 기본 정보 ────
  name: "Lee Chang Ho",
  role: "BACKEND · AI Prompt Engineering",
  intro:
    "어두운 배경 위에서 문제를 해결하고, 실제로 동작하는 서비스를 만드는 개발자입니다.",

  // ──── About ────
  aboutTitle: "많은걸 흡수하고 싶은 개발자",
  aboutDescription:
    "화려한 연출만 보여주는 포트폴리오가 아니라, 실제 서비스 구현 경험과 기술적 사고를 함께 보여주는 구성을 지향합니다. 이 포트폴리오의 Hero는 단순한 구체가 아니라, 강착원반과 사건의 지평선 느낌을 가진 블랙홀과 그 안으로 빨려 들어가는 JavaScript 메서드 ,기술 스택 흐름을 통해 문제 해결의 중심으로 수렴되는 개발자 이미지,많은걸 배우고 익히고 싶음을 표현합니다.",

  // ──── 연락처 / 링크 ────
  email: "dlckdgh0523@gmail.com",
  githubUrl: "https://github.com/dlckdgh0523-lgtm",
  blogUrl: "https://blog.naver.com/moodie_lv3",
  resumeUrl: "https://YOUR_RESUME_URL",

  // ──── 프로젝트 ────
  projects: [
    {
      title: "AI Todo Manager",
      description:
        "자연어를 구조화된 할 일 데이터로 바꾸고, 우선순위와 요약까지 연결한 서비스",
      techStack: [
        "Next.js",
        "TypeScript",
        "Supabase",
        "OpenAI",
      ],
      liveUrl: "https://YOUR_PROJECT_1_URL",
      githubUrl: "https://github.com/YOUR_PROJECT_1_REPO",
    },
    {
      title: "Able Bridge",
      description:
        "발달장애 아동·청소년·성인의 자립을 지원하는 서비스 설계 및 기능 구현",
      techStack: [
        "React",
        "PostgreSQL",
        "RLS",
        "Edge Functions",
      ],
      liveUrl: "https://YOUR_PROJECT_2_URL",
      githubUrl: "https://github.com/YOUR_PROJECT_2_REPO",
    },
    {
      title: "Portfolio Black Hole Hero",
      description:
        "Three.js와 React Three Fiber로 구현한 블랙홀 기반 인터랙티브 포트폴리오",
      techStack: ["Three.js", "R3F", "Drei", "Tailwind"],
      liveUrl: "https://YOUR_PROJECT_3_URL",
      githubUrl: "https://github.com/YOUR_PROJECT_3_REPO",
    },
    {
      title: "Cat Block pop",
      description: "고양이 디자인 블록 게임 .",
      techStack: [],
      liveUrl: "https://YOUR_PROJECT_4_URL",
      githubUrl: "https://github.com/YOUR_PROJECT_4_REPO",
    },
    {
      title: "발달장애 자립 지원 서비스",
      description: "발달 장애인들의 자립을 돕는 서비스",
      techStack: [],
      liveUrl: "https://YOUR_PROJECT_5_URL",
      githubUrl: "https://github.com/YOUR_PROJECT_5_REPO",
    },
    {
      title: "Buto",
      description: "실시간 심부름 어플리케이션",
      techStack: [],
      liveUrl: "https://YOUR_PROJECT_6_URL",
      githubUrl: "https://github.com/YOUR_PROJECT_6_REPO",
    },
  ],

  // ──── 수료증 / Certificates ────
  certificates: [
    {
      title: "CodeIt BootCamp Node.js Backend 7",
      issuer: "YOUR_ISSUER_1",
      issuedAt: "2026-06",
      description: "6월 수료 예정.",
      imageUrl: "YOUR_CERTIFICATE_IMAGE_URL_1",
      credentialUrl: "YOUR_CERTIFICATE_LINK_1",
      tags: ["Node.js", "Backend", "Bootcamp"],
    },
    {
      title: "Ai Prompt Engineering",
      issuer: "YOUR_ISSUER_2",
      issuedAt: "2026-03",
      description: "Ai prompt Engineering 곧 취득 예정",
      imageUrl: "YOUR_CERTIFICATE_IMAGE_URL_2",
      credentialUrl: "YOUR_CERTIFICATE_LINK_2",
      tags: ["AI", "Prompt", "LLM"],
    },
    {
      title: "YOUR_CERTIFICATE_TITLE_3",
      issuer: "YOUR_ISSUER_3",
      issuedAt: "2026-03",
      description: "수료증 설명을 여기에 적으세요.",
      imageUrl: "YOUR_CERTIFICATE_IMAGE_URL_3",
      credentialUrl: "YOUR_CERTIFICATE_LINK_3",
      tags: [],
    },
    {
      title: "YOUR_CERTIFICATE_TITLE_4",
      issuer: "YOUR_ISSUER_4",
      issuedAt: "2026-04",
      description: "수료증 설명을 여기에 적으세요.",
      imageUrl: "YOUR_CERTIFICATE_IMAGE_URL_4",
      credentialUrl: "YOUR_CERTIFICATE_LINK_4",
      tags: [],
    },
    {
      title: "YOUR_CERTIFICATE_TITLE_5",
      issuer: "YOUR_ISSUER_5",
      issuedAt: "2026-05",
      description: "수료증 설명을 여기에 적으세요.",
      imageUrl: "YOUR_CERTIFICATE_IMAGE_URL_5",
      credentialUrl: "YOUR_CERTIFICATE_LINK_5",
      tags: [],
    },
  ],

  // ──── 떠다니는 JS 메서드 텍스트 (Hero 블랙홀 장면) ────
  floatingMethods: [
    "map()",
    "filter()",
    "reduce()",
    "find()",
    "some()",
    "every()",
    "forEach()",
    "includes()",
    "sort()",
    "slice()",
    "splice()",
    "push()",
    "pop()",
    "shift()",
    "unshift()",
    "async",
    "await",
    "Promise",
    "fetch()",
    "useEffect()",
    "useState()",
  ],

  // ──── 기술 스택 ────
  techStack: [
    { name: "JavaScript", category: "Language", level: 90 },
    { name: "TypeScript", category: "Language", level: 85 },
    { name: "React", category: "Frontend", level: 88 },
    { name: "Next.js", category: "Frontend", level: 80 },
    { name: "Node.js", category: "Backend", level: 85 },
    { name: "Express", category: "Backend", level: 82 },
    { name: "PostgreSQL", category: "Database", level: 78 },
    { name: "Supabase", category: "Database", level: 75 },
    { name: "Docker", category: "DevOps", level: 70 },
    { name: "Git", category: "DevOps", level: 88 },
    { name: "Three.js", category: "Frontend", level: 72 },
    { name: "Tailwind", category: "Frontend", level: 90 },
    { name: "Python", category: "Language", level: 75 },
    { name: "OpenAI API", category: "AI", level: 80 },
    { name: "REST API", category: "Backend", level: 88 },
    { name: "GraphQL", category: "Backend", level: 65 },
  ],
};

export default siteData;