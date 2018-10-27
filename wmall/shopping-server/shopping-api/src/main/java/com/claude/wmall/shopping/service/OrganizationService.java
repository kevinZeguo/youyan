package com.claude.wmall.shopping.service;

import java.util.List;

import com.claude.wmall.commons.utils.Carrier;
import com.claude.wmall.shopping.domain.OrgTable;

/**
 * Created by mazeguo on 2016/8/24.
 */
public interface OrganizationService extends CrudService<OrgTable> {

    /**
     * 根据父节点Id 查找子节点列表
     */
    List<OrgTable> findOrgListByParenTId(Integer parentId);
    /**
     * 列表页
     * @param carrier
     * @param org
     */
    public void list(Carrier<OrgTable> carrier,OrgTable org);
    
    List<OrgTable> findOrgListByStatus(String status);
    
    void updateStatusById(OrgTable orgTable);
}
