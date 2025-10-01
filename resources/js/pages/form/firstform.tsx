// resources/js/Pages/FirstForm.tsx
import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

interface VisaFormData {
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
    time_zone?: string; // Changed from visa_duration to time_zone
}

export default function FirstForm() {
    const { data, setData, errors, processing, post } = useForm<VisaFormData>({
        application_type: '',
        passport_type: '',
        first_name: '',
        last_name: '',
        passport_number: '',
        visa_type: '',
        nationality: '',
        port_of_arrival: '',
        date_of_birth: '',
        email: '',
        expected_arrival_date: '',
        phone_number: '',
        time_zone: '', 
    });

    // Track if eTOURIST VISA is selected
    const isTouristVisa = data.visa_type === 'eTOURIST VISA';

   // In FirstForm.tsx - update handleSubmit
const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Submitting form data:', data);
    
    post('/visa-application', {
        preserveScroll: true,
        onError: (errors) => {
            console.log('Form errors:', errors);
            alert('There were errors in your submission. Please check the form.');
        },
        onSuccess: (page) => {
            console.log('Form submitted successfully, response:', page);
            // Inertia should handle the redirect automatically
        }
    });
};

    const handleVisaTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedVisaType = e.target.value;
        setData('visa_type', selectedVisaType);
        
        // Reset time_zone when visa type changes (unless it's tourist visa)
        if (selectedVisaType !== 'eTOURIST VISA') {
            setData('time_zone', '');
        } 
    };

    return (
        <>
            <Head title="Indian Visa Application">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <div className='container mx-auto p-6 max-w-6xl'>
                <h1 className='text-3xl font-bold text-gray-800 mb-8 text-center'>
                    Online Indian Visa Application Form
                </h1>

                {/* Display errors */}
                {errors && Object.keys(errors).length > 0 && (
                    <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
                        <p className="font-semibold">Please fix the following errors:</p>
                        <ul className="list-disc list-inside mt-2">
                            {Object.entries(errors).map(([field, error]) => (
                                <li key={field}><strong>{field}:</strong> {error}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <form onSubmit={handleSubmit} className='p-8'>
                    <div className='flex flex-col lg:flex-row gap-8'>
                        
                        {/* Column 1 */}
                        <div className='lg:w-6/12 space-y-6'>
                            
                            {/* Application Type */}
                            <div>
                                <label htmlFor="application_type" className="block text-sm font-medium text-gray-700 mb-2">
                                    Application Type *
                                </label>
                                <select 
                                    id="application_type" 
                                    value={data.application_type}
                                    onChange={e => setData('application_type', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Select Application Type</option>
                                    <option value="Normal Processing (5 to 7 Days)">Normal Processing (5 to 7 Days)</option>
                                    <option value="Urgent Processing (48 to 72 Hours)">Urgent Processing (48 to 72 Hours)</option>
                                </select>
                                {errors.application_type && <div className="text-red-500 text-sm mt-1">{errors.application_type}</div>}
                            </div>

                    

                            {/* First Name */}
                            <div>
                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-2">
                                    First Name *
                                </label>
                                <input 
                                    type="text" 
                                    id="first_name" 
                                    value={data.first_name}
                                    onChange={e => setData('first_name', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    placeholder="Enter your first name"
                                    required
                                />
                                {errors.first_name && <div className="text-red-500 text-sm mt-1">{errors.first_name}</div>}
                            </div>



                            {/* Passport Number */}
                            <div>
                                <label htmlFor="passport_number" className="block text-sm font-medium text-gray-700 mb-2">
                                    Passport Number *
                                </label>
                                <input 
                                    type="text" 
                                    id="passport_number" 
                                    value={data.passport_number}
                                    onChange={e => setData('passport_number', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    placeholder="Enter passport number"
                                    required
                                />
                                {errors.passport_number && <div className="text-red-500 text-sm mt-1">{errors.passport_number}</div>}
                            </div>


                                                        {/* Time Zone - Only show for eTOURIST VISA */}
                            {isTouristVisa && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Select Visa Duration *
                                    </label>
                                    <div className="flex flex-wrap gap-4">
                                        <label className="inline-flex items-center">
                                            <input 
                                                type="radio" 
                                                name="time_zone" 
                                                value="30 Days" 
                                                checked={data.time_zone === '30 Days'}
                                                onChange={e => setData('time_zone', e.target.value)}
                                                className="text-blue-600 focus:ring-blue-500"
                                                required={isTouristVisa}
                                            />
                                            <span className="ml-2 text-gray-700">30 Days</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input 
                                                type="radio" 
                                                name="time_zone" 
                                                value="One Year" 
                                                checked={data.time_zone === 'One Year'}
                                                onChange={e => setData('time_zone', e.target.value)}
                                                className="text-blue-600 focus:ring-blue-500"
                                                required={isTouristVisa}
                                            />
                                            <span className="ml-2 text-gray-700">One Year</span>
                                        </label>
                                    </div>
                                    {errors.time_zone && <div className="text-red-500 text-sm mt-1">{errors.time_zone}</div>}
                                </div>
                            )}


                            
                                                       {/* Port of Arrival */}
                            <div>
                                <label htmlFor="port_of_arrival" className="block text-sm font-medium text-gray-700 mb-2">
                                    Select Port of Arrival *
                                </label>
                                <select 
                                    id="port_of_arrival" 
                                    value={data.port_of_arrival}
                                    onChange={e => setData('port_of_arrival', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Select Port of Arrival</option>
                                    <option value="DELHI">DELHI</option>
                                    <option value="MUMBAI">MUMBAI</option>
                                    <option value="BANGALORE">BANGALORE</option>
                                    <option value="CHENNAI">CHENNAI</option>
                                    <option value="KOLKATA">KOLKATA</option>
                                </select>
                                {errors.port_of_arrival && <div className="text-red-500 text-sm mt-1">{errors.port_of_arrival}</div>}
                            </div>

                            

                            {/* Email Address */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address *
                                </label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    placeholder="Enter your email"
                                    required
                                />
                                {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                            </div>


                            {/* Phone Number */}
                            <div>
                                <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number *
                                </label>
                                <input 
                                    type="tel" 
                                    id="phone_number" 
                                    value={data.phone_number}
                                    onChange={e => setData('phone_number', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    placeholder="Enter your phone number"
                                    required
                                />
                                {errors.phone_number && <div className="text-red-500 text-sm mt-1">{errors.phone_number}</div>}
                            </div>

                        </div>
                        
                        {/* Column 2 */}
                        <div className='lg:w-6/12 space-y-6'>

                                {/* Passport Type */}
                            <div>
                                <label htmlFor="passport_type" className="block text-sm font-medium text-gray-700 mb-2">
                                    Passport Type *
                                </label>
                                <select 
                                    id="passport_type" 
                                    value={data.passport_type}
                                    onChange={e => setData('passport_type', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Select Passport Type</option>
                                    <option value="ORDINARY PASSPORT">ORDINARY PASSPORT</option>
                                </select>
                                {errors.passport_type && <div className="text-red-500 text-sm mt-1">{errors.passport_type}</div>}
                            </div>

                                                        {/* Last Name */}
                            <div>
                                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Last Name *
                                </label>
                                <input 
                                    type="text" 
                                    id="last_name" 
                                    value={data.last_name}
                                    onChange={e => setData('last_name', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    placeholder="Enter your last name"
                                    required
                                />
                                {errors.last_name && <div className="text-red-500 text-sm mt-1">{errors.last_name}</div>}
                            </div>
                            
                            {/* Visa Type */}
                            <div>
                                <label htmlFor="visa_type" className="block text-sm font-medium text-gray-700 mb-2">
                                    Visa Type *
                                </label>
                                <select 
                                    id="visa_type" 
                                    value={data.visa_type}
                                    onChange={handleVisaTypeChange}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Select Visa Type</option>
                                    <option value="eTOURIST VISA">eTOURIST VISA</option>
                                    <option value="eMEDICAL VISA">eMEDICAL VISA</option>
                                    <option value="eBUSINESS VISA">eBUSINESS VISA</option>
                                </select>
                                {errors.visa_type && <div className="text-red-500 text-sm mt-1">{errors.visa_type}</div>}
                            </div>

                             {/* Nationality */}
                            <div>
                                <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-2">
                                    Nationality *
                                </label>
                                <select 
                                    id="nationality" 
                                    value={data.nationality}
                                    onChange={e => setData('nationality', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Select Nationality</option>
                                    <option value="ALBANIA">ALBANIA</option>
                                    <option value="ANDORRA">ANDORRA</option>
                                    <option value="ANGOLA">ANGOLA</option>
                                    <option value="AUSTRALIA">AUSTRALIA</option>
                                    <option value="CANADA">CANADA</option>
                                    <option value="UNITED STATES OF AMERICA">UNITED STATES OF AMERICA</option>
                                    <option value="UNITED KINGDOM">UNITED KINGDOM</option>
                                </select>
                                {errors.nationality && <div className="text-red-500 text-sm mt-1">{errors.nationality}</div>}
                            </div>


                            {/* Date of Birth */}
                            <div>
                                <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 mb-2">
                                    Date of Birth *
                                </label>
                                <input 
                                    type="date" 
                                    id="date_of_birth" 
                                    value={data.date_of_birth}
                                    onChange={e => setData('date_of_birth', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                                {errors.date_of_birth && <div className="text-red-500 text-sm mt-1">{errors.date_of_birth}</div>}
                            </div>
                           

                            {/* Expected Arrival Date */}
                            <div>
                                <label htmlFor="expected_arrival_date" className="block text-sm font-medium text-gray-700 mb-2">
                                    Expected Date of Arrival *
                                </label>
                                <input 
                                    type="date" 
                                    id="expected_arrival_date" 
                                    value={data.expected_arrival_date}
                                    onChange={e => setData('expected_arrival_date', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                                {errors.expected_arrival_date && <div className="text-red-500 text-sm mt-1">{errors.expected_arrival_date}</div>}
                            </div>

                            

                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className='mt-8 text-center'>
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md disabled:opacity-50 transition-colors duration-200"
                        >
                            {processing ? 'Submitting...' : 'Submit Application'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}