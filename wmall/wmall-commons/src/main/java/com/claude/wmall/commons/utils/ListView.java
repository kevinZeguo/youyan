package com.claude.wmall.commons.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.web.servlet.view.AbstractView;

/**
 * Description: 描述该类的功能
 * @author 
 *
 */
public class ListView<T> extends AbstractView {

	private List<T> list ;
	
	/**
	 * 
	 * Description: 封装默认构造方法s
	 */
	private ListView(){}
	
	public ListView(List<T> list){
		this.list = list;
	}
	
	@Override
	protected void renderMergedOutputModel(Map<String, Object> model,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		try {
			JSONArray jsonArray = new JSONArray();
			if(list == null){
				list = new ArrayList<T>();
			}
			for (Object obj : list) {
				if(obj instanceof Jsonable){
					jsonArray.add(((Jsonable) obj).getJsonObject());
				}
			}
			JSONObject jsonObj = new JSONObject();
			jsonObj.put("data", jsonArray.toString());
			response.setContentType("text/json; charset=UTF-8");
			response.getWriter().write(jsonObj.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
