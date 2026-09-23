// Tumaini Comprehensive School - Main Interactivity Script

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      if (isOpen) {
        mobileMenu.classList.add('hidden');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      } else {
        mobileMenu.classList.remove('hidden');
        menuIconOpen.classList.add('hidden');
        menuIconClose.classList.remove('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
      }
    });

    // Close menu when clicking on any mobile nav link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Header Elevation on Scroll
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('shadow-md');
      } else {
        header.classList.remove('shadow-md');
      }
    });
  }

  // FAQ Accordion Toggle
  const accordionButtons = document.querySelectorAll('.faq-accordion-btn');
  accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling;
      const icon = button.querySelector('.faq-icon');
      const isExpanded = button.getAttribute('aria-expanded') === 'true';

      // Close all other open accordions in the same group if needed
      accordionButtons.forEach(otherButton => {
        if (otherButton !== button) {
          otherButton.setAttribute('aria-expanded', 'false');
          const otherContent = otherButton.nextElementSibling;
          const otherIcon = otherButton.querySelector('.faq-icon');
          if (otherContent) otherContent.classList.add('hidden');
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        }
      });

      // Toggle current accordion
      if (isExpanded) {
        button.setAttribute('aria-expanded', 'false');
        content.classList.add('hidden');
        if (icon) icon.style.transform = 'rotate(0deg)';
      } else {
        button.setAttribute('aria-expanded', 'true');
        content.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });

  // Admissions & Contact Form Submission Feedback
  const inquiryForm = document.getElementById('admissions-inquiry-form');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = inquiryForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-slate-900 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Sending Inquiry...
      `;

      setTimeout(() => {
        inquiryForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        // Show success notification
        const alertBox = document.getElementById('form-success-alert');
        if (alertBox) {
          alertBox.classList.remove('hidden');
          setTimeout(() => {
            alertBox.classList.add('hidden');
          }, 6000);
        }
      }, 1000);
    });
  }

  // Newsletter Form Feedback
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const successDiv = document.getElementById('newsletter-success');
      const emailInput = document.getElementById('newsletter-email');
      if (emailInput && emailInput.value) {
        if (successDiv) successDiv.classList.remove('hidden');
        newsletterForm.reset();
        setTimeout(() => {
          if (successDiv) successDiv.classList.add('hidden');
        }, 6000);
      }
    });
  }

  // Volunteer Application Form Submission
  const volunteerForm = document.getElementById('volunteer-application-form');
  if (volunteerForm) {
    volunteerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = volunteerForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Submitting Application...
      `;

      setTimeout(() => {
        volunteerForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        const successAlert = document.getElementById('volunteer-form-success');
        if (successAlert) {
          successAlert.classList.remove('hidden');
          setTimeout(() => {
            successAlert.classList.add('hidden');
          }, 7000);
        }
      }, 1200);
    });
  }

  // Contact Page Form Submission
  const contactForm = document.getElementById('contact-page-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Sending Message...
      `;

      setTimeout(() => {
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        const successAlert = document.getElementById('contact-form-success');
        if (successAlert) {
          successAlert.classList.remove('hidden');
          setTimeout(() => {
            successAlert.classList.add('hidden');
          }, 7000);
        }
      }, 1100);
    });
  }

  // News Filtering and Live Search
  initNewsFeatures();

  // Gallery Filtering, Search and Lightbox
  initGalleryFeatures();
});

// Story Content Database for Interactive Modal Reader
const storiesDB = {
  'featured-stem-hub': {
    title: 'Tumaini Comprehensive Unveils New Digital Learning Hub & Science Innovation Laboratory',
    category: 'Academics & Innovation',
    date: 'March 10, 2026',
    author: 'Mr. James Ochieng (Academic Dean)',
    image: 'assets/images/in-class.png',
    body: `
      <p class="text-base text-slate-700 leading-relaxed">
        We are thrilled to announce the official opening of Tumaini Comprehensive School's modern <strong>Digital Learning Hub & Science Innovation Laboratory</strong>. Designed to prepare pupils for the rapidly evolving Competency-Based Curriculum (CBC) and global 21st-century careers, the facility bridges the digital divide for vulnerable children and community learners alike.
      </p>
      <div class="my-4 p-4 rounded-xl bg-brand-mint/60 border-l-4 border-brand-dark">
        <p class="text-brand-dark italic font-medium text-sm">
          "Every child, regardless of where they were born, possesses natural curiosity and brilliance. This Innovation Hub unlocks that potential through hands-on STEM experiments, coding literacy, and interactive digital research."
        </p>
        <span class="block text-xs font-bold text-slate-600 mt-2">— Mr. James Ochieng, STEM Coordinator</span>
      </div>
      <p class="text-sm text-slate-700 leading-relaxed">
        The new hub features 30 energy-efficient workstations, high-speed educational intranet resources, digital microscopes, robotics kits, and an extensive e-library containing over 5,000 curriculum-aligned references. Grade 4 to Grade 9 students have already begun weekly practical sessions focusing on coding basics, environmental science data collection, and applied mathematics.
      </p>
      <p class="text-sm text-slate-700 leading-relaxed">
        We extend our deepest gratitude to our global education partners, local community advocates, and generous benefactors whose selfless investment made this transformative milestone a reality.
      </p>
    `
  },
  'swimming-story': {
    title: 'Exciting Swimming Sessions & Water Safety Classes Boost Pupil Fitness',
    category: 'Sports & Fitness',
    date: 'February 28, 2026',
    author: 'Coach Kiprono (Head of Co-Curricular)',
    image: 'assets/images/image.png',
    body: `
      <p class="text-base text-slate-700 leading-relaxed">
        Swimming is more than just a refreshing recreational activity at Tumaini—it is a vital life skill, an essential physical conditioner, and an incredible confidence builder for our boys and girls.
      </p>
      <p class="text-sm text-slate-700 leading-relaxed">
        Under the watchful supervision of certified lifesavers and passionate swimming coaches, learners from Pre-Primary through Junior Secondary participate in weekly scheduled water safety sessions. The curriculum covers foundational buoyancy, stroke techniques (freestyle, breaststroke, backstroke), endurance building, and essential emergency water rescue awareness.
      </p>
      <div class="my-4 p-4 rounded-xl bg-amber-50 border-l-4 border-brand-gold">
        <p class="text-slate-800 italic font-medium text-sm">
          "Seeing a child who arrived afraid of the water transform into an agile, fearless swimmer within weeks is one of the most rewarding parts of our sports program."
        </p>
      </div>
      <p class="text-sm text-slate-700 leading-relaxed">
        Our school swimming gala is scheduled for next term, where top performers will be selected to represent Tumaini in regional inter-school aquatic tournaments.
      </p>
    `
  },
  'playtime-story': {
    title: 'Playtime Joy: How Recreational Play Nurtures Emotional Healing',
    category: "Children's Home",
    date: 'February 18, 2026',
    author: 'Caregiving & Child Development Team',
    image: 'assets/images/merry-go.jfif',
    body: `
      <p class="text-base text-slate-700 leading-relaxed">
        At Tumaini Children's Home, we understand that childhood should be rich with laughter, exploration, and unrestrained joy. Many of the children entrusted to our care have overcome severe trauma, loss, and poverty.
      </p>
      <p class="text-sm text-slate-700 leading-relaxed">
        Recreational play—especially on our newly revitalized merry-go-round, swing sets, and green fields—serves as an integral pillar of therapeutic healing. Physical movement, peer cooperation, and spontaneous laughter release healthy endorphins and create safe social bonds among resident siblings.
      </p>
      <p class="text-sm text-slate-700 leading-relaxed">
        Our dedicated house mothers and resident social workers actively participate during playtime, reinforcing an atmosphere of unconditional security, love, and belonging.
      </p>
    `
  },
  'leadership-story': {
    title: "Principal's 2026 Address: Expanding Horizons, Anchored in Values",
    category: 'Leadership',
    date: 'February 4, 2026',
    author: 'Office of the Principal',
    image: 'assets/images/pres.jpg',
    body: `
      <p class="text-base text-slate-700 leading-relaxed">
        Opening the 2026 academic year, the School Principal addressed parents, guardians, teachers, and learners, laying out the strategic roadmap for institutional growth, values-driven pedagogy, and community stewardship.
      </p>
      <div class="my-4 p-4 rounded-xl bg-brand-mint/60 border-l-4 border-brand-dark">
        <p class="text-brand-dark italic font-medium text-sm">
          "Our goal is not merely to produce students who excel in examinations, but to raise compassionate leaders, innovators, and moral champions who will uplift their communities and nation."
        </p>
      </div>
      <p class="text-sm text-slate-700 leading-relaxed">
        Key priorities outlined for the upcoming year include enhanced teacher professional development in CBC assessment strategies, expanded nutrition programs for all day pupils, full integration of digital STEM tools, and continuous enhancement of child safeguarding policies across the residential home and school campus.
      </p>
    `
  },
  'science-expo-story': {
    title: 'Junior School Inventors Shine at Annual CBC Science & Innovation Expo',
    category: 'Academics',
    date: 'January 26, 2026',
    author: 'Science & Technical Department',
    image: 'assets/images/news-science-fair.jpg',
    body: `
      <p class="text-base text-slate-700 leading-relaxed">
        Tumaini Junior Secondary students put their scientific curiosity on full display at the 2026 Annual Science & Technology Expo. The event attracted visiting educators, judges from the Ministry of Education, and parents.
      </p>
      <p class="text-sm text-slate-700 leading-relaxed">
        Among the standout projects was an automated drip-irrigation system constructed entirely using recycled plastic containers and solar sensors, designed by Grade 8 pupils to help drought-prone farming households conserve water. Another team demonstrated natural insect repellent extracted from indigenous neem plants.
      </p>
      <p class="text-sm text-slate-700 leading-relaxed">
        Three student teams received awards of excellence and will proceed to compete at the county-level STEM championship in Nairobi.
      </p>
    `
  },
  'library-story': {
    title: '"Read to Lead": Community Book Drive Adds 1,500 Titles to Tumaini Library',
    category: 'Community',
    date: 'January 15, 2026',
    author: 'Library Council',
    image: 'assets/images/news-library.jpg',
    body: `
      <p class="text-base text-slate-700 leading-relaxed">
        The Tumaini campus library has received a substantial boost following a collaborative literacy initiative that gathered over 1,500 new reading books, academic revision guides, and storybooks.
      </p>
      <p class="text-sm text-slate-700 leading-relaxed">
        Reading fluency forms the cornerstone of academic mastery. With these new titles, our Daily Silent Reading (DSR) program and weekly Book Club discussions have witnessed record student participation.
      </p>
      <p class="text-sm text-slate-700 leading-relaxed">
        We thank our international book charity partners and local high school volunteers who assisted in cataloguing and barcoding the collection for easy lending.
      </p>
    `
  },
  'soccer-story': {
    title: 'Tumaini FC Lifts Sub-County Primary Schools Football Championship Trophy',
    category: 'Sports & Clubs',
    date: 'December 8, 2025',
    author: 'Sports Department',
    image: 'assets/images/news-soccer.jpg',
    body: `
      <p class="text-base text-slate-700 leading-relaxed">
        In a tense, high-stakes final match held at the District Stadium, the Tumaini Primary Football Team secured a dramatic 2-1 victory over St. Jude Academy to claim the 2025 Sub-County Championship trophy.
      </p>
      <p class="text-sm text-slate-700 leading-relaxed">
        Striker Brian Kiprotich (Grade 6) scored the decisive winning goal in the 78th minute following a brilliant counter-attack. The Tumaini Girls squad also placed second overall, demonstrating tremendous improvement in defensive organization and teamwork.
      </p>
      <p class="text-sm text-slate-700 leading-relaxed">
        The team was greeted back on campus with cheers, singing, and celebration from fellow pupils and teachers.
      </p>
    `
  },
  'volunteer-story': {
    title: 'Global Bridges: International Volunteer Educators Complete Inspiring Term at Tumaini',
    category: 'Community & Partners',
    date: 'November 20, 2025',
    author: 'Partnership Desk',
    image: 'assets/images/mzungu.jpg',
    body: `
      <p class="text-base text-slate-700 leading-relaxed">
        Tumaini was delighted to host a passionate cohort of volunteer teachers from Europe and the Americas for a 3-month collaborative placement.
      </p>
      <p class="text-sm text-slate-700 leading-relaxed">
        The visiting team worked hand-in-hand with our Kenyan teaching faculty, co-facilitating music lessons, creative writing clubs, and remedial phonics sessions for early learners. They also helped digitize student health records and trained local staff in assistive learning methods for pupils with learning difficulties.
      </p>
      <p class="text-sm text-slate-700 leading-relaxed">
        Cultural exchanges, Swahili language exchanges, and shared dinners forged bonds of friendship that continue to inspire our community across oceans.
      </p>
    `
  },
  'nutrition-story': {
    title: 'Farm-to-Plate: How Our School Organic Garden Powers 300+ Nutritious Meals Daily',
    category: "Children's Home & Health",
    date: 'October 30, 2025',
    author: 'Health & Agriculture Committee',
    image: 'assets/images/food.jfif',
    body: `
      <p class="text-base text-slate-700 leading-relaxed">
        Nutritious, balanced food is indispensable for growing minds and bodies. At Tumaini, our on-campus organic agricultural garden and poultry unit now supply over 60% of the fresh vegetables and eggs used in our central dining hall.
      </p>
      <p class="text-sm text-slate-700 leading-relaxed">
        Every meal is designed to meet dietary energy and micronutrient requirements, ensuring that resident children and day scholars receive hot, wholesome lunches every single school day.
      </p>
      <p class="text-sm text-slate-700 leading-relaxed">
        Learners also participate in the Young Farmers Club, acquiring practical skills in drip irrigation, compost production, and crop rotation.
      </p>
    `
  },
  'art-story': {
    title: 'Art as a Voice: Children Express Resilience Through Expressive Arts Workshop',
    category: "Children's Home",
    date: 'October 14, 2025',
    author: 'Counselling & Psychosocial Department',
    image: 'assets/images/safeguarding-art.jpg',
    body: `
      <p class="text-base text-slate-700 leading-relaxed">
        During midterm break, our resident children took part in an immersive two-day Expressive Arts & Trauma-Informed Care workshop led by guest art therapists and local artists.
      </p>
      <p class="text-sm text-slate-700 leading-relaxed">
        Using acrylics, clay modeling, and collage storytelling, pupils created moving artworks depicting their personal journeys of hope, friendship, and ambition. Several of the collaborative murals now adorn our community hall, bringing warmth and color to our shared living spaces.
      </p>
    `
  }
};

// Global Story Modal Functions
window.openStoryModal = function(storyKey) {
  const story = storiesDB[storyKey];
  const modal = document.getElementById('story-modal');
  if (!story || !modal) return;

  document.getElementById('modal-image').src = story.image;
  document.getElementById('modal-title').textContent = story.title;
  document.getElementById('modal-category').textContent = story.category;
  document.getElementById('modal-date').textContent = story.date;
  document.getElementById('modal-author').textContent = story.author;
  document.getElementById('modal-body').innerHTML = story.body;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
};

window.closeStoryModal = function() {
  const modal = document.getElementById('story-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
};

// Close modal on click outside or Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeStoryModal();
  }
});

const storyModal = document.getElementById('story-modal');
if (storyModal) {
  storyModal.addEventListener('click', (e) => {
    if (e.target === storyModal) {
      closeStoryModal();
    }
  });
}

// News Filtering & Live Search Logic
function initNewsFeatures() {
  const filterPills = document.querySelectorAll('.filter-pill');
  const searchInput = document.getElementById('news-search-input');
  const clearBtn = document.getElementById('search-clear-btn');
  const cards = document.querySelectorAll('.news-card');
  const noResults = document.getElementById('no-results');

  if (!filterPills.length || !cards.length) return;

  let currentCategory = 'all';
  let currentSearchQuery = '';

  function applyFilters() {
    let visibleCount = 0;

    cards.forEach(card => {
      const category = card.getAttribute('data-category');
      const keywords = (card.getAttribute('data-keywords') || '').toLowerCase();
      const cardTitle = (card.querySelector('h3')?.textContent || '').toLowerCase();
      const cardDesc = (card.querySelector('p')?.textContent || '').toLowerCase();

      const matchesCategory = currentCategory === 'all' || category === currentCategory;
      const textToSearch = `${keywords} ${cardTitle} ${cardDesc}`;
      const matchesSearch = !currentSearchQuery || textToSearch.includes(currentSearchQuery.toLowerCase());

      if (matchesCategory && matchesSearch) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    if (noResults) {
      if (visibleCount === 0) {
        noResults.classList.remove('hidden');
      } else {
        noResults.classList.add('hidden');
      }
    }
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => {
        p.classList.remove('active-pill', 'bg-brand-dark', 'text-white', 'shadow-sm');
        p.classList.add('text-slate-600', 'bg-transparent');
      });

      pill.classList.add('active-pill', 'bg-brand-dark', 'text-white', 'shadow-sm');
      pill.classList.remove('text-slate-600', 'bg-transparent');

      currentCategory = pill.getAttribute('data-filter');
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.trim();
      if (clearBtn) {
        if (currentSearchQuery) {
          clearBtn.classList.remove('hidden');
        } else {
          clearBtn.classList.add('hidden');
        }
      }
      applyFilters();
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        currentSearchQuery = '';
        clearBtn.classList.add('hidden');
        applyFilters();
        searchInput.focus();
      });
    }
  }

  window.resetFilters = function() {
    if (searchInput) {
      searchInput.value = '';
      currentSearchQuery = '';
    }
    if (clearBtn) clearBtn.classList.add('hidden');
    currentCategory = 'all';
    
    filterPills.forEach(p => {
      if (p.getAttribute('data-filter') === 'all') {
        p.classList.add('active-pill', 'bg-brand-dark', 'text-white', 'shadow-sm');
        p.classList.remove('text-slate-600', 'bg-transparent');
      } else {
        p.classList.remove('active-pill', 'bg-brand-dark', 'text-white', 'shadow-sm');
        p.classList.add('text-slate-600', 'bg-transparent');
      }
    });

    applyFilters();
  };
}

// Toast Notification Helper
function showToast(message) {
  const toast = document.getElementById('news-toast');
  const toastMsg = document.getElementById('news-toast-msg');
  if (!toast) return;

  if (toastMsg) toastMsg.textContent = message;
  toast.classList.remove('hidden');
  toast.classList.add('flex');

  setTimeout(() => {
    toast.classList.add('hidden');
    toast.classList.remove('flex');
  }, 3500);
}

// Share Article Helper
window.shareArticle = function(title, url) {
  if (navigator.share) {
    navigator.share({
      title: `${title} | Tumaini School`,
      text: `Read about "${title}" at Tumaini Comprehensive School & Children's Home:`,
      url: url || window.location.href
    }).catch(() => {});
  } else {
    navigator.clipboard.writeText(url || window.location.href).then(() => {
      showToast('Link copied to clipboard!');
    }).catch(() => {
      showToast('Share link: ' + window.location.href);
    });
  }
};

