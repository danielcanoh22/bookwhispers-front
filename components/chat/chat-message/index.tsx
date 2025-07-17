import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Message } from "@/types/global";
import React from "react";

type ChatMessageProps = {
  message: Message;
};

export function ChatMessage({ message }: ChatMessageProps) {
  const isAIMessage = message.sender === "ai";

  const bubbleBg = isAIMessage ? "bg-gray-200" : "bg-[#36A875]";
  const alignment = isAIMessage ? "start" : "end";
  const textColor = isAIMessage ? "text-black" : "text-white";

  return (
    <Box className={`w-full flex-col items-${alignment} px-4`}>
      <Box className={`max-w-[85%] rounded-2xl p-3 shadow-sm ${bubbleBg}`}>
        <Text className={`text-base ${textColor}`}>{message.text}</Text>
      </Box>
    </Box>
  );
}
