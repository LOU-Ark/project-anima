/**
 * Aurora Notes - App Logic
 * Governance: Governance First, Systematic Solution
 */

class AuroraNotes {
    constructor() {
        this.notes = JSON.parse(localStorage.getItem('aurora_notes')) || [];
        this.currentFilter = '';
        
        this.initElements();
        this.initEvents();
        this.render();
    }

    initElements() {
        this.grid = document.getElementById('notes-grid');
        this.searchInput = document.getElementById('search-input');
        this.trigger = document.getElementById('new-note-trigger');
        this.editor = document.getElementById('note-editor');
        this.titleInput = document.getElementById('editor-title');
        this.contentInput = document.getElementById('editor-content');
        this.saveBtn = document.getElementById('save-note');
        this.cancelBtn = document.getElementById('cancel-note');
        this.ghostToggle = document.getElementById('ghost-toggle');
    }

    initEvents() {
        // Search
        this.searchInput.addEventListener('input', (e) => {
            this.currentFilter = e.target.value.toLowerCase();
            this.render();
        });

        // Toggle Editor
        this.trigger.addEventListener('click', () => this.showEditor());
        this.cancelBtn.addEventListener('click', () => this.hideEditor());

        // Save
        this.saveBtn.addEventListener('click', () => this.addNote());

        // Keyboard support
        this.editor.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') this.addNote();
        });

        // Ghost Mode Toggle
        if (this.ghostToggle) {
            this.ghostToggle.addEventListener('change', (e) => {
                if (e.target.checked) {
                    // Open Ghost Simulator in a popup window
                    window.open('../ghost/index.html', 'GhostSimulator', 'width=900,height=700,resizable=yes');
                }
            });
        }

        // Clear All Notes
        const clearBtn = document.getElementById('clear-all-notes-btn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (confirm('すべてのメモデータを完全に削除しますか？')) {
                    localStorage.removeItem('aurora_notes');
                    this.notes = [];
                    this.render();
                }
            });
        }

        // Global Pause Toggle
        const globalPauseBtn = document.getElementById('global-pause-btn');
        if (globalPauseBtn) {
            let isPaused = localStorage.getItem('aurora_sim_paused') === 'true';
            globalPauseBtn.innerText = isPaused ? 'START' : 'PAUSE';
            if (isPaused) globalPauseBtn.style.color = 'var(--neon-gold)';
            
            globalPauseBtn.addEventListener('click', () => {
                isPaused = !isPaused;
                localStorage.setItem('aurora_sim_paused', isPaused);
                globalPauseBtn.innerText = isPaused ? 'START' : 'PAUSE';
                if (isPaused) {
                    globalPauseBtn.style.color = 'var(--neon-gold)';
                    globalPauseBtn.style.borderColor = 'var(--neon-gold)';
                } else {
                    globalPauseBtn.style.color = 'var(--neon-pink)';
                    globalPauseBtn.style.borderColor = 'var(--neon-pink)';
                }
            });
            
            // 他のウィンドウでの変更を監視
            window.addEventListener('storage', (e) => {
                if (e.key === 'aurora_sim_paused') {
                    isPaused = e.newValue === 'true';
                    globalPauseBtn.innerText = isPaused ? 'START' : 'PAUSE';
                    if (isPaused) {
                        globalPauseBtn.style.color = 'var(--neon-gold)';
                        globalPauseBtn.style.borderColor = 'var(--neon-gold)';
                    } else {
                        globalPauseBtn.style.color = 'var(--neon-pink)';
                        globalPauseBtn.style.borderColor = 'var(--neon-pink)';
                    }
                }
            });
        }

        // Auto-sync notes when modified in another window (Ghost Simulator)
        window.addEventListener('storage', (e) => {
            if (e.key === 'aurora_notes') {
                const newNotes = JSON.parse(e.newValue) || [];
                if (newNotes.length > this.notes.length && newNotes[0].id !== (this.notes[0] ? this.notes[0].id : null)) {
                    const addedNote = newNotes[0];
                    this.animateGhostTyping(addedNote, newNotes);
                } else {
                    this.notes = newNotes;
                    this.render();
                }
            }
        });
    }

    showEditor() {
        this.trigger.style.display = 'none';
        this.editor.style.display = 'block';
        this.titleInput.focus();
    }

    hideEditor() {
        this.trigger.style.display = 'block';
        this.editor.style.display = 'none';
        this.titleInput.value = '';
        this.contentInput.value = '';
    }

    addNote() {
        const title = this.titleInput.value.trim();
        const content = this.contentInput.value.trim();

        if (!title && !content) {
            this.hideEditor();
            return;
        }

        const newNote = {
            id: Date.now(),
            title: title || '無題のメモ',
            content,
            color: this.getRandomAuroraColor(),
            createdAt: new Date().toISOString()
        };

        this.notes.unshift(newNote);
        this.saveToStorage();
        this.render();
        this.hideEditor();
    }

    async animateGhostTyping(note, newNotesArray) {
        if (this.isAnimating) {
            this.notes = newNotesArray;
            this.render();
            return;
        }
        this.isAnimating = true;

        let cursor = document.getElementById('ghost-cursor');
        if (!cursor) {
            cursor = document.createElement('div');
            cursor.id = 'ghost-cursor';
            cursor.style.cssText = "position: fixed; top: 0; left: 0; width: 24px; height: 24px; background: url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22%23f067ff%22 stroke=%22white%22 stroke-width=%221%22><path d=%22M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L5.5 3.21z%22/></svg>') no-repeat center center; background-size: contain; z-index: 9999; pointer-events: none; opacity: 0; transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease;";
            document.body.appendChild(cursor);
        }

        // 念のためエディタを閉じておく（ユーザーが開いている場合との競合回避）
        this.hideEditor();

        cursor.style.opacity = '1';
        cursor.style.transform = `translate(calc(100vw - 50px), calc(100vh - 50px))`;
        
        await new Promise(r => setTimeout(r, 100));

        // Move to trigger
        const triggerRect = this.trigger.getBoundingClientRect();
        cursor.style.transform = `translate(${triggerRect.left + 50}px, ${triggerRect.top + 20}px)`;
        
        await new Promise(r => setTimeout(r, 600));

        // Click trigger
        cursor.style.transform = `translate(${triggerRect.left + 50}px, ${triggerRect.top + 20}px) scale(0.8)`;
        await new Promise(r => setTimeout(r, 100));
        cursor.style.transform = `translate(${triggerRect.left + 50}px, ${triggerRect.top + 20}px) scale(1)`;
        
        this.showEditor();
        this.titleInput.value = '';
        this.contentInput.value = '';
        
        await new Promise(r => setTimeout(r, 400));
        
        // Move to title input
        const titleRect = this.titleInput.getBoundingClientRect();
        cursor.style.transform = `translate(${titleRect.left + 20}px, ${titleRect.top + 10}px)`;
        await new Promise(r => setTimeout(r, 400));
        
        // Type title
        await this.typeText(this.titleInput, note.title, 50);
        
        // Move to content input
        const contentRect = this.contentInput.getBoundingClientRect();
        cursor.style.transform = `translate(${contentRect.left + 20}px, ${contentRect.top + 20}px)`;
        await new Promise(r => setTimeout(r, 300));
        
        // Type content
        await this.typeText(this.contentInput, note.content, 25);
        
        // Move to save button
        const saveRect = this.saveBtn.getBoundingClientRect();
        cursor.style.transform = `translate(${saveRect.left + 20}px, ${saveRect.top + 10}px)`;
        await new Promise(r => setTimeout(r, 400));
        
        // Click save
        cursor.style.transform = `translate(${saveRect.left + 20}px, ${saveRect.top + 10}px) scale(0.8)`;
        this.saveBtn.style.transform = 'scale(0.95)';
        this.saveBtn.style.background = 'var(--neon-pink)';
        await new Promise(r => setTimeout(r, 150));
        
        cursor.style.transform = `translate(${saveRect.left + 20}px, ${saveRect.top + 10}px) scale(1)`;
        this.saveBtn.style.transform = 'none';
        this.saveBtn.style.background = 'var(--neon-purple)';
        
        // Render
        this.hideEditor();
        this.notes = newNotesArray;
        this.render();
        
        // Move cursor away and hide
        cursor.style.transform = `translate(calc(100vw - 50px), calc(100vh - 50px))`;
        cursor.style.opacity = '0';
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }

    typeText(element, text, speed) {
        return new Promise(resolve => {
            let i = 0;
            const timer = setInterval(() => {
                element.value += text.charAt(i);
                if (element.tagName === 'TEXTAREA') {
                    element.scrollTop = element.scrollHeight;
                }
                i++;
                if (i >= text.length) {
                    clearInterval(timer);
                    resolve();
                }
            }, speed);
        });
    }

    deleteNote(id, cardElement) {
        cardElement.classList.add('removing');
        
        // Wait for animation to finish (0.3s)
        setTimeout(() => {
            this.notes = this.notes.filter(note => note.id !== id);
            this.saveToStorage();
            this.render();
        }, 300);
    }

    getRandomAuroraColor() {
        const colors = [
            'var(--neon-blue)',
            'var(--neon-purple)',
            'var(--neon-pink)',
            'var(--neon-green)',
            'transparent'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    saveToStorage() {
        localStorage.setItem('aurora_notes', JSON.stringify(this.notes));
    }

    render() {
        this.grid.innerHTML = '';
        
        const filteredNotes = this.notes.filter(note => 
            note.title.toLowerCase().includes(this.currentFilter) || 
            note.content.toLowerCase().includes(this.currentFilter)
        );

        filteredNotes.forEach(note => {
            const card = document.createElement('div');
            card.className = 'note-card glass glass-hover';
            if (note.color !== 'transparent') {
                card.style.borderTop = `4px solid ${note.color}`;
            }

            const emotionBadge = note.isGhost ? `<div style="font-size: 0.65rem; color: var(--neon-gold); margin-bottom: 8px; font-family: 'Fira Code', monospace;">[A-E EMOTION LEVEL: ${note.emotionLevel || 0}%]</div>` : '';
            card.innerHTML = `
                ${emotionBadge}
                <div class="note-title">${this.escapeHtml(note.title)}</div>
                <div class="note-content">${this.escapeHtml(note.content)}</div>
                <div style="margin-top: auto; display: flex; justify-content: flex-end; opacity: 0; transition: 0.3s;" class="card-actions">
                    <button class="delete-btn" style="background: transparent; border: none; color: #ef4444; cursor: pointer; font-size: 0.8rem;">削除</button>
                </div>
            `;

            // Hover actions
            card.addEventListener('mouseenter', () => card.querySelector('.card-actions').style.opacity = '1');
            card.addEventListener('mouseleave', () => card.querySelector('.card-actions').style.opacity = '0');

            // Delete event
            card.querySelector('.delete-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteNote(note.id, card);
            });

            this.grid.appendChild(card);
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    window.app = new AuroraNotes();
});
