export default function Card({ value, className = '', children, ...props }) {
    return (
        <div className={`bg-gray-50 shadow-md p-4 mb-4 rounded-lg border border-gray-300 ` + className} {...props}>
            {value ? value : children}
        </div>
    );
}
