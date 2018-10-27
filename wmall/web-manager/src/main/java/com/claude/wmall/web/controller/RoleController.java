package com.claude.wmall.web.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.claude.wmall.commons.utils.Carrier;
import com.claude.wmall.commons.utils.JqGridView;
import com.claude.wmall.commons.utils.SuccessFailView;
import com.claude.wmall.shopping.domain.RoleTable;
import com.claude.wmall.shopping.service.RoleService;

@Controller
@RequestMapping("/role")
public class RoleController {

	@Autowired
	private RoleService roleService;

	public void setRoleService(RoleService roleService) {
		this.roleService = roleService;
	}

	@RequestMapping(value = "manager")
	public String RoleManager() {
		return "role/RoleManager";
	}

	@RequestMapping(value = "list")
	public View list(HttpServletRequest req, Integer page, Integer rows,
			String sidx, String sord) {
		String roleName = req.getParameter("roleName");
		Carrier<RoleTable> carrier = new Carrier<RoleTable>(page, rows, sidx,
				sord);
		this.roleService.list(carrier, roleName);

		return new JqGridView<RoleTable>(carrier);
	}

	@RequestMapping(value = "toadd")
	public String toadd(HttpServletRequest req, Model model) {
		String roleId = req.getParameter("roleId");
		if (roleId != null && !"".equals(roleId)) {
			RoleTable role = this.roleService.findById(roleId);
			if (role != null) {
				model.addAttribute("roleId", roleId);
				model.addAttribute("roleName", role.getRoleName());
			}
		}

		return "role/RoleAdd";
	}

	@RequestMapping(value = "save")
	public View save(HttpServletRequest req) {

		String roleId = req.getParameter("roleId");
		String roleName = req.getParameter("roleName");

		RoleTable role = new RoleTable();

		if (roleId.trim() != null && !"".equals(roleId.trim())) {
			role.setRoleId(Integer.valueOf(roleId));
		}

		role.setRoleName(roleName);

		this.roleService.save(role);

		return new SuccessFailView("保存成功");

	}
	
	
	@RequestMapping(value = "delete")
	public View delete(HttpServletRequest req){
		String roleId = req.getParameter("roleId");
		System.out.println(roleId);
		String[] id = roleId.split(",");
		for (int i = 0; i < id.length; i++) {
			this.roleService.delete(id[i]);
		}
		return new SuccessFailView("删除成功");
		
	}

}
