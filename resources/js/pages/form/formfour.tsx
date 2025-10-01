// resources/js/Pages/Form/FormFour.tsx
import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@inertiajs/core';
import { useState } from 'react';
import { router } from '@inertiajs/react'


interface Application {
    application_id: string;
    application_type: string;
    port_of_arrival: string;
    visa_type: string;
    first_name: string;
    last_name: string;
    email: string;
}

interface FormFourProps extends PageProps {
    application: Application;
}

interface FormFourData {
    // Visa Details
    type_of_visa: string;
    duration_of_visa: number;
    duration_of_stay: number;
    number_of_entries: string;
    place_likely_to_be_visited: string;
    place_likely_to_be_visited_2: string;
    expected_port_of_exit: string;
    
    // Previous Visa Details
    have_visited_india: string;
    permission_refused: string;
    
    // Other Information
    countries_visited: string;
    
    // References
    reference_name_india: string;
    reference_phone_india: string;
    reference_address_india: string;
    reference_name: string;
    reference_phone: string;
    reference_address: string;
    
    // File Uploads
    reference_photo: File | null;
    passport_copy: File | null;
}

export default function FormFour({ application }: FormFourProps) {
    const { data, setData, post, processing, errors } = useForm<FormFourData>({
        // Visa Details - pre-fill with existing data where available
        type_of_visa: application.visa_type || '',
        duration_of_visa: 360,
        duration_of_stay: 180,
        number_of_entries: 'Multiple',
        place_likely_to_be_visited: '',
        place_likely_to_be_visited_2: '',
        expected_port_of_exit: '',
        port_of_arrival: application.port_of_arrival || '',
        
        // Previous Visa Details
        have_visited_india: '',
        permission_refused: '',
        
        // Other Information
        countries_visited: '',
        
        // References
        reference_name_india: '',
        reference_phone_india: '',
        reference_address_india: '',
        reference_name: '',
        reference_phone: '',
        reference_address: '',
        
        // File Uploads
        reference_photo: null,
        passport_copy: null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
            router.post(`/form-visa-four/${application.application_id}`, data, {
                preserveScroll: true,
                  forceFormData: true,
                onError: (errors) => {
                    console.log('Form errors:', errors);
                },
                onSuccess: () => {
                    console.log('Form four submitted successfully');
                }
            });

    };

    // Handle file input changes
    const handleFileChange = (field: keyof FormFourData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData(field, file);
    };

    // Handle radio button changes
    const handleRadioChange = (field: keyof FormFourData, value: string) => {
        setData(field, value);
    };

    // Handle select changes
    const handleSelectChange = (field: keyof FormFourData) => (e: React.ChangeEvent<HTMLSelectElement>) => {
        setData(field, e.target.value);
    };

    const handleSaveExit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Save and exit', data);
        // You can implement save and exit logic here
    };

    return (
        <>
            <Head title="Form Four - e-Visa Application">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <div className='container mx-auto p-6 max-w-6xl'>
                <h1 className='text-3xl font-bold text-gray-800 mb-8 text-center'>
                   e-Visa Application
                </h1>

                <div className='mb-6 p-4 bg-gray-50 rounded-md'>
                    <h4 className='font-semibold'>Application Type: <span className='font-medium text-blue-600'>{application.application_type}</span></h4>
                    <h4 className='font-semibold'>Port of Arrival: <span className='font-medium text-blue-600'>{application.port_of_arrival}</span></h4>
                    <h4 className='font-semibold'>
                        Data retrieved successfully. Please note down the Temporary Application ID: 
                        <span className='font-medium text-blue-600'> {application.application_id}</span>
                    </h4>
                </div>

                <form onSubmit={handleSubmit} className='p-8 bg-white rounded-lg shadow-md'>
                    {/* Type of Visa */}
                    <div className='mb-6'>
                        <label className='block text-gray-700 font-medium mb-2' htmlFor='type_of_visa'>
                            Type of Visa <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type='text'
                            id='type_of_visa'
                            value={data.type_of_visa}
                            onChange={(e) => setData('type_of_visa', e.target.value)}
                            className='w-full border border-gray-300 p-2 rounded-md bg-gray-100 cursor-not-allowed'
                            required
                            readOnly
                        />
                        {errors.type_of_visa && <div className='text-red-500 text-sm mt-1'>{errors.type_of_visa}</div>}
                    </div>

                    {/* Duration of Visa (in Days) */}
                    <div className='mb-6'>
                        <label className='block text-gray-700 font-medium mb-2' htmlFor='duration_of_visa'>
                            Duration of Visa (in Days) <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type='number'
                            id='duration_of_visa'
                            value={data.duration_of_visa}
                            onChange={(e) => setData('duration_of_visa', parseInt(e.target.value))}
                            className='w-full border border-gray-300 p-2 rounded-md bg-gray-100 cursor-not-allowed'
                            placeholder='360 days from the date of issue of the Visa'
                            readOnly
                        />
                        {errors.duration_of_visa && <div className='text-red-500 text-sm mt-1'>{errors.duration_of_visa}</div>}
                    </div>

                    {/* Duration of stay period in India (in Days) */}
                    <div className='mb-6'>
                        <label className='block text-gray-700 font-medium mb-2' htmlFor='duration_of_stay'>
                            Duration of stay period in India (in Days) <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type='number'
                            id='duration_of_stay'
                            value={data.duration_of_stay}
                            onChange={(e) => setData('duration_of_stay', parseInt(e.target.value))}
                            className='w-full border border-gray-300 p-2 rounded-md bg-gray-100 cursor-not-allowed'
                            placeholder='180 days from the date of Arrival in India'
                            required
                            readOnly
                        />
                        {errors.duration_of_stay && <div className='text-red-500 text-sm mt-1'>{errors.duration_of_stay}</div>}
                    </div>

                    {/* No. of Entries */}
                    <div className='mb-6'>  
                        <label className='block text-gray-700 font-medium mb-2' htmlFor='number_of_entries'>
                            No. of Entries <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type='text'
                            id='number_of_entries'
                            value={data.number_of_entries}
                            onChange={(e) => setData('number_of_entries', e.target.value)}
                            className='w-full border border-gray-300 p-2 rounded-md bg-gray-100 cursor-not-allowed'
                            required
                            readOnly
                            placeholder='Multiple'
                        />
                        {errors.number_of_entries && <div className='text-red-500 text-sm mt-1'>{errors.number_of_entries}</div>}
                    </div>

                    {/* Port of Arrival in India */}
                    <div className='mb-6'>
                        <label className='block text-gray-700 font-medium mb-2' htmlFor='port_of_arrival'>
                            Port of Arrival in India <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type='text'
                            id='port_of_arrival'
                            value={application.port_of_arrival}
                            className='w-full border border-gray-300 p-2 rounded-md bg-gray-100 cursor-not-allowed'
                            required
                            readOnly
                        />
                        
                    </div>

                    {/* Place likely to be visited */}
                    <div className='mb-6'>
                        <label className='block text-gray-700 font-medium mb-2' htmlFor='place_likely_to_be_visited'>
                            Place likely to be visited <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type='text'
                            id='place_likely_to_be_visited'
                            value={data.place_likely_to_be_visited}
                            onChange={(e) => setData('place_likely_to_be_visited', e.target.value)}
                            className='w-full border border-gray-300 p-2 rounded-md'
                            required
                        />
                        {errors.place_likely_to_be_visited && <div className='text-red-500 text-sm mt-1'>{errors.place_likely_to_be_visited}</div>}
                    </div>

                    {/* Place likely to be visited 2 */}
                    <div className='mb-6'>
                        <label className='block text-gray-700 font-medium mb-2' htmlFor='place_likely_to_be_visited_2'>
                            Place likely to be visited 2
                        </label>
                        <input
                            type='text'
                            id='place_likely_to_be_visited_2'
                            value={data.place_likely_to_be_visited_2}
                            onChange={(e) => setData('place_likely_to_be_visited_2', e.target.value)}
                            className='w-full border border-gray-300 p-2 rounded-md'
                        />
                        {errors.place_likely_to_be_visited_2 && <div className='text-red-500 text-sm mt-1'>{errors.place_likely_to_be_visited_2}</div>}
                    </div>

                    {/* Expected Port of Exit from India */}
                    <div className='mb-6'>
                        <label className='block text-gray-700 font-medium mb-2' htmlFor='expected_port_of_exit'>
                            Expected Port of Exit from India <span className='text-red-500'>*</span>
                        </label>
                        <select 
                            value={data.expected_port_of_exit}
                            onChange={handleSelectChange('expected_port_of_exit')}
                            className="w-full border border-gray-300 p-2 rounded-md"
                            required
                        >
                            <option value="">Select Exit Point</option> 
                            <option value="AHMEDABAD AIRPORT">AHMEDABAD AIRPORT</option>
                            <option value="AMRITSAR AIRPORT">AMRITSAR AIRPORT</option>
                            <option value="BAGDOGRA AIRPORT">BAGDOGRA AIRPORT</option>
                            <option value="BENGALURU AIRPORT">BENGALURU AIRPORT</option>
                            <option value="CALICUT AIRPORT">CALICUT AIRPORT</option>
                            <option value="CHANDIGARH AIRPORT">CHANDIGARH AIRPORT</option>
                            <option value="CHENNAI AIRPORT">CHENNAI AIRPORT</option>
                            <option value="COCHIN AIRPORT">COCHIN AIRPORT</option>
                        </select>
                        {errors.expected_port_of_exit && <div className='text-red-500 text-sm mt-1'>{errors.expected_port_of_exit}</div>}
                    </div>

                    <div>
                        <h2 className='text-2xl font-bold text-gray-800 mb-6 text-center'>Previous Visa/Currently valid Visa Details</h2>
                    </div>
                    
                    {/* Have you ever visited India before */}
                    <div className='mb-6'>
                        <label className='block text-gray-700 font-medium mb-2'>
                            Have you ever visited India before? <span className='text-red-500'>*</span>
                        </label>
                        <div className='flex items-center'>
                            <label className='inline-flex items-center mr-4'>
                                <input 
                                    type='radio' 
                                    value='Yes' 
                                    checked={data.have_visited_india === 'Yes'}
                                    onChange={() => handleRadioChange('have_visited_india', 'Yes')}
                                    className='mr-2'
                                /> 
                                Yes
                            </label>
                            <label className='inline-flex items-center'>
                                <input 
                                    type='radio' 
                                    value='No'
                                    checked={data.have_visited_india === 'No'}
                                    onChange={() => handleRadioChange('have_visited_india', 'No')}
                                    className='ml-4 mr-2'
                                /> 
                                No
                            </label>
                        </div>
                        {errors.have_visited_india && <div className='text-red-500 text-sm mt-1'>{errors.have_visited_india}</div>}
                    </div>

                    {/* Has permission to visit or to extend stay in India previously been refused? */}
                    <div className='mb-6'>
                        <label className='block text-gray-700 font-medium mb-2'>
                            Has permission to visit or to extend stay in India previously been refused?
                            <span className='text-red-500'>*</span>
                        </label>
                        <div className='flex items-center'>
                            <label className='inline-flex items-center mr-4'>
                                <input 
                                    type='radio' 
                                    value='Yes' 
                                    checked={data.permission_refused === 'Yes'}
                                    onChange={() => handleRadioChange('permission_refused', 'Yes')}
                                    className='mr-2'
                                /> 
                                Yes
                            </label>
                            <label className='inline-flex items-center'>
                                <input 
                                    type='radio' 
                                    value='No'
                                    checked={data.permission_refused === 'No'}
                                    onChange={() => handleRadioChange('permission_refused', 'No')}
                                    className='ml-4 mr-2'
                                /> 
                                No
                            </label>
                        </div>
                        {errors.permission_refused && <div className='text-red-500 text-sm mt-1'>{errors.permission_refused}</div>}
                    </div>

                    <div>
                        <h2 className='text-2xl font-bold text-gray-800 mb-6 text-center'>Other Information</h2>
                    </div>

                    {/* Countries Visited in Last 10 years */}
                    <div className='mb-6'>
                        <label className='block text-gray-700 font-medium mb-2' htmlFor='countries_visited'>
                            Countries Visited in Last 10 years
                        </label>
                        <textarea 
                            id='countries_visited' 
                            value={data.countries_visited}
                            onChange={(e) => setData('countries_visited', e.target.value)}
                            rows={4} 
                            className='border border-gray-300 rounded-md p-2 w-full' 
                        />
                        {errors.countries_visited && <div className='text-red-500 text-sm mt-1'>{errors.countries_visited}</div>}
                    </div>

                    <div>
                        <h2 className='text-2xl font-bold text-gray-800 mb-6 text-center'>Reference</h2>
                    </div>

                    {/* Reference Name in India */}
                    <div className='mb-6'>
                        <label className='block text-gray-700 font-medium mb-2' htmlFor='reference_name_india'>
                            Reference Name in India <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type='text'
                            id='reference_name_india'
                            value={data.reference_name_india}
                            onChange={(e) => setData('reference_name_india', e.target.value)}
                            className='border border-gray-300 rounded-md p-2 w-full'
                        />
                        {errors.reference_name_india && <div className='text-red-500 text-sm mt-1'>{errors.reference_name_india}</div>}
                    </div>

                    {/* Phone */}
                    <div className='mb-6'>
                        <label className='block text-gray-700 font-medium mb-2' htmlFor='reference_phone_india'>
                            Phone <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type='text'
                            id='reference_phone_india'
                            value={data.reference_phone_india}
                            onChange={(e) => setData('reference_phone_india', e.target.value)}
                            className='border border-gray-300 rounded-md p-2 w-full'
                        />
                        {errors.reference_phone_india && <div className='text-red-500 text-sm mt-1'>{errors.reference_phone_india}</div>}
                    </div>

                    {/* Address */}
                    <div className='mb-6'>
                        <label className='block text-gray-700 font-medium mb-2' htmlFor='reference_address_india'>
                            Address <span className='text-red-500'>*</span>
                        </label>
                        <textarea 
                            id='reference_address_india' 
                            value={data.reference_address_india}
                            onChange={(e) => setData('reference_address_india', e.target.value)}
                            rows={4} 
                            className='border border-gray-300 rounded-md p-2 w-full' 
                        />
                        {errors.reference_address_india && <div className='text-red-500 text-sm mt-1'>{errors.reference_address_india}</div>}
                    </div>

                    {/* Reference Name */}
                    <div className='mb-6'>
                        <label className='block text-gray-700 font-medium mb-2' htmlFor='reference_name'>
                            Reference Name <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type='text'
                            id='reference_name'
                            value={data.reference_name}
                            onChange={(e) => setData('reference_name', e.target.value)}
                            className='border border-gray-300 rounded-md p-2 w-full'
                        />
                        {errors.reference_name && <div className='text-red-500 text-sm mt-1'>{errors.reference_name}</div>}
                    </div>

                    {/* Phone */}
                    <div className='mb-6'>
                        <label className='block text-gray-700 font-medium mb-2' htmlFor='reference_phone'>
                            Phone <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type='text'
                            id='reference_phone'
                            value={data.reference_phone}
                            onChange={(e) => setData('reference_phone', e.target.value)}
                            className='border border-gray-300 rounded-md p-2 w-full'
                        />
                        {errors.reference_phone && <div className='text-red-500 text-sm mt-1'>{errors.reference_phone}</div>}
                    </div>

                    {/* Address */}
                    <div className='mb-6'>
                        <label className='block text-gray-700 font-medium mb-2' htmlFor='reference_address'>
                            Address <span className='text-red-500'>*</span>
                        </label>
                        <textarea 
                            id='reference_address' 
                            value={data.reference_address}
                            onChange={(e) => setData('reference_address', e.target.value)}
                            rows={4} 
                            className='border border-gray-300 rounded-md p-2 w-full' 
                        />
                        {errors.reference_address && <div className='text-red-500 text-sm mt-1'>{errors.reference_address}</div>}
                    </div>

                    <div className='mb-6'>
                        <p className='text-gray-600'>To upload Photo click "Browse". Click "Save and Continue" to directly proceed without photo upload</p>
                    </div>

                    {/* Add Photo */}
                    <div className='mb-6'>
                        <label className='block text-gray-700 font-medium mb-2' htmlFor='reference_photo'>
                            Add Photo <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type='file'
                            id='reference_photo'
                            onChange={handleFileChange('reference_photo')}
                            className='border border-gray-300 rounded-md p-2 w-full'
                            accept='image/*'
                        />
                        {errors.reference_photo && <div className='text-red-500 text-sm mt-1'>{errors.reference_photo}</div>}
                    </div>

                    {/* Add Passport Copy */}
                    <div className='mb-6'>
                        <label className='block text-gray-700 font-medium mb-2' htmlFor='passport_copy'>
                            Add Passport Copy <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type='file'
                            id='passport_copy'
                            onChange={handleFileChange('passport_copy')}
                            className='border border-gray-300 rounded-md p-2 w-full'
                            accept='.pdf,.jpg,.jpeg,.png'
                        />
                        {errors.passport_copy && <div className='text-red-500 text-sm mt-1'>{errors.passport_copy}</div>}
                    </div>

                    {/* Buttons */}
                    <div className='mt-8 flex flex-col md:flex-row gap-4 justify-center'>
                        <button
                            type='submit'
                            disabled={processing}
                            className='w-full md:w-auto bg-blue-600 text-white font-medium py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50'
                        >
                            {processing ? 'Submitting...' : 'Save and Continue'}
                        </button>

                        <button 
                            type='button'
                            onClick={handleSaveExit}
                            disabled={processing}
                            className='w-full md:w-auto bg-green-600 text-white font-medium py-2 px-6 rounded-md hover:bg-green-700 transition duration-300 disabled:opacity-50'
                        >
                            Save and Temporarily Exit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}