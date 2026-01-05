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

### 4. GitHub-Native Strategy (깃허브 서사 플랫폼화)
- **GitHub Pages**: `index.html`을 기반으로 한 즉각적인 웹 서비스 배포.
- **Pull Request as Timeline**: 독자가 직접 새로운 '타임라인'이나 '분기'를 PR로 제안하도록 유도하여 참여형 소설로 확장.
- **Issues as Observation**: 특정 스토리 구간의 의문점이나 관측 결과를 Issue로 등록하여, QSM(AI)이 이에 응답하거나 다음 챕터에 반영하게 함.
- **Releases/Tags**: 이야기의 큰 전환점을 '버전'으로 배포하여 사용자가 과거의 현실로 돌아가거나 새로운 도약(Leap)을 하는 경험 제공.

### 5. Multi-Repository Security Strategy (멀티 레포지토리 보안 전략)
소스코드와 서사 콘텐츠를 물리적으로 분리하여 보안을 극대화합니다.

#### 5.1 Repository Roles (레포지토리 역할)
- **Private Repo (`origin`)**: `quantum-narratives` (현재 이 저장소). 프로젝트의 모든 설정, 소스 코드, AI 정책이 담긴 '블랙박스'입니다. 공개 레포지토리에 대한 정보를 `README.md`에 유지합니다.
- **Public Repo (`public`)**: `collapse-novel` (또는 실제 소설 제목). 독자들에게 보여줄 최종 결과물만 업로드되는 '무대'입니다.

#### 5.2 Branching & Sync (동기화 규칙)
1. **Develop Phase**: `origin/develop`에서 자유롭게 실험하고 개발합니다.
2. **Release Phase**: 발행 준비가 되면 `main` 브랜치로 필요한 파일만 복사/커밋합니다.
3. **Public Sync**: `git push public main` 명령어를 통해 공개 레포지토리로 이야기를 전송합니다.

#### 5.3 Automated Privacy (자동화 및 보호)
- GitHub Actions를 활용하여 `Private/main` 업데이트 시 자동으로 `Public` 레포지토리로 전송하는 파이프라인 구축 권장.
- `Public` 레포지토리의 커밋 메시지는 `agent.md`의 **Observation Log** 규칙을 엄격히 준수하여 서사성을 유지함.

### 6. Marketing Strategy
- **Interactive Demos**: Release a "Quantum Prologue" as a free, sharable link.
- **Cross-Linking**: Structure Reddit posts as a "Nebula of Stories" where each post links to multiple potential futures, enticing readers to explore the web version for the "Real-time Collapse" effect.
- **Visual Teasers**: Create GIFs/Shorts showing the "collapse" animation and the glassmorphism UI to showcase the premium quality.
