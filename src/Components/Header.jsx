import { useState, useEffect } from "react";
import { CiSearch, CiSquareRemove } from "react-icons/ci";
import { BiSolidMovie } from "react-icons/bi";

const Header = ({ onSearch, onClear, query }) => {
  const [inputValue, setInputValue] = useState(query || "");
  const [hasFocus, setHasFocus] = useState(false);

  // 同步外部 query 变化
  useEffect(() => {
    setInputValue(query || "");
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    // 实时搜索（可选）
    // if (value.trim() === "") {
    //   onClear();
    // }
  };

  const handleClear = () => {
    setInputValue("");
    onClear();
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 opacity-75 dark:opacity-100 dark:bg-gray-900 ">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo 区域 */}
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={handleClear}
          >
            <span className="text-3xl group-hover:scale-110 transition-transform  text-indigo-700">
              <BiSolidMovie />
            </span>
            <span className="text-xl font-bold text-indigo-950 bg-clip-text dark:text-white">
              MovieHub
            </span>
          </div>

          {/* 搜索表单区域 */}
          <form
            onSubmit={handleSubmit}
            className={`relative flex items-center transition-all duration-300 ${
              hasFocus ? "w-96 scale-105" : "w-80"
            }`}
          >
            {/* 搜索图标 (左侧) */}
            <div className="absolute left-4 text-gray-400 hover:text-gray-600 pointer-events-none">
              <CiSearch />
            </div>

            {/* 输入框 */}
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onFocus={() => setHasFocus(true)}
              onBlur={() => setHasFocus(false)}
              placeholder="Search Movies, Actors..."
              className="w-full pl-12 pr-16 py-3 bg-gray-100 border border-transparent rounded-full text-gray-700 placeholder-gray-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200"
            />

            {/* 清空按钮 (仅在有输入时显示) */}
            {inputValue && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-15 text-gray-400 hover:text-gray-600 transition-colors hover:scale-110"
                title="清空"
              >
                <CiSquareRemove />
              </button>
            )}

            {/* 提交按钮 (右侧) */}
            <button
              type="submit"
              className="absolute right-2 p-2.5 bg-indigo-700 text-white rounded-full hover:bg-indigo-700 active:scale-95 transition-all shadow-md hover:shadow-lg"
              title="搜索"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
