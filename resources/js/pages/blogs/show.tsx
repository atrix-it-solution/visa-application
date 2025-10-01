// resources/js/Pages/Blogs/Show.tsx
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

interface Blog {
    id: number;
    slug: string;
    title: string;
    description: string;
    feature_image?: string;
    created_at: string;
    updated_at: string;
}

interface ShowBlogProps {
    blog: Blog;
    status?: string;
}

export default function ShowBlog({ blog, status }: ShowBlogProps) {
    const breadcrumbs: BreadcrumbItem[] = [

        {
            title: blog.title,
            href:"/blogs/show"
        },
    ];

    const deleteBlog = () => {
        if (confirm('Are you sure you want to delete this blog?')) {
            router.delete(`/blogs/${blog.slug}`);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={blog.title} />
            
            <div className="py-8">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    {/* Status Message */}
                    {status && (
                        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                            {status}
                        </div>
                    )}

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {/* Back Button */}
                            <Link 
                                href={"/blogs"}
                                className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Blogs
                            </Link>

                            {/* Blog Content */}
                            <article>
                                <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
                                
                                {/* Feature Image */}
                                {blog.feature_image && (
                                    <div className="mb-6">
                                        <img 
                                            src={`/storage/${blog.feature_image}`}
                                            alt={blog.title}
                                            className="w-full h-64 object-cover rounded-lg"
                                        />
                                    </div>
                                )}

                                {/* Description */}
                                <div className="prose max-w-none mb-6">
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                        {blog.description}
                                    </p>
                                </div>

                                {/* Meta Information */}
                                <div className="border-t pt-4 mt-6">
                                    <p className="text-sm text-gray-500">
                                        Created: {formatDate(blog.created_at)} | 
                                        Last updated: {formatDate(blog.updated_at)}
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex space-x-4 mt-6">
                                    <Link 
                                        href={`/blogs/${blog.slug}/edit`}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded transition-colors"
                                    >
                                        Edit
                                    </Link>
                                    <button 
                                        onClick={deleteBlog}
                                        className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}