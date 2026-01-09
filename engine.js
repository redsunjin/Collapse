class QuantumModal {
    constructor() {
        this.modal = document.getElementById('quantum-modal');
        this.title = document.getElementById('modal-title');
        this.body = document.getElementById('modal-body');
        this.confirmBtn = document.getElementById('modal-confirm');
        this.cancelBtn = document.getElementById('modal-cancel');
    }

    show(title, message, isDanger = false) {
        return new Promise((resolve) => {
            this.title.innerText = title;
            this.body.innerText = message;
            this.modal.classList.remove('hidden');

            if (isDanger) {
                this.confirmBtn.className = 'danger-btn';
            } else {
                this.confirmBtn.className = 'quantum-pulse';
                this.confirmBtn.style.background = 'var(--accent-color)';
                this.confirmBtn.style.color = 'var(--bg-color)';
            }

            const cleanup = (result) => {
                this.modal.classList.add('hidden');
                this.confirmBtn.onclick = null;
                this.cancelBtn.onclick = null;
                resolve(result);
            };

            this.confirmBtn.onclick = () => cleanup(true);
            this.cancelBtn.onclick = () => cleanup(false);
        });
    }
}

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

        this.modal = new QuantumModal();
        this.init();
    }

    init() {
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
            if (this.history[this.history.length - 1] !== nodeId) {
                this.history.push(nodeId);
            }
            this.isRealityConfirmed = true;
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
            this.quantumMap.render(this.history, (id) => this.handleMapClick(id), (id) => this.handleMapDelete(id));
        } else {
            this.mapOverlay.classList.add('hidden');
        }
    }

    handleMapClick(nodeId) {
        this.toggleMap(false);
        this.loadNode(nodeId);
    }

    async handleMapDelete(nodeId) {
        const confirmed = await this.modal.show(
            "ENTANGLEMENT CUT",
            `'${nodeId}' 지점의 엔탕글먼트를 절단하시겠습니까? 해당 관측 이력이 영구히 삭제됩니다.`,
            true
        );

        if (confirmed) {
            this.history = this.history.filter(id => id !== nodeId);
            this.observedAtoms.delete(nodeId);
            this.saveState();
            this.quantumMap.render(this.history, (id) => this.handleMapClick(id), (id) => this.handleMapDelete(id));
        }
    }

    async confirmRestart() {
        const confirmed = await this.modal.show(
            "REALITY RECONSTRUCTION",
            "현실을 재구축하시겠습니까? 모든 관측 데이터와 엔탕글먼트가 초기화됩니다.",
            true
        );

        if (confirmed) {
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
        this.nodeRadius = 15;
        this.nodes = [];
        this.onClick = null;
        this.onDelete = null;
        this.pressTimer = null;

        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mouseup', () => clearTimeout(this.pressTimer));
        this.canvas.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.handleNodeAction(e, true);
        });

        this.canvas.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            this.pressTimer = setTimeout(() => {
                this.handleNodeAction(touch, true);
            }, 800);
        });
        this.canvas.addEventListener('touchend', () => clearTimeout(this.pressTimer));
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    handleMouseDown(e) {
        if (e.button === 2) return;
        this.handleNodeAction(e, e.ctrlKey);
    }

    handleNodeAction(e, isDeleteAction) {
        const rect = this.canvas.getBoundingClientRect();
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);

        const mouseX = clientX - rect.left;
        const mouseY = clientY - rect.top;

        const clickedNode = this.nodes.find(node => {
            const dist = Math.sqrt((node.x - mouseX) ** 2 + (node.y - mouseY) ** 2);
            return dist < this.nodeRadius + 20;
        });

        if (clickedNode) {
            if (isDeleteAction) {
                if (this.onDelete) this.onDelete(clickedNode.id);
            } else {
                if (this.onClick) this.onClick(clickedNode.id);
            }
        }
    }

    render(history, onClick, onDelete) {
        this.onClick = onClick;
        this.onDelete = onDelete;
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (history.length === 0) return;

        this.nodes = history.map((id, i) => {
            const seed = id.split('_')[1] || i;
            const jitterX = (Math.sin(seed * 0.5) * 150);
            const jitterY = (Math.cos(seed * 0.5) * 150);

            return {
                id,
                x: (this.canvas.width / 2) + jitterX + (Math.sin(i) * (i * 15)),
                y: (this.canvas.height / 2) + jitterY + (Math.cos(i) * (i * 15)),
                title: this.data[id] ? this.data[id].title : id
            };
        });

        this.draw();
    }

    draw() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw connections
        ctx.lineWidth = 1;
        for (let i = 0; i < this.nodes.length - 1; i++) {
            const grad = ctx.createLinearGradient(this.nodes[i].x, this.nodes[i].y, this.nodes[i + 1].x, this.nodes[i + 1].y);
            grad.addColorStop(0, 'rgba(0, 242, 255, 0.4)');
            grad.addColorStop(1, 'rgba(255, 0, 255, 0.4)');

            ctx.beginPath();
            ctx.strokeStyle = grad;
            ctx.setLineDash([5, 5]);
            ctx.moveTo(this.nodes[i].x, this.nodes[i].y);
            ctx.lineTo(this.nodes[i + 1].x, this.nodes[i + 1].y);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        // Draw nodes
        this.nodes.forEach((node, i) => {
            const isLast = i === this.nodes.length - 1;

            ctx.shadowBlur = isLast ? 30 : 10;
            ctx.shadowColor = isLast ? '#ff00ff' : 'var(--accent-color)';

            ctx.fillStyle = isLast ? '#fff' : 'var(--accent-color)';
            ctx.beginPath();
            ctx.arc(node.x, node.y, isLast ? 8 : 5, 0, Math.PI * 2);
            ctx.fill();

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

            if (isLast) {
                ctx.fillStyle = 'rgba(0, 242, 255, 0.5)';
                ctx.fillText("(L-CLICK: OBSERVE | R-CLICK: CUT)", node.x, node.y + 38);
            }
        });
    }
}

window.addEventListener('load', () => {
    new QuantumNarrativeEngine(STORY_DATA);
});
