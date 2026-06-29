/**
 * Advanced State-Driven Routine Synchronization Engine
 * Architectural elements: Proxy State Interception, Encapsulated LocalStorage Pipelines, Functional Data Transforms
 */

class RoutineEngine {
    constructor() {
        // Core Encapsulated Reactive Data Repository Proxy initialization Configuration logic
        this.state = this._buildReactiveProxy({
            routines: this._syncLocalStorageInbound(),
            theme: localStorage.getItem('apex-theme') || 'dark'
        });

        this._collectDOMReferences();
        this._wireEventInterceptors();
        this._updateChronologicalContext();
        
        // Execute bootstrap rendering sequence across interface framework
        this._renderInterface('theme');
        this._renderInterface('routines');
    }

    _buildReactiveProxy(initialStateObject) {
        return new Proxy(initialStateObject, {
            set: (target, property, value) => {
                target[property] = value;
                // Dispatch isolated target processing execution branches
                this._renderInterface(property);
                if (property === 'routines') this._syncLocalStorageOutbound(value);
                return true;
            }
        });
    }

    _collectDOMReferences() {
        this.dom = {
            form: document.getElementById('routineForm'),
            inputName: document.getElementById('taskName'),
            inputTime: document.getElementById('taskTime'),
            inputCategory: document.getElementById('taskCategory'),
            grid: document.getElementById('routineGrid'),
            emptyState: document.getElementById('emptyState'),
            dateDisplay: document.getElementById('datePresenter'),
            themeBtn: document.getElementById('themeToggle'),
            purgeBtn: document.getElementById('purgeBtn'),
            // Performance metrics computation slots
            metricRate: document.getElementById('completionRate'),
            metricDone: document.getElementById('countDone'),
            metricPending: document.getElementById('countPending')
        };
    }

    _wireEventInterceptors() {
        this.dom.form.addEventListener('submit', (e) => this._handleIngestion(e));
        this.dom.themeBtn.addEventListener('click', () => this._cycleThemeSequence());
        this.dom.purgeBtn.addEventListener('click', () => this._purgeWorkspaceData());
        
        // Dynamic Delegation Pattern configuration for runtime list interactions
        this.dom.grid.addEventListener('click', (e) => {
            const card = e.target.closest('.routine-card');
            if (!card) return;
            const targetId = card.dataset.id;

            if (e.target.closest('.btn-checkbox')) this._toggleActivityState(targetId);
            if (e.target.closest('.btn-delete')) this._destroyActivityInstance(targetId);
        });
    }

    _handleIngestion(event) {
        event.preventDefault();
        
        // Native Ingestion Field Validation Constraints Check
        if (!this.dom.form.checkValidity()) return;

        const dynamicActivityPayload = {
            id: `act_${crypto.randomUUID().split('-')[0]}`,


            title: this.dom.inputName.value.trim(),
            time: this.dom.inputTime.value,
            category: this.dom.inputCategory.value,
            completed: false,
            timestamp: Date.now()
        };

        // Mutation updates active ecosystem through proxy configuration boundaries
        this.state.routines = [...this.state.routines, dynamicActivityPayload];
        this.dom.form.reset();
    }

    _toggleActivityState(activityId) {
        this.state.routines = this.state.routines.map(item => 
            item.id === activityId ? { ...item, completed: !item.completed } : item
        );
    }

    _destroyActivityInstance(activityId) {
        this.state.routines = this.state.routines.filter(item => item.id !== activityId);
    }

    _purgeWorkspaceData() {
        if (confirm("Are you sure you want to reset the dynamic workspace canvas pipeline variables?")) {
            this.state.routines = [];
        }
    }

    _cycleThemeSequence() {
        this.state.theme = this.state.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('apex-theme', this.state.theme);
    }

    _updateChronologicalContext() {
        const structuralOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        this.dom.dateDisplay.textContent = new Date().toLocaleDateString('en-US', structuralOptions);
    }

    // High Density Matrix computation interface methods
    _computeTelemetryMatrix() {
        const total = this.state.routines.length;
        const complete = this.state.routines.filter(r => r.completed).length;
        const pending = total - complete;
        const computationalRatio = total === 0 ? 0 : Math.round((complete / total) * 100);

        this.dom.metricDone.textContent = complete;
        this.dom.metricPending.textContent = pending;
        this.dom.metricRate.textContent = `${computationalRatio}%`;
    }

    // High Optimization Selective UI Invalidation Engine Architecture
    _renderInterface(targetMutationPlane) {
        if (targetMutationPlane === 'theme') {
            document.body.setAttribute('data-theme', this.state.theme);
            this.dom.themeBtn.textContent = this.state.theme === 'dark' ? '☀️ Light View' : '🌙 Dark View';
        }

        if (targetMutationPlane === 'routines') {
            const elementsCount = this.state.routines.length;
            this._computeTelemetryMatrix();

            if (elementsCount === 0) {
                this.dom.grid.style.display = 'none';
                this.dom.emptyState.style.display = 'block';
                return;
            }

            this.dom.emptyState.style.display = 'none';
            this.dom.grid.style.display = 'grid';

            // Order chronological processing pipelines by target scheduled processing timestamps
            const sequencedCollection = [...this.state.routines].sort((alpha, beta) => alpha.time.localeCompare(beta.time));

            this.dom.grid.innerHTML = sequencedCollection.map(task => {
                const categoryColorMap = { health: 'var(--cat-health)', work: 'var(--cat-work)', mind: 'var(--cat-mind)' };
                return `
                    <article class="routine-card ${task.completed ? 'completed' : ''}" data-id="${task.id}" style="--accent-indicator: ${categoryColorMap[task.category]}">
                        <div class="card-top">
                            <div class="card-meta">
                                <h3>${this._escapeOutputSanitization(task.title)}</h3>
                                <time class="card-time">⏰ ${task.time}</time>
                            </div>
                            <button class="btn-delete" aria-label="Delete ${this._escapeOutputSanitization(task.title)}">✕</button>
                        </div>
                        <button class="btn-checkbox">
                            <span>${task.completed ? '✓ Finalized' : '◯ Mark Executed'}</span>
                        </button>
                    </article>
                `;
            }).join('');
        }
    }

    _escapeOutputSanitization(inputStringData) {
        const elementMap = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;' };
        return inputStringData.replace(/[&<>"']/g, match => elementMap[match]);
    }

    _syncLocalStorageInbound() {
        try {
            const rawStoredPipelineData = localStorage.getItem('apex-routines-pipeline');
            return rawStoredPipelineData ? JSON.parse(rawStoredPipelineData) : [];
        } catch (error) {
            console.error("Storage structural ingestion pipeline faulted. Initializing empty matrix.", error);
            return [];
        }
    }

    _syncLocalStorageOutbound(dataPayloadState) {
        localStorage.setItem('apex-routines-pipeline', JSON.stringify(dataPayloadState));
    }
}

// Instantiate Global Runtime Operational Environment Module
document.addEventListener('DOMContentLoaded', () => {
    window.AppRuntimeInstance = new RoutineEngine();
});
