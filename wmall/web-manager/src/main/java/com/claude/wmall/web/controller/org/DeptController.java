package com.claude.wmall.web.controller.org;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.claude.wmall.commons.utils.Carrier;
import com.claude.wmall.commons.utils.JqGridView;
import com.claude.wmall.commons.utils.SuccessFailView;
import com.claude.wmall.shopping.domain.DeptTable;
import com.claude.wmall.shopping.service.DeptTableService;

@Controller()
@RequestMapping("/dept")
public class DeptController {

	@Autowired
	private DeptTableService deptTableService;

	@RequestMapping(value = "manager")
	public String manager() {
		return "dept/list";
	}

	@RequestMapping(value = "list")
	public View list(HttpServletRequest req, Integer page, Integer rows,
			String sidx, String sord, DeptTable deptTable) {

		Carrier<DeptTable> carrier = new Carrier<DeptTable>(page, rows, sidx,
				sord);
		this.deptTableService.list(carrier, deptTable);
		return new JqGridView<DeptTable>(carrier);
	}

	@RequestMapping(value = "toadd")
	public String toadd(String deptId, Model model) {
		if (deptId != null && !"".equals(deptId)) {
			try {
				DeptTable deptTable = deptTableService.findUnique("deptId",
						Integer.parseInt(deptId));
				model.addAttribute("deptTable", deptTable);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		return "dept/add";
	}
	
	@RequestMapping(value = "audit")
	public View audit(String deptId,String status) {
		try {
			if(!StringUtils.isEmpty(deptId) && !StringUtils.isEmpty(status)){
				String[] id = deptId.split(",");
				for (String s : id) {
					DeptTable deptTable = new DeptTable();
					deptTable.setDeptId(Integer.parseInt(s));
					deptTable.setDeptStatus(status);
					deptTableService.updateStatusById(deptTable);
				}
			}
			
			return new SuccessFailView("OK");
		}catch(Exception e){
			e.printStackTrace();
			return new SuccessFailView("FILE");
		}
	}

	@RequestMapping(value = "save")
	public View save(DeptTable deptTable) {
		try {
			deptTableService.save(deptTable);
			return new SuccessFailView("OK");
		} catch (Exception e) {
			e.printStackTrace();
			return new SuccessFailView("FILE");
		}
	}
}
