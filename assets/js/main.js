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

