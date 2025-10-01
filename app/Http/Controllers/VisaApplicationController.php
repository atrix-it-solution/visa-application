<?php

namespace App\Http\Controllers;

use App\Models\VisaApplication;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VisaApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         $applications = VisaApplication::all();

        return Inertia::render('visa-applications/visaapplications', [
            'applications' => $applications
    ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
         return Inertia::render('form/firstform');
    }

     /**
     * Store first form and redirect to second form
     */
    public function store(Request $request)
    {
        // Define all validation rules first
        $rules = [
            'application_type' => 'required|string|max:255',
            'passport_type' => 'required|string|max:255',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'passport_number' => 'required|string',
            'visa_type' => 'required|string|max:255',
            'nationality' => 'required|string|max:255',
            'port_of_arrival' => 'required|string|max:255',
            'date_of_birth' => 'required|date',
            'email' => 'required|email',
            'expected_arrival_date' => 'required|date|after:today',
            'phone_number' => 'required|string|max:20',
        ];

        // Add conditional validation for time_zone
        if ($request->visa_type === 'eTOURIST VISA') {
            $rules['time_zone'] = 'required|string|in:30 Days,One Year';
        }

        // Validate all rules at once
        $validated = $request->validate($rules);

        try {
            \Log::info('Processing visa application with data:', $validated);
            
            // CHECK IF APPLICATION ALREADY EXISTS WITH THIS PASSPORT NUMBER
            $existingApplication = VisaApplication::where('passport_number', $validated['passport_number'])->first();
            
            if ($existingApplication) {
                \Log::info('Application already exists, redirecting to existing application:', [
                    'application_id' => $existingApplication->application_id,
                    'passport_number' => $existingApplication->passport_number
                ]);
                
                if ($existingApplication->type_of_visa && $existingApplication->reference_name_india) {
                    // ✅ If fourth form data exists, go to success
                    return redirect()->route('form.previewform', $existingApplication->application_id)
                        ->with('info', 'Your application is already completed!');
                } elseif ($existingApplication->house_street && $existingApplication->village_city) {
                    // ✅ If third form data exists, go to fourth form
                    return redirect()->route('form.formfour', $existingApplication->application_id)
                        ->with('info', 'We found your existing application. Please continue with final step.');
                } elseif ($existingApplication->surname && $existingApplication->given_name) {
                    // ✅ If second form data exists, go to third form
                    return redirect()->route('form.formthree', $existingApplication->application_id)
                        ->with('info', 'We found your existing application. Please continue with address details.');
                } else {
                    // ✅ Otherwise, go to second form
                    return redirect()->route('form.formtwo', $existingApplication->application_id)
                        ->with('info', 'We found an existing application with this passport number. Please continue with your application.');
                }

            }
            
            // Create new visa application if no existing one found
            \Log::info('Creating new visa application');
            $visaApplication = VisaApplication::create($validated);
            
            \Log::info('Visa application created:', [
                'id' => $visaApplication->id,
                'application_id' => $visaApplication->application_id
            ]);

            // Check if application_id was generated
            if (empty($visaApplication->application_id)) {
                \Log::error('Application ID was not generated!');
                throw new \Exception('Application ID generation failed');
            }

            return redirect()->route('form.formtwo', $visaApplication->application_id)
                ->with('success', 'First step completed! Please continue with applicant details.');

        } catch (\Exception $e) {
            \Log::error('Failed to process visa application: ' . $e->getMessage());
            return back()->with('error', 'Failed to submit application: ' . $e->getMessage())
                        ->withInput();
        }
    }

    /**
     * Store a newly created resource in storage.
     */
// public function store(Request $request)
// {
//     // Define all validation rules first
//     $rules = [
//         'application_type' => 'required|string|max:255',
//         'passport_type' => 'required|string|max:255',
//         'first_name' => 'required|string|max:255',
//         'last_name' => 'required|string|max:255',
//         'passport_number' => 'required|string',
//         'visa_type' => 'required|string|max:255',
//         'nationality' => 'required|string|max:255',
//         'port_of_arrival' => 'required|string|max:255',
//         'date_of_birth' => 'required|date',
//         'email' => 'required|email',
//         'expected_arrival_date' => 'required|date|after:today',
//         'phone_number' => 'required|string|max:20',
//     ];

//     // Add conditional validation for time_zone
//     if ($request->visa_type === 'eTOURIST VISA') {
//         $rules['time_zone'] = 'required|string|in:30 Days,One Year';
//     }

//     // Validate all rules at once
//     $validated = $request->validate($rules);

//     try {
//         \Log::info('Processing visa application with data:', $validated);
        
//         // CHECK IF APPLICATION ALREADY EXISTS WITH THIS PASSPORT NUMBER
//         $existingApplication = VisaApplication::where('passport_number', $validated['passport_number'])->first();
        
//         if ($existingApplication) {
//             \Log::info('Application already exists, redirecting to existing application:', [
//                 'application_id' => $existingApplication->application_id,
//                 'passport_number' => $existingApplication->passport_number
//             ]);
            
//             // Redirect to the existing application's second form
//             return redirect()->route('form.formtwo', $existingApplication->application_id)
//                 ->with('info', 'We found an existing application with this passport number. Please continue with your application.');
//         }
        
//         // Create new visa application if no existing one found
//         \Log::info('Creating new visa application');
//         $visaApplication = VisaApplication::create($validated);
        
//         \Log::info('Visa application created:', [
//             'id' => $visaApplication->id,
//             'application_id' => $visaApplication->application_id
//         ]);

//         // Check if application_id was generated
//         if (empty($visaApplication->application_id)) {
//             \Log::error('Application ID was not generated!');
//             throw new \Exception('Application ID generation failed');
//         }

//         return redirect()->route('form.formtwo', $visaApplication->application_id)
//             ->with('success', 'First step completed! Please continue with applicant details.');

//     } catch (\Exception $e) {
//         \Log::error('Failed to process visa application: ' . $e->getMessage());
//         return back()->with('error', 'Failed to submit application: ' . $e->getMessage())
//                     ->withInput();
//     }
// }

/**
     * Show the second form with application data
     */
    public function showFormTwo($applicationId)
    {
        $application = VisaApplication::where('application_id', $applicationId)->firstOrFail();

        return Inertia::render('form/formtwo', [
            'application' => $application,
        ]);
    }

    /**
     * Update the second form data
     */
    public function updateFormTwo(Request $request, $applicationId)
    {
        $application = VisaApplication::where('application_id', $applicationId)->firstOrFail();

        $rules = [
            'surname' => 'required|string|max:255',
            'given_name' => 'required|string|max:255',
            'name_change' => 'nullable|boolean',
            'sex' => 'required|in:male,female,other',
            'date_of_birth' => 'required|date',
            'town_city_of_birth' => 'required|string|max:255',
            'country_of_birth' => 'required|string|max:255',
            'citizenship_national_id_no' => 'nullable|string|max:255',
            'religion' => 'required|string|max:255',
            'visible_identification_marks' => 'nullable|string|max:255',
            'nationality' => 'required|string|max:255',
            'edu_qualification' => 'required|string|max:255',
            'lived_two_years' => 'required|in:Yes,No',
            'passport_number' => 'required|string|max:255',
            'place_of_issue' => 'required|string|max:255',
            'date_of_issue' => 'required|date',
            'date_of_expiry' => 'required|date',
        ];

        $validated = $request->validate($rules);

        try {
            $application->update($validated);

            return redirect()->route('form.formthree', $application->application_id)
                ->with('success', 'Step 2 completed! Please continue with address details.');

        } catch (\Exception $e) {
            return back()->with('error', 'Failed to update application: ' . $e->getMessage());
        }
    }


    /**
 * Show the third form with application data
 */
public function showFormThree($applicationId)
{
    $application = VisaApplication::where('application_id', $applicationId)->firstOrFail();

    return Inertia::render('form/formthree', [
        'application' => $application,
    ]);
}

   /**
     * Update the third form data - COMPLETE VERSION WITH ALL RULES
     */
    public function updateFormThree(Request $request, $applicationId)
    {
        $application = VisaApplication::where('application_id', $applicationId)->firstOrFail();

        $rules = [
            // Address Details (Current)
            'house_street' => 'required|string|max:255',
            'village_city' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'state_province' => 'required|string|max:255',
            'postal_code' => 'required|string|max:20',
            'mobile_number' => 'required|string|max:20',
            
            // Permanent Address
            'permanent_house_street' => 'required|string|max:255',
            'permanent_village_city' => 'required|string|max:255',
            'permanent_state_province' => 'required|string|max:255',
            
            // Family Details - Father
            'father_full_name' => 'required|string|max:255',
            'father_nationality' => 'required|string|max:255',
            'father_previous_nationality' => 'nullable|string|max:255',
            'father_place_of_birth' => 'required|string|max:255',
            'father_country_of_birth' => 'required|string|max:255',
            
            // Family Details - Mother
            'mother_full_name' => 'required|string|max:255',
            'mother_nationality' => 'required|string|max:255',
            'mother_previous_nationality' => 'nullable|string|max:255',
            'mother_place_of_birth' => 'required|string|max:255',
            'mother_country_of_birth' => 'required|string|max:255',
            
            // Marital Status & Spouse
            'marital_status' => 'required|string|max:255',
            'spouse_name' => 'nullable|string|max:255',
            'spouse_nationality' => 'nullable|string|max:255',
            'spouse_previous_nationality' => 'nullable|string|max:255',
            'spouse_place_of_birth' => 'nullable|string|max:255',
            'spouse_country_of_birth' => 'nullable|string|max:255',
            
            // Occupation Details
            'present_occupation' => 'required|string|max:255',
            'employer_name' => 'required|string|max:255',
            'designation' => 'required|string|max:255',
            'employer_address' => 'required|string|max:500',
            'employer_phone' => 'required|string|max:20',
            'past_occupation' => 'nullable|string|max:255',
        ];

        // Conditional validation for spouse fields
        if ($request->marital_status === 'married') {
            $rules['spouse_name'] = 'required|string|max:255';
            $rules['spouse_nationality'] = 'required|string|max:255';
            $rules['spouse_place_of_birth'] = 'required|string|max:255';
            $rules['spouse_country_of_birth'] = 'required|string|max:255';
        }

        $validated = $request->validate($rules);

        try {
            $application->update($validated);

            return redirect()->route('form.formfour', $application->application_id)
    ->with('success', 'Step 3 completed! Please provide visa details and references.');

        } catch (\Exception $e) {
            \Log::error('Failed to update form three: ' . $e->getMessage());
            return back()->with('error', 'Failed to update application: ' . $e->getMessage())
                        ->withInput();
        }
    }


    /**
 * Show the fourth form with application data
 */
public function showFormFour($applicationId)
{
    $application = VisaApplication::where('application_id', $applicationId)->firstOrFail();

    return Inertia::render('form/formfour', [
        'application' => $application,
    ]);
}

/**
 * Update the fourth form data
 */
public function updateFormFour(Request $request, $applicationId)
{
    $application = VisaApplication::where('application_id', $applicationId)->firstOrFail();

    $rules = [
        // Visa Details
        'type_of_visa' => 'required|string|max:255',
        'duration_of_visa' => 'required|integer',
        'duration_of_stay' => 'required|integer',
        'number_of_entries' => 'required|string|max:255',
        'port_of_arrival' => 'required|string|max:255',
        'place_likely_to_be_visited' => 'required|string|max:255',
        'place_likely_to_be_visited_2' => 'nullable|string|max:255',
        'expected_port_of_exit' => 'required|string|max:255',
        
        // Previous Visa Details
        'have_visited_india' => 'required|in:Yes,No',
        'permission_refused' => 'required|in:Yes,No',
        
        // Other Information
        'countries_visited' => 'nullable|string',
        
        // References
        'reference_name_india' => 'required|string|max:255',
        'reference_phone_india' => 'required|string|max:20',
        'reference_address_india' => 'required|string',
        'reference_name' => 'required|string|max:255',
        'reference_phone' => 'required|string|max:20',
        'reference_address' => 'required|string',
        
        // File Uploads
        'reference_photo' => 'required|file|mimes:jpg,jpeg,png|max:2048',
        'passport_copy' => 'required|file|mimes:pdf,jpg,jpeg,png|max:5120',
    ];

    $validated = $request->validate($rules);

    try {
        // Handle file uploads
        if ($request->hasFile('reference_photo')) {
            $validated['reference_photo'] = $request->file('reference_photo')->store('reference_photos', 'public');
        }
        
        if ($request->hasFile('passport_copy')) {
            $validated['passport_copy'] = $request->file('passport_copy')->store('passport_copies', 'public');
        }

        $application->update($validated);

        return redirect()->route('form.previewform', $application->application_id)
            ->with('success', 'Visa application completed successfully!');

    } catch (\Exception $e) {
        \Log::error('Failed to update form four: ' . $e->getMessage());
        return back()->with('error', 'Failed to update application: ' . $e->getMessage())
                    ->withInput();
    }
}


/**
 * Show the preview page with all application data
 */
public function showPreview($applicationId)
{
    $application = VisaApplication::where('application_id', $applicationId)->firstOrFail();

    return Inertia::render('form/previewform', [
        'application' => $application,
    ]);
}
    /**
     * Display the specified resource.
     */
    public function show(VisaApplication $visaApplication)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(VisaApplication $visaApplication)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, VisaApplication $visaApplication)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(VisaApplication $visaApplication)
    {
        //
    }

    /**
 * Handle final submission
 */
public function finalSubmit(Request $request, $applicationId)
{
    $application = VisaApplication::where('application_id', $applicationId)->firstOrFail();
    
    try {
        // Mark application as completed
        $application->update([
            'status' => 'completed',
            'submitted_at' => now(),
        ]);

        return redirect()->route('thankyou.thankyoupage', $application->application_id)
            ->with('success', 'Application submitted successfully!');

    } catch (\Exception $e) {
        \Log::error('Final submission failed: ' . $e->getMessage());
        return back()->with('error', 'Final submission failed: ' . $e->getMessage());
    }
}
     /**
     * Show Thankyou page with application ID
     */
    public function Thankyou($applicationId)
    {
        $application = VisaApplication::where('application_id', $applicationId)->firstOrFail();

        return Inertia::render('thankyou/thankyoupage', [
            'application' => $application,
        ]);
    }


}
