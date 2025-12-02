import React, { useMemo, useState } from 'react';

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Contribution level colors (GitHub style with purple theme)
const CONTRIBUTION_COLORS = [
  "bg-gray-800", // Level 0 - No contributions
  "bg-purple-900/40", // Level 1
  "bg-purple-700/60", // Level 2
  "bg-purple-600/80", // Level 3
  "bg-purple-500", // Level 4 - Max
];

const CONTRIBUTION_LEVELS = [0, 1, 2, 3, 4];

export function ContributionGraph({
  data = [],
  year = new Date().getFullYear(),
  className = "",
  showLegend = true,
  showTooltips = true,
}) {
  const [hoveredDay, setHoveredDay] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Generate all days for the year
  const yearData = useMemo(() => {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    const days = [];

    const firstSunday = new Date(startDate);
    firstSunday.setDate(startDate.getDate() - startDate.getDay());

    for (let week = 0; week < 53; week++) {
      for (let day = 0; day < 7; day++) {
        const currentDate = new Date(firstSunday);
        currentDate.setDate(firstSunday.getDate() + week * 7 + day);

        const isInRange = currentDate >= startDate && currentDate <= endDate;
        const isPreviousYearDecember =
          currentDate.getFullYear() === year - 1 &&
          currentDate.getMonth() === 11;
        const isNextYearJanuary =
          currentDate.getFullYear() === year + 1 && currentDate.getMonth() === 0;

        if (isInRange || isPreviousYearDecember || isNextYearJanuary) {
          const dateString = currentDate.toISOString().split("T")[0];
          const existingData = data.find((d) => d.date === dateString);

          days.push({
            date: dateString,
            count: existingData?.count || 0,
            level: existingData?.level || 0,
          });
        } else {
          days.push({
            date: "",
            count: 0,
            level: 0,
          });
        }
      }
    }

    return days;
  }, [data, year]);

  // Calculate month headers
  const monthHeaders = useMemo(() => {
    const headers = [];
    const startDate = new Date(year, 0, 1);
    const firstSunday = new Date(startDate);
    firstSunday.setDate(startDate.getDate() - startDate.getDay());

    let currentMonth = -1;
    let currentYear = -1;
    let monthStartWeek = 0;
    let weekCount = 0;

    for (let week = 0; week < 53; week++) {
      const weekDate = new Date(firstSunday);
      weekDate.setDate(firstSunday.getDate() + week * 7);

      const monthKey = weekDate.getMonth();
      const yearKey = weekDate.getFullYear();

      if (monthKey !== currentMonth || yearKey !== currentYear) {
        if (currentMonth !== -1) {
          const shouldShowMonth =
            currentYear === year ||
            (currentYear === year - 1 &&
              currentMonth === 11 &&
              startDate.getDay() !== 0 &&
              weekCount >= 2);

          if (shouldShowMonth) {
            headers.push({
              month: MONTHS[currentMonth],
              colspan: weekCount,
              startWeek: monthStartWeek,
            });
          }
        }
        currentMonth = monthKey;
        currentYear = yearKey;
        monthStartWeek = week;
        weekCount = 1;
      } else {
        weekCount++;
      }
    }

    if (currentMonth !== -1) {
      const shouldShowMonth =
        currentYear === year ||
        (currentYear === year - 1 &&
          currentMonth === 11 &&
          startDate.getDay() !== 0 &&
          weekCount >= 2);

      if (shouldShowMonth) {
        headers.push({
          month: MONTHS[currentMonth],
          colspan: weekCount,
          startWeek: monthStartWeek,
        });
      }
    }

    return headers;
  }, [year]);

  const handleDayHover = (day, event) => {
    if (showTooltips && day.date) {
      setHoveredDay(day);
      setTooltipPosition({ x: event.clientX, y: event.clientY });
    }
  };

  const handleDayLeave = () => {
    setHoveredDay(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getContributionText = (count) => {
    if (count === 0) return "No contributions";
    if (count === 1) return "1 contribution";
    return `${count} contributions`;
  };

  return (
    <div className={`contribution-graph ${className}`}>
      <div className="overflow-x-auto">
        <table className="border-separate border-spacing-1 text-xs">
          <caption className="sr-only">Contribution Graph for {year}</caption>

          {/* Month Headers */}
          <thead>
            <tr className="h-3">
              <td className="w-7 min-w-7"></td>
              {monthHeaders.map((header, index) => (
                <td
                  key={index}
                  className="text-gray-400 relative text-left"
                  colSpan={header.colspan}
                >
                  <span className="absolute top-0 left-1">{header.month}</span>
                </td>
              ))}
            </tr>
          </thead>

          {/* Day Grid */}
          <tbody>
            {Array.from({ length: 7 }, (_, dayIndex) => (
              <tr key={dayIndex} className="h-2.5">
                {/* Day Labels */}
                <td className="text-gray-400 relative w-7 min-w-7">
                  {dayIndex % 2 === 0 && (
                    <span className="absolute -bottom-0.5 left-0 text-xs">
                      {DAYS[dayIndex]}
                    </span>
                  )}
                </td>

                {/* Day Cells */}
                {Array.from({ length: 53 }, (_, weekIndex) => {
                  const dayData = yearData[weekIndex * 7 + dayIndex];
                  if (!dayData || !dayData.date) {
                    return (
                      <td key={weekIndex} className="h-2.5 w-2.5 p-0">
                        <div className="h-2.5 w-2.5"></div>
                      </td>
                    );
                  }

                  return (
                    <td
                      key={weekIndex}
                      className="h-2.5 w-2.5 cursor-pointer p-0"
                      onMouseEnter={(e) => handleDayHover(dayData, e)}
                      onMouseLeave={handleDayLeave}
                      title={
                        showTooltips
                          ? `${formatDate(dayData.date)}: ${getContributionText(dayData.count)}`
                          : undefined
                      }
                    >
                      <div
                        className={`h-2.5 w-2.5 rounded-sm ${
                          CONTRIBUTION_COLORS[dayData.level]
                        } hover:ring-purple-500 hover:ring-2 transition-all duration-200`}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tooltip */}
      {showTooltips && hoveredDay && (
        <div
          className="bg-gray-900 text-white pointer-events-none fixed z-50 rounded-lg border border-purple-600 px-3 py-2 text-sm shadow-lg"
          style={{
            left: tooltipPosition.x + 10,
            top: tooltipPosition.y - 40,
          }}
        >
          <div className="font-semibold">
            {getContributionText(hoveredDay.count)}
          </div>
          <div className="text-gray-400">
            {formatDate(hoveredDay.date)}
          </div>
        </div>
      )}

      {/* Legend */}
      {showLegend && (
        <div className="text-gray-400 mt-4 flex items-center justify-end gap-2 text-xs">
          <span>Less</span>
          <div className="flex items-center gap-1">
            {CONTRIBUTION_LEVELS.map((level) => (
              <div
                key={level}
                className={`h-3 w-3 rounded-sm ${CONTRIBUTION_COLORS[level]}`}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      )}
    </div>
  );
}

export default ContributionGraph;
