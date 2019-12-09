export default class TouchEvents {
    constructor(element, callback) {
        // Define elements
        this.element = element;
        this.callback = callback;
        // Define state
        this.touchstartX = 0;
        this.touchstartY = 0;
        this.touchendX = 0;
        this.touchendY = 0;
        // Bind functions
        this.touchstart = this.touchstart.bind(this);
        this.touchend = this.touchend.bind(this);
        // Initialize
        this.init();
    }

    // Add event listeners
    init() {
        this.element.addEventListener('touchstart', this.touchstart, false);
        this.element.addEventListener('touchend', this.touchend, false);
    }

    // Remove event listeners
    destroy() {
        this.element.removeEventListener('touchstart', this.touchstart);
        this.element.removeEventListener('touchend', this.touchend);
    }

    touchstart(event) {
        this.touchstartX = event.touches[0].clientX;
        this.touchstartY = event.touches[0].clientY;
    }

    touchend(event) {
        this.touchendX = event.changedTouches[0].clientX;
        this.touchendY = event.changedTouches[0].clientY;
        const direction = this.getDirection();
        if (direction) {
            this.callback({ direction }, event);
        }
    }

    getDirection() {
        if (this.touchendX < this.touchstartX) {
            return 'left';
        } else if (this.touchendX > this.touchstartX) {
            return 'right';
        } else if (this.touchendY < this.touchstartY) {
            return 'up';
        } else if (this.touchendY > this.touchstartY) {
            return 'down';
        }
    }
}
