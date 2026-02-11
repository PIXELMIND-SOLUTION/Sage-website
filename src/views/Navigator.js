// components/Navigator.jsx
import React from "react";

const Navigator = ({ sections }) => {
  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
      {Object.entries(sections).map(([name, ref]) => (
        <div key={name} className="group relative flex items-center">
          {/* Tooltip */}
          <span
            className="
              absolute right-8 px-3 py-1 rounded-md text-sm font-medium
              text-white shadow-lg
              opacity-0 translate-x-2
              group-hover:opacity-100 group-hover:translate-x-0
              transition-all duration-300 pointer-events-none whitespace-nowrap
            "
            style={{ backgroundColor: "#1e5a8e" }}
          >
            {name}
          </span>

          {/* Dot */}
          <button
            onClick={() =>
              ref.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }
            className="
              w-4 h-4 rounded-full
              group-hover:scale-150
              transition-all duration-300
              shadow-sm
            "
            style={{ backgroundColor: "#4dd6d5" }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#1e5a8e")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#4dd6d5")
            }
            aria-label={`Scroll to ${name}`}
          />
        </div>
      ))}
    </nav>
  );
};

export default Navigator;
