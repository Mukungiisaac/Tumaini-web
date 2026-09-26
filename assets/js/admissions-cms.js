// Admissions CMS Integration Script
const API_BASE_URL = localStorage.getItem('apiUrl') || 'http://localhost:3001';

// Fetch and populate admissions content from CMS
async function loadAdmissionsContent() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admissions`);
    
    if (!response.ok) {
      console.warn('Failed to load CMS content, using default static content');
      return;
    }

    const data = await response.json();
    console.log('Admissions CMS data loaded:', data);

    // === HERO SECTION ===
    if (data.hero_badge) {
      const badge = document.querySelector('section:nth-of-type(1) .inline-flex.items-center.px-3\\.5');
      if (badge) badge.textContent = data.hero_badge;
    }

    if (data.hero_heading_line1 || data.hero_heading_line2) {
      const h1 = document.querySelector('section:nth-of-type(1) h1');
      if (h1 && data.hero_heading_line1 && data.hero_heading_line2) {
        h1.innerHTML = `${data.hero_heading_line1}<br><span class="text-brand-gold">${data.hero_heading_line2}</span>`;
      }
    }

    if (data.hero_description) {
      const desc = document.querySelector('section:nth-of-type(1) p.text-gray-200');
      if (desc) desc.textContent = data.hero_description;
    }

    if (data.hero_button1_text) {
      const btn1 = document.querySelector('section:nth-of-type(1) a.bg-brand-gold');
      if (btn1) btn1.textContent = data.hero_button1_text;
    }

    if (data.hero_button2_text) {
      const btn2 = document.querySelector('section:nth-of-type(1) a.border-white\\/40');
      if (btn2) btn2.textContent = data.hero_button2_text;
    }

    if (data.hero_image) {
      const heroImg = document.querySelector('section:nth-of-type(1) img');
      if (heroImg) heroImg.src = data.hero_image;
    }

    // === PROCESS STEPS SECTION ===
    if (data.process_section_title) {
      const processTitle = document.querySelector('section:nth-of-type(2) h2');
      if (processTitle) processTitle.textContent = data.process_section_title;
    }

    if (data.process_section_description) {
      const processDesc = document.querySelector('section:nth-of-type(2) > div > p');
      if (processDesc) processDesc.textContent = data.process_section_description;
    }

    // Update Process Step Cards
    const stepCards = document.querySelectorAll('section:nth-of-type(2) .grid > div');
    
    if (stepCards[0] && data.step1_title) {
      stepCards[0].querySelector('h3').textContent = data.step1_title;
      stepCards[0].querySelector('p').textContent = data.step1_description;
    }

    if (stepCards[1] && data.step2_title) {
      stepCards[1].querySelector('h3').textContent = data.step2_title;
      stepCards[1].querySelector('p').textContent = data.step2_description;
    }

    if (stepCards[2] && data.step3_title) {
      stepCards[2].querySelector('h3').textContent = data.step3_title;
      stepCards[2].querySelector('p').textContent = data.step3_description;
    }

    if (stepCards[3] && data.step4_title) {
      stepCards[3].querySelector('h3').textContent = data.step4_title;
      stepCards[3].querySelector('p').textContent = data.step4_description;
    }

    // === FEE SCHEDULE SECTION ===
    if (data.fee_badge) {
      const feeBadge = document.querySelector('#fee-section span.inline-block');
      if (feeBadge) feeBadge.textContent = data.fee_badge;
    }

    if (data.fee_section_title) {
      const feeTitle = document.querySelector('#fee-section h2');
      if (feeTitle) feeTitle.textContent = data.fee_section_title;
    }

    if (data.fee_section_description) {
      const feeDesc = document.querySelector('#fee-section > div > div:first-child > p');
      if (feeDesc) feeDesc.textContent = data.fee_section_description;
    }

    if (data.fee_card_title) {
      const cardTitle = document.querySelector('#fee-section .bg-brand-dark h3');
      if (cardTitle) cardTitle.textContent = data.fee_card_title;
    }
    if (data.fee_table_year) {
      const cardTitle = document.querySelector('#fee-section .bg-brand-dark h3');
      if (cardTitle) cardTitle.textContent = `${data.fee_table_year} Fee Structure`;
    }

    // Update the shared 2026 term-by-term fee structure
    if (data.fee_structure_json) {
      try {
        const feeStructure = JSON.parse(data.fee_structure_json);
        const tableRows = document.querySelectorAll('#fee-section tbody tr');
        const categories = ['ecdc', 'lower', 'upper', 'boarding', 'day'];

        categories.forEach((category, index) => {
          const values = feeStructure[category];
          const cells = tableRows[index]?.querySelectorAll('td');
          if (!values || !cells) return;
          ['term1', 'term2', 'term3', 'annual'].forEach((period, periodIndex) => {
            if (values[period]) cells[periodIndex + 1].textContent = values[period];
          });
        });
      } catch (error) {
        console.warn('Invalid fee structure data, using page defaults');
      }
    }

    if (data.fee_structure_json) {
      try {
        const details = JSON.parse(data.fee_structure_json).details;
        if (details) {
          if (details.admission) document.getElementById('fee-admission').textContent = details.admission;
          if (details.development) document.getElementById('fee-development').textContent = details.development;
          if (details.cutlery) document.getElementById('fee-cutlery').textContent = details.cutlery;
          if (details.interview) document.getElementById('fee-interview').textContent = details.interview;
          if (details.paymentMethod) document.getElementById('fee-payment-method').textContent = `Pay via ${details.paymentMethod}.`;
          if (details.paymentInstructions) document.getElementById('fee-payment-instructions').textContent = details.paymentInstructions;
        }
      } catch (error) {
        console.warn('Invalid fee detail data, using page defaults');
      }
    }

    if (data.fee_note) {
      const noteP = document.querySelector('#fee-section .bg-amber-50\\/70 p');
      if (noteP) {
        noteP.innerHTML = `<span class="font-bold">Note:</span> ${data.fee_note}`;
      }
    }

    // === FAQ SECTION ===
    if (data.faq_section_title) {
      const faqTitle = document.querySelector('#inquiry-section h2');
      if (faqTitle) faqTitle.textContent = data.faq_section_title;
    }

    if (data.faq_section_description) {
      const faqDesc = document.querySelector('#inquiry-section > div > div:first-child > div > p');
      if (faqDesc) faqDesc.textContent = data.faq_section_description;
    }

    // Update FAQ Accordion Items
    const faqAccordions = document.querySelectorAll('.faq-accordion-btn');
    const faqAnswers = document.querySelectorAll('.faq-accordion-btn + div');
    
    if (faqAccordions[0] && data.faq1_question) {
      faqAccordions[0].querySelector('span').textContent = data.faq1_question;
      if (data.faq1_answer) faqAnswers[0].textContent = data.faq1_answer;
    }

    if (faqAccordions[1] && data.faq2_question) {
      faqAccordions[1].querySelector('span').textContent = data.faq2_question;
      if (data.faq2_answer) faqAnswers[1].textContent = data.faq2_answer;
    }

    if (faqAccordions[2] && data.faq3_question) {
      faqAccordions[2].querySelector('span').textContent = data.faq3_question;
      if (data.faq3_answer) faqAnswers[2].textContent = data.faq3_answer;
    }

    if (faqAccordions[3] && data.faq4_question) {
      faqAccordions[3].querySelector('span').textContent = data.faq4_question;
      if (data.faq4_answer) faqAnswers[3].textContent = data.faq4_answer;
    }

    if (faqAccordions[4] && data.faq5_question) {
      faqAccordions[4].querySelector('span').textContent = data.faq5_question;
      if (data.faq5_answer) faqAnswers[4].textContent = data.faq5_answer;
    }

    // === CTA SECTION ===
    if (data.cta_title) {
      const ctaTitle = document.querySelector('#inquiry-section h3');
      if (ctaTitle) ctaTitle.textContent = data.cta_title;
    }

    if (data.cta_description) {
      const ctaDesc = document.querySelector('#inquiry-section h3 + p');
      if (ctaDesc) ctaDesc.textContent = data.cta_description;
    }

    console.log('✅ Admissions CMS content loaded successfully');

  } catch (error) {
    console.error('Error loading Admissions CMS content:', error);
    // Page will display default static content
  }
}

// Load CMS content when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadAdmissionsContent);
} else {
  loadAdmissionsContent();
}
