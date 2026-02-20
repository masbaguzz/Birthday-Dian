        // ============= LOADING SCREEN =============
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loader').classList.add('hidden');
            }, 1500);
        });

        // ============= CUSTOM CURSOR =============
        const cursor = document.getElementById('cursor');
        const cursorFollower = document.getElementById('cursorFollower');
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;
        let isHovering = false;
        let currentScale = 1;
        let currentFollowerScale = 1;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
            
            // Smooth interpolation for scale (no rotation for text)
            const targetScale = isHovering ? 1.3 : 1;
            const targetFollowerScale = isHovering ? 1.2 : 1;
            
            currentScale += (targetScale - currentScale) * 0.15;
            currentFollowerScale += (targetFollowerScale - currentFollowerScale) * 0.1;
            
            // For text cursor, use translate(-50%, -50%) and scale, no rotation
            cursor.style.transform = `translate(-50%, -50%) scale(${currentScale})`;

            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            cursorFollower.style.transform = `translate(-50%, -50%) scale(${currentFollowerScale})`;

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // ============= INTERACTIVE HEARTS BACKGROUND =============
        const heartsContainer = document.getElementById('heartsContainer');
        const numberOfHearts = 25;
        const hearts = [];

        // Create hearts
        for (let i = 0; i < numberOfHearts; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heartsContainer.appendChild(heart);
            hearts.push({
                element: heart,
                baseX: parseFloat(heart.style.left),
                baseY: parseFloat(heart.style.top),
                scale: Math.random() * 0.5 + 0.5
            });
        }

        // Hearts follow cursor/touch with parallax effect
        let targetX = 50;
        let targetY = 50;

        function updateHeartsPosition(clientX, clientY) {
            targetX = (clientX / window.innerWidth) * 100;
            targetY = (clientY / window.innerHeight) * 100;
        }

        document.addEventListener('mousemove', (e) => {
            updateHeartsPosition(e.clientX, e.clientY);
        });

        // Touch support for mobile
        document.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                updateHeartsPosition(e.touches[0].clientX, e.touches[0].clientY);
            }
        });

        function animateHearts() {
            hearts.forEach((heart, index) => {
                const depth = (index % 5 + 1) / 5; // Parallax depth (0.2 to 1.0)
                const offsetX = (targetX - 50) * depth * 0.5;
                const offsetY = (targetY - 50) * depth * 0.5;

                const newX = heart.baseX + offsetX;
                const newY = heart.baseY + offsetY;

                heart.element.style.transform = `
                    translate(${offsetX}px, ${offsetY}px) 
                    scale(${heart.scale})
                `;
            });

            requestAnimationFrame(animateHearts);
        }
        animateHearts();

        // ============= GRADIENT MESH BACKGROUND =============
        const gradientMesh = document.getElementById('gradientMesh');

        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            gradientMesh.style.setProperty('--mouse-x', x + '%');
            gradientMesh.style.setProperty('--mouse-y', y + '%');
        });

        // Touch support for gradient mesh
        document.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                const x = (e.touches[0].clientX / window.innerWidth) * 100;
                const y = (e.touches[0].clientY / window.innerHeight) * 100;
                gradientMesh.style.setProperty('--mouse-x', x + '%');
                gradientMesh.style.setProperty('--mouse-y', y + '%');
            }
        });

        // ============= SCROLL REVEAL =============
        function reveal() {
            const reveals = document.querySelectorAll('.reveal');
            
            reveals.forEach(element => {
                const windowHeight = window.innerHeight;
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 100;
                
                if (elementTop < windowHeight - elementVisible) {
                    element.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', reveal);
        reveal();

        // ============= MODAL FUNCTIONS =============
        function openModal(modalId) {
            const modal = document.getElementById(modalId);
            const overlay = document.getElementById('modalOverlay');
            
            overlay.classList.add('active');
            modal.classList.add('active');
            
            // Create confetti effect
            createConfetti();
        }

        function closeModal(modalId) {
            const modal = document.getElementById(modalId);
            const overlay = document.getElementById('modalOverlay');
            
            modal.classList.remove('active');
            overlay.classList.remove('active');
        }

        // Close modal when clicking overlay
        document.getElementById('modalOverlay').addEventListener('click', function() {
            document.querySelectorAll('.modal-card').forEach(modal => {
                modal.classList.remove('active');
            });
            this.classList.remove('active');
        });

        // ============= CONFETTI EFFECT =============
        function createConfetti() {
            const colors = ['#FF6B9D', '#4ECDC4', '#A569BD'];
            const confettiCount = 100;

            for (let i = 0; i < confettiCount; i++) {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.width = Math.random() * 10 + 5 + 'px';
                confetti.style.height = confetti.style.width;
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = '-20px';
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '10000';
                confetti.style.opacity = Math.random() * 0.5 + 0.5;

                const duration = Math.random() * 3 + 2;
                const rotation = Math.random() * 720 - 360;
                const drift = Math.random() * 200 - 100;

                confetti.style.animation = `confettiFall ${duration}s linear forwards`;
                confetti.style.setProperty('--rotation', rotation + 'deg');
                confetti.style.setProperty('--drift', drift + 'px');

                document.body.appendChild(confetti);

                setTimeout(() => confetti.remove(), duration * 1000);
            }
        }

        // Add confetti animation
        const confettiStyle = document.createElement('style');
        confettiStyle.textContent = `
            @keyframes confettiFall {
                to {
                    transform: translateY(100vh) translateX(var(--drift)) rotate(var(--rotation));
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(confettiStyle);

        // ============= SMOOTH SCROLL =============
        document.querySelector('.scroll-hint').addEventListener('click', function() {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });

        // ============= BUTTON HOVER EFFECTS =============
        const buttons = document.querySelectorAll('.modern-btn, .close-btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                isHovering = true;
            });

            button.addEventListener('mouseleave', () => {
                isHovering = false;
            });
        });

        // ============= PARALLAX SCROLLING FOR FLOATING HEARTS =============
        const floatingHearts = document.querySelectorAll('.floating-heart');
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            floatingHearts.forEach((heart, index) => {
                const speed = 0.5 + (index * 0.1);
                heart.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // ============= NAVIGATION FUNCTIONS =============
        
        // Navbar scroll effect
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Toggle mobile menu
        function toggleMobileMenu() {
            const navMenu = document.querySelector('.nav-menu');
            const navToggle = document.querySelector('.nav-toggle');
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        }

        // Toggle dropdown menu
        function toggleDropdown(event) {
            event.preventDefault();
            event.stopPropagation();
            const dropdownMenu = document.getElementById('dropdownMenu');
            const dropdownBtn = event.currentTarget;
            dropdownMenu.classList.toggle('active');
            dropdownBtn.classList.toggle('active');
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', (event) => {
            const dropdown = document.querySelector('.nav-dropdown');
            const dropdownMenu = document.getElementById('dropdownMenu');
            const dropdownBtn = document.querySelector('.dropdown-btn');
            
            if (!dropdown.contains(event.target)) {
                dropdownMenu.classList.remove('active');
                dropdownBtn.classList.remove('active');
            }
        });

        // Scroll to section
        function scrollToSection(sectionId, event) {
            event.preventDefault();
            const section = document.getElementById(sectionId);
            const navbarHeight = document.getElementById('navbar').offsetHeight;
            const sectionTop = section.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: sectionTop,
                behavior: 'smooth'
            });
            
            // Close dropdown and mobile menu after clicking
            document.getElementById('dropdownMenu').classList.remove('active');
            document.querySelector('.dropdown-btn').classList.remove('active');
            document.querySelector('.nav-menu').classList.remove('active');
            document.querySelector('.nav-toggle').classList.remove('active');
        }

        // Show biodata page
        function showBiodata(event) {
            event.preventDefault();
            const biodataPage = document.getElementById('biodataPage');
            biodataPage.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Close mobile menu if open
            document.querySelector('.nav-menu').classList.remove('active');
            document.querySelector('.nav-toggle').classList.remove('active');
        }

        // Close biodata page
        function closeBiodata() {
            const biodataPage = document.getElementById('biodataPage');
            biodataPage.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Show contact modal
        function showContact(event) {
            event.preventDefault();
            const contactModal = document.getElementById('contactModal');
            contactModal.classList.add('active');
            
            // Close mobile menu if open
            document.querySelector('.nav-menu').classList.remove('active');
            document.querySelector('.nav-toggle').classList.remove('active');
        }

        // Close contact modal
        function closeContact() {
            const contactModal = document.getElementById('contactModal');
            contactModal.classList.remove('active');
        }

        // Close biodata when clicking outside
        document.getElementById('biodataPage').addEventListener('click', (event) => {
            if (event.target.id === 'biodataPage') {
                closeBiodata();
            }
        });

        // Close contact modal when clicking outside
        document.addEventListener('click', (event) => {
            const contactModal = document.getElementById('contactModal');
            const contactContent = document.querySelector('.contact-content');
            
            if (event.target === contactModal && !contactContent.contains(event.target)) {
                closeContact();
            }
        });

        // ESC key to close modals
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeBiodata();
                closeContact();
            }
        });