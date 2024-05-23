import React from 'react'

function Loader() {
    return (
        <div>
            <div class="flex flex-row gap-2">
                <div class="w-6 h-6 rounded-full bg-indigo-700 animate-bounce"></div>
                <div class="w-6 h-6 rounded-full bg-indigo-700 animate-bounce [animation-delay:-.3s]"></div>
                <div class="w-6 h-6 rounded-full bg-indigo-700 animate-bounce [animation-delay:-.5s]"></div>
            </div>
        </div>
    )
}

export default Loader