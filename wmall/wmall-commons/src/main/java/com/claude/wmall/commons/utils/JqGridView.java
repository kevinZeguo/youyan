package com.claude.wmall.commons.utils;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.web.servlet.view.AbstractView;

public class JqGridView<T> extends AbstractView {
  
	public Carrier<T> pager;
	
	private JqGridView(){}
	
	public JqGridView(Carrier<T> pager){
		this.pager  = pager;
	}
	
	@Override
	protected void renderMergedOutputModel(Map<String, Object> model,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		  try {
				JSONArray jsonArray = new JSONArray();
				jsonArray=JSONArray.fromObject(pager.getResult());
//				if (pager.getResult() != null) {
//						for (Object obj : pager.getResult()) {
//							if(obj instanceof Jsonable){
//								jsonArray.add(((Jsonable) obj).getJsonObject());
//							}
//						}
//				}
				JSONObject jsonObj = new JSONObject();
				jsonObj.put("page", pager.getCurrentPage());
				jsonObj.put("total", pager.getTotalPage());
				jsonObj.put("records", pager.getTotalSize());
				if (pager.getResult() == null || pager.getResult().size() == 0) {
					jsonObj.put("rows", "");
					if (pager.getCurrentPage() > 1) {
						jsonObj.put("page", pager.getCurrentPage());
					}
				} else {
					jsonObj.put("rows", jsonArray);
				}
				//jsonObj.put("rows", jsonArray.toString());
				response.setContentType("text/json; charset=UTF-8");
				response.setContentType("application/json");
				response.setHeader("Cache-Control", "no-sql.jxc.store");
				response.getWriter().write(jsonObj.toString());
			} catch (Exception e) {
				e.printStackTrace();
			}
	}

}
