interface TimerPanelProps {
  requiresTimer: boolean;
  time: string;
  specialNote: string;
}

const TimerPanel = ({
  requiresTimer,
  time,
  specialNote,
}: TimerPanelProps) => {
  return (
    <>
      <div className="bg-white rounded-3xl p-6 shadow">

        <p className="text-center text-text-100">
          Timer
        </p>

        <h2 className="text-center text-6xl font-bold mt-3">
          {requiresTimer ? time : "--:--"}
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
    </>
  );
};

export default TimerPanel;