<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VisaApplication extends Model
{
       protected $fillable = [
        'application_id',
        'application_type',
        'passport_type',
        'first_name',
        'last_name',
        'passport_number',
        'visa_type',
        'nationality',
        'port_of_arrival',
        'date_of_birth',
        'email',
        'expected_arrival_date',
        'phone_number',
        'time_zone',

         // Second Form Fields
        'surname',
        'given_name',
        'name_change',
        'sex',
        'town_city_of_birth',
        'country_of_birth',
        'citizenship_national_id_no',
        'religion',
        'visible_identification_marks',
        'edu_qualification',
        'lived_two_years',
        'place_of_issue',
        'date_of_issue',
        'date_of_expiry',


        'house_street', 'village_city', 'country', 'state_province', 'postal_code', 'mobile_number',
        'permanent_house_street', 'permanent_village_city', 'permanent_state_province',
        'father_full_name', 'father_nationality', 'father_previous_nationality', 'father_place_of_birth', 'father_country_of_birth',
        'mother_full_name', 'mother_nationality', 'mother_previous_nationality', 'mother_place_of_birth', 'mother_country_of_birth',
        'marital_status', 'spouse_name', 'spouse_nationality', 'spouse_previous_nationality', 'spouse_place_of_birth', 'spouse_country_of_birth',
        'present_occupation', 'employer_name', 'designation', 'employer_address', 'employer_phone', 'past_occupation',

        // Fourth Form Fields
        'type_of_visa',
        'duration_of_visa', 
        'duration_of_stay',
        'number_of_entries',
        'place_likely_to_be_visited',
        'place_likely_to_be_visited_2',
        'expected_port_of_exit',
        'have_visited_india',
        'permission_refused', 
        'countries_visited',
        'reference_name_india',
        'reference_phone_india',
        'reference_address_india',
        'reference_name',
        'reference_phone',
        'reference_address',
        'reference_photo',
        'passport_copy',
    ];


     protected $casts = [
        'date_of_birth' => 'date',
        'expected_arrival_date' => 'date',
        'date_of_issue' => 'date',
        'date_of_expiry' => 'date',
        'name_change' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($visaApplication) {
            if (empty($visaApplication->application_id)) {
                $visaApplication->application_id = 'VISA' . date('Ymd') . str_pad(rand(0, 9999), 4, '0', STR_PAD_LEFT);
            }
        });
    }
}
