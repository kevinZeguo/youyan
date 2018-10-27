package com.claude.wmall.shopping.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.claude.wmall.commons.utils.Carrier;
import com.claude.wmall.shopping.domain.DeptTable;
import com.claude.wmall.shopping.service.DeptTableService;

/**
 * Created by hexin on 2016/8/24.
 */
@Service
public class DeptTableServiceImpl extends CrudServiceImpl<DeptTable> implements DeptTableService {


    public void list(Carrier<DeptTable> carrier,DeptTable dept) {
		String hql = "from DeptTable where 1=1  ";
		if (!StringUtils.isEmpty(dept.getDeptName())) {
			hql += " and deptName like '%" + dept.getDeptName() + "%'";
		}
		if (!StringUtils.isEmpty(dept.getParentOrgId())) {
			hql += " and parentOrgId = '" + dept.getParentOrgId() + "'";
		}
		if (!StringUtils.isEmpty(dept.getDeptStatus())) {
			hql += " and deptStatus = '" + dept.getDeptStatus() + "'";
		}
		hql += "order by deptId asc ";
		this.dao.find(carrier, hql, null);
	}
    
    @Override
    public List<DeptTable> findOrgListByStatus(String status) {
    	String hql = " from DeptTable where deptStatus='" + status + "'";
    	return this.dao.find(hql);
    }
    
    @Override
    public void updateStatusById(DeptTable dept) {
    	String hql = "update DeptTable set deptStatus='" + dept.getDeptStatus() + "' where deptId=" + dept.getDeptId();
    	this.dao.batchExecute(hql, null);
    }
    
}
