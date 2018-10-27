package com.claude.wmall.shopping.service;

import com.claude.wmall.shopping.domain.Organ;

public interface OrganService extends CrudService<Organ> {

	public Organ findById() ;
	
	public void save(Organ organ) ;

}
