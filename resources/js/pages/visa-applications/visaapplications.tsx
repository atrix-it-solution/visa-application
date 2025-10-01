import { useState } from 'react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Visa Applications',
        href: '/visa-applications',
    },
];

// COMPLETE INTERFACE WITH ALL 85 FIELDS
interface VisaApplication {
    // First Form Fields
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

    // Second Form Fields
    surname: string;
    given_name: string;
    name_change: boolean;
    sex: string;
    town_city_of_birth: string;
    country_of_birth: string;
    citizenship_national_id_no?: string;
    religion: string;
    visible_identification_marks?: string;
    edu_qualification: string;
    lived_two_years: string;
    place_of_issue: string;
    date_of_issue: string;
    date_of_expiry: string;

    // Third Form Fields - Address Details
    house_street: string;
    village_city: string;
    country: string;
    state_province: string;
    postal_code: string;
    mobile_number: string;
    
    // Permanent Address
    permanent_house_street: string;
    permanent_village_city: string;
    permanent_state_province: string;
    
    // Family Details - Father
    father_full_name: string;
    father_nationality: string;
    father_previous_nationality?: string;
    father_place_of_birth: string;
    father_country_of_birth: string;
    
    // Family Details - Mother
    mother_full_name: string;
    mother_nationality: string;
    mother_previous_nationality?: string;
    mother_place_of_birth: string;
    mother_country_of_birth: string;
    
    // Marital Status & Spouse
    marital_status: string;
    spouse_name?: string;
    spouse_nationality?: string;
    spouse_previous_nationality?: string;
    spouse_place_of_birth?: string;
    spouse_country_of_birth?: string;
    
    // Occupation Details
    present_occupation: string;
    employer_name: string;
    designation: string;
    employer_address: string;
    employer_phone: string;
    past_occupation?: string;

    // Fourth Form Fields - Visa Details
    type_of_visa: string;
    duration_of_visa: number;
    duration_of_stay: number;
    number_of_entries: string;
    place_likely_to_be_visited: string;
    place_likely_to_be_visited_2?: string;
    expected_port_of_exit: string;
    have_visited_india: string;
    permission_refused: string;
    countries_visited?: string;
    
    // References
    reference_name_india: string;
    reference_phone_india: string;
    reference_address_india: string;
    reference_name: string;
    reference_phone: string;
    reference_address: string;
    
    // File Uploads
    reference_photo?: string;
    passport_copy?: string;

    // System Fields
    status?: string;
    submitted_at?: string;
    created_at?: string;
    updated_at?: string;
}

interface PageProps {
    applications: VisaApplication[];
}

