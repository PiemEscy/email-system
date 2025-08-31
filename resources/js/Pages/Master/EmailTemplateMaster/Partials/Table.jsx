import Action from "./Action";
import PaginatedTable  from "./PaginatedTable";
import { useState } from "react";

export default function Table() {
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [filterStatus, setFilterStatus] = useState("");
    const [filterSearch, setFilterSearch] = useState("");
    const [refreshTable, setRefreshTable] = useState(false);
    const rules = {
        template_name: ["required", "string", "max:50"],
        subject: ["required", "string", "max:50"],
        sender_email: ["required", "email"],
        body: ["required"],
        cc: ["nullable", "array"],
        "cc.*": ["email"],
    };

    return (
        <>
            <div className='w-full overflow-x-auto text-gray-700'>
                <Action 
                    filterStatus={filterStatus} 
                    setFilterStatus={setFilterStatus} 
                    rowsPerPage={rowsPerPage} 
                    setRowsPerPage={setRowsPerPage}
                    filterSearch={filterSearch}
                    setFilterSearch={setFilterSearch}
                    setRefreshTable={setRefreshTable}
                    rules={rules}
                />
                <PaginatedTable  
                    rowsPerPage={rowsPerPage} 
                    filterStatus={filterStatus}
                    filterSearch={filterSearch} 
                    refreshTable={refreshTable} 
                    setRefreshTable={setRefreshTable}
                    rules={rules}
                />
            </div>
        </>
    );
}
