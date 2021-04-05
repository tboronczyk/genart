export const svgNS = 'http://www.w3.org/2000/svg';

export function rand(max = 1, min = 0) {
    return min + Math.random() * (max - min);
}
