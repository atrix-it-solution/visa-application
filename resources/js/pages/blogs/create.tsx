// resources/js/Pages/Blogs/Create.tsx
import CKEditorComponent from '@/components/ui/Ckeditor/ckeditor';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, Link } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Blog',
        href: "/blogs/create"
    },
];

interface BlogFormData {
    title: string;
    description: string;
    feature_image: File | null;
}

export default function CreateBlog() {
    const { data, setData, errors, processing, post } = useForm<BlogFormData>({
        title: '',
        description: '',
        feature_image: null,
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/blogs', {
            forceFormData: true, // Important for file uploads
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('feature_image', file);

        // Create image preview
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleDeletePreview = () => {
        // Clear both the file input and preview
        setData('feature_image', null);
        setImagePreview(null);
        
        // Reset the file input element
        const fileInput = document.getElementById('feature_image') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Blog" />

            <div className="py-12 create-blog">
                <div className="container mx-auto sm:px-6 lg:px-8">
                    <div className=" overflow-hidden">
                        <div className="p-6">
                            <h1 className="text-2xl font-bold mb-6">Create New Blog</h1>
                            
                            <form onSubmit={handleSubmit}>
                                {/* Using flexbox for 10/2 split */}
                                <div className="flex flex-col lg:flex-row gap-20">
                                    {/* Left Column - 10 parts (83.33%) */}
                                    <div className="lg:w-10/12 space-y-6">
                                        {/* Title */}
                                        <div>
                                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                                Title
                                            </label>
                                            <input 
                                                value={data.title}
                                                onChange={e => setData('title', e.target.value)}
                                                type="text" 
                                                id="title"
                                                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                required
                                            />
                                            {errors.title && (
                                                <div className="text-red-500 text-sm mt-1">
                                                    {errors.title}
                                                </div>
                                            )}
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                                Description
                                            </label>
                                            
                                            <CKEditorComponent
                                                value={data.description}
                                                onChange={(value) => setData('description', value)}
                                                placeholder="Write your blog content here..."
                                                height="300px"
                                            />
                                            {errors.description && (
                                                <div className="text-red-500 text-sm mt-1">
                                                    {errors.description}
                                                </div>
                                            )}
                                        </div>
                                    
                                    </div>

                                    {/* Right Column - 2 parts (16.67%) */}
                                    <div className="lg:w-2/12 space-y-6">
                                        {/* Buttons */}
                                        <div className="flex flex-col space-y-4">
                                            <button 
                                                type="submit" 
                                                disabled={processing}
                                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md disabled:opacity-50 transition-colors duration-200"
                                            >
                                                {processing ? 'Creating...' : 'Create Blog'}
                                            </button>
                                            <Link 
                                                href="/blogs" 
                                                className="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 text-center block"
                                            >
                                                Cancel
                                            </Link>
                                        </div>

                                        {/* Image Upload & Preview */}
                                        <div>
                                            <label htmlFor="feature_image" className="block text-sm font-medium text-gray-700">
                                                        Feature Image
                                                    </label>
                                            {imagePreview ? (
                                                // Preview Mode - Show image with delete button
                                                <div className="space-y-4">
                                                    
                                                    <div className="relative">
                                                        <img 
                                                            src={imagePreview}
                                                            alt="Preview"
                                                            className="w-full h-32 object-cover rounded-md border border-gray-300"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={handleDeletePreview}
                                                            className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg transition-colors duration-200"
                                                            title="Remove image"
                                                        >
                                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                // Upload Mode - Show file input
                                                <div className="space-y-4">
                                                    {/* <label htmlFor="feature_image" className="block text-sm font-medium text-gray-700">
                                                        Feature Image
                                                    </label> */}
                                                    <input 
                                                        type="file" 
                                                        id="feature_image"
                                                        onChange={handleFileChange}
                                                        className="w-full text-sm text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors duration-200"
                                                        accept="image/*"
                                                    />
                                                    {errors.feature_image && (
                                                        <div className="text-red-500 text-sm mt-1">
                                                            {errors.feature_image}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}