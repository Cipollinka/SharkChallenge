import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Share,
  ScrollView,
  Alert,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileScreen from './ProfileScreen';
import HistoryScreen from './HistoryScreen';
import RankScreen from './RankScreen';
import StatisticScreen from './StatisticScreen';



const quotes = [
  {
    id: 1,
    qouteDecription: 'The ocean stirs the heart, inspires the imagination, and brings eternal joy to the soul.',
    author: 'Wyland',

  },
  {
    id: 2,
    qouteDecription: "In the depths of the ocean, peace is found in silence.",
    author: '',

  },
  {
    id: 3,
    qouteDecription: "A shark is the most perfect predator, but even the greatest need rest.",
    author: '',
  },
  {
    id: 4,
    qouteDecription: "Creativity is intelligence having fun.",
    author: 'Albert Einstein',

  },
  {
    id: 5,
    qouteDecription: "Plan your work, then work your plan.",
    author: 'Napoleon Hill',
  },
  {
    id: 6,
    qouteDecription: "In the waves of change, we find our true direction.",
    author: '',
  },
  {
    id: 7,
    qouteDecription: "The world is a book, and those who do not travel read only one page.",
    author: 'Saint Augustine',
  },
  {
    id: 8,
    qouteDecription: "Gratitude turns what we have into enough.",
    author: 'Melody Beattie',
  },
  {
    id: 9,
    qouteDecription: "Healthy eating is a form of self-respect.",
    author: 'Muh Ali',
  },
  {
    id: 10,
    qouteDecription: "Success is the sum of small efforts, repeated day in and day out.",
    author: 'Robert Collier',
  },
  {
    id: 11,
    qouteDecription: "Simplicity is the ultimate sophistication.",
    author: 'Leonardo da Vinci',

  },
  {
    id: 12,
    qouteDecription: "A little kindness goes a long way.",
    author: '',
  },
  {
    id: 13,
    qouteDecription: "Success is a series of small wins.",
    author: '',
  },
  {
    id: 14,
    qouteDecription: "Every meal is a chance to nourish yourself.",
    author: '',
  },
  {
    id: 15,
    qouteDecription: "Happiness is not something ready-made. It comes from your own actions.",
    author: 'Dalai Lama',
  },
  {
    id: 16,
    qouteDecription: "Every challenge is an opportunity to learn.",
    author: '',
  },
  {
    id: 17,
    qouteDecription: "You are never too old to set another goal or to dream a new dream.",
    author: 'C.S. Lewis',
  },
  {
    id: 18,
    qouteDecription: "Nature is the art of God.",
    author: 'Dante Alighieri',
  },
  {
    id: 19,
    qouteDecription: "You can't protect the environment without protecting people.",
    author: 'Anne Lappe',
  },
  {
    id: 20,
    qouteDecription: "Create the life you can't wait to wake up to.",
    author: '',
  },
  {
    id: 21,
    qouteDecription: "A goal without a plan is just a wish.",
    author: 'Antoine de Saint-Exupéry',
  },
  {
    id: 22,
    qouteDecription: "Simplicity is the key to brilliance.",
    author: 'Bruce Lee',
  },
  {
    id: 23,
    qouteDecription: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: 'Chinese Proverb',
  },
  {
    id: 24,
    qouteDecription: "Don’t count the days, make the days count.",
    author: 'Muhammad Ali',
  },
  {
    id: 25,
    qouteDecription: "The ocean is everything I want to be. Beautiful, mysterious, wild, and free.",
    author: '',
  },
  {
    id: 26,
    qouteDecription: "When you focus on the good, the good gets better.",
    author: '',
  },
  {
    id: 27,
    qouteDecription: "Inhale the future, exhale the past.",
    author: '',
  },
  {
    id: 28,
    qouteDecription: "You can never cross the ocean until you have the courage to lose sight of the shore.",
    author: 'Christopher Columbus',
  },
  {
    id: 29,
    qouteDecription: "The sea is as near as we come to another world.",
    author: 'Anne Stevenson',
  },
  {
    id: 30,
    qouteDecription: "Believe in yourself and all that you are.",
    author: 'Christian D. Larson',
  },
];


