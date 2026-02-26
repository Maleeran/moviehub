import { useState, useEffect } from "react";
import { BiSolidMovie } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router";
import { IconButton, TextField } from "@radix-ui/themes";
import {
  ArrowRightIcon,
  Cross2Icon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";

const Header = ({ onSearch, onClear, query = "" }) => {
  const [inputValue, setInputValue] = useState(query || "");
  const location = useLocation();
  const navigate = useNavigate();

  // 同步外部 query 变化
  useEffect(() => {
    if (location.pathname === "/search") {
      const params = new URLSearchParams(location.search);
      const q = params.get("q") || "";
    } else if (location.pathname === "/" && inputValue) {
      setInputValue("");
    }
  }, [location, query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      if (location.pathname !== "/search") {
        navigate("/search");
      }
      if (onSearch) {
        onSearch(inputValue);
      }
    }
    setInputValue("");
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleClear = () => {
    setInputValue("");
    if (onClear) {
      // navigate("/");
      onClear();
    }
    if (location.pathname === "/search") {
      navigate("/search");
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 opacity-75 dark:opacity-100 dark:bg-gray-900 ">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo 区域 */}
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <span className="text-3xl group-hover:scale-110 transition-transform  text-indigo-700">
              <BiSolidMovie />
            </span>
            <span className="text-xl font-bold text-indigo-950 bg-clip-text dark:text-white">
              MovieHub
            </span>
          </div>
          {/* 搜索表单区域 */}
          <form onSubmit={handleSubmit}>
            <TextField.Root
              value={inputValue}
              radius="full"
              size="3"
              onChange={handleInputChange}
              placeholder="Search Movies, Actors..."
            >
              <TextField.Slot>
                <MagnifyingGlassIcon height="16" width="16" color="indigo" />
              </TextField.Slot>
              {inputValue && (
                <TextField.Slot pr="1">
                  <IconButton
                    size="1"
                    variant="outline"
                    color="gray"
                    radius="small"
                    onClick={handleClear}
                  >
                    <Cross2Icon height="12" width="12" />
                  </IconButton>
                </TextField.Slot>
              )}
              <TextField.Slot pr="3">
                <IconButton
                  size="3"
                  color="indigo"
                  radius="full"
                  variant="ghost"
                >
                  <ArrowRightIcon weight="medium" height="18" width="18" />
                </IconButton>
              </TextField.Slot>
            </TextField.Root>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header
