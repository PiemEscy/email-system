<?php
namespace App\Repositories;

use App\Models\MtrEmailTemplate;

class EmailTemplateRepository extends BaseRepository
{
    public function __construct(MtrEmailTemplate $model)
    {
        parent::__construct($model);
    }
}
