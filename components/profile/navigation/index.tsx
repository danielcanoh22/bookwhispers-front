import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";

type ProfileNavigationProps = {
  section: string;
  onSection: (section: string) => void;
};

export const ProfileNavigation = ({
  section,
  onSection,
}: ProfileNavigationProps) => {
  return (
    <Box className="flex flex-row justify-evenly">
      <Button
        variant="link"
        action={section === "info" ? "primary" : "secondary"}
        onPress={() => onSection("info")}
      >
        <ButtonText className="text-xl">Información</ButtonText>
      </Button>
      <Button
        variant="link"
        action={section === "books" ? "primary" : "secondary"}
        onPress={() => onSection("books")}
      >
        <ButtonText className="text-xl">Libros Leídos</ButtonText>
      </Button>
    </Box>
  );
};
