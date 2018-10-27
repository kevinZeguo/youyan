package com.claude.wmall.web.interceptor;

import com.claude.wmall.commons.dao.Constants;
import com.claude.wmall.shopping.exception.NullSessionUserException;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class AccessHandlerInterceptorAdapter extends HandlerInterceptorAdapter {

	private boolean enabled;

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		if (this.isEnabled()) {
			 String url=request.getRequestURL().toString();    
			 System.out.println(url);
			 for(String urlNoLogin : Constants.NO_NEED_LOGIN_PAGE)
			 {
				if( url.contains(urlNoLogin))
				{
					return true;
				}
			 }
			// 连登录页面，商品首页都会强制跳转登录页面，所以不可以用
			Object user = request.getSession().getAttribute(Constants.USER_KEY);
			if (user == null) {
				// response.sendRedirect(request.getContextPath()+"/user/rLogin.do");
				throw new NullSessionUserException("当前登录用户超时，请重新登录！");
			}
		}

		return true;
		// Object obj = request.getSession().getAttribute(Constants.USER_KEY);
		// if (null == obj) { // 未登录
		// if (request.getHeader("x-requested-with") != null
		// && request.getHeader("x-requested-with").equalsIgnoreCase(
		// "XMLHttpRequest")) {
		// // 如果是ajax请求响应头会有，x-requested-with
		// response.setHeader("sessionstatus", "timeout");// 在响应头设置session状态
		// } else {
		// response.sendRedirect(request.getContextPath()
		// + "/user/rLogin.do");
		// }
		// return false;
		// }
		// return super.preHandle(request, response, handler);

	}

	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		super.postHandle(request, response, handler, modelAndView);
	}

	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		super.afterCompletion(request, response, handler, ex);
	}
}
