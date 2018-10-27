package com.claude.wmall.web.controller;


import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.claude.wmall.commons.utils.SuccessFailView;
import com.claude.wmall.shopping.domain.SysConfig;
import com.claude.wmall.shopping.service.SysConfigService;

@Controller
@RequestMapping("/sysConfig")
public class SysConfigController {

	@Autowired()
	private SysConfigService sysconfigService;
	
	public void SysConfigService(SysConfigService sysconfigService) {
		this.sysconfigService = sysconfigService;
	}

	@RequestMapping(value = "list")
	public View list(HttpServletRequest request) {
		String vKeyword=request.getParameter("vKeyword");
		List<SysConfig> sysconfig = this.sysconfigService.getSysConfigList(vKeyword);
		return new SuccessFailView(sysconfig);
	}

}
