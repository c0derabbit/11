(function() {
  var images = Array.from(document.querySelectorAll('article img'))
  var modalImgIdx;

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

  for (var i = 0; i < images.length; i++) {
    var img = images[i]
    if (img.id !== 'modal-img')
      img.addEventListener('click', showImage)
  }

  function showImage(e) {
    modalImgIdx = images.indexOf(e.target)

    updateModalImg(e.target.dataset.src)

    var modal = document.getElementById('modal')
    modal.classList.remove('opacity-0')
    modal.classList.remove('pointer-events-none')
    modal.addEventListener('click', hideModal)
    window.addEventListener('keydown', handleKey)
  }

  function updateModalImg(src) {
    var modalImg = document.getElementById('modal-img')
    modalImg.src = src
  }

  function hideModal() {
    var modal = document.getElementById('modal')
    var modalImg = document.getElementById('modal-img')

    modal.classList.add('opacity-0')
    modal.classList.add('pointer-events-none')
    setTimeout(function() {
      modalImg.src = ''
      modalImgIdx = null
    }, 300)
    document.body.classList.remove('overflow-hidden')
    window.removeEventListener('keydown', handleKey)
  }

  function handleKey(e) {
    var key = e.keyCode
    var LEFT = 37
    var RIGHT = 39
    var UP = 38
    var DOWN = 40
    var ESC = 27
    var RETURN = 13
    var SPACE = 32

    if (key === LEFT || key === UP) showPrev()
    if (key === RIGHT || key === DOWN || key === SPACE) showNext()
    if (key === ESC || key === RETURN) hideModal()
  }

  function showPrev() {
    if (modalImgIdx > 0) navigateImages(-1)
  }

  function showNext() {
    if (modalImgIdx < images.length - 1) navigateImages(1)
  }

  function navigateImages(direction) {
    modalImgIdx += direction
    var img = images[modalImgIdx]
    updateModalImg(img.dataset.src)
  }
})()
