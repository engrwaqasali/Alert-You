import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {Flex, Badge, ChevronRightIcon, Divider} from 'native-base';
import {useSetRecoilState} from 'recoil';
import {AxiosError} from 'axios';
import {useQuery} from '@tanstack/react-query';

import {classListState, schoolState} from '@/store/signUpState';
import {useNavigation} from '@react-navigation/native';

import {styles} from './style';
import {gradeClassType} from './types';
import {requestGradeClass} from './apis';
import {failedFetchGrade} from './functions';

type Props = {
  address: string;
  name: string;
  idx: number;
};

const SchoolInfo = ({address, name, idx}: Props) => {
  const navigation = useNavigation<any>();
  const setClassList = useSetRecoilState(classListState);
  const setPickSchool = useSetRecoilState(schoolState);
  const {refetch} = useQuery<gradeClassType, AxiosError>(
    ['classGrade', idx],
    () => requestGradeClass(name, address),
    {
      suspense: true,
      enabled: false,
      cacheTime: 0,
      onSuccess: value => {
        setClassList(value.classes);
        setPickSchool({name, address});
        navigation.navigate('SignUp', {screen: 'SignUpScreen'});
      },
      onError: () => {
        failedFetchGrade();
      },
    },
  );

  //선택한 학교 저장, 학급 및 반 요청 후 이전 페이지로 이동
  const getGradeAndClass = (): void => {
    refetch();
  };

  return (
    <>
      <Pressable onPress={getGradeAndClass}>
        <View style={styles.container}>
          <View>
            <Flex w="100%" direction="row" alignItems="center">
              <Text style={styles.schoolText}>{name}</Text>
            </Flex>
            <Flex w="100%" direction="row" alignItems="center" mt={2}>
              <Badge colorScheme="warning" ml={1}>
                주소
              </Badge>
              <Text style={styles.schoolAddress}>{address}</Text>
            </Flex>
          </View>
          <ChevronRightIcon mr="3" size="md" />
        </View>
        <Divider mt="3" mb="3" />
      </Pressable>
    </>
  );
};

export default SchoolInfo;
