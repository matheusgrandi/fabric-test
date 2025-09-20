import { Button, Text } from "@radix-ui/themes";
import { Flex } from "@radix-ui/themes/components/flex";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Flex
      direction={"column"}
      gap="4"
      align="center"
      justify="center"
      height="100%"
    >
      <Text>Count: {count}</Text>
      <Button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </Button>
    </Flex>
  );
}

export default App;
