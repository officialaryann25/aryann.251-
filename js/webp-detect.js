/* WebP feature detection – adds 'webp' class to <html> when supported.
   Must be loaded synchronously (no defer/async) so the class is present
   before CSS background-image rules are evaluated. */
(function () {
  var img = new Image();
  img.onload = img.onerror = function () {
    if (img.width === 1) {
      document.documentElement.classList.add('webp');
    }
  };
  img.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAQAcJZQCdAEO/gHOAAA=';
}());
