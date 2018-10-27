package com.claude.wmall.web.controller.recManage;

import java.util.List;

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
import com.claude.wmall.jxc.domain.recManage.RegionRec;
import com.claude.wmall.jxc.service.recManage.RegionSerivce;
import com.github.pagehelper.PageInfo;


/**
 * Created by QinQ on 2016/8/17.
 */
@Controller
@RequestMapping("/recManage/region/")
public class RegionController {

	public static final String REGION_ROLE="经销商";
    private static final Log log = LogFactory.getLog(RegionController.class);
    @Autowired
    private RegionSerivce regionSerivce;

    /**
     * 进入大区档案管理页面
     *
     * @param model
     * @return
     */
    @RequestMapping(value = "manager")
    public String manager(Model model) {
    	System.out.println("1111111112");
    	//获取角色为【大区负责人】的用户列表
    	List<RegionRec> regionRecList=null;
    	try {
			regionRecList=regionSerivce.findUserListByRoleName(REGION_ROLE);
		} catch (Exception e) {
			log.error("查询失败", e);
		}
		model.addAttribute("regionRecList", regionRecList);
    	
        return "recManage/region/manager";
    }

    /**
     * 查询大区管理列表
     *
     * @return
     */
	@RequestMapping(value = "list")
	public View list(RegionRec regionRec) {
    	System.out.println("22222222222");
		PageInfo<RegionRec> result = null;
		try {
			result = this.regionSerivce.listByPage(regionRec);
		} catch (Exception e) {
			log.error("查询失败", e);
		}
		
		return new JqGrid2View<RegionRec>(result);
	}

    /**
     * 进入新建页面
     *
     * @param model
     * @return
     */
    @RequestMapping(value = "toadd")
    public String toAdd(Model model) {
        return "recManage/region/add";
    }
    /**
     * 进入新建页面
     *
     * @param model
     * @return
     */
    @RequestMapping(value = "buildSelect")	
    @ResponseBody
    public String buildSelect(HttpServletResponse response) {
    	System.out.println("4444444444");
    	List<RegionRec> list = regionSerivce.findAll();
    	System.out.println("aaaaaaaaaaa"+list.get(0).getId()+"    "+list.get(0).getName());
    	
		JSONArray jsonArray = new JSONArray();
		jsonArray=JSONArray.fromObject(list);
		System.out.println(jsonArray.toString());
		return jsonArray.toString();
    }


}
