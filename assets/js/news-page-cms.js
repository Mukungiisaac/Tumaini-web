const NEWS_PAGE_API_URL = 'http://192.168.0.110:3001';

async function loadNewsPageSettings() {
  try {
    const response = await fetch(`${NEWS_PAGE_API_URL}/api/news/settings`);
    if (!response.ok) return;
    const settings = await response.json();
    const fields = {
      page_badge: 'news-page-badge', page_title: 'news-page-title', page_description: 'news-page-description',
      stat1_value: 'news-stat1-value', stat1_label: 'news-stat1-label',
      stat2_value: 'news-stat2-value', stat2_label: 'news-stat2-label',
      stat3_value: 'news-stat3-value', stat3_label: 'news-stat3-label',
      stat4_value: 'news-stat4-value', stat4_label: 'news-stat4-label'
    };
    Object.entries(fields).forEach(([key, id]) => {
      const element = document.getElementById(id);
      if (element && settings[key]) element.textContent = settings[key];
    });
    let content = {};
    try { content = JSON.parse(settings.content_json || '{}'); } catch (error) { content = {}; }
    const contentFields = {
      featuredTitle: 'featured-story-title',
      featuredDescription: 'featured-story-description',
      eventsTitle: 'events-section-title',
      eventsDescription: 'events-section-description',
      newsletterTitle: 'newsletter-section-title',
      newsletterDescription: 'newsletter-section-description'
    };
    Object.entries(contentFields).forEach(([key, id]) => {
      const element = document.getElementById(id);
      if (element && content[key]) element.textContent = content[key];
    });
    if (content.featuredImage) {
      const featuredImage = document.getElementById('featured-story-image');
      if (featuredImage) featuredImage.src = content.featuredImage;
    }
    [1, 2, 3].forEach(number => {
      const event = content[`event${number}`];
      if (!event) return;
      Object.entries(event).forEach(([key, value]) => {
        const element = document.getElementById(`event${number}-${key}`);
        if (element && value) element.textContent = value;
      });
    });
  } catch (error) {
    console.warn('News page settings unavailable; using built-in content.', error);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadNewsPageSettings);
} else {
  loadNewsPageSettings();
}
