import type { FC } from "react";

interface ControlPanelProps {
  formattedTime: string;
  hasTimer: boolean;
  specialNote: string;
  currentStep: number;
  totalSteps: number;

  onNext: () => void;
  onPrevious: () => void;
  onExit: () => void;
}

const ControlPanel: FC<ControlPanelProps> = ({
  formattedTime,
  hasTimer,
  specialNote,
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  onExit,
}) => {
  return (
    <div className="col-span-3 flex flex-col gap-6">

      <div className="bg-white rounded-3xl p-6 shadow">

        <p className="text-center text-text-100">
          Timer
        </p>

        <h2 className="text-center text-6xl font-bold mt-3">
          {hasTimer ? formattedTime : "--:--"}
        </h2>

      </div>

      {specialNote && (
        <div className="bg-orange-50 rounded-3xl p-6">

          <h3 className="font-bold text-xl mb-3">
            💡 Chef Tip
          </h3>

          <p className="leading-7">
            {specialNote}
          </p>

        </div>
      )}

      <div className="mt-auto flex flex-col gap-4">

        <button
          onClick={onPrevious}
          disabled={currentStep === 1}
          className="py-4 rounded-2xl border disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ← Previous Step
        </button>

        <button
          onClick={onNext}
          disabled={currentStep === totalSteps}
          className="py-4 rounded-2xl bg-orange-500 text-white hover:bg-orange-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {currentStep === totalSteps
            ? "Finish Cooking"
            : "Next Step →"}
        </button>

        <button
          onClick={onExit}
          className="py-3 rounded-2xl border border-red-300 text-red-500 hover:bg-red-50 transition"
        >
          Exit Cooking
        </button>

      </div>

    </div>
  );
};

export default ControlPanel;