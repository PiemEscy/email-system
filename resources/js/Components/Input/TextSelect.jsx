export default function TextSelect({className = '', children, ...props }) {
    return (
        <select
            {...props}
            className={
                'text-sm border-gray-400 focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 rounded-md shadow-sm ' +
                className
            }
        >
            {children}
        </select>
    );
}

