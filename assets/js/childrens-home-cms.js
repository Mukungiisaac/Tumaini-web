// Children's Home CMS Integration Script
const API_BASE_URL = localStorage.getItem('apiUrl') || 'http://localhost:3001';

// Fetch and populate children's home content from CMS
async function loadChildrensHomeContent() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/children-home`);
    
    if (!response.ok) {
      console.warn('Failed to load CMS content, using default static content');
      return;
    }

    const data = await response.json();
    console.log('Children\'s Home CMS data loaded:', data);

    // === HERO SECTION ===
    
    // Hero Image
    if (data.hero_image) {
      const heroImg = document.querySelector('.relative.rounded-3xl img');
      if (heroImg) heroImg.src = data.hero_image;
    }

    // Floating Badge
    if (data.hero_badge_title) {
      const badgeTitle = document.querySelector('.absolute.bottom-6 .text-xs.font-bold');
      if (badgeTitle) badgeTitle.textContent = data.hero_badge_title;
    }
    if (data.hero_badge_subtitle) {
      const badgeSubtitle = document.querySelector('.absolute.bottom-6 .text-\\[11px\\].text-slate-500');
      if (badgeSubtitle) badgeSubtitle.textContent = data.hero_badge_subtitle;
    }
    if (data.hero_badge_tag) {
      const badgeTag = document.querySelector('.absolute.bottom-6 .bg-brand-mint.text-brand-dark');
      if (badgeTag) badgeTag.textContent = data.hero_badge_tag;
    }

    // Main Hero Card
    if (data.hero_card_badge) {
      const cardBadge = document.querySelector('.lg\\:col-span-6.bg-brand-dark .inline-flex.items-center.gap-2');
      if (cardBadge) {
        const textNode = Array.from(cardBadge.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
        if (textNode) textNode.textContent = data.hero_card_badge;
      }
    }
    if (data.hero_heading_line1 && data.hero_heading_line2) {
      const heading = document.querySelector('.lg\\:col-span-6.bg-brand-dark h1');
      if (heading) {
        heading.innerHTML = `${data.hero_heading_line1} <span class="text-brand-gold">${data.hero_heading_line2}</span>`;
      }
    }
    if (data.hero_description) {
      const description = document.querySelector('.lg\\:col-span-6.bg-brand-dark p.text-gray-200');
      if (description) description.textContent = data.hero_description;
    }
    if (data.hero_button1_text) {
      const btn1 = document.querySelector('.lg\\:col-span-6.bg-brand-dark a.bg-brand-gold');
      if (btn1) btn1.textContent = data.hero_button1_text;
    }
    if (data.hero_button2_text) {
      const btn2 = document.querySelector('.lg\\:col-span-6.bg-brand-dark a.border-white\\/30');
      if (btn2) btn2.textContent = data.hero_button2_text;
    }
    if (data.hero_social_text) {
      const socialText = document.querySelector('.lg\\:col-span-6.bg-brand-dark .border-white\\/15 p');
      if (socialText) {
        const parts = data.hero_social_text.split('**');
        if (parts.length === 3) {
          socialText.innerHTML = `${parts[0]}<strong class="text-white font-semibold">${parts[1]}</strong>${parts[2]}`;
        } else {
          socialText.textContent = data.hero_social_text;
        }
      }
    }

    // === KEY STATS SECTION ===
    
    const statCards = document.querySelectorAll('.grid.grid-cols-2.lg\\:grid-cols-4 > div');
    
    // Stat 1
    if (statCards[0]) {
      if (data.stat1_number) statCards[0].querySelector('.text-3xl').textContent = data.stat1_number;
      if (data.stat1_title) statCards[0].querySelector('.text-sm.font-semibold').textContent = data.stat1_title;
      if (data.stat1_description) statCards[0].querySelector('.text-xs.text-slate-500').textContent = data.stat1_description;
    }
    
    // Stat 2
    if (statCards[1]) {
      if (data.stat2_number) statCards[1].querySelector('.text-3xl').textContent = data.stat2_number;
      if (data.stat2_title) statCards[1].querySelector('.text-sm.font-semibold').textContent = data.stat2_title;
      if (data.stat2_description) statCards[1].querySelector('.text-xs.text-slate-500').textContent = data.stat2_description;
    }
    
    // Stat 3
    if (statCards[2]) {
      if (data.stat3_number) statCards[2].querySelector('.text-3xl').textContent = data.stat3_number;
      if (data.stat3_title) statCards[2].querySelector('.text-sm.font-semibold').textContent = data.stat3_title;
      if (data.stat3_description) statCards[2].querySelector('.text-xs.text-slate-500').textContent = data.stat3_description;
    }
    
    // Stat 4
    if (statCards[3]) {
      if (data.stat4_number) statCards[3].querySelector('.text-3xl').textContent = data.stat4_number;
      if (data.stat4_title) statCards[3].querySelector('.text-sm.font-semibold').textContent = data.stat4_title;
      if (data.stat4_description) statCards[3].querySelector('.text-xs.text-slate-500').textContent = data.stat4_description;
    }

    // === HOLISTIC CARE SECTION ===
    
    // Section Header
    const careSection = document.querySelector('section.py-16');
    if (careSection) {
      if (data.care_section_badge) {
        const badge = careSection.querySelector('.text-brand-gold.font-bold.text-xs');
        if (badge) badge.textContent = data.care_section_badge;
      }
      if (data.care_section_title) {
        const title = careSection.querySelector('h2.text-3xl');
        if (title) title.textContent = data.care_section_title;
      }
      if (data.care_section_description) {
        const desc = careSection.querySelector('h2.text-3xl + p');
        if (desc) desc.textContent = data.care_section_description;
      }
    }

    // Care Cards
    const careCards = document.querySelectorAll('.grid.grid-cols-1.md\\:grid-cols-3 > div');
    
    // Care Card 1: Academic
    if (careCards[0]) {
      if (data.care1_image) careCards[0].querySelector('img').src = data.care1_image;
      if (data.care1_badge) careCards[0].querySelector('.absolute.top-4 span').textContent = data.care1_badge;
      if (data.care1_title) careCards[0].querySelector('h3').textContent = data.care1_title;
      if (data.care1_description) careCards[0].querySelector('h3 + p').textContent = data.care1_description;
    }
    
    // Care Card 2: Nutrition
    if (careCards[1]) {
      if (data.care2_image) careCards[1].querySelector('img').src = data.care2_image;
      if (data.care2_badge) careCards[1].querySelector('.absolute.top-4 span').textContent = data.care2_badge;
      if (data.care2_title) careCards[1].querySelector('h3').textContent = data.care2_title;
      if (data.care2_description) careCards[1].querySelector('h3 + p').textContent = data.care2_description;
    }
    
    // Care Card 3: Healthcare
    if (careCards[2]) {
      if (data.care3_image) careCards[2].querySelector('img').src = data.care3_image;
      if (data.care3_badge) careCards[2].querySelector('.absolute.top-4 span').textContent = data.care3_badge;
      if (data.care3_title) careCards[2].querySelector('h3').textContent = data.care3_title;
      if (data.care3_description) careCards[2].querySelector('h3 + p').textContent = data.care3_description;
    }

    // === SAFEGUARDING SECTION ===
    
    const safeguardingSection = document.querySelector('.bg-brand-surface.border.border-brand-border');
    if (safeguardingSection) {
      if (data.safeguarding_image) {
        const img = safeguardingSection.querySelector('img');
        if (img) img.src = data.safeguarding_image;
      }
      if (data.safeguarding_badge) {
        const badge = safeguardingSection.querySelector('.inline-flex.items-center.px-3');
        if (badge) badge.textContent = data.safeguarding_badge;
      }
      if (data.safeguarding_title) {
        const title = safeguardingSection.querySelector('h2');
        if (title) title.textContent = data.safeguarding_title;
      }
      if (data.safeguarding_description) {
        const desc = safeguardingSection.querySelector('h2 + p');
        if (desc) desc.textContent = data.safeguarding_description;
      }

      // Safeguarding Points
      const points = safeguardingSection.querySelectorAll('.space-y-3 > div');
      
      if (data.safeguarding_point1 && points[0]) {
        const p = points[0].querySelector('p');
        if (p) {
          const match = data.safeguarding_point1.match(/^(.+?):\s*(.+)$/);
          if (match) {
            p.innerHTML = `<strong class="text-slate-900 font-semibold">${match[1]}:</strong> ${match[2]}`;
          } else {
            p.textContent = data.safeguarding_point1;
          }
        }
      }
      
      if (data.safeguarding_point2 && points[1]) {
        const p = points[1].querySelector('p');
        if (p) {
          const match = data.safeguarding_point2.match(/^(.+?):\s*(.+)$/);
          if (match) {
            p.innerHTML = `<strong class="text-slate-900 font-semibold">${match[1]}:</strong> ${match[2]}`;
          } else {
            p.textContent = data.safeguarding_point2;
          }
        }
      }
      
      if (data.safeguarding_point3 && points[2]) {
        const p = points[2].querySelector('p');
        if (p) {
          const match = data.safeguarding_point3.match(/^(.+?):\s*(.+)$/);
          if (match) {
            p.innerHTML = `<strong class="text-slate-900 font-semibold">${match[1]}:</strong> ${match[2]}`;
          } else {
            p.textContent = data.safeguarding_point3;
          }
        }
      }
      
      if (data.safeguarding_point4 && points[3]) {
        const p = points[3].querySelector('p');
        if (p) {
          const match = data.safeguarding_point4.match(/^(.+?):\s*(.+)$/);
          if (match) {
            p.innerHTML = `<strong class="text-slate-900 font-semibold">${match[1]}:</strong> ${match[2]}`;
          } else {
            p.textContent = data.safeguarding_point4;
          }
        }
      }
    }

    // === SPONSORSHIP SECTION ===
    
    const sponsorSection = document.querySelector('#support');
    if (sponsorSection) {
      if (data.sponsor_badge) {
        const badge = sponsorSection.querySelector('.text-brand-gold.font-bold.text-xs');
        if (badge) badge.textContent = data.sponsor_badge;
      }
      if (data.sponsor_title) {
        const title = sponsorSection.querySelector('h2.text-3xl');
        if (title) title.textContent = data.sponsor_title;
      }
      if (data.sponsor_description) {
        const desc = sponsorSection.querySelector('h2 + p');
        if (desc) desc.textContent = data.sponsor_description;
      }

      // Sponsorship Tiers
      const tierCards = sponsorSection.querySelectorAll('.grid.grid-cols-1.lg\\:grid-cols-3 > div');
      
      // Tier 1: Supporter
      if (tierCards[0]) {
        if (data.tier1_name) {
          const name = tierCards[0].querySelector('h3');
          if (name) name.textContent = data.tier1_name;
        }
        if (data.tier1_price) {
          const price = tierCards[0].querySelector('.text-3xl');
          if (price) price.textContent = data.tier1_price;
        }
        if (data.tier1_period) {
          const period = tierCards[0].querySelector('.text-3xl + span');
          if (period) period.textContent = data.tier1_period;
        }
        if (data.tier1_description) {
          const desc = tierCards[0].querySelector('p.text-xs.sm\\:text-sm.text-slate-600.mb-6');
          if (desc) desc.textContent = data.tier1_description;
        }
        if (data.tier1_button_text) {
          const btn = tierCards[0].querySelector('a');
          if (btn) btn.textContent = data.tier1_button_text;
        }
      }
      
      // Tier 2: Guardian (Featured)
      if (tierCards[1]) {
        if (data.tier2_name) {
          const name = tierCards[1].querySelector('h3');
          if (name) name.textContent = data.tier2_name;
        }
        if (data.tier2_price) {
          const price = tierCards[1].querySelector('.text-3xl');
          if (price) price.textContent = data.tier2_price;
        }
        if (data.tier2_period) {
          const period = tierCards[1].querySelector('.text-3xl + span');
          if (period) period.textContent = data.tier2_period;
        }
        if (data.tier2_description) {
          const desc = tierCards[1].querySelector('p.text-xs.sm\\:text-sm.text-gray-200.mb-6');
          if (desc) desc.textContent = data.tier2_description;
        }
        if (data.tier2_button_text) {
          const btn = tierCards[1].querySelector('a');
          if (btn) btn.textContent = data.tier2_button_text;
        }
      }
      
      // Tier 3: Champion
      if (tierCards[2]) {
        if (data.tier3_name) {
          const name = tierCards[2].querySelector('h3');
          if (name) name.textContent = data.tier3_name;
        }
        if (data.tier3_price) {
          const price = tierCards[2].querySelector('.text-3xl');
          if (price) price.textContent = data.tier3_price;
        }
        if (data.tier3_period) {
          const period = tierCards[2].querySelector('.text-3xl + span');
          if (period) period.textContent = data.tier3_period;
        }
        if (data.tier3_description) {
          const desc = tierCards[2].querySelector('p.text-xs.sm\\:text-sm.text-slate-600.mb-6');
          if (desc) desc.textContent = data.tier3_description;
        }
        if (data.tier3_button_text) {
          const btn = tierCards[2].querySelector('a');
          if (btn) btn.textContent = data.tier3_button_text;
        }
      }
    }

    console.log('✅ Children\'s Home CMS content loaded successfully');

  } catch (error) {
    console.error('Error loading Children\'s Home CMS content:', error);
    // Page will display default static content
  }
}

// Load CMS content when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadChildrensHomeContent);
} else {
  loadChildrensHomeContent();
}
