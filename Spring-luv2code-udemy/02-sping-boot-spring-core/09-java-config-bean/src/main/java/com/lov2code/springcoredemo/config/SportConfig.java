package com.lov2code.springcoredemo.config;

import com.lov2code.springcoredemo.common.Coach;
import com.lov2code.springcoredemo.common.SwimCoach;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SportConfig {

    //Bean id=aquatic
    @Bean("aquatic")
    public Coach swimCoach() {
        return new SwimCoach();
    }
}
