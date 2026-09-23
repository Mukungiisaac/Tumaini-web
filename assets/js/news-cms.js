const NEWS_API_URL = 'http://192.168.0.110:3001';

function escapeNewsHtml(value) {
  const element = document.createElement('div');
  element.textContent = value || '';
  return element.innerHTML;
}

function newsCategorySlug(category) {
  const value = (category || 'General').toLowerCase();
  if (value.includes('academic')) return 'academics';
  if (value.includes('sport')) return 'sports';
  if (value.includes('child')) return 'children-home';
  if (value.includes('community') || value.includes('general')) return 'community';
  if (value.includes('lead')) return 'leadership';
  return value.replace(/[^a-z0-9]+/g, '-');
}

function formatNewsDate(dateValue) {
  if (!dateValue) return 'Recently published';
  const date = new Date(dateValue);
  return Number.isNaN(date.getTime()) ? dateValue : date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

function renderCmsNews(articles) {
  const grid = document.getElementById('articles-grid');
  if (!grid || !articles.length) return;

  grid.innerHTML = articles.map(article => {
    const category = article.category || 'General';
    const categorySlug = newsCategorySlug(category);
    const articleId = `cms-news-${article.id}`;
    const excerpt = (article.content || '').replace(/<[^>]*>/g, '').trim();
    const image = article.featured_image || 'assets/images/news-library.jpg';

    window.cmsNewsArticles = window.cmsNewsArticles || {};
    window.cmsNewsArticles[articleId] = article;

    return `
      <article data-category="${escapeNewsHtml(categorySlug)}" data-keywords="${escapeNewsHtml(`${category} ${article.title} ${excerpt}`)}" class="news-card bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-card hover:shadow-xl transition-all duration-300 flex flex-col group">
        <div class="h-52 w-full overflow-hidden relative">
          <img src="${escapeNewsHtml(image)}" alt="${escapeNewsHtml(article.title)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
          <span class="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/90 text-brand-dark font-bold text-[11px] shadow-sm">${escapeNewsHtml(category)}</span>
        </div>
        <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            <div class="flex items-center gap-2 text-xs text-slate-500">
              <time datetime="${escapeNewsHtml(article.publication_date || '')}">${escapeNewsHtml(formatNewsDate(article.publication_date))}</time>
              <span>•</span>
              <span>News update</span>
            </div>
            <h3 class="text-lg font-bold text-slate-900 group-hover:text-brand-dark transition-colors leading-snug">${escapeNewsHtml(article.title)}</h3>
            <p class="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">${escapeNewsHtml(excerpt)}</p>
          </div>
          <div class="pt-3 border-t border-gray-100 flex items-center justify-between">
            <button type="button" onclick="openStoryModal('${articleId}')" class="inline-flex items-center gap-1.5 text-xs font-bold text-brand-dark hover:text-brand-gold transition-colors">
              <span>Read Full Story</span>
              <span aria-hidden="true">→</span>
            </button>
            <span class="text-[11px] text-slate-400 font-medium">${escapeNewsHtml(article.author || 'Tumaini Media Desk')}</span>
          </div>
        </div>
      </article>`;
  }).join('');

  const originalOpenStoryModal = window.openStoryModal;
  window.openStoryModal = function(storyKey) {
    const article = window.cmsNewsArticles && window.cmsNewsArticles[storyKey];
    if (!article) {
      originalOpenStoryModal(storyKey);
      return;
    }

    document.getElementById('modal-image').src = article.featured_image || 'assets/images/news-library.jpg';
    document.getElementById('modal-title').textContent = article.title;
    document.getElementById('modal-category').textContent = article.category || 'General';
    document.getElementById('modal-date').textContent = formatNewsDate(article.publication_date);
    document.getElementById('modal-author').textContent = article.author || 'Tumaini Media Desk';
    document.getElementById('modal-body').innerHTML = article.content || '';
    document.getElementById('story-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  if (typeof initNewsFeatures === 'function') initNewsFeatures();
}

async function loadCmsNews() {
  try {
    const response = await fetch(`${NEWS_API_URL}/api/news`);
    if (!response.ok) return;
    const articles = await response.json();
    if (Array.isArray(articles) && articles.length) renderCmsNews(articles);
  } catch (error) {
    console.warn('News CMS unavailable; showing built-in news stories.', error);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadCmsNews);
} else {
  loadCmsNews();
}
