import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-2 rounded-lg border
                 bg-gray-200 dark:bg-gray-800
                 text-black dark:text-white
                 transition"
    >
      {theme === "light" ? "🌙 Dark" : "🌞 Light"}
    </button>
  );
};

export default ThemeToggle;
