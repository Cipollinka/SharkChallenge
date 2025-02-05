import { View, Text, SafeAreaView, Dimensions, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const fontOrbitronSemiBold = 'Orbitron-SemiBold';
const fontMontserratRegular = 'Montserrat-Regular';
const fontMontserratSemiBold = 'Montserrat-SemiBold';

const backgroundImages = [
    {
        id: 1,
        image: require('../assets/images/bg.png'),
        requiredLevel: 5,
        name: 'BackgroundShark1.png',
    },
    {
        id: 2,
        image: require('../assets/images/bg.png'),
        requiredLevel: 10,
        name: 'BackgroundShark2.png',
    },
    {
        id: 3,
        image: require('../assets/images/bg.png'),
        requiredLevel: 15,
        name: 'BackgroundShark3.png',
    },
    {
        id: 4,
        image: require('../assets/images/bg.png'),
        requiredLevel: 20,
        name: 'BackgroundShark4.png',
    },
];

const RankScreen = () => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));
    const [userXP, setUserXP] = useState(0);
    const [userLevel, setUserLevel] = useState(1);

    useEffect(() => {
        console.log('User XP:', userXP);
        console.log('XP for Current Level:', xpForCurrentLevel);
    }, [userXP]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const xp = await AsyncStorage.getItem('userXP');
                const level = await AsyncStorage.getItem('userLevel');
                setUserXP(xp ? parseInt(xp) : 0);
                setUserLevel(level ? parseInt(level) : 1);
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const calculateLevel = (xp) => {
        return Math.floor(xp / 100) + 1;
    };

    const calculateXPForCurrentLevel = (xp) => {
        return xp % 100;
    };

    const currentLevel = calculateLevel(userXP);
    const xpForCurrentLevel = calculateXPForCurrentLevel(userXP);

    const renderGifts = () => {
        const availableBackgrounds = backgroundImages.filter(bg => currentLevel >= bg.requiredLevel);

        if (availableBackgrounds.length === 0) {
            return (
                <Text
                    style={{
                        fontFamily: fontMontserratRegular,
                        textAlign: 'center',
                        fontSize: dimensions.width * 0.04,
                        fontWeight: 400,
                        color: 'white',
                        paddingBottom: 8,
                        marginTop: '5%',
                    }}
                >
                    here is no gifts now
                </Text>
            );
        }

        return (
            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: dimensions.height* 0.16 }}>
                    {availableBackgrounds.map(bg => (
                        <View key={bg.id} style={{ margin: 10 }}>
                            <Image source={bg.image} style={{
                                width: dimensions.width * 0.4,
                                height: dimensions.width * 0.6,
                                borderRadius: dimensions.width * 0.04,
                                position: 'relative',
                            }} />
                        </View>
                    ))}
                </View>
            </ScrollView>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', width: '100%' }}>

            <Text
                style={{
                    fontFamily: fontOrbitronSemiBold,
                    textAlign: 'center',
                    fontSize: dimensions.width < 380 ? dimensions.width * 0.05 : dimensions.width * 0.07,
                    fontWeight: 800,
                    color: 'white',
                    paddingBottom: 8,
                    marginTop: '5%',
                }}
            >
                My level
            </Text>

            <View
                style={{
                    width: '80%',
                    height: dimensions.height * 0.03,
                    backgroundColor: 'white',
                    borderRadius: dimensions.height * 0.03,
                    overflow: 'hidden',
                    marginBottom: 8,
                    borderWidth: 1,
                    marginTop: dimensions.height * 0.019,
                }}
            >
                <View
                    style={{
                        width: Math.max((xpForCurrentLevel / 100) * 100, 1) + '%',
                        height: '100%',
                        backgroundColor: 'red',
                        borderRadius: dimensions.height * 0.03,
                    }}
                />
            </View>

            <Text
                style={{
                    fontFamily: fontMontserratSemiBold,
                    textAlign: 'center',
                    fontSize: dimensions.width * 0.04,
                    fontWeight: 800,
                    color: 'white',
                    paddingBottom: 8,
                    marginTop: '5%',
                }}
            >
                {xpForCurrentLevel}/100 xp
            </Text>

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    backgroundColor: '#3179AC',
                    width: '30%',
                    borderRadius: dimensions.width * 0.1,
                    paddingVertical: dimensions.width * 0.016,
                    alignSelf: 'center',
                    marginTop: dimensions.width * 0.03,
                }}
            >
                <Text
                    style={{
                        fontFamily: fontMontserratSemiBold,
                        textAlign: 'center',
                        fontSize: dimensions.width * 0.04,
                        color: 'white',
                        alignSelf: 'center',
                        width: '90%',
                        padding: dimensions.width * 0.04,
                    }}
                >
                    {currentLevel} lvl
                </Text>
            </View>

            <Text
                style={{
                    fontFamily: fontOrbitronSemiBold,
                    textAlign: 'center',
                    fontSize: dimensions.width < 380 ? dimensions.width * 0.05 : dimensions.width * 0.07,
                    fontWeight: 800,
                    color: 'white',
                    paddingBottom: 8,
                    marginTop: '10%',
                }}
            >
                My gifts
            </Text>

            {renderGifts()}
        </SafeAreaView>
    );
};

export default RankScreen;
