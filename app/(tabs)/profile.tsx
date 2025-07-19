import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { ScrollView } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { Box } from "@/components/ui/box";
import { ProfilePhoto } from "@/components/profile/photo";
import { ProfileStats } from "@/components/profile/stats";
import { Divider } from "@/components/ui/divider";
import { ProfileInformation } from "@/components/profile/information";
import { ProfileNavigation } from "@/components/profile/navigation";
import { ProfileBooks } from "@/components/profile/books";
import { Button, ButtonText } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { Heading } from "@/components/ui/heading";

export default function TabThreeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // const [section, setSection] = useState("info");

  return (
    <ThemedView
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1 }}
    >
      <ScrollView>
        <ProfilePhoto />

        <Box className="h-full p-6">
          <ProfileStats followers={150} following={320} reviews={12} />
          <Divider className="my-6 bg-[#bac7a7]" />
          <Button
            variant="outline"
            action="secondary"
            onPress={() => router.push("/profile/edit-profile")}
            className="my-4"
          >
            <ButtonText>Editar Perfil</ButtonText>
          </Button>
          {/* <ProfileNavigation section={section} onSection={setSection} /> */}

          {/* {section === "info" ? <ProfileInformation /> : <ProfileBooks />} */}
          <Heading size="lg" className="text-center">
            Información Personal
          </Heading>
          <ProfileInformation />
        </Box>
      </ScrollView>
    </ThemedView>
  );
}
