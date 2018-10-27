package com.claude.wmall.shopping.service.impl;

import com.claude.wmall.shopping.domain.DeptTable;
import com.claude.wmall.shopping.service.DepartmentService;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by mazeguo on 2016/8/25.
 */
@Service
public class DepartmentServiceImpl extends CrudServiceImpl<DeptTable> implements DepartmentService {

    @Override
    public List<DeptTable> findListByOrgId(Integer orgId) {
        String hql = " from DeptTable where parentId = " + orgId;
        return this.dao.find(hql);
    }
}
