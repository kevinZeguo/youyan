package com.claude.wmall.web.controller.store;

import com.claude.wmall.commons.dao.Constants;
import com.claude.wmall.commons.utils.DocuNumber;
import com.claude.wmall.commons.utils.JqGrid2View;
import com.claude.wmall.commons.utils.SuccessFailView;
import com.claude.wmall.jxc.domain.store.*;
import com.claude.wmall.jxc.service.customer.TCustomerService;
import com.claude.wmall.jxc.service.store.DiaoboRkdService;
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
@RequestMapping("/store/diaoborkd/")
public class DiaoboRkdController {
    private static final Log log = LogFactory.getLog(DiaoboRkdController.class);
    @Autowired
    private DiaoboRkdService diaoboRkdService;

    @Autowired
    private MbService mbService;

    @Autowired
    private TCustomerService tCustomerService;

    /**
     * 进入调拨入库单管理页面
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
        return "store/diaoborkd/list";
    }


    /**
     * 查询调拨入库单列表
     *
     * @return
     */
    @RequestMapping(value = "list")
    public View list(StoreDiaoboRkdQuery query) {
        PageInfo<StoreDiaoBoRkd> rkdPageInfo = null;
        try {
            rkdPageInfo = this.diaoboRkdService.listByPage(query);
            List<StoreDiaoBoRkd> rkdList = rkdPageInfo.getList();
            for(StoreDiaoBoRkd rkd:rkdList){
                if("1".equals(rkd.getChukuck())){
                    rkd.setChukuck("仓库1");
                }else if("2".equals(rkd.getChukuck())){
                    rkd.setChukuck("仓库2");
                }
                if("1".equals(rkd.getRukuck())){
                    rkd.setRukuck("仓库1");
                }else if("2".equals(rkd.getRukuck())){
                    rkd.setRukuck("仓库2");
                }
            }
        } catch (Exception e) {
            log.error("查询失败", e);
        }
        return new JqGrid2View<StoreDiaoBoRkd>(rkdPageInfo);
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
            StoreDiaoBoRkd diaoBoRkd;
            User user = (User) request.getSession().getAttribute(Constants.USER_KEY);
            if (type == 2) {//修改操作
                //根据编号查询库单信息
                diaoBoRkd = diaoboRkdService.findByDanjubh(danjubh);
                DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                diaoBoRkd.setDanjurq(df.format(new Date()));
            } else {//新增
                diaoBoRkd = new StoreDiaoBoRkd();
                danjubh = DocuNumber.getMch_billno();
                DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                diaoBoRkd.setDanjubh(danjubh);
                diaoBoRkd.setDanjurq(df.format(new Date()));
                diaoBoRkd.setYewuyuan(user.getvRealName());
                diaoBoRkd.setYewuyId(user.getID());
            }

            model.addAttribute("diaoBoRkd", diaoBoRkd);

            //仓库
            List<JSONObject> cangkuList = new ArrayList<JSONObject>();
            JSONObject cangku = new JSONObject();
            cangku.put("id","1");
            cangku.put("name","仓库1");
            cangku.put("baoguany","张三");
            cangkuList.add(cangku);

            cangku = new JSONObject();
            cangku.put("id","2");
            cangku.put("name","仓库2");
            cangku.put("baoguany","李四");
            cangkuList.add(cangku);
            model.addAttribute("cangkulist",cangkuList);

            //车型
            List<JSONObject> chexingList = new ArrayList<JSONObject>();
            JSONObject chexing = new JSONObject();
            chexing.put("id","1");
            chexing.put("name","小型货车");
            chexing.put("tiji","5t");
            chexingList.add(chexing);

            chexing = new JSONObject();
            chexing.put("id","2");
            chexing.put("name","大型货车");
            chexing.put("tiji","20t");
            chexingList.add(chexing);
            model.addAttribute("chexingList",chexingList);


            //承运单位
            List<JSONObject> chengyundwList = new ArrayList<JSONObject>();
            JSONObject chengyundw = new JSONObject();
            chengyundw.put("id","1");
            chengyundw.put("name","顺丰");
            chengyundwList.add(chengyundw);

            chengyundw = new JSONObject();
            chengyundw.put("id","2");
            chengyundw.put("name","韵达");
            chengyundwList.add(chengyundw);
            model.addAttribute("chengyundwList",chengyundwList);

        } catch (Exception e) {
            log.error("初始化新增页面失败", e);

        }
        model.addAttribute("type", type);
        return "store/diaoborkd/add";
    }


    /**
     * 保存入库单
     *
     * @param data
     * @return
     */
    @RequestMapping(value = "save" )
    public View save( String data) {

        try {
            JSONObject obj = JSONObject.fromObject(data);
            Map<String, Class> map = new HashMap<String, Class>();
            map.put("churuklsList", StoreChuRuKls.class);
            StoreDiaoBoRkd diaoBoRkd = (StoreDiaoBoRkd) JSONObject.toBean(obj, StoreDiaoBoRkd.class, map);
            diaoboRkdService.save(diaoBoRkd);
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
            StoreDiaoBoRkd diaoBoRkd = (StoreDiaoBoRkd) JSONObject.toBean(obj, StoreDiaoBoRkd.class, map);
            diaoboRkdService.editDanju(diaoBoRkd);
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
                    diaoboRkdService.removeDanjubh(danjubh, user.getID());
                }
            }

        } catch (Exception e) {
            log.error("删除入库单失败", e);
            return new SuccessFailView(false, "删除失败");
        }
        return new SuccessFailView(true, "删除成功");
    }


}
