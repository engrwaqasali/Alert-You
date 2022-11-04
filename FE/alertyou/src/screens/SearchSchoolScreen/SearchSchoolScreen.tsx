import { FlatList, Pressable, View, Keyboard } from 'react-native';
import React, {Suspense, useEffect, useState} from 'react';
import {Input, ScrollView, SearchIcon, Spinner} from 'native-base';
import {useQuery} from '@tanstack/react-query';
import axios, {AxiosError} from 'axios';
import ErrorBoundary from 'react-native-error-boundary';

import {MAIN} from '@/theme/colorVariants';

import {styles} from './style';
import {SchoolInfo} from './components';
import {requestSchoolData} from './apis';
import {schoolResponseType, schoolInfoType} from './types';
import { useRecoilValue } from 'recoil';
import { classListState } from '@/store/signUpState';

const SearchSchoolScreen = () => {
  const [school, setSchool] = useState<string>('');
  const classList = useRecoilValue(classListState)
  //리턴값, 에러, data에 담길 데이터, 쿼리 키 타입
  const {data, refetch} = useQuery<
    schoolResponseType,
    AxiosError,
    schoolResponseType,
    [string]
  >(['schoolList'], () => requestSchoolData(school), {
    suspense: true,
    enabled: false,
    cacheTime: 0,
  });

  const getSchoolList = (): void => {
    Keyboard.dismiss();
    refetch();
  }

  const changeSchool = (e: string): void => {
    setSchool(e);
  };

  //선택 시, 해당 정보를 가지고 뒤돌아가기
  return (
    <ErrorBoundary>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Input
            type="text"
            // rounded="md"
            variant="underlined"
            placeholder="ex) 싸피고등학교"
            size="md"
            color={MAIN.mainFont}
            focusOutlineColor={MAIN.red}
            InputRightElement={
              <Pressable onPress={getSchoolList}>
                <SearchIcon mr="3" size="md" />
              </Pressable>
            }
            autoCorrect={false}
            onChangeText={changeSchool}
            onSubmitEditing={getSchoolList}
          />
        </View>
        {/* flatList + 아무것도 없다면 검색하시오 띄우기 */}
        <View style={styles.schoolListContainer}>
          <Suspense fallback={<Spinner color={MAIN.red} size="lg" />}>
            <ScrollView>
              {data?.schools.map((item, idx) => {
                return <SchoolInfo address={item.address} name={item.name} key={`schoolKey ${idx}`}/>
              })}
            </ScrollView>
          </Suspense>
        </View>
      </View>
    </ErrorBoundary>
  );
};

export default SearchSchoolScreen;
