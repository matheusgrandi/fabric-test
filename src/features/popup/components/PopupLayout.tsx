import { Flex } from "@radix-ui/themes";
import type { PropsWithChildren } from "react";

const PopupLayout: React.FC<PropsWithChildren> = ({ children }) => (
  <Flex
    direction="column"
    gap="4"
    p="4"
    style={{
      width: "350px",
      minHeight: "400px",
    }}
  >
    {children}
  </Flex>
);

export default PopupLayout;
