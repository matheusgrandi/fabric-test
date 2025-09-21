import { Text } from "@radix-ui/themes";

interface StatusMessageProps {
  message: string;
}

const StatusMessage: React.FC<StatusMessageProps> = ({ message }) => {
  if (!message) return null;

  const getColor = (msg: string) => {
    if (msg.includes("Error")) return "red";
    if (msg.includes("✅")) return "green";
    return "gray";
  };

  return (
    <Text size="2" color={getColor(message)} align="center">
      {message}
    </Text>
  );
};

export default StatusMessage;
