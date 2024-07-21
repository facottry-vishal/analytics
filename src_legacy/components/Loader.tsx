import React from 'react'

export const Loader = () => {
    return (
        <div className="h-screen flex flex-col bg-background border shadow-sm rounded-xl">
            <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
                <div className="flex justify-center">
                    <div className="animate-spin inline-block w-12 h-12 border-[3px] border-current border-t-transparent text-primary rounded-full" role="status" aria-label="loading">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
