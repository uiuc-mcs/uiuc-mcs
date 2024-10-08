// randomColor by David Merfield under the CC0 license
// https://github.com/davidmerfield/randomColor/

export function randomColor(options?: { seed?: number | string; count?: number; hue?: string; luminosity?: string; format?: string; alpha?: number }): string | string[] {
    let seed: number | null = null;
    const colorDictionary: { [key: string]: { hueRange: number[]; lowerBounds: number[][]; saturationRange: number[]; brightnessRange: number[] } } = {};
    loadColorBounds();
    const colorRanges: boolean[] = [];
    options = options || {};

    if (options.seed !== undefined && options.seed !== null && options.seed === parseInt(options.seed as string, 10)) {
        seed = options.seed as number;
    } else if (typeof options.seed === 'string') {
        seed = stringToInteger(options.seed);
    } else if (options.seed !== undefined && options.seed !== null) {
        throw new TypeError('The seed value must be an integer or string');
    } else {
        seed = null;
    }

    let H: number, S: number, B: number;

    H = pickHue(options);
    S = pickSaturation(H, options);
    B = pickBrightness(H, S, options);
    return HSVtoHex([H, S, B]);
    // return setFormat([H, S, B], options);

    function pickHue(options: { hue?: string }): number {
        // if (colorRanges.length > 0) {
        //     let hueRange: number[] = getRealHueRange(options.hue);
        //     let hue: number = randomWithin(hueRange);
        //     const step: number = (hueRange[1] - hueRange[0]) / colorRanges.length;
        //     let j: number = parseInt((hue - hueRange[0]) / step as any);
        //     if (colorRanges[j] === true) {
        //         j = (j + 2) % colorRanges.length;
        //     } else {
        //         colorRanges[j] = true;
        //     }
        //     const min: number = (hueRange[0] + j * step) % 359;
        //     const max: number = (hueRange[0] + (j + 1) * step) % 359;
        //     hueRange = [min, max];
        //     hue = randomWithin(hueRange);
        //     if (hue < 0) { hue = 360 + hue; }
        //     return hue;
        // } else {
            const hueRange: number[] = getHueRange(options.hue);
            let hue: number = randomWithin(hueRange);
            if (hue < 0) {
                hue = 360 + hue;
            }
            return hue;
        // }
    }

    function pickSaturation(hue: number, options: { hue?: string; luminosity?: string }): number {
        if (options.luminosity === 'random') {
            return randomWithin([0, 100]);
        }
        const saturationRange: number[] = getSaturationRange(hue);
        let sMin: number = saturationRange[0];
        let sMax: number = saturationRange[1];

        switch (options.luminosity) {
            case 'bright':
                sMin = 55;
                break;
            case 'dark':
                sMin = sMax - 10;
                break;
            case 'light':
                sMax = 55;
                break;
        }
        return randomWithin([sMin, sMax]);
    }

    function pickBrightness(H: number, S: number, options: { luminosity?: string }): number {
        let bMin: number = getMinimumBrightness(H, S);
        let bMax: number = 100;

        switch (options.luminosity) {
            case 'dark':
                bMax = bMin + 20;
                break;
            case 'light':
                bMin = (bMax + bMin) / 2;
                break;
            case 'random':
                bMin = 0;
                bMax = 100;
                break;
        }
        return randomWithin([bMin, bMax]);
    }

    function getMinimumBrightness(H: number, S: number): number {
        const lowerBounds: number[][] = getColorInfo(H).lowerBounds;
        for (let i = 0; i < lowerBounds.length - 1; i++) {
            const s1: number = lowerBounds[i][0];
            const v1: number = lowerBounds[i][1];
            const s2: number = lowerBounds[i + 1][0];
            const v2: number = lowerBounds[i + 1][1];

            if (S >= s1 && S <= s2) {
                const m: number = (v2 - v1) / (s2 - s1);
                const b: number = v1 - m * s1;
                return m * S + b;
            }
        }
        return 0;
    }

    function getHueRange(colorInput?: number | string): number[] {
        return [0, 360];
    }

    function getSaturationRange(hue: number): number[] {
        return getColorInfo(hue).saturationRange;
    }

    function getColorInfo(hue: number): { lowerBounds: number[][]; saturationRange: number[] } | any {
        if (hue >= 334 && hue <= 360) {
            hue -= 360;
        }
        for (const colorName in colorDictionary) {
            const color = colorDictionary[colorName];
            if (color.hueRange && hue >= color.hueRange[0] && hue <= color.hueRange[1]) {
                return colorDictionary[colorName];
            }
        }
        return 'Color not found';
    }

    function randomWithin(range: number[]): number {
        if (seed === null) {
            const golden_ratio: number = 0.618033988749895;
            let r: number = Math.random();
            r += golden_ratio;
            r %= 1;
            return Math.floor(range[0] + r * (range[1] + 1 - range[0]));
        } else {
            const max: number = range[1] || 1;
            const min: number = range[0] || 0;
            seed = (seed * 9301 + 49297) % 233280;
            const rnd: number = seed / 233280.0;
            return Math.floor(min + rnd * (max - min));
        }
    }

    function HSVtoHex(hsv: number[]): string {
        const rgb: number[] = HSVtoRGB(hsv);
        function componentToHex(c: number): string {
            const hex: string = c.toString(16);
            return hex.length == 1 ? '0' + hex : hex;
        }
        const hex: string = '#' + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);
        return hex;
    }

    function defineColor(name: string, hueRange: number[] , lowerBounds: number[][]): void {
        const sMin: number = lowerBounds[0][0];
        const sMax: number = lowerBounds[lowerBounds.length - 1][0];
        const bMin: number = lowerBounds[lowerBounds.length - 1][1];
        const bMax: number = lowerBounds[0][1];

        colorDictionary[name] = {
            hueRange: hueRange,
            lowerBounds: lowerBounds,
            saturationRange: [sMin, sMax],
            brightnessRange: [bMin, bMax]
        };
    }

    function loadColorBounds(): void {
        // defineColor('monochrome', null, [[0, 0], [100, 0]]);
        defineColor('red', [-26, 18], [[20, 100], [30, 92], [40, 89], [50, 85], [60, 78], [70, 70], [80, 60], [90, 55], [100, 50]]);
        defineColor('orange', [18, 46], [[20, 100], [30, 93], [40, 88], [50, 86], [60, 85], [70, 70], [100, 70]]);
        defineColor('yellow', [46, 62], [[25, 100], [40, 94], [50, 89], [60, 86], [70, 84], [80, 82], [90, 80], [100, 75]]);
        defineColor('green', [62, 178], [[30, 100], [40, 90], [50, 85], [60, 81], [70, 74], [80, 64], [90, 50], [100, 40]]);
        defineColor('blue', [178, 257], [[20, 100], [30, 86], [40, 80], [50, 74], [60, 60], [70, 52], [80, 44], [90, 39], [100, 35]]);
        defineColor('purple', [257, 282], [[20, 100], [30, 87], [40, 79], [50, 70], [60, 65], [70, 59], [80, 52], [90, 45], [100, 42]]);
        defineColor('pink', [282, 334], [[20, 100], [30, 90], [40, 86], [60, 84], [80, 80], [90, 75], [100, 73]]);
    }

    function HSVtoRGB(hsv: number[]): number[] {
        let h: number = hsv[0];
        if (h === 0) { h = 1; }
        if (h === 360) { h = 359; }
        h = h / 360;
        const s: number = hsv[1] / 100;
        const v: number = hsv[2] / 100;
        const h_i: number = Math.floor(h * 6);
        const f: number = h * 6 - h_i;
        const p: number = v * (1 - s);
        const q: number = v * (1 - f * s);
        const t: number = v * (1 - (1 - f) * s);
        let r: number = 256;
        let g: number = 256;
        let b: number = 256;

        switch (h_i) {
            case 0: r = v; g = t; b = p; break;
            case 1: r = q; g = v; b = p; break;
            case 2: r = p; g = v; b = t; break;
            case 3: r = p; g = q; b = v; break;
            case 4: r = t; g = p; b = v; break;
            case 5: r = v; g = p; b = q; break;
        }

        const result: number[] = [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
        return result;
    }

    function HexToHSB(hex: string): number[] {
        hex = hex.replace(/^#/, '');
        hex = hex.length === 3 ? hex.replace(/(.)/g, '$1$1') : hex;
        const red: number = parseInt(hex.substr(0, 2), 16) / 255;
        const green: number = parseInt(hex.substr(2, 2), 16) / 255;
        const blue: number = parseInt(hex.substr(4, 2), 16) / 255;
        const cMax: number = Math.max(red, green, blue);
        const delta: number = cMax - Math.min(red, green, blue);
        const saturation: number = cMax ? (delta / cMax) : 0;

        switch (cMax) {
            case red: return [60 * (((green - blue) / delta) % 6) || 0, saturation, cMax];
            case green: return [60 * (((blue - red) / delta) + 2) || 0, saturation, cMax];
            case blue: return [60 * (((red - green) / delta) + 4) || 0, saturation, cMax];
        }
        return []
    }

    function HSVtoHSL(hsv: number[]): number[] {
        const h: number = hsv[0];
        const s: number = hsv[1] / 100;
        const v: number = hsv[2] / 100;
        const k: number = (2 - s) * v;
        return [
            h,
            Math.round(s * v / (k < 1 ? k : 2 - k) * 10000) / 100,
            k / 2 * 100
        ];
    }

    function stringToInteger(string: string): number {
        let total: number = 0;
        for (let i = 0; i !== string.length; i++) {
            if (total >= Number.MAX_SAFE_INTEGER) break;
            total += string.charCodeAt(i);
        }
        return total;
    }

    function getRealHueRange(colorHue: number | string): number[] {
        if (!isNaN(Number(colorHue))) {
            const number: number = parseInt(colorHue as string);
            if (number < 360 && number > 0) {
                return getColorInfo(number).hueRange;
            }
        } else if (typeof colorHue === 'string') {
            if (colorDictionary[colorHue]) {
                const color = colorDictionary[colorHue];
                if (color.hueRange) {
                    return color.hueRange;
                }
            } else if (colorHue.match(/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i)) {
                const hue: number = HexToHSB(colorHue)[0];
                return getColorInfo(hue).hueRange;
            }
        }
        return [0, 360];
    }
}