package com.ssafy.alertyou.school.service;
import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.account.repository.UserRepository;
import com.ssafy.alertyou.account.service.AuthRefreshTokenService;
import com.ssafy.alertyou.account.service.UserService;
import com.ssafy.alertyou.school.entity.School;
import com.ssafy.alertyou.school.repository.SchoolRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.assertj.core.api.Assertions.*; // junit4??
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.Map;

@SpringBootTest
public class TeacherServiceTest {

    @Autowired
    private TeacherService teacherService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SchoolRepository schoolRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;


    @Autowired
    private AuthRefreshTokenService authRefreshTokenService;

    @AfterEach
    public void delete(){
        userRepository.deleteAll();
    }

    @Test
    @DisplayName("선생님 반 리스트 조회 : 토큰")
    public void getStudentListByToken() throws Exception {
        School school = schoolRepository.save(toSchool(1,"5"));
        User teacher = userRepository.save(toEntity("teacher", "01000000000", school));
        userRepository.save(toEntity("student", "01011111111", school));
        String token = authRefreshTokenService.createAccessToken(teacher.getPhone());

        ResponseEntity<Map<String, Object>> res = teacherService.getClasses(token,null,null);

        assertThat(res.getStatusCode().equals(200));
    }

    @Test
    @DisplayName("선생님 반 리스트 조회 : 학년&반")
    public void getStudentListByGradeAndClassRoom() throws Exception {
        School school = schoolRepository.save(toSchool(1,"6"));
        User teacher = userRepository.save(toEntity("teacher", "01000000000", school));
        ResponseEntity<Map<String, Object>> res = teacherService.getClasses(null,1,"6");
        assertThat(res.getStatusCode().equals(200));
    }

    @Test
    @DisplayName("선생님 학생 조회")
    public void getStudent() throws Exception {
        School school = schoolRepository.save(toSchool(1,"6"));
        User teacher = userRepository.save(toEntity("teacher", "01000000000", school));
        Long id = userRepository.save(toEntity("student", "01011111111", school)).getId();
        ResponseEntity<Map<String, Object>> res = teacherService.getStudent(id);
        assertThat(res.getStatusCode().equals(200));
    }

    @Test
    @DisplayName("선생님 학생 정보 삭제")
    public void removeStudent() throws Exception {
        School school = schoolRepository.save(toSchool(1,"7"));

        Long id = userRepository.save(toEntity("student", "01011111111", school)).getId();

        ResponseEntity<Map<String, Object>> res = teacherService.removeStudent(id);
        assertThat(res.getStatusCode().equals(200));
    }

    public User toEntity(String role, String phone, School school){
            return User.builder()
                    .school(school)
                    .users(new ArrayList<>())
                    .opGuards(new ArrayList<>())
                    .teachers(new ArrayList<>())
                    .coGuards(new ArrayList<>())
                    .reUsers(new ArrayList<>())
                    .userList(new ArrayList<>())
                    .password("0000")
                    .role(role)
                    .username("test")
                    .phone(phone)
                    .active(true)
                    .build();
    }

    public School toSchool(int grade, String classRoom){
        return School.builder()
                .address("덕명동")
                .classRoom(classRoom)
                .grade(grade)
                .name("싸피고등학교")
                .region("대전")
                .users(new ArrayList<>())
                .build();
    }

}
