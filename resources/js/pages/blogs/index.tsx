// resources/js/Pages/Blogs/Index.tsx
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

interface BlogIndexProps {
    blogs: Blog[];
    status?: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Blogs',
        href: "/blogs"
    },
];

export default function BlogIndex({ blogs, status }: BlogIndexProps) {
    const deleteBlog = (blog: Blog) => {
        if (confirm('Are you sure you want to delete this blog?')) {
            router.delete(`/blogs/${blog.slug}`);
        }
    };

    const truncateText = (text: string, length: number) => {
        return text.length > length ? text.substring(0, length) + '...' : text;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Blog Posts" />
            
            <div className="py-8">
                <div className="container mx-auto sm:px-6 lg:px-8">
                    {/* Status Message */}
                    {status && (
                        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                            {status}
                        </div>
                    )}

                    <div className=" overflow-hidden    ">
                        <div className="p-6 ">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
                                    <p className="text-gray-600 mt-2">Manage your blog posts</p>
                                </div>
                                <Link 
                                    href={"/blogs/create"}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                                >
                                    Create New Blog
                                </Link>
                            </div>

                            {/* Table */}
                            {blogs.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 border">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Image
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Title
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Description
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Created Date
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {blogs.map((blog) => (
                                                <tr key={blog.id} className="hover:bg-gray-50">
                                                    {/* Feature Image */}
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {blog.feature_image ? (
                                                            <img 
                                                                src={`/storage/${blog.feature_image}`}
                                                                alt={blog.title}
                                                                className="h-12 w-12 object-cover rounded"
                                                            />
                                                        ) : (
                                                            <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center">
                                                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                            </div>
                                                        )}
                                                    </td>
                                                    
                                                    {/* Title */}
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                                                    </td>
                                                    
                                                    {/* Description */}
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-900 max-w-xs">
                                                            {truncateText(blog.description, 100)}
                                                        </div>
                                                    </td>
                                                    
                                                    {/* Created Date */}
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">{formatDate(blog.created_at)}</div>
                                                    </td>
                                                    
                                                    {/* Action Buttons */}
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex space-x-2">
                                                            {/* View Button */}
                                                            <Link 
                                                                href={`/blogs/${blog.slug}`}
                                                                className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                                                                title="View"
                                                            >
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                </svg>
                                                            </Link>
                                                            
                                                            {/* Edit Button */}
                                                            <Link 
                                                                href={`/blogs/${blog.slug}/edit`}
                                                                className="text-yellow-600 hover:text-yellow-900 p-1 rounded transition-colors"
                                                                title="Edit"
                                                            >
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                </svg>
                                                            </Link>
                                                            
                                                            {/* Delete Button */}
                                                            <button 
                                                                onClick={() => deleteBlog(blog)}
                                                                className="text-red-600 hover:text-red-900 p-1 rounded transition-colors"
                                                                title="Delete"
                                                            >
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                /* Empty State */
                                <div className="text-center py-12">
                                    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts yet</h3>
                                    <p className="text-gray-500 mb-6">Get started by creating your first blog post.</p>
                                    <Link 
                                        href={"/blogs/create"}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                                    >
                                        Create Your First Blog
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}