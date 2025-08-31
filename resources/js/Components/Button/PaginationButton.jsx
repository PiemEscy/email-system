import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from "react-icons/fa";

export default function PaginationButton({ currentPage, lastPage, totalPages, data, fetchData  }) {
    
    const nextPage = () => {
        if (currentPage < lastPage) {
            fetchData(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            fetchData(currentPage - 1);
        }
    };

    const goToFirstPage = () => fetchData(1);
    const goToLastPage = () => fetchData(lastPage);

    return (
        <div className="flex justify-between items-center mt-4 text-sm">
            <span className="text-gray-600">Page {currentPage} of {lastPage} (showing {data.length} out of {totalPages} Rows) </span>
            <div className="flex space-x-2">
                <button
                    onClick={goToFirstPage}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 border rounded ${currentPage === 1
                        ? "bg-gray-400 cursor-not-allowed"
                        : " text-gray-800 bg-gray-300 border border-gray-400 hover:bg-gray-600 hover:text-white"
                        }`}
                >
                    <FaAngleDoubleLeft />
                </button>
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 border rounded ${currentPage === 1
                        ? "bg-gray-400 cursor-not-allowed"
                        : " text-gray-800 bg-gray-300 border border-gray-400 hover:bg-gray-600 hover:text-white"
                        }`}
                >
                    <FaAngleLeft />
                </button>
                <button
                    onClick={nextPage}
                    disabled={currentPage === lastPage}
                    className={`px-3 py-1 border rounded ${currentPage === lastPage
                        ? "bg-gray-400 cursor-not-allowed"
                        : " text-gray-800 bg-gray-300 border border-gray-400 hover:bg-gray-600 hover:text-white"
                        }`}
                >
                    <FaAngleRight />
                </button>
                <button
                    onClick={goToLastPage}
                    disabled={currentPage === lastPage}
                    className={`px-3 py-1 border rounded ${currentPage === lastPage
                        ? "bg-gray-400 cursor-not-allowed"
                        : " text-gray-800 bg-gray-300 border border-gray-400 hover:bg-gray-600 hover:text-white"
                        }`}
                >
                    <FaAngleDoubleRight />
                </button>
            </div>
        </div>
    );
}
