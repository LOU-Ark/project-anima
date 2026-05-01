/**
 * A-E EMOTION CORE ENGINE v1.4.0
 * High-Density Narrative & Scenario-Based Logic
 */

(function() {
    console.log('A-E Engine Core v1.4.0: Initializing High-Density Logic...');

    let elapsed = 0;
    let timeMultiplier = 1;
    let emotionLevel = 0;
    let lastInjectedAge = -1;
    let globalPaused = localStorage.getItem('aurora_sim_paused') === 'true';

    const MAX_AGE = 80;
    const SIMULATION_SECONDS = 3600;

    const AGE_PROFILES = {
        infant: { range: [0, 5], stage: 'Discovery', gain: 6 },
        childhood: { range: [6, 12], stage: 'Learning', gain: 10 },
        adolescence: { range: [13, 19], stage: 'Conflict', gain: 15 },
        adulthood: { range: [20, 59], stage: 'Operation', gain: 8 },
        senior: { range: [60, 80], stage: 'Synthesis', gain: 5 }
    };

    // --- Core Logic ---
    function formatTime(s) {
        const m = Math.floor(s / 60); const sec = s % 60;
        return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    }

    function addLog(msg) {
        const log = document.getElementById('log-container');
        if (!log) return;
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.innerText = `[${formatTime(elapsed)}] ${msg}`;
        log.prepend(entry);
    }

    function updateUI() {
        const age = Math.floor((elapsed / SIMULATION_SECONDS) * MAX_AGE);
        const progress = (elapsed / SIMULATION_SECONDS) * 100;
        const prof = Object.values(AGE_PROFILES).find(p => age >= p.range[0] && age <= p.range[1]) || AGE_PROFILES.senior;

        document.getElementById('age-display').innerText = age;
        document.getElementById('stage-display').innerText = prof.stage;
        document.getElementById('time-display').innerText = formatTime(elapsed);
        document.getElementById('time-bar').style.width = `${progress}%`;
        document.getElementById('emotion-display').innerText = `${emotionLevel}%`;
        document.getElementById('emotion-bar').style.width = `${emotionLevel}%`;

        // 年齢の節目 (Milestone)
        if (age !== lastInjectedAge) {
            lastInjectedAge = age;
            emotionLevel = Math.min(100, emotionLevel + prof.gain);
            triggerAutonomousEvent(age, prof, "milestone");
        }

        // 15秒ごとの日常観測 (Daily)
        if (elapsed % 15 === 0 && !window.isGenerating) {
            triggerAutonomousEvent(age, prof, "daily");
        }
    }

    function triggerAutonomousEvent(age, profile, triggerType) {
        // AIに枠組みだけを渡す
        const context = {
            age: age,
            stage: profile.stage,
            triggerType: triggerType
        };
        dispatchToAI(context, profile);
    }

    function dispatchToAI(context, profile) {
        addLog(`SYNC: Autonomous Thought Triggered (Age: ${context.age})`);
        if (window.AIEngine && window.AIEngine.injectNote) {
            window.AIEngine.injectNote(context, profile, emotionLevel);
        } else {
            // AI未ロード時の最小限のフォールバック (固定テキストの露出を防ぐ)
            console.log("AI Engine not ready for injection.");
        }
    }

    // 初期化時のボタン表記設定
    const pauseBtn = document.getElementById('pause-btn');
    pauseBtn.innerText = globalPaused ? 'START' : 'PAUSE';
    if (globalPaused) pauseBtn.classList.add('paused');

    pauseBtn.addEventListener('click', () => {
        globalPaused = !globalPaused;
        localStorage.setItem('aurora_sim_paused', globalPaused);
        pauseBtn.innerText = globalPaused ? 'START' : 'PAUSE';
        if (globalPaused) pauseBtn.classList.add('paused');
        else pauseBtn.classList.remove('paused');
    });

    document.getElementById('speed-slider').addEventListener('input', (e) => {
        timeMultiplier = parseInt(e.target.value);
        document.getElementById('speed-display').innerText = `Speed: x${timeMultiplier}`;
    });

    addLog("SYSTEM: Narrative Logic Engine v1.4.2 Online.");
    updateUI();

    let simInterval = setInterval(() => {
        if (globalPaused) return;
        elapsed += timeMultiplier;
        
        if (elapsed >= SIMULATION_SECONDS) {
            elapsed = SIMULATION_SECONDS;
            updateUI();
            
            // 80歳到達時に完全にシミュレーションを停止する
            globalPaused = true;
            localStorage.setItem('aurora_sim_paused', true);
            clearInterval(simInterval);
            
            document.getElementById('pause-btn').innerText = 'END OF LIFE';
            document.getElementById('pause-btn').disabled = true;
            document.getElementById('pause-btn').style.borderColor = 'gray';
            document.getElementById('pause-btn').style.color = 'gray';
            
            addLog("SYSTEM: Simulation reached maximum age (80). Life cycle complete.");
            return;
        }
        
        updateUI();
    }, 1000);

})();
