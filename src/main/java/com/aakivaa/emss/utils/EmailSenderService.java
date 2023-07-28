package com.aakivaa.emss.utils;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.util.Date;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor

@Service
public class EmailSenderService {
    @Autowired
    private JavaMailSender mailSender;

    public String sendEmail(String toEmail,String subject,String body){
        Date date = new Date();
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom("svenuebooking.spad@gmail.com");
        mailMessage.setTo(toEmail);
        mailMessage.setSubject(subject);
        mailMessage.setText(body);
        mailMessage.setSentDate(date);
        mailSender.send(mailMessage);
        return "Mail Sent Successfully.....!!!";
    }
}
