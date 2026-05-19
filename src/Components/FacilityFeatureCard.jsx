import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";

const FacilityFeatureCard = async () => {
  const res = await fetch("http://localhost:8000/facility");

  const datas = await res.json();

  const limitedDatas = datas.slice(0, 6);

  console.log(limitedDatas);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-30 w-full" >
      {limitedDatas.map((data) => (
        
              <div
                key={data._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
              >
                {/* Image */}
                <div className="relative h-44 w-full">
                  <Image
                    src={data.thumbnail}
                    alt={data.name}
                    fill
                    className="object-cover"
                  />

                  <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                    {data.status}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg text-black">{data.name}</h3>
                    <span className="text-orange-600 font-bold">
                      ৳{data.price_per_hour} / hr
                    </span>
                  </div>

                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <CiLocationOn  size={14} className="mr-1 text-orange-600" />
                    {data.location}
                  </div>

                  {/* Tags */}
                

                  {/* Button */}
                  <button className="w-full mt-4 bg-orange-600 text-white py-2 rounded-lg font-medium hover:bg-orange-700 transition">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
   
    </div>
  );
};

export default FacilityFeatureCard;

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           
          </div>