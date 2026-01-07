interface NitrCheckboxProps {
  isNitrStudent: boolean;
  setIsNitrStudent: (value: boolean) => void;
  lockNitrStatus: boolean;
  stepTitle?: string;
  hideCommitteeChoice: boolean;
  portfolioMatrixUrl?: string;
}

export function NitrCheckbox({
  isNitrStudent,
  setIsNitrStudent,
  lockNitrStatus,
  stepTitle,
  hideCommitteeChoice,
  portfolioMatrixUrl,
}: NitrCheckboxProps) {
  return (
    <div className="space-y-3">
      {portfolioMatrixUrl && (
        <div className="text-center">
          <a
            href={portfolioMatrixUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline underline-offset-4 text-lg font-medium transition-colors"
          >
            View Portfolio Matrix
          </a>
        </div>
      )}

      <div className="border-2 border-white/40 rounded-[13px] p-3  backdrop-blur-[10px]">
        <label
          className={`flex items-center group ${lockNitrStatus ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          <div
            className={`
              relative flex items-center justify-center
              w-6 h-6 rounded-lg transition-all duration-200
              ${
                isNitrStudent
                  ? "border-2 border-white shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                  : "border border-gray-500/60 " +
                    (!lockNitrStatus ? "group-hover:border-gray-400" : "")
              }
              ${lockNitrStatus ? "opacity-50" : ""}
              bg-white/10
            `}
          >
            <input
              type="checkbox"
              checked={isNitrStudent}
              onChange={(e) => {
                if (!lockNitrStatus) {
                  setIsNitrStudent(e.target.checked);
                }
              }}
              disabled={lockNitrStatus}
              className="sr-only"
            />
            {isNitrStudent && <span className="w-2 h-2 rounded-full bg-white" />}
          </div>
          <span className={`ml-2 text-sm font-semibold text-white`}>
            {stepTitle ? `Is ${stepTitle} from NIT Rourkela?` : "I am from NIT Rourkela"}
          </span>
        </label>
        {lockNitrStatus && (
          <p className="mt-1.5 text-xs text-white/90">
            {isNitrStudent
              ? "The team leader is from NIT Rourkela, so all teammates must also be from NIT Rourkela."
              : "The team leader is not from NIT Rourkela, so no teammates can be from NIT Rourkela. You can be from any other college."}
          </p>
        )}
        {!lockNitrStatus && isNitrStudent && (
          <p className="mt-1.5 text-xs text-white/90">
            College information will be auto-filled and locked.
            {!hideCommitteeChoice && " You won't need to pay registration fees."}
          </p>
        )}
      </div>
    </div>
  );
}
