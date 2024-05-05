import { Icons } from "@/lib/icons";
import { mergeStyles } from "@/utils/style-helpers";
import { useFormStatus } from "react-dom";

export default function SubmitButton({
  title,
  className = "",
  isDisabled = false,
}: {
  title: string;
  className?: string;
  isDisabled?: boolean;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={mergeStyles(
        "text-white bg-primary mt-5 py-2 px-4 rounded-xl w-full flex items-center justify-center gap-2 capitalize transition-colors ease-linear hover:opacity-90 hover:scale-105 disabled:bg-grey-300 disabled:pointer-events-none disabled:text-charcoal/60",
        className
      )}
      disabled={pending || isDisabled}
    >
      {title} {pending && <Icons.loader className="animate-spin" />}
    </button>
  );
}
