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
    const welcomeText = "Booting sequence initiated... \nConnecting to Arch Linux subsystem... \nWelcome to Seif's interactive portfolio. \nType 'help' to see available commands.";
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
        'help': 'Available commands: <br> - <span class="highlight">whoami</span>: Display user info <br> - <span class="highlight">stats</span>: Show machine solve counts <br> - <span class="highlight">projects</span>: List current projects <br> - <span class="highlight">writeups</span>: Access technical logs and blogs <br> - <span class="highlight">clear</span>: Clear terminal output',
        
        'whoami': 'Seif. Computer Science & Statistics student at Helwan University. Penetration tester in training, aiming for my first bug bounty by May 2026. Living in the terminal.',
        
        'stats': 'Machines Pwned: <span class="highlight">15+</span> (Hack The Box, TryHackMe, VulnHub).',
        
        'projects': '1. Enterprise Active Directory Deployment (Self-hosted real-world server) <br> 2. Chatbot Architecture (Graduation project focusing on modern dev ops)',
        
        'writeups': 'Accessing secure logs... <br> - <a href="https://medium.com/@YOUR_MEDIUM" target="_blank" class="highlight">[ Read all my CTF Write-ups on Medium ]</a>',

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
});document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('terminal-input');
    const terminalBody = document.getElementById('terminal-body');

    // Clear the HTML welcome message so we can type it with JS
    terminalBody.innerHTML = ''; 

    // The typing animation function
    const welcomeText = "Booting sequence initiated... \nWelcome. \nType 'help' to see available commands.";
    let i = 0;
    
    function typeWriter() {
        if (i < welcomeText.length) {
            if (welcomeText.charAt(i) === '\n') {
                terminalBody.innerHTML += '<br>';
            } else {
                terminalBody.innerHTML += welcomeText.charAt(i);
            }
            // Highlight the word 'help' after it finishes typing
            if (i === welcomeText.length - 1) {
                terminalBody.innerHTML = terminalBody.innerHTML.replace("'help'", "<span class='highlight'>'help'</span>");
            }
            i++;
            setTimeout(typeWriter, 30); // Speed of typing in milliseconds
        }
    }

    // Start typing animation on load
    typeWriter();

    // Command responses (Updated with writeups)
    const commands = {
        'help': 'Available commands: <br> - <span class="highlight">whoami</span>: Display user info <br> - <span class="highlight">stats</span>: Show machine solve counts <br> - <span class="highlight">projects</span>: List current projects <br> - <span class="highlight">writeups</span>: Access technical logs and blogs <br> - <span class="highlight">clear</span>: Clear terminal output',
        
        'whoami': 'Seif. Computer Science & Statistics student at Helwan University. Penetration tester in training, aiming for my first bug bounty by May 2026. Living in the terminal.',
        
        'stats': 'Machines Pwned: <span class="highlight">15+</span> (Hack The Box, TryHackMe, VulnHub).',
        
        'projects': '1. Enterprise Active Directory Deployment (Self-hosted real-world server) <br> 2. Chatbot Architecture (Graduation project focusing on modern dev ops)',
        
        'writeups': 'Accessing secure logs... <br> - <a href="#" target="_blank" class="highlight">Active Directory Lab Setup</a> <br> - <a href="#" target="_blank" class="highlight">TryHackMe Walkthroughs</a>',

        'clear': ''
    };

    inputField.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const inputVal = inputField.value.trim().toLowerCase();
            
            if (inputVal === '') return;

            // Echo the command typed by the user
            const echoLine = document.createElement('p');
            echoLine.innerHTML = `<span class="prompt">seif@guest:~$</span> ${inputVal}`;
            terminalBody.appendChild(echoLine);

            // Process the command
            if (inputVal === 'clear') {
                terminalBody.innerHTML = '';
            } else if (commands[inputVal]) {
                const responseLine = document.createElement('p');
                responseLine.innerHTML = commands[inputVal];
                terminalBody.appendChild(responseLine);
            } else {
                const errorLine = document.createElement('p');
                errorLine.innerHTML = `bash: ${inputVal}: command not found. Type <span class="highlight">'help'</span>.`;
                terminalBody.appendChild(errorLine);
            }

            // Clear input and scroll to bottom
            inputField.value = '';
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    });

    // Keep focus on input when clicking anywhere in the terminal
    document.querySelector('.terminal-container').addEventListener('click', () => {
        inputField.focus();
    });
});
