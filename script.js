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
    'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=800', // REPLACED THE FEET WITH A HOUSE
    'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/209315/pexels-photo-209315.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1481105/pexels-photo-1481105.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/259580/pexels-photo-259580.jpeg?auto=compress&cs=tinysrgb&w=800'
];

const baseComImages = [
    'https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2606816/pexels-photo-2606816.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/389818/pexels-photo-389818.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2099019/pexels-photo-2099019.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/830891/pexels-photo-830891.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1704120/pexels-photo-1704120.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg?auto=compress&cs=tinysrgb&w=800'
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
        tourVideo.src = 'https://www.youtube.com/embed/EXUt03xmFhw?autoplay=1&mute=1&rel=0'; 
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