window.shareCurrentModalArticle = function() {
  const title = document.getElementById('modal-title')?.textContent || 'Tumaini School News';
  window.shareArticle(title, window.location.href);
};

// Add to Calendar Helper
window.addToCalendar = function(eventTitle, eventDate, location) {
  const startDate = eventDate.replace(/-/g, '') + 'T060000Z';
  const endDate = eventDate.replace(/-/g, '') + 'T120000Z';
  const details = encodeURIComponent(`Event: ${eventTitle} at Tumaini Comprehensive School.`);
  const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startDate}/${endDate}&details=${details}&location=${encodeURIComponent(location || 'Tumaini Comprehensive School, Kenya')}`;
  
  window.open(gCalUrl, '_blank');
};

// GALLERY SYSTEM & LIGHTBOX
const galleryPhotosDB = [
  {
    image: 'assets/images/image.png',
    title: 'Swimming Coaching & Water Safety',
    desc: 'Pupils mastering swimming strokes and water rescue confidence under certified coaches.',
    category: 'Sports & Aquatics',
    location: 'Sports Complex'
  },
  {
    image: 'assets/images/in-class.png',
    title: 'Interactive CBC Classrooms',
    desc: 'Dedicated educators delivering learner-centered pedagogy in modern, well-equipped classrooms.',
    category: 'Academics',
    location: 'Junior Block'
  },
  {
    image: 'assets/images/merry-go.jfif',
    title: 'Playground Joy & Laughter',
    desc: 'Recreational therapy and friendship building on our joyful campus playground.',
    category: "Children's Home",
    location: 'Playground Field'
  },
  {
    image: 'assets/images/news-science-fair.jpg',
    title: 'Junior School Science Expo',
    desc: 'Grade 7 and 8 students demonstrating innovative renewable energy and irrigation models.',
    category: 'Academics',
    location: 'Science Lab'
  },
  {
    image: 'assets/images/news-soccer.jpg',
    title: 'Sub-County Soccer Champions',
    desc: 'Tumaini FC celebrating an undefeated season and gold trophy triumph in district sports.',
    category: 'Sports & Athletics',
    location: 'Main Pitch'
  },
  {
    image: 'assets/images/news-library.jpg',
    title: '"Read to Lead" Campus Library',
    desc: 'A peaceful haven fostering a lifelong love for reading, research, and literature.',
    category: 'Academics',
    location: 'Memorial Library'
  },
  {
    image: 'assets/images/mzungu.jpg',
    title: 'Global Volunteer Exchange',
    desc: 'International educators sharing creative teaching methods and cultural friendship.',
    category: 'Community & Partners',
    location: 'Activity Centre'
  },
  {
    image: 'assets/images/food.jfif',
    title: 'Farm-to-Plate Healthy Meals',
    desc: 'Fresh organic harvest prepared daily in our dining hall to nourish healthy development.',
    category: 'Health & Nutrition',
    location: 'Dining Hall'
  },
  {
    image: 'assets/images/safeguarding-art.jpg',
    title: 'Expressive Arts & Healing',
    desc: 'Resident children expressing hope and self-discovery through vibrant canvas painting.',
    category: 'Arts & Expression',
    location: 'Art Studio'
  },
  {
    image: 'assets/images/enviroment.jpg',
    title: 'Serene Green Sanctuary',
    desc: 'Tree-lined compound providing a tranquil, secure, and clean environment for study.',
    category: 'Campus & Nature',
    location: 'West Campus'
  },
  {
    image: 'assets/images/school.jpg',
    title: 'Main Academic Complex',
    desc: 'Well-ventilated learning blocks built with high safety and modern accessibility standards.',
    category: 'Campus',
    location: 'Main Gate'
  },
  {
    image: 'assets/images/pres.jpg',
    title: 'Morning Assembly & Moral Guidance',
    desc: 'Instilling character, integrity, and self-belief during morning assembly.',
    category: 'Leadership & Values',
    location: 'Auditorium'
  },
  {
    image: 'assets/images/care-academic.jpg',
    title: 'Evening Tutoring & Mentorship',
    desc: 'House mothers and tutors providing individualized academic guidance each evening.',
    category: "Children's Home",
    location: 'Care Dormitory'
  },
  {
    image: 'assets/images/holistic-learning.jpg',
    title: 'Collaborative Project Work',
    desc: 'Encouraging critical thinking, teamwork, and communication in CBC clusters.',
    category: 'Academics',
    location: 'Primary Block'
  },
  {
    image: 'assets/images/children-hero.jpg',
    title: 'Smiles of Hope & Brotherhood',
    desc: 'Creating an uplifting sanctuary where every orphan finds a forever family.',
    category: "Children's Home",
    location: 'Home Courtyard'
  },
  {
    image: 'assets/images/about-campus.jpg',
    title: 'Spacious Campus Compound',
    desc: 'A safe and secure 10-acre haven equipped for whole-child transformation.',
    category: 'Campus Overview',
    location: 'Main Grounds'
  }
];

let currentLightboxIndex = 0;

window.openLightbox = function(index) {
  if (index < 0 || index >= galleryPhotosDB.length) return;
  currentLightboxIndex = index;
  updateLightboxContent();

  const lightbox = document.getElementById('gallery-lightbox');
  if (lightbox) {
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }
};

window.closeLightbox = function() {
  const lightbox = document.getElementById('gallery-lightbox');
  if (lightbox) {
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
    document.body.style.overflow = '';
  }
};

window.nextLightboxPhoto = function() {
  currentLightboxIndex = (currentLightboxIndex + 1) % galleryPhotosDB.length;
  updateLightboxContent();
};

window.prevLightboxPhoto = function() {
  currentLightboxIndex = (currentLightboxIndex - 1 + galleryPhotosDB.length) % galleryPhotosDB.length;
  updateLightboxContent();
};

function updateLightboxContent() {
  const photo = galleryPhotosDB[currentLightboxIndex];
  if (!photo) return;

  const imgEl = document.getElementById('lightbox-image');
  const titleEl = document.getElementById('lightbox-title');
  const descEl = document.getElementById('lightbox-desc');
  const tagEl = document.getElementById('lightbox-tag');
  const counterEl = document.getElementById('lightbox-counter');

  if (imgEl) imgEl.src = photo.image;
  if (titleEl) titleEl.textContent = photo.title;
  if (descEl) descEl.textContent = photo.desc;
  if (tagEl) tagEl.textContent = `${photo.category} • ${photo.location}`;
  if (counterEl) counterEl.textContent = `${currentLightboxIndex + 1} / ${galleryPhotosDB.length}`;
}

window.shareCurrentLightboxPhoto = function() {
  const photo = galleryPhotosDB[currentLightboxIndex];
  if (!photo) return;
  window.shareArticle(`Photo: ${photo.title}`, window.location.href);
};

// Keyboard navigation for Lightbox
document.addEventListener('keydown', (e) => {
  const lightbox = document.getElementById('gallery-lightbox');
  if (!lightbox || lightbox.classList.contains('hidden')) return;

  if (e.key === 'Escape') {
    closeLightbox();
  } else if (e.key === 'ArrowRight') {
    nextLightboxPhoto();
  } else if (e.key === 'ArrowLeft') {
    prevLightboxPhoto();
  }
});

// Gallery Filter & Live Search Initialization
function initGalleryFeatures() {
  const filterPills = document.querySelectorAll('.gallery-filter-pill');
  const searchInput = document.getElementById('gallery-search-input');
  const clearBtn = document.getElementById('gallery-search-clear');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const noResults = document.getElementById('gallery-no-results');

  if (!filterPills.length || !galleryItems.length) return;

  let activeCategory = 'all';
  let activeSearch = '';

  function applyGalleryFilters() {
    let visibleCount = 0;

    galleryItems.forEach(item => {
      const cat = item.getAttribute('data-category');
      const kw = (item.getAttribute('data-keywords') || '').toLowerCase();
      const title = (item.querySelector('h3')?.textContent || '').toLowerCase();
      const desc = (item.querySelector('p')?.textContent || '').toLowerCase();

      const matchesCat = activeCategory === 'all' || cat === activeCategory;
      const matchesText = !activeSearch || `${kw} ${title} ${desc}`.includes(activeSearch.toLowerCase());

      if (matchesCat && matchesText) {
        item.classList.remove('hidden');
        visibleCount++;
      } else {
        item.classList.add('hidden');
      }
    });

    if (noResults) {
      if (visibleCount === 0) {
        noResults.classList.remove('hidden');
      } else {
        noResults.classList.add('hidden');
      }
    }
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => {
        p.classList.remove('active-pill', 'bg-brand-dark', 'text-white', 'shadow-sm');
        p.classList.add('text-slate-600', 'bg-transparent');
      });

      pill.classList.add('active-pill', 'bg-brand-dark', 'text-white', 'shadow-sm');
      pill.classList.remove('text-slate-600', 'bg-transparent');

      activeCategory = pill.getAttribute('data-filter');
      applyGalleryFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      activeSearch = e.target.value.trim();
      if (clearBtn) {
        if (activeSearch) {
          clearBtn.classList.remove('hidden');
        } else {
          clearBtn.classList.add('hidden');
        }
      }
      applyGalleryFilters();
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        activeSearch = '';
        clearBtn.classList.add('hidden');
        applyGalleryFilters();
        searchInput.focus();
      });
    }
  }

  window.resetGalleryFilters = function() {
    if (searchInput) {
      searchInput.value = '';
      activeSearch = '';
    }
    if (clearBtn) clearBtn.classList.add('hidden');
    activeCategory = 'all';

    filterPills.forEach(p => {
      if (p.getAttribute('data-filter') === 'all') {
        p.classList.add('active-pill', 'bg-brand-dark', 'text-white', 'shadow-sm');
        p.classList.remove('text-slate-600', 'bg-transparent');
      } else {
        p.classList.remove('active-pill', 'bg-brand-dark', 'text-white', 'shadow-sm');
        p.classList.add('text-slate-600', 'bg-transparent');
      }
    });

    applyGalleryFilters();
  };
}

// Clipboard copy helper for Paybill / Accounts
window.copyToClipboard = function(text, customMessage) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(customMessage || 'Copied to clipboard!');
      const toast2 = document.getElementById('get-involved-toast');
      const toast2Msg = document.getElementById('get-involved-toast-msg');
      if (toast2 && toast2Msg) {
        toast2Msg.textContent = customMessage || 'Copied to clipboard!';
        toast2.classList.remove('hidden');
        toast2.classList.add('flex');
        setTimeout(() => {
          toast2.classList.add('hidden');
          toast2.classList.remove('flex');
        }, 3500);
      }
    }).catch(() => {
      showToast(text);
    });
  }
};

// Select donation amount helper
window.selectDonationAmount = function(amount, tierName) {
  const volInterest = document.getElementById('vol-interest');
  const volMessage = document.getElementById('vol-message');
  if (volInterest) {
    volInterest.value = 'sponsor';
  }
  if (volMessage) {
    volMessage.value = `I would like to sponsor a child under the ${tierName} plan (KES ${amount.toLocaleString()} / month). Please provide the next steps.`;
  }
  showToast(`Selected ${tierName} Tier (KES ${amount.toLocaleString()})`);
};

