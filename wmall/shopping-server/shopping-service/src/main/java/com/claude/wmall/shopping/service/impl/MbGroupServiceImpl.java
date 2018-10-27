package com.claude.wmall.shopping.service.impl;

import org.springframework.stereotype.Service;

import com.claude.wmall.commons.utils.Carrier;
import com.claude.wmall.shopping.domain.MbGroup;
import com.claude.wmall.shopping.service.MbGroupService;


@Service
public class MbGroupServiceImpl extends CrudServiceImpl<MbGroup> implements MbGroupService{
	
	public void list(Carrier<MbGroup> carrier, String mbGroupId, String mbGroupName) {
		// TODO Auto-generated method stub
		String hql = "from MbGroup where 1=1  ";
		if (mbGroupId != null && !"".equals(mbGroupId)) {
			hql += " and mbGroupId = " + mbGroupId ;
		}
		if (mbGroupName != null && !"".equals(mbGroupName)) {
			hql += " and mbGroupName like '%" + mbGroupName + "%'";
		}
		hql += " order by mbGroupId asc ";
		this.dao.find(carrier, hql, null);
	}
	
	public MbGroup findById(int id){
		return this.dao.get(id);
	}
}
