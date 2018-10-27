package com.claude.wmall.commons.utils;

import java.util.Locale;

import org.springframework.beans.factory.DisposableBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;
import org.springframework.web.servlet.LocaleResolver;

@Component("AppContextUtil")
@Lazy(false)
public class ApplicationContextUtil implements DisposableBean,
		ApplicationContextAware {
	private static ApplicationContext context;

	// private static Hawthorn hawthorn;

	public void setApplicationContext(ApplicationContext applicationContext) {
		context = applicationContext;
		// ProcessEngineFactoryBean.getProcessEngineConfiguration();
		// try {
		// hawthorn = new Hawthorn("/hawthorn.xml");
		// } catch (StartupException e) {
		// // TODO Auto-generated catch block
		// e.printStackTrace();
		// }
	}

	public void destroy() {
		context = null;
		// hawthorn.close();
	}

	public static ApplicationContext getApplicationContext() {
		return context;
	}

	public static Object getBean(String name) {
		Assert.hasText(name);
		return context.getBean(name);
	}

	public static <T> T getBean(String name, Class<T> type) {
		Assert.hasText(name);
		Assert.notNull(type);
		return context.getBean(name, type);
	}

	public static <T> T getBean(Class<T> type){
		Assert.notNull(type);
		return context.getBean(type);
	}
	public static String getMessage(String code, Object[] args) {
		LocaleResolver localLocaleResolver = (LocaleResolver) getBean(
				"localeResolver", LocaleResolver.class);
		Locale localLocale = localLocaleResolver.resolveLocale(null);
		return context.getMessage(code, args, localLocale);
	}

	public static String getMessage(String code) {
		return getMessage(code, null);
	}
}
