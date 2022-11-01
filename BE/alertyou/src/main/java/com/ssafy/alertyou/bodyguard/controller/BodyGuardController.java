package com.ssafy.alertyou.bodyguard.controller;

import com.ssafy.alertyou.bodyguard.dto.BodyGuardReqDto;
import com.ssafy.alertyou.bodyguard.service.BodyGuardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/bodyguard")
public class BodyGuardController {
    private final BodyGuardService bodyGuardService;

    @PostMapping("")
    public ResponseEntity<Map<String, Object>> BodyGuardSave(@RequestBody BodyGuardReqDto bodyGuardReqDto) throws Exception {
        return bodyGuardService.addBodyGuard(bodyGuardReqDto);
    }

    @GetMapping(value = "/list")
    public ResponseEntity<Map<String, Object>> BodyGuardList(@RequestParam("userId") long id) throws Exception{
        return bodyGuardService.getBodyGuard(id);
    }
}
