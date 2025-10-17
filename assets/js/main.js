console.log('Site loaded');

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const track = document.getElementById("image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);

//=============================================================

$(document).ready(function() {
    $("body").mousemove(function (e) {
        $("#cube").stop();
        handleMouseMove(e);
    });

    function handleMouseMove(event) {
        var x = event.pageX,
            y = event.pageY;

        $("#cube").animate({
            left: x,
            top: y
        }, 50);
    }
});

$('body').click(function(e) {
    $('<div />').addClass('shot').css({
        top: e.offsetY - 0,
        left: e.offsetX - 0
    }).appendTo('#target');
    setTimeout(removeshot, 0);
});

$('body').click(function(e) {
    $('<div />').addClass('shot2').css({
        top: e.offsetY - 0,
        left: e.offsetX - 0
    }).appendTo('#target2');
    setTimeout(removeshot2, 0);
});

function removeshot() {
    $('#target .shot:not(:animated):first').fadeOut(function() {
        $(this).remove();
    });
}

function removeshot2() {
    $('#target2 .shot2:not(:animated):first').fadeOut(function() {
        $(this).remove();
    });
}
(function () {
  function makeDraggable(win) {
    const handle = win.querySelector('.titlebar') || win;
    let startX = 0, startY = 0, startLeft = 0, startTop = 0, dragging = false;

    // Ensure we have pixel positions to write back to
    const cs = getComputedStyle(win);
    if (cs.position === 'static') win.style.position = 'fixed'; // your CSS already uses fixed
    if (!cs.left || cs.left === 'auto')  win.style.left = win.getBoundingClientRect().left + 'px';
    if (!cs.top  || cs.top  === 'auto')  win.style.top  = win.getBoundingClientRect().top  + 'px';

    function onDown(e) {
      // Ignore clicks on the control buttons so they can be clicked without dragging
      if (e.target.closest('.controls')) return;

      e.preventDefault();
      const rect = win.getBoundingClientRect();
      startLeft = rect.left;   // fixed => viewport coords
      startTop  = rect.top;
      startX = e.clientX;
      startY = e.clientY;
      dragging = true;
      handle.setPointerCapture?.(e.pointerId);
      win.style.willChange = 'left, top';
    }

    function onMove(e) {
      if (!dragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      let nx = startLeft + dx;
      let ny = startTop  + dy;

      // Constrain to viewport (optional)
      const vw = document.documentElement.clientWidth;
      const vh = document.documentElement.clientHeight;
      const maxX = vw - win.offsetWidth;
      const maxY = vh - win.offsetHeight;
      nx = Math.min(Math.max(0, nx), Math.max(0, maxX));
      ny = Math.min(Math.max(0, ny), Math.max(0, maxY));

      win.style.left = nx + 'px';
      win.style.top  = ny + 'px';
    }

    function onUp(e) {
      dragging = false;
      win.style.willChange = '';
      try { handle.releasePointerCapture(e.pointerId); } catch (_) {}
    }

    // Pointer events = mouse + touch
    handle.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }

  // Activate for all .window elements
  document.querySelectorAll('.window').forEach(makeDraggable);
})();