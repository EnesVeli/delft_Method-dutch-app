export interface ProgressBarProps {
  completed: number;
  total: number;
  level: string;
}

export default function ProgressBar({ completed, total, level }: ProgressBarProps) {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold text-gray-800">{level} Level</h2>
        <span className="text-sm font-bold text-gray-500">
          {completed}/{total} &nbsp;|&nbsp;
          <span className={`${pct === 100 ? 'text-green-500' : 'text-[#FF9B00]'}`}>{pct}%</span>
        </span>
      </div>
      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${pct === 100 ? 'bg-green-400' : 'bg-[#FF9B00]'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
