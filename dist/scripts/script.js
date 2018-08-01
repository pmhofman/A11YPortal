(function() {
    var toggleAnnotationsBtn = document.querySelector('#annotations01');

    if (toggleAnnotationsBtn) { toggleAnnotationsBtn.addEventListener('click', toggleAnnotations); }
    //toggleAnnotationsBtn.onclick = toggleAnnotations;
    if(location.hash){toggleAnnotations();}

    function toggleAnnotations() {
        var annotationSelectors = ['.btn-annot', '.annotations', '.table-of-contents', '.btn-annot-outline', '.modal-annot', '.body'];

        annotationSelectors.forEach(function(selector){
            var selected = document.querySelectorAll(selector);
            selected.forEach(function(element){
                element.classList.toggle('annotation-on')
            });
        });
    }

    var headings = document.querySelectorAll(".collapsible-control");

    Array.prototype.forEach.call(headings, function (heading) {
        var btn = heading.querySelector("button");
        var target = heading.nextElementSibling;
        btn.onclick = function () {
            var expanded = btn.getAttribute("aria-expanded") === "true" || false;
            btn.setAttribute("aria-expanded", !expanded);
            target.hidden = expanded;
        };
    });

    var answerButtons = document.querySelectorAll(".answer-button");

    Array.prototype.forEach.call(answerButtons, function (btn) {
        var target = btn.nextElementSibling;
        btn.onclick = function () {
            var expanded = btn.getAttribute("aria-expanded") === "true" || false;
            btn.setAttribute("aria-expanded", !expanded);
            target.hidden = expanded;
        };
    });

//    var toggleTriggers = Array.from(document.querySelectorAll('[data-toggle="collapse"]'));
//
//    window.addEventListener('click', function (ev) {
//      var elm = ev.target;
//      if (toggleTriggers.includes(elm)) {
//        elm.getAttribute('aria-expanded') === 'false' ? elm.setAttribute('aria-expanded', true) : elm.setAttribute('aria-expanded', false);
//        var selector = elm.getAttribute('data-target');
//        collapse(selector, 'toggle');
//      }
//    }, false);
//
//    var fnmap = {
//      'toggle': 'toggle',
//      'show': 'add',
//      'hide': 'remove' };
//
//    var collapse = function collapse(selector, cmd) {
//      var targets = Array.from(document.querySelectorAll(selector));
//      targets.forEach(function (target) {
//        target.classList[fnmap[cmd]]('show');
//        target.getAttribute('aria-expanded') ? target.removeAttribute('aria-expanded') : target.setAttribute('aria-expanded', true);
//      });
//     };
//
//    var modalTriggers = Array.from(document.querySelectorAll('[data-toggle="modal"]'));
//
//    window.addEventListener('click', function (ev) {
//      var elm = ev.target;
//      if (modalTriggers.includes(elm)) {
//        var selector = elm.getAttribute('data-target');
//        modal(selector, 'toggle');
//      }
//    }, false);
//
//    var fnmap = {
//      'toggle': 'toggle',
//      'show': 'add',
//      'hide': 'remove' };
//
//    var modal = function modal(selector, cmd) {
//      var targets = Array.from(document.querySelectorAll(selector));
//      targets.forEach(function (target) {
//        target.classList[fnmap[cmd]]('show');
//        target.getAttribute('style') === 'display: block' ? target.removeAttribute('style') : target.setAttribute('style', 'display: block');
//      });
//     };

})();
