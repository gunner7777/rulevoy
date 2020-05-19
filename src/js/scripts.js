function TopscrollTo() {
  if (window.scrollY != 0) {
    setTimeout(function() {
      window.scrollTo(0, window.scrollY - 300);
      TopscrollTo();
    }, 20);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const firstBlock = document.querySelector(".About");
  const firstBlockHeight = firstBlock.clientHeight;
  const headerNode = document.querySelector(".Header-Outer");
  const goToUp = document.querySelector(".GoToUp");

  fixedHeader(headerNode, firstBlockHeight);
  goToUpButton(goToUp, firstBlockHeight);

  window.addEventListener("scroll", function() {
    fixedHeader(headerNode, firstBlockHeight);
    goToUpButton(goToUp, firstBlockHeight);
  });

  document.addEventListener("click", function(e) {
    if (e.target.classList.contains("Menu-Link")) {
      e.preventDefault();
      let blockForScroll = document.getElementById(e.target.dataset.toBlockId);
      blockForScroll.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  });
});

function fixedHeader(h, fbh) {
  if (pageYOffset > fbh - h.clientHeight) {
    h.classList.add("Header_Fixed");
  } else {
    h.classList.remove("Header_Fixed");
  }
}

function goToUpButton(gtu, fbh) {
  if (pageYOffset > fbh) {
    gtu.classList.add("GoToUp_Show");
  } else {
    gtu.classList.remove("GoToUp_Show");
  }
}
