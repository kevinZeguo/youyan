package com.claude.wmall.shopping.service;

import org.springframework.stereotype.Service;

import com.claude.wmall.commons.utils.Carrier;
import com.claude.wmall.shopping.domain.MbGroup;


@Service

public interface MbGroupService extends CrudService<MbGroup>{
	
	public void list(Carrier<MbGroup> carrier, String mbGroupId, String mbGroupName);
	
	public MbGroup findById(int id);
}
