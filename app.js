const viewer = document.getElementById('image-viewer');
const fullImage = document.getElementById('viewer-image');
const caption = document.getElementById('viewer-caption');
const close = viewer.querySelector('button');
let opener;
let previousOverflow;
document.querySelectorAll('.graphics-card img, .automation-card img').forEach(image => {
  const button = document.createElement('button');
  button.type = 'button'; button.className = 'image-button';
  button.setAttribute('aria-label', 'View full image: ' + image.alt);
  image.before(button); button.append(image);
  button.addEventListener('click', () => {
    opener = button; fullImage.src = image.currentSrc || image.src; fullImage.alt = image.alt;
    caption.textContent = image.alt; previousOverflow = document.body.style.overflow;
    viewer.showModal(); document.body.style.overflow = 'hidden';
  });
});
close.addEventListener('click', () => viewer.close());
viewer.addEventListener('click', event => { if(event.target === viewer) viewer.close(); });
viewer.addEventListener('close', () => { document.body.style.overflow = previousOverflow || ''; fullImage.removeAttribute('src'); opener?.focus(); });
document.querySelectorAll('video').forEach(video => video.addEventListener('play', () => {
  document.querySelectorAll('video').forEach(other => { if(other !== video) other.pause(); });
}));
document.querySelectorAll('img:not(#viewer-image)').forEach(image => image.addEventListener('error', () => {
  const note = document.createElement('div'); note.className = 'media-error';
  note.textContent = image.alt + ' — image currently unavailable'; image.replaceWith(note);
}, {once: true}));
