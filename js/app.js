$(document).ready(function () {
    $('#ripple').ripples({
        resolution: 512,
        dropRadius: 10,
    })

    const bars = document.querySelectorAll('.progress_bar');
    bars.forEach(function (bar) {
        let percentage = bar.dataset.parcent;
        let tooltip = bar.children[0];
        tooltip.innerText = percentage + '%';
        bar.style.width = percentage + '%';
    })

    // counter 
    const counters = document.querySelectorAll('.counter');
    function runCounter() {
        counters.forEach(counter => {
            counter.innerText = 0;
            let target = +counter.dataset.count;
            let step = target / 100;

            let countIt = function () {
                let displayedNumber = +counter.innerText;
                if (displayedNumber < target) {
                    counter.innerText = Math.ceil(displayedNumber + step);
                    setTimeout(countIt, 1)
                }
                else {
                    counter.innerText = target;
                }
            }
            countIt();
        })
    }
    // runCounter();

    let counterSection = document.querySelector(".counter_wrapper");
    let options = {
        rootMargin: '0px 0px -200px 0px'
    }
    let done = 0;
    const sectionObserver = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting && done == 0) {
            done = 1;
            runCounter();
        }
    }, options)
    sectionObserver.observe(counterSection);


    // image filter use jqyery 
    let $wrapper = $('.portfolio_wrapper');
    $wrapper.isotope({
        filter: "*",
        layoutMode: 'masonry',
        animationOption: {
            duration: 750,
            easing: "linear"
        }
    });

    let links = document.querySelectorAll('.tabs a');
    links.forEach(link => {
        let selector = link.dataset.filter;
        link.addEventListener('click', function (e) {
            e.preventDefault();
            $wrapper.isotope({
                filter: selector,
                layoutMode: 'masonry',
                animationOption: {
                    duration: 750,
                    easing: "linear"
                }
            });
            links.forEach(link => {
                link.classList.remove('active');
            })
            e.target.classList.add('active');
        })
    })
    //magnify popup
    $('.magnify').magnificPopup({
        type: "image",
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true
        }
    })

});
