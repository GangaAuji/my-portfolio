import { useResumeHref } from "../context/useContent";
import { Button } from "./Button";
import { Icon } from "./Icon";

export function ResumeButton({ variant = "ghost" }) {
  const { href, fileName } = useResumeHref();

  return (
    <Button href={href} variant={variant} download={fileName} icon={<Icon name="download" size={16} />}>
      Download Resume
    </Button>
  );
}
