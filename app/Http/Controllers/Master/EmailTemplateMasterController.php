<?php
namespace App\Http\Controllers\Master;

use App\Http\Requests\EmailTemplateMasterRequest;
use App\Repositories\EmailTemplateRepository;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EmailTemplateMasterController extends Controller
{
    protected $repository;
    protected $windowTitle = "Email Template Info";
    protected $windowType = "Master";
    protected $indexUrl = "Master/EmailTemplateMaster/EmailTemplateMasterIndex";

    public function __construct(EmailTemplateRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index()
    {
        return Inertia::render($this->indexUrl, [
            'status' => session('status'),
            'windowTitle' => $this->windowTitle,
            'windowType' => $this->windowType,
        ]);
    }

    public function filterData(Request $request)
    {
        $rowsPerPage = $request->rowsPerPage;
        $filterSearch = $request->filterSearch;
        $filterStatus = $request->filterStatus;
        // Start with a query
        $query = $this->repository->query();
    
        // Apply filters
        if ($request->has('filterStatus') && $filterStatus) {
            $query->where('status', $filterStatus);
        }
    
        if ($request->has('filterSearch') && $filterSearch) {
            $searchTerm = '%' . $filterSearch . '%';
            $query->where(function ($q) use ($searchTerm) {
                $q->where('template_name', 'like', $searchTerm)
                    ->orWhere('subject', 'like', $searchTerm)
                    ->orWhere('body', 'like', $searchTerm)
                    ->orWhere('sender_email', 'like', $searchTerm);
            });
        }
    
        // Paginate results
        $data = $query->paginate($rowsPerPage);
    
        // Return JSON response
        return response()->json([
            'data' => $data,
            'filters' => $request->only(['filterStatus', 'filterSearch', 'rowsPerPage']),
        ]);
    }
    
    public function store(EmailTemplateMasterRequest $request)
    {
        $data = $request->validated();
        return response()->json($this->repository->create($data), 201);
    }

    public function update(EmailTemplateMasterRequest $request, $id)
    {
        $data = $request->validated();
        return response()->json($this->repository->update($id, $data), 201);
    }

    public function delete($id)
    {
        $this->repository->delete($id);
        return response()->json(['message' => 'Deleted successfully'], 200);
    }
}

