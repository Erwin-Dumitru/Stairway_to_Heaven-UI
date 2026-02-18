import { useEffect } from 'react';

export default function ChatTest() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://asigurari.ro/ai-assistant/js/widget.js';
        script.defer = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return null;
}
