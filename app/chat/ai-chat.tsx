import React, { useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Send } from "lucide-react-native";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { ChatMessage } from "@/components/chat/chat-message";
import { Input, InputField } from "@/components/ui/input";
import { Message } from "@/types/global";
import { useMutation } from "@tanstack/react-query";
import { sendMessageToAI } from "@/services/chat";

const INITIAL_MESSAGE = {
  id: "ai-welcome-message",
  text: "¡Hola! Soy tu asistente de lectura. ¿Te gustaría una recomendación de algún libro?",
  sender: "ai" as const,
};

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputText, setInputText] = useState("");

  const chatMutation = useMutation({
    mutationFn: sendMessageToAI,
    onSuccess: (aiResponse) => {
      let responseText = "";

      if (aiResponse.type === "recommendation") {
        responseText =
          "¡Claro! Basado en lo que hablamos, te recomiendo estos libros:\n\n" +
          aiResponse.content
            .map(
              (rec: any, index: any) =>
                `${
                  index + 1
                }. ${rec.book.title.toUpperCase()} de ${rec.book.authors.join(
                  ", "
                )}\nRazón: ${rec.reason}`
            )
            .join("\n\n");
      } else {
        responseText = aiResponse.content;
      }

      const aiMessage: Message = {
        id: new Date().toISOString() + "-ai",
        text: responseText,
        sender: "ai",
      };
      setMessages((prev) => [aiMessage, ...prev]);
    },
    onError: (error: Error) => {
      Alert.alert("Error", error.message);
    },
  });

  const handleSend = () => {
    if (inputText.trim().length === 0 || chatMutation.isLoading) return;

    const userMessage: Message = {
      id: new Date().toISOString(),
      text: inputText,
      sender: "user",
    };

    const updatedMessages = [userMessage, ...messages];
    setMessages(updatedMessages);
    setInputText("");

    const historyForAPI = updatedMessages
      .map((msg) => {
        const role: "model" | "user" = msg.sender === "ai" ? "model" : "user";

        return { role, text: msg.text };
      })
      .reverse();

    chatMutation.mutate(historyForAPI);
  };

  return (
    <ThemedView style={{ flex: 1, paddingTop: insets.top }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 80}
      >
        <Box className="p-4 border-b border-stone-200">
          <Heading size="xl" className="text-center text-[#9A7B62]">
            Asistente de Lectura
          </Heading>
        </Box>

        <FlatList
          data={messages}
          renderItem={({ item }) => <ChatMessage message={item} />}
          keyExtractor={(item) => item.id}
          inverted
          contentContainerStyle={{
            flexGrow: 1,
            paddingVertical: 16,
          }}
          ItemSeparatorComponent={() => <Box className="h-4" />}
        />

        <Box className="flex-row items-center gap-2 p-4 border-t border-stone-200 bg-white">
          <Input className="flex-1">
            <InputField
              value={inputText}
              onChangeText={setInputText}
              placeholder={
                chatMutation.isLoading
                  ? "Biblio está pensando..."
                  : "Escribe tu mensaje..."
              }
              onSubmitEditing={handleSend}
              readOnly={chatMutation.isLoading}
            />
          </Input>
          <Pressable
            onPress={handleSend}
            className="p-3 bg-[#36A875] rounded-full"
            disabled={chatMutation.isLoading}
          >
            <Send size={24} color="white" />
          </Pressable>
        </Box>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}
