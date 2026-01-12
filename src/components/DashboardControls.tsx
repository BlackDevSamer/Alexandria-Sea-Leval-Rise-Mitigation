import { useRiskStore } from "../store/riskStore";
import { ScenarioCode, Year } from "../services/dataService";
import clsx from "clsx";

export const DashboardControls = () => {
  const {
    selectedScenario,
    selectedYear,
    scenariosList,
    setScenario,
    setYear,
    isLoading,
  } = useRiskStore();

  const years: Year[] = ["2030", "2050", "2070", "2100"];

  return (
    <div
      className="bg-white p-6 rounded-xl shadow-lg space-y-6 border border-gray-100 font-arabic"
      dir="rtl"
    >
      <div>
        <label className="block text-lg font-bold text-gray-800 mb-3">
          اختر السيناريو (SSP)
        </label>
        <div className="grid grid-cols-1 gap-3">
          {scenariosList.map((scenario) => (
            <button
              key={scenario.code}
              onClick={() => setScenario(scenario.code as ScenarioCode)}
              disabled={isLoading}
              className={clsx(
                "p-4 rounded-lg text-right transition-all duration-200 border relative overflow-hidden group",
                selectedScenario === scenario.code
                  ? "bg-blue-50 border-blue-500 shadow-md transform scale-[1.02]"
                  : "bg-gray-50 border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
              )}
            >
              <div className="flex justify-between items-center relative z-10">
                <div>
                  <span
                    className={clsx(
                      "font-bold block text-lg",
                      selectedScenario === scenario.code
                        ? "text-blue-700"
                        : "text-gray-700"
                    )}
                  >
                    {scenario.code}
                  </span>
                  <span className="text-sm text-gray-500 mt-1 block">
                    {scenario.description}
                  </span>
                </div>
                <div
                  className={clsx(
                    "px-3 py-1 rounded-full text-xs font-bold",
                    scenario.emissionLevel.includes("مرتفع")
                      ? "bg-red-100 text-red-700"
                      : scenario.emissionLevel === "متوسط"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  )}
                >
                  {scenario.emissionLevel}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-lg font-bold text-gray-800 mb-4">
          السنة:{" "}
          <span className="text-blue-600 text-2xl font-mono">
            {selectedYear}
          </span>
        </label>
        <div className="relative pt-6 px-2 pb-2">
          <input
            type="range"
            min="0"
            max="3"
            step="1"
            value={years.indexOf(selectedYear)}
            onChange={(e) => setYear(years[parseInt(e.target.value)] as Year)}
            disabled={isLoading}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700 transition-all"
          />
          <div className="flex justify-between mt-4 text-sm font-medium text-gray-600">
            {years.map((year) => (
              <span
                key={year}
                className={clsx(
                  "cursor-pointer transition-colors duration-200",
                  year === selectedYear
                    ? "text-blue-600 font-bold scale-110"
                    : "hover:text-gray-800"
                )}
                onClick={() => !isLoading && setYear(year)}
              >
                {year}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
