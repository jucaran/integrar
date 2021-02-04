import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { View } from "react-native";
import OptionsStack from "../../stacks/AdminStack/OptionsStack";
import StudentHomeStack from "../../stacks/StudentStack/StudentHomeStack"
import StudentSubjectStack from "../../stacks/StudentStack/StudentSubjectStack"
import StudentProfileStack from "../../stacks/StudentStack/StudentProfileStack"


const Tab = createMaterialBottomTabNavigator();
function TabStudent() {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      activeColor="#f0edf6"
      inactiveColor="#e22882"
      barStyle={{ backgroundColor: "#159aed" }}
    >
      <Tab.Screen
        name="Inicio"
        component={StudentHomeStack}
        options={{
          tabBarIcon: () => {
            return (
              <View>
                <Icon name={"ios-home-outline"} size={25} color={"white"}/>
              </View>
            );
          },
        }}
      />
       <Tab.Screen
        name="Mis Materias"
        component={StudentSubjectStack}
        options={{
          tabBarIcon: () => {
            return (
              <View>
                <Icon name={"ios-book-outline"} size={25} color={"white"}/>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Mi Perfil"
        component={StudentProfileStack}
        options={{
          tabBarIcon: () => {
            return (
              <View>
                <Icon name={"ios-person-outline"} size={25} color={"white"}/>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Opciones"
        component={OptionsStack}
        options={{
          tabBarIcon: () => {
            return (
              <View>
                <Icon name={"ios-settings-outline"} size={25} color={"white"}/>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default TabStudent;