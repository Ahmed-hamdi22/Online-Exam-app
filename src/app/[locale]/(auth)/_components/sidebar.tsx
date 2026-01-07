import {
  BookOpenCheck,
  Brain,
  FolderCode,
  RectangleEllipsis,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export default function Sidebar() {
  const features = [
    {
      icon: <Brain />,
      title: 'Tailored Diplomas',
      description:
        'Choose from specialized tracks like Frontend, Backend, and Mobile Development.',
    },
    {
      icon: <BookOpenCheck />,
      title: 'Focused Exams Diplomas',
      description:
        'Access topic-specific tests including HTML, CSS, JavaScript, and more.',
    },
    {
      icon: <RectangleEllipsis />,
      title: 'Smart Multi-Step Forms Exams',
      description:
        'Choose from specialized tracks like Frontend, Backend, and Mobile Development.',
    },
  ];

  return (
    <aside
      className={cn(
        'relative flex h-full flex-col justify-center overflow-hidden',
        'px-10 py-20 xl:px-32 xl:py-28',
        'before:absolute before:rounded-full before:-right-[10%] before:top-[10%] before:size-96 before:bg-blue-400 before:-z-[2]',
        'after:absolute after:rounded-full after:-left-[3%] after:-bottom-[10%] after:size-96 after:bg-blue-400 after:-z-[2]'
      )}
    >
      {/* Overlay */}

      <div className=" absolute inset-0 bg-gray-100/75 -z-[1] backdrop-blur-3xl"></div>
      {/* Header */}
      <div className="max-w-[28.25rem]">
        {/* Header */}
        <header className="text-xl font-semibold flex items-center text-blue-600 gap-2 mb-28">
          <FolderCode className=" text-blue-600 size={24}" />
          Exam App
        </header>

        {/* Content */}
        <div className=" font-bold space-y-12 mb-20">
          <p>Empower your learning journey with our smart exam platform..</p>
        </div>

        <ul className=" flex flex-col gap-9 ">
          {features.map((feature, index) => (
            <li key={index} className="flex gap-4">
              {/* Icon */}
              <span className="size-9 text-blue-600 font-semibold w-10 h-10 border border-blue-600 text-center  flex items-center justify-center gap-3 ">
                {feature.icon}
              </span>

              {/* Title and Description */}
              <div>
                <p className="font-bold mb-1 text-blue-600">{feature.title}</p>
                <p className="font-normal w-96 leading-tight">
                  {feature.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
