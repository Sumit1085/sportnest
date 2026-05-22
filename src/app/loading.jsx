'use client';

import { Spinner } from "@heroui/react";

export default function Loading() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4 bg-[#F4F4F7]">
            <Spinner size="lg" color="warning" />
            <p className="text-gray-500 font-medium animate-pulse">Loading SportNest...</p>
        </div>
    );
}
