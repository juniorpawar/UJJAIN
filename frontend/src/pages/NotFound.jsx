import React from 'react';
import { Link } from 'react-router-dom';


export default function NotFound() {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Page not found</h2>
            <button
                onClick={window.history.back()}
                className="inline-flex items-center rounded-xl border px-4 py-2 text-sm hover:bg-gray-50">← Back to planner</button>
        </div>
    );
}