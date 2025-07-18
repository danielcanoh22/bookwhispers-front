import { Box } from "@/components/ui/box";
import { ProfileInformationSection } from "../information-section";
import { useAuth } from "@/context/auth";

export const ProfileInformation = () => {
  const { currentUser } = useAuth();

  return (
    <Box className="flex flex-col gap-8 mt-6">
      <ProfileInformationSection
        type="info"
        heading="Biografía"
        text={currentUser?.user.bio || "No has agregado tu biografía."}
      />
      <ProfileInformationSection
        type="info"
        heading="Géneros Favoritos"
        text={
          currentUser?.user.favorite_genres?.join(", ") ||
          "No has agregado géneros favoritos."
        }
      />
      <ProfileInformationSection type="achievements" heading="Logros" />
    </Box>
  );
};
