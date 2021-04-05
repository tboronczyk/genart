import {svgNS, rand} from './common.js';
import {colorSchemes} from './colorschemes.js';
import {shapesNeat, shapesMessy} from './shapes.js';

const nCells = {x: 4, y: 4};
const cellSize = 50;
const spacing = 2;

const width = nCells.x * (cellSize + spacing * 2);
const height = nCells.y * (cellSize + spacing * 2);

const svg = document.createElementNS(svgNS, 'svg');
svg.setAttribute('xmlns', svgNS);
svg.setAttribute('width', width);
svg.setAttribute('height', height);
svg.setAttribute('viewbox', `0 0 ${width} ${height}`);
//svg.style.backgroundColor = '#FFFFFF';

const scheme = colorSchemes[Math.floor(rand(colorSchemes.length))];
console.log(scheme.name);

const colors = scheme();
const invertTriangle = Math.round(rand());
const useMessy = Math.round(rand());

for (let y = 0; y < nCells.y; ++y) {
    for (let x = 0; x < nCells.x; ++x) {
        // position
        const transforms = [
            'translate(' +
            (x * (cellSize + spacing * 2) + spacing) + ',' +
            (y * (cellSize + spacing * 2) + spacing) + ')'
        ];

        const shape = (useMessy)
            ? shapesMessy[Math.floor(rand(shapesMessy.length))]
            : shapesNeat[Math.floor(rand(shapesNeat.length))];
            
        const color = colors[Math.floor(rand(colors.length))];

        const s = shape(cellSize, color);
        if (s.name == 'triangle' && invertTriangle) {
            transforms.push(`translate(0, ${cellSize})`);
            transforms.push('scale(1, -1)');
        }

        s.setAttribute('transform', transforms);
        svg.appendChild(s);
    }
}

document.getElementById('app').appendChild(svg);

// click to download
const svgBlob = new Blob([svg.outerHTML], {type: 'image/svg+xml;charset=utf-8'});
const url = URL.createObjectURL(svgBlob);

const a = document.createElement('a');
a.setAttribute('download', '');
a.setAttribute('href', url);

svg.addEventListener('click', () => {
    a.click();
});
