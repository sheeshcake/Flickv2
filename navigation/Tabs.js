import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import {Home, Search} from "../screens";
import { COLORS, icons, SIZES } from "../constants"

import TabIcon from "../components/TabIcon"


const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarOptions: {
                    activeTintColor: COLORS.primary,
                    inactiveTintColor: COLORS.white,
                    style: {
                        backgroundColor: COLORS.black,
                    }
                },
                tabBarStyle: {
                    backgroundColor: COLORS.black,
                    borderTopWidth: 0,
                    height: SIZES.width * 0.15,
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0,
                    elevation: 0
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                style={{
                    backgroundColor: COLORS.black
                }}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.home}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.search}
                        />
                    )
                }}
            />
            {/* <Tab.Screen
                name="Profile"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.profile}
                        />
                    )
                }}
            /> */}
        </Tab.Navigator>
    )
}

export default Tabs;