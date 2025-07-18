import { Box } from "@/components/ui/box";
import { Image } from "@/components/ui/image";
import { Link, RelativePathString } from "expo-router";
import React from "react";
import { ImageSourcePropType } from "react-native";

type FloatingActionButtonProps = {
  href: string;
  iconSource: ImageSourcePropType;
};

export const FloatingActionButton = ({
  href,
  iconSource,
}: FloatingActionButtonProps) => {
  return (
    <Box className="w-20 h-20 bg-[#36A875] rounded-full justify-center items-center shadow-lg active:opacity-80 absolute bottom-6 right-6 z-20">
      <Link href={href as RelativePathString}>
        <Image
          size="sm"
          source={iconSource}
          alt="image"
          className="rounded-full"
        />
      </Link>
    </Box>
  );
};
