import type { FC } from "react";
import type { StepType } from "../../Types/types";

interface CurrentStepProps {
  step: StepType;
}

const CurrentStep: FC<CurrentStepProps> = ({
  step,
}) => {
  return (
    <div className="bg-white rounded-3xl shadow p-12 h-full flex flex-col justify-center">

      <p className="uppercase tracking-widest text-orange-500 font-semibold">
        Current Step
      </p>

      <h2 className="text-6xl font-bold mt-3">
        {step.step_number}
      </h2>

      <p className="text-3xl leading-relaxed mt-10">
        {step.instruction}
      </p>

    </div>
  );
};

export default CurrentStep;