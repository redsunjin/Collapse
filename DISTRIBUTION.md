# Distribution & Anti-Plagiarism Strategy: 붕괴 (Collapse)

## [한글 요약 / Korean Summary]
"Quantum Narratives"의 글로벌 배포를 위한 플랫폼 선정과 창작물 보호를 위한 전략을 제안합니다.
- **배포 플랫폼**: Reddit(커뮤니티), itch.io(인디 게임), GitHub(서사/개발 분리) 등을 활용한 다각도 접근.
- **배포 아키텍처**: 비공개 개발용 레포지토리와 공개 독자용 레포지토리의 이원화 운영.
- **표절 방지**: 주기적인 AI 기반 표절 검사와 고유한 Narrative Engine 로직 노출 최소화.
- **홍보 전략**: '양자역학적 선택'이라는 독특한 키워드를 중심으로 짧은 데모 영상과 인터렉티브 미리보기를 배포.

---

## [Distribution Plan / 영문 상세 내용]

### 1. Target Platforms
- **Reddit**: Use subreddits like `r/interactivefiction`, `r/visualnovels`, and `r/webgames` for community feedback and initial traffic. Providing a direct link to a hosted web version is key.
- **itch.io**: The primary platform for indie interactive experiences. It allows for "Pay What You Want" models and has a strong community for text-based games.
- **Hosting**: Deploy using **Vercel** or **Netlify** for high performance and global CDN availability.

### 2. Anti-Plagiarism & Content Protection
- **Creative Commons License**: Apply a `CC BY-NC-ND` (Attribution-NonCommercial-NoDerivs) license initially to protect the core narrative.
- **Logic Obfuscation**: While the frontend is transparent, certain "state transition" logic can be kept in a more complex structure to discourage simple copy-pasting.
- **Regular Audits**: Use tools like **Copyscape** or AI originality detectors to monitor for unauthorized re-publications on other web novel platforms.

### 3. Community-Native Format (레딧/커뮤니티 최적화)
- **Reddit-Native CYOA**: 웹 버전으로의 유도뿐만 아니라, 레딧 내부에서 완결되는 '텍스트 레이어'를 제공합니다. 
  - **Link Architecture**: 각 게시물의 끝에 다음 단계로 이어지는 다른 게시물 또는 댓글의 링크를 배치합니다. 이는 사용자가 플랫폼을 이탈하지 않고도 '선택'의 재미를 느끼게 합니다.
  - **Quantum Hybrid**: Reddit에서 선택지를 클릭하면 유입 경로(Referrer)에 따라 다른 결과를 보여주는 웹 페이지로 연결하여 '양자적 붕괴'를 경험하게 합니다.

### 4. Multi-Repo Management (멀티 레포지토리 관리)
개발과 배포 저장소가 분리됨에 따라 다음 원칙을 준수합니다.
- **Privacy First**: `Private` 저장소의 실시간 개발 로그(`develop` 브랜치)는 절대 `Public` 저장소로 유출되지 않도록 필터링함.
- **Sanitized Release**: `Public` 저장소로의 푸시는 `publish` 브랜치 또는 클린 스윕 스크립트를 통해서만 이루어지며, 배포 전 QA 시나리오를 통과해야 함.
- **Unified Narrative**: 두 저장소의 커밋 내역은 서로 다른 '관측 레이어'로 간주하며, `Public` 저장소의 메시지는 더욱 서사적인 표현을 사용함.
- **Releases/Tags**: 이야기의 큰 전환점을 '버전'으로 배포하여 사용자가 과거의 현실로 돌아가거나 새로운 도약(Leap)을 하는 경험 제공.

### 5. GitHub-Native Strategy (깃허브 서사 플랫폼화)
- **GitHub Pages**: `index.html`을 기반으로 한 즉각적인 웹 서비스 배포.
- **Pull Request as Timeline**: 독자가 직접 새로운 '타임라인'이나 '분기'를 PR로 제안하도록 유도하여 참여형 소설로 확장.
- **Issues as Observation**: 특정 스토리 구간의 의문점이나 관측 결과를 Issue로 등록하여, QSM(AI)이 이에 응답하거나 다음 챕터에 반영하게 함.
- **Releases/Tags**: 이야기의 큰 전환점을 '버전'으로 배포하여 사용자가 과거의 현실로 돌아가거나 새로운 도약(Leap)을 하는 경험 제공.

### 6. Multi-Repository Security Strategy (멀티 레포지토리 보안 전략)
소스코드와 서사 콘텐츠를 물리적으로 분리하여 보안을 극대화합니다.

#### 6.1 Repository Roles (레포지토리 역할)
- **Private Repo (`origin`)**: `quantum-narratives` (현재 이 저장소). 프로젝트의 모든 설정, 소스 코드, AI 정책이 담긴 '블랙박스'입니다. 공개 레포지토리에 대한 정보를 `README.md`에 유지합니다.
- **Public Repo (`public`)**: `collapse-novel` (또는 실제 소설 제목). 독자들에게 보여줄 최종 결과물만 업로드되는 '무대'입니다.

#### 5.2 Branching & Sync (동기화 규칙)
1. **Develop Phase**: `origin/develop`에서 자유롭게 실험하고 개발합니다. 이 브랜치는 모든 소스와 이력을 포함하는 마스터 타임라인입니다.
2. **Release Phase**: 발행 준비가 되면 `publish` 브랜치(또는 임시 폴더)로 필요한 파일만 추출합니다.
3. **Public Sync**: `git push public publish:main` 명령어를 통해 공개 레포지토리의 `main` 브랜치로 이야기를 전송합니다.

#### 5.3 Quantum Filtered Synchronization (클린 스윕 동기화)
단순 브랜치 푸시는 과거의 개발 이력(커밋 로그)과 삭제된 파일의 흔적까지 공개 저장소로 보낼 위험이 있습니다. 이를 방지하기 위해 `publish.ps1`은 다음의 **양자 필터링(Quantum Filtering)** 과정을 거칩니다.
1. **Sanitization**: `develop` 브랜치에서 오직 공개 가능한 최신 파일들만 별도의 **임시 폴더(Temp)**로 추출합니다.
2. **History Reset**: 임시 폴더에서 `git init`을 통해 새로운 이력을 생성합니다. 이는 과거의 모든 개발 로그를 세탁하고 오직 '현재의 완성된 형태'만 남깁니다.
3. **Pure Deployment**: 정제된 상태만을 공개 저장소(`public`)의 `main` 브랜치로 강제 푸시합니다.
4. **Result**: 독자들은 엔진의 설계도나 비공개 기획의 흔적을 전혀 볼 수 없으며, 오직 '관측된 결과물'인 소설만을 보게 됩니다.

### 6. Marketing Strategy
- **Interactive Demos**: Release a "Quantum Prologue" as a free, sharable link.
- **Cross-Linking**: Structure Reddit posts as a "Nebula of Stories" where each post links to multiple potential futures, enticing readers to explore the web version for the "Real-time Collapse" effect.
- **Visual Teasers**: Create GIFs/Shorts showing the "collapse" animation and the glassmorphism UI to showcase the premium quality.
