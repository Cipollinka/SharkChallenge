import { View, Text, SafeAreaView, Dimensions, ScrollView, TouchableOpacity, Share } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const fontOrbitronSemiBold = 'Orbitron-SemiBold';
const fontMontserratRegular = 'Montserrat-Regular';
const fontMontserratSemiBold = 'Montserrat-SemiBold';

const StatisticScreen = () => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));
    const [doneTasks, setDoneTasks] = useState(0);
    const [lostTasks, setLostTasks] = useState(0);

    useEffect(() => {
        // Fetch the number of done and lost tasks from AsyncStorage or any other source
        const fetchTaskData = async () => {
            try {
                const done = await AsyncStorage.getItem('completedChallenges');
                const lost = await AsyncStorage.getItem('failedChallenges');
                setDoneTasks(done ? parseInt(done) : 0);
                setLostTasks(lost ? parseInt(lost) : 0);
            } catch (error) {
                console.error('Error loading task data:', error);
            }
        };

        fetchTaskData();
    }, []);

    const totalTasks = doneTasks + lostTasks;
    const donePercentage = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;
    const lostPercentage = totalTasks > 0 ? 100 - donePercentage : 0;

    const shareStats = async () => {
        try {
            await Share.share({
                message: `My stats are: ${donePercentage}% done and ${lostPercentage}% lost.`,
            });
        } catch (error) {
            console.error('Error sharing stats:', error);
        }
    };

    return (
        <SafeAreaView style={{ width: '100%' }}>
            <Text
                style={{
                    fontFamily: fontOrbitronSemiBold,
                    textAlign: "center",
                    fontSize: dimensions.width < 380 ? dimensions.width * 0.05 : dimensions.width * 0.07,
                    fontWeight: 800,
                    marginTop: '5%',
                    color: 'white',
                    paddingBottom: 8,
                }}
            >
                Statistics
            </Text>

            <View style={{
                width: '90%',
                height: '40%',
                backgroundColor: '#F9332C',
                alignSelf: 'center',
                borderRadius: dimensions.width * 0.04,
                marginTop: dimensions.height * 0.04,
                flexDirection: 'row',
                overflow: 'hidden',
            }}>
                <View style={{
                    width: `${donePercentage}%`,
                    backgroundColor: '#2ACD68',
                    borderRadius: dimensions.width * 0.04,
                }} />
                <View style={{
                    width: `${lostPercentage}%`,
                    backgroundColor: '#F9332C',
                }} />
            </View>

            <Text
                style={{
                    fontFamily: fontOrbitronSemiBold,
                    textAlign: "left",
                    fontSize: dimensions.width * 0.07,
                    fontWeight: 700,
                    paddingHorizontal: '5%',
                    marginTop: dimensions.height * 0.04,
                    color: 'white',
                    paddingBottom: 8,
                }}
            >
                Done - {donePercentage}%
            </Text>

            <Text
                style={{
                    paddingHorizontal: '5%',
                    fontFamily: fontOrbitronSemiBold,
                    textAlign: "left",
                    fontSize: dimensions.width * 0.07,
                    fontWeight: 700,
                    color: 'white',
                    paddingBottom: 8,
                }}
            >
                Lost - {lostPercentage}%
            </Text>

            <TouchableOpacity
                onPress={shareStats}
                style={{ alignItems: 'center', padding: 8 }}
            >
                <View style={{
                    alignItems: 'center',
                    backgroundColor: '#F9332C',
                    padding: 16,
                    justifyContent: 'center',
                    borderRadius: dimensions.width * 0.07,
                    marginTop: dimensions.height * 0.03,
                }}>
                    <Text
                        style={{
                            fontFamily: fontMontserratSemiBold,
                            textAlign: "center",
                            fontSize: dimensions.width * 0.037,
                            fontWeight: 'bold',
                            paddingHorizontal: dimensions.width * 0.05,
                            color: 'white',
                        }}
                    >
                        Share my stats
                    </Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default StatisticScreen;