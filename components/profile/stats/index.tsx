import { Box } from "@/components/ui/box";
import React from "react";
import { ProfileStat } from "../stat";

type ProfileStatsProps = {
  followers: number;
  following: number;
  reviews: number;
};

export const ProfileStats = ({
  followers,
  following,
  reviews,
}: ProfileStatsProps) => {
  return (
    <Box className="flex flex-row justify-between gap-2">
      <ProfileStat text="Seguidores" value={followers} />
      <ProfileStat text="Siguiendo" value={following} />
      <ProfileStat text="Reseñas" value={reviews} />
    </Box>
  );
};
