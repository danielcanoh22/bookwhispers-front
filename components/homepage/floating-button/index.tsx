import { Box } from "@/components/ui/box";
import { Image } from "@/components/ui/image";
import { Link } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

const icon = require("/assets/images/robot.png");

export const FloatingActionButton = () => {
  return (
    <Link href="/" asChild>
      <Pressable className="absolute bottom-8 right-6 z-10">
        <Box className="w-20 h-20 bg-[#36A875] rounded-full justify-center items-center shadow-lg active:opacity-80">
          <Image size="sm" source={icon} alt="image" className="rounded-full" />
        </Box>
      </Pressable>
    </Link>
  );
};
