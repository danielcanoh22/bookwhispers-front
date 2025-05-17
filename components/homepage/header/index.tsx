import { ScreenContainer } from "@/components/common/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Link } from "expo-router";
import { TouchableOpacity, View } from "react-native";

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

        <Link href="/(search)/search" asChild>
          <TouchableOpacity>
            <View className="bg-white p-3 rounded-lg mt-4">
              <Text className="text-gray-500">Buscar un libro...</Text>
            </View>
          </TouchableOpacity>
        </Link>
      </ScreenContainer>
    </View>
  );
};
