import { Text } from "@radix-ui/themes";

export interface StatusMessage {
  text: string;
  type: "success" | "error" | "info";
}

interface StatusMessageProps {
  status: StatusMessage | null;
}

const StatusMessage = ({ status }: StatusMessageProps) => {
  if (!status) {
    return null;
  }

  return (
    <Text
      size="2"
      color={status.type === "success" ? "green" : "red"}
      align="center"
    >
      {status.text}
    </Text>
  );
};

export default StatusMessage;
