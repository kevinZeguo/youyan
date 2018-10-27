package com.claude.wmall.jxc.service.customer.impl;

import com.claude.wmall.jxc.dao.customer.TCustomerDao;
import com.claude.wmall.jxc.domain.customer.TCustomer;
import com.claude.wmall.jxc.service.customer.TCustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by mazeguo on 2016/8/19.
 */
@Service
public class TCustomerServiceImpl implements TCustomerService {
    @Autowired
    private TCustomerDao tCustomerDao;

    @Override
    public List<TCustomer> getListByCustomerTypeId(Integer customerTypeId) throws Exception {
        return tCustomerDao.selectListByCustomerTypeId(customerTypeId);
    }
}
