import { ReactNode } from "react";
import { View } from "react-native";

type ScreenContainerProps = {
  children: ReactNode;
};

export const ScreenContainer = ({ children }: ScreenContainerProps) => {
  return <View className="py-4 px-6">{children}</View>;
};
