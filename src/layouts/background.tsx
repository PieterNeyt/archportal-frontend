'use client';

import {useEffect} from 'react';

interface Props {
    speedFactor?: number;
    starColor?: [number, number, number];
    starCount?: number;
}

export default function Starfield(props: Props) {
    const {speedFactor = 0.05, starColor = [255, 255, 255], starCount = 5000} = props;

    useEffect(() => {
        const canvas = document.getElementById('starfield') as HTMLCanvasElement;

        if (!canvas) return;

        const c = canvas.getContext('2d');
        if (!c) return;

        let w = window.innerWidth;
        let h = window.innerHeight;

        const setCanvasExtents = () => {
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w;
            canvas.height = h;
        };

        setCanvasExtents();

        const makeStars = (count: number) => {
            return Array.from({length: count}, () => ({
                x: Math.random() * 1600 - 800,
                y: Math.random() * 900 - 450,
                z: Math.random() * 1000,
            }));
        };

        let stars = makeStars(starCount);

        // Clear met gradient
        const clear = () => {
            const gradient = c.createLinearGradient(0, 0, 0, h);
            gradient.addColorStop(0, '#4B0082'); // indigo / paars
            gradient.addColorStop(1, 'BLUE');
            c.fillStyle = gradient;
            c.fillRect(0, 0, w, h);
        };

        const putPixel = (x: number, y: number, brightness: number) => {
            c.fillStyle = `rgba(${starColor[0]}, ${starColor[1]}, ${starColor[2]}, ${brightness})`;
            c.fillRect(x, y, 2, 2);
        };

        const moveStars = (distance: number) => {
            for (let s of stars) {
                s.z -= distance;
                if (s.z <= 1) s.z += 1000;
            }
        };

        let prevTime: number;
        const init = (time: number) => {
            prevTime = time;
            requestAnimationFrame(tick);
        };

        const tick = (time: number) => {
            const elapsed = time - prevTime;
            prevTime = time;

            moveStars(elapsed * speedFactor);

            clear();

            const cx = w / 2;
            const cy = h / 2;

            for (let star of stars) {
                const x = cx + star.x / (star.z * 0.001);
                const y = cy + star.y / (star.z * 0.001);

                if (x < 0 || x >= w || y < 0 || y >= h) continue;

                const d = star.z / 1000;
                const b = 1 - d * d;

                putPixel(x, y, b);
            }

            requestAnimationFrame(tick);
        };

        requestAnimationFrame(init);

        const handleResize = () => setCanvasExtents();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [starColor, speedFactor, starCount]);

    return (
        <canvas
            id="starfield"
            style={{
                padding: 0,
                margin: 0,
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                zIndex: 0,
                opacity: 1,
                pointerEvents: 'none',
                mixBlendMode: 'normal',
            }}
        ></canvas>
    );
}
