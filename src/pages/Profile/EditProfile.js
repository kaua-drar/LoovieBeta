import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
  Keyboard,
  Platform,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { connect } from "react-redux";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  getAuth,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateProfile,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../firebase-config";
import { Entypo } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import ExpoFastImage from "expo-fast-image";
import { FontAwesome } from "@expo/vector-icons";

SplashScreen.preventAutoHideAsync();

const EditProfile = ({ navigation, route, props }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

  const [fontsLoaded] = useFonts({
    "Lato-Regular": require("../../../assets/fonts/Lato-Regular.ttf"),
    "Lato-Bold": require("../../../assets/fonts/Lato-Bold.ttf"),
  });

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission = galleryStatus == "granted";
    };
  }, []);

  const handleSubmit = async () => {
    Keyboard.dismiss();

    let regexUser = /^(?=.*[a-z])[-.\\a-zA-Z0-9]{4,20}$/;

    console.log(username.length);
    console.log(regexUser.test(username));

    if (
      username.length == 0 &&
      image != null &&
      image != undefined &&
      image != ""
    ) {
      changeImage();
      setErrorMessage(
        <View style={styles.errorMessageArea}>
          <MaterialIcons name={"check"} size={24} color="#FFF" />
          <Text style={styles.errorMessage}>Imagem de perfil alterada! Reinicie o aplicativo para aplicá-la.</Text>
        </View>
      );
    } else if ((username.length < 4 || username.length > 20 ) && regexUser.test(username) == false) {
      setErrorMessage(
        <View style={styles.errorMessageArea}>
          <Foundation name="alert" size={24} color="#9D0208" />
          <Text style={styles.errorMessage}>
            O nome de usuário precisa ter entre 4 e 20 caracteres.
          </Text>
        </View>
      );
    } else if (
      username.length > 3 &&
      username.length < 21 &&
      (image == null || image == undefined || image == "")
    ) {
      changeUsername();
      setErrorMessage(
        <View style={styles.errorMessageArea}>
          <MaterialIcons name={"check"} size={24} color="#FFF" />
          <Text style={styles.errorMessage}>Nome de usuário alterado! Reinicie o aplicativo para aplicá-lo.</Text>
        </View>
      );
    } else if (
      username.length > 3 &&
      username.length < 21 &&
      regexUser.test(username) == false
    ) {
      setErrorMessage(
        <View style={styles.errorMessageArea}>
          <Foundation name="alert" size={24} color="#9D0208" />
          <Text style={styles.errorMessage}>Nome de Usuário inválido.</Text>
        </View>
      );
    } else if (
      regexUser.test(username) == true &&
      username.length > 3 &&
      username.length < 21 &&
      image != null &&
      image != undefined &&
      image != ""
    ) {
      changeImage();
      changeUsername();
      setErrorMessage(
        <View style={styles.errorMessageArea}>
          <MaterialIcons name={"check"} size={24} color="#FFF" />
          <Text style={styles.errorMessage}>Alterações salvas! Reinicie o aplicativo para aplicá-las.</Text>
        </View>
      );
    }
  };

  const changeImage = async () => {
    await updateProfile(auth.currentUser, { photoURL: image })
      .then(async () => {
        console.log("imagem foi");
      })
      .catch((error) => {
        console.log("imagem nao foi: ", error.code);
      });
  };

  const changeUsername = async () => {
    await updateDoc(doc(collection(db, "users"), auth.currentUser.uid), {
      username: username,
    })
      .then(() => {
        console.log("username foi");
      })
      .catch((error) => console.log("username não foi: ", error.code));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }

    console.log(image);
  };

  if (hasGalleryPermission === false) {
    return <Text>No acess to Internal Storage</Text>;
  }

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <ScrollView
        style={styles.container}
        onLayout={onLayoutRootView}
        alignItems="center"
      >
        <ExpoFastImage source={{ uri: image }} style={{ flex: 1 / 2 }} />
        <View style={styles.content}>
          <Text style={styles.title}>Editar Perfil</Text>
          <TouchableOpacity style={styles.userArea} onPress={() => pickImage()}>
            <View style={{ height: 50, alignItems: "center" }}>
              <ExpoFastImage
                style={styles.userImage}
                source={{
                  uri: auth.currentUser.photoURL == null ? "https://pbs.twimg.com/media/Fdnl8v_XoAE2vQX?format=jpg&name=large" : auth.currentUser.photoURL,
                }}
                resizeMode="cover"
              ></ExpoFastImage>
              <View style={styles.layer}></View>
              <FontAwesome
                name="plus"
                size={50}
                color="white"
                style={{ top: -325, zIndex: 1000 }}
              />
            </View>
          </TouchableOpacity>

          <View style={styles.changesArea}>
            <Text style={[styles.changeTitle, { marginTop: 40 }]}>
              Nome de Usuário
            </Text>
            <View style={styles.changeItem}>
              <TextInput
                placeholder="Digite seu novo nome de usuário"
                placeholderTextColor="#8F8F8F"
                style={styles.changeInput}
                onChangeText={(text) => setUsername(text)}
              />
            </View>
          </View>

          {errorMessage}

          <View style={styles.submitArea}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.submitText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  sla: {},
  warningTitle: {
    marginTop: 40,
    marginBottom: 4,
    fontFamily: "Lato-Bold",
    color: "#FFF",
    fontSize: 19,
    textAlign: "center",
  },
  warningText: {
    marginTop: 8,
    fontFamily: "Lato-Regular",
    color: "#8F8F8F",
    fontSize: 16,
    textAlign: "center",
  },
  userArea: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 150,
  },
  userImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: "#ADADAD",
    borderWidth: 5,
  },
  layer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    top: -200,
  },
  userName: {
    marginTop: 8,
    color: "#FFF",
    fontSize: 19,
    fontFamily: "Lato-Regular",
  },
  errorMessageArea: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 20,
    width: (Dimensions.get("window").width * 300) / 392.72,
  },
  errorMessage: {
    fontSize: 15,
    color: "#FFF",
    fontStyle: "Lato-Regular",
    marginLeft: 5,
    textAlign: "center",
    width: (Dimensions.get("window").width * 250) / 392.72,
  },
  passwordForgot: {
    color: "#8F8F8F",
    fontSize: 16,
    fontFamily: "Lato-Regular",
    marginTop: 10,
  },
  submitText: {
    color: "#FFF",
    fontFamily: "Lato-Regular",
    fontSize: 21,
  },
  submitButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: (Dimensions.get("window").width * 15) / 392.72,
    paddingHorizontal: (Dimensions.get("window").width * 35) / 392.72,
    borderWidth: 2,
    borderColor: "#9D0208",
    borderRadius: 10,
    backgroundColor: "#141414",
  },
  submitArea: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: "4%",
  },
  changesArea: {
    marginTop: 20,
    width: (Dimensions.get("window").width * 300) / 392.72,
  },
  changeTitle: {
    color: "#FFF",
    fontFamily: "Lato-Regular",
    fontSize: 20,
    marginBottom: 8,
  },
  changeItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 7,
    borderBottomWidth: 1,
    borderColor: "#9D0208",
  },
  changeInput: {
    flex: 1,
    color: "#FFF",
    fontFamily: "Lato-Regular",
    fontSize: 17,
  },
  content: {
    width: (Dimensions.get("window").width * 300) / 392.72,
    minHeight: 600,
    flex: 1,
    paddingTop: "4%",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#0F0C0C",
  },
  title: {
    color: "#FFF",
    fontFamily: "Lato-Regular",
    fontSize: 18,
  },
});

const mapStateToProps = (state) => {
  return {
    name: state.userReducer.name,
    email: state.userReducer.email,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setName: (name) => dispatch({ type: "SET_NAME", payload: { name } }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
