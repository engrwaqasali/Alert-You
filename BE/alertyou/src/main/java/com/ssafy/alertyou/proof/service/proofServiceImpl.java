package com.ssafy.alertyou.proof.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.account.jwt.JwtProperties;
import com.ssafy.alertyou.account.jwt.JwtTokenProvider;
import com.ssafy.alertyou.account.repository.UserRepository;
import com.ssafy.alertyou.proof.config.S3Util;
import com.ssafy.alertyou.proof.dto.ProofListResDto;
import com.ssafy.alertyou.proof.entity.Proof;
import com.ssafy.alertyou.proof.repository.ProofRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class proofServiceImpl implements ProofService {
    private final S3Util s3Util;
    private final String IMAGE = "image";
    private final String AUDIO = "audio";
    private final String SUCCESS = "SUCCESS";
    private final String FAIL = "FAIL";
    private final ProofRepository proofRepository;
    private final UserRepository userRepository;
    public ResponseEntity<Map<String, Object>> uploadProof(String token, MultipartFile file) throws Exception{
        Map<String, Object> result = new HashMap<>();
        HttpStatus status;
        String type = new String();
        Boolean ctype = null;
        String endPoint = file.getContentType();
        User user = findUserByPhone(decodeToken(token));
        String uId = String.valueOf(user.getId());
        if (file.getContentType().contains("image")){
             type = IMAGE;
             ctype = true;
        }else if (file.getContentType().contains("audio")){
             type = AUDIO;
             ctype = false;
        }
        String url = s3Util.upload(file,type+"/"+uId);
        try {
            Long res = proofRepository.save(toEntity(user, url,ctype,endPoint)).getId();
            result.put("msg",SUCCESS);
            status = HttpStatus.CREATED;
        } catch (Exception e){
            result.put("mgs",FAIL);
            result.put("error",e.getStackTrace());
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<>(result, status);
    }

    public ResponseEntity<byte[]> downloadProof(Long id) throws IOException {
        Proof proof = findProof(id);
        String key = null;
        if (proof.getCtype().booleanValue() == true){
            key = proof.getUrl().substring(proof.getUrl().lastIndexOf("image"));
        } else if (proof.getCtype().booleanValue() == false) {
            key = proof.getUrl().substring(proof.getUrl().lastIndexOf("audio"));
        }
        String url = URLDecoder.decode(key, "UTF-8");
        return s3Util.download(url,proof.getEndPoint());
    }

    public ResponseEntity<Map<String, Object>> getProof(String token, long id) throws Exception{

        User teacher = findUserByPhone(decodeToken(token));
        HttpStatus status = null;
        Map<String, Object> result = new HashMap<>();
        if (teacher.isActive() == true && teacher.getRole().equals("teacher")){
            List<Proof> entityList = proofRepository.findAllByUserOrderByCreatedAtDesc(findUser(id));
            List<ProofListResDto> list = new ArrayList<>();
            for (Proof proof : entityList){
                list.add(new ProofListResDto(proof));
            }
            if (!list.isEmpty()){
                result.put("msg",SUCCESS);
                result.put("proofs", list);
                status = HttpStatus.OK;
            } else if(list.isEmpty()){
                result.put("mgs",FAIL);
                status = HttpStatus.BAD_REQUEST;
            }
        } else {
            result.put("msg",FAIL);
            status = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(result, status);
    }

    public Proof toEntity(User user, String url, Boolean ctype, String endPoint){
        return Proof.builder()
                .user(user)
                .ctype(ctype)
                .url(url)
                .endPoint(endPoint)
                .createdAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")).toString())
                .build();
    }

    public Proof findProof(Long id){
        return proofRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Proof Not Found"));
    }

    public User findUser(long id){
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User Not Found"));
    }

    public User findUserByPhone(String phone){
        return userRepository.findByPhone(phone);
    }

    public String decodeUrl(String url) throws UnsupportedEncodingException {
        return  URLDecoder.decode(url, "UTF-8");
    }

    public String decodeToken(String token) throws Exception{
        JWTVerifier jwtVerifier = JwtTokenProvider.getVerifier(); // 토큰 검증을 실시
        DecodedJWT decodedJWT = jwtVerifier.verify(token.replace(JwtProperties.TOKEN_PREFIX, "")); // 토큰에서 Bearer 를 제거함
        return decodedJWT.getSubject(); // 디코딩한 JWT 토큰에서 핸드폰 번호를 가져옴
    }

}
