// Smooth Scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Countdown Timer
function initCountdown() {
    const weddingDate = new Date('2026-06-23T08:00:00').getTime();
    
    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            document.getElementById('countdown').innerHTML = 
                '<p style="font-size: 1.5rem; color: var(--gold);">Acara telah berlangsung!</p>';
            return;
        }

        const days = Math.floor(distance / (100 * 60 * 60 * 24));
        const hours = Math.floor((distance % (100 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (100 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (100 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// RSVP Form Handler
function initRSVPForm() {
    const form = document.getElementById('rsvpForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                attendance: document.getElementById('attendance').value,
                guests: document.getElementById('guests').value,
                message: document.getElementById('message').value
            };

            // Simulasi pengiriman data
            console.log('RSVP Data:', formData);
            
            // Tampilkan pesan terima kasih
            showThankYouMessage(formData.name);
            
            // Reset form
            form.reset();
        });
    }
}

function showThankYouMessage(name) {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
        padding: 40px;
        border-radius: 20px;
        border: 2px solid var(--gold);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
        z-index: 1000;
        text-align: center;
        max-width: 400px;
    `;
    
    message.innerHTML = `
        <h3 style="color: var(--gold); font-size: 2rem; margin-bottom: 1rem;">Terima Kasih!</h3>
        <p style="color: var(--off-white); line-height: 1.8;">
            Terima kasih ${name} atas konfirmasi kehadirannya. 
            Kami sangat menantikan kehadiran Anda di acara kami.
        </p>
        <button onclick="this.parentElement.remove()" style="
            background: linear-gradient(135deg, var(--gold) 0%, #b8941e 100%);
            color: var(--black);
            border: none;
            padding: 12px 30px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            border-radius: 50px;
            margin-top: 1.5rem;
        ">Tutup</button>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 5000);
}

// Scroll Animation
function initScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animasi elemen saat scroll
    const animatedElements = document.querySelectorAll('.event-card, .gallery-item, .wish-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// Parallax Effect untuk Hero Section
function initParallax() {
    const hero = document.querySelector('.hero-section');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = hero.querySelector('.content');
            if (parallax) {
                parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
                parallax.style.opacity = 1 - (scrolled / 800);
            }
        });
    }
}

// Music Player (optional)
let audioPlayer = null;
let isPlaying = false;

function initMusicPlayer() {
    // Anda bisa menambahkan audio player di sini
    audioPlayer = new Audio('kanjutWedding.mp3');
    
    const playButton = document.createElement('button');
    playButton.innerHTML = '🎵';
    playButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--gold) 0%, #b8941e 100%);
        color: var(--black);
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
        z-index: 999;
        transition: all 0.3s ease;
    `;
    
    playButton.addEventListener('click', () => {
        if (audioPlayer) {
            if (isPlaying) {
                audioPlayer.pause();
                playButton.innerHTML = '🎵';
            } else {
                audioPlayer.play();
                playButton.innerHTML = '⏸';
            }
            isPlaying = !isPlaying;
        }
    });
    
    // Uncomment untuk mengaktifkan tombol musik
    document.body.appendChild(playButton);
}

// Loading Animation
function initLoadingAnimation() {
    window.addEventListener('load', () => {
        const loader = document.createElement('div');
        loader.id = 'loader';
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--black);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        `;
        
        loader.innerHTML = `
            <div style="text-align: center;">
                <div style="
                    width: 60px;
                    height: 60px;
                    border: 4px solid rgba(212, 175, 55, 0.3);
                    border-top: 4px solid var(--gold);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 20px;
                "></div>
                <p style="color: var(--gold); letter-spacing: 3px;">Loading...</p>
            </div>
        `;
        
        // Tambahkan animasi spin
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1500);
    });
}

// Add Floating Animation to Gallery Items
function initGalleryHover() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Copy to Clipboard untuk Map Button
function copyLocation(address) {
    navigator.clipboard.writeText(address).then(() => {
        alert('Alamat berhasil disalin!');
    });
}

// Auto-update countdown setiap hari
function scheduleCountdownUpdate() {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = tomorrow - now;
    
    setTimeout(() => {
        initCountdown();
        scheduleCountdownUpdate();
    }, timeUntilMidnight);
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCountdown();
    initRSVPForm();
    initScrollAnimation();
    initParallax();
    initMusicPlayer();
    initGalleryHover();
    scheduleCountdownUpdate();
    
    // Animasi smooth untuk navigasi
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Disable right click pada gambar (opsional untuk proteksi)
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
        return false;
    }
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowDown') {
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    } else if (e.key === 'ArrowUp') {
        window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
    }
});

// Responsive navigation untuk mobile
function initMobileMenu() {
    const menuButton = document.createElement('button');
    menuButton.innerHTML = '☰';
    menuButton.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, var(--gold) 0%, #b8941e 100%);
        color: var(--black);
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 1000;
        display: none;
        box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
    `;
    
    // Show on mobile only
    if (window.innerWidth <= 768) {
        menuButton.style.display = 'block';
    }
    
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            menuButton.style.display = 'block';
        } else {
            menuButton.style.display = 'none';
        }
    });
    
    // Uncomment untuk menambahkan menu mobile
    // document.body.appendChild(menuButton);
}

initMobileMenu();

console.log('Wedding Website Initialized ✨');