package com.claude.wmall.web.interceptor;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.claude.wmall.shopping.exception.NullSessionUserException;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;


public class WebExeptionResolver implements HandlerExceptionResolver {
	public final Log log = LogFactory.getLog(getClass());
	@Override
	public ModelAndView resolveException(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex) {
		log.debug(ex.getMessage());
		ModelAndView mv =null;
		Map<String,String> model = new HashMap<String,String>();
		if(ex instanceof NullSessionUserException){
			model.put("message", ex.getMessage());
			mv = new ModelAndView("user/login", model);
			 //response.sendRedirect(request.getContextPath()+"/user/rLogin.do");  
		}else{
			mv = new ModelAndView("exception/404");
		}
		return mv;
	}
}