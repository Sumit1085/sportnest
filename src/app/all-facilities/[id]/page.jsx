import FacilityBanner from "@/Components/FacilityBanner";
import FacilityBookingForm from "@/Components/FacilityBookingForm";
import FacilityDetails from "@/Components/FacilityDetails";

const singleFacility = async (id) => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/facility/${id}`);
    const data = await res.json()
    return data || {};
}

const facilityDetailsPage = async ({ params }) => {
    const { id } = await params
    const facility = await singleFacility(id)
    console.log(facility);
    return (
        <div>
            <div className="bg-background text-on-surface min-h-screen">
                <FacilityBanner images={facility.thumbnail} status={facility.name} />

                <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 flex flex-col lg:flex-row gap-12">

                    {/* LEFT */}
                    <div className="flex-1 space-y-10">
                        <FacilityDetails facility={facility} />
                    </div>

                    {/* RIGHT */}
                    <div className="w-full lg:w-[400px]">
                        <FacilityBookingForm facility={facility} />
                    </div>

                </div>
            </div>
        </div>
    );
}




export default facilityDetailsPage;