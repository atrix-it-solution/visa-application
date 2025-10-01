// resources/js/Pages/Blogs/Edit.tsx
import CKEditorComponent from '@/components/ui/Ckeditor/ckeditor';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, Link } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

interface BlogFormData {
    title: string;
    description: string;
    feature_image: File | null;
    delete_feature_image?: boolean;
    _method: string;
}

interface EditBlogProps {
    blog: {
        id: number;
        slug: string;
        title: string;
        description: string;
        feature_image?: string;
    };
}

export default function EditBlog({ blog }: EditBlogProps) {
    const { data, setData, errors, processing, post } = useForm<BlogFormData>({
        title: blog.title || '',
        description: blog.description || '',
        feature_image: null,
        delete_feature_image: false,
        _method: 'PUT'
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [showCurrentImage, setShowCurrentImage] = useState(!!blog.feature_image);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Blogs',
            href: "/blogs"
        },
        {
            title: `Edit: ${blog.title}`,
            href: `/blogs/${blog.slug}/edit`
        },
    ];

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        // console.log('Submitting data:', data);
        
        post(`/blogs/${blog.slug}`, {
            forceFormData: true,
            preserveScroll: true,
            onError: (errors) => {
                console.log('Form errors:', errors);
            },
            // onSuccess: () => {
            //     console.log('Blog updated successfully');
            // }
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('feature_image', file);
        setData('delete_feature_image', false); // Don't delete if uploading new image

        // Create preview for new image
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

    const handleDeleteCurrentImage = () => {
        // Mark current image for deletion
        setData('delete_feature_image', true);
        setData('feature_image', null);
        setShowCurrentImage(false);
        setImagePreview(null);
        
        // Reset file input
        const fileInput = document.getElementById('feature_image') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const handleDeleteNewImage = () => {
        // Remove new image preview
        setData('feature_image', null);
        setImagePreview(null);
        
        // Reset file input
        const fileInput = document.getElementById('feature_image') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit: ${blog.title}`} />

            <div className="py-12">
                <div className="container mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <div className="p-6">
                            <h1 className="text-2xl font-bold mb-6">Edit Blog</h1>

                            {/* Display general form errors */}
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

                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col lg:flex-row gap-20">
                                    {/* Left Column - Form Fields */}
                                    <div className="lg:w-10/12 space-y-6">
                                        {/* Title */}
                                        <div>
                                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                                Title *
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
                                                Description *
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

                                    {/* Right Column - Actions */}
                                    <div className="lg:w-2/12 space-y-6">
                                        {/* Buttons */}
                                        <div className="flex flex-col space-y-4">
                                            <button 
                                                type="submit" 
                                                disabled={processing}
                                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md disabled:opacity-50 transition-colors duration-200"
                                            >
                                                {processing ? 'Updating...' : 'Update Blog'}
                                            </button>
                                            <Link 
                                                href="/blogs" 
                                                className="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 text-center block"
                                            >
                                                Cancel
                                            </Link>
                                        </div>

                                        {/* Image Management */}
                                        <div className="space-y-4">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Feature Image
                                            </label>

                                       

                                            {/* Current Image with Delete Option */}
                                            {showCurrentImage && blog.feature_image && !imagePreview && (
                                                <div className="space-y-3">
                                                    <div className="relative">
                                                        <img 
                                                            src={`/storage/${blog.feature_image}`}
                                                            alt={blog.title}
                                                            className="w-full h-32 object-cover rounded"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={handleDeleteCurrentImage}
                                                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-colors duration-200"
                                                            title="Remove current image"
                                                        >
                                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <p className="text-xs text-gray-500 text-center">
                                                        Click the X to remove current image
                                                    </p>
                                                </div>
                                            )}

                                            {/* New Image Preview */}
                                            {imagePreview && (
                                                <div className="space-y-3">
                                                    <div className="relative ">
                                                        <img 
                                                            src={imagePreview}
                                                            alt="Preview"
                                                            className="w-full h-32 object-cover rounded"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={handleDeleteNewImage}
                                                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-colors duration-200"
                                                            title="Remove new image"
                                                        >
                                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <p className="text-xs text-gray-500 text-center">
                                                        New image preview
                                                    </p>
                                                </div>
                                            )}

                                            {/* File Upload Input */}
                                            <div className="space-y-2">
                                                <input 
                                                    type="file" 
                                                    id="feature_image"
                                                    onChange={handleFileChange}
                                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors duration-200"
                                                    accept="image/*"
                                                />
                                                {errors.feature_image && (
                                                    <div className="text-red-500 text-sm mt-1">
                                                        {errors.feature_image}
                                                    </div>
                                                )}
                                                <p className="text-xs text-gray-500">
                                                    {showCurrentImage && blog.feature_image 
                                                        ? 'Upload a new image to replace the current one' 
                                                        : 'Upload a feature image'
                                                    }
                                                </p>
                                            </div>
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