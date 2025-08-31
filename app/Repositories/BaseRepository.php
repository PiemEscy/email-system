<?php
namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Exception;

abstract class BaseRepository
{
    protected $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function all()
    {
        return $this->model->all();
    }

    public function count()
    {
        return $this->model->count();
    }

    public function query()
    {
        return $this->model->query();
    }

    public function findById($id)
    {
        try {
            return $this->model->findOrFail($id);
        } catch (Exception $e) {
            return response()->json(['error' => 'Record not found'], 404);
        }
    
    }

    public function create(array $data)
    {
        DB::beginTransaction();
        try {
            $record = $this->model->create($data);
            DB::commit();
            return $record;
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception("Error creating record: " . $e->getMessage());
        }
    }

    public function update($id, array $data)
    {
        DB::beginTransaction();
        try {
            $modelInstance = $this->findById($id);
            $modelInstance->update($data);
            DB::commit();
            return $modelInstance;
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception("Error updating record: " . $e->getMessage());
        }
    }

    public function delete($id)
    {
        DB::beginTransaction();
        try {
            $modelInstance = $this->findById($id);
            $modelInstance->delete();
            DB::commit();
            return true;
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception("Error deleting record: " . $e->getMessage());
        }
    }
}