export default function VisaApplications() {
    const { applications } = usePage<PageProps>().props;
    const [selectedApp, setSelectedApp] = useState<VisaApplication | null>(null);

    console.log('Applications data:', applications);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Visa Applications" />
            
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Visa Applications</h1>
                    <div className="text-sm text-gray-500">
                        Total: {applications?.length || 0} applications
                    </div>
                </div>
                
                {applications && applications.length > 0 ? (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Application ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Full Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Passport
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Visa Type
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nationality
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email/Phone
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {applications.map((app: VisaApplication) => (
                                        <tr key={app.application_id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {app.application_id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <div>{app.first_name} {app.last_name}</div>
                                                <div className="text-xs text-gray-500">
                                                    {app.surname} {app.given_name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {app.passport_number}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {app.visa_type}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {app.nationality}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <div>{app.email}</div>
                                                <div className="text-xs text-gray-500">{app.phone_number}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        app.status === 'completed'
                                                            ? 'bg-green-100 text-green-800'
                                                            : app.status === 'submitted'
                                                            ? 'bg-blue-100 text-blue-800'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                    }`}
                                                >
                                                    {app.status || 'In Progress'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button
                                                    onClick={() => setSelectedApp(app)}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <PlaceholderPattern className="mx-auto h-24 w-24" />
                        <h3 className="mt-4 text-lg font-medium text-gray-900">No applications found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Get started by creating a new visa application.
                        </p>
                    </div>
                )}
            </div>

            {/* Detailed View Modal */}
            {selectedApp && (
                <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-6xl max-h-[90vh] overflow-y-auto w-full">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">
                                Application Details: {selectedApp.application_id}
                            </h2>
                            <button 
                                onClick={() => setSelectedApp(null)}
                                className="text-gray-500 hover:text-gray-700 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Personal Information */}
                            <div className="col-span-full">
                                <h3 className="text-lg font-semibold mb-4 pb-2 border-b">Personal Information</h3>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedApp.first_name} {selectedApp.last_name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Surname & Given Name</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedApp.surname} {selectedApp.given_name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedApp.date_of_birth}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Gender</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedApp.sex}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Place of Birth</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedApp.town_city_of_birth}, {selectedApp.country_of_birth}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nationality</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedApp.nationality}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Religion</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedApp.religion}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Education</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedApp.edu_qualification}</p>
                            </div>

                            {/* Passport Information */}
                            <div className="col-span-full mt-4">
                                <h3 className="text-lg font-semibold mb-4 pb-2 border-b">Passport Information</h3>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Passport Number</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedApp.passport_number}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Place of Issue</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedApp.place_of_issue}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Date of Issue</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedApp.date_of_issue}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Date of Expiry</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedApp.date_of_expiry}</p>
                            </div>

                            {/* Contact Information */}
                            <div className="col-span-full mt-4">
                                <h3 className="text-lg font-semibold mb-4 pb-2 border-b">Contact Information</h3>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedApp.email}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedApp.phone_number}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedApp.mobile_number}</p>
                            </div>

                            {/* Current Address */}
                            <div className="col-span-full mt-4">
                                <h3 className="text-lg font-semibold mb-4 pb-2 border-b">Current Address</h3>
                            </div>
                            <div className="col-span-full">
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {selectedApp.house_street}, {selectedApp.village_city}, {selectedApp.state_province}, {selectedApp.country} - {selectedApp.postal_code}
                                </p>
                            </div>

                            {/* Permanent Address */}
                            <div className="col-span-full mt-4">
                                <h3 className="text-lg font-semibold mb-4 pb-2 border-b">Permanent Address</h3>
                            </div>
                            <div className="col-span-full">
                                <label className="block text-sm font-medium text-gray-700">Permanent Address</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {selectedApp.permanent_house_street}, {selectedApp.permanent_village_city}, {selectedApp.permanent_state_province}
                                </p>
                            </div>

                            {/* Family Information */}
                            <div className="col-span-full mt-4">
                                <h3 className="text-lg font-semibold mb-4 pb-2 border-b">Family Information</h3>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Father's Name</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedApp.father_full_name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Father's Nationality</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedApp.father_nationality}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Mother's Name</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedApp.mother_full_name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Mother's Nationality</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedApp.mother_nationality}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Marital Status</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedApp.marital_status}</p>
                            </div>
                            {selectedApp.spouse_name && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Spouse Name</label>
                                    <p className="mt-1 text-sm text-gray-900">{selectedApp.spouse_name}</p>
                                </div>
                            )}

                            {/* Occupation Information */}
                            <div className="col-span-full mt-4">
                                <h3 className="text-lg font-semibold mb-4 pb-2 border-b">Occupation Information</h3>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Present Occupation</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedApp.present_occupation}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Employer</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedApp.employer_name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Designation</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedApp.designation}</p>
                            </div>
                            <div className="col-span-full">
                                <label className="block text-sm font-medium text-gray-700">Employer Address</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedApp.employer_address}</p>
                            </div>

                            {/* Visa Information */}
                            <div className="col-span-full mt-4">
                                <h3 className="text-lg font-semibold mb-4 pb-2 border-b">Visa Information</h3>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Visa Type</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedApp.visa_type}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Duration of Visa</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedApp.duration_of_visa} days</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Duration of Stay</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedApp.duration_of_stay} days</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Number of Entries</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedApp.number_of_entries}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Port of Arrival</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedApp.port_of_arrival}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Expected Port of Exit</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedApp.expected_port_of_exit}</p>
                            </div>

                            {/* References */}
                            <div className="col-span-full mt-4">
                                <h3 className="text-lg font-semibold mb-4 pb-2 border-b">References</h3>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Reference in India</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedApp.reference_name_india}</p>
                                <p className="text-xs text-gray-500">{selectedApp.reference_phone_india}</p>
                                <p className="text-xs text-gray-500">{selectedApp.reference_address_india}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Home Country Reference</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedApp.reference_name}</p>
                                <p className="text-xs text-gray-500">{selectedApp.reference_phone}</p>
                                <p className="text-xs text-gray-500">{selectedApp.reference_address}</p>
                            </div>

                            {/* Additional Information */}
                            <div className="col-span-full mt-4">
                                <h3 className="text-lg font-semibold mb-4 pb-2 border-b">Additional Information</h3>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Previously Visited India</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedApp.have_visited_india}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Visa Refused Before</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedApp.permission_refused}</p>
                            </div>
                            {selectedApp.countries_visited && (
                                <div className="col-span-full">
                                    <label className="block text-sm font-medium text-gray-700">Countries Visited</label>
                                    <p className="mt-1 text-sm text-gray-900">{selectedApp.countries_visited}</p>
                                </div>
                            )}
                        </div>

                        {/* Supporting Documents */}
                        <div className="col-span-full mt-4">
                            <h3 className="text-lg font-semibold mb-4 pb-2 border-b">Supporting Documents</h3>
                        </div>

                        {/* Passport Copy */}
                        <div className="col-span-full">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Passport Copy</label>
                            {selectedApp.passport_copy ? (
                                <div className="flex items-center space-x-4">
                                    <img 
                                        src={`/storage/${selectedApp.passport_copy}`}
                                        alt="Passport Copy"
                                        className="h-32 w-auto border rounded-lg shadow-sm"
                                    />
                                    <a 
                                        href={`/storage/${selectedApp.passport_copy}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 text-sm"
                                    >
                                        View Full Size
                                    </a>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">No passport copy uploaded</p>
                            )}
                        </div>

                        {/* Reference Photo */}
                        <div className="col-span-full mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Reference Photo</label>
                            {selectedApp.reference_photo ? (
                                <div className="flex items-center space-x-4">
                                    <img 
                                        src={`/storage/${selectedApp.reference_photo}`}
                                        alt="Reference Photo"
                                        className="h-32 w-auto border rounded-lg shadow-sm"
                                    />
                                    <a 
                                        href={`/storage/${selectedApp.reference_photo}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 text-sm"
                                    >
                                        View Full Size
                                    </a>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">No reference photo uploaded</p>
                            )}
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button 
                                onClick={() => setSelectedApp(null)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}