import { clsx } from "clsx";
import { useEffect, useRef, useState } from "react";

// 单个选项的类型定义
interface SegmentedOption {
  value: string;
  label: React.ReactNode;
}

// 组件 Props 类型定义
interface SegmentedControlProps {
  options: SegmentedOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "bordered";
}

export function SegmentedControl({
  options,
  value,
  onChange,
  className,
  size = "md",
  variant = "default",
}: SegmentedControlProps) {
  const [selectedValue, setSelectedValue] = useState(
    value || options[0]?.value || "",
  );
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedIndex = options.findIndex(
    (option) => option.value === selectedValue,
  );

  // 更新指示器位置和大小
  useEffect(() => {
    if (containerRef.current && selectedIndex >= 0) {
      const container = containerRef.current;
      const selectedButton = container.children[selectedIndex] as HTMLElement;

      if (selectedButton) {
        const containerRect = container.getBoundingClientRect();
        const buttonRect = selectedButton.getBoundingClientRect();

        setIndicatorStyle({
          width: `${buttonRect.width}px`,
          height: `${buttonRect.height}px`,
          transform: `translateX(${buttonRect.left - containerRect.left}px)`,
        });
      }
    }
  }, [selectedIndex]);

  const handleClick = (optionValue: string) => {
    setSelectedValue(optionValue);
    onChange?.(optionValue);
  };

  // 尺寸样式映射
  const sizeClasses = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-5 py-2.5",
  };

  // 容器样式映射
  const containerVariants = {
    default: "bg-base-200 border border-grid-border",
    bordered: "border border-base-300",
  };

  // 指示器样式映射
  const indicatorVariants = {
    default: "bg-base-100 shadow-sm border border-grid-border",
    bordered: "bg-primary/10 border border-primary/30",
  };

  // 获取按钮文字颜色样式
  const getButtonTextClass = (isSelected: boolean) => {
    if (isSelected) {
      return variant === "default" ? "text-base-content" : "text-primary";
    }
    return "text-base-content/60 hover:text-base-content/80";
  };

  return (
    <div
      className={clsx(
        "relative inline-flex rounded-lg p-1",
        containerVariants[variant],
        className,
      )}
    >
      {/* 动画指示器 */}
      <div
        className={clsx(
          "absolute top-1 left-1 rounded-md",
          "transition-all duration-200 ease-in-out",
          indicatorVariants[variant],
        )}
        style={indicatorStyle}
      />

      {/* 选项容器 */}
      <div ref={containerRef} className="relative flex">
        {options.map((option) => {
          const isSelected = selectedValue === option.value;

          return (
            <button
              key={option.value}
              onClick={() => handleClick(option.value)}
              className={clsx(
                "relative z-10 rounded-md font-medium",
                "transition-colors duration-200 ease-in-out",
                sizeClasses[size],
                getButtonTextClass(isSelected),
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
