import { useEffect, useState } from "react";

export type ScrollDirection = "down" | "up";

/**
 * Tracks the user's vertical scroll direction.
 * Used so directional reveal animations (e.g. timeline accent bars) flow
 * with the scroll: top→bottom when scrolling down, bottom→top when scrolling up.
 */
export function useScrollDirection(): ScrollDirection {
    const [direction, setDirection] = useState<ScrollDirection>("down");

    useEffect(() => {
        let lastY = window.scrollY;
        let ticking = false;

        const update = () => {
            const y = window.scrollY;
            // Ignore sub-pixel jitter so the origin doesn't flicker.
            if (Math.abs(y - lastY) > 4) {
                setDirection(y > lastY ? "down" : "up");
                lastY = y;
            }
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                window.requestAnimationFrame(update);
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return direction;
}
