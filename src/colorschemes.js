import {rand} from './common.js';

class HSL {
    constructor(hue, sat = 50, lum = 50) {
        this.h = hue;
        this.s = sat;
        this.l = lum;
    }

    set hue(h) { this.h = h; }
    set sat(s) { this.h = s; }
    set lum(l) { this.h = l; }

    get hue() { return this.h; }
    get sat() { return this.s; }
    get lum() { return this.l; }

    clamp(x, max = 100, min = 0) {
        return Math.min(max, Math.max(min, x));
    }

    color(x) { 
        return new HSL(
            (this.h + x) % 360,
            this.s,
            this.l
        );
    }
/*
    saturate(x) {
        return new HSL(
            this.h,
            this.clamp(this.s + x),
            this.clamp(this.l - x * 2)
        );
    }
*/
    brighten(x) {
        return new HSL(
            this.h,
            this.clamp(this.s - x / 2),
            this.clamp(this.l + x)
        );
    }

    toString() {
        return `hsl(${this.h}, ${this.s}%, ${this.l}%)`;
    }
}

export const colorSchemes = [
    function random () {
        return [
            '#' + Math.random().toString(16).substr(2, 6),
            '#' + Math.random().toString(16).substr(2, 6),
            '#' + Math.random().toString(16).substr(2, 6)
        ];
    },

    function monochromatic() {
        const c1 = new HSL(Math.round(rand(360)));
        const c2 = c1.brighten(20);
        const c3 = c1.brighten(-20);

        return [c1, c2, c3];
    },

    function analogous() {
        const c1 = new HSL(Math.round(rand(360)));
        const c2 = c1.color(30)/*.saturate(rand(5, -5))*/.brighten(rand(20, -20));
        const c3 = c1.color(-30)/*.saturate(rand(5, -5))*/.brighten(rand(20, -20));

        return [c1, c2, c3];
    },

    function complimentary() {
        const c1 = new HSL(Math.round(rand(360)));
        const c2 = c1.color(180);

        return [c1, c2];
    },

    function splitComplimentary() {
        const c1 = new HSL(Math.round(rand(360)));
        const c2 = c1.color(150)/*.saturate(rand(5, -5))*/.brighten(rand(20, -20));
        const c3 = c1.color(210)/*.saturate(rand(5, -5))*/.brighten(rand(20, -20));

        return [c1, c2, c3];
    },

    function triad() {
        const c1 = new HSL(Math.round(rand(360)));
        const c2 = c1.color(120)/*.saturate(rand(5, -5))*/.brighten(rand(20, -20));
        const c3 = c1.color(240)/*.saturate(rand(5, -5))*/.brighten(rand(20, -20));

        return [c1, c2, c3];
    }
];
