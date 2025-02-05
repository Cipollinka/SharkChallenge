import { View, Text, Dimensions, TouchableOpacity, Image, Share } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';

const fontNunitoExtraBold = 'Nunito-ExtraBold';
const fontNunitoRegular = 'Nunito-Regular';
const fontNunitoSemBold = 'Nunito-SemiBold';


const fontOrbitronSemiBold = 'Orbitron-SemiBold';
const fontMontserratRegular = 'Montserrat-Regular';
const fontMontserratSemiBold = 'Montserrat-SemiBold';

const ProfileScreen = () => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));
    const [isNicknameChanging, setIsNicknameChanging] = useState(false);
    const [averageRating, setAverageRating] = useState(0);
    const [challengesTaken, setChallengesTaken] = useState(0);

    const [nickname, setNickname] = useState('');
    const [savedNickname, setSavedNickname] = useState('');
    const [userXP, setUserXP] = useState(0);
    const [userLevel, setUserLevel] = useState(1);
    const [currentLevel, setCurrentLevel] = useState(1);

    const calculateLevel = (xp) => {
        return Math.floor(xp / 100) + 1;
    };

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

    useEffect(() => {
        setCurrentLevel(calculateLevel(userXP));
    }, [userXP]);

    useEffect(() => {
        const loadNickname = async () => {
            try {
                const savedStoredNickname = await AsyncStorage.getItem('nickname');
                if (savedStoredNickname) {
                    setSavedNickname(savedStoredNickname);
                }
            } catch (e) {
                console.error('Failed to load the nickname.', e);
            }
        };

        loadNickname();
    }, [savedNickname]);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const storedAverageRating = await AsyncStorage.getItem('averageRating');
                const storedChallengesTaken = await AsyncStorage.getItem('challengesTaken');

                if (storedAverageRating !== null) {
                    setAverageRating(JSON.parse(storedAverageRating));
                }

                if (storedChallengesTaken !== null) {
                    setChallengesTaken(parseInt(storedChallengesTaken));
                }
            } catch (error) {
                console.error('Error loading profile data:', error);
            }
        };

        fetchProfileData();
    }, []);

    const saveNickname = async () => {
        try {
            setSavedNickname(nickname);
            setNickname('');
            await AsyncStorage.setItem('nickname', nickname);
        } catch (e) {
            console.error('Failed to save the nickname.', e);
        }
    };

    return (
        <View style={{ width: '100%' }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                // backgroundColor: '#215174',
                width: 'auto',
                borderRadius: '50%',
                alignSelf: 'center',
                marginTop: '10%'
            }}>
                <Image
                    source={require('../assets/images/SharkImage.png')}
                    style={{
                        width: dimensions.width * 0.56,
                        height: dimensions.width * 0.56,
                        alignSelf: 'center',
                        zIndex: 50,
                    }}
                    resizeMode="contain"
                />
            </View>
            <Text
                style={{
                    fontFamily: fontOrbitronSemiBold,
                    textAlign: "center",
                    fontSize: dimensions.width * 0.07,
                    fontWeight: 800,
                    color: 'white',
                    paddingBottom: 8,
                    alignSelf: 'center',
                    width: '90%',
                    marginTop: dimensions.height * 0.01
                }}
            >
                {savedNickname}!
            </Text>

            <TouchableOpacity disabled={isNicknameChanging} onPress={() => { setIsNicknameChanging(true) }}>
                <Text
                    style={{
                        fontFamily: fontMontserratRegular,
                        textAlign: "center",
                        fontSize: dimensions.width * 0.037,
                        fontWeight: 'ultralight',
                        color: 'white',
                        paddingBottom: 8,
                        alignSelf: 'center',
                        width: '90%',
                        marginBottom: dimensions.height * 0.01,
                    }}
                >
                    change nickname
                </Text>
            </TouchableOpacity>

            {isNicknameChanging ? (
                <View style={{
                    width: '90%',
                    alignSelf: 'center',
                }}>
                    <TextInput style={{
                        backgroundColor: '#215174',
                        width: '90%',
                        borderRadius: dimensions.width * 0.05,
                        paddingVertical: dimensions.width * 0.03,
                        alignSelf: 'center',
                        padding: dimensions.width * 0.04,
                        marginTop: dimensions.height * 0.01,
                        color: 'white',
                        height: dimensions.height * 0.07,
                    }}
                        placeholder='your nickname'
                        placeholderTextColor={'white'}
                        placeholderStyle={{ color: 'white', paddingVertical: 30 }}
                        value={nickname}
                        onChangeText={setNickname}
                    />

                    <TouchableOpacity
                        disabled={nickname.length === 0}
                        onPress={() => {
                            saveNickname();
                            setIsNicknameChanging(false);
                        }}
                        style={{
                            borderRadius: dimensions.width * 0.07,
                            paddingHorizontal: 28,
                            paddingVertical: 21,
                            marginBottom: 40,
                            width: '64%',
                            alignSelf: 'center',
                            backgroundColor: '#E10909',
                            marginTop: dimensions.height * 0.01,
                            opacity: nickname.length > 0 ? 1 : 0.5,
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: 600,
                                textAlign: 'center',
                                color: 'white',
                                fontFamily: fontMontserratSemiBold,
                                fontSize: dimensions.width * 0.05,
                            }}>
                            Save
                        </Text>
                    </TouchableOpacity>
                </View>

            ) : (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    backgroundColor: '#3179AC',
                    width: '30%',
                    borderRadius: dimensions.width * 0.1,

                    paddingVertical: dimensions.width * 0.016,
                    alignSelf: 'center',
                    marginTop: dimensions.width * 0.03
                }}>
                    <Text
                        style={{
                            fontFamily: fontMontserratSemiBold,
                            textAlign: "center",
                            fontSize: dimensions.width * 0.04,
                            color: 'white',
                            alignSelf: 'center',
                            width: '90%',
                            padding: dimensions.width * 0.04
                        }}
                    >
                        {currentLevel} lvl
                    </Text>
                </View>
            )}




        </View>
    )
}

export default ProfileScreen
