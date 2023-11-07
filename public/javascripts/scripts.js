// This script is for togglebutton
$(document).ready(function () {
  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
    if ($(window).width() <= 768) {
      $("#content").toggleClass("blur");
      $("#blurnavbar").toggleClass("blur");
    }
  });
});

$(window).resize(function () {
  if ($(window).width() > 768) {
    $("#content").removeClass("blur");
    $("#blurnavbar").removeClass("blur");
  }
});

// When the "Show Div" button is clicked
$("#showButton").click(function () {
  $("#targetDiv").show();
});

// When the "Hide Div" button is clicked
$("#hideButton").click(function () {
  $("#targetDiv").hide();
});

// When the "Show Div" button is clicked
$("#showButton2").click(function () {
  $("#targetDiv2").show();
});

// When the "Hide Div" button is clicked
$("#hideButton2").click(function () {
  $("#targetDiv2").hide();
});



// This script is for input warnings
(function () {
  'use strict';
  window.addEventListener('load', function () {
    var forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();