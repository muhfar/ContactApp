import React, { FC } from 'react';
import * as Screens from '../screens';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Router: FC = () => {
    const Stack = createStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator 
            screenOptions={{headerStyle:{backgroundColor: '#379EC8', borderBottomLeftRadius:10, borderBottomRightRadius: 10, height: 70}, headerTintColor: '#FFF', headerTitleAlign:'center'}}>
                <Stack.Screen name='listContact' component={Screens.ListContact} options={{title: 'Contact Apps'}}/>
                <Stack.Screen name='formContact' component={Screens.FormContact} options={{title: 'Form Contact'}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router