const challenges = [
  {
    id: 1,
    title: 'Ocean Inspiration',
    challengeDescrip: 'Write three positive thoughts for today.',
  },
  {
    id: 2,
    title: 'Ocean Sounds',
    challengeDescrip: 'Listen to 10 minutes of ocean sounds.',
  },
  {
    id: 3,
    title: 'Shark Reading',
    challengeDescrip: 'Read one article about the ocean or marine life.',
  },
  {
    id: 4,
    title: 'Shark Drawing',
    challengeDescrip: 'Draw or create a picture featuring a shark.',
  },
  {
    id: 5,
    title: 'Shark Strategist',
    challengeDescrip: 'Write your plan for the upcoming week.',
  },
  {
    id: 6,
    title: 'Quiet Waves',
    challengeDescrip: 'Spend 10 minutes in silence, focusing on your breath.',
  },
  {
    id: 7,
    title: 'Sea Quest',
    challengeDescrip: 'Explore a new interesting place in your city.',
  },
  {
    id: 8,
    title: 'Big Waves',
    challengeDescrip: 'Write three things you’re grateful for today.',
  },
  {
    id: 9,
    title: 'Marine Menu',
    challengeDescrip: 'Create a list of healthy dishes you\'d like to try.',
  },
  {
    id: 10,
    title: 'Fishy Joy',
    challengeDescrip: 'Write three things that made you happy today.',
  },
  {
    id: 11,
    title: 'Shark Organizer',
    challengeDescrip: 'Organize your workspace or relaxation area.',
  },
  {
    id: 12,
    title: 'Ocean Helper',
    challengeDescrip: 'Do something kind for someone or perform a good deed.',
  },
  {
    id: 13,
    title: 'Healthy Ocean',
    challengeDescrip: 'Create a list of healthy meals you can prepare.',
  },
  {
    id: 14,
    title: 'Shark Reflections',
    challengeDescrip: 'Write your goals for the next month.',
  },
  {
    id: 15,
    title: 'Shark Time',
    challengeDescrip: 'Spend time outdoors — take a walk in nature.',
  },
  {
    id: 16,
    title: 'Ocean Journey',
    challengeDescrip: 'Sign up for a new online course or webinar.',
  },
  {
    id: 17,
    title: 'Shark Inspiration',
    challengeDescrip: 'Watch a video on oceans or nature.',
  },
  {
    id: 18,
    title: 'Save the Ocean',
    challengeDescrip: 'Write a short essay on the importance of preserving nature.',
  },
  {
    id: 19,
    title: 'Sea Cleaning',
    challengeDescrip: 'Throw away five unnecessary items in your home.',
  },
  {
    id: 20,
    title: 'Shark Creator',
    challengeDescrip: 'Write a story or short narrative about a shark.',
  },
  {
    id: 21,
    title: 'Shark Memory',
    challengeDescrip: 'Write about important events of the day in your journal.',
  },
  {
    id: 22,
    title: 'Shark Painting',
    challengeDescrip: 'Create an underwater landscape with watercolor or digitally.',
  },
  {
    id: 23,
    title: 'Ocean Dreams',
    challengeDescrip: 'Write about your dreams and aspirations.',
  },
  {
    id: 24,
    title: 'Calm Ocean',
    challengeDescrip: 'Spend 10 minutes meditating or doing yoga to relieve stress.',
  },
  {
    id: 25,
    title: 'Shark Inspiration',
    challengeDescrip: 'Explore new facts about sharks or marine depths.',
  },
  {
    id: 26,
    title: 'Ocean Mosaic',
    challengeDescrip: 'Make a collage or mosaic from natural materials.',
  },
  {
    id: 27,
    title: 'Shark Challenge',
    challengeDescrip: 'Clear out old or unnecessary files from your digital space.',
  },
  {
    id: 28,
    title: 'Marine Reflections',
    challengeDescrip: 'Write in your journal about your achievements today.',
  },
  {
    id: 29,
    title: 'Shark Adventures',
    challengeDescrip: 'Go for a bike ride or take a walk in a new place.',
  },
  {
    id: 30,
    title: 'Ocean Clarity',
    challengeDescrip: 'Take a break from screens for an hour and enjoy the moment.',
  },
]


