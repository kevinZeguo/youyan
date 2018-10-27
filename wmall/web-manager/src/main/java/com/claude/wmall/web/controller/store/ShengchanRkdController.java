package com.claude.wmall.web.controller.store;

import com.claude.wmall.commons.dao.Constants;
import com.claude.wmall.commons.utils.DocuNumber;
import com.claude.wmall.commons.utils.JqGrid2View;
import com.claude.wmall.commons.utils.SuccessFailView;
import com.claude.wmall.jxc.domain.store.StoreChuRuKls;
import com.claude.wmall.jxc.domain.store.StoreShengChanRkd;
import com.claude.wmall.jxc.domain.store.StoreShengchanRkdQuery;
import com.claude.wmall.jxc.service.store.ShengchanRkdService;
import com.claude.wmall.shopping.domain.User;
import com.github.pagehelper.PageInfo;
import net.sf.json.JSONObject;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import javax.servlet.http.HttpServletRequest;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by mazeguo on 2016/8/28.
 */
@Controller
@RequestMapping("/store/shengchanrkd/")
public class ShengchanRkdController {
    private static final Log log = LogFactory.getLog(ShengchanRkdController.class);

    @Autowired
    private ShengchanRkdService shengchanRkdService;


    /**
     * 进入生产入库单管理页面
     *
     * @param model
     * @return
     */
    @RequestMapping(value = "manager")
    public String manager(Model model) {
        try {

        } catch (Exception e) {
            log.error("加载采购入库单管理页面查询条件失败", e);
        }
        return "store/shengchanrkd/list";
    }


    /**
     * 查询生产入库单列表
     *
     * @return
     */
    @RequestMapping(value = "list")
    public View list(StoreShengchanRkdQuery query) {
        PageInfo<StoreShengChanRkd> rkdPageInfo = null;
        try {
            rkdPageInfo = this.shengchanRkdService.listByPage(query);
        } catch (Exception e) {
            log.error("查询失败", e);
        }
        return new JqGrid2View<StoreShengChanRkd>(rkdPageInfo);
    }



    /**
     * 进入采购入库单新建页面
     *
     * @param model
     * @return
     */
    @RequestMapping(value = "toAdd")
    public String toAdd(String danjubh, Integer type, Model model, HttpServletRequest request) {
        try {
            StoreShengChanRkd shengChanRkd;
            User user = (User) request.getSession().getAttribute(Constants.USER_KEY);
            if (type == 2) {//修改操作
                //根据编号查询库单信息
                shengChanRkd = shengchanRkdService.findByDanjubh(danjubh);
                shengChanRkd.setYewuyuan(user.getvRealName());
                DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                shengChanRkd.setDanjurq(df.format(new Date()));
                shengChanRkd.setYewuyId(user.getID());
            } else {//新增
                shengChanRkd = new StoreShengChanRkd();
                danjubh = DocuNumber.getMch_billno();
                DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                shengChanRkd.setDanjubh(danjubh);
                shengChanRkd.setDanjurq(df.format(new Date()));
                shengChanRkd.setYewuyuan(user.getvRealName());
                shengChanRkd.setYewuyId(user.getID());
                shengChanRkd.setBumen(user.getvComName());
            }

            model.addAttribute("shengChanRkd", shengChanRkd);

        } catch (Exception e) {
            log.error("初始化新增页面失败", e);

        }
        model.addAttribute("type", type);
        return "store/shengchanrkd/add";
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
            StoreShengChanRkd shengChanRkd = (StoreShengChanRkd) JSONObject.toBean(obj, StoreShengChanRkd.class, map);
            shengchanRkdService.save(shengChanRkd);
        } catch (Exception e) {
            log.error("保存入库单失败", e);
            return new SuccessFailView(false, "修改失败");
        }
        return new SuccessFailView(true, "修改失败");
    }

    /**
     * 保存入库单
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "edit")
    public View edit(HttpServletRequest request, String data) {

        try {
            JSONObject obj = JSONObject.fromObject(data);
            Map<String, Class> map = new HashMap<String, Class>();
            map.put("churuklsList", StoreChuRuKls.class);
            StoreShengChanRkd shengChanRkd = (StoreShengChanRkd) JSONObject.toBean(obj, StoreShengChanRkd.class, map);
            shengchanRkdService.editByDanjubh(shengChanRkd);
        } catch (Exception e) {
            log.error("修改入库单失败", e);
            return new SuccessFailView(false, "修改失败");
        }
        return new SuccessFailView(true, "修改失败");
    }

    /**
     * 删除入库单
     *
     * @return
     */
    @RequestMapping(value = "delete")
    public View delete(String danjubhs, HttpServletRequest request) {
        try {
            User user = (User) request.getSession().getAttribute(Constants.USER_KEY);
            if (StringUtils.isNotEmpty(danjubhs)) {
                String[] djs = danjubhs.split(",");
                for (String danjubh : djs) {
                    shengchanRkdService.removeDanjubh(danjubh, user.getID());
                }
            }

        } catch (Exception e) {
            log.error("删除入库单失败", e);
            return new SuccessFailView(false, "删除失败");
        }
        return new SuccessFailView(true, "删除成功");
    }



}
