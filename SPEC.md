# Technical Specification: 붕괴 (Collapse) - Narrative Engine

## 1. 개요
`QuantumNarrativeEngine`은 텍스트 기반 소설의 비선형적 흐름을 관리하며, 양자역학적 상태(Superposition, Collapse)를 시뮬레이션합니다.

## 2. 코어 아키텍처
### 2.1 Quantum Story Manager (QSM)
- **Engine Core**: LLM(Gemini)이 이야기의 '관측자'이자 '설계자' 역할을 수행합니다.
- **Graph Dynamics**: `src/content`의 파편화된 이야기(Atoms)를 양자 얽힘(Entanglement) 데이터에 기반하여 실시간으로 조합합니다.
- **Dynamic Collapse**: 유저의 선택이 발생했을 때, LLM이 현재까지의 얽힘 상태를 분석하여 가장 적절한 다음 페이지를 생성하거나 기존 노드를 연결합니다.

### 2.2 State Management
- **Node**: 이야기의 최소 단위. (제목, 본문, 액션 리스트 포함)
- **Superposition State**: 노드가 결정되지 않은 여러 `outcome`을 가지고 있는 상태.
- **Collapse Function**: 사용자의 관측(Action) 발생 시, 확률적으로 하나의 `outcome`을 선택하고 노드를 확정하는 로직.

### 2.2 Data Structure (JSON)
```javascript
{
  "node_id": {
    "title": "제목",
    "content": "본문",
    "superpositions": [ // (Optional) 중첩 상태일 경우
      { "condition": "probabilistic", "weight": 0.5, "text": "추가 본문 A", "next": "next_node_a" },
      { "condition": "probabilistic", "weight": 0.5, "text": "추가 본문 B", "next": "next_node_b" }
    ],
    "actions": [
      { "text": "버튼 텍스트", "next": "next_node_id", "type": "collapse/transition" }
    ]
  }
}
```

## 3. UI/UX 요구사항
- **Glassmorphism**: 배경 블러와 투명도를 활용한 세련된 인터페이스.
- **Micro-animations**: 페이지 전환 시 텍스트 페이드인, 노이즈 효과, 혹은 블러 효과를 통한 '상태 붕괴' 연출.
- **Responsive**: 모바일 및 데스크탑 환경 최적화.

## 4. LLM Orchestration Logic (src/engine)
- **System Prompt**: 제미나이가 소설 관리자로서 가져야 할 페르소나와 얽힘 규칙을 정의.
- **Context Injection**: 현재까지의 선택 이력(History)과 얽혀 있는 변수들을 프롬프트에 동적으로 삽입.
- **Response Format**: JSON 구조로 응답하여 `engine.js`가 즉시 렌더링할 수 있도록 보장.

## 5. 확장 계획
- **Entanglement 시스템**: 전역 변수를 활용하여 이전 선택이 현재 노드의 확률 가중치를 변경하는 로직 추가.
- **Audio Engine**: 엠비언트 사운드 및 효과음을 통한 몰입감 증대.
