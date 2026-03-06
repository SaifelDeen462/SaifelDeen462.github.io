document.addEventListener('DOMContentLoaded', () => {
    
    /* --- 1. SCROLL REVEAL ANIMATION --- */
    function reveal() {
        var reveals = document.querySelectorAll(".reveal");
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 100; // how many pixels before it triggers

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            }
        }
    }
    window.addEventListener("scroll", reveal);
    reveal(); // Trigger once on load

    /* --- 2. TERMINAL LOGIC --- */
    const inputField = document.getElementById('terminal-input');
    const terminalBody = document.getElementById('terminal-body');

    terminalBody.innerHTML = ''; 

    // The typing animation function
    const welcomeText = "Booting sequence initiated... \nConnecting to Arch Linux subsystem... \nWelcome. \nType 'help' to see available commands.";
    let i = 0;
    
    function typeWriter() {
        if (i < welcomeText.length) {
            if (welcomeText.charAt(i) === '\n') {
                terminalBody.innerHTML += '<br>';
            } else {
                terminalBody.innerHTML += welcomeText.charAt(i);
            }
            if (i === welcomeText.length - 1) {
                terminalBody.innerHTML = terminalBody.innerHTML.replace("'help'", "<span class='highlight'>'help'</span>");
            }
            i++;
            setTimeout(typeWriter, 30);
        }
    }

    typeWriter();

    // Command responses
    const commands = {
        'help': 'Available commands: <br> - <span class="highlight">whoami</span>: Display user info <br> - <span class="highlight">stats</span>: Show machine solve counts <br> - <span class="highlight">projects</span>: List current projects <br> - <span class="highlight">certs</span>: Display active certifications <br> - <span class="highlight">writeups</span>: Access technical logs and blogs <br> - <span class="highlight">clear</span>: Clear terminal output',
        
        'whoami': 'Seif. Computer Science & Statistics  at Helwan University. Penetration tester  , Living in the terminal.',
        
        'stats': 'Machines Pwned: <span class="highlight">15+</span> (Hack The Box, TryHackMe, VulnHub).',
        
        'projects': '1. Enterprise Active Directory Deployment (Self-hosted real-world server) <br> 2. Chatbot Architecture (Graduation project focusing on modern dev ops)',

        'certs': '<span class="highlight">[ Certified ]</span> Certified Ethical Hacker (CEH v13) - RaiseUP <br> <span class="highlight">[ Certified ]</span> CCNA (200-301) - RaiseUP <br> <span class="highlight">[ Certified ]</span> Exploitation & Penetration Testing with Metasploit - IBM',
        
        'writeups': 'Accessing secure logs... <br> - <a href="https://medium.com/@seifeldeenhamouda" target="_blank" class="highlight">[ Read all my CTF Write-ups on Medium ]</a>',

        'clear': ''
    };

    inputField.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const inputVal = inputField.value.trim().toLowerCase();
            if (inputVal === '') return;

            const echoLine = document.createElement('p');
            echoLine.innerHTML = `<span class="prompt">seif@guest:~$</span> ${inputVal}`;
            terminalBody.appendChild(echoLine);

            if (inputVal === 'clear') {
                terminalBody.innerHTML = '';
            } else if (commands[inputVal]) {
                const responseLine = document.createElement('p');
                responseLine.innerHTML = commands[inputVal];
                terminalBody.appendChild(responseLine);
            } else if (inputVal === 'sudo') {
                const responseLine = document.createElement('p');
                responseLine.innerHTML = 'Nice try. This incident will be reported.';
                responseLine.style.color = '#ff5f56';
                terminalBody.appendChild(responseLine);
            } else {
                const errorLine = document.createElement('p');
                errorLine.innerHTML = `bash: ${inputVal}: command not found. Type <span class="highlight">'help'</span>.`;
                terminalBody.appendChild(errorLine);
            }

            inputField.value = '';
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    });

    document.querySelector('.terminal-container').addEventListener('click', () => {
        inputField.focus();
    });
});
