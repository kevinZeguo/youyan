package com.claude.wmall.commons.utils;

import com.github.pagehelper.PageInfo;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.web.servlet.view.AbstractView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

public class JqGrid2View<T> extends AbstractView {

	public PageInfo<T> pager;

	private JqGrid2View() {
	}

	public JqGrid2View(PageInfo<T> pager) {
		this.pager = pager;
	}

	@Override
	protected void renderMergedOutputModel(Map<String, Object> model,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		try {
			JSONArray jsonArray = new JSONArray();
			jsonArray = JSONArray.fromObject(pager.getList());
			JSONObject jsonObj = new JSONObject();

			jsonObj.put("page", pager.getPageNum());
			jsonObj.put("total", pager.getPages());
			jsonObj.put("records", pager.getTotal());
			

			if (pager.getList() == null || pager.getList().size() == 0) {
				jsonObj.put("rows", "");
				if (pager.getPageNum() > 1) {
					jsonObj.put("page", pager.getPageNum());
				}
			} else {
				jsonObj.put("rows", jsonArray);
			}
			// jsonObj.put("rows", jsonArray.toString());
			response.setContentType("text/json; charset=UTF-8");
			response.setContentType("application/json");
			response.setHeader("Cache-Control", "no-sql.jxc.store");
			response.getWriter().write(jsonObj.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
