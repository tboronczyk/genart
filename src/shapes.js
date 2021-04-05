import {svgNS, rand} from './common.js';

function randPointSquare(size) {
    let x = rand(size);
    let y = rand(size);
    return {x, y};
}

// https://stackoverflow.com/a/50746409/322819
function randPointCircle(size) {
    const r = size / 2 * Math.sqrt(rand());
    const t = rand() * 2 * Math.PI;
    const x = size / 2 + r * Math.cos(t);
    const y = size / 2 + r * Math.sin(t);
    return {x, y};
}

// https://stackoverflow.com/a/19654424/322819
function randPointTriangle(size) {
    // const a = {x: size / 2, y: 0};
    // const b = {x: 0, y: size};
    // const c = {x: size, y: size};
    const r1 = rand();
    const r2 = rand();

    // const x = (1 - Math.sqrt(r1)) * a.x + (Math.sqrt(r1) * (1 - r2)) * b.x + (sqrt(r1) * r2) * c.x
    const x = (1 - Math.sqrt(r1)) * size / 2 + Math.sqrt(r1) * r2 * size;
    // const y = (1 - Math.sqrt(r1)) * a.y + (Math.sqrt(r1) * (1 - r2)) * b.y + (sqrt(r1) * r2) * c.y
    const y = Math.sqrt(r1) * (1 - r2) * size + Math.sqrt(r1) * r2 * size;

    return {x, y};
}

function makePath(name, pointFunc, size, nLines) {
    const path = document.createElementNS(svgNS, 'path');
    const d = [];
    for (let i = 0; i < nLines; ++i) {
        let p1 = pointFunc(size);
        let p2 = pointFunc(size);
        d.push(`M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`);
    }
    path.setAttribute('d', d);
    path.name = name;
    return path;
}

export const shapesNeat = [
    function square(size, color) {
        const shape = document.createElementNS(svgNS, 'rect');
        //shape.setAttribute('x', 0);
        //shape.setAttribute('y', 0);
        shape.setAttribute('width', size);
        shape.setAttribute('height', size);
        shape.setAttribute('fill', color);
        shape.name = 'square';
        return shape;
    },

    function circle(size, color) {
        const shape = document.createElementNS(svgNS, 'circle');
        shape.setAttribute('cx', size / 2);
        shape.setAttribute('cy', size / 2);
        shape.setAttribute('r', size / 2);
        shape.setAttribute('fill', color);
        shape.name = 'circle';
        return shape;
    },

    function triangle(size, color) {
        const shape = document.createElementNS(svgNS, 'path');
        shape.setAttribute('d', `M ${size / 2} 0 L 0 ${size} L ${size} ${size} Z`);
        shape.setAttribute('fill', color);
        shape.name = 'triangle';
        return shape;
    }
]

export const shapesMessy = [
    function square(size, color) {
        const shape = makePath('square', randPointSquare, size, 1024);
        shape.setAttribute('fill', 'none');
        shape.setAttribute('stroke', color);
        shape.name = 'square';
        return shape;
    },

    function circle(size, color) {
        const shape = makePath('circle', randPointCircle, size, 1024);
        shape.setAttribute('fill', 'none');
        shape.setAttribute('stroke', color);
        shape.name = 'square';
        return shape;
    },

    function triangle(size, color) {
        const shape = makePath('triangle', randPointTriangle, size, 512);
        shape.setAttribute('fill', 'none');
        shape.setAttribute('stroke', color);
        shape.name = 'triangle';
        return shape;
    }
];
