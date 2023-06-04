package com.aakivaa.emss.controller;

import com.aakivaa.emss.dto.ResponseDto;

public class BaseController {

    public ResponseDto successResponse(String message, Object data){
        return ResponseDto.builder()
                .status(true)
                .message(message)
                .data(data)
                .build();
    }

    public ResponseDto errorResponse(String message, Object data){
        return ResponseDto.builder()
                .status(false)
                .message(message)
                .data(data)
                .build();
    }
}
