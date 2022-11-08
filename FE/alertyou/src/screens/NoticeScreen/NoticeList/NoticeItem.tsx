import { View } from 'native-base'
import React, { useCallback } from 'react'
import { Pressable } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { noticeItemType } from '@/types'
import { FlatListItem } from '@/components'
import { WHITE, RED } from '@/theme/colorVariants'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { NoticeParamList } from '@/navigations/NoticeNavigation/NoticeNavigation'
import { checkNotice } from '../api'
import { useMutation } from '@tanstack/react-query'

const NoticeItem: React.FC<{ item: noticeItemType; read: boolean }> = ({ item, read }) => {
  const navigation = useNavigation<NavigationProp<NoticeParamList>>()

  let notice: string = ''
  let uri: string = ''
  let bgColor: string = WHITE.white
  if (item.isVictim) {
    notice = '구조요청이 도착했습니다!'
    uri = "https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"

  } else if (!item.isVictim) {
    notice = '목격자 제보가 도착했습니다!'
    uri = "https://images.unsplash.com/photo-1435348773030-a1d74f568bc2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"

  }
  const date = new Date()

  const writeDay = new Date(item.noticeDateTime)
  let dif = date.getTime() - writeDay.getTime()
  dif = Math.trunc(dif / 1000);
  // 초 
  const seconds = 1;
  // 분
  const minute = seconds * 60;
  // 시
  const hour = minute * 60;
  // 일
  const day = hour * 24;

  let subTitle = '방금 전'
  if (dif < hour) {
    subTitle = Math.trunc(dif / minute) + '분 전';
    //시보다 작으면 몇분전인지
  } else if (dif < day) {
    subTitle = Math.trunc(dif / hour) + '시간 전 ';
    //일보다 작으면 몇시간전인지 
  } else {
    subTitle = item.noticeDateTime
  }

  const checkMutation = useMutation(checkNotice, {
    onError: (error) => {
      console.log(error)
    },
    onSuccess: (data) => {
      console.log("success");
    },
  }
  )
  const onClick = useCallback(() => {
    checkMutation.mutate(item.alertId)
    navigation.navigate('NoticeMap', { reportId: item.reportId })
  }, [navigation]);

  let icon = <View>
    <MaterialCommunityIcons
      name="account-group"
      size={32}
      color={RED.red400} />
  </View>
  if (item.isVictim) {
    icon = <View>
      <MaterialCommunityIcons
        name='bell-alert'
        size={32}
        color={RED.red400} />
    </View>
  }

  if (!read) {
    if (item.isVictim) {
      bgColor = RED.red700
    } else if (!item.isVictim) {
      bgColor = RED.red500
    }
  }

  return (
    <View>
      <Pressable onPress={onClick}>
        <FlatListItem
          title={notice}
          subTitle={subTitle}
          bgColor={bgColor}
          rightContent=''
          bdColor={RED.red300}
          bdbColor=''
          cbgColor={RED.redBg}
          bdWidth={0}
          icon={icon} />
      </Pressable>
    </View>
  )
}

export default NoticeItem