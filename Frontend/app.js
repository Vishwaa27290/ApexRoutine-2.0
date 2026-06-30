/**
 * Advanced State-Driven Routine Synchronization Engine
 * Integrated with Spring Boot & MySQL REST API Framework
 */

class RoutineEngine {
    constructor() {
        this.apiUrl = 'http://localhost:8080/api/routines';
        
        this.state = this._buildReactiveProxy({
            routines: [],
            theme: localStorage.getItem('apex-theme') || 'dark'
        });

        this._collectDOMReferences();
        this._wireEventInterceptors();
        this._updateChronologicalContext(); // Runs first to ensure the date renders instantly
        
        this._renderInterface('theme');
        this._fetchRoutinesFromServer(); // Safely fetches backend data asynchronously
    }

    _buildReactiveProxy(initialStateObject) {
        return new Proxy(initialStateObject, {
            set: (target, property, value) => {
                target[property] = value;
                this._renderInterface(property);
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
            metricRate: document.getElementById('completionRate'),
            metricDone: document.getElementById('countDone'),
            metricPending: document.getElementById('countPending')
        };
    }

    _wireEventInterceptors() {
        this.dom.form.addEventListener('submit', (e) => this._handleIngestion(e));
        this.dom.themeBtn.addEventListener('click', () => this._cycleThemeSequence());
        this.dom.purgeBtn.addEventListener('click', () => this._purgeWorkspaceData());
        
        this.dom.grid.addEventListener('click', (e) => {
            const card = e.target.closest('.routine-card');
            if (!card) return;
            const targetId = card.dataset.id;

            if (e.target.closest('.btn-checkbox')) this._toggleActivityState(targetId);
            if (e.target.closest('.btn-delete')) this._destroyActivityInstance(targetId);
        });
    }

    async _fetchRoutinesFromServer() {
        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok) throw new Error("Server communication fault");
            this.state.routines = await response.json();
        } catch (error) {
            console.error("Failed fetching pipeline matrix from server:", error);
            this.state.routines = []; // Fallback empty state
        }
    }

    async _handleIngestion(event) {
        event.preventDefault();
        if (!this.dom.form.checkValidity()) return;

        const dynamicActivityPayload = {
            id: `act_${crypto.randomUUID().split('-')[0]}`,
            title: this.dom.inputName.value.trim(),
            time: this.dom.inputTime.value + ":00", // Standard localTime formatting mapping
            category: this.dom.inputCategory.value,
            completed: false,
            timestamp: Date.now()
        };

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dynamicActivityPayload)
            });
            if (!response.ok) throw new Error("Persistence error");
            const savedRoutine = await response.json();
            this.state.routines = [...this.state.routines, savedRoutine];
            this.dom.form.reset();
        } catch (error) {
            console.error("Persistence injection failure:", error);
        }
    }

    async _toggleActivityState(activityId) {
        try {
            const response = await fetch(`${this.apiUrl}/${activityId}/toggle`, { method: 'PATCH' });
            if (!response.ok) throw new Error("Toggle sync failure");
            const updatedRoutine = await response.json();
            this.state.routines = this.state.routines.map(item => 
                item.id === activityId ? updatedRoutine : item
            );
        } catch (error) {
            console.error("Failed setting active proxy element target state:", error);
        }
    }

    async _destroyActivityInstance(activityId) {
        try {
            const response = await fetch(`${this.apiUrl}/${activityId}`, { method: 'DELETE' });
            if (!response.ok) throw new Error("Deletion failure");
            this.state.routines = this.state.routines.filter(item => item.id !== activityId);
        } catch (error) {
            console.error("Purging routine target element failed:", error);
        }
    }

    async _purgeWorkspaceData() {
        if (confirm("Are you sure you want to reset the dynamic workspace canvas pipeline variables?")) {
            try {
                const response = await fetch(`${this.apiUrl}/purge`, { method: 'DELETE' });
                if (!response.ok) throw new Error("Purge failure");
                this.state.routines = [];
            } catch (error) {
                console.error("Purge operations crashed unexpectedly:", error);
            }
        }
    }

    _cycleThemeSequence() {
        this.state.theme = this.state.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('apex-theme', this.state.theme);
    }

    _updateChronologicalContext() {
        const structuralOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        if (this.dom && this.dom.dateDisplay) {
            this.dom.dateDisplay.textContent = new Date().toLocaleDateString('en-US', structuralOptions);
        }
    }

    _computeTelemetryMatrix() {
        const total = this.state.routines.length;
        const complete = this.state.routines.filter(r => r.completed).length;
        const pending = total - complete;
        const computationalRatio = total === 0 ? 0 : Math.round((complete / total) * 100);

        this.dom.metricDone.textContent = complete;
        this.dom.metricPending.textContent = pending;
        this.dom.metricRate.textContent = `${computationalRatio}%`;
    }

    _renderInterface(targetMutationPlane) {
        if (targetMutationPlane === 'theme') {
            document.body.setAttribute('data-theme', this.state.theme);
            this.dom.themeBtn.textContent = this.state.theme === 'dark' ? '☀️ Light View' : '🌙 Dark View';
        }

        if (targetMutationPlane === 'routines' && this.state.routines) {
            const elementsCount = this.state.routines.length;
            this._computeTelemetryMatrix();

            if (elementsCount === 0) {
                this.dom.grid.style.display = 'none';
                this.dom.emptyState.style.display = 'block';
                return;
            }

            this.dom.emptyState.style.display = 'none';
            this.dom.grid.style.display = 'grid';

            const sequencedCollection = [...this.state.routines].sort((alpha, beta) => {
                if (!alpha.time || !beta.time) return 0;
                return alpha.time.localeCompare(beta.time);
            });

            this.dom.grid.innerHTML = sequencedCollection.map(task => {
                const categoryColorMap = { health: 'var(--cat-health)', work: 'var(--cat-work)', mind: 'var(--cat-mind)' };
                const visibleTime = task.time ? task.time.substring(0, 5) : "--:--"; 
                return `
                    <article class="routine-card ${task.completed ? 'completed' : ''}" data-id="${task.id}" style="--accent-indicator: ${categoryColorMap[task.category] || 'var(--primary-glow)'}">
                        <div class="card-top">
                            <div class="card-meta">
                                <h3>${this._escapeOutputSanitization(task.title || '')}</h3>
                                <time class="card-time">⏰ ${visibleTime}</time>
                            </div>
                            <button class="btn-delete" aria-label="Delete ${this._escapeOutputSanitization(task.title || '')}">✕</button>
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
}

document.addEventListener('DOMContentLoaded', () => {
    window.AppRuntimeEngine = new RoutineEngine();
});