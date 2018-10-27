package com.claude.wmall.commons.utils;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.web.servlet.view.AbstractView;

public class GridView<T> extends AbstractView {
  
	public Carrier<T> pager;
	
	private GridView(){}
	
	public GridView(Carrier<T> pager){
		this.pager  = pager;
	}
	
	@Override
	protected void renderMergedOutputModel(Map<String, Object> model,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		  try {
				JSONArray jsonArray = new JSONArray();
				if (pager.getResult() != null) {
						for (Object obj : pager.getResult()) {
							if(obj instanceof Jsonable){
								jsonArray.add(((Jsonable) obj).getJsonObject());
							}
						}
				}
				JSONObject jsonObj = new JSONObject();
				jsonObj.put("page", pager.getCurrentPage());
				jsonObj.put("total", pager.getTotalPage());
				jsonObj.put("records", pager.getTotalSize());
				jsonObj.put("data", jsonArray.toString());
				response.setContentType("text/json; charset=UTF-8");
				response.getWriter().write(jsonObj.toString());
			} catch (Exception e) {
				e.printStackTrace();
			}
	}

}
