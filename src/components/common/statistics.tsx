import { AlarmCheck, Flag, CircleCheck } from "lucide-react";
import Image from "next/image";

export default function Statistics() {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-[25%_75%] gap-4 mt-10 lg:bg-white px-4 py-8 rounded-2xl shadow-md">
      <div className="flex justify-center lg:justify-start">
        <Image
          src="/images/profile.jpg"
          alt="Profile"
          width={215}
          height={215}
          className="w-40 h-40 lg:w-[215px] lg:h-[215px] rounded-full object-cover"
        />
      </div>

      {/* User Info + Statistics */}

      <div className="flex flex-col gap-4 justify-center">
        {/* Name & Description */}

        <div>
          <h1 className="text-primary text-2xl lg:text-3xl font-bold">
            Ahmed Mohamed
          </h1>
          <p className="text-gray-500 text-lg">Voluptatem aut</p>
        </div>

        {/* Progress Bar */}
        <div className="relative h-3 w-[80%] bg-gray-100 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-[#5573ea]  rounded-full"
            style={{ width: "60%" }}
          ></div>
        </div>

        <div className="flex justify-between flex-wrap gap-5 mt-6">
          {/* Quiz Passed */}
          <StatCard
            icon={<Flag className="text-blue-600" />}
            value="27"
            label="Quiz Passed"
          />

          {/* Fastest Time */}
          <StatCard
            icon={<AlarmCheck className="text-blue-600" />}
            value="13 min"
            label="Fastest Time"
          />

          {/* Correct Answers */}
          <StatCard
            icon={<CircleCheck className="text-blue-600" />}
            value="200"
            label="Correct Answers"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-3 flex-1 min-w-[120px]">
      <div className="flex justify-center items-center w-12 h-12 lg:w-16 lg:h-16 rounded-lg">
        {icon}
      </div>
      <div className="flex flex-col items-center lg:items-start text-center lg:text-start">
        <p className="text-xl font-bold text-gray-700">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}
