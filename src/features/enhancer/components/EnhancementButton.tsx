import { Button } from "@radix-ui/themes";

interface EnhancementButtonProps {
  onEnhance: () => void;
  disabled: boolean;
  isEnhancing: boolean;
}

const EnhancementButton: React.FC<EnhancementButtonProps> = ({
  onEnhance,
  disabled,
  isEnhancing,
}) => (
  <Button
    size="3"
    onClick={onEnhance}
    disabled={disabled}
    style={{ marginTop: "auto" }}
  >
    {isEnhancing ? "Enhancing..." : "Enhance Content"}
  </Button>
);

export default EnhancementButton;
