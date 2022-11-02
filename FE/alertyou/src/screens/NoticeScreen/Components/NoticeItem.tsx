import { View, Text } from 'native-base'
import React from 'react'
import { noticeListType } from '@/types'
import { FlatListItem } from '@/components'
import { WHITE, RED, MAIN } from '@/theme/colorVariants'
import { Pressable } from 'react-native'

const NoticeItem: React.FC<{ item: noticeListType }> = ({ item }) => {
  let notice: string = ''
  let uri: string = ''
  if (item.isVictim) {
    notice = '구조요청이 도착했습니다!'
    uri = "https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"

  } else if (!item.isVictim) {
    notice = '목격자 제보가 도착했습니다!'
    uri = "https://images.unsplash.com/photo-1435348773030-a1d74f568bc2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"

  }

  let bgColor: string = WHITE.white
  if (item.isVictim && !item.checked) {
    bgColor = RED.red700
  } else if (!item.isVictim && !item.checked) {
    bgColor = MAIN.red
  }
  const date = new Date()
  // const year = date.getFullYear()
  // const month = ("0" + (1 + date.getMonth())).slice(-2);
  // const day = ("0" + date.getDate()).slice(-2);
  // const todayDate = year + "-" + month + "-" + day;

  const writeDay = new Date(item.noticeDate)
  let dif = date.getTime() - writeDay.getTime()
  dif = Math.trunc(dif / 1000);
  console.log(writeDay.getTime())
  // 초 
  const seconds = 1;
  // 분
  const minute = seconds * 60;
  // 시
  const hour = minute * 60;
  // 일
  const day = hour * 24;
  // 달
  const mon = day * 30;

  let subTitle = '방금 전'
  if (dif < hour) {
    subTitle = Math.trunc(dif / minute) + '분 전';
    //시보다 작으면 몇분전인지
  } else if (dif < day) {
    subTitle = Math.trunc(dif / hour) + '시간 전 ';
    //일보다 작으면 몇시간전인지 
  } else if (dif < mon) {
    subTitle = Math.trunc(dif / day) + '일 전';
    //달보다 작으면 몇일 전인지
  }

  return (
    <View>
      <Pressable>
        <FlatListItem
          title={notice}
          subTitle={subTitle}
          bgColor={bgColor}
          rightContent=''
          uri={uri} />
      </Pressable>
    </View>
  )
}

export default NoticeItem