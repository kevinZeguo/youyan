package com.claude.wmall.web.controller.org;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.claude.wmall.commons.utils.Carrier;
import com.claude.wmall.commons.utils.JqGridView;
import com.claude.wmall.commons.utils.SuccessFailView;
import com.claude.wmall.jxc.domain.recManage.Product;
import com.claude.wmall.shopping.domain.OrgTable;
import com.claude.wmall.shopping.service.OrganizationService;

@Controller()
@RequestMapping("/organ")
public class OrganController {

	@Autowired
	private OrganizationService organizationService;

	@RequestMapping(value = "manager")
	public String manager() {
		return "organ/list";
	}

	@RequestMapping(value = "list")
	public View list(HttpServletRequest req, Integer page, Integer rows,
			String sidx, String sord, OrgTable org) {

		Carrier<OrgTable> carrier = new Carrier<OrgTable>(page, rows, sidx,
				sord);
		this.organizationService.list(carrier, org);
		return new JqGridView<OrgTable>(carrier);
	}

	@RequestMapping(value = "toadd")
	public String toadd(String orgId, Model model) {
		if (orgId != null && !"".equals(orgId)) {
			try {
				OrgTable orgTable = organizationService.findUnique("orgId",
						Integer.parseInt(orgId));
				model.addAttribute("orgTable", orgTable);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		return "organ/add";
	}
	
	@RequestMapping(value = "audit")
	public View audit(String orgId,String status) {
		try {
			if(!StringUtils.isEmpty(orgId) && !StringUtils.isEmpty(status)){
				String[] id = orgId.split(",");
				for (String s : id) {
					OrgTable orgTable = new OrgTable();
					orgTable.setOrgId(Integer.parseInt(s));
					orgTable.setOrgStatus(status);
					organizationService.updateStatusById(orgTable);
				}
			}
			
			return new SuccessFailView("OK");
		}catch(Exception e){
			e.printStackTrace();
			return new SuccessFailView("FILE");
		}
	}

	@RequestMapping(value = "save")
	public View save(OrgTable orgTable) {
		try {
			organizationService.save(orgTable);
			return new SuccessFailView("OK");
		} catch (Exception e) {
			e.printStackTrace();
			return new SuccessFailView("FILE");
		}
	}

	@RequestMapping(value = "tree")
	public void tree(HttpServletResponse response) {
		List<OrgTable> list = this.organizationService
				.findOrgListByStatus("2007002");
		JSONArray jsonArray = new JSONArray();
		jsonArray = JSONArray.fromObject(list);
		try {
			response.setContentType("text/json; charset=UTF-8");
			response.setContentType("application/json");
			response.setHeader("Cache-Control", "no-sql.jxc.store");
			response.getWriter().write(jsonArray.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
