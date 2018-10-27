package com.claude.wmall.jxc.service.recManage;

import java.util.List;

import com.claude.wmall.jxc.domain.recManage.CustomerRec;
import com.claude.wmall.jxc.domain.recManage.CustomerReceipt;
import com.claude.wmall.jxc.domain.recManage.RegionRec;
import com.github.pagehelper.PageInfo;

/**
 * Created by mazeguo on 2016/8/9.
 */
public interface CustomerSerivce {
    /**
     * 分页查询产品档案
     * @param query
     * @return
     * @throws Exception
     */
    PageInfo<CustomerRec> listByPage(CustomerRec customerRec)throws Exception;
    /**
     * 分页查询产品收货地
     * @param customerRec
     * @return
     */
	PageInfo<CustomerReceipt> listReceiptAddressByPage(CustomerRec customerRec);
	int delByID(String[] ids);
	int blockByID(String[] ids);
	int startByID(String[] ids);
	CustomerRec getCustomerRecById(String id);
	int save(CustomerRec customerRec);
	List<CustomerReceipt> listReceiptAddressByList(CustomerRec customerRec);
	int update(CustomerRec customerRec);
}
