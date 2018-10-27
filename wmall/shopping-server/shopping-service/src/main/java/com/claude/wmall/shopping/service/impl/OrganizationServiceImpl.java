package com.claude.wmall.shopping.service.impl;

import com.claude.wmall.commons.utils.Carrier;
import com.claude.wmall.shopping.domain.OrgTable;
import com.claude.wmall.shopping.domain.RoleTable;
import com.claude.wmall.shopping.service.OrganizationService;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

/**
 * Created by mazeguo on 2016/8/24.
 */
@Service
public class OrganizationServiceImpl extends CrudServiceImpl<OrgTable> implements OrganizationService {


    @Override
    public List<OrgTable> findOrgListByParenTId(Integer parentId) {
        if (parentId == null || parentId == 0) {
            parentId = 0;//代表最顶级节点
        }
        String hql = " from OrgTable where parentId=" + parentId;
        return this.dao.find(hql);
    }
    
    
    public void list(Carrier<OrgTable> carrier,OrgTable org) {
		String hql = "from OrgTable where 1=1  ";
		if (!StringUtils.isEmpty(org.getOrgName())) {
			hql += " and orgName like '%" + org.getOrgName() + "%'";
		}
		if (!StringUtils.isEmpty(org.getParentId())) {
			hql += " and parentId = '" + org.getParentId() + "'";
		}
		if (!StringUtils.isEmpty(org.getOrgStatus())) {
			hql += " and orgStatus = '" + org.getOrgStatus() + "'";
		}
		hql += "order by orgId asc ";
		this.dao.find(carrier, hql, null);
	}
    
    @Override
    public List<OrgTable> findOrgListByStatus(String status) {
    	String hql = " from OrgTable where orgStatus='" + status + "'";
    	return this.dao.find(hql);
    }
    
    @Override
    public void updateStatusById(OrgTable orgTable) {
    	String hql = "update OrgTable set orgStatus='" + orgTable.getOrgStatus() + "' where orgId=" + orgTable.getOrgId();
    	this.dao.batchExecute(hql, null);
    }
    
}
