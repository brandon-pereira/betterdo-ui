import { useEffect } from 'react';

const ESCAPE_KEY = 27;

function useEscapeKey(callback?: () => void) {
    useEffect(() => {
        if (!window || !window.document || !callback) {
            return;
        }

        const onKeyPress = (event: KeyboardEvent) =>
            event.keyCode === ESCAPE_KEY && callback();
        window.document.addEventListener('keydown', onKeyPress);
        return () => {
            window.document.removeEventListener('keydown', onKeyPress);
        };
    }, [callback]);
}

export default useEscapeKey;
