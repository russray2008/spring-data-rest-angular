package com.home.russ.springservice;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by rray on 4/16/15.
 */
@Controller
public class HomeController {

    @RequestMapping("/home")
    public String home(){
        return "index";
    }
}
