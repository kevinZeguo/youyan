package com.claude.wmall.web.controller;

import com.claude.wmall.commons.utils.SuccessFailView;
import com.claude.wmall.shopping.domain.Area;
import com.claude.wmall.shopping.service.AreaService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import java.util.List;
import java.util.logging.Logger;

/**
 * Created by mazeguo on 2016/8/7.
 */
@Controller
@RequestMapping("/area")
public class AreaController {
    private static final Log log = LogFactory.getLog(AreaController.class);
    @Autowired
    private AreaService areaService;


    /**
     * 获取区域列表
     * 最顶层区域父Id 是 0
     *
     * @param areaParId
     * @return
     */
    @RequestMapping("/getChildAreaList")
    public View getAreaListByParentId(Integer areaParId,String key) {
        List<Area> areaList = null;
        try {
            areaList = areaService.getListByParId(areaParId,key);
        } catch (Exception e) {
            log.error("获取区域列表失败！", e);
            return new SuccessFailView(false, "查询区域信息失败!" + e.getMessage());
        }
        return new SuccessFailView(areaList);

    }

    @RequestMapping("/areaDemo")
    public String areaDemo(Model model) {
        model.addAttribute("province","1");
        model.addAttribute("city","2");
        model.addAttribute("town","4");
        return "area/areaDemo";
    }

}
