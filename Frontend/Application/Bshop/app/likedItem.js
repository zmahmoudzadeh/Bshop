import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  FlatList,
  Pressable,
  ScrollView,
} from "react-native";
import StarRating from "react-native-star-rating";

const LikedItem = (props) => {
  console.log("this is props", props);
  var photo = "http://eunoia-bshop.ir:8000" + props.image;
  var newPrice = ((100 - props.discount) * props.price) / 100;
  // console.log("correctly here");

  return (
    <View style={styles.shop}>
      <TouchableOpacity onPress={props.onSelect} useForeground>
        <View style={styles.items}>
          <View style={styles.setare}>
            <StarRating
              starSize={25}
              disabled={true}
              fullStarColor={"#b31414"}
              rating={props.rate}
            ></StarRating>
          </View>
          {props.image && (
            <Image
              testID={"item-image-" + props.index}
              style={styles.image}
              source={{ uri: photo }}
            />
          )}
          {!props.image && (
            <Image
              style={styles.image}
              source={require("../assets/no-image.png")}
            />
          )}
          <View style={styles.nameitem}>
            <Text
              testID={"item-name-" + props.index}
              style={{ fontSize: 25, fontWeight: "bold" }}
            >
              {props.name}
            </Text>
          </View>
        </View>
        <View style={styles.nameshop}>
          <Text style={{ fontSize: 20 }}>{props.shop.title}</Text>
        </View>
        {/* <View style={styles.rows}> */}
        {props.discount != 0 && (
          <Text
            testID={"item-price0-" + props.index}
            style={{
              textDecorationLine: "line-through",
              textAlign: "right",
              fontSize: 15,
              color: "grey",
            }}
          >
            قیمت:
            {props.price}
          </Text>
        )}
        {props.discount == 0 && (
          <Text
            testID={"item-price1-" + props.index}
            style={{
              textAlign: "right",
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            قیمت:
            {props.price}
          </Text>
        )}

        {props.discount != 0 && (
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            قیمت با تخفیف: {newPrice}
          </Text>
        )}
        {/* </View> */}
        <View style={styles.setare}>
          <StarRating
            starSize={25}
            disabled={true}
            fullStarColor={"#b31414"}
            rating={props.rate}
          ></StarRating>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  shop: {
    height: 300,
    width: 358,
    marginTop: 70,
    borderRadius: 20,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    backgroundColor: "#f1f1f2",
    marginLeft: 17,
  },
  // container: {
  //   padding: 10,
  //   marginTop: "10%",
  //   backgroundColor: "white",
  //   width: "95%",
  //   height: "60%",
  //   elevation: 5,
  //   flex: 1,
  //   marginLeft: "2.5%",
  // },
  setare: {
    width: 30,
    marginLeft: "130%",
  },
  nameitem: {
    justifyContent: "space-evenly",
    flexDirection: "row-reverse",
    borderRadius: 20,
    marginLeft: -380,
    marginTop: -160,
  },
  nameshop: {
    marginLeft: 30,
    marginTop: -18,
  },
  items: {
    height: 210,
    width: 165,
    borderRadius: 10,
    marginTop: 15,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 1, height: 3 },
    elevation: 5,
    backgroundColor: "white",
    marginLeft: 12,
  },

  image: {
    // backgroundColor: "#f1f1f2",
    width: "80%",
    height: "80%",
    marginTop: "1%",
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
    // paddingBottom: "1",
    marginLeft: 12,
    backgroundColor: "transparent",
  },
});
export default LikedItem;
