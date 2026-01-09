class QuantumNarrativeEngine {
    constructor(data) {
        this.data = data;
        this.currentState = null;
        this.history = JSON.parse(localStorage.getItem('vortex_history') || '[]');
        this.observedAtoms = new Set(JSON.parse(localStorage.getItem('vortex_observed') || '[]'));
        this.isRealityConfirmed = localStorage.getItem('vortex_confirmed') === 'true';

        this.storyViewport = document.getElementById('narrative-content');
        this.actionButtons = document.getElementById('action-buttons');
        this.stateIndicator = document.getElementById('quantum-state');
        this.coherenceIndicator = document.getElementById('coherence');
        this.resetBtn = document.getElementById('reset-btn');
        this.mapBtn = document.getElementById('view-map-btn');
        this.closeMapBtn = document.getElementById('close-map-btn');
        this.mapOverlay = document.getElementById('map-overlay');

        this.init();
    }

    init() {
        // Condition: DO NOT auto-load if we just entered.
        // Instead, we will always start at 'start', and the engine will provide a 'CONTINUE' button if history exists.
        this.loadNode('start');

        this.resetBtn.addEventListener('click', () => this.confirmRestart());
        this.mapBtn.addEventListener('click', () => this.toggleMap(true));
        this.closeMapBtn.addEventListener('click', () => this.toggleMap(false));

        this.quantumMap = new QuantumMap('entanglement-map', this.data);
    }

    saveState() {
        localStorage.setItem('vortex_history', JSON.stringify(this.history));
        localStorage.setItem('vortex_observed', JSON.stringify(Array.from(this.observedAtoms)));
        localStorage.setItem('vortex_confirmed', this.isRealityConfirmed);
    }

    loadNode(nodeId) {
        const node = this.data[nodeId];
        if (!node) return;

        this.currentState = node;
        if (nodeId.startsWith('atom_')) {
            this.observedAtoms.add(nodeId);
            // Only add to history if it's the latest step
            if (this.history[this.history.length - 1] !== nodeId) {
                this.history.push(nodeId);
            }
            this.isRealityConfirmed = true; // Any atom visit confirms reality
        }

        this.renderNode(node);
        this.updateIndicators(node);
        this.saveState();
    }

    renderNode(node) {
        this.storyViewport.classList.remove('fade-in');
        void this.storyViewport.offsetWidth;
        this.storyViewport.classList.add('fade-in');

        let html = `<h1>${node.title}</h1>`;
        html += `<p>${node.content}</p>`;

        this.storyViewport.innerHTML = html;
        this.renderActions(node.id, node.actions);
    }

    renderActions(nodeId, actions) {
        this.actionButtons.innerHTML = '';

        // Dynamic Logic: Add 'Continue' button to start if history exists
        if (nodeId === 'start' && this.history.length > 0) {
            const contBtn = document.createElement('button');
            const lastNodeId = this.history[this.history.length - 1];
            contBtn.innerText = "연결된 관측 재개 (CONTINUE)";
            contBtn.classList.add('quantum-pulse');
            contBtn.onclick = () => this.loadNode(lastNodeId);
            this.actionButtons.appendChild(contBtn);
        }

        actions.forEach((action, index) => {
            const btn = document.createElement('button');
            btn.innerText = action.text;

            // Pulse the first action only if there's no continue button
            if (index === 0 && (nodeId !== 'start' || this.history.length === 0)) {
                btn.classList.add('quantum-pulse');
            }

            btn.onclick = () => {
                if (action.type === 'collapse') {
                    this.collapseSuperposition();
                } else if (action.next) {
                    this.loadNode(action.next);
                }
            };
            this.actionButtons.appendChild(btn);
        });
    }

    collapseSuperposition() {
        if (!this.currentState.superpositions) return;

        this.storyViewport.classList.add('collapse-effect');
        document.getElementById('app-container').style.animation = 'noiseMovement 0.1s infinite';

        setTimeout(() => {
            const randomIdx = Math.floor(Math.random() * this.currentState.superpositions.length);
            const selected = this.currentState.superpositions[randomIdx];

            this.storyViewport.classList.remove('collapse-effect');
            document.getElementById('app-container').style.animation = '';

            const node = {
                title: this.currentState.title,
                content: this.currentState.content + "\n\n" + selected.text,
                actions: [{ text: "계속하기 (관측 완료)", next: selected.next }]
            };

            this.updateIndicators(node, "COLLAPSED");
            this.renderNode(node);
        }, 800);
    }

    updateIndicators(node, forceState = null) {
        if (forceState) {
            this.stateIndicator.innerText = `STATE: ${forceState}`;
        } else {
            this.stateIndicator.innerText = node.superpositions ? "STATE: SUPERPOSITION" : "STATE: RESOLVED";
        }
        this.stateIndicator.style.color = node.superpositions ? "var(--accent-color)" : "#ff00ff";
    }

    toggleMap(show) {
        if (show) {
            this.mapOverlay.classList.remove('hidden');
            this.quantumMap.render(this.history);
        } else {
            this.mapOverlay.classList.add('hidden');
        }
    }

    confirmRestart() {
        if (confirm("현실을 재구축하시겠습니까? 모든 관측 데이터가 초기화됩니다.")) {
            localStorage.clear();
            location.reload();
        }
    }
}

class QuantumMap {
    constructor(canvasId, storyData) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.data = storyData;
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    render(history) {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (history.length === 0) return;

        // Create organic node positions base on history index and id
        const nodes = history.map((id, i) => {
            // Seeded random for consistent layout of the same history
            const seed = id.split('_')[1] || i;
            const jitterX = (Math.sin(seed * 0.5) * 100);
            const jitterY = (Math.cos(seed * 0.5) * 100);

            return {
                id,
                x: (this.canvas.width / 2) + jitterX + (Math.sin(i) * (i * 10)),
                y: (this.canvas.height / 2) + jitterY + (Math.cos(i) * (i * 10)),
                title: this.data[id] ? this.data[id].title : id
            };
        });

        // Draw connections with gradient/pulse
        ctx.lineWidth = 1;
        for (let i = 0; i < nodes.length - 1; i++) {
            const grad = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[i + 1].x, nodes[i + 1].y);
            grad.addColorStop(0, 'rgba(0, 242, 255, 0.4)');
            grad.addColorStop(1, 'rgba(255, 0, 255, 0.4)');

            ctx.beginPath();
            ctx.strokeStyle = grad;
            ctx.setLineDash([5, 5]); // Glitchy dashed line
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[i + 1].x, nodes[i + 1].y);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        // Draw nodes with "Quantum Core" effect
        nodes.forEach((node, i) => {
            const isLast = i === nodes.length - 1;

            // Draw core
            ctx.shadowBlur = isLast ? 30 : 10;
            ctx.shadowColor = isLast ? '#ff00ff' : 'var(--accent-color)';

            ctx.fillStyle = isLast ? '#fff' : 'var(--accent-color)';
            ctx.beginPath();
            ctx.arc(node.x, node.y, isLast ? 8 : 5, 0, Math.PI * 2);
            ctx.fill();

            // Draw orbit ring for last node
            if (isLast) {
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(node.x, node.y, 15, 0, Math.PI * 2);
                ctx.stroke();
            }

            ctx.shadowBlur = 0;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.font = '700 10px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(node.title, node.x, node.y + 25);
        });
    }
}

window.addEventListener('load', () => {
    new QuantumNarrativeEngine(STORY_DATA);
});
