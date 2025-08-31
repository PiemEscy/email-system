import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                'text-sm border-gray-400 focus:border-color-theme focus:color-theme text-gray-900 rounded-md shadow-sm' +
                className
            }
            ref={input}
        />
    );
});
