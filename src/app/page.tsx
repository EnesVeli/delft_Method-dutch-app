import Link from 'next/link';
import { getAllDelftTexts } from '@/lib/queries';
import LessonCard from '@/components/LessonCard';
import ProgressBar from '@/components/ProgressBar';

export const dynamic = 'force-dynamic';

export default async function LibraryPage() {
  const texts = await getAllDelftTexts();

  const groupedTexts = {
    A1: texts.filter(t => t.cefrLevel === 'A1'),
    A2: texts.filter(t => t.cefrLevel === 'A2'),
    B1: texts.filter(t => t.cefrLevel === 'B1'),
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-[#FF9B00] mb-2">Library</h1>
        <p className="text-gray-500 mb-10 text-lg">Select a lesson below to start reading, listening, and practicing your Dutch pronunciation.</p>

        {texts.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-3xl border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg mb-4">No lessons found in your library.</p>
            <Link href="/admin" className="px-6 py-3 bg-[#FF9B00] text-white font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-sm">
              Add your first text in Admin
            </Link>
          </div>
        ) : (
          <div className="space-y-14">
            {(['A1', 'A2', 'B1'] as const).map((level) => {
              const group = groupedTexts[level];
              if (group.length === 0) return null;
              const completedCount = group.filter(t => t.isCompleted).length;

              return (
                <div key={level}>
                  <ProgressBar completed={completedCount} total={group.length} level={level} />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {group.map((text) => (
                      <LessonCard key={text._id.toString()} text={text} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
