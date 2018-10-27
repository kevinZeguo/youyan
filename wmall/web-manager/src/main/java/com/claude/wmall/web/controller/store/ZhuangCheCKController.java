package com.claude.wmall.web.controller.store;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.View;

import com.claude.wmall.commons.dao.Constants;
import com.claude.wmall.commons.utils.DocuNumber;
import com.claude.wmall.commons.utils.JqGrid2View;
import com.claude.wmall.commons.utils.SuccessFailView;
import com.claude.wmall.jxc.domain.store.StoreChuRuKls;
import com.claude.wmall.jxc.domain.store.StoreYiKuD;
import com.claude.wmall.jxc.domain.store.StoreZhuangCheCkd;
import com.claude.wmall.jxc.service.store.KuDanService;
import com.claude.wmall.jxc.service.store.ZhuangCheCkdService;
import com.claude.wmall.shopping.domain.User;
import com.github.pagehelper.PageInfo;



/**
 * @author shangchoumeng
 *
 */
@Controller
@RequestMapping("/store/zhuangcheckd/")
public class ZhuangCheCKController {

    private static final Log log = LogFactory.getLog(ZhuangCheCKController.class);
    @Autowired
    private ZhuangCheCkdService zhuangCheCkdSerivce;
    @Autowired
    private KuDanService kuDanService;

    /**
     * 进入装车出库单管理页面
     *
     * @param model
     * @return
     */
    @RequestMapping(value = "manager")
    public String manager(Model model) {
        return "store/zhuangcheckd/list";
    }

    /**
     * 查询装车出库列表
     *
     * @return
     */
    @RequestMapping(value = "list")
    public View list(StoreZhuangCheCkd zhuangcheckd) {
        PageInfo<StoreZhuangCheCkd> result = null;
        try {
        	result = this.zhuangCheCkdSerivce.listByPage(zhuangcheckd);
        } catch (Exception e) {
            log.error("zhuangCheCkdSerivce查询失败", e);
        }
        return new JqGrid2View<StoreZhuangCheCkd>(result);
    }
    
    
    /**
     * 审核
     *
     * @param model
     * @return
     */
    @RequestMapping(value = "start")	
    @ResponseBody
    public String start(String[]ids,HttpServletResponse response,HttpServletRequest request) throws Exception {
    	User user = (User) request.getSession().getAttribute(Constants.USER_KEY);
    	System.out.println("start======="+ids[0].toString());
    	String [] kudans = ids[0].split("[,]");
    	int result = kuDanService.startByID(kudans,user);
    	HashMap<String,String> map=new HashMap<String,String> ();
    	System.out.println(result);
    	if(result==1){
    		map.put("result", "1");
    		map.put("message", "审核成功");
    	}else{
    		map.put("result", "0");
    		map.put("message", "审核失败");
    	}
		JSONArray jsonArray = new JSONArray();
		jsonArray=JSONArray.fromObject(map);
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
    public String block(String[]ids,HttpServletResponse response,HttpServletRequest request) throws Exception {
    	User user = (User) request.getSession().getAttribute(Constants.USER_KEY);
    	System.out.println("block======="+ids[0].toString());
    	String [] kudans = ids[0].split("[,]");
    	int result = kuDanService.blockByID(kudans,user);
    	HashMap<String,String> map=new HashMap<String,String> ();
    	System.out.println(result);

    	if(result==1){
    		map.put("result", "1");
    		map.put("message", "反审成功");
    	}else{
    		map.put("result", "0");
    		map.put("message", "反审失败");
    	}
    	
		JSONArray jsonArray = new JSONArray();
		jsonArray=JSONArray.fromObject(map);
		System.out.println(jsonArray.toString());
		return jsonArray.toString();
    } 

   
    /**
     * 删除
     *
     * @param model
     * @return
     */
    @RequestMapping(value = "del")	
    @ResponseBody
    public String del(String[]ids,HttpServletResponse response,HttpServletRequest request) throws Exception {

    	String [] kundans = ids[0].split("[,]");
    	int result = zhuangCheCkdSerivce.del(kundans);
    	HashMap<String,String> map=new HashMap<String,String> ();
    	System.out.println(result);
    	if(result==1){
    		map.put("result", "1");
    		map.put("message", "删除成功");
    	}else{
    		map.put("result", "0");
    		map.put("message", "删除失败");
    	}
		JSONArray jsonArray = new JSONArray();
		jsonArray=JSONArray.fromObject(map);
		System.out.println(jsonArray.toString());
		return jsonArray.toString();
    } 
    
    
    
    /**
     * 新建页面
     *
     * @param model
     * @return
     */
    @RequestMapping(value = "toAdd")
    public String toAdd(Model model, HttpServletRequest request) {
        String danjubh = DocuNumber.getMch_billno();
        model.addAttribute("danjubh", danjubh);
        User user = (User) request.getSession().getAttribute(Constants.USER_KEY);
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        model.addAttribute("curTime", df.format(new Date()));
        model.addAttribute("user", user);
        return "store/zhuangcheckd/add";
    }


    /**
     * 保存入库单
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "save")
    public View save(HttpServletRequest request, String data) {

        try {
            JSONObject obj = JSONObject.fromObject(data);
            Map<String, Class> map = new HashMap<String, Class>();
            map.put("churuklsList", StoreChuRuKls.class);
            StoreZhuangCheCkd chukudan = (StoreZhuangCheCkd) JSONObject.toBean(obj, StoreZhuangCheCkd.class, map);
            zhuangCheCkdSerivce.save(chukudan);
        } catch (Exception e) {
            log.error("保存入库单失败", e);
            return new SuccessFailView(false, "修改失败");
        }
        return new SuccessFailView(true, "修改失败");
    }

}
