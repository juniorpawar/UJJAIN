import React from 'react'
import {CircleChevronLeft} from "lucide-react"

const BackButton = () => {
    return (
        <div>
            <button
                onClick={() => window.history.back()}
                className="absolute right-1 top-3 flex items-center gap-2 px-2 py-2 rounded-full bg-orange-500 text-white text-sm font-semibold shadow-md hover:bg-orange-600 hover:-translate-y-0.5 transition-all"
            >
                <CircleChevronLeft size={18} />
            </button>
        </div>
    )
}

export default BackButton