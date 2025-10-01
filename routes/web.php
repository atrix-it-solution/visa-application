<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\VisaApplicationController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');



Route::get('/visa-application', [VisaApplicationController::class, 'create'])->name('visa.application.create');
Route::post('/visa-application', [VisaApplicationController::class, 'store'])->name('visa.application.store');
Route::get('/form-visa-two/{applicationId}', [VisaApplicationController::class, 'showFormTwo'])
    ->name('form.formtwo')
    ->where('applicationId', '[A-Z0-9]+');
Route::post('/form-visa-two/{applicationId}', [VisaApplicationController::class, 'updateFormTwo'])->name('form.update-form-two');
// Third Form Routes
Route::get('/form-visa-three/{applicationId}', [VisaApplicationController::class, 'showFormThree'])
    ->name('form.formthree')
    ->where('applicationId', '[A-Z0-9]+');
    
Route::post('/form-visa-three/{applicationId}', [VisaApplicationController::class, 'updateFormThree'])
    ->name('form.update-form-three');

    // Fourth Form Routes
Route::get('/form-visa-four/{applicationId}', [VisaApplicationController::class, 'showFormFour'])
    ->name('form.formfour')
    ->where('applicationId', '[A-Z0-9]+');
    
Route::post('/form-visa-four/{applicationId}', [VisaApplicationController::class, 'updateFormFour'])
    ->name('form.update-form-four');

// Preview Route
Route::get('/form-preview/{applicationId}', [VisaApplicationController::class, 'showPreview'])
    ->name('form.previewform')
    ->where('applicationId', '[A-Z0-9]+');

Route::post('/form-final-submit/{applicationId}', [VisaApplicationController::class, 'finalSubmit'])
    ->name('form.final.submit');

Route::get('/form-thankyou/{applicationId}', [VisaApplicationController::class, 'Thankyou'])
    ->name('thankyou.thankyoupage');



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

Route::get('/visa-applications', [VisaApplicationController::class, 'index'])
    ->name('visa-applications.index');

    Route::resource('blogs', BlogController::class);
});

Route::post('/upload-image', [UploadController::class, 'uploadImage'])->name('upload.image');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
