import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextArea({ className = '', isFocused = false, rows = 4, ...props }, ref) {
    const textarea = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            textarea.current.focus();
        }
    }, []);

    return (
        <textarea
            {...props}
            rows={rows}
            className={
                'text-sm border-gray-400 focus:border-color-theme focus:color-theme text-gray-900 rounded-md shadow-sm ' +
                className
            }
            ref={textarea}
        />
    );
});
