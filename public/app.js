console.log ("I'm Running on the browser");

var link = document.getElementById('add-to-basket');
if(link) {
    link.onclick = function(e) {
            e.preventDefault();
        
        var basket = getBasketIfExists();
        
        var courseId = link.getAttribute('data-course-id');
        var course = {id: courseId, qty: 1, cost: 250};
        basket.push(course);
        localStorage.setItem('basket', JSON.stringify(basket));
        updateBasketDisplay();
    }
}
      function getBasketIfExists() {
            var basket;
            var stored = localStorage.getItem('basket');
            try{
                basket = JSON.parse(stored);
            } catch (e) {
                basket = [];
            }
            if (basket instanceof Array) {
                return basket;
            } else {
                return [];
            }
        }

function updateBasketDisplay() {
    var basket = getBasketIfExists();
    var basketcount = document.getElementById('basket-count');
    if(basketcount) {
    basketcount.innerText = basket.length;
    }
}
updateBasketDisplay();

function writeCoursesToPage() {
    var element = document.getElementById('basket-courses');
    if (!element) {
        return;
    }
    var basket = getBasketIfExists();
    var template = '<div class="basket-item">{{ name }} ({{ id }}) : {{ price }}</div>';
    var html = "";
    basket.forEach(function(course) {
        course.name = "unknown";
        html += Mustache.render(template, course);
    })
    element.innerHTML = html;
}
        writeCoursesToPage();
    