const fontOrbitronSemiBold = 'Orbitron-SemiBold';
const fontMontserratRegular = 'Montserrat-Regular';
const fontMontserratSemiBold = 'Montserrat-SemiBold';



const HomeScreen = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [selectedPage, setSelectedPage] = useState('Home');

  const [todayDay, setTodayDay] = useState(1);
  const [todayChallenge, setTodayChallenge] = useState(null);
  const [todayQuote, setTodayQuote] = useState(null);

  const [playedChallenge, setPlayedChallenge] = useState(null);
  const [nickname, setNickname] = useState('');
  const [timeLeft, setTimeLeft] = useState('');
  const [isChallengeFinished, setIsChallengeFinished] = useState(false);
  const [isChallengeRunning, setIsChallengeRunning] = useState(false);

  useEffect(() => {
    const fetchPickedChallenge = async () => {
      try {
        const picked = await AsyncStorage.getItem('playedChallenge');
        if (picked !== null) {
          const parsedPicked = JSON.parse(picked);
          setPlayedChallenge(parsedPicked);
          calculateTime(parsedPicked.pickedAt);
        }
      } catch (error) {
        console.error('error while load picked', error);
      }
    };

    fetchPickedChallenge();
  }, []);

  useEffect(() => {
    let timer;
    if (isChallengeRunning) {
      timer = setInterval(() => {
        calculateTime(playedChallenge.pickedAt);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isChallengeRunning, playedChallenge]);

  const calculateTime = (pickedAt) => {
    const pickedTime = new Date(pickedAt).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = (pickedTime + 10 * 60 * 1000) - currentTime;

    if (timeDifference > 0) {
      const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
      const seconds = Math.floor((timeDifference / 1000) % 60);

      setTimeLeft(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
    } else {
      setTimeLeft('Lost');
      setIsChallengeFinished(true);
      if (isChallengeRunning) {
        setIsChallengeRunning(false);
        handleChallengeResult(false);
      }
    }
  };

  const handleChallengeResult = async (isCompleted) => {
    const result = isCompleted ? 'Done' : 'Lost';
    const endDate = new Date().toISOString();
    const challengeResult = {
      ...playedChallenge,
      endDate,
      result,
    };

    try {
      const existingResults = await AsyncStorage.getItem('challengeResults');
      const results = existingResults ? JSON.parse(existingResults) : [];
      results.push(challengeResult);
      await AsyncStorage.setItem('challengeResults', JSON.stringify(results));

      const completedChallenges = await AsyncStorage.getItem('completedChallenges');
      const failedChallenges = await AsyncStorage.getItem('failedChallenges');
      const newCompletedChallenges = isCompleted ? (parseInt(completedChallenges) || 0) + 1 : parseInt(completedChallenges) || 0;
      const newFailedChallenges = !isCompleted ? (parseInt(failedChallenges) || 0) + 1 : parseInt(failedChallenges) || 0;

      await AsyncStorage.setItem('completedChallenges', newCompletedChallenges.toString());
      await AsyncStorage.setItem('failedChallenges', newFailedChallenges.toString());

      if (isCompleted) {
        const userXP = await AsyncStorage.getItem('userXP');
        const newUserXP = (parseInt(userXP) || 0) + 10;
        await AsyncStorage.setItem('userXP', newUserXP.toString());
      }
    } catch (error) {
      console.error('Error saving challenge result:', error);
    }
  };

  const startChallenge = async () => {
    setIsChallengeRunning(true);
    const challengeWithTimestamp = {
      ...todayChallenge,
      pickedAt: new Date().toISOString(),
    };
    await AsyncStorage.setItem('playedChallenge', JSON.stringify(challengeWithTimestamp));
    setPlayedChallenge(challengeWithTimestamp);
    calculateTime(challengeWithTimestamp.pickedAt);
  };

  const completeChallenge = () => {
    setIsChallengeRunning(false);
    setIsChallengeFinished(true);
    handleChallengeResult(true);
  };

  useEffect(() => {
    const loadNickname = async () => {
      try {
        const savedNickname = await AsyncStorage.getItem('nickname');
        if (savedNickname) {
          setNickname(savedNickname);
        }
      } catch (e) {
        console.error('Failed to load the nickname.', e);
      }
    };

    loadNickname();
  }, [selectedPage]);

  useEffect(() => {
    const fetchThisCurTodayDay = async () => {
      try {
        const savedDay = await AsyncStorage.getItem('todayDay');
        if (savedDay !== null) {
          setTodayDay(parseInt(savedDay, 10));
        }
      } catch (error) {
        console.error('Помилка при завантаженні todayDay:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchThisCurTodayDay();
  }, []);

  useEffect(() => {
    if (challenges[todayDay]) {
      setTodayQuote(quotes.find(quote => quote.id === todayDay));
    }
    setTodayChallenge(challenges.find(challenge => challenge.id === todayDay));
  }, [todayDay, selectedPage]);

  const generateNewChallenge = () => {
    let newChallenge;
    do {
      newChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    } while (newChallenge === todayQuote);
    setTodayChallenge(newChallenge);
  };

  const shareQuote = async (qoute) => {
    try {
      if (!qoute) {
        Alert.alert('Error', 'No quote to share');
        return;
      }
      await Share.share({
        message: `My today qoute is '${qoute}'`,
      });
    } catch (error) {
      console.error('Error sharing qoute:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: '#06263D' }}>
      <Image style={{flex: 1, width: '100%', height: '110%', position: 'absolute'}} source={require('../assets/images/bg.png')} />

      {selectedPage === 'Home' ? (
        <View style={{ width: '88%', flex: 1, paddingHorizontal: 4 }}>
          <Text
            style={{
              fontFamily: fontOrbitronSemiBold,
              textAlign: "center",
              fontSize: dimensions.width < 380 ? dimensions.width * 0.05 : dimensions.width * 0.07,
              fontWeight: 800,
              color: 'white',
              paddingBottom: 8,
              marginTop: '5%'

            }}
          >
            Welcome, {nickname}!
          </Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            <View style={{
              flex: 1,
              maxHeight: dimensions.width < 380 ? '75%' : '80%',
              borderRadius: dimensions.width * 0.05,
              position: 'relative',
              marginBottom: dimensions.height * 0.16,
            }}>


              <View style={{
                width: '100%',
                backgroundColor: 'white',
                position: 'relative',
                borderRadius: dimensions.width * 0.04,
                marginTop: dimensions.height * 0.14
              }}>



                <View style={{
                  width: '100%',
                  alignSelf: 'center',
                  paddingVertical: dimensions.width * 0.04,
                  paddingHorizontal: dimensions.width * 0.04,
                }}>
                  <Image
                    source={require('../assets/images/SharkImage.png')}
                    style={{
                      width: dimensions.width * 0.56,
                      height: dimensions.width * 0.56,

                      marginTop: -dimensions.height * 0.19,
                      marginBottom: -dimensions.height * 0.03,
                      alignSelf: 'center',
                      zIndex: 50,
                    }}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: dimensions.width * 0.05,
                      paddingBottom: dimensions.width * 0.02,
                      fontWeight: 800,
                      fontFamily: fontMontserratSemiBold,
                      color: '#06263D',

                    }}
                  >
                    Your challenge today is:
                  </Text>

                  <Text
                    style={{
                      fontFamily: fontMontserratRegular,
                      textAlign: "center",
                      fontSize: dimensions.width < 380 ? dimensions.width * 0.034 : dimensions.width * 0.037,
                      fontWeight: 400,
                      color: '#444444',

                    }}
                  >
                    {todayChallenge?.challengeDescrip}
                  </Text>
                </View>

                <View style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  paddingBottom: dimensions.width * 0.03,
                  justifyContent: 'center',
                  width: '95%',
                }}>

                  <TouchableOpacity
                    onPress={isChallengeRunning ? completeChallenge : startChallenge}
                    style={{ alignItems: 'center', padding: 8 }}
                  >
                    <View style={{
                      alignItems: 'center',
                      backgroundColor: '#F9332C',
                      padding: 16,
                      justifyContent: 'center',
                      borderRadius: dimensions.width * 0.07
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
                        {isChallengeRunning ? timeLeft : 'Start'}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={isChallengeRunning ? completeChallenge : generateNewChallenge}
                    style={{
                      alignItems: 'center',
                      padding: 8,
                    }}
                  >
                    <View style={{
                      padding: 4,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#06263D',
                      borderRadius: dimensions.width * 0.5
                    }}>

                      <Image
                        source={
                          isChallengeRunning
                            ? require('../assets/icons/pagesIcons/pausedIcon.png')
                            : require('../assets/icons/pagesIcons/reloadIcon.png')
                        }
                        style={{
                          textAlign: 'center',
                          width: dimensions.width * 0.064,
                          height: dimensions.width * 0.064,
                          margin: dimensions.width * 0.025,
                        }}
                        resizeMode="contain"
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>


              <View style={{
                width: '100%',
                backgroundColor: 'white',
                borderRadius: dimensions.width * 0.04,
                marginTop: dimensions.height * 0.03,
              }}>



                <View style={{
                  width: '100%',
                  alignSelf: 'center',
                  paddingVertical: dimensions.width * 0.04,
                  paddingHorizontal: dimensions.width * 0.04,
                }}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: dimensions.width * 0.05,
                      paddingBottom: dimensions.width * 0.02,
                      fontWeight: 800,
                      fontFamily: fontMontserratSemiBold,
                      color: '#06263D',

                    }}
                  >
                    Your quote today is:
                  </Text>

                  <Text
                    style={{
                      fontFamily: fontMontserratRegular,
                      textAlign: "center",
                      fontSize: dimensions.width < 380 ? dimensions.width * 0.034 : dimensions.width * 0.037,
                      fontWeight: 400,
                      color: '#444444',

                    }}
                  >
                    "{todayQuote?.qouteDecription}"
                  </Text>

                  {todayQuote?.author !== '' && (
                    <Text
                      style={{
                        fontFamily: fontMontserratRegular,
                        textAlign: "center",
                        fontSize: dimensions.width < 380 ? dimensions.width * 0.034 : dimensions.width * 0.037,
                        fontWeight: 500,
                        color: '#444444',

                      }}
                    >
                      - {todayQuote?.author}
                    </Text>
                  )}
                </View>

                <View style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  paddingBottom: dimensions.width * 0.03,
                  justifyContent: 'center',
                  width: '95%',
                }}>

                  <TouchableOpacity
                    onPress={() => { shareQuote(todayQuote?.qouteDecription) }}
                    style={{
                      alignItems: 'center',
                      padding: 8,
                    }}
                  >
                    <View style={{
                      padding: 4,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#06263D',
                      borderRadius: dimensions.width * 0.5
                    }}>

                      <Image
                        source={require('../assets/icons/pagesIcons/shareIcon.png')}
                        style={{
                          textAlign: 'center',
                          width: dimensions.width * 0.064,
                          height: dimensions.width * 0.064,
                          margin: dimensions.width * 0.025,
                        }}
                        resizeMode="contain"
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          </ScrollView>

          <View style={{ position: 'absolute', bottom: '14%', left: '50%', backgroundColor: '#3179AC' }}>

          </View>
        </View>

      ) : selectedPage === 'Profile' ? (
        <ProfileScreen challenges={challenges} />
      ) : selectedPage === 'Rank' ? (
        <RankScreen />
      ) : selectedPage === 'History' ? (
        <HistoryScreen />
      ) : selectedPage === 'Statistic' ? (
        <StatisticScreen />
      ) : null}


      <View
        style={{
          position: 'absolute', bottom: '7%', backgroundColor: '#3179AC',
          width: '100%,', paddingHorizontal: dimensions.width * 0.03, borderRadius: dimensions.width * 0.1,
          height: '8%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
          alignSelf: 'center', paddingVertical: dimensions.height * 0.03
        }}
      >

        <TouchableOpacity
          onPress={() => setSelectedPage('History')}
          style={{
            borderRadius: '50%',
            padding: dimensions.width * 0.03,
            backgroundColor: 'white',
            alignItems: 'center',
          }}
        >
          <Image
            source={selectedPage === 'History' ? require('../assets/icons/pickedPagesIcons/pickedHistoryIcon.png') : require('../assets/icons/pagesIcons/historyIcon.png')}
            style={{
              width: dimensions.width * 0.055,
              height: dimensions.width * 0.055,
              textAlign: 'center'
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelectedPage('Rank')}
          style={{
            borderRadius: '50%',
            padding: dimensions.width * 0.03,
            backgroundColor: 'white',
            alignItems: 'center',
            marginLeft: 10,
          }}
        >
          <Image
            source={selectedPage === 'Rank' ? require('../assets/icons/pickedPagesIcons/pickedRankIcon.png') : require('../assets/icons/pagesIcons/rankIcon.png')}
            style={{
              width: dimensions.width * 0.055,
              height: dimensions.width * 0.055,
              textAlign: 'center'
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>



        <TouchableOpacity
          onPress={() => setSelectedPage('Home')}
          style={{
            alignItems: 'center',
            borderRadius: '50%',
            backgroundColor: 'white',
            padding: dimensions.width * 0.03,
            marginHorizontal: 10,
          }}
        >
          <Image
            source={selectedPage === 'Home' ? require('../assets/icons/pickedPagesIcons/pickedHomeIcon.png') : require('../assets/icons/pagesIcons/homeIcon.png')}
            style={{
              width: dimensions.width * 0.055,
              height: dimensions.width * 0.055,
              textAlign: 'center'
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>


        <TouchableOpacity
          onPress={() => setSelectedPage('Statistic')}
          style={{
            backgroundColor: 'white',
            alignItems: 'center',
            padding: dimensions.width * 0.03,
            borderRadius: '50%',
            marginRight: 10,
          }}
        >
          <Image
            source={selectedPage === 'Statistic' ? require('../assets/icons/pickedPagesIcons/pickedStatisticIcon.png') : require('../assets/icons/pagesIcons/statisticIcon.png')}
            style={{
              width: dimensions.width * 0.055,
              height: dimensions.width * 0.055,
              textAlign: 'center'
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>



        <TouchableOpacity
          onPress={() => setSelectedPage('Profile')}
          style={{
            backgroundColor: 'white',
            alignItems: 'center',
            padding: dimensions.width * 0.03,
            borderRadius: '50%',
          }}
        >
          <Image
            source={selectedPage === 'Profile' ? require('../assets/icons/pickedPagesIcons/pickedProfileIcon.png') : require('../assets/icons/pagesIcons/profileIcon.png')}
            style={{
              width: dimensions.width * 0.055,
              height: dimensions.width * 0.055,
              textAlign: 'center'
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>



      </View>

    </SafeAreaView>
  );
};

export default HomeScreen;
