// resources/js/Pages/Form/FormThree.tsx
import { Head, useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@inertiajs/core';
import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react'

interface Application {
    application_id: string;
    application_type: string;
    port_of_arrival: string;
    first_name: string;
    last_name: string;
    email: string;
}

interface FormThreeProps extends PageProps {
    application: Application;
}

interface FormThreeData {
    // Present Address
    house_street: string;
    village_city: string;
    country: string;
    state_province: string;
    postal_code: string;
    phone_number: string;
    mobile_number: string;
    email_address: string;
    
    // Permanent Address
    permanent_house_street: string;
    permanent_village_city: string;
    permanent_state_province: string;
    
    // Father's Details
    father_full_name: string;
    father_nationality: string;
    father_previous_nationality: string;
    father_place_of_birth: string;
    father_country_of_birth: string;
    
    // Mother's Details
    mother_full_name: string;
    mother_nationality: string;
    mother_previous_nationality: string;
    mother_place_of_birth: string;
    mother_country_of_birth: string;
    
    // Marital Status
    marital_status: string;
    spouse_name: string;
    spouse_nationality: string;
    spouse_previous_nationality: string;
    spouse_place_of_birth: string;
    spouse_country_of_birth: string;
    
    // Profession Details
    present_occupation: string;
    employer_name: string;
    designation: string;
    employer_address: string;
    employer_phone: string;
    past_occupation: string;
}

export default function FormThree({ application }: FormThreeProps) {
    const [sameAddress, setSameAddress] = useState(false);

    const { data, setData, post, processing, errors } = useForm<FormThreeData>({
        // Present Address
        house_street: '',
        village_city: '',
        country: '',
        state_province: '',
        postal_code: '',
        phone_number: '',
        mobile_number: '',
        email_address:  application.email ||'',
        
        // Permanent Address
        permanent_house_street: '',
        permanent_village_city: '',
        permanent_state_province: '',
        
        // Father's Details
        father_full_name: '',
        father_nationality: '',
        father_previous_nationality: '',
        father_place_of_birth: '',
        father_country_of_birth: '',
        
        // Mother's Details
        mother_full_name: '',
        mother_nationality: '',
        mother_previous_nationality: '',
        mother_place_of_birth: '',
        mother_country_of_birth: '',
        
        // Marital Status
        marital_status: '',
        spouse_name: '',
        spouse_nationality: '',
        spouse_previous_nationality: '',
        spouse_place_of_birth: '',
        spouse_country_of_birth: '',
        
        // Profession Details
        present_occupation: '',
        employer_name: '',
        designation: '',
        employer_address: '',
        employer_phone: '',
        past_occupation: '',
    }, `FormThree-${application.application_id}`);

    // Navigation warning
    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            const hasUnsavedData = Object.values(data).some(value => 
                value !== '' && value !== null && value !== undefined
            );
            
            if (hasUnsavedData) {
                event.preventDefault();
                event.returnValue = 'You have unsaved form data. Are you sure you want to leave?';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [data]);

    // Handle same address functionality
    useEffect(() => {
        if (sameAddress) {
            setData({
                ...data,
                permanent_house_street: data.house_street,
                permanent_village_city: data.village_city,
                permanent_state_province: data.state_province,
            });
        }
    }, [sameAddress, data.house_street, data.village_city, data.state_province]);


const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    router.post(`/form-visa-three/${application.application_id}`, data, {
        preserveScroll: true,
        onError: (errors) => {
            console.log('Form errors:', errors);
        },
        onSuccess: () => {
            console.log('Form three submitted successfully');
        }
    });
};

    const handleSaveExit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Save and exit', data);
    };

    return (
        <>
            <Head title="Applicant's Address Details">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <div className='container mx-auto p-6 max-w-6xl'>
                <h1 className='text-3xl font-bold text-gray-800 mb-8 text-center'>
                    Applicant's Address Details
                </h1>

                <div className='mb-6 p-4 bg-gray-50 rounded-md'>
                    <h4 className='font-semibold'>Application Type: <span className='font-medium text-blue-600'>{application.application_type}</span></h4>
                    <h4 className='font-semibold'>Port of Arrival: <span className='font-medium text-blue-600'>{application.port_of_arrival}</span></h4>
                    <h4 className='font-semibold'>
                        Data retrieved successfully. Please note down the Temporary Application ID: 
                        <span className='font-medium text-blue-600'> {application.application_id}</span>
                    </h4>
                </div>

                <h1 className='text-3xl font-bold text-gray-800 mb-8 text-center'>
                    Present Address
                </h1>

                <form onSubmit={handleSubmit} className='p-8 bg-white rounded-lg shadow-md'>
                    {/* Present Address Section */}
                    <div className="space-y-4">
                        {/* House No./Street */}
                        <div className='mb-4'>
                            <label className='block mb-2 font-medium text-gray-700' htmlFor='house_street'>
                                House No./Street *
                            </label>
                            <input
                                type='text'
                                id='house_street'
                                value={data.house_street}
                                onChange={e => setData('house_street', e.target.value)}
                                className='block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500'
                                required
                            />
                            {errors.house_street && <div className="text-red-500 text-sm mt-1">{errors.house_street}</div>}
                        </div>

                        {/* Village/Town/City */}
                        <div className='mb-4'>
                            <label className='block mb-2 font-medium text-gray-700' htmlFor='village_city'>
                                Village/Town/City *
                            </label>
                            <input
                                type='text'
                                id='village_city'
                                value={data.village_city}
                                onChange={e => setData('village_city', e.target.value)}
                                className='block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500'
                                required
                            />
                            {errors.village_city && <div className="text-red-500 text-sm mt-1">{errors.village_city}</div>}
                        </div>

                        {/* Country */}
                        <div className='mb-4'>
                            <label className='block mb-2 font-medium text-gray-700' htmlFor='country'>
                                Country *
                            </label>
                            <select 
                                value={data.country}
                                onChange={e => setData('country', e.target.value)}
                                className="block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value="">Select Country</option>
                                <option value="ALBANIA">ALBANIA</option>
                                <option value="ANDORRA">ANDORRA</option>
                                <option value="ANGOLA">ANGOLA</option>
                                <option value="ANGUILLA">ANGUILLA</option>
                                <option value="ANTIGUA AND BARBUDA">ANTIGUA AND BARBUDA</option>
                                <option value="ARGENTINA">ARGENTINA</option>
                                <option value="ARMENIA">ARMENIA</option>
                                <option value="ARUBA">ARUBA</option>
                                <option value="AUSTRALIA">AUSTRALIA</option>
                                <option value="AUSTRIA">AUSTRIA</option>
                                <option value="AZERBAIJAN">AZERBAIJAN</option>
                                <option value="BAHAMAS">BAHAMAS</option>
                                <option value="BARBADOS">BARBADOS</option>
                                <option value="BELGIUM">BELGIUM</option>
                                <option value="BELIZE">BELIZE</option>
                                <option value="BOLIVIA">BOLIVIA</option>
                                <option value="BOSNIA AND HERZEGOVINA">BOSNIA AND HERZEGOVINA</option>
                                <option value="BOTSWANA">BOTSWANA</option>
                                <option value="BRAZIL">BRAZIL</option>
                                <option value="BRUNEI">BRUNEI</option>
                                <option value="BULGARIA">BULGARIA</option>
                                <option value="BURKINA FASO">BURKINA FASO</option>
                            </select>
                            {errors.country && <div className="text-red-500 text-sm mt-1">{errors.country}</div>}
                        </div>

                        {/* State/Province/District */}
                        <div className='mb-4'>
                            <label className='block mb-2 font-medium text-gray-700' htmlFor='state_province'>
                                State/Province/District *
                            </label>
                            <input
                                type='text'
                                id='state_province'
                                value={data.state_province}
                                onChange={e => setData('state_province', e.target.value)}
                                className='block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500'
                                required
                            />
                            {errors.state_province && <div className="text-red-500 text-sm mt-1">{errors.state_province}</div>}
                        </div>

                        {/* Postal/Zip Code */}
                        <div className='mb-4'>
                            <label className='block mb-2 font-medium text-gray-700' htmlFor='postal_code'>
                                Postal/Zip Code *
                            </label>
                            <input
                                type='text'
                                id='postal_code'
                                value={data.postal_code}
                                onChange={e => setData('postal_code', e.target.value)}
                                className='block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500'
                                required
                            />
                            {errors.postal_code && <div className="text-red-500 text-sm mt-1">{errors.postal_code}</div>}
                        </div>

                        {/* Phone Number */}
                        <div className='mb-4'>
                            <label className='block mb-2 font-medium text-gray-700' htmlFor='phone_number'>
                                Phone Number *
                            </label>
                            <input
                                type='text'
                                id='phone_number'
                                value={data.phone_number}
                                onChange={e => setData('phone_number', e.target.value)}
                                className='block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500'
                                required
                            />
                            {errors.phone_number && <div className="text-red-500 text-sm mt-1">{errors.phone_number}</div>}
                        </div>

                        {/* Mobile No. */}
                        <div className='mb-4'>
                            <label className='block mb-2 font-medium text-gray-700' htmlFor='mobile_number'>
                                Mobile No.
                            </label>
                            <input
                                type='text'
                                id='mobile_number'
                                value={data.mobile_number}
                                onChange={e => setData('mobile_number', e.target.value)}
                                className='block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500'
                            />
                        </div>

                        {/* Email Address */}
                        <div className='mb-4'>
                            <label className='block mb-2 font-medium text-gray-700' htmlFor='email_address'>
                                Email Address *
                            </label>
                            <input
                                type='email'
                                id='email_address'
                                value={data.email_address}
                                onChange={e => setData('email_address', e.target.value)}
                                className='block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-100 cursor-not-allowed'
                                readOnly
                                required
                            />
                            {errors.email_address && <div className="text-red-500 text-sm mt-1">{errors.email_address}</div>}
                        </div>

                        {/* Same Address Checkbox */}
                        <div className='mb-6'>
                            <label className="inline-flex items-center">
                                <input 
                                    type="checkbox" 
                                    id="same_address" 
                                    checked={sameAddress}
                                    onChange={e => setSameAddress(e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className='ml-2 font-medium text-gray-700'>Click here for same permanent address</span>
                            </label>
                        </div>
                    </div>

                    {/* Permanent Address Section - Only show if not same as present */}
                 
                        <div className="mt-8">
                            <h2 className='text-2xl font-bold text-gray-800 mb-6 text-center'>
                                Permanent Address
                            </h2>
                            
                            {/* Permanent House No./Street */}
                            <div className='mb-4'>
                                <label className='block mb-2 font-medium text-gray-700' htmlFor='permanent_house_street'>
                                    House No./Street *
                                </label>
                                <input
                                    type='text'
                                    id='permanent_house_street'
                                    value={data.permanent_house_street}
                                    onChange={e => setData('permanent_house_street', e.target.value)}
                                    className='block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500'
                                    required={!sameAddress}
                                />
                                {errors.permanent_house_street && <div className="text-red-500 text-sm mt-1">{errors.permanent_house_street}</div>}
                            </div>

                            {/* Permanent Village/Town/City */}
                            <div className='mb-4'>
                                <label className='block mb-2 font-medium text-gray-700' htmlFor='permanent_village_city'>
                                    Village/Town/City *
                                </label>
                                <input
                                    type='text'
                                    id='permanent_village_city'
                                    value={data.permanent_village_city}
                                    onChange={e => setData('permanent_village_city', e.target.value)}
                                    className='block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500'
                                    required={!sameAddress}
                                />
                                {errors.permanent_village_city && <div className="text-red-500 text-sm mt-1">{errors.permanent_village_city}</div>}
                            </div>

                            {/* Permanent State/Province/District */}
                            <div className='mb-4'>
                                <label className='block mb-2 font-medium text-gray-700' htmlFor='permanent_state_province'>
                                    State/Province/District *
                                </label>
                                <input
                                    type='text'
                                    id='permanent_state_province'
                                    value={data.permanent_state_province}
                                    onChange={e => setData('permanent_state_province', e.target.value)}
                                    className='block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500'
                                    required={!sameAddress}
                                />
                                {errors.permanent_state_province && <div className="text-red-500 text-sm mt-1">{errors.permanent_state_province}</div>}
                            </div>
                        </div>
                    

                    {/* Family Details Section */}
                    <div className="mt-8">
                        <h2 className='text-2xl font-bold text-gray-800 mb-6 text-center'>
                            Family Details
                        </h2>
                        
                        {/* Father's Details */}
                        <div className="mb-6">
                            <h3 className='text-xl font-bold text-gray-800 mb-4 text-center'>
                                Father's Details
                            </h3>
                            
                            {/* Father's Full Name */}
                            <div className='mb-4'>
                                <label className='block mb-2 font-medium text-gray-700' htmlFor='father_full_name'>
                                    Father's Full Name *
                                </label>
                                <input
                                    type='text'
                                    id='father_full_name'
                                    value={data.father_full_name}
                                    onChange={e => setData('father_full_name', e.target.value)}
                                    className='block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500'
                                    required
                                />
                                {errors.father_full_name && <div className="text-red-500 text-sm mt-1">{errors.father_full_name}</div>}
                            </div>

                            {/* Father's Nationality */}
                            <div className='mb-4'>
                                <label className='block mb-2 font-medium text-gray-700' htmlFor='father_nationality'>
                                    Father's Nationality *
                                </label>
                                <select 
                                    value={data.father_nationality}
                                    onChange={e => setData('father_nationality', e.target.value)}
                                    className="block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                >
                                    <option value="">Select Country</option>
                                    <option value="ALBANIA">ALBANIA</option>
                                    <option value="ANDORRA">ANDORRA</option>
                                    <option value="ANGOLA">ANGOLA</option>
                                    <option value="ANGUILLA">ANGUILLA</option>
                                    <option value="ANTIGUA AND BARBUDA">ANTIGUA AND BARBUDA</option>
                                    <option value="ARGENTINA">ARGENTINA</option>
                                    <option value="ARMENIA">ARMENIA</option>
                                    <option value="ARUBA">ARUBA</option>
                                    <option value="AUSTRALIA">AUSTRALIA</option>
                                    <option value="AUSTRIA">AUSTRIA</option>
                                    <option value="AZERBAIJAN">AZERBAIJAN</option>
                                </select>
                                {errors.father_nationality && <div className="text-red-500 text-sm mt-1">{errors.father_nationality}</div>}
                            </div>

                            {/* Father's Previous Nationality */}
                            <div className='mb-4'>
                                <label className='block mb-2 font-medium text-gray-700' htmlFor='father_previous_nationality'>
                                    Father's Previous Nationality
                                </label>
                                <select 
                                    value={data.father_previous_nationality}
                                    onChange={e => setData('father_previous_nationality', e.target.value)}
                                    className="block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Select Country</option>
                                    <option value="ALBANIA">ALBANIA</option>
                                    <option value="ANDORRA">ANDORRA</option>
                                    <option value="ANGOLA">ANGOLA</option>
                                    <option value="ANGUILLA">ANGUILLA</option>
                                    <option value="ANTIGUA AND BARBUDA">ANTIGUA AND BARBUDA</option>
                                    <option value="ARGENTINA">ARGENTINA</option>
                                    <option value="ARMENIA">ARMENIA</option>
                                    <option value="ARUBA">ARUBA</option>
                                    <option value="AUSTRALIA">AUSTRALIA</option>
                                    <option value="AUSTRIA">AUSTRIA</option>
                                    <option value="AZERBAIJAN">AZERBAIJAN</option>
                                </select>
                            </div>

                            {/* Father's Place of Birth */}
                            <div className='mb-4'>
                                <label className='block mb-2 font-medium text-gray-700' htmlFor='father_place_of_birth'>
                                    Place of Birth *
                                </label>
                                <input
                                    type='text'
                                    id='father_place_of_birth'
                                    value={data.father_place_of_birth}
                                    onChange={e => setData('father_place_of_birth', e.target.value)}
                                    className='block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500'
                                    required
                                />
                                {errors.father_place_of_birth && <div className="text-red-500 text-sm mt-1">{errors.father_place_of_birth}</div>}
                            </div>

                            {/* Father's Country of Birth */}
                            <div className='mb-4'>
                                <label className='block mb-2 font-medium text-gray-700' htmlFor='father_country_of_birth'>
                                    Country of Birth *
                                </label>
                                <select 
                                    value={data.father_country_of_birth}
                                    onChange={e => setData('father_country_of_birth', e.target.value)}
                                    className="block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                >
                                    <option value="">Select Country</option>
                                    <option value="ALBANIA">ALBANIA</option>
                                    <option value="ANDORRA">ANDORRA</option>
                                    <option value="ANGOLA">ANGOLA</option>
                                    <option value="ANGUILLA">ANGUILLA</option>
                                    <option value="ANTIGUA AND BARBUDA">ANTIGUA AND BARBUDA</option>
                                    <option value="ARGENTINA">ARGENTINA</option>
                                    <option value="ARMENIA">ARMENIA</option>
                                    <option value="ARUBA">ARUBA</option>
                                    <option value="AUSTRALIA">AUSTRALIA</option>
                                    <option value="AUSTRIA">AUSTRIA</option>
                                    <option value="AZERBAIJAN">AZERBAIJAN</option>
                                </select>
                                {errors.father_country_of_birth && <div className="text-red-500 text-sm mt-1">{errors.father_country_of_birth}</div>}
                            </div>
                        </div>

                        {/* Mother's Details */}
                        <div className="mb-6">
                            <h3 className='text-xl font-bold text-gray-800 mb-4 text-center'>
                                Mother's Details
                            </h3>
                            
                            {/* Mother's Full Name */}
                            <div className='mb-4'>
                                <label className='block mb-2 font-medium text-gray-700' htmlFor='mother_full_name'>
                                    Mother's Full Name *
                                </label>
                                <input
                                    type='text'
                                    id='mother_full_name'
                                    value={data.mother_full_name}
                                    onChange={e => setData('mother_full_name', e.target.value)}
                                    className='block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500'
                                    required
                                />
                                {errors.mother_full_name && <div className="text-red-500 text-sm mt-1">{errors.mother_full_name}</div>}
                            </div>

                            {/* Mother's Nationality */}
                            <div className='mb-4'>
                                <label className='block mb-2 font-medium text-gray-700' htmlFor='mother_nationality'>
                                    Mother's Nationality *
                                </label>
                                <select 
                                    value={data.mother_nationality}
                                    onChange={e => setData('mother_nationality', e.target.value)}
                                    className="block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                >
                                    <option value="">Select Country</option>
                                    <option value="ALBANIA">ALBANIA</option>
                                    <option value="ANDORRA">ANDORRA</option>
                                    <option value="ANGOLA">ANGOLA</option>
                                    <option value="ANGUILLA">ANGUILLA</option>
                                    <option value="ANTIGUA AND BARBUDA">ANTIGUA AND BARBUDA</option>
                                    <option value="ARGENTINA">ARGENTINA</option>
                                    <option value="ARMENIA">ARMENIA</option>
                                    <option value="ARUBA">ARUBA</option>
                                    <option value="AUSTRALIA">AUSTRALIA</option>
                                    <option value="AUSTRIA">AUSTRIA</option>
                                    <option value="AZERBAIJAN">AZERBAIJAN</option>
                                </select>
                                {errors.mother_nationality && <div className="text-red-500 text-sm mt-1">{errors.mother_nationality}</div>}
                            </div>

                            {/* Mother's Previous Nationality */}
                            <div className='mb-4'>
                                <label className='block mb-2 font-medium text-gray-700' htmlFor='mother_previous_nationality'>
                                    Mother's Previous Nationality
                                </label>
                                <select 
                                    value={data.mother_previous_nationality}
                                    onChange={e => setData('mother_previous_nationality', e.target.value)}
                                    className="block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Select Country</option>
                                    <option value="ALBANIA">ALBANIA</option>
                                    <option value="ANDORRA">ANDORRA</option>
                                    <option value="ANGOLA">ANGOLA</option>
                                    <option value="ANGUILLA">ANGUILLA</option>
                                    <option value="ANTIGUA AND BARBUDA">ANTIGUA AND BARBUDA</option>
                                    <option value="ARGENTINA">ARGENTINA</option>
                                    <option value="ARMENIA">ARMENIA</option>
                                    <option value="ARUBA">ARUBA</option>
                                    <option value="AUSTRALIA">AUSTRALIA</option>
                                    <option value="AUSTRIA">AUSTRIA</option>
                                    <option value="AZERBAIJAN">AZERBAIJAN</option>
                                </select>
                            </div>

                            {/* Mother's Place of Birth */}
                            <div className='mb-4'>
                                <label className='block mb-2 font-medium text-gray-700' htmlFor='mother_place_of_birth'>
                                    Place of Birth *
                                </label>
                                <input
                                    type='text'
                                    id='mother_place_of_birth'
                                    value={data.mother_place_of_birth}
                                    onChange={e => setData('mother_place_of_birth', e.target.value)}
                                    className='block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500'
                                    required
                                />
                                {errors.mother_place_of_birth && <div className="text-red-500 text-sm mt-1">{errors.mother_place_of_birth}</div>}
                            </div>

                            {/* Mother's Country of Birth */}
                            <div className='mb-4'>
                                <label className='block mb-2 font-medium text-gray-700' htmlFor='mother_country_of_birth'>
                                    Country of Birth *
                                </label>
                                <select 
                                    value={data.mother_country_of_birth}
                                    onChange={e => setData('mother_country_of_birth', e.target.value)}
                                    className="block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                >
                                    <option value="">Select Country</option>
                                    <option value="ALBANIA">ALBANIA</option>
                                    <option value="ANDORRA">ANDORRA</option>
                                    <option value="ANGOLA">ANGOLA</option>
                                    <option value="ANGUILLA">ANGUILLA</option>
                                    <option value="ANTIGUA AND BARBUDA">ANTIGUA AND BARBUDA</option>
                                    <option value="ARGENTINA">ARGENTINA</option>
                                    <option value="ARMENIA">ARMENIA</option>
                                    <option value="ARUBA">ARUBA</option>
                                    <option value="AUSTRALIA">AUSTRALIA</option>
                                    <option value="AUSTRIA">AUSTRIA</option>
                                    <option value="AZERBAIJAN">AZERBAIJAN</option>
                                </select>
                                {errors.mother_country_of_birth && <div className="text-red-500 text-sm mt-1">{errors.mother_country_of_birth}</div>}
                            </div>
                        </div>
                    </div>

                    {/* Marital Status Section */}
                    <div className="mt-8">
                        <h2 className='text-2xl font-bold text-gray-800 mb-6 text-center'>
                            Applicant's Marital Status
                        </h2>
                        
                        {/* Marital Status */}
                        <div className='mb-4'>
                            <label className='block mb-2 font-medium text-gray-700' htmlFor='marital_status'>   
                                Marital Status *
                            </label>
                            <select 
                                value={data.marital_status}
                                onChange={e => setData('marital_status', e.target.value)}
                                className="block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value="">Select Status</option>
                                <option value="SINGLE">SINGLE</option>
                                <option value="MARRIED">MARRIED</option>
                            </select>
                            {errors.marital_status && <div className="text-red-500 text-sm mt-1">{errors.marital_status}</div>}
                        </div>

                        {/* Conditional Spouse Details - Only show if married */}
                        {data.marital_status === 'MARRIED' && (
                            <div className="space-y-4 mt-4 p-4 bg-gray-50 rounded-md">
                                <h4 className='font-semibold text-gray-800 mb-3'>Spouse Details</h4>
                                
                                {/* Spouse Name */}
                                <div className='mb-4'>
                                    <label className='block mb-2 font-medium text-gray-700' htmlFor='spouse_name'>
                                        Spouse Name *
                                    </label>
                                    <input
                                        type='text'
                                        id='spouse_name'
                                        value={data.spouse_name}
                                        onChange={e => setData('spouse_name', e.target.value)}
                                        className='block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500'
                                        placeholder='Enter Spouse Name'
                                        required
                                    />
                                    {errors.spouse_name && <div className="text-red-500 text-sm mt-1">{errors.spouse_name}</div>}
                                </div>

                                {/* Spouse Nationality */}
                                <div className='mb-4'>
                                    <label className='block mb-2 font-medium text-gray-700' htmlFor='spouse_nationality'>
                                        Spouse Nationality *
                                    </label>
                                    <select 
                                        value={data.spouse_nationality}
                                        onChange={e => setData('spouse_nationality', e.target.value)}
                                        className="block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        <option value="">Select Country</option>
                                        <option value="ALBANIA">ALBANIA</option>
                                        <option value="ANDORRA">ANDORRA</option>
                                        <option value="ANGOLA">ANGOLA</option>
                                        <option value="ANGUILLA">ANGUILLA</option>
                                        <option value="ANTIGUA AND BARBUDA">ANTIGUA AND BARBUDA</option>
                                        <option value="ARGENTINA">ARGENTINA</option>
                                        <option value="ARMENIA">ARMENIA</option>
                                        <option value="ARUBA">ARUBA</option>
                                        <option value="AUSTRALIA">AUSTRALIA</option>
                                    </select>
                                    {errors.spouse_nationality && <div className="text-red-500 text-sm mt-1">{errors.spouse_nationality}</div>}
                                </div>

                                {/* Spouse Previous Nationality */}
                                <div className='mb-4'>
                                    <label className='block mb-2 font-medium text-gray-700' htmlFor='spouse_previous_nationality'>
                                        Spouse Previous Nationality
                                    </label>
                                    <select 
                                        value={data.spouse_previous_nationality}
                                        onChange={e => setData('spouse_previous_nationality', e.target.value)}
                                        className="block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Select Country</option>
                                        <option value="ALBANIA">ALBANIA</option>
                                        <option value="ANDORRA">ANDORRA</option>
                                        <option value="ANGOLA">ANGOLA</option>
                                        <option value="ANGUILLA">ANGUILLA</option>
                                        <option value="ANTIGUA AND BARBUDA">ANTIGUA AND BARBUDA</option>
                                        <option value="ARGENTINA">ARGENTINA</option>
                                        <option value="ARMENIA">ARMENIA</option>
                                        <option value="ARUBA">ARUBA</option>
                                    </select>
                                </div>

                                {/* Spouse Place of Birth */}
                                <div className='mb-4'>
                                    <label className='block mb-2 font-medium text-gray-700' htmlFor='spouse_place_of_birth'>
                                        Spouse Place of Birth *
                                    </label>
                                    <input
                                        type='text'
                                        id='spouse_place_of_birth'
                                        value={data.spouse_place_of_birth}
                                        onChange={e => setData('spouse_place_of_birth', e.target.value)}
                                        className='block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500'
                                        placeholder='Enter Spouse Place of Birth'
                                        required
                                    />
                                    {errors.spouse_place_of_birth && <div className="text-red-500 text-sm mt-1">{errors.spouse_place_of_birth}</div>}
                                </div>

                                {/* Spouse Country of Birth */}
                                <div className='mb-4'>
                                    <label className='block mb-2 font-medium text-gray-700' htmlFor='spouse_country_of_birth'>
                                        Spouse Country of Birth *
                                    </label>
                                    <select 
                                        value={data.spouse_country_of_birth}
                                        onChange={e => setData('spouse_country_of_birth', e.target.value)}
                                        className="block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        <option value="">Select Country</option>
                                        <option value="ALBANIA">ALBANIA</option>
                                        <option value="ANDORRA">ANDORRA</option>
                                        <option value="ANGOLA">ANGOLA</option>
                                        <option value="ANGUILLA">ANGUILLA</option>
                                        <option value="ANTIGUA AND BARBUDA">ANTIGUA AND BARBUDA</option>
                                        <option value="ARGENTINA">ARGENTINA</option>
                                        <option value="ARMENIA">ARMENIA</option>
                                        <option value="ARUBA">ARUBA</option>
                                        <option value="AUSTRALIA">AUSTRALIA</option>
                                        <option value="AUSTRIA">AUSTRIA</option>
                                        <option value="AZERBAIJAN">AZERBAIJAN</option>
                                    </select>
                                    {errors.spouse_country_of_birth && <div className="text-red-500 text-sm mt-1">{errors.spouse_country_of_birth}</div>}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Profession Section */}
                    <div className="mt-8">
                        <h2 className='text-2xl font-bold text-gray-800 mb-6 text-center'>
                            Profession / Occupation Details of Applicant
                        </h2>
                        
                        {/* Present Occupation */}
                        <div className='mb-4'>
                            <label className='block mb-2 font-medium text-gray-700' htmlFor='present_occupation'>
                                Present Occupation *
                            </label>
                            <select 
                                value={data.present_occupation}
                                onChange={e => setData('present_occupation', e.target.value)}
                                className="block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value="">Select Present Occupation</option>
                                <option value="AIRFORCE">AIRFORCE</option>
                                <option value="BUSINESS PERSON">BUSINESS PERSON</option>
                                <option value="CAMERAMAN">CAMERAMAN</option>
                                <option value="CHARITY/SOCIAL WORKER">CHARITY/SOCIAL WORKER</option>
                                <option value="CHARTED ACCOUNTED">CHARTED ACCOUNTED</option>
                                <option value="COLLEGE/UNIVERSITY TEACHER">COLLEGE/UNIVERSITY TEACHER</option>
                                <option value="DIPLOMAT">DIPLOMAT</option>
                                <option value="DOCTOR">DOCTOR</option>
                            </select>
                            {errors.present_occupation && <div className="text-red-500 text-sm mt-1">{errors.present_occupation}</div>}
                        </div>

                        {/* Employer Name/Business */}
                        <div className='mb-4'>
                            <label className='block mb-2 font-medium text-gray-700' htmlFor='employer_name'>
                                Employer Name/Business *
                            </label>
                            <input
                                type='text'
                                id='employer_name'
                                value={data.employer_name}
                                onChange={e => setData('employer_name', e.target.value)}
                                className='block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500'
                                required
                            />
                            {errors.employer_name && <div className="text-red-500 text-sm mt-1">{errors.employer_name}</div>}
                        </div>

                        {/* Designation */}
                        <div className='mb-4'>
                            <label className='block mb-2 font-medium text-gray-700' htmlFor='designation'>
                                Designation
                            </label>
                            <input
                                type='text'
                                id='designation'
                                value={data.designation}
                                onChange={e => setData('designation', e.target.value)}
                                className='block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500'
                            />
                        </div>

                        {/* Employer Address */}
                        <div className='mb-4'>
                            <label className='block mb-2 font-medium text-gray-700' htmlFor='employer_address'>
                                Address *
                            </label>
                            <input
                                type='text'
                                id='employer_address'
                                value={data.employer_address}
                                onChange={e => setData('employer_address', e.target.value)}
                                className='block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500'
                                required
                            />
                            {errors.employer_address && <div className="text-red-500 text-sm mt-1">{errors.employer_address}</div>}
                        </div>

                        {/* Employer Phone */}
                        <div className='mb-4'>
                            <label className='block mb-2 font-medium text-gray-700' htmlFor='employer_phone'>
                                Phone *
                            </label>
                            <input
                                type='text'
                                id='employer_phone'
                                value={data.employer_phone}
                                onChange={e => setData('employer_phone', e.target.value)}
                                className='block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500'
                                required
                            />
                            {errors.employer_phone && <div className="text-red-500 text-sm mt-1">{errors.employer_phone}</div>}
                        </div>

                        {/* Past Occupation */}
                        <div className='mb-4'>
                            <label className='block mb-2 font-medium text-gray-700' htmlFor='past_occupation'>
                                Past Occupation
                            </label>
                            <select 
                                value={data.past_occupation}
                                onChange={e => setData('past_occupation', e.target.value)}
                                className="block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select Past Occupation</option>
                                <option value="AIRFORCE">AIRFORCE</option>
                                <option value="BUSINESS PERSON">BUSINESS PERSON</option>
                                <option value="CAMERAMAN">CAMERAMAN</option>
                                <option value="CHARITY/SOCIAL WORKER">CHARITY/SOCIAL WORKER</option>
                                <option value="CHARTED ACCOUNTED">CHARTED ACCOUNTED</option>
                                <option value="COLLEGE/UNIVERSITY TEACHER">COLLEGE/UNIVERSITY TEACHER</option>
                                <option value="DIPLOMAT">DIPLOMAT</option>
                                <option value="DOCTOR">DOCTOR</option>
                            </select>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className='mt-8 flex flex-col md:flex-row gap-4 justify-center'>
                        <button
                            type='submit'
                            disabled={processing}
                            className='w-full md:w-auto bg-blue-600 text-white font-medium py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50'
                        >
                            {processing ? 'Saving...' : 'Save and Continue'}
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