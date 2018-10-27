package com.claude.wmall.web.controller.store;

import com.claude.wmall.commons.dao.Constants;
import com.claude.wmall.commons.utils.SuccessFailView;
import com.claude.wmall.jxc.service.store.KuDanService;
import com.claude.wmall.shopping.domain.User;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.View;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.concurrent.ExecutionException;

/**
 * Created by mazeguo on 2016/8/28.
 */
@Controller
@RequestMapping("/store/kudan/")
public class KudanController {
    private static final Log log = LogFactory.getLog(KudanController.class);
    @Autowired
    private KuDanService kuDanService;

    /**
     * 审核
     *
     * @param ids
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "start")
    public View start(String ids,HttpServletRequest request) {
        log.debug("start=======" + ids);
        int result = 0;
        try {
            User user = (User) request.getSession().getAttribute(Constants.USER_KEY);
            result = kuDanService.startByID(ids.split(","),user);

        } catch (Exception e) {
            log.error("审核失败！", e);
            return new SuccessFailView(false, "审核失败");
        }
        if (result == 1) {
            return new SuccessFailView(true, "审核成功");
        } else {
            return new SuccessFailView(false, "审核失败");
        }

    }

    /**
     * 反审
     *
     * @param ids
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "block")
    public View block(String ids,HttpServletRequest request) {
        log.debug("block=======" + ids);

        int result = 0;
        try {
            User user = (User) request.getSession().getAttribute(Constants.USER_KEY);
            result = kuDanService.blockByID(ids.split(","),user);
        } catch (Exception e) {
            log.error("反审失败！", e);
            return new SuccessFailView(false, "反审失败");
        }
        if (result == 1) {
            return new SuccessFailView(true, "反审成功");
        } else {
            return new SuccessFailView(false, "反审失败");
        }

    }
}
