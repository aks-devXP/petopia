export function urlChanger(category, page) {
  const params = new URLSearchParams(window.location.search);
  params.set('page', String(page));
  if (Array.isArray(category) && category.length) {
    params.set('categories', category.join(','));
  } else {
    params.delete('categories');
  }
  const newURL = `${window.location.pathname}?${params.toString()}`;

  const sameUrl = newURL === window.location.pathname + window.location.search;
  const state = { category, page };

  if (sameUrl) {
    window.history.replaceState(state, '', newURL);
  } else {
    window.history.pushState(state, '', newURL);
  }
}
