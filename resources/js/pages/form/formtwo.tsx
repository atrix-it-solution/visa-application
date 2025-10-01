// resources/js/Pages/Form/FormTwo.tsx
import { Head, useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@inertiajs/core';
import { router } from '@inertiajs/react'

interface Application {
    application_id: string;
    application_type: string;
    port_of_arrival: string;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    nationality: string;
    passport_number: string;
}

interface FormTwoProps extends PageProps {
    application: Application;
}

export default function FormTwo({ application }: FormTwoProps) {
    //  console.log('Application data received:', application);
    // console.log('Date of birth value:', application.date_of_birth);
    // console.log('Type of date_of_birth:', typeof application.date_of_birth);

     const transformDate = (dateString: string) => {
        if (!dateString) return '';
        
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return ''; // Invalid date
            
            return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
        } catch (error) {
            console.error('Date transformation error:', error);
            return '';
        }
    };
    const { data, setData, post, processing, errors } = useForm({
        // Personal Details
        surname: application.last_name || '',
        given_name: application.first_name || '',
        name_change: false,
        sex: '',
        date_of_birth: transformDate(application.date_of_birth),
        town_city_of_birth: '',
        country_of_birth: '',
        citizenship_national_id_no: '',
        religion: '',
        visible_identification_marks: '',
        nationality: application.nationality || '',
        edu_qualification: '',
        lived_two_years: '',
        
        // Passport Details
        passport_number: application.passport_number || '',
        place_of_issue: '',
        date_of_issue: '',
        date_of_expiry: '',
    });

   // FIX: Uncomment and use the submit handler
const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Use router.post directly with the URL
    router.post(`/form-visa-two/${application.application_id}`, data, {
        preserveScroll: true,
        onError: (errors) => {
            console.log('Form errors:', errors);
        },
        onSuccess: () => {
            console.log('Second form submitted successfully');
        }
    });
};


    const handleSaveExit = (e: React.FormEvent) => {
        e.preventDefault();
        // Implement save and exit logic here
        console.log('Save and exit', data);
    };

    return (
        <>
            <Head title="e-Visa Application - Step 2">
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

                <h1 className='text-3xl font-bold text-gray-800 mb-8 text-center'>
                    Applicant Details
                </h1>

                <form onSubmit={handleSubmit} className='p-8 bg-white rounded-lg shadow-md'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        
                       {/* Surname - Editable only if name changed */}
                        <div className='col-span-1'>
                            <label className='block mb-2 font-medium text-gray-700' htmlFor='surname'>
                                Surname *
                            </label>
                            <input
                                type='text'
                                id='surname'
                                value={data.surname}
                                onChange={e => setData('surname', e.target.value)}
                                readOnly={!data.name_change} // Read-only unless name_change is checked
                                className={`block w-full border border-gray-300 rounded-md p-2 ${
                                    data.name_change 
                                        ? 'bg-white focus:ring-blue-500 focus:border-blue-500' 
                                        : 'bg-gray-100 cursor-not-allowed'
                                }`}
                                required
                            />
                        
                        </div>

                        {/* Given Name - Editable only if name changed */}
                        <div className='col-span-1'>
                            <label className='block mb-2 font-medium text-gray-700' htmlFor='given_name'>
                                Given Name *
                            </label>
                            <input
                                type='text'
                                id='given_name'
                                value={data.given_name}
                                onChange={e => setData('given_name', e.target.value)}
                                readOnly={!data.name_change} // Read-only unless name_change is checked
                                className={`block w-full border border-gray-300 rounded-md p-2 ${
                                    data.name_change 
                                        ? 'bg-white focus:ring-blue-500 focus:border-blue-500' 
                                        : 'bg-gray-100 cursor-not-allowed'
                                }`}
                                required
                            />
                        
                        </div>

                        {/* Name Change */}
                        <div className='col-span-2'>
                            <p className='block mb-2 font-medium text-gray-700'>Have you ever changed your name?</p>
                            <label className='inline-flex items-center'>
                                <input 
                                    type="checkbox" 
                                    id="name_change" 
                                    checked={data.name_change}
                                    onChange={e => setData('name_change', e.target.checked)}
                                    className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                                />
                                <span className='ml-2'>Yes</span>
                            </label>
                        </div>

                        {/* Sex */}
                        <div className='col-span-1'>
                            <label className='block mb-2 font-medium text-gray-700' htmlFor='sex'>
                                Sex *
                            </label>
                            <select
                                id='sex'
                                value={data.sex}
                                onChange={e => setData('sex', e.target.value)}
                                className='block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500'
                                required
                            >
                                <option value=''>Select</option>
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                                <option value='other'>Other</option>
                            </select>
                            {errors.sex && <div className="text-red-500 text-sm mt-1">{errors.sex}</div>}
                        </div>

                        {/* Date of Birth */}
                        <div className='col-span-1'>
                            <label className='block mb-2 font-medium text-gray-700' htmlFor='date_of_birth'>
                                Date of Birth *
                            </label>
                            <input
                                type='text'
                                id='date_of_birth'
                                value={data.date_of_birth}
                                 readOnly
                                onChange={e => setData('date_of_birth', e.target.value)}
                                className='block w-full border  rounded-md p-2  bg-gray-100 cursor-not-allowed'
                                required
                            />
                            {errors.date_of_birth && <div className="text-red-500 text-sm mt-1">{errors.date_of_birth}</div>}
                        </div>

                        {/* Town/City of Birth */}
                        <div className='col-span-1'>
                            <label className='block mb-2 font-medium text-gray-700' htmlFor='town_city_of_birth'>
                                Town/City of Birth *
                            </label>
                            <input
                                type='text'
                                id='town_city_of_birth'
                                value={data.town_city_of_birth}
                                onChange={e => setData('town_city_of_birth', e.target.value)}
                                className='block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500'
                                required
                            />
                            {errors.town_city_of_birth && <div className="text-red-500 text-sm mt-1">{errors.town_city_of_birth}</div>}
                        </div>

                        {/* Country of Birth */}
                        <div className='col-span-1'>
                            <label className='block mb-2 font-medium text-gray-700' htmlFor='country_of_birth'>
                                Country of Birth *
                            </label>
                            <input
                                type='text'
                                id='country_of_birth'
                                value={data.country_of_birth}
                                onChange={e => setData('country_of_birth', e.target.value)}
                                className='block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500'
                                required
                            />
                            {errors.country_of_birth && <div className="text-red-500 text-sm mt-1">{errors.country_of_birth}</div>}
                        </div>

                        {/* Citizenship/National ID No */}
                        <div className='col-span-1'>
                            <label className='block mb-2 font-medium text-gray-700' htmlFor='citizenship_national_id_no'>
                                Citizenship/National Id No.
                            </label>
                            <input
                                type='text'
                                id='citizenship_national_id_no'
                                value={data.citizenship_national_id_no}
                                onChange={e => setData('citizenship_national_id_no', e.target.value)}
                                className='block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500'
                            />
                        </div>

                        {/* Religion */}
                        <div className='col-span-1'>
                            <label className='block mb-2 font-medium text-gray-700' htmlFor='religion'>
                                Religion *
                            </label>
                            <input
                                type='text'
                                id='religion'
                                value={data.religion}
                                onChange={e => setData('religion', e.target.value)}
                                className='block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500'
                                required
                            />
                            {errors.religion && <div className="text-red-500 text-sm mt-1">{errors.religion}</div>}
                        </div>

                        {/* Visible Identification Marks */}
                        <div className='col-span-1'>
                            <label className='block mb-2 font-medium text-gray-700' htmlFor='visible_identification_marks'>
                                Visible Identification Marks
                            </label>
                            <input
                                type='text'
                                id='visible_identification_marks'
                                value={data.visible_identification_marks}
                                onChange={e => setData('visible_identification_marks', e.target.value)}
                                className='block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500'
                            />
                        </div>

                        {/* Nationality */}
                        <div className='col-span-1'>
                            <label className='block mb-2 font-medium text-gray-700' htmlFor='nationality'>
                                Nationality *
                            </label>
                            <input
                                type='text'
                                id='nationality'
                                value={data.nationality}
                                onChange={e => setData('nationality', e.target.value)}
                                readOnly
                                className='block w-full border border-gray-500 rounded-md p-2 cursor-not-allowed bg-gray-100'
                                required
                            />
                            {errors.nationality && <div className="text-red-500 text-sm mt-1">{errors.nationality}</div>}
                        </div>

                        {/* Educational Qualification */}
                        <div className='col-span-1'>
                            <label className='block mb-2 font-medium text-gray-700' htmlFor='edu_qualification'>
                                Educational Qualification *
                            </label>
                            <select 
                                className="block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" 
                                id="edu_qualification" 
                                value={data.edu_qualification}
                                onChange={e => setData('edu_qualification', e.target.value)}
                                required
                            >
                                <option value="">Select</option>
                                <option value="BELOW MATRICULATION">BELOW MATRICULATION</option>
                                <option value="HIGHER SECONDARY">HIGHER SECONDARY</option>
                                <option value="MATRICULATION">MATRICULATION</option>
                                <option value="POST GRADUATE">POST GRADUATE</option>
                                <option value="ILLITERATE">ILLITERATE</option>
                                <option value="NA BEING MINOR">NA BEING MINOR</option>
                                <option value="OTHERS">OTHERS</option>
                                <option value="PROFESSIONAL">PROFESSIONAL</option>
                            </select>
                            {errors.edu_qualification && <div className="text-red-500 text-sm mt-1">{errors.edu_qualification}</div>}
                        </div>

                        {/* Lived two years */}
                        <div className='col-span-2'>
                            <p className='block mb-2 font-medium text-gray-700'>Have you lived for at least two years in the country where you are applying visa? *</p>
                            <div className='flex gap-4'>
                                <label className='inline-flex items-center'>
                                    <input 
                                        type="radio" 
                                        id="lived_two_years_yes" 
                                        name="lived_two_years" 
                                        value="Yes"
                                        checked={data.lived_two_years === 'Yes'}
                                        onChange={e => setData('lived_two_years', e.target.value)}
                                        className='rounded-full border-gray-300 text-blue-600 focus:ring-blue-500'
                                    />
                                    <span className='ml-2'>Yes</span>
                                </label>
                                <label className='inline-flex items-center'>
                                    <input 
                                        type="radio" 
                                        id="lived_two_years_no" 
                                        name="lived_two_years" 
                                        value="No"
                                        checked={data.lived_two_years === 'No'}
                                        onChange={e => setData('lived_two_years', e.target.value)}
                                        className='rounded-full border-gray-300 text-blue-600 focus:ring-blue-500'
                                    />
                                    <span className='ml-2'>No</span>
                                </label>
                            </div>
                            {errors.lived_two_years && <div className="text-red-500 text-sm mt-1">{errors.lived_two_years}</div>}
                        </div>
                    </div>

                    {/* Passport Details Section */}
                    <div className='mt-8'>
                        <h1 className='text-2xl font-bold text-gray-800 mb-6 text-center'>
                            Passport Details
                        </h1>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            {/* Passport Number */}
                            <div className='col-span-1'>
                                <label className='block mb-2 font-medium text-gray-700' htmlFor='passport_number'>
                                    Passport Number *
                                </label>
                                <input
                                    type='text'
                                    id='passport_number'
                                    value={data.passport_number}
                                    onChange={e => setData('passport_number', e.target.value)}
                                    className='block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-100 cursor-not-allowed'
                                    readOnly
                                    required
                                />
                                {errors.passport_number && <div className="text-red-500 text-sm mt-1">{errors.passport_number}</div>}
                            </div>

                            {/* Place of Issue */}
                            <div className='col-span-1'>
                                <label className='block mb-2 font-medium text-gray-700' htmlFor='place_of_issue'>
                                    Place of Issue *
                                </label>
                                <input
                                    type='text'
                                    id='place_of_issue'
                                    value={data.place_of_issue}
                                    onChange={e => setData('place_of_issue', e.target.value)}
                                    className='block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500'
                                    required
                                />
                                {errors.place_of_issue && <div className="text-red-500 text-sm mt-1">{errors.place_of_issue}</div>}
                            </div>

                            {/* Date of Issue */}
                            <div className='col-span-1'>
                                <label className='block mb-2 font-medium text-gray-700' htmlFor='date_of_issue'>
                                    Date of Issue *
                                </label>
                                <input
                                    type='date'
                                    id='date_of_issue'
                                    value={data.date_of_issue}
                                    onChange={e => setData('date_of_issue', e.target.value)}
                                    className='block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500'
                                    required
                                />
                                {errors.date_of_issue && <div className="text-red-500 text-sm mt-1">{errors.date_of_issue}</div>}
                            </div>

                            {/* Date of Expiry */}
                            <div className='col-span-1'>
                                <label className='block mb-2 font-medium text-gray-700' htmlFor='date_of_expiry'>
                                    Date of Expiry *
                                </label>
                                <input
                                    type='date'
                                    id='date_of_expiry'
                                    value={data.date_of_expiry}
                                    onChange={e => setData('date_of_expiry', e.target.value)}
                                    className='block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500'
                                    required
                                />
                                {errors.date_of_expiry && <div className="text-red-500 text-sm mt-1">{errors.date_of_expiry}</div>}
                            </div>
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