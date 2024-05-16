package com.lewkowicz.savings.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

    @RequestMapping({"/", "/other-path1/**", "/other-path2/**"})
    public String index() {
        return "forward:/index.html";
    }

}
