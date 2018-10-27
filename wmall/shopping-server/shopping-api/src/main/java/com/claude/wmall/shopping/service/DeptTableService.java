package com.claude.wmall.shopping.service;

import java.util.List;

import com.claude.wmall.commons.utils.Carrier;
import com.claude.wmall.shopping.domain.DeptTable;

/**
 * Created by mazeguo on 2016/8/24.
 */
public interface DeptTableService extends CrudService<DeptTable> {

    /**
     * 列表页
     * @param carrier
     * @param org
     */
    public void list(Carrier<DeptTable> carrier,DeptTable org);
    
    List<DeptTable> findOrgListByStatus(String status);
    
    void updateStatusById(DeptTable deptTable);
}
