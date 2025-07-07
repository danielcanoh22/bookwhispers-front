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

export default function TabThreeScreen() {
  const insets = useSafeAreaInsets();

  const [section, setSection] = useState("info");

  return (
    <ThemedView
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      className="h-screen"
    >
      <ScrollView>
        <ProfilePhoto
          name="Nombre de Usuario"
          image="https://th.bing.com/th/id/R.05da1104a2b0835ef4a083ac4e84a218?rik=XqBWOlRS0IHpZg&riu=http%3a%2f%2f3.bp.blogspot.com%2f-HZdgdU8mItk%2fU96tukcNm1I%2fAAAAAAAAAJs%2fzPgNhQbz70w%2fs1600%2fbuenos%2bd%2525C3%2525ADas.jpg&ehk=KmPV6%2ferpP05XQitY%2bPz9ewW19gMTK%2bUUUe39IXNec4%3d&risl=&pid=ImgRaw&r=0"
        />

        <Box className="bg-[#e1e7d5] h-full p-6">
          <ProfileStats followers={150} following={320} reviews={12} />
          <Divider className="my-6 bg-[#8F9C7B]" />

          <ProfileNavigation section={section} onSection={setSection} />

          {section === "info" ? <ProfileInformation /> : <ProfileBooks />}
        </Box>
      </ScrollView>
    </ThemedView>
  );
}
