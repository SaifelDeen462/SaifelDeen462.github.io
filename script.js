document.addEventListener('DOMContentLoaded', () => {

    /* ─────────────────────────────────────
       2. MATRIX RAIN CANVAS
    ───────────────────────────────────── */
    const canvas  = document.getElementById('matrix-canvas');
    const ctx     = canvas.getContext('2d');
    const CHARS   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+{}|<>?/\\;:[]~`ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ';
    const FONT_SZ = 14;
    let cols, drops;

    function resizeCanvas() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        cols  = Math.floor(canvas.width / FONT_SZ);
        drops = Array(cols).fill(1).map(() => Math.random() * -50);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function drawMatrix() {
        // Semi-transparent black trail — lower = longer trails
        ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drops.forEach((y, i) => {
            const char = CHARS[Math.floor(Math.random() * CHARS.length)];
            const x = i * FONT_SZ;
            // Bright white-green head
            if (Math.random() > 0.95) {
                ctx.fillStyle = '#ccffdd';
                ctx.shadowColor = '#00ff41';
                ctx.shadowBlur = 8;
            } else {
                // Gradient: bright near head, dim further up
                const brightness = Math.random() * 0.5 + 0.2;
                ctx.fillStyle = `rgba(0, 255, 65, ${brightness})`;
                ctx.shadowColor = 'transparent';
                ctx.shadowBlur = 0;
            }
            ctx.font = FONT_SZ + 'px Fira Code, monospace';
            ctx.fillText(char, x, y * FONT_SZ);

            if (y * FONT_SZ > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i] += 0.6;
        });
        ctx.shadowBlur = 0;
    }
    setInterval(drawMatrix, 40);

    /* ─────────────────────────────────────
       3. LIVE CLOCK
    ───────────────────────────────────── */
    function updateClock() {
        const now = new Date();
        const str = now.toLocaleTimeString('en-GB', { hour12: false }) + ' UTC';
        document.getElementById('live-time').textContent = str;
    }
    updateClock();
    setInterval(updateClock, 1000);

    /* ─────────────────────────────────────
       4. TYPEWRITER HERO
    ───────────────────────────────────── */
    const phrases = [
        'Penetration Tester',
        'CTF Enthusiast',
        'Arch Linux User',
        'Ethical Hacker',
        'Network Engineer',
    ];
    let pIdx = 0, cIdx = 0, deleting = false;
    const tw = document.getElementById('typewriter-text');

    function typeLoop() {
        const phrase = phrases[pIdx];
        if (!deleting) {
            tw.textContent = phrase.slice(0, ++cIdx);
            if (cIdx === phrase.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
        } else {
            tw.textContent = phrase.slice(0, --cIdx);
            if (cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; }
        }
        setTimeout(typeLoop, deleting ? 55 : 90);
    }
    setTimeout(typeLoop, 1000);

    /* ─────────────────────────────────────
       5. SCROLL REVEAL
    ───────────────────────────────────── */
    function reveal() {
        document.querySelectorAll('.reveal').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 80) {
                el.classList.add('active');
                animateBarsIfNeeded(el);
                animateCountersIfNeeded(el);
            }
        });
    }
    window.addEventListener('scroll', reveal);
    reveal();

    /* ─────────────────────────────────────
       6. ANIMATED COUNTERS
    ───────────────────────────────────── */
    const countedEls = new Set();
    function animateCountersIfNeeded(el) {
        el.querySelectorAll('.stat-num[data-target]').forEach(num => {
            if (countedEls.has(num)) return;
            countedEls.add(num);
            const target = parseInt(num.dataset.target);
            let cur = 0;
            const step = Math.ceil(target / 30);
            const timer = setInterval(() => {
                cur = Math.min(cur + step, target);
                num.textContent = cur;
                if (cur >= target) clearInterval(timer);
            }, 50);
        });
    }

    /* ─────────────────────────────────────
       7. SKILL PROGRESS BARS
    ───────────────────────────────────── */
    const animatedBars = new Set();
    function animateBarsIfNeeded(el) {
        el.querySelectorAll('.bar-fill[data-width]').forEach(bar => {
            if (animatedBars.has(bar)) return;
            animatedBars.add(bar);
            setTimeout(() => { bar.style.width = bar.dataset.width; }, 200);
        });
    }

    /* ─────────────────────────────────────
       8. RANDOM GLITCH FLASH
    ───────────────────────────────────── */
    const glitchOverlay = document.getElementById('glitch-overlay');
    function triggerGlitch() {
        glitchOverlay.style.opacity   = '1';
        glitchOverlay.style.background = `rgba(${Math.random()>0.5?255:0},${Math.random()>0.5?255:0},${Math.random()>0.5?255:0},0.03)`;
        glitchOverlay.style.transform = `translateX(${(Math.random()-0.5)*6}px)`;
        setTimeout(() => {
            glitchOverlay.style.opacity   = '0';
            glitchOverlay.style.transform = 'none';
        }, 80);
        setTimeout(triggerGlitch, Math.random() * 8000 + 4000);
    }
    setTimeout(triggerGlitch, 3000);

    /* ─────────────────────────────────────
       9. TERMINAL
    ───────────────────────────────────── */
    const input  = document.getElementById('terminal-input');
    const body   = document.getElementById('terminal-body');
    const history = [];
    let histIdx = -1;

    const commands = {
        help: `Available commands:<br>
  <span class="highlight">whoami</span>     — user profile<br>
  <span class="highlight">stats</span>      — machine solve counts<br>
  <span class="highlight">projects</span>   — active projects<br>
  <span class="highlight">certs</span>      — certifications<br>
  <span class="highlight">skills</span>     — technical skills<br>
  <span class="highlight">writeups</span>   — Medium blog & CTF logs<br>
  <span class="highlight">contact</span>    — social links<br>
  <span class="highlight">clear</span>      — clear terminal<br>
  <span class="highlight">matrix</span>     — toggle matrix rain`,

        whoami: `<span class="highlight">Seif El-Deen</span> — Penetration Tester<br>
B.Sc. Computer Science & Statistics · Helwan University<br>
Living in the terminal. Arch Linux. Coffee-fueled.`,

        stats: `Machines Pwned: <span class="highlight">15+</span><br>
Platforms: Hack The Box · TryHackMe · VulnHub<br>
Focus: Web · AD · PrivEsc`,

        projects: `<span class="highlight">[1]</span> Enterprise Active Directory Lab (Win Server, DNS/DHCP, GPO)<br>
<span class="highlight">[2]</span> AI Chatbot — Graduation project (RAG + intent modeling)<br>
<span class="highlight">[3]</span> Custom Recon Automation Script (Bash/Python)<br>
<span class="highlight">[4]</span> This portfolio (hand-crafted, no templates)`,

        certs: `<span class="highlight">[✓]</span> Certified Ethical Hacker CEH v13 — RaiseUP<br>
<span class="highlight">[✓]</span> CCNA 200-301 — RaiseUP<br>
<span class="highlight">[✓]</span> Exploitation & Penetration Testing w/ Metasploit — IBM`,

        skills: `<span class="highlight">Offensive:</span>  Recon · Web Exploitation · PrivEsc · Post-Exploitation<br>
<span class="highlight">Tools:</span>     Nmap · Burp Suite · Metasploit · Hydra · Gobuster · FFUF<br>
<span class="highlight">Dev:</span>       Python · Bash · Prompt Engineering · RAG<br>
<span class="highlight">Infra:</span>     Windows AD · DNS · DHCP · Group Policy`,

        writeups: `<a href="https://medium.com/@seifeldeenhamouda" target="_blank" class="highlight">→ medium.com/@seifeldeenhamouda</a><br>
CTF write-ups · AD lab configs · security tool breakdowns`,

        contact: `<span class="highlight">GitHub:</span>   <a href="https://github.com/SaifelDeen462" target="_blank" class="highlight">github.com/SaifelDeen462</a><br>
<span class="highlight">LinkedIn:</span> <a href="https://linkedin.com/in/saif-el-deen-b56b02382" target="_blank" class="highlight">linkedin.com/in/saif-el-deen-b56b02382</a><br>
<span class="highlight">Medium:</span>   <a href="https://medium.com/@seifeldeenhamouda" target="_blank" class="highlight">medium.com/@seifeldeenhamouda</a>`,

        matrix: 'Toggling matrix rain...',
        clear: '',
    };

    // Boot sequence
    const boot = [
        '[ OK ] Kernel loaded',
        '[ OK ] Network interface up',
        '[ OK ] Firewall rules applied',
        '[ !! ] Unidentified guest detected',
        '[ >> ] Spawning restricted shell...',
        '',
        "Type <span class='highlight'>'help'</span> to see available commands.",
    ];

    let bi = 0;
    function printBoot() {
        if (bi >= boot.length) return;
        const p = document.createElement('p');
        p.innerHTML = boot[bi++];
        body.appendChild(p);
        body.scrollTop = body.scrollHeight;
        setTimeout(printBoot, 160);
    }
    printBoot();

    function printLine(html, color) {
        const p = document.createElement('p');
        p.innerHTML = html;
        if (color) p.style.color = color;
        body.appendChild(p);
        body.scrollTop = body.scrollHeight;
    }

    let matrixVisible = true;
    input.addEventListener('keydown', e => {
        if (e.key === 'ArrowUp') {
            if (histIdx < history.length - 1) histIdx++;
            input.value = history[histIdx] || '';
            e.preventDefault();
        }
        if (e.key === 'ArrowDown') {
            if (histIdx > 0) histIdx--;
            input.value = history[histIdx] || '';
            e.preventDefault();
        }
    });

    input.addEventListener('keypress', e => {
        if (e.key !== 'Enter') return;
        const val = input.value.trim().toLowerCase();
        if (!val) return;

        history.unshift(val);
        histIdx = -1;

        printLine(`<span class="prompt" style="font-size:0.88rem;color:#00ff41;text-shadow:0 0 6px #00ff41">seif@guest:~$&nbsp;</span>${escapeHtml(val)}`);

        if (val === 'clear') {
            body.innerHTML = '';
        } else if (val === 'matrix') {
            matrixVisible = !matrixVisible;
            canvas.style.opacity = matrixVisible ? '1' : '0';
            printLine(matrixVisible ? '[ OK ] Matrix rain enabled.' : '[ OK ] Matrix rain disabled.');
        } else if (val === 'sudo') {
            printLine('Permission denied. This incident has been logged.', '#ff4d4d');
        } else if (val === 'sudo su' || val === 'sudo -i') {
            printLine('[sudo] password for seif: <br>Sorry, try again.<br>seif is not in the sudoers file.', '#ff4d4d');
        } else if (commands[val] !== undefined) {
            if (commands[val]) printLine(commands[val]);
        } else {
            printLine(`bash: <span style="color:#ff4d4d">${escapeHtml(val)}</span>: command not found. Type <span class="highlight">'help'</span>.`);
        }

        input.value = '';
        body.scrollTop = body.scrollHeight;
    });

    document.querySelector('.terminal-container').addEventListener('click', () => input.focus());

    function escapeHtml(str) {
        return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }


});
