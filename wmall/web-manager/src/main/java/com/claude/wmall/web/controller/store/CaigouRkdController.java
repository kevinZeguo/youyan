package com.claude.wmall.web.controller.store;

import com.claude.wmall.commons.dao.Constants;
import com.claude.wmall.commons.utils.DocuNumber;
import com.claude.wmall.commons.utils.JqGrid2View;
import com.claude.wmall.commons.utils.SuccessFailView;
import com.claude.wmall.jxc.domain.customer.TCustomer;
import com.claude.wmall.jxc.domain.recManage.Product;
import com.claude.wmall.jxc.domain.store.StoreCaiGouRkd;
import com.claude.wmall.jxc.domain.store.StoreCaiGouRkdQuery;
import com.claude.wmall.jxc.domain.store.StoreChuRuKls;
import com.claude.wmall.jxc.service.customer.TCustomerService;
import com.claude.wmall.jxc.service.recManage.ProductService;
import com.claude.wmall.jxc.service.store.CaigouRkdSerivce;
import com.claude.wmall.shopping.domain.Mb;
import com.claude.wmall.shopping.domain.User;
import com.claude.wmall.shopping.service.MbService;
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
import java.util.*;


/**
 * Created by mazeguo on 2016/8/9.
 */
@Controller
@RequestMapping("/store/caigourkd/")
public class CaigouRkdController {

    private static final Log log = LogFactory.getLog(CaigouRkdController.class);
    @Autowired
    private CaigouRkdSerivce caigouRkdSerivce;

    @Autowired
    private TCustomerService tCustomerService;

    @Autowired
    private MbService mbService;
    @Autowired
    private ProductService productService;

    /**
     * 进入采购入库单管理页面
     *
     * @param model
     * @return
     */
    @RequestMapping(value = "manager")
    public String manager(Model model) {
        try {
            //产品
            Product p = new Product();
            p.setPage(1);
            p.setRows(20);
            PageInfo<Product> productPageInfo = productService.listByPage(p);
            model.addAttribute("productlist", productPageInfo.getList());
            //仓库
            //库管员
            //部门
            Mb mb = mbService.findByMbName("供应商");
            //供应商
            List<TCustomer> customerList = tCustomerService.getListByCustomerTypeId(mb.getMbId());
            model.addAttribute("customerList", customerList);
        } catch (Exception e) {
            log.error("加载采购入库单管理页面查询条件失败", e);
        }

        return "store/caigourkd/list";
    }

    /**
     * 查询采购入库单列表
     *
     * @return
     */
    @RequestMapping(value = "list")
    public View list(StoreCaiGouRkdQuery query, HttpServletRequest req, Integer page, Integer rows,
                     String sidx, String sord) {
        PageInfo<StoreCaiGouRkd> rkdPageInfo = null;
        query.setPage(page);
        query.setRows(rows);
        try {
            rkdPageInfo = this.caigouRkdSerivce.listByPage(query);
        } catch (Exception e) {
            log.error("查询失败", e);
        }
        return new JqGrid2View<StoreCaiGouRkd>(rkdPageInfo);
    }

    /**
     * 进入采购入库单新建页面
     *
     * @param model
     * @return
     */
    @RequestMapping(value = "toAdd")
    public String toAdd(String danjubh, Integer type, Model model, HttpServletRequest request) {
        if (type == null) {//默认新增
            type = 1;
        }
        try {
            StoreCaiGouRkd caiGouRkd;
            User user = (User) request.getSession().getAttribute(Constants.USER_KEY);
            if (type == 2) {//修改操作
                //根据编号查询库单信息
                caiGouRkd = caigouRkdSerivce.findByDanjubh(danjubh);
                caiGouRkd.setYewuyuan(user.getvRealName());
                DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                caiGouRkd.setDanjurq(df.format(new Date()));
                caiGouRkd.setYewuyId(user.getID());
            } else {//新增
                caiGouRkd = new StoreCaiGouRkd();
                danjubh = DocuNumber.getMch_billno();
                DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                caiGouRkd.setDanjubh(danjubh);
                caiGouRkd.setDanjurq(df.format(new Date()));
                caiGouRkd.setYewuyuan(user.getvRealName());
                caiGouRkd.setYewuyId(user.getID());
                caiGouRkd.setBumen(user.getvComName());
            }

            model.addAttribute("caiGouRkd", caiGouRkd);
            //仓库
            //库管员
            //部门
            Mb mb = mbService.findByMbName("供应商");
            //供应商
            List<TCustomer> customerList = tCustomerService.getListByCustomerTypeId(mb.getMbId());
            model.addAttribute("customerList", customerList);
        } catch (Exception e) {
            log.error("初始化新增页面失败", e);

        }
        model.addAttribute("type", type);
        return "store/caigourkd/add";
    }


    /**
     * 保存入库单
     *
     * @param data
     * @return
     */
    @RequestMapping(value = "save")
    public View save(String data) {
        try {
            JSONObject obj = JSONObject.fromObject(data);
            Map<String, Class> map = new HashMap<String, Class>();
            map.put("churuklsList", StoreChuRuKls.class);
            StoreCaiGouRkd storeCaiGouRkd = (StoreCaiGouRkd) JSONObject.toBean(obj, StoreCaiGouRkd.class, map);
            caigouRkdSerivce.save(storeCaiGouRkd);
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
            StoreCaiGouRkd storeCaiGouRkd = (StoreCaiGouRkd) JSONObject.toBean(obj, StoreCaiGouRkd.class, map);
            caigouRkdSerivce.editDanju(storeCaiGouRkd);
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
                    caigouRkdSerivce.removeDanjubh(danjubh, user.getID());
                }
            }

        } catch (Exception e) {
            log.error("删除入库单失败", e);
            return new SuccessFailView(false, "删除失败");
        }
        return new SuccessFailView(true, "删除成功");
    }


}
