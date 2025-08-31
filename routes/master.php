<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Master\EmailTemplateMasterController;

Route::middleware(['auth'])->prefix('master')->name('master.')->group(function () {
    
    Route::prefix('email-template')->name('email.template.')->group(function () {
        Route::get('/', [EmailTemplateMasterController::class, 'index'])->name('index');
        Route::post('/filter-data', [EmailTemplateMasterController::class, 'filterData'])->name('filter.data');
        Route::post('/create-data', [EmailTemplateMasterController::class, 'store'])->name('store.data');
    });

});
