package com.claude.wmall.web.controller.store;

import com.claude.wmall.commons.dao.Constants;
import com.claude.wmall.commons.utils.DocuNumber;
import com.claude.wmall.commons.utils.JqGrid2View;
import com.claude.wmall.commons.utils.SuccessFailView;
import com.claude.wmall.jxc.domain.store.StoreChuRuKls;
import com.claude.wmall.jxc.domain.store.StoreQiTaRkd;
import com.claude.wmall.jxc.domain.store.StoreQitaRkdQuery;
import com.claude.wmall.jxc.service.store.QitaRkdService;
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
@RequestMapping("/store/qitarkd/")
public class QitaRkdController {
    private static final Log log = LogFactory.getLog(QitaRkdController.class);
    @Autowired
    private QitaRkdService qitaRkdService;

    /**
     * 进入其他入库单管理页面
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
        return "store/qitarkd/list";
    }


    /**
     * 查询其他入库单列表
     *
     * @return
     */
    @RequestMapping(value = "list")
    public View list(StoreQitaRkdQuery query) {
        PageInfo<StoreQiTaRkd> rkdPageInfo = null;
        try {
            rkdPageInfo = this.qitaRkdService.listByPage(query);
        } catch (Exception e) {
            log.error("查询失败", e);
        }
        return new JqGrid2View<StoreQiTaRkd>(rkdPageInfo);
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
            StoreQiTaRkd rkd;
            User user = (User) request.getSession().getAttribute(Constants.USER_KEY);
            if (type == 2) {//修改操作
                //根据编号查询库单信息
                rkd = qitaRkdService.findByDanjubh(danjubh);
                DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                rkd.setDanjurq(df.format(new Date()));
            } else {//新增
                rkd = new StoreQiTaRkd();
                danjubh = DocuNumber.getMch_billno();
                DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                rkd.setDanjubh(danjubh);
                rkd.setDanjurq(df.format(new Date()));
                rkd.setYewuyuan(user.getvRealName());
                rkd.setYewuyId(user.getID());
            }

            model.addAttribute("qitarkd", rkd);
        } catch (Exception e) {
            log.error("初始化新增页面失败", e);

        }
        model.addAttribute("type", type);
        return "store/qitarkd/add";
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
            StoreQiTaRkd diaoBoRkd = (StoreQiTaRkd) JSONObject.toBean(obj, StoreQiTaRkd.class, map);
            qitaRkdService.save(diaoBoRkd);
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
            StoreQiTaRkd diaoBoRkd = (StoreQiTaRkd) JSONObject.toBean(obj, StoreQiTaRkd.class, map);
            qitaRkdService.editDanju(diaoBoRkd);
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
                    qitaRkdService.removeDanjubh(danjubh, user.getID());
                }
            }

        } catch (Exception e) {
            log.error("删除入库单失败", e);
            return new SuccessFailView(false, "删除失败");
        }
        return new SuccessFailView(true, "删除成功");
    }


}
