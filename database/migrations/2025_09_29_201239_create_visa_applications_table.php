<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('visa_applications', function (Blueprint $table) {
            $table->id();
            $table->string('application_id')->unique();
            $table->string('application_type');
            $table->string('passport_type');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('passport_number');
            $table->string('visa_type');
            $table->string('nationality');
            $table->string('port_of_arrival');
            $table->date('date_of_birth');
            $table->string('email');
            $table->date('expected_arrival_date');
            $table->string('phone_number');
            $table->string('time_zone')->nullable();


            // Second form fields
            $table->string('surname')->nullable();
            $table->string('given_name')->nullable();
            $table->boolean('name_change')->default(false);
            $table->enum('sex', ['male', 'female', 'other'])->nullable();
            $table->string('town_city_of_birth')->nullable();
            $table->string('country_of_birth')->nullable();
            $table->string('citizenship_national_id_no')->nullable();
            $table->string('religion')->nullable();
            $table->string('visible_identification_marks')->nullable();
            $table->string('edu_qualification')->nullable();
            $table->enum('lived_two_years', ['Yes', 'No'])->nullable();
            $table->string('place_of_issue')->nullable();
            $table->date('date_of_issue')->nullable();
            $table->date('date_of_expiry')->nullable();


             // Third Form Fields (Address & Family Details)
            $table->string('house_street')->nullable();
            $table->string('village_city')->nullable();
            $table->string('country')->nullable();
            $table->string('state_province')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('mobile_number')->nullable();
            $table->string('permanent_house_street')->nullable();
            $table->string('permanent_village_city')->nullable();
            $table->string('permanent_state_province')->nullable();
            $table->string('father_full_name')->nullable();
            $table->string('father_nationality')->nullable();
            $table->string('father_previous_nationality')->nullable();
            $table->string('father_place_of_birth')->nullable();
            $table->string('father_country_of_birth')->nullable();
            $table->string('mother_full_name')->nullable();
            $table->string('mother_nationality')->nullable();
            $table->string('mother_previous_nationality')->nullable();
            $table->string('mother_place_of_birth')->nullable();
            $table->string('mother_country_of_birth')->nullable();
            $table->enum('marital_status', ['SINGLE', 'MARRIED'])->nullable();
            $table->string('spouse_name')->nullable();
            $table->string('spouse_nationality')->nullable();
            $table->string('spouse_previous_nationality')->nullable();
            $table->string('spouse_place_of_birth')->nullable();
            $table->string('spouse_country_of_birth')->nullable();
            $table->string('present_occupation')->nullable();
            $table->string('employer_name')->nullable();
            $table->string('designation')->nullable();
            $table->string('employer_address')->nullable();
            $table->string('employer_phone')->nullable();
            $table->string('past_occupation')->nullable();



            // Fourth Form Fields (Visa Details & References)
            $table->string('type_of_visa')->nullable();
            $table->integer('duration_of_visa')->nullable();
            $table->integer('duration_of_stay')->nullable();
            $table->string('number_of_entries')->nullable();
            $table->string('place_likely_to_be_visited')->nullable();
            $table->string('place_likely_to_be_visited_2')->nullable();
            $table->string('expected_port_of_exit')->nullable();
            $table->enum('have_visited_india', ['Yes', 'No'])->nullable();
            $table->enum('permission_refused', ['Yes', 'No'])->nullable();
            $table->text('countries_visited')->nullable();
            $table->string('reference_name_india')->nullable();
            $table->string('reference_phone_india')->nullable();
            $table->text('reference_address_india')->nullable();
            $table->string('reference_name')->nullable();
            $table->string('reference_phone')->nullable();
            $table->text('reference_address')->nullable();
            $table->string('reference_photo')->nullable();
            $table->string('passport_copy')->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visa_applications');
    }
};
