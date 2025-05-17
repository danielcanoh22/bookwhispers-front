import { ScreenContainer } from "@/components/common/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { View } from "react-native";

export const HomeHeader = () => {
  return (
    <View className="bg-[#EFE5DB]">
      <ScreenContainer>
        <Heading size="3xl" className="">
          <VStack>
            <Text className="text-2xl text-[#36A875] font-bold">Book</Text>
            <Text className="text-2xl text-[#36A875] font-bold">Whispers</Text>
          </VStack>
        </Heading>
      </ScreenContainer>
    </View>
  );
};
