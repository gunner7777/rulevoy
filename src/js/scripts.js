function TopscrollTo() {
  if (window.scrollY != 0) {
    setTimeout(function () {
      window.scrollTo(0, window.scrollY - 300);
      TopscrollTo();
    }, 20);
  }
}

let checkInputs = function (pattern, checkNode, errorText) {
  let error = document.createElement("p");
  error.classList.add("Input-Error");
  if (!pattern.test(checkNode.value)) {
    error.innerHTML = errorText;
    checkNode.parentNode.parentNode.appendChild(error);
    return false;
  } else {
    if (
      checkNode.parentNode.parentNode.getElementsByClassName(
        "Input-Error"
      )[0] !== undefined
    )
      checkNode.parentNode.parentNode.removeChild(
        checkNode.parentNode.parentNode.lastChild
      );
  }
  return true;
};

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
    let labelVal = label.innerHTML;
    input.addEventListener("change", function (e) {
      let fileName = "";
      fileName = e.target.value.split("\\").pop();

      if (fileName) label.innerHTML = fileName;
      else label.innerHTML = labelVal;
    });
  });

  // send callback
  const callbackForm = document.querySelector(".Callback-Form");
  //console.log("object", callbackForm);
  callbackForm.addEventListener("submit", function (event) {
    event.preventDefault();

    //let that = this;
    const fd = new FormData();
    //console.log(document.getElementById("cbFio").value);
    fd.append("cbFio", document.getElementById("cbFio").value);
    fd.append("cbPhone", document.getElementById("cbPhone").value);
    fd.append("cbCity", document.getElementById("cbCity").value);
    fd.append("purpose", "callback");

    if (
      !checkInputs(
        /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u,
        document.getElementById("cbFio"),
        "Ошибка ввода имени"
      )
    )
      return false;

    if (
      !checkInputs(
        /^\d+$/,
        document.getElementById("cbPhone"),
        "Ошибка ввода телефона"
      )
    )
      return false;

    if (
      !checkInputs(
        /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u,
        document.getElementById("cbCity"),
        "Ошибка ввода города"
      )
    )
      return false;

    /*     for (var key of fd.entries()) {
      console.log(key[0] + ", " + key[1]);
    } */

    fetch("http://localhost/taxirul.ru/mailSender.php", {
      method: "POST",
      body: fd,
    })
      .then((response) => {
        if (response.ok) {
          console.log("resp", response.text());
          //that.innerHTML =
          //'<p class="FormZakaz-Result">Спасибо за обращение! Мы с вами свяжемся в ближайшее время</p>';
          //return response.json();
        } else {
          console.log("resp err", response.text());
          //that.innerHTML =
          //  '<p class="FormZakaz-Result">Возникла ошибка. Пожалуйста, повторите отправку данных</p>';
        }
      })
      .catch((err) => console.log("error", err));
    this.reset();
  });

  //earn now form
  const earnNowForm = document.querySelector(".EarnNow-Form");
  earnNowForm.addEventListener("submit", function (event) {
    event.preventDefault();

    //var that = this;
    const fd = new FormData(this);
    /* fd.append("enFio", document.getElementById("enFio").value);
    fd.append("enPhone", document.getElementById("enPhone").value);
    fd.append("enCity", document.getElementById("enCity").value);
    fd.append(
      "brandAuto",
      document.getElementById("brandAuto").checked ? true : false
    );
    fd.append("stsBack", $("input[type=file]")[0].files[0]);
    fd.append("vodFront", $("input[type=file]")[1].files[0]);
    fd.append("vodBack", $("input[type=file]")[2].files[0]);
    fd.append("passport", $("input[type=file]")[3].files[0]);
    fd.append("passportSelfie", $("input[type=file]")[4].files[0]);
    fd.append("addressReg", $("input[type=file]")[5].files[0]); */
    fd.append("purpose", "earnNow");

    if (
      !checkInputs(
        /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u,
        document.getElementById("enFio"),
        "Ошибка ввода имени"
      )
    )
      return false;

    if (
      !checkInputs(
        /^\d+$/,
        document.getElementById("enPhone"),
        "Ошибка ввода телефона"
      )
    )
      return false;

    if (
      !checkInputs(
        /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u,
        document.getElementById("enCity"),
        "Ошибка ввода города"
      )
    )
      return false;

    for (var key of fd.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    fetch("http://localhost/taxirul.ru/mailSender.php", {
      method: "POST",
      body: fd,
    })
      .then((response) => {
        if (response.ok) {
          console.log("resp", response.text());
          //that.innerHTML =
          //'<p class="FormZakaz-Result">Спасибо за обращение! Мы с вами свяжемся в ближайшее время</p>';
          //return response.json();
        } else {
          console.log("resp err", response.text());
          //.innerHTML =
          // '<p class="FormZakaz-Result">Возникла ошибка. Пожалуйста, повторите отправку данных</p>';
        }
      })
      .catch((err) => console.log("error", err));
    this.reset();
  });
});

function goToUpButton(gtu, fbh) {
  if (pageYOffset > fbh) {
    gtu.classList.add("GoToUp_Show");
  } else {
    gtu.classList.remove("GoToUp_Show");
  }
}

function toggleModal() {
  const modal = document.querySelector(".Modal-Outer");
  modal.classList.toggle("Modal-Outer_Show");
}

/* const callbackForm = document.querySelector('.Callback-Form');
  callbackForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var that = this;
    var fd = new FormData();
    fd.append("cbFio", document.getElementById(cbFio).value);
    fd.append("myproject-phone", $("#myproject-phone").val());
    fd.append("myproject-email", $("#myproject-email").val());
    fd.append("myproject-technBuild", $("#myproject-technBuild").val());
    fd.append("myproject-file1", $("input[type=file]")[0].files[0]);
    fd.append("myproject-file2", $("input[type=file]")[1].files[0]);
    fd.append("myproject-file3", $("input[type=file]")[2].files[0]);
    fd.append("myproject-file4", $("input[type=file]")[3].files[0]);
    fd.append("myproject-file5", $("input[type=file]")[4].files[0]);
    fd.append("myproject-message", $("#myproject-message").val());
    fd.append("purpose", "myproject");

    if (
      !checkInputs(
        /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u,
        document.getElementById("myproject-name"),
        "Ошибка ввода имени"
      )
    )
      return false;

    if (
      !checkInputs(
        /^\d+$/,
        document.getElementById("myproject-phone"),
        "Ошибка ввода телефона"
      )
    )
      return false;

    if (
      !checkInputs(
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,5})+$/,
        document.getElementById("myproject-email"),
        "Ошибка ввода электронной почты"
      )
    )
      return false;

    that
      .getElementsByClassName("preloaderMyProject")[0]
      .classList.add("preloaderMyProject_Active");
    $.ajax({
      type: "POST",
      url: "http://xn--e1amjcnqa.xn--p1ai/mail_sender2.php",
      data: fd,
      contentType: false,
      processData: false,
      success: function (data) {
        that.innerHTML =
          '<p class="FormZakaz-Result">Спасибо за обращение! Мы с вами свяжемся в ближайшее время</p>';
        //document.getElementsByClassName('preloaderMyProject')[0].classList.remove('preloaderMyProject_Active');
        that
          .getElementsByClassName("preloaderMyProject")[0]
          .classList.remove("preloaderMyProject_Active");
      },
      error: function (error) {
        that.innerHTML =
          '<p class="FormZakaz-Result">Возникла ошибка. Пожалуйста, повторите отправку данных</p>';
      },
    });
  }); */
