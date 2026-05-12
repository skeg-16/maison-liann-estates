document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(reveal => { observer.observe(reveal); });

    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', () => {
        if(document.body.getAttribute('data-theme') === 'dark') {
            document.body.removeAttribute('data-theme');
            icon.classList.remove('bx-sun');
            icon.classList.add('bx-moon');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            icon.classList.remove('bx-moon');
            icon.classList.add('bx-sun');
        }
    });

    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    const mobileIcon = mobileMenu.querySelector('i');

    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileIcon.className = navLinks.classList.contains('active') ? 'bx bx-x' : 'bx bx-menu';
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileIcon.className = 'bx bx-menu';
        });
    });

    document.getElementById('viewListingsBtn').addEventListener('click', () => {
        document.getElementById('listings').scrollIntoView({ behavior: 'smooth' });
    });

    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(faq => faq.classList.remove('active'));
            if(!isActive) item.classList.add('active');
        });
    });

    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() { goToSlide(currentSlide + 1); }
    slideInterval = setInterval(nextSlide, 5000);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            goToSlide(index);
            slideInterval = setInterval(nextSlide, 5000);
        });
    });

    const baseResImages = [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600607687931-ceeb66d11242?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1502672260266-1c1de2d9d344?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80'
    ];

    const baseComImages = [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1582653291997-079a1c04e5d1?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80'
    ];

    const resTitles = ['Forbes Park Estate', 'Dasmariñas Village Mansion', 'Ayala Alabang Villa', 'Urdaneta Village Residence', 'BGC Premium Penthouse', 'Rockwell Luxury Condo', 'Bel-Air Classic Home', 'Corinthian Gardens Estate', 'Salcedo Village Loft', 'Valle Verde Townhome'];
    const comTitles = ['BGC Corporate Tower', 'Makati Premium Retail', 'Ortigas Central Hub', 'Alabang Corporate Center', 'Quezon City Logistics', 'Bay Area Commercial', 'Eastwood IT Park Office', 'Greenhills Showroom', 'Pasig Industrial Complex', 'McKinley Hill Suite'];

    const properties = [];
    
    for(let i=1; i<=60; i++) {
        properties.push({
            id: i,
            title: resTitles[i % 10] + ' Phase ' + Math.ceil(i/10),
            type: 'residential',
            specs: (Math.floor(Math.random() * 4) + 2) + ' BEDS | ' + (Math.floor(Math.random() * 4) + 2) + ' BATHS | ' + (Math.floor(Math.random() * 800) + 200) + ' SQM',
            image: baseResImages[i % 10],
            price: '₱' + (Math.floor(Math.random() * 500) + 50) + ',000 / month',
            desc: 'A magnificent residential property offering unparalleled luxury, security, and comfort. Features high-end finishes, spacious layouts, and prime accessibility to Metro Manila hubs.'
        });
        properties.push({
            id: i + 60,
            title: comTitles[i % 10] + ' Floor ' + Math.ceil(i/5),
            type: 'commercial',
            specs: 'PREMIUM SPACE | ' + (Math.floor(Math.random() * 2000) + 100) + ' SQM',
            image: baseComImages[i % 10],
            price: '₱' + (Math.floor(Math.random() * 900) + 100) + ',000 / month',
            desc: 'Strategically located commercial space designed for maximum operational efficiency and brand visibility. Ideal for corporate headquarters, retail, or expanding enterprises.'
        });
    }

    const grid = document.getElementById('propertyGrid');
    const paginationContainer = document.getElementById('luxuryPagination');
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    let currentFilter = 'residential';
    let currentPage = 1;
    const itemsPerPage = 6;

    function renderListings() {
        grid.innerHTML = '';
        const filteredProps = properties.filter(prop => prop.type === currentFilter);
        const totalPages = Math.ceil(filteredProps.length / itemsPerPage);
        
        const startIdx = (currentPage - 1) * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        const paginatedProps = filteredProps.slice(startIdx, endIdx);
        
        paginatedProps.forEach(prop => {
            const card = document.createElement('div');
            card.className = 'prop-card';
            card.setAttribute('data-id', prop.id);
            card.innerHTML = `
                <div class='img-wrapper'>
                    <img src='${prop.image}' alt='${prop.title}' class='prop-img'>
                </div>
                <div class='prop-details'>
                    <div class='prop-type'>${prop.type}</div>
                    <div class='prop-title'>${prop.title}</div>
                    <div class='prop-specs'>${prop.specs}</div>
                    <button class='btn-outline' style='width: 100%; border-color: var(--accent-gold); color: var(--accent-gold);'>VIEW DETAILS</button>
                </div>
            `;
            
            card.addEventListener('click', () => openPropertyModal(prop));
            grid.appendChild(card);
        });

        renderPagination(totalPages);
    }

    function renderPagination(totalPages) {
        if (totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }

        const formatNumber = (num) => num.toString().padStart(2, '0');

        paginationContainer.innerHTML = `
            <button class='page-btn' id='prevPage' ${currentPage === 1 ? 'disabled' : ''}>
                <i class='bx bx-left-arrow-alt'></i> PREV
            </button>
            <div class='page-indicator'>
                <span class='page-current'>${formatNumber(currentPage)}</span>
                <span class='page-divider'>/</span>
                <span class='page-total'>${formatNumber(totalPages)}</span>
            </div>
            <button class='page-btn' id='nextPage' ${currentPage === totalPages ? 'disabled' : ''}>
                NEXT <i class='bx bx-right-arrow-alt'></i>
            </button>
        `;

        const prevBtn = document.getElementById('prevPage');
        const nextBtn = document.getElementById('nextPage');

        if(prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    renderListings();
                    document.getElementById('listings').scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        if(nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentPage < totalPages) {
                    currentPage++;
                    renderListings();
                    document.getElementById('listings').scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            tabBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.getAttribute('data-filter');
            currentPage = 1; 
            renderListings();
        });
    });

    renderListings(); 

    const contactModal = document.getElementById('contactModal');
    const videoModal = document.getElementById('videoModal');
    const propertyModal = document.getElementById('propertyModal');
    const tourVideo = document.getElementById('tourVideo');

    document.querySelectorAll('.trigger-contact').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            propertyModal.classList.remove('active');
            contactModal.classList.add('active');
        });
    });

    document.getElementById('videoTrigger').addEventListener('click', () => {
        tourVideo.src = 'https://www.youtube.com/embed/k4JbE2x1kM4?autoplay=1&mute=1'; 
        videoModal.classList.add('active');
    });

    function openPropertyModal(prop) {
        document.getElementById('pmImage').src = prop.image;
        document.getElementById('pmType').textContent = prop.type;
        document.getElementById('pmTitle').textContent = prop.title;
        document.getElementById('pmSpecs').textContent = prop.specs;
        document.getElementById('pmPrice').textContent = prop.price;
        document.getElementById('pmDesc').textContent = prop.desc;
        propertyModal.classList.add('active');
    }

    document.getElementById('closeContact').addEventListener('click', () => { contactModal.classList.remove('active'); });
    document.getElementById('closeVideo').addEventListener('click', () => { videoModal.classList.remove('active'); tourVideo.src = ''; });
    document.getElementById('closeProperty').addEventListener('click', () => { propertyModal.classList.remove('active'); });

    window.addEventListener('click', (e) => { 
        if (e.target === contactModal) contactModal.classList.remove('active');
        if (e.target === videoModal) { videoModal.classList.remove('active'); tourVideo.src = ''; }
        if (e.target === propertyModal) propertyModal.classList.remove('active');
    });

    document.getElementById('inquiryForm').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your inquiry. A Maison Liann advisor will contact you shortly.');
        contactModal.classList.remove('active');
        e.target.reset();
    });
});