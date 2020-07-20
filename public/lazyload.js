(function() {
  var images = Array.from(document.querySelectorAll('img'))

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(lazyload, { rootMargin: '100px' })
    for (var i = 0; i < images.length; i++) {
      observer.observe(images[i])
    }
  } else {
    for (var i = 0; i < images.length; i++) {
      var image = images[i]
      image.setAttribute('src', image.dataset.src)
      image.style.opacity = 1
    }
  }

  function lazyload(entries, observer) {
    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i]

      if (i < 2 || entry.isIntersecting) loadImage(entry)
    }
  }

  function loadImage(entry) {
    var target = entry.target
    var src = target.dataset.src

    var loader = new Image()
    loader.onload = function() {
      target.setAttribute('src', src)
      target.style.opacity = 1
      observer.unobserve(target)
    }
    loader.src = src
  }
})()
