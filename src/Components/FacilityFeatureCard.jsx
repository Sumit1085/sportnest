import Image from "next/image";
import Link from "next/link";
import { CiLocationOn } from "react-icons/ci";

const FacilityFeatureCard = async () => {
  let limitedDatas = [];
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const res = await fetch(`${apiUrl}/facility`, { cache: 'no-store' });
    if (res.ok) {
      const datas = await res.json();
      limitedDatas = datas.slice(0, 6);
    }
  } catch (error) {
    console.error("Error fetching featured facilities:", error);
  }

  if (limitedDatas.length === 0) {
    return (
      <div className="text-center py-12 w-full bg-white rounded-3xl border border-gray-100">
        <p className="text-gray-500 font-medium">No featured facilities available right now.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-10 w-full" >
      {limitedDatas.map((data) => (
        <div
          key={data._id}
          className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition flex flex-col h-full border border-gray-100"
        >
          {/* Image */}
          <div className="relative h-48 w-full bg-gray-100">
            <Image
              src={data.thumbnail || "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=600"}
              alt={data.name}
              fill
              className="object-cover"
            />

            <span className="absolute top-4 left-4 bg-orange-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              {data.type || "Sports Arena"}
            </span>
          </div>

          {/* Content */}
          <div className="p-6 flex-grow flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start gap-2 mb-2">
                <h3 className="font-extrabold text-lg text-[#071B34] line-clamp-1">{data.name}</h3>
                <span className="text-orange-600 font-black text-sm flex-shrink-0">
                  ৳{data.price_per_hour}/hr
                </span>
              </div>

              <div className="flex items-center text-gray-500 text-sm">
                <CiLocationOn size={16} className="mr-1 text-orange-600 flex-shrink-0" />
                <span className="line-clamp-1">{data.location}</span>
              </div>
            </div>

            <button className="w-full mt-6 bg-[#071B34] text-white py-3.5 rounded-xl font-bold hover:bg-orange-500 transition duration-200 shadow-sm cursor-pointer text-xs uppercase tracking-wider">
              <Link href={`/all-facilities/${data._id}`} className="block w-full h-full text-center">
                Book Now
              </Link>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FacilityFeatureCard;
