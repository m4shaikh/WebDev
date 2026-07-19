import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";

import api from "../../api/axios";

import CookingHeader from "./CookingHeader";
import ProgressPanel from "./ProgressPanel";
import IngredientsPanel from "./IngredientsPanel";
import CurrentStep from "./CurrentStep";
import TimerPanel from "./TimerPanel";
import NavigationPanel from "./NavigationPanel";

import type { Ingredient, SessionType } from '../../Types/types'

const Cooking = () => {
  const { sessionId } = useParams();

  const [session, setSession] = useState<SessionType | null>(null);

  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await api.get(
          `/session/${sessionId}/`
        );

        setSession(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSession();
  }, [sessionId]);

  useEffect(() => {
    if (!session) return;

    if (!session.current_step_data.requires_timer) {
      
      return;
    }

    const started = new Date(session.step_started_at).getTime();

    const tick = () => { 
      
      const elapsed = Math.floor( (Date.now() - started) / 1000 );

      const left = Math.max( session.current_step_data.duration - elapsed, 0 );

      setRemainingTime((prev) => prev === left ? prev : left);
    };

    tick();

    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, [
    session,
    session?.step_started_at,
    session?.current_step,
    session?.current_step_data.duration,
    session?.current_step_data.requires_timer,
  ]);

  const progress = useMemo(() => {
    if (!session) return 0;

    return (
      (session.current_step /
        session.total_steps) *
      100
    );
  }, [session]);

  const formattedTime = useMemo(() => {
    const mins = Math.floor(
      remainingTime / 60
    );

    const secs = remainingTime % 60;

    return `${String(mins).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  }, [remainingTime]);

  const nextStep = async () => {
    // TODO
  };

  const previousStep = async () => {
    // TODO
  };

  const exitCooking = async () => {
    // TODO
  };

  if (!session) {
    return (
      <div className="pt-24 text-center text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-bg-100 font-sour px-6 pb-6">

      <CookingHeader
        recipeTitle={session.recipe_title}
        status={session.status}
        onExit={exitCooking}
      />

      <div className="grid grid-cols-12 gap-6">

        <div className="col-span-3 flex flex-col gap-6">

          <ProgressPanel
            currentStep={session.current_step}
            totalSteps={session.total_steps}
            progress={progress}
          />

          <IngredientsPanel
            ingredients={
              session.ingredients as Ingredient[]
            }
          />

        </div>

        <div className="col-span-6">

          <CurrentStep
            step={session.current_step_data}
          />

        </div>

        <div className="col-span-3 flex flex-col gap-6">

          <TimerPanel
            requiresTimer={
              session.current_step_data
                .requires_timer
            }
            time={formattedTime}
            specialNote={
              session.current_step_data
                .special_note
            }
          />

          <NavigationPanel
            currentStep={session.current_step}
            totalSteps={session.total_steps}
            onPrevious={previousStep}
            onNext={nextStep}
          />

        </div>

      </div>

    </div>
  );
};

export default Cooking;