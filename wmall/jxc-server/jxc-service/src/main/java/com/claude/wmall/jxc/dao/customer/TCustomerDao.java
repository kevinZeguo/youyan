package com.claude.wmall.jxc.dao.customer;

import com.claude.wmall.jxc.domain.customer.TCustomer;

import java.util.List;

/**
 * Created by mazeguo on 2016/8/19.
 */
public interface TCustomerDao {
    /**
     * 根据客户类型查询客户列表
     * @param customerTypeId
     * @return
     * @throws Exception
     */
    List<TCustomer> selectListByCustomerTypeId(Integer customerTypeId)throws Exception;
}
