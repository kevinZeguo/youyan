package com.claude.wmall.shopping.service;

import com.claude.wmall.shopping.domain.DeptTable;

import java.util.List;

/**
 * Created by mazeguo on 2016/8/25.
 */
public interface DepartmentService extends CrudService<DeptTable> {

    /**
     * 根据组织Id查询部门列表
     * @param orgId
     * @return
     */
    List<DeptTable> findListByOrgId(Integer orgId);

}
