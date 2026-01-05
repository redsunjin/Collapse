const STORY_DATA = {
    start: {
        id: "start",
        title: "슈뢰딩거의 아침",
        content: "눈을 떴을 때, 당신은 두 가지 상태에 동시에 존재하고 있습니다.\n\n하나는 정적이고 평화로운 침대 위, 다른 하나는 붕괴해가는 화성 기지의 금속 바닥 위입니다. 관측자가 문을 열기 전까지, 당신의 현실은 결정되지 않았습니다.",
        superpositions: [
            {
                condition: "random",
                text: "당신은 기지창 밖으로 붉은 먼지 폭풍을 봅니다. 모든 것이 고요합니다. 화성 기지는 안전합니다.",
                next: "morning_home"
            },
            {
                condition: "random",
                text: "경보음이 고막을 찢습니다. 기압이 급격히 떨어지고 있습니다. 기지는 붕괴 중입니다.",
                next: "morning_base"
            }
        ],
        actions: [
            { text: "현실을 확정하기", type: "collapse" }
        ]
    },
    morning_home: {
        id: "morning_home",
        title: "붕괴된 현실: 일상",
        content: "눈을 뜨자 익숙한 천장이 보입니다. 시계는 오전 7시 30분을 가리키고 있습니다. 모든 것이 평화롭습니다. 어젯밤 꿈꿨던 붉은 행성의 기억은 이제 안개처럼 사라집니다.",
        actions: [
            { text: "부엌으로 향하기", next: "kitchen" },
            { text: "다시 잠들기", next: "sleep_again" }
        ]
    },
    kitchen: {
        id: "kitchen",
        title: "기묘한 식탁",
        content: "부엌에서 고소한 토스트 향기가 납니다. 하지만 식탁 위에 놓인 신문의 날짜가 이상합니다. 현재보다 50년 앞선 날짜, 그리고 1면 기사에는 당신의 이름이 '화성 탐사 영웅'으로 적혀 있습니다.\n\n동시에, 토스트의 고소한 향 끝에서 미세한 전선 타는 냄새가 느껴지기 시작합니다.",
        actions: [
            { text: "신문을 더 자세히 읽기", next: "read_paper" },
            { text: "냄새의 근원을 찾아 환기구 열기", next: "open_vent" }
        ]
    },
    read_paper: {
        id: "read_paper",
        title: "평행한 영웅담",
        content: "기사 내용은 상세합니다. 당신은 2076년 화성 식민지 건설의 일등공신이며, 지구로 귀환하여 평화로운 은퇴 생활을 즐기고 있다고 적혀 있습니다. 하지만 기사 옆의 사진 속 당신은 지금보다 수십 년은 더 늙어 보입니다.\n\n갑자기 신문의 활자들이 지지직거리며 코드로 변하기 시작합니다.",
        actions: [
            { text: "시스템 재부팅 시도 (환상 깨기)", next: "morning_base" },
            { text: "일단 토스트를 한 입 베어물기", next: "void" }
        ]
    },
    open_vent: {
        id: "open_vent",
        title: "환기구 너머의 진실",
        content: "환기구 덮개를 열자, 그곳에는 주방의 배기구가 아닌 화성 기지의 산소 공급 라인이 연결되어 있습니다. 푸른 불꽃이 튀며 타들어가는 전선들이 보입니다.\n\n일상의 껍질이 벗겨지고 기지의 기계음이 주방의 평화를 집어삼킵니다.",
        actions: [
            { text: "중첩 상태로 복귀하기", next: "start" },
            { text: "기지 현실로 완전히 전이하기", next: "morning_base" }
        ]
    },
    sleep_again: {
        id: "sleep_again",
        title: "후회 없는 잠",
        content: "당신은 다시 눈을 감습니다. 이 평화가 가짜라 할지라도, 차가운 금속 바닥보다는 부드러운 침대가 낫습니다. 하지만 의식이 멀어질수록 누군가의 비명이 섞인 경보음이 귓가에 맴돕니다.",
        actions: [
            { text: "심연으로 더 깊이 잠들기", next: "void" }
        ]
    },
    void: {
        id: "void",
        title: "관측되지 않은 심연",
        content: "당신은 아무것도 선택하지 않기로 했습니다. 현실은 확정되지 않은 채 흩어지며, 당신은 완전한 어둠 속으로 가라앉습니다. 이곳에는 기지도, 주방도, 당신 자신도 존재하지 않습니다. 오직 무한한 확률의 파동만이 존재할 뿐입니다.",
        actions: [
            { text: "새로운 우주에서 눈을 뜨기", next: "start" }
        ]
    },
    morning_base: {
        id: "morning_base",
        title: "붕괴된 현실: 기지",
        content: "눈을 뜨자 차가운 금속 천장과 복잡한 배선들이 보입니다. 산소 잔량 15%. 당신은 자신이 누구인지, 왜 이곳에 있는지 기억해내야 합니다. 당신은 '아침'을 맞이한 것이 아니라 '생존'을 시작한 것입니다.",
        actions: [
            { text: "데이터 패드 확인하기", next: "check_data" },
            { text: "비상 공기 탱크 찾기", next: "search_oxygen" }
        ]
    },
    check_data: {
        id: "check_data",
        title: "이전의 나로부터",
        content: "데이터 패드 화면이 지지직거리며 켜집니다. '관측 로그 #734'라는 제목의 영상이 재생됩니다. 화면 속의 당신은 말합니다.\n\n\"만약 네가 집에서 토스트 냄새를 맡으며 깼다면, 절대로 눈을 뜨지 마. 그건 현실이 붕괴되기 전의 마지막 환상이야.\"",
        actions: [
            { text: "로그 전체 분석하기", next: "analyze_log" },
            { text: "통신 장비 복구 시도하기", next: "fix_radio" }
        ]
    },
    analyze_log: {
        id: "analyze_log",
        title: "양자 정보 추출",
        content: "로그 기록을 깊이 파헤치자 충격적인 사실이 드러납니다. 당신은 한 명의 인간이 아니라, 여러 시간선의 당신이 양자적으로 얽혀있는 '데이터 덩어리'일지도 모릅니다. 이번 붕괴는 단순한 사고가 아니라, 실험의 일부입니다.",
        actions: [
            { text: "실험 기록 아카이브 접근", next: "void" },
            { text: "현실을 강제로 고정하기", next: "morning_home" }
        ]
    },
    fix_radio: {
        id: "fix_radio",
        title: "메아리치는 주파수",
        content: "통신기를 수리하자 지지직거리는 노이즈 사이로 낯익은 목소리가 들립니다. 주방에서 듣던 토스트 굽는 소리와 누군가의 웃음소리입니다. 그것은 지구가 아닌, 다른 차원의 당신이 보내는 파동입니다.",
        actions: [
            { text: "목소리에 응답하기", next: "void" },
            { text: "통신을 차단하고 생존에 집중", next: "search_oxygen" }
        ]
    },
    search_oxygen: {
        id: "search_oxygen",
        title: "남겨진 조각",
        content: "구석에 던져진 휴대용 산소 탱크를 발견합니다. 다행히 잔량이 남아있습니다. 하지만 탱크 표면에는 누군가의 손톱으로 긁은 듯한 날카로운 자국이 있습니다.\n\n그 자국은 정확히 당신의 손톱 모양과 일치합니다. 마치 이전에 당신이 이곳에서 죽어갔던 것처럼.",
        actions: [
            { text: "산소 흡입하기", next: "inhale_o2" },
            { text: "탱크 내부의 비밀 수납장 열기", next: "open_hidden" }
        ]
    },
    inhale_o2: {
        id: "inhale_o2",
        title: "희박한 생명선",
        content: "산소가 폐부 깊숙이 들어오자 정신이 맑아집니다. 하지만 동시에 화성 기지의 풍경이 흐릿해지며, 잠깐 동안 당신의 손에 들린 것이 산소 호흡기가 아니라 따뜻한 커피 잔인 것 같은 환각을 느낍니다.",
        actions: [
            { text: "커피 향을 따라가기", next: "kitchen" },
            { text: "기지 제어실로 이동", next: "void" }
        ]
    },
    open_hidden: {
        id: "open_hidden",
        title: "숨겨진 일기",
        content: "수납장 안에는 낡은 가죽 일기장이 들어있습니다. 이 먼지 가득한 기지에 어울리지 않는 물건입니다. 첫 페이지를 펼치자 당신의 필체로 이렇게 적혀 있습니다.\n\n'오늘 아침, 나는 화성에서 비행기 소리를 들었다. 그럴 리가 없는데.'",
        actions: [
            { text: "일기장 계속 읽기", next: "analyze_log" },
            { text: "일기장을 덮고 문 밖으로 나가기", next: "start" }
        ]
    }
};
