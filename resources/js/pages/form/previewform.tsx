// resources/js/Pages/Form/PreviewForm.tsx
import { Head, router } from '@inertiajs/react';
import { PageProps } from '@inertiajs/core';

interface Application {
    application_id: string;
    application_type: string;
    passport_type: string;
    first_name: string;
    last_name: string;
    passport_number: string;
    visa_type: string;
    nationality: string;
    port_of_arrival: string;
    date_of_birth: string;
    email: string;
    expected_arrival_date: string;
    phone_number: string;
    time_zone?: string;
    
    // Second form data
    surname: string;
    given_name: string;
    name_change: boolean;
    sex: string;
    town_city_of_birth: string;
    country_of_birth: string;
    religion: string;
    visible_identification_marks?: string;
    edu_qualification: string;
    lived_two_years: string;
    place_of_issue: string;
    date_of_issue: string;
    date_of_expiry: string;
    
    // Third form data
    house_street: string;
    village_city: string;
    country: string;
    state_province: string;
    postal_code: string;
    mobile_number: string;
    permanent_house_street: string;
    permanent_village_city: string;
    permanent_state_province: string;
    father_full_name: string;
    father_nationality: string;
    mother_full_name: string;
    mother_nationality: string;
    marital_status: string;
    spouse_name?: string;
    present_occupation: string;
    employer_name: string;
    
    // Fourth form data
    type_of_visa: string;
    duration_of_visa: number;
    duration_of_stay: number;
    number_of_entries: string;
    place_likely_to_be_visited: string;
    expected_port_of_exit: string;
    have_visited_india: string;
    permission_refused: string;
    countries_visited?: string;
    reference_name_india: string;
    reference_phone_india: string;
    reference_address_india: string;
}

interface PreviewFormProps extends PageProps {
    application: Application;
}

