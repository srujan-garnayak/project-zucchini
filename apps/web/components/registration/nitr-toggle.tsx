interface NitrToggleProps {
  isNitrStudent: boolean;
  onToggle: (checked: boolean) => void;
}

export default function NitrToggle({ isNitrStudent, onToggle }: NitrToggleProps) {
  return (
    <div className="border-2 border-white/40 rounded-[13px] p-3  backdrop-blur-[10px]">
      <label className="flex items-center cursor-pointer group">
        <div
          className={`
            relative flex items-center justify-center
            w-6 h-6 rounded-lg transition-all duration-200
            ${
              isNitrStudent
                ? "border-2 border-white shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                : "border border-gray-500/60 group-hover:border-gray-400"
            }
            bg-white/10
          `}
        >
          <input
            type="checkbox"
            checked={isNitrStudent}
            onChange={(e) => onToggle(e.target.checked)}
            className="sr-only"
          />
          {isNitrStudent && <span className="w-2 h-2 rounded-full bg-white" />}
        </div>
        <span className="ml-2 text-sm font-semibold text-white">I am from NIT Rourkela</span>
      </label>
      {isNitrStudent && (
        <p className="mt-1.5 text-xs text-white/90">
          Your college information will be auto-filled and you won&apos;t need to pay registration
          fees.
        </p>
      )}
    </div>
  );
}
