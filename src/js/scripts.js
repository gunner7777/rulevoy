function TopscrollTo() {
  if (window.scrollY != 0) {
    setTimeout(function () {
      window.scrollTo(0, window.scrollY - 300);
      TopscrollTo();
    }, 20);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const firstBlockHeight = 600;
  const goToUp = document.querySelector(".GoToUp");

  goToUpButton(goToUp, firstBlockHeight);

  window.addEventListener("scroll", function () {
    goToUpButton(goToUp, firstBlockHeight);
  });

  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("Menu-Link")) {
      e.preventDefault();
      let blockForScroll = document.getElementById(e.target.dataset.toBlockId);
      blockForScroll.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  });

  const inputs = document.querySelectorAll(".InputFile");
  Array.prototype.forEach.call(inputs, function (input) {
    let label = input.nextElementSibling;
    console.log("label", label.textContent);
    let labelVal = label.innerHTML;
    input.addEventListener("change", function (e) {
      let fileName = "";
      fileName = e.target.value.split("\\").pop();

      if (fileName) label.innerHTML = fileName;
      else label.innerHTML = labelVal;
    });
  });
});

function goToUpButton(gtu, fbh) {
  if (pageYOffset > fbh) {
    gtu.classList.add("GoToUp_Show");
  } else {
    gtu.classList.remove("GoToUp_Show");
  }
}
