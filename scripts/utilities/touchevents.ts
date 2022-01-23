type Direction = 'left' | 'right' | 'up' | 'down';

type CallbackPayload = {
    direction: Direction;
};
type Callback = (payload: CallbackPayload, e?: TouchEvent) => void;

class TouchEvents {
    private element: HTMLElement;
    private callback: Callback;

    private touchstartX: number;
    private touchstartY: number;
    private touchendX: number;
    private touchendY: number;

    constructor(element: HTMLElement, callback: Callback) {
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

    touchstart(event: TouchEvent) {
        this.touchstartX = event.touches[0].clientX;
        this.touchstartY = event.touches[0].clientY;
    }

    touchend(event: TouchEvent) {
        this.touchendX = event.changedTouches[0].clientX;
        this.touchendY = event.changedTouches[0].clientY;
        const direction = this.getDirection();
        if (direction) {
            this.callback({ direction }, event);
        }
    }

    getDirection(): Direction {
        if (this.touchendX < this.touchstartX) {
            return 'left';
        } else if (this.touchendX > this.touchstartX) {
            return 'right';
        } else if (this.touchendY < this.touchstartY) {
            return 'up';
        } else if (this.touchendY > this.touchstartY) {
            return 'down';
        }
        // should this function return null here?
        return 'down';
    }
}

export default TouchEvents;
