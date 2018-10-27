package com.claude.wmall.jxc.service.customer;

import com.claude.wmall.jxc.domain.customer.TCustomer;

import java.util.List;

/**
 * Created by mazeguo on 2016/8/19.
 */
public interface TCustomerService {

    /**
     * 根据类型查询客户列表
     * @param customerTypeId
     * @return
     * @throws Exception
     */
    List<TCustomer> getListByCustomerTypeId(Integer  customerTypeId)throws Exception;


}
