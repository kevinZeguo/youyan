package com.claude.wmall.jxc.service.sale.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.claude.wmall.jxc.dao.sale.SaleybOrderMapper;
import com.claude.wmall.jxc.domain.recManage.Product;
import com.claude.wmall.jxc.domain.sale.SaleybOrder;
import com.claude.wmall.jxc.service.sale.SaleybOrderService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
@Service
public class SaleybOrderServiceImpl implements SaleybOrderService{
	
	@Autowired
	private SaleybOrderMapper saleybOrderMapper;
	@Override
	public PageInfo<SaleybOrder> listByPage(SaleybOrder saleybOrder)
			throws Exception {
		
		PageHelper.startPage(saleybOrder.getPage(), saleybOrder.getRows());
		return new PageInfo<SaleybOrder>(saleybOrderMapper.selectListByPage(saleybOrder));
	}

}
