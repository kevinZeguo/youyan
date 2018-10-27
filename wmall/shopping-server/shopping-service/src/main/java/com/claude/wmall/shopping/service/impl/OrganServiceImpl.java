package com.claude.wmall.shopping.service.impl;

import org.springframework.stereotype.Service;

import com.claude.wmall.shopping.domain.Organ;
import com.claude.wmall.shopping.service.OrganService;

@Service
public class OrganServiceImpl extends CrudServiceImpl<Organ> implements OrganService{

	public Organ findById() {
		return this.dao.get(1);
	}
	
	public void save(Organ organ){
		this.dao.save(organ);
	}

}
