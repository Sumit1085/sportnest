
export default function FacilityBookingForm({ facility }) {
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

            {/* HEADER */}
            <div className="bg-black text-white p-6">
                <div className="text-sm text-gray-300">Starts from</div>
                <div className="text-3xl font-bold text-orange-500">
                    ${facility.price_per_hour}/hr
                </div>

                <div className="text-sm mt-2">
                    ⭐ ({facility.capacity}  )
                </div>
            </div>

            {/* FORM */}
            <form className="p-6 space-y-4">

                <input type="date" className="w-full border p-3 rounded-lg" />

                <div className="grid grid-cols-2 gap-3">
                    <select className="border p-3 rounded-lg">
                       {
                        facility.available_slots?.map((slot,index)=> 
                             <option key={index} value={slot}>{slot}</option>
                        
                        )
                       }
                    </select>

                    <input type="number" min="1" defaultValue={1} className="border p-3 rounded-lg" />
                </div>

                <div className="border-t pt-4 text-sm space-y-2">
                    <div className="flex justify-between">
                        <span>$45 × 2</span>
                        <span>$90</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Fee</span>
                        <span>$4.5</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>$94.5</span>
                    </div>
                </div>

                <button className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700">
                    Confirm Booking
                </button>

                <p className="text-center text-xs text-gray-500">
                    You wont be charged yet
                </p>
            </form>
        </div>
    );
}