import { reportAudioFailureToastProps, reportAudioSuccessToastProps } from '@/constants/toastProps';
import { emergencyBgStyle, nonEmergencyBgStyle } from '@/theme/Home/gradient';
import { AudioBtn } from '@/screens/HomeScreen/components/AudioBtn';
import { reportFile } from '@/screens/HomeScreen/api';
import { LoadingView } from '@/components/LoadingView';

import { Platform, PermissionsAndroid, Alert } from 'react-native';
import { Pressable, Text, View, VStack } from 'native-base';
import Toast from 'react-native-toast-message';
import { W } from '@/constants/dimensions';
import { Component } from 'react';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  PlayBackType,
  RecordBackType,
} from 'react-native-audio-recorder-player';
import Lottie from 'lottie-react-native';

import { styles } from './style';

interface AudioState {
  isLoggingIn: boolean;
  isRecording: boolean;
  recordSecs: number;
  recordTime: string;
  currentPositionSec: number;
  currentDurationSec: number;
  playTime: string;
  duration: string;
  page: number;
  path: string;
  uri: string;
  navigation: any;

  isShowStartRecord: boolean;
  isShowPauseRecord: boolean;
  isShowResumeRecord: boolean;
  isShowStopRecord: boolean;

  isShowStartPlay: boolean;
  isShowPausePlay: boolean;
  isShowResumePlay: boolean;
  isShowStopPlay: boolean;
  isShowRestartRecord: boolean;
  isShowReportAudio: boolean;

  isReported: boolean;
  isShowCheckMove: boolean;
  isLoading: boolean,
}

const screenWidth = W;

class Audio extends Component<any, AudioState> {
  private audioRecorderPlayer: AudioRecorderPlayer;

