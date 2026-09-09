import { cn } from "@/lib/utils";

type ActionButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline";
};

export function ActionButton({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ActionButtonProps) {
  const variants = {
    primary: "btn-primary",
    ghost: "border border-white/10 bg-white/5 hover:bg-white/10",
    outline: "border border-white/15 bg-transparent hover:border-[color:var(--gilt)]/40",
  };

  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" ? "h-11" : "h-10",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
