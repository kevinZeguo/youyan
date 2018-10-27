package com.claude.wmall.web.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.claude.wmall.commons.dao.Constants;
import com.claude.wmall.shopping.domain.User;

@Controller
@RequestMapping("/webFrame")
public class WebFrameController {

	@RequestMapping(value = "mainIndex")
	public String mainIndex(Model model) {
		return "webFrame/mainIndex";
	}

	@RequestMapping(value = "productsShow")
	public String productsShow(Model model) {
		return "test/productsShow";
	}

	@RequestMapping(value = "products")
	public String products(Model model) {
		return "test/products";
	}

	@RequestMapping(value = "mainFrame")
	public String mainFrame(Model model, HttpServletRequest request) {
		try {
			User user = (User) request.getSession().getAttribute(
					Constants.USER_KEY);
			if (user==null||user.getID() == null) {
				// message = "您尚未登录，请登录系统后继续操作！";
				return "user/login";
			}
		} catch (Exception e) {
			return "user/login";
		}
		return "webFrame/mainFrame";
	}

	@RequestMapping(value = "denglu")
	public String denglu(Model model) {
		return "test/denglu";
	}
	
	@RequestMapping(value = "shopIndex")
	public String shopIndex(){
		return "pc/shopIndex.jsp";
	}
}
