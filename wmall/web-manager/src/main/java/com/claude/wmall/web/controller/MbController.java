package com.claude.wmall.web.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.View;

import com.claude.wmall.commons.utils.Carrier;
import com.claude.wmall.commons.utils.JqGridView;
import com.claude.wmall.commons.utils.SuccessFailView;
import com.claude.wmall.shopping.domain.Mb;
import com.claude.wmall.shopping.domain.MbGroup;
import com.claude.wmall.shopping.service.MbGroupService;
import com.claude.wmall.shopping.service.MbService;

@Controller
@RequestMapping("/mb")
public class MbController {
	@Autowired()
	private MbService mbService;
	
	@Autowired()
	private MbGroupService mbGroupService;

	@RequestMapping(value = "manager")
	public String manager(HttpServletRequest re) {
		//获取版面组
		List<MbGroup> MbGroup = mbGroupService.getAll() ;
		re.setAttribute("list", MbGroup);
		return "mb/MbManager";
	}

	@RequestMapping(value = "list")
	public View list(HttpServletRequest req, Integer page, Integer rows,
			String sidx, String sord) {
		String mbId = req.getParameter("mbId");
		String mbName = req.getParameter("mbName");
		String mbGroupId = req.getParameter("mbGroupId");
		Carrier<Mb> carrier = new Carrier<Mb>(
				page, rows, sidx, sord);
		this.mbService.list(carrier, mbId, mbName, mbGroupId);
		return new JqGridView<Mb>(carrier);
	}

	@RequestMapping(value = "toadd")
	public String toAdd(HttpServletRequest request) {
		String id = request.getParameter("id");
		if (id != null && !"".equals(id)) {
			Mb mb = this.mbService.findById(Integer.parseInt(id));
			if (mb != null) {
				request.setAttribute("mbId", mb.getMbId());
				request.setAttribute("mbName", mb.getMbName());
				request.setAttribute("mbGroupId", mb.getMbGroupId());
			}
		}
		//获取版面组
		List<MbGroup> mbGroup = mbGroupService.getAll() ;
		request.setAttribute("list", mbGroup);
		return "mb/MbAdd";
	}

	// 版面组新增
	@RequestMapping(value = "Save")
	public View Save(HttpServletRequest request) {
		String mbId = request.getParameter("mbId");
		String mbName = request.getParameter("mbName");
		String mbGroupId = request.getParameter("mbGroupId");
		Mb mb = new Mb();
		mb.setMbId(Integer.parseInt(mbId));
		mb.setMbName(mbName);
		//获取业态
		MbGroup mbGroup = mbGroupService.findById(Integer.parseInt(mbGroupId)) ;
		mb.setMbGroupId(mbGroup);
		mbService.save(mb);
		return new SuccessFailView("OK");
	}
	
	@RequestMapping(value = "delete")
	public View start(HttpServletRequest request) {
		String ids = request.getParameter("ids");
		String[] arrSelected = ids.split(",");

		if (arrSelected != null && arrSelected.length > 0
				&& StringUtils.isNotEmpty(arrSelected[0])) {
			for (String id : arrSelected) {
				mbService.delete(Integer.parseInt(id)) ;
			}
			return new SuccessFailView(true, "删除成功。");
		}
		//验证产品类别是否在产品表里使用
		
		return new SuccessFailView(false, "操作失败。");
	}
	@RequestMapping(value = "buildSelect")
	@ResponseBody
	public String buildSelect(String mbGroupId,HttpServletResponse response) {

		List<Mb> list = mbService.findByGroupId(mbGroupId);
		JSONArray jsonArray = new JSONArray();
		jsonArray=JSONArray.fromObject(list);
		return jsonArray.toString();
	}
}
