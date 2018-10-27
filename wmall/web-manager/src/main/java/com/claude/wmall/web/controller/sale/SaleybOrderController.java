package com.claude.wmall.web.controller.sale;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.claude.wmall.commons.utils.JqGrid2View;
import com.claude.wmall.jxc.domain.sale.SaleybOrder;
import com.claude.wmall.jxc.service.sale.SaleybOrderService;
import com.github.pagehelper.PageInfo;

@Controller
@RequestMapping("/sale/yborder")
public class SaleybOrderController {
	
	private static final Log log = LogFactory.getLog(SaleybOrderController.class);
    @Autowired
    private SaleybOrderService saleybOrderService;
	
    /**
     * 进入预报订单管理页面
     *
     * @param model
     * @return
     */
    @RequestMapping(value = "manager")
    public String manager() {
        return "sale/yborder/list";
    }
    
    /**
     * 查询预报订单列表
     *
     * @return
     */
    @RequestMapping(value = "list")
    public View list(SaleybOrder saleybOrder, Integer page, Integer rows,
                     String sidx, String sord) {
        PageInfo<SaleybOrder> pageInfo = null;
        try {
        	pageInfo = this.saleybOrderService.listByPage(saleybOrder);
        } catch (Exception e) {
            log.error("查询失败", e);
        }
        return new JqGrid2View<SaleybOrder>(pageInfo);
    }
    
    @RequestMapping(value = "toadd")
	public String toAdd() {
		return "sale/yborder/add";
	}

}
