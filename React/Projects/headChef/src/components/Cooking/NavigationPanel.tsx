interface NavigationPanelProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
}

const NavigationPanel = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
}: NavigationPanelProps) => {
  return (
    <div className="mt-auto flex flex-col gap-4">

      <button
        onClick={onPrevious}
        disabled={currentStep === 1}
        className="
          py-4
          rounded-2xl
          border
          disabled:opacity-40
          disabled:cursor-not-allowed
        "
      >
        ← Previous Step
      </button>

      <button
        onClick={onNext}
        disabled={currentStep === totalSteps}
        className="
          py-4
          rounded-2xl
          bg-orange-500
          text-white
          hover:bg-orange-600
          transition
          disabled:opacity-40
          disabled:cursor-not-allowed
        "
      >
        {currentStep === totalSteps
          ? "Finish Cooking"
          : "Next Step →"}
      </button>

    </div>
  );
};

export default NavigationPanel;