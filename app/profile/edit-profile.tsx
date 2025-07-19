import React, { useRef } from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { Button, ButtonText } from "@/components/ui/button";
import { EditProfileForm } from "@/components/profile/edit-form";
import { ThemedView } from "@/components/ThemedView";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";

export default function EditProfileModalScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const formRef = useRef<any>(null);

  const handleSaveChanges = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  return (
    <ThemedView
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1 }}
    >
      <ScrollView>
        <Box className="p-4 border-b border-stone-200">
          <Heading size="2xl" className="text-center text-[#9A7B62] font-bold">
            Editar Perfil
          </Heading>
        </Box>

        <Box className="p-6">
          <EditProfileForm ref={formRef} />

          <Box className="gap-4 mt-10">
            <Button action="positive" onPress={handleSaveChanges}>
              <ButtonText>Guardar Cambios</ButtonText>
            </Button>
            <Button
              variant="outline"
              action="secondary"
              onPress={() => router.back()}
            >
              <ButtonText>Cancelar</ButtonText>
            </Button>
          </Box>
        </Box>
      </ScrollView>
    </ThemedView>
  );
}
