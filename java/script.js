"use strict";

const sideNavEl = document.querySelector(".main-nav");
const navEl = document.querySelector(".nav-container");
const sectionEl = document.querySelectorAll(".section");
const btnSideNav = document.querySelector(".btn-side-nav");
const pageIndex = document.querySelector(".page-index");
const pageAbout = document.querySelector(".page-about");
const pagePortfolio = document.querySelector(".page-portfolio");
const page = document.querySelectorAll(".scrollable");
const scrollButton = document.querySelector(".back-btn");

//side navigation
const sideNavWindow = window.matchMedia("(min-width:58em)");
btnSideNav.addEventListener("click", function () {
  if (sideNavWindow.matches) {
    sideNavEl.classList.toggle("open-nav");
    navEl.classList.toggle("move-open--two");
    for (let i = 0; i < sectionEl.length; i++) {
      sectionEl[i].classList.toggle("move-open--one");
    }
    btnSideNav.classList.toggle("open-side");
  } else {
    sideNavEl.classList.toggle("open-nav");
    btnSideNav.classList.toggle("open-side");
  }
});

//scroll to top button
const showWindow = 10;
for (let x = 0; x < page.length; x++) {
  page[x].addEventListener("scroll", function () {
    if (page[x].scrollTop > showWindow) {
      scrollButton.classList.remove("hidden");
    } else {
      scrollButton.classList.add("hidden");
    }
  });
}

//smooth scroll
const allLinks = document.querySelectorAll("a:link");
allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    //Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    //Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }
  });
});

//smooth page transition
var speed = "slow";
$("html, body").hide();
$(document).ready(function () {
  $("html, body").fadeIn(speed, function () {
    $("a[href], button[href]").click(function (event) {
      var url = $(this).attr("href");
      if (url.indexOf("#") == 0 || url.indexOf("javascript:") == 0) return;
      event.preventDefault();
      $("html, body").fadeOut(speed, function () {
        window.location = url;
      });
    });
  });
});

//required checkbox
$(function () {
  let requiredCheckboxes = $(".options :checkbox[required]");
  requiredCheckboxes.change(function () {
    if (requiredCheckboxes.is(":checked")) {
      requiredCheckboxes.removeAttr("required");
    } else {
      requiredCheckboxes.attr("required", "required");
    }
  });
});

//zoom img
function onClick(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
}
function closeClick() {
  document.getElementById("modal01").style.display = "none";
}

//change desc
$(document).ready(function () {
  $(".commissions-btn").click(function () {
    $("div.commissions").attr("style", "display:none; opacity:0;");
    $("div.commissions-imgs").attr("style", "display:none; opacity:0;");
    $("li.commissions-btn").attr(
      "style",
      "background-color:#e3fafc; color:#0b7285;"
    );
    let index = $("ul.commissions-btns li").index(this);
    $("div.commissions")
      .eq(index + 1)
      .attr("style", "display:block; opacity:1; animation:fade 1s;");
    $("div.commissions-imgs")
      .eq(index + 1)
      .attr("style", "display:block; opacity:1; animation:fade 1s;");
    $("li.commissions-btn")
      .eq(index)
      .attr("style", "background-color: #0b7285; color: #e3fafc;");
  });
});

//form submission
const scriptURL =
  "https://script.google.com/macros/s/AKfycbzmGNXwRTCA8_p9wpjBDI7tIkrsHQX8TPoF11rmEbOcYmHanAPPsXL91Pjnd0mw5n9ZSA/exec";
const form = document.forms["commissions"];
form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      console.log("Success!", response);
      alert(
        "Your response has been sent.\nPlease wait for the reply in 24 hours maximum.\nThank you!"
      );
      location.reload();
    })
    .catch((error) => console.error("Error!", error.message));
});

// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