  constructor(props: any) {
    super(props);
    this.state = {
      isLoggingIn: false,
      isRecording: false,
      recordSecs: 0,
      recordTime: '00:00:00',
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00',
      page: 0,
      path: '',
      uri: '',
      navigation: props.navigation,

      isShowStartRecord: true,
      isShowPauseRecord: false,
      isShowResumeRecord: false,
      isShowStopRecord: false,

      isShowStartPlay: true,
      isShowPausePlay: false,
      isShowResumePlay: false,
      isShowStopPlay: false,
      isShowRestartRecord: true,
      isShowReportAudio: true,

      isReported: false,
      isShowCheckMove: false,
      isLoading: false,
    };
    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.11);
    if (this.props.isEmergency) {
      this.onStartRecord();
    }
  }

  componentDidMount() {
    this.state.navigation.addListener('beforeRemove', (e: any) => {
      if (this.state.recordTime === '00:00:00') {
        this.state.navigation.dispatch(e.data.action);
        return;
      }
      if (this.state.isShowCheckMove) return;
      this.changeIsShowCheckMove(true);
      e.preventDefault();
      
      if (this.state.isReported)  {
        this.moveAfterRemove(e)
      } else {
        Alert.alert(
          '녹음을 중단하시겠습니까?',
          '현재까지의 녹음내용을 신고 후 이동하거나 삭제 후 이동할 수 있습니다.',
          [
            { text: "이동 취소", style: 'cancel', onPress: () => this.changeIsShowCheckMove(false) },
            {
              text: '삭제 후 이동',
              style: 'destructive',
              onPress: () => this.moveAfterRemove(e),
            },
            {
              text: '신고 후 이동',
              style: 'cancel',
              onPress: () => this.moveAfterReport(e),
            },
          ]
        );
      }
    })
  }

  private changeIsShowCheckMove(bool: boolean): void {
    this.setState({
      isShowCheckMove: bool
    })
  }

  private moveAfterRemove = (e: any) => {
    this.onStopRecord();
    this.onStopPlay();
    this.state.navigation.dispatch(e.data.action)
  }

  private moveAfterReport = (e: any) => {
    console.log('신고 후 이동 진입')
    console.log(this.state.isReported)
    this.onStopRecord();
    this.onStopPlay();
    this.onReportAudio();
    this.state.navigation.dispatch(e.data.action)
  }

  private onStatusPress = (e: any) => {
    const touchX = e.nativeEvent.locationX;
    const playWidth =
      (this.state.currentPositionSec / this.state.currentDurationSec) *
      (screenWidth - 32);

    const currentPosition = Math.round(this.state.currentPositionSec);

    if (playWidth && playWidth < touchX) {
      const addSecs = Math.round(currentPosition + 1000);
      this.audioRecorderPlayer.seekToPlayer(addSecs);
    } else {
      const subSecs = Math.round(currentPosition - 1000);
      this.audioRecorderPlayer.seekToPlayer(subSecs);
    }
  };

  private onStartRecord = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        console.log('write external storage', grants);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('permissions granted');
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }

    const audioSet: AudioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };

    const date = new Date().getTime();
    const path = `data/user/0/com.alertyou/cache/${date}.mp4`;
    this.setState({ path });

    const uri = await this.audioRecorderPlayer.startRecorder(
      this.state.path,
      audioSet,
    );
    this.setState({ uri });
    this.setState({
      isRecording: true,
      isShowStartRecord: false,
      isShowPauseRecord: true,
      isShowStopRecord: true,
    });

    this.audioRecorderPlayer.addRecordBackListener((e: RecordBackType) => {
      this.setState({
        recordSecs: e.currentPosition,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.currentPosition),
        ),
      });
      if (this.state.recordSecs > 180000) {
        this.onStopRecord();
      }
    });
  };

  private onPauseRecord = async () => {
    try {
      await this.audioRecorderPlayer.pauseRecorder();
    } catch (err) {
      console.log('pauseRecord', err);
    }

    this.setState({
      isRecording: false,
      isShowPauseRecord: false,
      isShowResumeRecord: true,
    });
  };

  private onResumeRecord = async () => {
    await this.audioRecorderPlayer.resumeRecorder();
    this.setState({
      isRecording: true,
      isShowResumeRecord: false,
      isShowPauseRecord: true,
    });
  };

  private onStopRecord = async () => {
    const result = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    if (this.props.isEmergency) {
      this.setState({
        isRecording: false,
        recordSecs: 0,
        playTime: '00:00:00',
        duration: this.state.recordTime,
      });
      this.onReportAudio();
    } else {
      this.setState({
        isRecording: false,
        recordSecs: 0,
        playTime: '00:00:00',
        duration: this.state.recordTime,
        page: 1,
      });
    }
  };

  private onStartPlay = async () => {
    this.onStopPlay();
    const msg = await this.audioRecorderPlayer.startPlayer(this.state.path);
    const volume = await this.audioRecorderPlayer.setVolume(1.0);
    console.log(`file: ${msg}`, `volume: ${volume}`);
    await this.setState({
      isShowStartPlay: false,
      isShowPausePlay: true,
    });

    this.audioRecorderPlayer.addPlayBackListener((e: PlayBackType) => {
      if (e.currentPosition === e.duration) {
        console.log('finished');
        this.audioRecorderPlayer.stopPlayer();
        this.setState({
          isShowStartPlay: true,
          isShowPausePlay: false,
        });
      }
      this.setState({
        currentPositionSec: e.currentPosition,
        currentDurationSec: e.duration,
        playTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.currentPosition),
        ),
        duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
    });
  };

  private onPausePlay = async () => {
    await this.audioRecorderPlayer.pausePlayer();
    await this.setState({
      isShowPausePlay: false,
      isShowStartPlay: true,
      isShowResumePlay: true,
    });
  };

  private onResumePlay = async () => {
    await this.audioRecorderPlayer.resumePlayer();
    await this.setState({
      isShowResumePlay: false,
      isShowPausePlay: true,
      isShowStartPlay: true,
    });
  };

  private onStopPlay = async () => {
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
  };

  private onRestartRecord = async () => {
    this.onStopPlay();
    await this.setState({
      isLoggingIn: false,
      isRecording: false,
      recordSecs: 0,
      recordTime: '00:00:00',
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00',
      path: '',
      uri: '',

      isShowStartRecord: true,
      isShowPauseRecord: false,
      isShowResumeRecord: false,
      isShowStopRecord: false,

      isShowStartPlay: true,
      isShowPausePlay: false,
      isShowResumePlay: false,
      isShowStopPlay: false,
      isShowRestartRecord: true,
      isShowReportAudio: true,
    });
    await this.setState({
      page: 0,
    })
    console.log('돌아간다.', this.state);
  };

  private onChangeIsLoading = async (bool:boolean) => {
    this.setState({
      isLoading: bool
    })
  }

  private onReportAudio = async () => {
    this.onChangeIsLoading(true);
    if (this.state.uri) {
      const responseStatus = await reportFile(this.state.uri);
      if (responseStatus === 200 || responseStatus === 201) {
        this.setState({
          isReported: true
        })
        this.state.navigation.navigate('HomeScreen');
        Toast.show(reportAudioSuccessToastProps);
      } else {
        Toast.show(reportAudioFailureToastProps);
      }
    } else {
      Toast.show(reportAudioFailureToastProps);
    }
    this.onChangeIsLoading(false);
  };

  public render() {
    let playWidth;
    if (this.state.page) {
      playWidth = (this.state.currentPositionSec / this.state.currentDurationSec) *
        (screenWidth - 32 - 56);
    } else {
      playWidth = (this.state.recordSecs / (180 * 1000)) *
        (screenWidth - 32 - 56);
    }


    if (!playWidth) {
      playWidth = 0;
    }

    // props
    const startRecordProps = {
      name: 'record',
      onPress: this.onStartRecord,
      isShow: this.state.isShowStartRecord,
    };
    const pauseRecordProps = {
      name: 'pause',
      onPress: this.onPauseRecord,
      isShow: this.state.isShowPauseRecord,
    };
    const resumeRecordProps = {
      name: 'record',
      onPress: this.onResumeRecord,
      isShow: this.state.isShowResumeRecord,
    };
    const stopRecordProps = {
      name: 'stop',
      onPress: this.onStopRecord,
      isShow: this.state.isShowStopRecord,
    };

    const startPlayProps = {
      name: 'play',
      onPress: this.onStartPlay,
      isShow: this.state.isShowStartPlay,
    };
    const pausePlayProps = {
      name: 'pause',
      onPress: this.onPausePlay,
      isShow: this.state.isShowPausePlay,
    };
    const resumePlayProps = {
      name: 'redo',
      // name: 'play',
      onPress: this.onResumePlay,
      isShow: this.state.isShowResumePlay,
    };
    const stopPlayProps = {
      name: 'stop',
      onPress: this.onStopPlay,
      isShow: this.state.isShowStopPlay,
    };

    const restartRecordProps = {
      name: 'refresh',
      onPress: this.onRestartRecord,
      isShow: this.state.isShowRestartRecord,
    };
    const reportAudioProps = {
      name: 'email-send-outline',
      onPress: this.onReportAudio,
      isShow: this.state.isShowReportAudio,
    };

    return (
      <View style={styles.container}>
        {this.state.isLoading ? <LoadingView /> : <></>}
        <VStack bg={this.props.isEmergency ? emergencyBgStyle : nonEmergencyBgStyle} style={styles.innerContainer}>
          {!this.state.page ? (
            <View style={styles.viewContainer}>
              <Lottie
                style={styles.lottie}
                source={require("@/assets/lottie/mic-on")}
                autoPlay={true}
                loop={true}
              />
              <Pressable
                style={styles.viewBarWrapper}>
                <View style={styles.viewBar}>
                  <View style={[styles.viewBarPlay, { width: playWidth }]} />
                </View>
              </Pressable>

              <Text style={styles.counterTxt}>{this.state.recordTime.slice(0, 5)} / 03:00</Text>
              <View style={styles.btnWrapper}>
                <AudioBtn props={startRecordProps} />
                <AudioBtn props={pauseRecordProps} />
                <AudioBtn props={resumeRecordProps} />
                <AudioBtn props={stopRecordProps} />
              </View>
            </View>
          ) : (
            <View style={styles.viewContainer}>
              <Lottie
                style={styles.lottie}
                source={require("@/assets/lottie/mic-wave")}
                autoPlay={true}
                loop={true}
              />
              <Pressable
                style={styles.viewBarWrapper}
                onPress={this.onStatusPress}>
                <View style={styles.viewBar}>
                  <View style={[styles.viewBarPlay, { width: playWidth }]} />
                </View>
              </Pressable>

              <Text style={styles.counterTxt}>{this.state.playTime.slice(0, 5)} / {this.state.duration.slice(0, 5)}</Text>

              <View style={styles.btnWrapper}>
                <AudioBtn props={startPlayProps} />
                <AudioBtn props={pausePlayProps} />
                <AudioBtn props={resumePlayProps} />
                <AudioBtn props={stopPlayProps} />
                <AudioBtn props={restartRecordProps} />
                <AudioBtn props={reportAudioProps} />
              </View>
            </View>
          )}
        </VStack>
      </View>
    );
  }
}

export default Audio;
