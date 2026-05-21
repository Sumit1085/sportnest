import { headers } from "next/headers";

import FacilityBanner from "@/Components/FacilityBanner";
import FacilityBookingForm from "@/Components/FacilityBookingForm";
import FacilityDetails from "@/Components/FacilityDetails";
import { auth } from "@/lib/auth";

const singleFacility = async (id) => {

    
    const res = await fetch(
        `${process.env.BETTER_AUTH_URL}/facility/${id}`,
        {
            headers,
            cache: "no-store"
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch facility");
    }

    return res.json();
};

const FacilityDetailsPage = async ({ params }) => {

    const { id } = params;

  

    const facility = await singleFacility(id);

    return (
        <div className="bg-background text-on-surface min-h-screen">

            <FacilityBanner facility={facility} />

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 flex flex-col lg:flex-row gap-12">

                <div className="flex-1 space-y-10">
                    <FacilityDetails facility={facility} />
                </div>

                <div className="w-full lg:w-[400px]">
                    <FacilityBookingForm facility={facility} />
                </div>

            </div>
        </div>
    );
};

export default FacilityDetailsPage;