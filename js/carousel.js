const trueNumber = function (num, max) {
    return num < 0 ? num + max : num;
}

const signNumber = function (num, max) {
    return num > max * 0.5 ? num % max - max : num;
}

const wrapNumber = function (num, max) {
    return trueNumber(signNumber(num, max), max);
}

class Carousel {
    constructor(o) {
        Object.assign(this, o);

        let carousel = this;


        this.currentSlide = 0;

        this.slides = this.element.find(".slide");
        this.dots = this.element.find(".control-dot");

        if (this.timing) {
            this.startSlideShow();
        }

        this.element.find(".control-left").on("click", function () {
            carousel.changeSlide(false);
            carousel.restartSlideShow();
        });

        this.element.find(".control-right").on("click", function () {
            carousel.changeSlide(true);
            carousel.restartSlideShow();
        });

        this.element.find(".control-dot").on("click", function () {
            let index = $(this).index();
            carousel.changeSlide(index);
            carousel.restartSlideShow();
        });
    }


    changeSlide(direction) {
        this.previousSlide = this.currentSlide;

        if (direction == true) {
            this.currentSlide++;
        } else if (false) {
            this.currentSlide--;
        } else {
            if (this.currentSlide == direction) {
                return;
            }
            this.currentSlide = direction;

            direction = this.currentSlide > this.previousSlide;
        }
        //This will allow the pictures to go from 0 - 2 and then at the end go back to 0
        this.currentSlide = wrapNumber(this.currentSlide, this.slides.length);

        this.showSlide(direction);
    }

    //handles the moving slides when we click on the arrows and dots.
    showSlide(direction) {
        let c = this;
        this.slides.removeClass("moving left right center");

        this.slides.eq(this.previousSlide).addClass("center");
        if (direction) {
            this.slides.eq(this.currentSlide).addClass("right");
        } else {
            this.slides.eq(this.currentSlide).addClass("left");
        }

        //handles the automatic movement of the slide show
        setTimeout(function () {
            c.dots.eq(c.currentSlide).addClass("active").siblings().removeClass("active");

            c.slides.eq(c.currentSlide).removeClass("left right").addClass("center moving");

            if (direction) {
                c.slides.eq(c.previousSlide).removeClass("center").addClass("left moving");
            } else {
                c.slides.eq(c.previousSlide).removeClass("center").addClass("right moving");
            }
        }, 10);
    }


    startSlideShow() {
        let c = this;

        c.stopSlideShow();

        c.timer = setTimeout(function () {
            c.changeSlide(true);
            c.showSlide(true);
            c.startSlideShow();
        }, c.timing)
    }

    stopSlideShow() {
        clearTimeout(this.timer);
    }

    restartSlideShow() {
        let c = this;
        this.stopSlideShow();

        if (this.timing) {
            this.timer = setTimeout(function () {
                c.startSlideShow();
            }, 5000);
        }
    }
}
