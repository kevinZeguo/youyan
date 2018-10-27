package com.claude.wmall.web.controller.recManage;

import java.sql.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.View;

import com.claude.wmall.commons.utils.JqGrid2View;
import com.claude.wmall.commons.utils.SuccessFailView;
import com.claude.wmall.jxc.dao.recManage.CustomerReceiptDao;
import com.claude.wmall.jxc.domain.recManage.CustomerRec;
import com.claude.wmall.jxc.domain.recManage.CustomerReceipt;
import com.claude.wmall.jxc.service.recManage.CustomerSerivce;
import com.claude.wmall.shopping.domain.Mb;
import com.claude.wmall.shopping.service.MbService;
import com.github.pagehelper.PageInfo;

/**
 * Created by QinQ on 2016/8/17.
 */
@Controller
@RequestMapping("/recManage/customer/")
public class CustomerController {

	private static final Log log = LogFactory.getLog(CustomerController.class);
	@Autowired
	private CustomerSerivce customerSerivce;
	@Autowired
	private CustomerReceiptDao customerReceiptDao;

	private MbService mbService;

	/**
	 * 进入客户档案管理页面
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "manager")
	public String manager(Model model) {
		System.out.println("1111111111");
		return "recManage/customer/list";
	}

	/**
	 * 进入新建收货地
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "address")
	public String address(Model model) {
		return "recManage/customer/address";
	}

	/**
	 * 查询用户管理列表
	 * 
	 * @return
	 */
	@RequestMapping(value = "list")
	public View list(CustomerRec customerRec) {
		// System.out.println("xxxxxx"+customerRec.getName());
		// if ("999".equals(customerRec.getRegionId())) {
		// System.out.println("yyyyyyyyyyyyy");
		// customerRec.setRegionId(0);
		// }
		// System.out.println("aaaaaaaaa"+customerRec.getRegionId().toString()+"bbbbbbbbbb");
		// System.out.println("aaaaaaaaa"+customerRec.getCustomerTypeId().toString()+"bbbbbbbbbb");
		// if ("999".equals(customerRec.getCustomerTypeId().toString())) {
		// System.out.println("xxxxxxxxxxx");
		// customerRec.setCustomerTypeId(0);
		// }
		// System.out.println("aaaaaaaaa"+customerRec.getApprovalStatus().toString()+"bbbbbbbbbb");
		// if ("999".equals(customerRec.getApprovalStatus().toString())) {
		// System.out.println("zzzzzzzzzzz");
		// customerRec.setCustomerTypeId(0);
		// }
		if ("-1".equals(customerRec.getAreaProvince())) {
			customerRec.setAreaProvince(null);
		}
		if ("-1".equals(customerRec.getAreaCity())) {
			customerRec.setAreaCity(null);
		}
		if ("-1".equals(customerRec.getAreaCounty())) {
			customerRec.setAreaCounty(null);
		}
		PageInfo<CustomerRec> result = null;
		try {
			result = this.customerSerivce.listByPage(customerRec);
			System.out.println(result.getSize());
		} catch (Exception e) {
			log.error("查询失败", e);
		}

		return new JqGrid2View<CustomerRec>(result);
	}

	/**
	 * 查询用户管理列表
	 * 
	 * @return
	 */
	@RequestMapping(value = "listreceiptAddress")
	public View listReceiptAddress(CustomerRec customerRec) {

		System.out.println(customerRec.getName());
		if ("".equals(customerRec.getId()) || customerRec.getId() == null) {
			return new JqGrid2View<CustomerRec>(new PageInfo<CustomerRec>());
		} else {
			PageInfo<CustomerReceipt> result = null;
			try {
				result = this.customerSerivce
						.listReceiptAddressByPage(customerRec);
			} catch (Exception e) {
				log.error("查询失败", e);
			}

			return new JqGrid2View<CustomerReceipt>(result);
		}

	}

