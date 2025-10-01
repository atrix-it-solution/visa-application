<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia; // Add this import

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blogs = Blog::latest()->get();
        
        return Inertia::render('blogs/index', [
            'blogs' => $blogs,
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('blogs/create', [
            'status' => session('status'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'feature_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048'
        ]);

        $blogData = $request->only(['title', 'description']);

        if ($request->hasFile('feature_image')) {
            $imagePath = $request->file('feature_image')->store('blog-images', 'public');
            $blogData['feature_image'] = $imagePath;
        }

        Blog::create($blogData);

        return redirect()->route('blogs.index')->with('status', 'Blog created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog)
    {
        return Inertia::render('blogs/show', [
            'blog' => $blog,
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Blog $blog)
    {
        return Inertia::render('blogs/edit', [
            'blog' => $blog,
            'status' => session('status'),
        ]);
    }

   /**
 * Update the specified resource in storage.
 */
public function update(Request $request, Blog $blog)
{
    // Debug: Check what data is received
    \Log::info('Update request all data:', $request->all());
    \Log::info('Update request title:', ['title' => $request->title]);
    \Log::info('Update request description:', ['description' => $request->description]);
    \Log::info('Update request has file:', ['has_file' => $request->hasFile('feature_image')]);
    \Log::info('Update request method:', ['method' => $request->method()]);

    // Check if data is coming through
    if (empty($request->title)) {
        \Log::error('Title is empty in request!');
    }
    if (empty($request->description)) {
        \Log::error('Description is empty in request!');
    }

    $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'required|string',
        'feature_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048'
    ]);

    $blogData = $request->only(['title', 'description']);

    if ($request->hasFile('feature_image')) {
        if ($blog->feature_image) {
            Storage::disk('public')->delete($blog->feature_image);
        }
        
        $imagePath = $request->file('feature_image')->store('blog-images', 'public');
        $blogData['feature_image'] = $imagePath;
    }

    $blog->update($blogData);

    return redirect()->route('blogs.index')->with('status', 'Blog updated successfully!');
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        if ($blog->feature_image) {
            Storage::disk('public')->delete($blog->feature_image);
        }
        
        $blog->delete();

        return redirect()->route('blogs.index')->with('status', 'Blog deleted successfully!');
    }
}