import Link from 'next/link';
import { DelftTextDoc } from '@/lib/queries';

export interface LessonCardProps {
  text: DelftTextDoc;
}

export default function LessonCard({ text }: LessonCardProps) {
  return (
    <Link href={`/read/${text._id.toString()}`}>
      <div className={`bg-white p-8 rounded-2xl shadow-sm border transition-all group h-full flex flex-col justify-between relative overflow-hidden hover:shadow-lg hover:-translate-y-1 ${
        text.isCompleted ? 'border-green-200' : 'border-gray-100'
      }`}>
        {/* Lesson number badge */}
        <div className="absolute top-0 right-0 bg-orange-50 text-[#FF9B00] px-3 py-1 text-xs font-black rounded-bl-xl border-b border-l border-orange-100">
          Lesson {text.lessonNumber}
        </div>

        {/* Completed checkmark */}
        {text.isCompleted && (
          <div className="absolute top-0 left-0 bg-green-500 text-white p-1.5 rounded-br-xl">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}

        <h3 className={`text-2xl font-bold transition-colors mb-4 mt-2 leading-tight ${
          text.isCompleted ? 'text-green-700 group-hover:text-green-600' : 'text-gray-800 group-hover:text-[#FF9B00]'
        }`}>
          {text.title}
        </h3>

        <div className={`flex items-center font-bold text-sm uppercase tracking-wide mt-4 ${
          text.isCompleted ? 'text-green-500' : 'text-[#FF9B00]'
        }`}>
          {text.isCompleted ? 'Review Again' : 'Read Lesson'}
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
