import { lightenColor } from "@/utils/helpers";
import { Image, StyleSheet, Text, View } from "react-native";

type BookProps = {
  coverUrl: string;
  title: string;
  bookColor: string;
};

export const Book = ({ coverUrl, title, bookColor }: BookProps) => {
  const lighterColor = lightenColor(bookColor, 10);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={[styles.spine, { backgroundColor: lighterColor }]} />

        <View style={[styles.cover, { borderColor: bookColor }]}>
          <Image source={{ uri: coverUrl }} style={styles.coverImage} />
        </View>

        <View style={[styles.bottom, { backgroundColor: bookColor }]}>
          <View style={styles.sheet}></View>
        </View>

        <View style={styles.ribbon} />
      </View>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    maxWidth: 100,
  },
  container: {
    width: 100,
    height: 150,
    position: "relative",
  },
  spine: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 15,
    height: "100%",
    backgroundColor: "#1D6D7E",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 20,
  },
  cover: {
    flex: 1,
    marginLeft: 15,
    backgroundColor: "#B3ECFF",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 5,
    borderColor: "#1D6D7E",
  },
  title: {
    textAlign: "center",
    color: "#36A875",
    fontWeight: "600",
    marginTop: 15,
    fontSize: 12,
  },
  bottom: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 15,
    backgroundColor: "#1D6D7E",
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
  },
  sheet: {
    height: 5,
    backgroundColor: "#FFFFFF",
    width: "85%",
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  ribbon: {
    position: "absolute",
    bottom: -10,
    right: 10,
    width: 10,
    height: 20,
    backgroundColor: "#FFD557",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
});
