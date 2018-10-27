package com.claude.wmall.commons.utils;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.springframework.web.servlet.view.AbstractView;

/**
 * Description: 描述该类的功能
 * @author huzi
 *
 */
public class SuccessFailView extends AbstractView {

	public Boolean result;
	
	public List list;
	
	public Object object;
	
	public String status;

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	private Long id;

	public String getMessage() {
		return message;
	}
	public Boolean getResult() {
		return result;
	}
	public void setMessage(String message) {
		this.message = message;
	}

	private String message;

	private String returnType = "json"; //返回类型

	private String secondMessage; //日志带两个占位符参数，动态赋值

	private SuccessFailView() {}

	public SuccessFailView(Boolean result) {
		this.result = result;
	}
	
	public SuccessFailView(List list) {
		this.list = list;
	}
	
	public SuccessFailView(Object object) {
		this.object = object;
	}
	
	public SuccessFailView(Object object,String status) {
		this.object = object;
		this.status = status;
	}
	
	public SuccessFailView(Boolean result,Object object,String message) {
		this.result = result;
		this.object = object;
		this.message = message;
	}
	public SuccessFailView(Boolean result,List list,String message) {
		this.result = result;
		this.list = list;
		this.message = message;
	}
	public SuccessFailView(Boolean result,List list,Object object,String message) {
		this.result = result;
		this.list = list;
		this.object = object;
		this.message = message;
	}
	public SuccessFailView(String status) {
		this.status = status;
	}

	public SuccessFailView(Boolean result, Long id) {
		this.result = result;
		this.id = id;
	}

	public SuccessFailView(Boolean result, Long id, String returnType) {
		this.result = result;
		this.id = id;
		this.returnType = returnType;
	}

	/**
	 * Description: 
	 * @param result: 是否成功
	 * @param id ： 保存对象的ID（日志带第一个占位符参数动态赋值）
	 * @param returnType ： SuccessFailView返回类型
	 * @param secondMessage：日志带第二个占位符参数动态赋值
	 */
	public SuccessFailView(Boolean result, Long id, String returnType, String secondMessage) {
		this.result = result;
		this.id = id;
		this.returnType = returnType;
		this.secondMessage = secondMessage;
	}

	public SuccessFailView(Boolean result, String message) {
		this.result = result;
		this.message = message;
	}

	public SuccessFailView(Boolean result, String message, String returnType) {
		this.result = result;
		this.message = message;
		this.returnType = returnType;
	}

	@Override
	protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("result", result);
		jsonObject.put("list", list);
		jsonObject.put("status", status);
		jsonObject.put("object", object);
		if (id != null) {
			jsonObject.put("id", id);
		}
        if (message != null) {
            jsonObject.put("message", message);
        }
        if (secondMessage != null) {
            jsonObject.put("secondMessage", secondMessage);
        }
		response.setContentType("text/" + returnType + ";charset=UTF-8");
		response.getWriter().write(jsonObject.toString());
	}

	/**
	 * Description: 描述该方法的功能
	 * @return the id
	 */
	public Long getId() {
		return id;
	}


	/**
	 * Description: 获取日志带两个占位符参数值
	 * @return the secondMessage
	 */
	public String getSecondMessage() {
		return secondMessage;
	}

}