export default function PreviewForm({ application }: PreviewFormProps) {
    const handleFinalSubmit = () => {
        // Redirect to thank you page
        router.visit(`/form-thankyou/${application.application_id}`);
    };

    const handleEditForm = (formNumber: number) => {
        const routes = {
            1: '/form-visa-two',
            2: '/form-visa-three', 
            3: '/form-visa-four'
        };
        router.visit(`${routes[formNumber]}/${application.application_id}`);
    };

    return (
        <>
            <Head title="Application Preview">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="container mx-auto p-6 max-w-6xl">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    Application Preview
                </h1>

                <div className="mb-6 p-4 bg-blue-50 rounded-md">
                    <h4 className="font-semibold">Application ID: <span className="font-medium text-blue-600">{application.application_id}</span></h4>
                    <p className="text-gray-600">Please review all your information before final submission.</p>
                </div>

                {/* Quick Edit Navigation */}
                <div className="mb-6 p-4 bg-gray-50 rounded-md">
                    <h3 className="font-semibold mb-2">Quick Edit:</h3>
                    <div className="flex flex-wrap gap-2">
                        <button 
                            onClick={() => handleEditForm(1)}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                        >
                            Edit Personal Details
                        </button>
                        <button 
                            onClick={() => handleEditForm(2)}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                        >
                            Edit Address & Family
                        </button>
                        <button 
                            onClick={() => handleEditForm(3)}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                        >
                            Edit Visa Details
                        </button>
                    </div>
                </div>

                {/* Personal Information Section */}
                <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                        Personal Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="font-semibold">Application Type:</label>
                            <p>{application.application_type}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Passport Type:</label>
                            <p>{application.passport_type}</p>
                        </div>
                        <div>
                            <label className="font-semibold">First Name:</label>
                            <p>{application.first_name}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Last Name:</label>
                            <p>{application.last_name}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Passport Number:</label>
                            <p>{application.passport_number}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Visa Type:</label>
                            <p>{application.visa_type}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Nationality:</label>
                            <p>{application.nationality}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Port of Arrival:</label>
                            <p>{application.port_of_arrival}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Date of Birth:</label>
                            <p>{application.date_of_birth}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Email:</label>
                            <p>{application.email}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Expected Arrival Date:</label>
                            <p>{application.expected_arrival_date}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Phone Number:</label>
                            <p>{application.phone_number}</p>
                        </div>
                        {application.time_zone && (
                            <div>
                                <label className="font-semibold">Time Zone:</label>
                                <p>{application.time_zone}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Additional Personal Details */}
                <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                        Additional Personal Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="font-semibold">Surname:</label>
                            <p>{application.surname}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Given Name:</label>
                            <p>{application.given_name}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Sex:</label>
                            <p>{application.sex}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Town/City of Birth:</label>
                            <p>{application.town_city_of_birth}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Country of Birth:</label>
                            <p>{application.country_of_birth}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Religion:</label>
                            <p>{application.religion}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Education Qualification:</label>
                            <p>{application.edu_qualification}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Lived Two Years:</label>
                            <p>{application.lived_two_years}</p>
                        </div>
                    </div>
                </div>

                {/* Address Details */}
                <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                        Address Details
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="font-semibold">Current Address:</label>
                            <p>{application.house_street}, {application.village_city}, {application.state_province}, {application.country} - {application.postal_code}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Mobile Number:</label>
                            <p>{application.mobile_number}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Permanent Address:</label>
                            <p>{application.permanent_house_street}, {application.permanent_village_city}, {application.permanent_state_province}</p>
                        </div>
                    </div>
                </div>

                {/* Family Details */}
                <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                        Family Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="font-semibold">Father's Full Name:</label>
                            <p>{application.father_full_name}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Father's Nationality:</label>
                            <p>{application.father_nationality}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Mother's Full Name:</label>
                            <p>{application.mother_full_name}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Mother's Nationality:</label>
                            <p>{application.mother_nationality}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Marital Status:</label>
                            <p>{application.marital_status}</p>
                        </div>
                        {application.spouse_name && (
                            <div>
                                <label className="font-semibold">Spouse Name:</label>
                                <p>{application.spouse_name}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Profession Details */}
                <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                        Profession Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="font-semibold">Present Occupation:</label>
                            <p>{application.present_occupation}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Employer Name:</label>
                            <p>{application.employer_name}</p>
                        </div>
                    </div>
                </div>

                {/* Visa Details */}
                <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                        Visa Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="font-semibold">Type of Visa:</label>
                            <p>{application.type_of_visa}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Duration of Visa:</label>
                            <p>{application.duration_of_visa} days</p>
                        </div>
                        <div>
                            <label className="font-semibold">Duration of Stay:</label>
                            <p>{application.duration_of_stay} days</p>
                        </div>
                        <div>
                            <label className="font-semibold">Number of Entries:</label>
                            <p>{application.number_of_entries}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Place Likely to be Visited:</label>
                            <p>{application.place_likely_to_be_visited}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Expected Port of Exit:</label>
                            <p>{application.expected_port_of_exit}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Have Visited India Before:</label>
                            <p>{application.have_visited_india}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Permission Refused:</label>
                            <p>{application.permission_refused}</p>
                        </div>
                    </div>
                </div>

                {/* References */}
                <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                        References
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="font-semibold">Reference Name in India:</label>
                            <p>{application.reference_name_india}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Reference Phone in India:</label>
                            <p>{application.reference_phone_india}</p>
                        </div>
                        <div className="md:col-span-2">
                            <label className="font-semibold">Reference Address in India:</label>
                            <p>{application.reference_address_india}</p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
                    {/* <button
                        onClick={() => window.history.back()}
                        className="w-full md:w-auto bg-gray-600 text-white font-medium py-2 px-6 rounded-md hover:bg-gray-700 transition duration-300"
                    >
                        Back to Edit
                    </button> */}
                    
                    <button
                        onClick={handleFinalSubmit}
                        className="w-full md:w-auto bg-green-600 text-white font-medium py-2 px-6 rounded-md hover:bg-green-700 transition duration-300"
                    >
                        Confirm and Submit Application
                    </button>
                </div>
            </div>
        </>
    );
}