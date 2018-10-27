package com.claude.wmall.web.controller;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.claude.wmall.commons.utils.Carrier;
import com.claude.wmall.commons.utils.JqGridView;
import com.claude.wmall.commons.utils.SuccessFailView;
import com.claude.wmall.shopping.domain.MbGroup;
import com.claude.wmall.shopping.service.MbGroupService;
import com.claude.wmall.shopping.service.MbService;

@Controller
@RequestMapping("/mbgroup")
public class MbGroupController {
	@Autowired()
	private MbGroupService mbGroupService;
	
	@Autowired()
	private MbService mbService;

	@RequestMapping(value = "manager")
	public String manager(HttpServletRequest re) {
		return "mbgroup/MbGroupManager";
	}

	@RequestMapping(value = "list")
	public View list(HttpServletRequest req, Integer page, Integer rows,
			String sidx, String sord) {
		String mbGroupId = req.getParameter("mbGroupId");
		String mbGroupName = req.getParameter("mbGroupName");
		Carrier<MbGroup> carrier = new Carrier<MbGroup>(
				page, rows, sidx, sord);
		this.mbGroupService.list(carrier, mbGroupId, mbGroupName);
		return new JqGridView<MbGroup>(carrier);
	}

	@RequestMapping(value = "toadd")
	public String toAdd(HttpServletRequest request) {
		String id = request.getParameter("id");
		if (id != null && !"".equals(id)) {
			MbGroup mbGroup = this.mbGroupService.findById(Integer.parseInt(id));
			if (mbGroup != null) {
				request.setAttribute("mbGroupId", mbGroup.getMbGroupId());
				request.setAttribute("mbGroupName", mbGroup.getMbGroupName());
			}
		}
		return "mbgroup/MbGroupAdd";
	}

	// 版面新增
	@RequestMapping(value = "Save")
	public View Save(HttpServletRequest request) {
		String mbGroupId = request.getParameter("mbGroupId");
		String mbGroupName = request.getParameter("mbGroupName");
		MbGroup mbGroup = new MbGroup();
		mbGroup.setMbGroupId(Integer.parseInt(mbGroupId));
		mbGroup.setMbGroupName(mbGroupName);
		mbGroupService.save(mbGroup);
		return new SuccessFailView("OK");
	}
	
	@RequestMapping(value = "delete")
	public View start(HttpServletRequest request) {
		String ids = request.getParameter("ids");
		String[] arrSelected = ids.split(",");

		if (arrSelected != null && arrSelected.length > 0
				&& StringUtils.isNotEmpty(arrSelected[0])) {
			//验证码表组ID是否已经使用
			boolean isTemp = false ;
			for (String id : arrSelected) {
				if(mbService.getMbGroupId(id)){
					isTemp = true ;
				}else{
					return new SuccessFailView(false, "已经有码表使用了当前码表组，不能删除。");
				}
			}
			if(isTemp){
				for (String id : arrSelected) {
					mbGroupService.delete(Integer.parseInt(id)) ;
				}
			}
			return new SuccessFailView(true, "删除成功。");
		}
		//验证产品类别是否在产品表里使用
		
		return new SuccessFailView(false, "操作失败。");
	}
}
