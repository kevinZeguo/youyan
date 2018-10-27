package com.claude.wmall.jxc.service.sale;

import com.claude.wmall.jxc.domain.sale.SaleybOrder;
import com.github.pagehelper.PageInfo;

public interface SaleybOrderService {
	
	PageInfo<SaleybOrder> listByPage(SaleybOrder saleybOrder)throws Exception;

}
