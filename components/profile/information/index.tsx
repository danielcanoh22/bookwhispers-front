import { Box } from "@/components/ui/box";
import { ProfileInformationSection } from "../information-section";

export const ProfileInformation = () => {
  return (
    <Box className="flex flex-col gap-8 mt-6">
      <ProfileInformationSection
        type="info"
        heading="Biografía"
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
                  voluptates rerum voluptatem deleniti similique maiores."
      />
      <ProfileInformationSection
        type="info"
        heading="Géneros Favoritos"
        text="Fantasía, Ciencia Ficción, Terror"
      />
      <ProfileInformationSection type="achievements" heading="Logros" />
    </Box>
  );
};
