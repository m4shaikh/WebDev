import type { FC } from "react";

interface ProgressPanelProps {
  currentStep: number;
  totalSteps: number;
  progress: number;
}

const ProgressPanel: FC<ProgressPanelProps> = ({
  currentStep,
  totalSteps,
  progress,
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow">

      <h2 className="text-xl font-bold mb-5">
        Progress
      </h2>

      <p className="mb-3">
        Step {currentStep} of {totalSteps}
      </p>

      <div className="w-full h-3 rounded-full bg-primary-100 overflow-hidden">

        <div
          className="h-full bg-orange-500 transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      <p className="mt-3 text-sm text-text-100">
        {Math.round(progress)}% Completed
      </p>

    </div>
  );
};

export default ProgressPanel;