	/**
	 * 进入用户编辑页面
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "tomodify")
	public String tomodify(HttpServletRequest req) {
		String id = req.getParameter("id");
		if (id != null && !"".equals(id)) {

			CustomerRec cusRec = customerSerivce.getCustomerRecById(id);
			req.setAttribute("CustomerRec", cusRec);
		}
		List<Mb> list = mbService.findByGroupId("1001");
		return "recManage/customer/add";
	}

	/**
	 * 进入用户新建页面
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "toadd")
	public String toadd(Model model) {
		System.out
				.println("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
		return "recManage/customer/add";
	}

	/**
	 * 删除
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "del")
	@ResponseBody
	public String del(String[] ids, HttpServletResponse response) {
		int result = customerSerivce.delByID(ids);
		HashMap<String, String> map = new HashMap<String, String>();
		if (result == 1) {
			map.put("result", "1");
			map.put("message", "删除成功");
		} else {
			map.put("result", "0");
			map.put("message", "删除失败");
		}
		JSONArray jsonArray = new JSONArray();
		jsonArray = JSONArray.fromObject(map);
		System.out.println(jsonArray.toString());
		return jsonArray.toString();
	}

	/**
	 * 增加
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "saveRec")
	public View saveRec(HttpServletRequest req) {
		System.out.println("xxxxxxxxxxxxxxxxxx");
		System.out.println("xxxxxxxxxxxxxxxxxx");
		CustomerRec p = new CustomerRec();
		p.setName(req.getParameter("name"));
		System.out.println("name===" + req.getParameter("name"));
		p.setShortname(req.getParameter("shortName"));
		System.out.println("shortName===" + req.getParameter("shortName"));
		if (req.getParameter("customerTypeId") != null
				&& !"".equals(req.getParameter("customerTypeId"))) {
			p.setCustomerTypeId(Integer.valueOf(req.getParameter("customerTypeId")));
		}
		System.out.println("customerTypeId==="
				+ req.getParameter("customerTypeId"));
		
		p.setAreaProvince(req.getParameter("areaProvince"));
		System.out.println("areaProvince===" + req.getParameter("areaProvince"));
		
		p.setAreaCity(req.getParameter("areaCity"));
		System.out.println("areaCity===" + req.getParameter("areaCity"));
		
		p.setAreaCounty(req.getParameter("areaCounty"));
		System.out.println("areaCounty===" + req.getParameter("areaCounty"));
		
		
		p.setIndustry(req.getParameter("industry"));
		System.out.println("industry===" + req.getParameter("industry"));
		
		p.setLevel(req.getParameter("level"));
		System.out.println("level===" + req.getParameter("level"));
		
		p.setLegalperson(req.getParameter("legalperson"));
		System.out.println("legalperson===" + req.getParameter("legalperson"));
		
		p.setContacts(req.getParameter("contacts"));
		System.out.println("contacts===" + req.getParameter("contacts"));

		
		p.setTelephone(req.getParameter("telephone"));
		System.out.println("telephone===" + req.getParameter("telephone"));
		
		if (req.getParameter("salesmanId") != null
				&& !"".equals(req.getParameter("salesmanId"))) {
		p.setSalesmanId(Integer.valueOf(req.getParameter("salesmanId")));
		System.out.println("salesmanId===" + req.getParameter("salesmanId"));
		}
		
		p.setCurrency(req.getParameter("currency"));
		System.out.println("currency===" + req.getParameter("currency"));
		
		p.setBank(req.getParameter("bank"));
		System.out.println("bank===" + req.getParameter("bank"));
		
		p.setAccount(req.getParameter("account"));
		System.out.println("account===" + req.getParameter("account"));
		
		if (req.getParameter("regionId") != null
				&& !"".equals(req.getParameter("regionId"))) {
		p.setRegionId(Integer.valueOf(req.getParameter("regionId")));
		System.out.println("regionId===" + req.getParameter("regionId"));}
		Date time=new Date(new java.util.Date().getTime());
		p.setCreateDate(time);
		p.setCreateDate(time);
		p.setApprovalStatus(Integer.valueOf("0"));

		int result = customerSerivce.save(p);

		return new SuccessFailView("OK");
	}

	/**
	 * 审核
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "start")
	@ResponseBody
	public String start(String[] ids, HttpServletResponse response) {
		System.out.println("start=======");
		int result = customerSerivce.startByID(ids);
		HashMap<String, String> map = new HashMap<String, String>();
		System.out.println(result);
		if (result == 1) {
			map.put("result", "1");
			map.put("message", "审核成功");
		} else {
			map.put("result", "0");
			map.put("message", "审核失败");
		}
		JSONArray jsonArray = new JSONArray();
		jsonArray = JSONArray.fromObject(map);
		System.out.println(jsonArray.toString());
		return jsonArray.toString();
	}

	/**
	 * 反审
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "block")
	@ResponseBody
	public String block(String[] ids, HttpServletResponse response) {
		System.out.println("block=======");

		int result = customerSerivce.blockByID(ids);
		HashMap<String, String> map = new HashMap<String, String>();
		System.out.println(result);

		if (result == 1) {
			map.put("result", "1");
			map.put("message", "反审成功");
		} else {
			map.put("result", "0");
			map.put("message", "反审失败");
		}

		JSONArray jsonArray = new JSONArray();
		jsonArray = JSONArray.fromObject(map);
		System.out.println(jsonArray.toString());
		return jsonArray.toString();
	}
}
