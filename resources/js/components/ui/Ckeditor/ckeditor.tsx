// resources/js/components/ui/ckeditor.tsx
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState, useRef, useEffect } from 'react';

interface CKEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    height?: string;
}

export default function CKEditorComponent({ 
    value, 
    onChange, 
    placeholder = 'Start typing...',
    height = '200px'
}: CKEditorProps) {
    const editorRef = useRef<any>(null);
    const [editorData, setEditorData] = useState(value || '');
    const [hasError, setHasError] = useState(false);

    // Update internal state when value prop changes
    useEffect(() => {
        setEditorData(value || '');
    }, [value]);

    const handleEditorReady = (editor: any) => {
        editorRef.current = editor;
        
        // Set up custom upload adapter
        editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
            return new MyUploadAdapter(loader);
        };

        // Set minimum height
        editor.editing.view.change((writer: any) => {
            writer.setStyle('min-height', height, editor.editing.view.document.getRoot());
        });
    };

    const handleEditorChange = (event: any, editor: any) => {
        const data = editor.getData();
        setEditorData(data);
        if (onChange) onChange(data);
    };

    // Custom upload adapter that converts images to base64
    class MyUploadAdapter {
        private loader: any;
        
        constructor(loader: any) {
            this.loader = loader;
        }

        upload() {
            return this.loader.file.then((file: File) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                        // Returns base64 encoded image
                        resolve({ default: reader.result });
                    };
                    reader.onerror = (error) => reject(error);
                });
            });
        }

        abort() {
            console.log('Upload aborted');
        }
    }

    // Fallback to textarea if CKEditor fails to load
    if (hasError) {
        return (
            <textarea
                value={editorData}
                onChange={(e) => {
                    setEditorData(e.target.value);
                    if (onChange) onChange(e.target.value);
                }}
                className="w-full h-40 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder={placeholder}
                style={{ minHeight: height }}
            />
        );
    }

    return (
        <div className="ckeditor-wrapper text-black">
            <CKEditor
                editor={ClassicEditor}
                data={editorData}
                onReady={handleEditorReady}
                onChange={handleEditorChange}
                onError={() => setHasError(true)}
                config={{
                    placeholder,
                    toolbar: {
                        items: [
                            'heading',
                            '|',
                            'bold',
                            'italic',
                            'link',
                            'bulletedList',
                            'numberedList',
                            '|',
                            'imageUpload', // Make sure this is included
                            'blockQuote',
                            'insertTable',
                            '|',
                            'undo',
                            'redo'
                        ]
                    },
                    image: {
                        toolbar: [
                            'imageTextAlternative',
                            'toggleImageCaption',
                            'imageStyle:inline',
                            'imageStyle:block',
                            'imageStyle:side'
                        ]
                    },
                    language: 'en'
                }}
            />
        </div>
    );
}