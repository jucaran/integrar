import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../Screens/HomeScreen";
import SuperAdminScreen from "../../screens/SuperAdminScreen";
import React from "react";
import SuperAdminListStudents from "../../Screens/SuperAdminListStudents";

const Stack = createStackNavigator();
export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00aadd",
        },
        headerTintColor: "#fff",
        title: "integrAR",
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: "roboto",
        },
      }}
      initialRouteName={"SuperAdminScreen"}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="SuperAdminListStudents"
        component={SuperAdminListStudents}
      />
      <Stack.Screen name="SuperAdminScreen" component={SuperAdminScreen} />
    </Stack.Navigator>
  );
}